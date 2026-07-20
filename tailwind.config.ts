import type { Config } from "tailwindcss";
const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        grain: "grain 8s steps(10) infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        grain: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5%)" },
        },
      },
      backgroundImage: {
        noise: "url('/noise.png')",
      },
      colors: {
        // --- semantic theme roles (see src/app/globals.css) -------------
        canvas: {
          DEFAULT: 'hsl(var(--canvas))',
          2: 'hsl(var(--canvas-2))'
        },
        surface: 'hsl(var(--surface))',
        well: 'hsl(var(--well))',
        elevated: 'hsl(var(--elevated))',
        line: {
          DEFAULT: 'hsl(var(--line))',
          strong: 'hsl(var(--line-strong))',
          hover: 'hsl(var(--line-hover))'
        },
        strong: 'hsl(var(--text-strong))',
        body: 'hsl(var(--text-body))',
        // named `dim` because shadcn already owns the `muted` colour name
        dim: 'hsl(var(--text-muted))',
        subtle: 'hsl(var(--text-subtle))',
        faint: 'hsl(var(--text-faint))',
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          fg: 'hsl(var(--brand-fg))',
          hover: 'hsl(var(--brand-hover))',
          soft: 'hsl(var(--brand-soft))'
        },
        invert: {
          DEFAULT: 'hsl(var(--invert))',
          fg: 'hsl(var(--invert-fg))',
          hover: 'hsl(var(--invert-hover))'
        },
        // --- shadcn aliases ---------------------------------------------
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      boxShadow: {
        glow: '0 0 16px hsl(var(--brand) / 0.85)',
        'glow-sm': '0 0 10px hsl(var(--brand) / 0.6)',
        'glow-lg': '0 0 32px hsl(var(--brand) / 0.45)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [
    // NOTE: the old `addVariablesForColors` plugin was removed. It re-emitted
    // every colour as a `:root` custom property, which for token colours like
    // `canvas` produced the self-referential `--canvas: hsl(var(--canvas))`
    // and fought the theme blocks on the same element. Nothing consumed those
    // variables.
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;