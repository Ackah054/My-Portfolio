import type React from "react"
interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, subject, message }) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <h2 style={{ color: "#333", borderBottom: "2px solid #f97316", paddingBottom: "10px" }}>
      New Message from Portfolio Website
    </h2>

    <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Subject:</strong> {subject}
      </p>
    </div>

    <div style={{ backgroundColor: "#fff", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3 style={{ color: "#333", marginTop: "0" }}>Message:</h3>
      <p style={{ lineHeight: "1.6", color: "#555" }}>{message}</p>
    </div>

    <div
      style={{
        marginTop: "20px",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        fontSize: "12px",
        color: "#666",
      }}
    >
      This message was sent from your portfolio contact form.
    </div>
  </div>
)
