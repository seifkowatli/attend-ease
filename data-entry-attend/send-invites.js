const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const path = require('path');

const client = new Client({ authStrategy: new LocalAuth() });

// Generate and save QR code image
client.on('qr', qr => {
  const filename = `qr-${Date.now()}.png`;
  qrcode.toFile(filename, qr, err => {
    if (err) {
      console.error('Error generating QR code:', err);
    } else {
      console.log('QR code saved as', filename);
    }
  });
});

// When client is ready, send messages with an image
client.on('ready', () => {
  console.log('Client is ready!');
  
  // Contacts must be in the format 'number@c.us'
  const contacts = ['971523556963@c.us', '971582558508@c.us' ,'963991448543@c.us'];
  
  // Text message to send
  const textMessage = 'Hello, this is a test bulk message with an image.';
  
  // Load the local image (replace 'image.png' with your image file name if different)
  const filePath = path.resolve(__dirname, 'invitation' , 'Partner-ghassan-heto.png');
  const imageMedia = MessageMedia.fromFilePath(filePath);
  
  // Send the text message followed by the image to each contact
  contacts.forEach(contact => {
    client.sendMessage(contact, textMessage)
      .then(() => {
        console.log(`Text message sent to ${contact}`);
        return client.sendMessage(contact, imageMedia);
      })
      .then(() => {
        console.log(`Image sent to ${contact}`);
      })
      .catch(err => console.error(`Error sending message to ${contact}:`, err));
  });
});

client.initialize();
