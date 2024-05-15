import { createLogger, transports, format } from 'winston';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logger = createLogger({
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
