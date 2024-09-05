import express, { Express, NextFunction, Request, Response } from "express";
import { router } from "./products";

const app: Express = express();
const port = 1337;

//Middleware
app.use(express.json());

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} `, req.body);
  next();
});

//Endpoints - importeras från separata filer!
app.use("/products", router);

//starta servern
app.listen(port, () => {
  console.log("Product API server is online on port " + port);
});
