export function PetOneStudioLogo() {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: 10,
        minWidth: 0,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          alignItems: "center",
          background: "#1684d6",
          borderRadius: 8,
          color: "#ffffff",
          display: "inline-flex",
          flex: "0 0 auto",
          fontSize: 13,
          fontWeight: 800,
          height: 32,
          justifyContent: "center",
          letterSpacing: 0,
          width: 32,
        }}
      >
        PO
      </span>
      <span style={{ lineHeight: 1.1, minWidth: 0 }}>
        <strong
          style={{
            color: "inherit",
            display: "block",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          Pet One
        </strong>
        <span
          style={{
            display: "block",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 0,
            marginTop: 3,
            opacity: 0.62,
          }}
        >
          Content Studio
        </span>
      </span>
    </div>
  );
}
