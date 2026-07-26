import { ImageResponse } from "next/og";

export const alt = "Pet One, hiểu rõ hơn để chăm bé tốt hơn";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#eff7fa",
          color: "#102e3a",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 82px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "720px",
          }}
        >
          <div
            style={{
              color: "#0d5fa8",
              display: "flex",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Pet One Veterinary Care
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "76px",
              fontWeight: 600,
              letterSpacing: "-2px",
              lineHeight: 1.04,
              marginTop: "28px",
            }}
          >
            <span>Hiểu rõ hơn.</span>
            <span style={{ color: "#1684d6" }}>Chăm bé tốt hơn.</span>
          </div>
          <div
            style={{
              color: "#5b737d",
              display: "flex",
              fontSize: "25px",
              lineHeight: 1.5,
              marginTop: "32px",
            }}
          >
            Một hành trình khám nhẹ nhàng, rõ ràng cho người nuôi và thú cưng.
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            border: "44px solid rgba(22,132,214,0.12)",
            borderRadius: "999px",
            display: "flex",
            height: "420px",
            justifyContent: "center",
            width: "420px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#c92d3d",
              borderRadius: "28px",
              color: "white",
              display: "flex",
              fontSize: "96px",
              fontWeight: 600,
              height: "150px",
              justifyContent: "center",
              width: "150px",
            }}
          >
            +
          </div>
        </div>
      </div>
    ),
    size,
  );
}
