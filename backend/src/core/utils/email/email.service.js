// backend/src/core/utils/email/email.service.js
import nodemailer from "nodemailer";
import { authConfig } from "../../config/auth.config.js";

export class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(email, token, name) {
    const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/auth/verify/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"NinjaTube" <noreply@ninjatube.com>',
      to: email,
      subject: "Verifique seu email - NinjaTube",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NinjaTube</h1>
              <p>YouTube Analytics Platform</p>
            </div>
            <div class="content">
              <h2>Olá ${name}!</h2>
              <p>Obrigado por se cadastrar no NinjaTube. Para começar a usar nossa plataforma, precisamos verificar seu endereço de email.</p>
              
              <p style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" class="button">Verificar Email</a>
              </p>
              
              <p>Ou copie e cole este link no seu navegador:</p>
              <p style="background: #eee; padding: 10px; border-radius: 4px; word-break: break-all;">
                ${verificationUrl}
              </p>
              
              <p>Este link expira em 24 horas.</p>
              
              <div class="footer">
                <p>Se você não criou uma conta no NinjaTube, ignore este email.</p>
                <p>&copy; ${new Date().getFullYear()} NinjaTube. Todos os direitos reservados.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Olá ${name}!
        
        Obrigado por se cadastrar no NinjaTube. Para começar a usar nossa plataforma, precisamos verificar seu endereço de email.
        
        Clique no link abaixo para verificar seu email:
        ${verificationUrl}
        
        Este link expira em 24 horas.
        
        Se você não criou uma conta no NinjaTube, ignore este email.
        
        Atenciosamente,
        Equipe NinjaTube
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(
        `✅ Email de verificação enviado para ${email}:`,
        info.messageId,
      );
      return true;
    } catch (error) {
      console.error(`❌ Erro ao enviar email para ${email}:`, error);
      // Em desenvolvimento, apenas logamos o token
      console.log(`🔑 Token de verificação (dev): ${token}`);
      return false;
    }
  }

  async sendPasswordResetEmail(email, token, name) {
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/auth/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"NinjaTube" <noreply@ninjatube.com>',
      to: email,
      subject: "Redefinição de Senha - NinjaTube",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #DC2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #DC2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NinjaTube</h1>
              <p>Redefinição de Senha</p>
            </div>
            <div class="content">
              <h2>Olá ${name}!</h2>
              <p>Recebemos uma solicitação para redefinir a senha da sua conta no NinjaTube.</p>
              
              <p style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" class="button">Redefinir Senha</a>
              </p>
              
              <p>Ou copie e cole este link no seu navegador:</p>
              <p style="background: #eee; padding: 10px; border-radius: 4px; word-break: break-all;">
                ${resetUrl}
              </p>
              
              <p><strong>Este link expira em 1 hora.</strong></p>
              <p>Se você não solicitou a redefinição de senha, ignore este email.</p>
              
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} NinjaTube. Todos os direitos reservados.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email de reset de senha enviado para ${email}`);
      return true;
    } catch (error) {
      console.error(`❌ Erro ao enviar email de reset para ${email}:`, error);
      console.log(`🔑 Token de reset (dev): ${token}`);
      return false;
    }
  }
}

export const emailService = new EmailService();
