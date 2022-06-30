import logLevel from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

export const setupLogger = (): void => {
  prefix.reg(logLevel);
  logLevel.enableAll();

  prefix.apply(logLevel, {
    format(level, name, timestamp) {
      return `[${timestamp}] [${level.toUpperCase()}] ${name}:`;
    },
  });

  prefix.apply(logLevel.getLogger('critical'), {
    format(level, name, timestamp) {
      return `[${timestamp}] ${level} ${name}:`;
    },
  });
};

function getCustomLogger() {
  setupLogger();
  return logLevel;
}

export const log = getCustomLogger();
