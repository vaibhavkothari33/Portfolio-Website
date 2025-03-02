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
import { Send, Twitter, Linkedin, FileText } from "lucide-react";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  message: z.string().nonempty("Message is required"),
});

interface IFormInput {
  name?: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
          from_name: data.name || "Not provided",
          from_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.status === 200) {
        toast({
          description: "Your message has been sent successfully!",
        });
        reset();
      } else {
        toast({
          description: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        description: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    // <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <section className="pb-20 dark:bg-neutral-950 ">
      <div className="bg-white dark:bg-neutral-950 py-12 sm:py-16 px-4 sm:px-6 lg:px-8  dark:shadow-neutral-900/30 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Let&apos;s Connect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
              Have a question or project in mind? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Form section */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      className="w-full border border-gray-300 dark:border-neutral-700 rounded-lg px-4 py-2.5 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your-email@example.com"
                      {...register("email")}
                      className="w-full border border-gray-300 dark:border-neutral-700 rounded-lg px-4 py-2.5 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Hi! I'd love to discuss a potential project. Let me know when you're available to chat..."
                    {...register("message")}
                    className="w-full border border-gray-300 dark:border-neutral-700 rounded-lg px-4 py-2.5 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-sm resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Connect section */}
            <div className="lg:col-span-4 w-full  order-1 lg:order-2">
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm h-full border border-gray-100 dark:border-neutral-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-neutral-800">
                  Other Ways to Reach Me
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      Want to have a casual chat? Connect with me on:
                    </p>

                    <div className="space-y-3">
                      <Link
                        href="https://twitter.com/VaibhavKotharii"
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                          <Twitter size={16} className="text-blue-500 dark:text-blue-400" />
                        </div>
                        <span className="font-medium">Twitter</span>
                      </Link>

                      <Link
                        href="https://www.linkedin.com/in/vaibhavkothari33/"
                        className="flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                          <Linkedin size={16} className="text-blue-700 dark:text-blue-400" />
                        </div>
                        <span className="font-medium">LinkedIn</span>
                      </Link>
                    </div>
                    <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
                      <p className="text-gray-800 dark:text-gray-200 text-sm font-medium mb-4">
                        Support my work:
                      </p>
                      <div className="overflow-hidden rounded-lg">
                        <iframe
                          src="https://github.com/sponsors/vaibhavkothari33/button"
                          title="Sponsor vaibhavkothari33"
                          height="33"
                          width="99%"
                          style={{ border: 0 }}
                        />

                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium mb-4">
                      I&apos;m always open to new opportunities and collaborations.
                    </p>

                    <Link
                      href="/blogs"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-sm w-full justify-center sm:w-auto"
                    >
                      <FileText size={16} />
                      <span className="font-medium">Check out my blogs</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};