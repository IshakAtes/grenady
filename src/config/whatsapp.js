export const whatsappConfig = {
  phoneNumber: '491234567890',
  fileMessage:
    'Hallo Grenady, ich habe gerade eine Anfrage über eure Website gestellt. Hier sind meine Fotos und Inspirationen zum Projekt.',
};

export const getWhatsappUrl = (message = whatsappConfig.fileMessage) => {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
};
