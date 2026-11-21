import QRCode from "qrcode";

export function generateQRCodeBase64(value) {
  return QRCode.toDataURL(value, { width: 400, margin: 4 });
}
