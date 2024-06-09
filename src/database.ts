import { Pool } from "pg";
import { log, error } from "console";

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || "solonode",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "pg-api",
      password: process.env.DB_PASSWORD || "**********",
      port: parseInt(process.env.DB_PORT || "5432", 10),
    });

    this.pool.on("connect", () => {
      log("Database connected");
    });

    this.pool.on("error", (err) => {
      error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  public getDBPool(): Pool {
    return this.pool;
  }
}

const DBInstance = new Database();
export default DBInstance.getDBPool();
