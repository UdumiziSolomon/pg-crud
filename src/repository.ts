import { Request, Response } from "express";
import DBInstance from "./database";

class UserRepository {
  public getUsers(req: Request, res: Response): void {
    DBInstance.query(
      "SELECT * FROM users ORDER BY id ASC",
      (error, results) => {
        if (error) {
          res.status(500).json({ error });
        } else {
          res.status(200).json({ users: results.rows });
        }
      }
    );
  }

  public getUserByID(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    DBInstance.query(
      "SELECT * FROM users WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          res.status(500).json({ error });
        } else {
          res.status(200).json({ user: results.rows });
        }
      }
    );
  }

  public createUsers(req: Request, res: Response): void {
    const { username, email } = req.body;

    DBInstance.query(
      "INSERT INTO users (username, email) VALUES ($1, $2)",
      [username, email],
      (error, results) => {
        if (error) {
          res.status(500).json({ error });
        } else {
          res.status(201).send(`${results.rows}`);
        }
      }
    );
  }

  public updateUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { username, email } = req.body;

    DBInstance.query(
      "UPDATE users SET username = $1, email = $2 WHERE id = $3",
      [username, email, id],
      (error, _) => {
        if (error) {
          res.status(500).json({ error });
        } else {
          res.status(201).send(`user ${id} modified`);
        }
      }
    );
  }
  public deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    DBInstance.query("DELETE FROM users WHERE id = $1", [id], (error, _) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).send(`user ${id} deleted`);
      }
    });
  }
}

export default new UserRepository();
