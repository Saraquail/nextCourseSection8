import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const { feedback, email } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: "Feedback submitted",
      feedback: newFeedback,
    });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
