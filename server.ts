import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { configureDB } from './server/database';
import path from 'path';
import nodesRoutes from './server/routes/nodes';
import { saveNodeDataJob, cleanDBJob } from './server/jobs/jobs';

const port = process.env.PORT || 5000;
const app = express();

// configure database and test connection
const database = configureDB();
database.authenticate()
    .then(() => console.log('successfully connected to database'))
    .catch(err => console.error(`could not connect to database: ${err}`))
database.sync();

// Start CRON jobs
saveNodeDataJob.start();
cleanDBJob.start();

// parse json from body
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client', 'build')))

// for requests to '/nodes' use nodesRoutes
app.use('/api/nodes', nodesRoutes);

if(process.env.NODE_ENV === "production") {
    app.get('/', (_req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '/../client', 'build', 'index.html'))
    })
}


// error handing
// @ts-ignore because it must take 4 arguments
app.use((err: Error, req, res: Response, next) => {
    console.log(err.stack);
    res.status(500).send({ error: 'internal error!' })
})

// start listening on specified port
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});