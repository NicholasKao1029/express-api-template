const apiRouter = require('./api');

module.exports = (app) => {
    app.use('/api', apiRouter);
    app.get('/sanity-check', (_, res) => {
        res.send(`sanity checked`);
    });

    // Default in case of unmatched routes
    app.use((_, res) => {
        res.status(404).json({
            error: {
                name: 'Error',
                message: 'Invalid Request'
            }
        });
    });
};
