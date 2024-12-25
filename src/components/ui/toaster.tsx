import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <>
      {toasts.map(({ id, description, ...props }) => (
        <Toast 
          key={id}
          {...props}
          className="border border-black dark:border-white
            rounded-2xl w-[320px]"
        >
          <ToastDescription className="text-black dark:text-white">{description}</ToastDescription>
          <ToastClose className="text-black dark:text-white" />
        </Toast>
      ))}
      <ToastViewport className="sm:bottom-10 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </>
  );
}
