"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // You can set up your domain later
      to: "godfredackah816@gmail.com", // your email
      subject: String(subject),
      text: `
        New message from your portfolio site:
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    return { success: true, data }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to send email" }
  }
}
