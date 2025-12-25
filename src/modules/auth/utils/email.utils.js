/* eslint-disable max-len */
export const verifyEmailTemplate = (verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - Colabrix</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">
              <tr>
                <td style="border: 2px solid #000000; padding: 40px;">
                  <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #000000; font-weight: bold;">Colabrix</h1>

                  <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #000000; font-weight: normal;">Welcome to Colabrix!</h2>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    Thank you for signing up. Please verify your email address to complete your registration.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <a href="${verificationUrl}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 15px 40px; font-size: 16px; font-weight: bold; border-radius: 4px;">
                          Verify Email Address
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 20px; color: #666666;">
                    Or copy and paste this link into your browser:
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 20px; color: #0066cc; word-break: break-all;">
                    ${verificationUrl}
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    This link will expire in 24 hours.
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    If you did not create an account, please ignore this email.
                  </p>

                  <hr style="border: none; border-top: 1px solid #000000; margin: 30px 0;">

                  <p style="margin: 0; font-size: 14px; line-height: 20px; color: #666666;">
                    This is an automated message from Colabrix. Please do not reply to this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export const passwordResetTemplate = (resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - Colabrix</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">
              <tr>
                <td style="border: 2px solid #000000; padding: 40px;">
                  <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #000000; font-weight: bold;">Colabrix</h1>

                  <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #000000; font-weight: normal;">Password Reset Request</h2>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    We received a request to reset your password. Click the button below to reset your password:
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <a href="${resetUrl}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 15px 40px; font-size: 16px; font-weight: bold; border-radius: 4px;">
                          Reset Password
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 20px; color: #666666;">
                    Or copy and paste this link into your browser:
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 20px; color: #0066cc; word-break: break-all;">
                    ${resetUrl}
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    This link will expire in 1 hour.
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    If you did not request a password reset, please ignore this email.
                  </p>

                  <hr style="border: none; border-top: 1px solid #000000; margin: 30px 0;">

                  <p style="margin: 0; font-size: 14px; line-height: 20px; color: #666666;">
                    This is an automated message from Colabrix. Please do not reply to this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export const passwordResetSuccessTemplate = () => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Successful - Colabrix</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">
              <tr>
                <td style="border: 2px solid #000000; padding: 40px;">
                  <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #000000; font-weight: bold;">Colabrix</h1>

                  <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #000000; font-weight: normal;">Password Reset Successful</h2>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    Your password has been successfully reset.
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    You can now log in to your account using your new password.
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #000000;">
                    If you did not make this change, please contact support immediately.
                  </p>

                  <hr style="border: none; border-top: 1px solid #000000; margin: 30px 0;">

                  <p style="margin: 0; font-size: 14px; line-height: 20px; color: #666666;">
                    This is an automated message from Colabrix. Please do not reply to this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
