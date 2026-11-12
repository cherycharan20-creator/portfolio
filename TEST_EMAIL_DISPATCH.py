"""
One-Click Email Dispatch Diagnostic Tool
Tests sending a real email OTP from cherycharan20@gmail.com to your email/phone.
"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os
import sys

def run_test():
    print("=" * 65)
    print("📧 GMAIL SMTP DISPATCH DIAGNOSTIC TOOL")
    print("   Sender Account: cherycharan20@gmail.com")
    print("=" * 65)

    # Find config
    config_paths = ["email_config.json", "downloads_project/project-backend 1successful/email_config.json"]
    cfg = None
    for p in config_paths:
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                cfg = json.load(f)
                break

    if not cfg:
        print("❌ Error: email_config.json not found.")
        return

    smtp_user = cfg.get("smtp_user", "cherycharan20@gmail.com")
    smtp_pass = cfg.get("smtp_pass", "").replace(" ", "").strip()
    smtp_server = cfg.get("smtp_server", "smtp.gmail.com")
    smtp_port = int(cfg.get("smtp_port", 587))

    print(f"\n1. Sender Address : {smtp_user}")
    print(f"2. SMTP Host      : {smtp_server}:{smtp_port}")
    print(f"3. App Password   : {'[CONFIGURED]' if smtp_pass else '❌ [MISSING / EMPTY]'}")

    if not smtp_pass:
        print("\n" + "=" * 65)
        print("⚠️ ACTION REQUIRED: Google App Password is required to send real emails.")
        print("Follow these 3 quick steps:")
        print("  Step 1: Go to https://myaccount.google.com/security")
        print("          (Make sure 2-Step Verification is turned ON)")
        print("  Step 2: Go to https://myaccount.google.com/apppasswords")
        print("          Type 'Portfolio' as the app name and click 'Create'.")
        print("          Google will display a 16-character password (e.g. abcd efgh ijkl mnop).")
        print("  Step 3: Paste that 16-character password into 'smtp_pass' in email_config.json and save.")
        print("=" * 65)
        return

    recipient = input(f"\nEnter recipient email address [default: {smtp_user}]: ").strip()
    if not recipient:
        recipient = smtp_user

    print(f"\nConnecting to {smtp_server}:{smtp_port} via TLS...")
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "🛡️ [TEST OTP] NEURA-SHIELD AI Real Email Delivery Test: 582914"
        msg["From"] = f"NEURA-SHIELD AI Security <{smtp_user}>"
        msg["To"] = recipient

        html_body = f"""
        <div style="font-family: Arial, sans-serif; background: #07090e; color: #f8fafc; padding: 25px; border-radius: 12px; max-width: 500px; border: 1px solid #38bdf8;">
            <h2 style="color: #38bdf8;">🛡️ Real Email Delivery Confirmed!</h2>
            <p>Hello,</p>
            <p>Your Gmail SMTP gateway is working properly! Your test verification code is:</p>
            <div style="background: #0d121f; border: 2px dashed #38bdf8; padding: 15px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #38bdf8; border-radius: 8px; margin: 20px 0;">
                582914
            </div>
            <p style="color: #94a3b8; font-size: 13px;">This email was dispatched from <strong>{smtp_user}</strong>.</p>
        </div>
        """
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(smtp_server, smtp_port, timeout=12) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, recipient, msg.as_string())

        print("\n" + "=" * 65)
        print(f"🎉 SUCCESS! Real email sent from {smtp_user} to {recipient}.")
        print("📱 Check your phone / inbox now! You should see the email with code 582914.")
        print("=" * 65)
    except smtplib.SMTPAuthenticationError:
        print("\n❌ Google SMTP Authentication Error:")
        print("   Google rejected the username or app password.")
        print("   Make sure 2-Step Verification is ON and you generated an App Password at:")
        print("   https://myaccount.google.com/apppasswords")
    except Exception as e:
        print(f"\n❌ SMTP Error: {e}")

if __name__ == "__main__":
    run_test()
