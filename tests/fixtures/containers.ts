/** Testcontainer fixtures with dynamic port allocation. */

import { PostgreSqlContainer } from "@testcontainers/postgresql";

/** Connection info for a running testcontainer. */
interface Container {
  readonly host: string;
  readonly port: number;
  readonly url: string;
  stop(): Promise<unknown>;
}

/**
 * Start a Postgres container with dynamic port.
 * @param opts Optional configuration
 * @param opts.image Docker image (default: postgres:15)
 * @param opts.password DB password. Defaults to POSTGRES_PASSWORD env var.
 * @param opts.username Database username (default: postgres)
 * @param opts.dbname Database name (default: postgres)
 * @returns Container with postgresql:// URL and dynamic port
 */
async function startPostgres(opts?: {
  image?: string;
  password?: string;
  username?: string;
  dbname?: string;
}): Promise<Container> {
  const password = opts?.password ?? process.env.POSTGRES_PASSWORD;
  if (!password) throw new Error("POSTGRES_PASSWORD not set");
  const username = opts?.username ?? "postgres";
  const dbname = opts?.dbname ?? "postgres";
  const image = opts?.image ?? "postgres:15";

  const started = await new PostgreSqlContainer(image)
    .withUsername(username)
    .withPassword(password)
    .withDatabase(dbname)
    .start();

  const port = Number(started.getPort());
  return {
    host: "localhost",
    port,
    url: `postgresql://${username}:${password}@localhost:${port}/${dbname}`,
    stop: () => started.stop(),
  };
}

export { startPostgres };
