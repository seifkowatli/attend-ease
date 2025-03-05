import { data } from "./data.js";
import fs from "fs";

const names = data
  .filter(person => person["Full Name"])
  .map(person => `https://attendease.kraftsai.com/checkin/${slugify(person["Full Name"], { lower: true })},${person["Full Name"]}.png,000000,FFFFFF,500`)
  .join(",\n");

fs.writeFile("names.txt", names, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File has been written");
  }
});


