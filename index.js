const express = require("express");
const cors = require("cors");
const app = express();
const data = require("./data/student_profiles.json");
const path = require("path"); // Import path module


app.use(express.json());
app.use(cors());

app.get("/students", (req, res) => {
  res.status(200).json({ message: "success", data: data });
});
app.get("/student/:id", (req, res) => {
  const apaarId = req.params.id;
  const object = data.find((val) => val.studentProfile.APAAR_ID === apaarId);
  if (object) {
    res.json(object);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "/build")));
// Serve the React app for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(5000, () => {
  console.log("Running on Port 5000");
});
