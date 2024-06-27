import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/index.js";
import connectMongoDB from "./src/config/connectDb.js";

dotenv.config();
const app = express();

const port = process.env.PORT;
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use("/", router);

connectMongoDB();

app.listen(port, () => {
    console.log(`${port}`);
});
