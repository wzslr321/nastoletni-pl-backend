// DEPENDENCIES IMPORTS
import express from 'express';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as bodyParser from "body-parser";

//initialize firebase
admin.initializeApp(functions.config().firebase);

export const postCollection = 'blog';
export const db = admin.firestore();

// FILE IMPORTS
import {blogRouter} from "./routes";
import {indexRouter} from "./routes";


//initialize express
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));


app.use('/blog', blogRouter)
app.use('/', indexRouter)



//define google cloud function name
export const webApi = functions.https.onRequest(main);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Serwer właśnie wystartował na ${port}`));