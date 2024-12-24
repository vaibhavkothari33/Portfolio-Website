"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import Link from "next/link";
import emailjs from "emailjs-com";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const formSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  message: z.string().nonempty("Message is required"),
});

interface IFormInput {
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! 
      );

      if (result.status === 200) {
        toast({
          description: "Your message has been sent successfully .",
        });
        reset();
      } else {
        toast({
          description: "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        description: "Failed to send message.",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-950 py-10 px-4">
      <h2 className="text-black text-center text-4xl font-bold dark:text-white mb-10">
        Contact Me
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-6"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="example-email@gmail.com"
            {...register("email")}
            className="mt-1 block w-full border border-gray-300 dark:border-neutral-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-neutral-950 focus:border-transparent dark:focus:ring-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Message
          </label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Hi! I really like your work and want to discuss some things...."
            {...register("message")}
            className="mt-1 block w-full border border-gray-300 dark:border-neutral-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-neutral-950 focus:border-transparent dark:focus:ring-white"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-200"
        >
          Send Message
        </Button>
      </form>
      <p className="mx-auto max-w-lg text-center text-sm mb-28 text-gray-600 dark:text-gray-400 mt-8">
        Or just want to have a casual chat? You can shoot me a DM on{" "}
        <Link
          href="https://x.com/VaibhavKotharii"
          className="text-blue-600 hover:underline dark:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </Link>{" "}
        or{" "}
        <Link
          href="https://www.linkedin.com/in/vaibhavkothari33/"
          className="text-blue-800 hover:underline dark:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
        .
      </p>
      <Toaster />
    </div>
  );
};
