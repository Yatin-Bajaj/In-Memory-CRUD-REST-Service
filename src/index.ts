require("dotenv").config();
const express = require("express");
const app = express();

const userRoutes = require("./Routes/userRoutes");
const logger = require("./utils/logger");
const PORT = parseInt(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(userRoutes);
app.use((err, req, res, next) => {
    res.status(500).send("Server Error");
});
app.listen(PORT, () => {
    console.log(`Server is up and Running => http://localhost:${PORT}`);
});
