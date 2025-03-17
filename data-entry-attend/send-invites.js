const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');
const { data } = require('./data.js');
const slugify = require('slugify');

const client = new Client({ authStrategy: new LocalAuth() });

// Sleep function to wait for the specified milliseconds.
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Log functions including the slug in the log message.
const logSuccess = (slug, message) => {
  const logMessage = `${new Date().toISOString()} - ${slug} - ${message}\n`;
  fs.appendFile("whatsapp-success-log.txt", logMessage, (err) => {
    if (err) console.error("Failed to write success log:", err);
  });
};

const logError = (slug, message) => {
  const logMessage = `${new Date().toISOString()} - ${slug} - ${message}\n`;
  fs.appendFile("whatsapp-error-log.txt", logMessage, (err) => {
    if (err) console.error("Failed to write error log:", err);
  });
};

// Generate and save QR code image for authentication
client.on('qr', qr => {
  const filename = `qr-${Date.now()}.png`;
  qrcode.toFile(filename, qr, err => {
    if (err) {
      console.error('Error generating QR code:', err);
      logError("N/A", `QR code generation error: ${err}`);
    } else {
      console.log('QR code saved as', filename);
      logSuccess("N/A", `QR code saved as ${filename}`);
    }
  });
});

// Invitation message generator
const getInvitationMessage = (title, name) => `
${title} ${name}،
يسرّنا تأكيد حضوركم لحضور يوم العرض النهائي لهاكاثون سوريا، ويسعدنا مشاركتكم في هذا الحدث المميز الذي يجمع مجموعة من المبتكرين ورواد الأعمال لعرض حلولهم الريادية.

مرفق بطاقة الدعوة الخاصة بكم، والتي تتضمن رمز QR لتسهيل عملية الدخول.

📍 الموقع: دار أوبرا دمشق
⏰ التوقيت: 1:30 بعد الظهر
📅 التاريخ: السبت، 8 آذار 2025

نتطلع لرؤيتكم والمشاركة معكم في هذا الحدث الملهم!

مع أطيب التحيات،
فريق هاكاثون سوريا`;

client.on('ready', async () => {
  console.log('Client is ready!');
  
  // Loop through each person in the data array
  for (const person of data) {
    if (!person["Full Name"]) continue;
    
    const slug = slugify(person["Full Name"], { lower: true });
  
    if(!person["Seating Zone"]) continue;
    
    const phone = person["Phone Number"];
    if (!phone) {
      const errorMsg = `No phone number for ${person["Full Name"]}`;
      console.error(errorMsg);
      logError(slug, errorMsg);
      continue;
    }
    const contact = `${phone}@c.us`;

    // Set title based on gender; if gender is empty, set title to an empty string.
    const title = person["Gender"] ? (person["Gender"] === "Female" ? "السيدة" : "السيد") : "";
    const name = person["Full Name Ar"] || person["Full Name"];
    const messageText = getInvitationMessage(title, name);

    // Assume each invitation image is named after the slug and stored in the 'invitation' folder
    const imageFileName = `${person['Category']}-${slug}.png`;
    const filePath = path.resolve(__dirname, 'invitation', imageFileName);
    let imageMedia;
    try {
      imageMedia = MessageMedia.fromFilePath(filePath);
    } catch (err) {
      const errorMsg = `Error loading image for ${person["Full Name"]} from ${filePath}: ${err}`;
      console.error(errorMsg);
      logError(slug, errorMsg);
      continue;
    }

    try {
      await client.sendMessage(contact, messageText);
      console.log(`Text message sent to ${contact}`);
      logSuccess(slug, `Text message sent to ${contact}`);
      
      await client.sendMessage(contact, imageMedia);
      console.log(`Image sent to ${contact}`);
      logSuccess(slug, `Image sent to ${contact}`);
    } catch (err) {
      const errorMsg = `Error sending message to ${contact}: ${err}`;
      console.error(errorMsg);
      logError(slug, errorMsg);
    }
    
    // Wait for 1 second before processing the next person
    await sleep(1000);
  }
});

client.initialize();
