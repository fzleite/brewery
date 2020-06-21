export default function logger() {
    const loggerConfig = {
        prefix: '',
    };

    const setPrefix = (prefix) => {
        loggerConfig.prefix = prefix;
    };

    const log = (message) => {
        console.log(`${loggerConfig.prefix} ${message}`);
    };

    const logError = (message) => {
        console.log(`${loggerConfig.prefix} ${message}`);
    };

    return {
        setPrefix,
        log,
        logError,
    };
}
