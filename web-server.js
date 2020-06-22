import logger from './logger.js';
import http from 'http';
import express from 'express';
import io from 'socket.io';

export default function webServer(configuration) {
    const log = logger();
    const app = express();
    const server = http.Server(app);

    app.use(express.static('public'));
    app.set('view engine', 'ejs');

    const dependencies = {
        app: app,
        webServer: server,
        socket: io(server),
    };

    configuration = configuration || { port: 8080 };
    configuration.port = configuration.port || 8080;

    log.setPrefix('[WebServer]');

    /**
     * Start the webServer
     */
    const start = () => {
        log.log(`Starting WebServer at port ${configuration.port}`);
        server.listen(configuration.port, () => {
            log.log(`Listening on port ${configuration.port}`);
        });
        log.log('Starting done');
    };

    /**
     * Stop the webServer
     */
    const stop = () => {
        log.log('Stopping WebServer');
        log.log('Stopping done');
    };

    /**
     *
     * @param {*} routeParams
     */
    const addRoute = (routeParams) => {
        /**
         * {
         *      route,
         *      handler,
         *      method,
         *      description
         * }
         */

        const methods = {
            GET() {
                log.log(
                    `Adding GET route to ${routeParams.route} to provide ${routeParams.description}`
                );
                app.get(routeParams.route, routeParams.handler);
            },
            PUT() {
                log.log(
                    `Adding PUT route to ${routeParams.route} to provide ${routeParams.description}`
                );
                app.put(routeParams.route, routeParams.handler);
            },
            POST() {
                log.log(
                    `Adding POST route to ${routeParams.route} to provide ${routeParams.description}`
                );
                app.post(routeParams.route, routeParams.handler);
            },
        };

        const command = methods[routeParams.method];

        if (command) {
            command();
        }
    };

    /**
     * Add massive routes
     * @param {*} routesArray
     */
    const addRoutes = (routesArray) => {
        routesArray.forEach((route) => {
            addRoute(route);
        });
    };

    return {
        dependencies,
        start,
        stop,
        addRoute,
        addRoutes,
    };
}
