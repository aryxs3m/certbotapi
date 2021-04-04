// load up our shiny new route for users
const certRoutes = require('./cert');

const appRouter = (app, fs) => {
    // we've added in a default route here that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send(`Certbot API v1.0 by aryxs3m <aryx@pvga.hu>`);
    });

    app.get('/heartbeat', (req, res) => {
        res.send(`OK`);
    });

    // run our user route module here to complete the wire up
    certRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;