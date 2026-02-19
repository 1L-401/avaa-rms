<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
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
                            <h2 style="margin: 0 0 8px; color: #1a1a1a; font-size: 22px; font-weight: 700;">Verify Your Email</h2>
                            <p style="margin: 0 0 28px; color: #5a6a75; font-size: 15px; line-height: 1.6;">
                                Use the verification code below to complete your account registration. This code expires in <strong>10 minutes</strong>.
                            </p>

                            <!-- OTP Code -->
                            <div style="background-color: #f0f2f5; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 28px;">
                                <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1e3a4f; font-family: 'Courier New', monospace;">{{ $otp }}</span>
                            </div>

                            <p style="margin: 0 0 4px; color: #5a6a75; font-size: 14px; line-height: 1.6;">
                                If you didn't create an account with AVAA, you can safely ignore this email.
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
