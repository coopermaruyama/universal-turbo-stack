import { migrate } from "./client";

// run migrations
migrate()
  .then(() => {
    console.log("Migrations completed successfully");
  })
  .catch((error) => {
    console.error("Error running migrations:", error);
  });
