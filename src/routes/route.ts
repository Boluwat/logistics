import { Express } from "express";
import { userRoute, packageRoute } from ".";

export default (app: Express) =>{
    app.use("/api", userRoute);
    app.use("/api", packageRoute);
}
