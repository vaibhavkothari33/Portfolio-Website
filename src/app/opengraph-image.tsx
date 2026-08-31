import { ImageResponse } from "next/og";

/**
 * `public/og-image.png` was a 2 MB portrait JPEG (2579x4496) with a .png
 * name — wrong aspect, wrong format, wrong extension. Social crawlers either
 * reject it or crop it to nothing, so link previews were blank.
 *
 * Generating the card here instead means it is always exactly 1200x630, a few
 * KB, and stays in sync with the site copy. Next wires this into the metadata
 * for `/` and every nested route that doesn't define its own.
 */
export const alt = "Vaibhav Kothari — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* The site's ✕ mark is drawn rather than typed: ImageResponse only
            has the default sans font, which renders that glyph as tofu. */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 18, height: 18, background: "#ef4444" }} />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#ef4444",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 700, lineHeight: 1.05 }}>
            Vaibhav Kothari
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 38, color: "#a1a1aa" }}>
            Full Stack Engineer · Mobile · Agentic AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#71717a",
            borderTop: "1px solid #27272a",
            paddingTop: 28,
          }}
        >
          <span>vaibhavkothari.me</span>
          <span>Building Sythra</span>
        </div>
      </div>
    ),
    size,
  );
}
