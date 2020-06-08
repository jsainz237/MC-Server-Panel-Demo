import dotenv from 'dotenv';
dotenv.config();
import { configureDB } from '../server/database';

// get new database instance
const database = configureDB();

// Sync database to model definitions
database.sync({ force: true })
    .then(() => {
        console.log('\ndatabase synced');
    })
    .catch(err => {
        console.error(`\ndatabase could not be synced: ${err}`)
    });