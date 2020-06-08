import { Sequelize } from 'sequelize-typescript';

export function configureDB(): Sequelize {
    return new Sequelize({
        host: process.env['DB_HOST'],
        database: process.env['DB_NAME'],
        dialect: 'postgres',
        username: process.env['DB_USERNAME'],
        password: process.env['DB_PASSWORD'],
        models: [__dirname + '/models/*.ts', __dirname + '/models/*.js'],
        logging: (query: any) => {
            // if(process.env.NODE_ENV === 'production') { return; }
            console.log(`\n${query}`)
        }
    });
}