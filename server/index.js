const express = require("express");
const cors = require('cors')
const path = require('path');

const PORT = process.env.PORT || 3001;

const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

const app = express();
app.use(cors(corsOptions))
app.use(express.static(path.resolve(__dirname, '../app/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});