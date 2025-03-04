"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Loader } from "@/components/ui/loader";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startLoading: (text?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState<string | undefined>(undefined);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Simulate initial loading time (min 2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
      setInitialLoad(false);
    }, 2000);

    // Listen for route changes
    const handleStart = () => {
      if (!initialLoad) setIsLoading(true);
    };
    const handleComplete = () => setIsLoading(false);

    document.addEventListener("routeChangeStart", handleStart);
    document.addEventListener("routeChangeComplete", handleComplete);
    document.addEventListener("routeChangeError", handleComplete);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("routeChangeStart", handleStart);
      document.removeEventListener("routeChangeComplete", handleComplete);
      document.removeEventListener("routeChangeError", handleComplete);
    };
  }, [initialLoad]);

  const startLoading = (text?: string) => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setLoadingText(undefined);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        startLoading,
        stopLoading,
      }}
    >
      {isLoading && <Loader text={loadingText} />}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
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