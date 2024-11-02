const winston = require('winston');

// Logging
const logger = winston.createLogger({
    level: 'info',
    // Use timestamp and printf to create a standard log format
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
    ),
    
    // Log to the console
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
        // new winston.transports.File({ filename: 'logs/app.log' }),
    ],
});

const infoLevelLogging = (req, res, next) => {
    // Log an info message for each incoming request
    logger.info(`${req.method} ${req.url}`);
    next();
};

module.exports = { logger, infoLevelLogging };
