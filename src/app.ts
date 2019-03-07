import compression from "compression";
import express from "express";
import helmet from "helmet";

export const app = express();

app.use(compression());
app.use(helmet()); // Set security-related HTTP response headers.
app.use(express.json()); // Parse requests with JSON payloads.
app.use(express.urlencoded({ extended: false })); // Parse requests with urlencoded payloads.

/**
 * GET /
 */
app.get("/", (request, response) => {
  response.json({ message: "Hello, World!" });
});

/**
 * Not found handler.
 */
app.use((_, response, __) => {
  response.status(404).json({
    status: 404,
    title: "Not Found"
  });
});
