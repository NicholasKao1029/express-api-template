## Model generation 

To generate our sequelize models we use package (`sequelize-auto`)[https://github.com/sequelize/sequelize-auto] using command 

```
yarn sequelize-auto -c ./src/database/temp_database_config.json -o ./src/models/generate p --cm --sg k --cf
```

`temp_database_config.json` refers to a json file with the structure below.
However json doesn't have a notion of what environment variables are so you would have to 
map the environment variables to their corresponding values.



{
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
    query: { raw: true }
}


### Note

```
article_metadata,
user,

get messed up becoming singular.
```

