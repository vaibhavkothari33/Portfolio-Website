// File: /pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, message } = req.body;

    // Validate and send email or save to DB
    console.log("Email:", email);
    console.log("Message:", message);

    return res.status(200).json({ message: "Message sent successfully!" });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
