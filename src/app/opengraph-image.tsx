import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "مؤسسة الفهد للمقاولات";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#002868",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            width: 120,
            height: 4,
            background: "#C8A75D",
            marginBottom: 32,
          }}
        />

        {/* Company name */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 20,
            direction: "rtl",
          }}
        >
          مؤسسة الفهد للمقاولات
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#C8A75D",
            textAlign: "center",
            direction: "rtl",
          }}
        >
          رواد هندسة الواجهات في المملكة
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            width: "100%",
            height: 2,
            background: "rgba(200,167,93,0.4)",
          }}
        />

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          alfahd-contracting.com
        </div>
      </div>
    ),
    { ...size }
  );
}
