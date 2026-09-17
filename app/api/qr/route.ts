import QRCode from "qrcode";

export async function GET() {
  const svg = await QRCode.toString("https://busrakarakoc.av.tr", {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 4,
    width: 1000,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": 'attachment; filename="busrakarakoc-qr.svg"',
    },
  });
}