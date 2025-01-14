// utils/qrGenerator.js
import QRCode from 'qrcode'; // Si necesitas el componente para el cliente
import QRCodeLib from 'qrcode'; // Si necesitas generarlo en el backend

/**
 * Genera un componente de QR para renderizar en el cliente.
 * @param {string} value - URL o texto que codificará el QR.
 * @param {Object} options - Opciones adicionales (tamaño, colores, etc.).
 * @returns React.Component
 */
export function generateQRCodeComponent(value, options = {}) {
  const { size = 200, bgColor = "#ffffff", fgColor = "#000000" } = options;
  return (
    <QRCode
      value={value}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
    />
  );
}

/**
 * Genera un QR como Base64 para su uso o almacenamiento.
 * @param {string} value - URL o texto que codificará el QR.
 * @returns {Promise<string>} - Imagen QR codificada en Base64.
 */
export async function generateQRCodeBase64(value) {
  return await QRCodeLib.toDataURL(value);
}
