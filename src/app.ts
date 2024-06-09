import express, { Application, Request, Response, urlencoded } from "express";
import { log } from "console";
import UserRepository from "./repository";

class Server {
  public app: Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;
    this.config();
    this.routes();
    this.listen();
  }

  private config(): void {
    this.app.use(urlencoded({ extended: false }));
  }

  public routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ info: "Postgres default routing" });
    });
    this.app.get("/get/users", UserRepository.getUsers);
    this.app.get("/get/users/:id", UserRepository.getUserByID);
    this.app.post("/post/users", UserRepository.createUsers);
    this.app.put("/update/users/:id", UserRepository.updateUser);
    this.app.delete("/delete/users/:id", UserRepository.deleteUser);
  }

  private listen(): void {
    this.app.listen(this.port, () =>
      log(`Server active on port: ${this.port}`)
    );
    this.app.on("error", (error) =>
      log(`Error in server connection: ${error}`)
    );
  }
}

new Server();
