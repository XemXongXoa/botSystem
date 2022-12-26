import { cpu, ram, disk } from './info/index.js';
import express from 'express';
import { check_jwt,generate_JWT } from './func/jwt.js';
import * as dotenv from 'dotenv';
import cron from 'node-cron';
import cors from 'cors';
dotenv.config();
const app = express()
const port = 8000


// cron 1 hour
cron.schedule('0 */1 * * *', async () => {
    console.log('running a task every hour');
    let cpu = await cpu();
    let ram = await ram();
    let disk = await disk();
    let check = checkServer(cpu,ram,disk);
    if(!check){
        console.log('server is down');
    }
}).start();
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
app.use(cors(corsOptions));
app.use(check_jwt)
app.get('/healthy', async (req, res) => {
    let results = [];
    results.push( cpu());
    results.push( ram());
    results.push( disk());
    return Promise.all(results).then(data => {
        res.json({
            cpu: data[0],
            ram: data[1],
            disk: data[2]

        })
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
