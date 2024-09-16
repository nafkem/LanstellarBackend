import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from "http";
import mongoose from 'mongoose';
import helmet from 'helmet';
import { Controller } from './routes/routes';
import { COMMON_CONFIG } from './config/common';



class App {
  //set types
  public app: Application;
  public controller: Controller;
  public server: http.Server;


  constructor() {
    this.app = express();
    //connect server to app instance
    this.server = http.createServer(this.app);
 

    this.setConfig();
    this.setMongoConfig();
    //Creating and assigning a new instance of our controller
    this.controller = new Controller(this.app);

  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));
    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    //Enables cors   
    this.app.use(cors());

   // this.app.use(express.static('public'));

    this.app.use(helmet());
  }


  //Connecting to our MongoDB database
  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    const mongoString = COMMON_CONFIG.NETWORK_CONFIG.MongoDBURL as string;
    mongoose.connect(mongoString);
    const database = mongoose.connection;

  }


  



}




export default new App().server;








