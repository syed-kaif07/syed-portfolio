import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {/* Top content */}
      <div style={{ padding: "40px 48px", flex: 1, position: "relative", zIndex: 10 }}>

        {/* Label */}
        <p
          style={{
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            marginBottom: "48px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "8px" }}>●</span>
          404 Error. Page not found
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            maxWidth: "520px",
            marginBottom: "40px",
            letterSpacing: "-0.02em",
          }}
        >
          Oop's We will fix that soon!!!
        </h1>

        {/* Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {/* Return home */}
          <button
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              padding: "16px 20px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "Space Grotesk, sans-serif",
              cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
          >
            <span>Return home</span>
            <span style={{ fontSize: "16px" }}>↗</span>
          </button>

          {/* Mail */}
          <a
            href="mailto:syedkaifuddin4@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              padding: "16px 20px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "Space Grotesk, sans-serif",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail size={14} />
              Get in touch
            </span>
            <span style={{ fontSize: "16px" }}>↗</span>
          </a>
        </div>
      </div>

      {/* Giant 404 bottom */}
      <div
        style={{
          position: "relative",
          width: "100%",
          lineHeight: 0.85,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontSize: "clamp(120px, 28vw, 380px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            padding: 0,
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          404
        </p>
      </div>
    </div>
  );
};

export default NotFound;