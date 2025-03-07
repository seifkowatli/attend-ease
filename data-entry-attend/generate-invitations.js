import puppeteer from "puppeteer";
import slugify from "slugify";
import { data } from "./data.js";
import fs from "fs";
import path from "path";

// Ensure the ./invitation directory exists
const invitationDir = path.join(".", "invitation");
if (!fs.existsSync(invitationDir)) {
  fs.mkdirSync(invitationDir);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set mobile viewport (e.g., iPhone dimensions)
  await page.setViewport({ width: 375, height: 760, isMobile: true });
  
  for (const person of data) {
    if (person["Full Name"]) {
      const slug = slugify(person["Full Name"], { lower: true });
      const url = `https://attendease.kraftsai.com/checkin/${slug}`;
      console.log(`Visiting: ${url}`);
      
      try {
        await page.goto(url, { waitUntil: "networkidle2" });
        // Screenshot file path
        const filePath = path.join(invitationDir, `${person['Category']}-${slug}.png`);
        await page.screenshot({ path: filePath });
        console.log(`Saved screenshot for ${person["Full Name"]} to ${filePath}`);
      } catch (error) {
        console.error(`Error processing ${url}:`, error);
      }
    }
  }
  
  await browser.close();
})();
