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
