const app = require('./app.js');
// NOTE: for ease of testing abstract the call to running the application

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Internal API Running on port ${port}`);
});

module.exports = app;
