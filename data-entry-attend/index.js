
import { data } from "./data.js";
import slugify from "slugify";

const processData = async (persons) => {
  for (const person of persons) {
    if (person["Full Name"]) {
      // Create the attendee object using the relevant fields.
      const attendee = {
        name_en: person["Full Name"],
        name_ar: person["Arabic Name"] || person["Full Name"],
        slug: slugify(person["Full Name"], { lower: true }),
        email: person["Email"] || slugify(person["Full Name"], { lower: true }) + "@hacksyria.com",
        title: person["Title"] || "",
        organization: person["Organization"] || "",
        organization_type: person["Organization Type"] || "",
        seat: person["Seat"] || "",
        demo_day: person["Demo Day"] ? true : false,
        dinner: person["Dinner"] ? true : false
      };

      console.log(attendee.name_en, "-----", attendee.slug);

      // Send the attendee data via a POST request using fetch.
      try {
        const response = await fetch("https://attendease-cms.kraftsai.com/api/attendees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxMTkyMzkzLCJleHAiOjE3NDM3ODQzOTN9.OJG6Rf-WtaRbZHTZS2xAgBwDSPyhCosOvKN2DvjBA9o"
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
