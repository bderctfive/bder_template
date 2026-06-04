"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
  website?: string; // Honeypot spam protection
}

export async function sendContactEmail(formData: ContactFormData) {
  // Honeypot spam check - if filled, silently succeed (pretending to succeed to confuse spam bots)
  if (formData.website && formData.website.trim() !== "") {
    console.warn("Honeypot field was filled by a bot. Suppressing email delivery.");
    return { success: true };
  }

  const { name, email, category, message } = formData;

  // Basic validation (null/undefined checks & trim)
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

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedCategory = category.trim();
  const trimmedMessage = message.trim();

  // Strict length limits for security (prevent buffer overflow / DDoS on mail body size)
  if (trimmedName.length < 2 || trimmedName.length > 100) {
    return { success: false, error: "name_length_invalid" };
  }
  if (trimmedEmail.length > 100) {
    return { success: false, error: "email_too_long" };
  }
  if (trimmedCategory.length > 100) {
    return { success: false, error: "category_too_long" };
  }
  if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
    return { success: false, error: "message_length_invalid" };
  }

  // Category enum validation
  const allowedCategories = ["software", "infra", "auto", "support", "other"];
  if (!allowedCategories.includes(trimmedCategory)) {
    return { success: false, error: "invalid_category" };
  }

  // Name character validation (only letters, spaces, dots, hyphens, and apostrophes; must contain at least one letter)
  const nameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.\-']+$/;
  const hasLetter = /[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/;
  if (!nameRegex.test(trimmedName) || !hasLetter.test(trimmedName)) {
    return { success: false, error: "invalid_name" };
  }

  // Email format validation (standard secure regex)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { success: false, error: "invalid_email" };
  }

  // Message content validation (must contain at least one letter or number, not just symbols)
  const messageRegex = /[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]/;
  if (!messageRegex.test(trimmedMessage)) {
    return { success: false, error: "invalid_message" };
  }

  try {
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "contact@bctech.com.mx";
    
    // Check if API key is present
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return { success: false, error: "missing_api_key" };
    }

    // Map strict enum value to a clear display label for the email
    const categoryMapping: Record<string, string> = {
      software: "Software & Apps",
      infra: "Infraestructura & TI / Infrastructure & IT",
      auto: "Automatización / Automation",
      support: "Venta y Soporte / Sales & Support",
      other: "Otro / Other"
    };
    const displayCategory = categoryMapping[trimmedCategory] || trimmedCategory;

    // Escape HTML inputs to prevent XSS / HTML injection in the email template
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeCategory = escapeHtml(displayCategory);
    const safeMessage = escapeHtml(trimmedMessage);

    const { error } = await resend.emails.send({
      from: "BC Tech Contact Form <onboarding@resend.dev>",
      to: toEmail,
      replyTo: safeEmail,
      subject: `Nuevo mensaje de contacto: ${safeCategory}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #111; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
          <p>Se ha recibido una nueva solicitud a través del formulario de contacto del sitio web.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #666;">Nombre:</td>
              <td style="padding: 8px 0; color: #111;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666;">Categoría:</td>
              <td style="padding: 8px 0; color: #111;">${safeCategory}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px; border-left: 4px solid #111;">
            <p style="margin: 0; font-weight: bold; color: #666; margin-bottom: 8px;">Mensaje:</p>
            <p style="margin: 0; color: #111; white-space: pre-wrap;">${safeMessage}</p>
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
