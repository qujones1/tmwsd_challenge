const express = require("express");
const postgres = require("postgres");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const sql = postgres("postgres://api@localhost:5432/claraprice");

router.get("/", async (req, res) => {
  const messages = await sql`
    SELECT id, content
    FROM message
  `;

  // Disable caching of the home page so messages that have been deleted aren't
  // shown again on subsequent navigations. 
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.render("messages/index", { messages });
});

router.get("/message/:uuid", async (req, res) => {
  try {
    const [{ content }] = await sql`
      DELETE FROM message
      WHERE id=${req.params.uuid}
      RETURNING content
    `;
    res.render("messages/message", { content });
  } catch {
    res.redirect("/404");
  }
});

router.get("/404", (_, res) => {
  res.render("messages/404");
});

router.post("/message/create", async (req, res) => {
  const { message } = req.body;
  const [{ id }] = await sql`
    INSERT INTO message (id, content)
    VALUES (${uuidv4()}, ${message})
    RETURNING id
  `;

  res.json({ id });
});

module.exports = router;
