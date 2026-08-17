"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconCalendar,
  IconDeviceGamepad2,
  IconExternalLink,
  IconMail,
  IconSend,
} from "@tabler/icons-react";
import { openTetris } from "@/lib/tetris-open";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "emailjs-com";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters"),
  message: z
    .string()
    .nonempty("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

interface IFormInput {
  name?: string;
  email: string;
  message: string;
}

const recentBlogPosts = [
  {
    title: "Backend as a Service",
    url: "/blogs/Backend-as-a-Service",
    date: "Feb 12, 2025",
  },
  {
    title: "Code-Kshetra 2.0",
    url: "/blogs/code-kshetra",
    date: "Feb 23, 2025",
  },
];

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/VaibhavKotharii",
    icon: IconBrandTwitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vaibhavkothari33/",
    icon: IconBrandLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/vaibhavkothari33",
    icon: IconBrandGithub,
  },
  {
    label: "Links",
    href: "/links",
    icon: IconExternalLink,
  },
];

const fieldClassName =
  "h-9 rounded-md border-line-strong bg-well py-1.5 text-sm text-strong placeholder:text-faint focus-visible:border-brand/50 focus-visible:ring-1 focus-visible:ring-brand/30";

function GridPanel({
  label,
  id,
  title,
  children,
  className,
}: {
  label: string;
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between p-4 md:p-5",
        className,
      )}
    >
      <div>
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand">
            {label}
          </p>
          <span className="text-[10px] tabular-nums text-faint">{id}</span>
        </div>
        {title && (
          <h3 className="mb-2 text-sm font-semibold leading-snug text-strong md:text-base">
            {title}
          </h3>
        )}
      </div>
      {children}
    </article>
  );
}

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
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      if (result.status === 200) {
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully!",
          variant: "default",
          duration: 5000,
        });
        reset();
      } else {
        toast({
          title: "Send Failed",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <section
      id="contact"
      className="w-full border-t border-line bg-canvas text-strong"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-5xl border-x border-line">
        <div className="border-b border-line px-4 py-6 md:px-6 md:py-7">
          <p className="mb-2 inline-flex items-center gap-2 border border-brand/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-brand">
            <span aria-hidden>✕</span> Contact
          </p>
          <h2
            id="contact-heading"
            className="max-w-xl text-xl font-bold leading-tight tracking-tight md:text-2xl"
          >
            Let&apos;s build something together
          </h2>
          <p className="mt-2 max-w-lg text-xs leading-relaxed text-dim md:text-sm">
            Freelance, collaborations, or full-time — drop a message and I&apos;ll
            get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="border-b border-line p-4 md:p-5 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-medium uppercase tracking-[0.14em] text-subtle"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                    className={fieldClassName}
                  />
                  {errors.name && (
                    <p role="alert" className="text-xs font-medium text-brand">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-medium uppercase tracking-[0.14em] text-subtle"
                  >
                    Email <span className="text-brand">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    className={fieldClassName}
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs font-medium text-brand">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-[10px] font-medium uppercase tracking-[0.14em] text-subtle"
                >
                  Message <span className="text-brand">*</span>
                </label>
                <Textarea
                  id="message"
                  rows={3}
                  placeholder="Your message..."
                  {...register("message")}
                  aria-invalid={errors.message ? "true" : "false"}
                  className={cn(fieldClassName, "h-auto min-h-[72px] resize-none py-2")}
                />
                {errors.message && (
                  <p role="alert" className="text-xs font-medium text-brand">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-invert px-4 text-xs font-medium text-invert-fg transition-colors hover:bg-invert-hover disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <IconSend className="h-4 w-4" stroke={1.75} />
                      Send message
                    </>
                  )}
                </Button>

                <Link
                  href="https://cal.com/vaibhavkothari33/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-line-strong px-4 text-xs font-medium text-strong transition-colors hover:border-line-hover hover:bg-surface"
                >
                  <IconCalendar className="h-3.5 w-3.5" stroke={1.5} />
                  Book a call
                </Link>

                {/* Waiting on a reply is dead time — offer something to do. */}
                <button
                  type="button"
                  onClick={openTetris}
                  className="group inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-line-strong px-4 text-xs font-medium text-dim transition-colors hover:border-brand/60 hover:text-strong"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  Click me
                  <IconDeviceGamepad2
                    className="h-3.5 w-3.5 text-subtle transition-colors group-hover:text-brand"
                    stroke={1.5}
                  />
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-line bg-surface/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGprYmxrenlhaGt0ZXJwamEwajMwNTJ0ZTVkeWdnbng5MXF5amV6ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LHZyixOnHwDDy/giphy.gif"
                  alt="Typing cat animation"
                  className="mx-auto w-full max-w-xs opacity-90"
                  loading="lazy"
                />
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <GridPanel
              label="Connect"
              id="001"
              title="Reach me directly"
              className="border-b border-line sm:border-r sm:border-b-0 lg:border-r-0 lg:border-b"
            >
              <div className="space-y-3">
                <a
                  href="mailto:contact.vaibhavkothari@gmail.com"
                  className="inline-flex items-center gap-1.5 text-xs text-body transition-colors hover:text-strong"
                >
                  <IconMail className="h-3.5 w-3.5 shrink-0 text-brand" stroke={1.75} />
                  contact.vaibhavkothari@gmail.com
                </a>

                <div className="flex flex-wrap gap-1.5">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex items-center gap-1 rounded-full border border-dashed border-line-strong bg-surface/60 px-2 py-1 text-[10px] font-medium text-dim transition-colors hover:border-line-hover hover:text-strong"
                    >
                      <Icon className="h-3 w-3" stroke={1.5} />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </GridPanel>

            <GridPanel
              label="Writing"
              id="002"
              title="Latest posts"
              className="border-b border-line sm:border-b-0 lg:border-b"
            >
              <div className="space-y-1">
                {recentBlogPosts.map((post) => (
                  <Link
                    key={post.url}
                    href={post.url}
                    className="group flex items-center gap-2 rounded-md px-1 py-1.5 transition-colors hover:bg-surface/40"
                  >
                    <BookOpen
                      className="h-3.5 w-3.5 shrink-0 text-brand"
                      strokeWidth={1.75}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-xs font-medium text-strong">
                        {post.title}
                      </h4>
                      <p className="font-mono text-[10px] text-subtle">
                        {post.date}
                      </p>
                    </div>
                  </Link>
                ))}

                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-1 pt-0.5 text-[10px] font-medium text-dim transition-colors hover:text-strong"
                >
                  All posts
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </GridPanel>

            <GridPanel
              label="Support"
              id="003"
              title="Sponsor my work"
              className="sm:col-span-2 lg:col-span-1"
            >
              <p className="mb-2 text-xs leading-relaxed text-dim">
                Support open source and future projects.
              </p>
              <div className="overflow-hidden rounded-lg border border-line bg-well">
                <iframe
                  src="https://github.com/sponsors/vaibhavkothari33/button"
                  title="Sponsor vaibhavkothari33"
                  height="40"
                  width="100%"
                  style={{ border: 0 }}
                />
              </div>
            </GridPanel>
          </div>
        </div>
      </div>
    </section>
  );
};
