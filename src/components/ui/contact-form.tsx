"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import emailjs from "emailjs-com";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Send, Twitter, Linkedin, Mail, Github, Book, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// Enhanced form validation schema
const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  email: z.string()
    .nonempty("Email is required")
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters"),
  message: z.string()
    .nonempty("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

interface IFormInput {
  name?: string;
  email: string;
  message: string;
}

// Sample blog posts data
const recentBlogPosts = [
  {
    title: "Backend as a Service",
    url: "/blogs/Backend-as-a-Service",
    date: "Feb 12, 2025"
  },
  {
    title: "Code-Kshetra 2.0",
    url: "/blogs/code-kshetra",
    date: "Feb 23, 2025"
  },
  // {
  //   title: "Optimizing React Performance: Advanced Techniques",
  //   url: "/blog/react-performance-optimization",
  //   date: "Dec 10, 2024"
  // }
];

// Social media links
const socialLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/VaibhavKotharii",
    icon: Twitter,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    hoverBgColor: "hover:bg-blue-100 dark:hover:bg-blue-900/40"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vaibhavkothari33/",
    icon: Linkedin,
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    hoverBgColor: "hover:bg-blue-100 dark:hover:bg-blue-900/40"
  },
  {
    name: "GitHub",
    url: "https://github.com/vaibhavkothari33",
    icon: Github,
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-gray-50 dark:bg-gray-800/20",
    hoverBgColor: "hover:bg-gray-100 dark:hover:bg-gray-800/40"
  },
  {
    name: "GitHub",
    url: "/links",
    icon: ExternalLink,
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-gray-50 dark:bg-gray-800/20",
    hoverBgColor: "hover:bg-gray-100 dark:hover:bg-gray-800/40"
  },

];

export const ContactForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<IFormInput>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name || "Anonymous User",
          from_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.status === 200) {
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully!",
          variant: "default",
        });
        reset();
      } else {
        toast({
          title: "Send Failed",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 pb-40 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Get in Touch
            </motion.h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I&apos;m all ears and excited to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl dark:shadow-neutral-800/50 p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Your full name"
                      {...register("name")}
                      aria-invalid={errors.name ? "true" : "false"}
                      className="w-full border-2 border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {errors.name && (
                      <p 
                        role="alert" 
                        className="text-red-500 text-xs mt-1 font-medium"
                      >
                        {errors.name.message}
                      </p>
                    )}
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
                      aria-invalid={errors.email ? "true" : "false"}
                      className="w-full border-2 border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {errors.email && (
                      <p 
                        role="alert" 
                        className="text-red-500 text-xs mt-1 font-medium"
                      >
                        {errors.email.message}
                      </p>
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
                    placeholder="Share your thoughts, ideas, or project details..."
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : "false"}
                    className="w-full border-2 border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                  />
                  {errors.message && (
                    <p 
                      role="alert" 
                      className="text-red-500 text-xs mt-1 font-medium"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg 
                        className="animate-spin h-5 w-5 mr-2" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Details, Social Links & Blog Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Contact Details */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl dark:shadow-neutral-800/50 p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-neutral-800">
                  Connect With Me
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Mail className="text-blue-500" />
                    <a 
                      href="mailto:contact@vaibhavkothari.com" 
                      className="hover:text-blue-600 transition-colors"
                    >
                      contact@vaibhavkothari.com
                    </a>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Find me on social networks:
                    </p>

                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <Link
                          key={social.name}
                          href={social.url}
                          className={`${social.bgColor} ${social.hoverBgColor} p-3 rounded-full transition-all`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                        >
                          <social.icon className={social.color} size={20} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl dark:shadow-neutral-800/50 p-6"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-neutral-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Latest Blog Posts
                  </h3>
                  <Link 
                    href="/blog" 
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium flex items-center gap-1"
                  >
                    All posts
                    <ExternalLink size={14} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentBlogPosts.map((post, index) => (
                    <Link 
                      key={index}
                      href={post.url}
                      className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Book className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {post.date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* GitHub Sponsors */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl dark:shadow-neutral-800/50 p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Support My Work
                </h3>
                <div className="overflow-hidden rounded-lg">
                  <iframe
                    src="https://github.com/sponsors/vaibhavkothari33/button"
                    title="Sponsor vaibhavkothari33"
                    height="40"
                    width="100%"
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Toaster />
    </section>
  );
};
// "use client";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import Link from "next/link";
// import emailjs from "emailjs-com";
// import { useToast } from "@/hooks/use-toast";
// import { Toaster } from "@/components/ui/toaster";
// import { Send, Twitter, Linkedin, Mail } from "lucide-react";
// import { motion } from "framer-motion";

// // Enhanced form validation schema
// const formSchema = z.object({
//   name: z.string()
//     .min(2, "Name must be at least 2 characters")
//     .max(50, "Name must be less than 50 characters")
//     .optional(),
//   email: z.string()
//     .nonempty("Email is required")
//     .email("Invalid email format")
//     .max(100, "Email must be less than 100 characters"),
//   message: z.string()
//     .nonempty("Message is required")
//     .min(10, "Message must be at least 10 characters")
//     .max(500, "Message must be less than 500 characters"),
// });

// interface IFormInput {
//   name?: string;
//   email: string;
//   message: string;
// }

// export const ContactForm = () => {
//   const { toast } = useToast();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting, isValid },
//     reset,
//   } = useForm<IFormInput>({
//     resolver: zodResolver(formSchema),
//     mode: "onChange",
//   });

//   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//     try {
//       const result = await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         {
//           from_name: data.name || "Anonymous User",
//           from_email: data.email,
//           message: data.message,
//         },
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
//       );

//       if (result.status === 200) {
//         toast({
//           title: "Message Sent",
//           description: "Your message has been sent successfully!",
//           variant: "default",
//         });
//         reset();
//       } else {
//         toast({
//           title: "Send Failed",
//           description: "Failed to send message. Please try again.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//       toast({
//         title: "Error",
//         description: "Failed to send message. Please try again later.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <section className="py-16 pb-40  bg-white dark:bg-neutral-950">
//       <div className="container mx-auto px-4">
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-6xl mx-auto"
//         >
//           <div className="text-center mb-12">
//             <motion.h2 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3 }}
//               className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
//             >
//               Get in Touch
//             </motion.h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Have a project in mind or just want to say hello? I&apos;m all ears and excited to hear from you!
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* Contact Form */}
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl dark:shadow-neutral-800/50 p-8"
//             >
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label 
//                       htmlFor="name" 
//                       className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                     >
//                       Name
//                     </label>
//                     <Input
//                       id="name"
//                       type="text"
//                       placeholder="Your full name"
//                       {...register("name")}
//                       aria-invalid={errors.name ? "true" : "false"}
//                       className="w-full border-2 border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//                     />
//                     {errors.name && (
//                       <p 
//                         role="alert" 
//                         className="text-red-500 text-xs mt-1 font-medium"
//                       >
//                         {errors.name.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <label 
//                       htmlFor="email" 
//                       className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                     >
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="your-email@example.com"
//                       {...register("email")}
//                       aria-invalid={errors.email ? "true" : "false"}
//                       className="w-full border-2 border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//                     />
//                     {errors.email && (
//                       <p 
//                         role="alert" 
//                         className="text-red-500 text-xs mt-1 font-medium"
//                       >
//                         {errors.email.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label 
//                     htmlFor="message" 
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                   >
//                     Message <span className="text-red-500">*</span>
//                   </label>
//                   <Textarea
//                     id="message"
//                     rows={6}
//                     placeholder="Share your thoughts, ideas, or project details..."
//                     {...register("message")}
//                     aria-invalid={errors.message ? "true" : "false"}
//                     className="w-full border-2 border-gray-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
//                   />
//                   {errors.message && (
//                     <p 
//                       role="alert" 
//                       className="text-red-500 text-xs mt-1 font-medium"
//                     >
//                       {errors.message.message}
//                     </p>
//                   )}
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isSubmitting || !isValid}
//                   className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg 
//                         className="animate-spin h-5 w-5 mr-2" 
//                         xmlns="http://www.w3.org/2000/svg" 
//                         fill="none" 
//                         viewBox="0 0 24 24"
//                       >
//                         <circle 
//                           className="opacity-25" 
//                           cx="12" 
//                           cy="12" 
//                           r="10" 
//                           stroke="currentColor" 
//                           strokeWidth="4"
//                         ></circle>
//                         <path 
//                           className="opacity-75" 
//                           fill="currentColor" 
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={20} />
//                       Send Message
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </motion.div>

//             {/* Contact Details & Social Links */}
//             <motion.div 
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="lg:col-span-5 space-y-6"
//             >
//               <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl dark:shadow-neutral-800/50 p-6">
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-neutral-800">
//                   Alternative Contact
//                 </h3>

//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
//                     <Mail className="text-blue-500" />
//                     <a 
//                       href="mailto:contact@vaibhavkothari.com" 
//                       className="hover:text-blue-600 transition-colors"
//                     >
//                       contact@vaibhavkothari.com
//                     </a>
//                   </div>

//                   <div className="space-y-3">
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Connect with me on professional networks:
//                     </p>

//                     <div className="flex space-x-4">
//                       <Link
//                         href="https://twitter.com/VaibhavKotharii"
//                         className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <Twitter className="text-blue-500 dark:text-blue-400" size={20} />
//                       </Link>

//                       <Link
//                         href="https://www.linkedin.com/in/vaibhavkothari33/"
//                         className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <Linkedin className="text-blue-700 dark:text-blue-400" size={20} />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl dark:shadow-neutral-800/50 p-6">
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                   Support My Work
//                 </h3>
//                 <div className="overflow-hidden rounded-lg">
//                   <iframe
//                     src="https://github.com/sponsors/vaibhavkothari33/button"
//                     title="Sponsor vaibhavkothari33"
//                     height="40"
//                     width="100%"
//                     style={{ border: 0 }}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//       <Toaster />
//     </section>
//   );
// };