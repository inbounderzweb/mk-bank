import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Morazha Kalliasseri Service Co-op Bank";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Local asset doesn't depend on request data, so cache the read across requests.
let logoSrcPromise: Promise<string> | null = null;
function getLogoSrc() {
  if (!logoSrcPromise) {
    logoSrcPromise = readFile(path.join(process.cwd(), "public", "logo.png"), "base64").then(
      (data) => `data:image/png;base64,${data}`
    );
  }
  return logoSrcPromise;
}

export default async function Image() {
  const logoSrc = await getLogoSrc();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0f172a",
          position: "relative",
        }}
      >
        {/* Ambient corner glows */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "#ed1c24",
            opacity: 0.28,
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -160,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "#2dba4e",
            opacity: 0.24,
            filter: "blur(10px)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={160} height={160} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              MK Bank
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "#cbd5e1",
              }}
            >
              Morazha Kalliasseri Service Co-op Bank
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2dba4e" }} />
            Est. 1961 · Class 1 Super Grade Bank
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
