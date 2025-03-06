import fs from "fs";
import slugify from "slugify";
import { data } from "./data.js";


const header = "Title,Fullanme,invitation link,Invite Card\n";

let csvContent = "\uFEFF" + header;

const getInvitationMessage = (title , name) => `
${title} ${name}،
يسرّنا تأكيد حضوركم لحضور يوم العرض النهائي لهاكاثون سوريا، ويسعدنا مشاركتكم في هذا الحدث المميز الذي يجمع مجموهة من المبتكرين ورواد الأعمال لعرض حلولهم الريادية.

مرفق بطاقة الدعوة الخاصة بكم، والتي تتضمن رمز QR لتسهيل عملية الدخول.

📍 الموقع: دار أوبرا دمشق
⏰ التوقيت: 1:30 بعد الظهر
📅 التاريخ: السبت، 8 آذار 2025

نتطلع لرؤيتكم والمشاركة معكم في هذا الحدث الملهم!

مع أطيب التحيات،
فريق هاكاثون سوريا`

data.forEach(person => {
  if (person["Full Name"]) {
    const fullName = person["Full Name Ar"] || person["Full Name"];
    const slug = slugify(person["Full Name"], { lower: true });
    const category  = person["Category"] || ""
    const invitationLink = `https://attendease.kraftsai.com/checkin/${slug}`;
    const categorySlug = `${category}-${slug}`;
    const title = person["Gender"] === "Female" ?  "السيدة" : "السيد";

    // Create a CSV row (wrap fields in quotes in case they include commas)
    csvContent += `"${getInvitationMessage(title,fullName)}","${title}","${fullName}","${invitationLink}","${categorySlug}"\n`;
  }
});

// Write the CSV content to a file
fs.writeFile("output.csv", csvContent, {encoding : 'utf-8'}, err => {
  if (err) {
    console.error("Error writing CSV file:", err);
  } else {
    console.log("CSV file generated as output.csv");
  }
});
