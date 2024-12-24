import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useTheme } from "next-themes"; // Assuming you are using Next.js with next-themes

export function Toaster() {
  const { toasts } = useToast();
  const { theme } = useTheme(); // Get the current theme (light or dark)

  // Define light and dark mode classes
  const lightModeClasses = "bg-light-background text-light-foreground";
  const darkModeClasses = "bg-dark-background text-dark-foreground";

  return (
    <>
      {toasts.map(({ id, description, ...props }) => (
        <Toast 
          key={id}
          {...props}
          className="border border-black dark:border-white
            rounded-2xl w-[320px]"
        >
          {/* <ToastTitle className="text-black dark:text-white">Message</ToastTitle> */}
          <ToastDescription className="text-black dark:text-white">{description}</ToastDescription>
          <ToastClose className="text-black dark:text-white" />
        </Toast>
      ))}
      <ToastViewport className="sm:bottom-10 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </>
  );
}
