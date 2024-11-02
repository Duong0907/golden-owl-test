const candidateRouter = require('./candidate.router');

const setupRouter = (app) => {
    app.use('/candidates', candidateRouter);

    // Handling Not found end points
    app.get('*', (req, res, next) => {
        const err = new Error(
            `Can't not find ${req.originalUrl} on the server!`,
        );
        err.statusCode = 404;
        next(err);
    });
};

module.exports = setupRouter;
