import express from "express";
import { connectDB, closeDB } from "./config/db";
import eventRoutes from "./routes/eventRoutes";

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Event Planner API",
    database: "EventPlanner",
    version: "1.0.0",
    endpoints: {
      "POST api/events": "Create a new event",
      "GET api/events": "Get all events",
      "GET api/events/:id": "Get an event by ID",
      "PUT api/events/:id": "Update an event by ID",
      "DELETE api/events/:id": "Delete an event by ID",
    },
  });
});

app.use("/events", eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log(" Shutting down...");
  await closeDB();
  process.exit(0);
});

export default app;
