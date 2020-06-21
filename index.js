import http from 'http';
import express from 'express';
import logger from './logger.js';
import webServer from './web-server.js';

export default function brewery() {
    const log = logger();
    const app = {
        app: express(),
    };

    log.setPrefix('[Brewery]');

    /**
     * Starts the brewery application
     */
    const start = () => {
        log.log('Starting Brewery');
        app.webServer = webServer(app);
        app.webServer.start();
        log.log('Starting done');
    };

    const stop = () => {
        log.log('Stopping Brewery');
        log.log('Stopping done');
    };

    return {
        start,
        stop,
    };
}

const mainBrewery = brewery();
mainBrewery.start();
