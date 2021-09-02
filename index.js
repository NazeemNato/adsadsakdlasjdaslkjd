const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
}))
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const PORT = 8000;

const domains = [
  "samecookie.nazeemnato.repl.co",
  "site1roan.vercel.app",
]

const key = "userToken"


app.get("/", (req, res) => {
  return res.send("Hey Welcome")
})

app.post("/auth", async (req, res) => {
  const name = req.body.name || "Nazeem";
  try {
    domains.map((e) => res.cookie(key, name, {
      domain: e,
      secure: true
    }))
    return res.send({ ok: "yes" })
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
})

app.listen(PORT, () => {
  console.log("Server started")
})