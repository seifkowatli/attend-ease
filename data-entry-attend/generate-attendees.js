
import { token } from "./auth.js";
import { data } from "./data.js";
import slugify from "slugify";

const processData = async (persons) => {
  for (const person of persons) {
    if (person["Full Name"]) {
      // Create the attendee object using the relevant fields.
      const attendee = {
        name_en: person["Full Name"],
        name_ar: person["Full Name Ar"] || person["Full Name"],
        slug: slugify(person["Full Name"], { lower: true }),
        email: person["Email"] || slugify(person["Full Name"], { lower: true }) + "@hacksyria.com",
        title: person["Gender"] === "Female" ?  "السيدة" : "السيد",
        phone: person["Phone Number"] || "",
        seat: person["Seating Zone"] || "",
        demo_day: !!person["Demo Day"] ,
        dinner: !!person["Dinner"],
        category: person["Category"] || "",
      };

      console.log(attendee.name_en, "-----", attendee.slug);

      // Send the attendee data via a POST request using fetch.
      try {
        const response = await fetch("https://attendease-cms.kraftsai.com/api/attendees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          },
          body: JSON.stringify({ data: attendee })
        });

        const result = await response.json();
        console.log("Created:", result);
      } catch (error) {
        console.error("Error creating attendee:", error);
      }
    }
  }
};

processData(data);
