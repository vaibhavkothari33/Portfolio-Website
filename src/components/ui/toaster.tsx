"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map(({ id, title, description, variant, ...props }) => {
        const isDestructive = variant === "destructive";

        return (
          <Toast key={id} variant={variant} {...props}>
            <div
              className={cn(
                "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                isDestructive
                  ? "border-red-500/30 bg-red-500/10 text-red-500"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
              )}
            >
              {isDestructive ? (
                <IconAlertTriangle className="h-4 w-4" stroke={1.75} />
              ) : (
                <IconCircleCheck className="h-4 w-4" stroke={1.75} />
              )}
            </div>

            <div className="min-w-0 flex-1 pl-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription className={cn(!title && "mt-0 text-sm text-body")}>
                  {description}
                </ToastDescription>
              )}
            </div>

            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </>
  );
}
