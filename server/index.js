import apiRoutes from "./routes/apiRoutes.js";
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
  console.log('Database Connected...');
} catch (error) {
  console.error('Database Connection Error:', error);
}

app.use(cors(corsOptions))
app.use(express.static(path.resolve('./app/build')));

// ROUTES -> CONTROLLERS -> MODELS
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});