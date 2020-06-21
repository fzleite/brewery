import logger from './logger.js';
import http from 'http';

export default function webServer(params) {
    const log = logger();
    log.setPrefix('[WebServer]');

    const start = () => {
        log.log('Starting WebServer');
        params.http = http.Server(params.app);
        log.log('Starting done');
    };

    const stop = () => {
        log.log('Stopping WebServer');
        log.log('Stopping done');
    };

    return {
        start,
        stop,
    };
}
