const path = require('path');
const { createLogger, format, transports } = require("winston");
const { APP_ENV } = require('../config/index');
const { getEnv } = require('./index');
const env = getEnv();

const customFormat = format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    env === APP_ENV.dev ? format.colorize({ all: true }) : undefined,
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
);

const plugin = env !== APP_ENV.dev ? [
    new transports.File({
        filename: 'logs/info.log',
        level: "info",
        format: format.combine(
            format.printf((i) =>
                i.level === "info" ?
                `${i.level}: ${i.timestamp} ${i.message}` :
                ""
            )
        ),
    }),
    new transports.File({
        filename: 'logs/error.log',
        level: "error",
    }),
] : []

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console(),
        ...plugin
    ],
});

module.exports = {
    logger
};
