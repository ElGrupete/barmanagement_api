import express from 'express';
import * as bodyParser from "body-parser";
import routes from "./routes/index.routes";
import cors from "cors";

// -- This Class is the Express APP -- //
// -- This is used throughout the application -- //

class App {

    app: express.Application;

    constructor() {
        // -- Run the express instance and store in app -- //
        this.app = express(); 
        this.config();
    }

    private config(): void {
    // -- Enable cors by adding cors middleware -- //
        this.app.use(cors());

    // -- Support application/json type post data -- //
        this.app.use(bodyParser.json());

    // -- Support application/x-www-form-urlencoded post data -- //
        this.app.use(bodyParser.urlencoded({extended: false}));

    // -- Add all the existing routes -- //
        this.app.use("/api/v1", routes);
    }
}
export default new App().app;