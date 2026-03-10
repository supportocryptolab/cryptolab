import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendDownloadEmailParams {
to: string;
downloadUrl: string;
}

/**
* Send branded delivery email with PDF download link.
*/
export async function sendDownloadEmail({
to,
downloadUrl,
}: SendDownloadEmailParams) {
const fromEmail =
process.env.RESEND_FROM_EMAIL || "ordini@cryptolabitalia.com";

const safeUrl = escapeForEmailHref(downloadUrl);

const { data, error } = await resend.emails.send({
from: `CryptoLab <${fromEmail}>`,
to,
replyTo: "supportocryptolab@gmail.com",
subject: "Il tuo TradingBook è pronto 🚀",
html: buildEmailHTML(safeUrl, downloadUrl),
text: buildEmailText(downloadUrl),
headers: {
"X-Entity-Ref-ID": `cryptolab-tradingbook-${Date.now()}`,
"X-Auto-Response-Suppress": "OOF, AutoReply",
"X-Priority": "3",
},
});

if (error) {
console.error("Resend error:", error);
throw new Error(`Email send failed: ${error.message}`);
}

return data;
}

/**
* Escapes URL for href inside HTML email.
*/
function escapeForEmailHref(url: string): string {
return String(url)
.replace(/&/g, "&amp;")
.replace(/"/g, "&quot;")
.trim();
}

function buildEmailText(downloadUrl: string): string {
return `
CryptoLab

Grazie per il tuo acquisto!

Il tuo PDF "Le Basi-TradingBook" è pronto per il download.

Scaricalo qui:
${downloadUrl}

Il link è valido per 24 ore.
Se hai bisogno di aiuto, rispondi a questa email oppure scrivi a supportocryptolab@gmail.com

© ${new Date().getFullYear()} CryptoLab
`.trim();
}

function buildEmailHTML(safeHref: string, rawUrlForText: string): string {
return `
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#070B16;font-family:Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#070B16;">
<tr>
<td align="center" style="padding:40px 20px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

<tr>
<td align="center" style="padding-bottom:24px;">
<div style="font-size:28px;font-weight:800;color:#EAF2FF;letter-spacing:-0.5px;">
Crypto<span style="color:#77E1FD;">Lab</span>
</div>
</td>
</tr>

<tr>
<td style="background:#0B1120;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:34px 28px;">

<h1 style="margin:0 0 10px;font-size:26px;font-weight:800;color:#EAF2FF;text-align:center;">
Grazie per il tuo acquisto! 🎉
</h1>

<p style="margin:0 0 22px;font-size:15px;color:#A9B4D0;text-align:center;line-height:1.6;">
Il tuo PDF <strong style="color:#EAF2FF;">Le Basi-TradingBook</strong> è pronto per il download.
</p>

<div style="height:1px;background:linear-gradient(90deg,transparent,rgba(77,110,227,0.35),transparent);margin:22px 0;"></div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 auto;">
<tr>
<td align="center" style="padding:10px 0 18px;">
<a href="${safeHref}"
target="_blank"
rel="noopener noreferrer"
style="display:inline-block;padding:16px 34px;background:linear-gradient(90deg,#77E1FD 0%,#3EA8F9 35%,#4D6EE3 70%,#B3A7FB 100%);
color:#070B16;font-size:16px;font-weight:800;text-decoration:none;border-radius:14px;">
Scarica il PDF →
</a>
</td>
</tr>
</table>

<p style="margin:0 0 14px;font-size:13px;color:#A9B4D0;text-align:center;line-height:1.5;">
Se il bottone non funziona, copia e incolla questo link nel browser:
</p>

<p style="margin:0 0 18px;font-size:12px;color:#77E1FD;text-align:center;word-break:break-all;line-height:1.4;">
<a href="${safeHref}" target="_blank" rel="noopener noreferrer" style="color:#77E1FD;text-decoration:underline;">
${rawUrlForText}
</a>
</p>

<p style="margin:0;font-size:13px;color:#A9B4D0;text-align:center;line-height:1.5;">
⏰ Il link è valido per <strong style="color:#EAF2FF;">24 ore</strong>.
Se hai bisogno di aiuto, rispondi a questa email.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding-top:24px;">
<p style="margin:0 0 8px;font-size:13px;color:rgba(169,180,208,0.7);">
Supporto:
<a href="mailto:supportocryptolab@gmail.com" style="color:#3EA8F9;text-decoration:none;">supportocryptolab@gmail.com</a>
</p>
<p style="margin:0;font-size:11px;color:rgba(169,180,208,0.35);">
© ${new Date().getFullYear()} CryptoLab · Tutti i diritti riservati
</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`.trim();
}