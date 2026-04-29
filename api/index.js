const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4444;

app.use(require("express").urlencoded({ extended: true }));
app.use(require("express").json());

async function connectingToDB() {
  try {
    await require("mongoose").connect(process.env.MONGO);
    console.log("Connected to the DB ✅");
  } catch (error) {
    console.log("ERROR: Your DB is not running, start it up ☢️");
  }
}
connectingToDB();

//==========================================================================
app.use(require("cors")());
//==========================================================================
//app.use('/test',require('./routes/routes.js'))
app.use("/api/records", require("./routes/discogsCollection_routes.js"));
app.use("/api/users", require("./routes/users_routes.js"));
app.use("/api/cart", require("./routes/cart_routes.js"));
app.use("/api/payment", require("./routes/payment_routes.js"));
//==========================================================================

module.exports = app;

if (process.env.NODE_ENV !== "production") {
  // Serve static files from the dist directory
  app.use(express.static("dist"));
  // Serve index.html for all other requests
  app.get("/{*splat}", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
  // Start the server
  const port = process.env.PORT || 4444;
  app.listen(port, () => console.log("🚀 Listening on port: " + port + " 🚀"));
}
