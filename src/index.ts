import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM formdata");
  res.send(`Hello, World! The time from the DB is ${rows[0].now}`);
});

app.post("/form", async (req, res) => {
  try {
    const { firstName, lastName, email, country, pushNotifications } = req.body;
    await pool.query(
      "INSERT INTO newformdata (firstName, lastName, email, country, pushNotifications) VALUES ($1, $2, $3, $4, $5)",
      [firstName, lastName, email, country, pushNotifications]
    );
    res.send("Success!");
  } catch (e) {
    console.error(e);
  }
});

// router.post("/api/v1/submit", async (req, res) => {
//   // send data to database
//   try {
//     await pool.
//     res.status(200).send("Success");
//   } catch (err) {
//     res.status(400).send("Error");
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
