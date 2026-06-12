"use client";

import { Loader } from "@/components/ui/loader";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startLoading: (text?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const INITIAL_LOAD_MS = 1800;

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState<string | undefined>();
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setInitialLoadDone(true);
    }, INITIAL_LOAD_MS);

    return () => clearTimeout(timer);
  }, []);

  const startLoading = useCallback(
    (text?: string) => {
      if (!initialLoadDone) return;
      setLoadingText(text);
      setIsLoading(true);
    },
    [initialLoadDone],
  );

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingText(undefined);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        startLoading,
        stopLoading,
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <Loader text={loadingText} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: isLoading ? 0 : 0.15 }}
        aria-hidden={isLoading}
      >
        {children}
      </motion.div>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
