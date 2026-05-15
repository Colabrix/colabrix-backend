
export const inviteLinkTemplate = ({ organizationName, inviterEmail, inviteUrl, expiresAt }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Invitation to Join Colabrix Organization</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #4F46E5; 
            color: white; 
            text-decoration: none; 
            border-radius: 6px;
            margin: 20px 0;
          }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>You're invited to join ${organizationName} on Colabrix!</h2>
          <p>${inviterEmail} has invited you to collaborate on Colabrix.</p>
          <p>Click the button below to accept the invitation:</p>
          <a href="${inviteUrl}" class="button">Accept Invitation</a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #4F46E5;">${inviteUrl}</p>
          <p class="footer">
            This invitation expires on ${new Date(expiresAt).toLocaleDateString()}.
            <br>If you didn't expect this invitation, you can safely ignore this email.
          </p>
        </div>
      </body>
    </html>
  `;
};