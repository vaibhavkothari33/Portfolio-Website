"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBriefcase,
  IconCheck,
  IconCopy,
  IconFileText,
  IconHome,
  IconLink,
  IconMail,
  IconMessage,
  IconMoonStars,
  IconNotebook,
  IconSparkles,
  IconSun,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { DEFAULT_THEME, THEMES, switchTheme, type ThemeId } from "@/lib/themes";
import { useViewTransitionRouter } from "@/components/providers/view-transitions-provider";

const EMAIL = "contact.vaibhavkothari@gmail.com";

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ReactNode;
  /** Extra terms that should match this command but aren't in the label. */
  keywords?: string;
  run: () => void;
};

/**
 * Subsequence match — "prj" finds "Projects". Falls back to plain substring
 * for multi-word queries. Deliberately simple; the list is ~20 items, so a
 * real fuzzy library would be overkill.
 */
function matches(query: string, text: string) {
  const q = query.toLowerCase().trim();
  if (!q) return true;

  const t = text.toLowerCase();
  if (t.includes(q)) return true;

  let i = 0;
  for (const char of t) {
    if (char === q[i]) i++;
    if (i === q.length) return true;
  }
  return false;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { navigate } = useViewTransitionRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Focus is returned here on close, so keyboard users don't lose their place.
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const nextTheme = useMemo(() => {
    const current = (theme ?? DEFAULT_THEME) as ThemeId;
    const index = THEMES.findIndex((t) => t.id === current);
    return THEMES[(index + 1) % THEMES.length] ?? THEMES[0];
  }, [theme]);

  const go = useCallback(
    (href: string) => {
      close();
      navigate(href);
    },
    [close, navigate],
  );

  /** Section jumps only make sense on the home page. */
  const scrollTo = useCallback(
    (hash: string) => {
      close();
      if (pathname !== "/") {
        navigate(`/${hash}`);
        return;
      }
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [close, navigate, pathname],
  );

  const openExternal = useCallback(
    (url: string) => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [close],
  );

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "home",
        label: "Home",
        group: "Go to",
        icon: <IconHome className="h-4 w-4" stroke={1.5} />,
        run: () => go("/"),
      },
      {
        id: "projects",
        label: "Projects",
        group: "Go to",
        icon: <IconSparkles className="h-4 w-4" stroke={1.5} />,
        run: () => go("/projects"),
      },
      {
        id: "experience",
        label: "Experience",
        group: "Go to",
        icon: <IconBriefcase className="h-4 w-4" stroke={1.5} />,
        run: () => go("/experience"),
      },
      {
        id: "blog",
        label: "Blog",
        keywords: "writing posts articles",
        group: "Go to",
        icon: <IconNotebook className="h-4 w-4" stroke={1.5} />,
        run: () => go("/blogs"),
      },
      {
        id: "links",
        label: "All links",
        group: "Go to",
        icon: <IconLink className="h-4 w-4" stroke={1.5} />,
        run: () => go("/links"),
      },

      {
        id: "sec-skills",
        label: "Skills",
        group: "Jump to section",
        icon: <IconArrowRight className="h-4 w-4" stroke={1.5} />,
        run: () => scrollTo("#skills"),
      },
      {
        id: "sec-achievements",
        label: "Achievements",
        group: "Jump to section",
        icon: <IconTrophy className="h-4 w-4" stroke={1.5} />,
        run: () => scrollTo("#achievements"),
      },
      {
        id: "sec-activity",
        label: "GitHub activity",
        group: "Jump to section",
        icon: <IconBrandGithub className="h-4 w-4" stroke={1.5} />,
        run: () => scrollTo("#activity"),
      },
      {
        id: "sec-posts",
        label: "Recent posts",
        group: "Jump to section",
        icon: <IconMessage className="h-4 w-4" stroke={1.5} />,
        run: () => scrollTo("#posts"),
      },
      {
        id: "sec-contact",
        label: "Contact",
        group: "Jump to section",
        icon: <IconMail className="h-4 w-4" stroke={1.5} />,
        run: () => scrollTo("#contact"),
      },

      {
        id: "theme",
        label: `Switch to ${nextTheme.label}`,
        keywords: "theme dark light appearance colour color",
        group: "Actions",
        icon:
          nextTheme.scheme === "dark" ? (
            <IconMoonStars className="h-4 w-4" stroke={1.5} />
          ) : (
            <IconSun className="h-4 w-4" stroke={1.5} />
          ),
        run: () => {
          switchTheme(nextTheme.id, setTheme);
          close();
        },
      },
      {
        id: "copy-email",
        label: copied ? "Email copied" : "Copy email address",
        hint: EMAIL,
        keywords: "mail contact reach",
        group: "Actions",
        icon: copied ? (
          <IconCheck className="h-4 w-4" stroke={1.5} />
        ) : (
          <IconCopy className="h-4 w-4" stroke={1.5} />
        ),
        run: () => {
          navigator.clipboard
            ?.writeText(EMAIL)
            .then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1600);
            })
            .catch(() => {
              // Clipboard can be blocked (insecure origin, permissions) —
              // fall back to opening the mail client rather than failing.
              window.location.href = `mailto:${EMAIL}`;
            });
        },
      },
      {
        id: "resume",
        label: "Open resume",
        keywords: "cv pdf",
        group: "Actions",
        icon: <IconFileText className="h-4 w-4" stroke={1.5} />,
        run: () => openExternal("/resume.pdf"),
      },
      {
        id: "call",
        label: "Book a call",
        keywords: "meeting cal schedule",
        group: "Actions",
        icon: <IconUser className="h-4 w-4" stroke={1.5} />,
        run: () => openExternal("https://cal.com/vaibhavkothari33/30min"),
      },

      {
        id: "github",
        label: "GitHub",
        group: "Elsewhere",
        icon: <IconBrandGithub className="h-4 w-4" stroke={1.5} />,
        run: () => openExternal("https://github.com/vaibhavkothari33/"),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: "Elsewhere",
        icon: <IconBrandLinkedin className="h-4 w-4" stroke={1.5} />,
        run: () => openExternal("https://www.linkedin.com/in/vaibhavkothari33/"),
      },
      {
        id: "x",
        label: "X / Twitter",
        group: "Elsewhere",
        icon: <IconBrandX className="h-4 w-4" stroke={1.5} />,
        run: () => openExternal("https://x.com/VaibhavKotharii"),
      },
    ],
    [go, scrollTo, openExternal, nextTheme, setTheme, close, copied],
  );

  const filtered = useMemo(
    () =>
      commands.filter((c) =>
        matches(query, `${c.label} ${c.group} ${c.keywords ?? ""}`),
      ),
    [commands, query],
  );

  // Grouped for rendering, but the flat `filtered` order drives selection.
  const groups = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const c of filtered) {
      const list = map.get(c.group) ?? [];
      list.push(c);
      map.set(c.group, list);
    }
    return [...map.entries()];
  }, [filtered]);

  // ⌘K / Ctrl+K toggles from anywhere.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Reset per-open state and manage focus.
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      // Wait for the panel to mount before focusing.
      const id = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(id);
    }
    lastFocused.current?.focus?.();
  }, [open]);

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        filtered.length ? (i - 1 + filtered.length) % filtered.length : 0,
      );
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-canvas/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onKeyDown={onKeyDown}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <IconArrowRight className="h-4 w-4 shrink-0 text-brand" stroke={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search pages, sections, actions…"
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-sm text-strong outline-none placeholder:text-subtle"
              />
              <kbd className="hidden shrink-0 rounded border border-line-strong px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-subtle">
                  Nothing matches “{query}”.
                </p>
              )}

              {groups.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
                    {group}
                  </p>

                  {items.map((cmd) => {
                    const index = filtered.indexOf(cmd);
                    const isActive = index === active;

                    return (
                      <button
                        key={cmd.id}
                        type="button"
                        data-active={isActive}
                        onMouseMove={() => setActive(index)}
                        onClick={cmd.run}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                          isActive ? "bg-elevated text-strong" : "text-dim",
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0",
                            isActive ? "text-brand" : "text-subtle",
                          )}
                        >
                          {cmd.icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {cmd.label}
                        </span>
                        {cmd.hint && (
                          <span className="hidden shrink-0 font-mono text-[10px] text-faint sm:block">
                            {cmd.hint}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[10px] text-faint">
              <span className="font-mono">↑↓ navigate · ↵ select</span>
              <span className="font-mono">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
