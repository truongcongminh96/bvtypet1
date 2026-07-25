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
          background: "#eff7fb",
          color: "#082d46",
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
              color: "#0b6fc2",
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "3px",
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
              fontWeight: 800,
              letterSpacing: "-4px",
              lineHeight: 0.98,
              marginTop: "28px",
            }}
          >
            <span>Hiểu rõ hơn.</span>
            <span style={{ color: "#0b6fc2" }}>Chăm bé tốt hơn.</span>
          </div>
          <div
            style={{
              color: "#586a75",
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
            border: "44px solid rgba(11,111,194,0.14)",
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
              background: "#e63843",
              borderRadius: "28px",
              color: "white",
              display: "flex",
              fontSize: "96px",
              fontWeight: 800,
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
