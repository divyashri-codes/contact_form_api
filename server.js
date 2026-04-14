const express = require("express");
const app = express();

app.use(express.json());

let feedbacks = [];


app.get("/feedback", (req, res) => {
  res.json(feedbacks);
});


app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  const newFeedback = {
    id: feedbacks.length + 1,
    name,
    email,
    message
  };

  feedbacks.push(newFeedback);
  res.json(newFeedback);
});


app.delete("/feedback/:id", (req, res) => {
  const id = parseInt(req.params.id);

  feedbacks = feedbacks.filter(f => f.id !== id);

  res.json({ message: "Deleted successfully" });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});