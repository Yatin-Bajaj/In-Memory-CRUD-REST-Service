require("dotenv").config();
const express = require("express");
const app = express();

const userRoutes = require("./Routes/userRoutes");
const logger = require("./utils/logger");
const joiErrorHandler = require("./utils/joiErrorHandler");
const PORT = parseInt(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and Running => http://localhost:${3000}`);
});
