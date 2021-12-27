require('dotenv').config();

const generateConfig = () => {
    const inProduction = true;
    if (inProduction) {
        return productionConfig;
    }
    // TODO: create a testing config
    return {};
};

const productionConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    ssl: true,
    typeValidation: true,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            ca: process.env.SSL_CA.replace(/\\n/g, '\n'),
            key: process.env.SSL_KEY.replace(/\\n/g, '\n'),
            cert: process.env.SSL_CERT.replace(/\\n/g, '\n')
        }
    },
    query: { raw: true, logging: false }
};

module.exports = generateConfig;
