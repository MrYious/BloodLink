import cors from "cors";
import dbConfig from "./config/dbConfig.js";
import express from "express";
import path from "path";

const PORT = process.env.PORT || 3001;

const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

const app = express();

try {
  await dbConfig.authenticate();
  console.log('Database connected...');
} catch (error) {
  console.error('Connection error:', error);
}

app.use(cors(corsOptions))
app.use(express.static(path.resolve('./app/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});