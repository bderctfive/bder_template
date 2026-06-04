"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData) {
  const { name, email, category, message } = formData;

  // Basic validation
  if (!name || !name.trim()) {
    return { success: false, error: "missing_name" };
  }
  if (!email || !email.trim()) {
    return { success: false, error: "missing_email" };
  }
  if (!category || !category.trim()) {
    return { success: false, error: "missing_category" };
  }
  if (!message || !message.trim()) {
    return { success: false, error: "missing_message" };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: "invalid_email" };
  }

  try {
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "contact@bctech.com.mx";
    
    // Check if API key is present
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return { success: false, error: "missing_api_key" };
    }

    const { error } = await resend.emails.send({
      from: "BC Tech Contact Form <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email.trim(),
      subject: `Nuevo mensaje de contacto: ${category}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; rounded: 8px;">
          <h2 style="color: #111; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
          <p>Se ha recibido una nueva solicitud a través del formulario de contacto del sitio web.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #666;">Nombre:</td>
              <td style="padding: 8px 0; color: #111;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${email.trim()}">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Categoría:</td>
              <td style="padding: 8px 0; color: #111;">${category.trim()}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px; border-left: 4px solid #111;">
            <p style="margin: 0; font-weight: bold; color: #666; margin-bottom: 8px;">Mensaje:</p>
            <p style="margin: 0; color: #111; white-space: pre-wrap;">${message.trim()}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: "resend_error", message: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error in sendContactEmail action:", err);
    return { success: false, error: "server_error" };
  }
}
