"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import {
  DEFAULT_THEME,
  THEMES,
  THEME_IDS,
  switchTheme,
  type ThemeId,
} from "@/lib/themes";

type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  id?: string;
};

export const FloatingDock = ({
  items,
  desktopClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

/**
 * Cycles to the next registered theme. With two themes this is a plain
 * toggle; it keeps working unchanged if more are added to THEMES.
 */
function useThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // A theme removed from the registry can still be sitting in localStorage
  // from an earlier visit. next-themes would put that stale class on
  // <html>, where no token block matches it — so fall back.
  useEffect(() => {
    if (!mounted || !theme) return;
    if (!THEME_IDS.includes(theme as ThemeId)) setTheme(DEFAULT_THEME);
  }, [mounted, theme, setTheme]);

  const current = (mounted ? theme : DEFAULT_THEME) as ThemeId;
  const index = THEMES.findIndex((t) => t.id === current);
  const next = THEMES[(index + 1) % THEMES.length] ?? THEMES[0];

  const toggle = () => {
    switchTheme(next.id, setTheme);

    // Keep the browser chrome (mobile address bar) matching the canvas.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next.swatch.canvas);
  };

  return { next, toggle, mounted };
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const { next, toggle, mounted } = useThemeToggle();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-5 left-1/2 z-50 flex h-[75px] -translate-x-1/2 items-end gap-4 rounded-3xl",
        "border border-line bg-surface/70 px-4 pb-3 shadow-lg backdrop-blur-md",
        className
      )}
    >
      {items.map((item) => {
        const isThemeSwitch = item.id === "theme-switcher";

        return (
          <IconContainer
            mouseX={mouseX}
            key={item.title}
            {...item}
            // The icon and label name where the click lands, not where you are.
            // Before mount the theme is unknown, so keep the neutral label.
            title={isThemeSwitch && mounted ? next.label : item.title}
            ariaLabel={
              isThemeSwitch
                ? mounted
                  ? `Switch to ${next.label} theme`
                  : "Switch theme"
                : item.title
            }
            icon={
              isThemeSwitch
                ? next.scheme === "dark"
                  ? <IconMoonStars />
                  : <IconSun />
                : item.icon
            }
            onClick={isThemeSwitch ? toggle : undefined}
          />
        );
      })}
    </motion.div>
  );
};

/**
 * The magnification springs are identical for every dock item; only the
 * rendered element (button vs anchor) differs.
 */
function useMagnify(mouseX: MotionValue, ref: React.RefObject<HTMLElement | null>) {
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const spring = { mass: 0.1, stiffness: 150, damping: 12 };

  return {
    width: useSpring(useTransform(distance, [-150, 0, 150], [50, 90, 50]), spring),
    height: useSpring(useTransform(distance, [-150, 0, 150], [40, 80, 40]), spring),
    widthIcon: useSpring(useTransform(distance, [-150, 0, 150], [40, 60, 40]), spring),
    heightIcon: useSpring(useTransform(distance, [-150, 0, 150], [20, 40, 20]), spring),
  };
}

function Tooltip({ title, visible }: { title: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 2, x: "-50%" }}
          className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-line bg-elevated px-2 py-0.5 text-xs text-body"
        >
          {title}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const ITEM_CLASS =
  "aspect-square rounded-full bg-elevated text-body transition-colors hover:text-strong flex items-center justify-center relative";

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  ariaLabel,
}: DockItem & {
  mouseX: MotionValue;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  if (onClick) {
    return (
      <IconContainerButton
        mouseX={mouseX}
        title={title}
        icon={icon}
        onClick={onClick}
        ariaLabel={ariaLabel ?? title}
      />
    );
  }
  return (
    <IconContainerAnchor
      mouseX={mouseX}
      title={title}
      icon={icon}
      href={href}
      ariaLabel={ariaLabel ?? title}
    />
  );
}

function IconContainerButton({
  mouseX,
  title,
  icon,
  onClick,
  ariaLabel,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { width, height, widthIcon, heightIcon } = useMagnify(mouseX, ref);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={ITEM_CLASS}
    >
      <motion.div style={{ width, height }} className="flex items-center justify-center">
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
      <Tooltip title={title} visible={hovered} />
    </button>
  );
}

function IconContainerAnchor({
  mouseX,
  title,
  icon,
  href,
  ariaLabel,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const { width, height, widthIcon, heightIcon } = useMagnify(mouseX, ref);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      ref={ref}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined} // Open external links in a new tab.
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={ITEM_CLASS}
    >
      <motion.div style={{ width, height }} className="flex items-center justify-center">
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
      <Tooltip title={title} visible={hovered} />
    </a>
  );
}
