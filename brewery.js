import logger from './logger.js';
import webServer from './web-server.js';

export default function brewery() {
    const log = logger();
    const app = {
        webServer: webServer(),
    };
    const routes = [
        {
            route: '/',
            handler: (req, res) => {
                res.render('index.ejs', {});
            },
            method: 'GET',
            description: 'Home',
        },
    ];

    log.setPrefix('[Brewery]');

    /**
     * Starts the brewery application
     */
    const start = () => {
        log.log('Starting Brewery');
        app.webServer.start();
        app.webServer.addRoutes(routes);
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
