import { data } from "./data.js";
import slugify from "slugify";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

// Ensure the ./qrs directory exists
const qrDir = path.join(".", "qrs");
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir);
}

data.forEach((person) => {
  if (person["Full Name"]) {
    // Generate the slug and URL
    const slug = slugify(person["Full Name"], { lower: true });
    const url = `https://attendease.kraftsai.com/checkin/${slug}`;
    
    // Sanitize the full name for a safe filename
    const safeFileName = slugify(person["Full Name"], { lower: true });
    const filePath = path.join(qrDir, `${safeFileName}.png`);

    // Generate and save the QR code to file
    QRCode.toFile(filePath, url, (err) => {
      if (err) {
        console.error(`Error generating QR for ${person["Full Name"]}:`, err);
      } else {
        console.log(`QR code generated for ${person["Full Name"]} at ${filePath}`);
      }
    });
  }
});

