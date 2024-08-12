import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for your project",
  },
  servers: [
    {
      url: "http://localhost:5001/api",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/v1/*.ts", "./src/routes/v2/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerRouter = Router();

swaggerRouter.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { swaggerRouter };
