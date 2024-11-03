const express = require("express");
const cors = require("cors");
const setupRouter = require('./src/routes/index.js');
// const errorHandler = require('./src/middlewares/errorHandling.middlware.js');

const {
    logger,
    infoLevelLogging,
} = require("./src/middlewares/logging.middleware.js");
const db = require("./models/index.js");
require("dotenv").config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // For json format of requests and responses
app.use(infoLevelLogging);

// ping api
app.get("/", (req, res) => {
    res.json({
        message: "Hello",
    });
});

// router
setupRouter(app);

// Error hanlding
// app.use(errorHandler);

const PORT = process.env.PORT || 8080;
db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        logger.log("info", `App listening on port ${PORT}!`);
    });
});
