<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="480" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e3a4f 0%, #3a8a8c 100%); padding: 32px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 2px;">AVAA</h1>
                            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">Recruitment Management System</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 8px; color: #1a1a1a; font-size: 22px; font-weight: 700;">Reset Your Password</h2>
                            <p style="margin: 0 0 28px; color: #5a6a75; font-size: 15px; line-height: 1.6;">
                                We received a request to reset your password. Click the button below to choose a new password. This link expires in <strong>60 minutes</strong>.
                            </p>

                            <!-- Reset Button -->
                            <div style="text-align: center; margin-bottom: 28px;">
                                <a href="{{ $resetUrl }}" style="display: inline-block; background: #3CD894; color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; padding: 14px 40px; border-radius: 12px; letter-spacing: 0.5px;">
                                    Reset Password
                                </a>
                            </div>

                            <p style="margin: 0 0 16px; color: #5a6a75; font-size: 14px; line-height: 1.6;">
                                If the button doesn't work, copy and paste this link into your browser:
                            </p>
                            <p style="margin: 0 0 4px; color: #3CD894; font-size: 13px; word-break: break-all;">
                                {{ $resetUrl }}
                            </p>

                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

                            <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.6;">
                                If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px 28px; border-top: 1px solid #e5e7eb; text-align: center;">
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                &copy; {{ date('Y') }} AVAA RMS. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
