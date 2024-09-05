import express, { Router, Request, Response } from "express";
import { tools, Tool, ToolNoId, addTool } from "./data/tools";

export const router: Router = express.Router();

// Gå direkt till endpoints (konfigurationen görs i server.ts)

// OBS! '/products' står i server.ts  (''/products' + '/')
router.get("/", (req: Request, res: Response) => {
  res.send(tools);
});

interface IdParam {
  id: string;
}
router.get("/:id", (req: Request<IdParam>, res: Response) => {
  //plocka ut ID från URL-parametern
  const id: number = Number(req.params.id);

  //Leta efter matchande object i listan
  const found: Tool | undefined = tools.find((tool) => tool.id === id);
  if (found) {
    //skicka tillbaka det vi hittade
    res.send(found);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req: Request<void, void, Tool>, res: Response) => {
  const newTool: Tool = req.body;
  //TODO: Validera så vi vet att newTool är ett korrekt Tool-object

  addTool(newTool);
  res.sendStatus(201);
});

// TODO:
// POST /products  <- lägga till en ny produkt, ha med BODY
// DELETE /products/:id  <- ta bort produkt baserat på id-parametern
// PUT /products/:id  <- ha med BODY
