import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: a fictional wearable concept showcase, an upskilling project by ${site.author.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The card shown when a page is shared. It states what the site is, so previews never read
// like a real product.
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
          padding: 72,
          background: "#141815",
          color: "#f0f1ed",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: "#1d4fff" }} />
          <span>Fictional wearable concepts</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 280, fontWeight: 700, letterSpacing: -14, lineHeight: 0.85 }}>
            ARLO
          </div>
          <div style={{ fontSize: 34, color: "#cbd0c6" }}>
            {`An upskilling project by ${site.author.name}`}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#a4ada0" }}>
          Demo only. Nothing is for sale.
        </div>
      </div>
    ),
    size,
  );
}
