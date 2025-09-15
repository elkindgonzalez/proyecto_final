// src/docs/swagger.js
import swaggerUi from "swagger-ui-express";
import usersDoc from "./users.swagger.js";
import petsDoc from "./pets.swagger.js";
import adoptionsDoc from "./adoptions.swagger.js";
import mocksDoc from "./mocks.swagger.js"; // 👈 Nuevo

export function setupSwagger(app) {
  const fullSpec = {
    openapi: "3.0.3",
    info: {
      title: "AdoptMe API",
      version: "1.0.0",
      description: "Documentación unificada de Users, Pets, Adoptions y Mocks"
    },
    servers: [{ url: "http://localhost:8080", description: "Servidor local" }],
    tags: [
      { name: "Users", description: "Operaciones de usuarios" },
      { name: "Pets", description: "Operaciones de mascotas" },
      { name: "Adoptions", description: "Operaciones de adopciones" },
      { name: "Mocks", description: "Operaciones de generación de datos de prueba" }
    ],
    paths: {
      ...usersDoc.paths,
      ...petsDoc.paths,
      ...adoptionsDoc.paths,
      ...mocksDoc.paths
    },
    components: {
      schemas: {
        ...usersDoc.components.schemas,
        ...petsDoc.components.schemas,
        ...adoptionsDoc.components.schemas,
        ...mocksDoc.components.schemas
      }
    }
  };

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(fullSpec));
}
