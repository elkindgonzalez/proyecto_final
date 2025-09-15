// src/docs/swagger.js
import swaggerUi from "swagger-ui-express";
import usersDoc from "./users.swagger.js";
import petsDoc from "./pets.swagger.js";
import adoptionsDoc from "./adoptions.swagger.js";

// Función para fusionar varios documentos swagger
function mergeSpecs(...specs) {
  return specs.reduce(
    (acc, spec) => {
      acc.tags = [...(acc.tags || []), ...(spec.tags || [])];
      acc.components.schemas = {
        ...acc.components.schemas,
        ...(spec.components?.schemas || {})
      };
      acc.paths = { ...acc.paths, ...(spec.paths || {}) };
      return acc;
    },
    {
      openapi: "3.0.3",
      info: {
        title: "AdoptMe API",
        version: "1.0.0",
        description: "Documentación unificada de Users, Pets y Adoptions"
      },
      servers: [
        {
          url: "http://localhost:8080",
          description: "Servidor local"
        }
      ],
      tags: [],
      components: { schemas: {} },
      paths: {}
    }
  );
}

export function setupSwagger(app) {
  const spec = mergeSpecs(usersDoc, petsDoc, adoptionsDoc);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec));
}
