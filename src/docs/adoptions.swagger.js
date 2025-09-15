// src/docs/adoptions.swagger.js
export default {
  openapi: "3.0.3",
  info: {
    title: "Adoptions API",
    version: "1.0.0",
    description: "Documentación de la API de adopciones con Swagger"
  },
  servers: [
    { url: "http://localhost:8080", description: "Servidor local" }
  ],
  tags: [{ name: "Adoptions", description: "Operaciones de adopciones" }],
  components: {
    schemas: {
      Adoption: {
        type: "object",
        properties: {
          _id: { type: "string" },
          owner: { type: "string" },
          pet: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      CreateAdoptionInput: {
        type: "object",
        required: ["uid", "pid"],
        properties: {
          uid: { type: "string", description: "ID del usuario adoptante" },
          pid: { type: "string", description: "ID de la mascota a adoptar" }
        }
      }
    }
  },
  paths: {
    "/api/adoptions": {
      get: {
        tags: ["Adoptions"],
        summary: "Listar todas las adopciones",
        responses: {
          200: {
            description: "Lista de adopciones",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Adoption" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Adoptions"],
        summary: "Crear una adopción",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateAdoptionInput" }
            }
          }
        },
        responses: {
          201: {
            description: "Adopción creada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/Adoption" }
                  }
                }
              }
            }
          },
          400: { description: "Datos inválidos" },
          404: { description: "Usuario o mascota no encontrados" }
        }
      }
    },
    "/api/adoptions/{id}": {
      get: {
        tags: ["Adoptions"],
        summary: "Obtener adopción por ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: {
            description: "Adopción encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/Adoption" }
                  }
                }
              }
            }
          },
          404: { description: "No encontrada" }
        }
      },
      put: {
        tags: ["Adoptions"],
        summary: "Actualizar adopción por ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateAdoptionInput" }
            }
          }
        },
        responses: {
          200: { description: "Adopción actualizada" },
          404: { description: "No encontrada" }
        }
      },
      delete: {
        tags: ["Adoptions"],
        summary: "Eliminar adopción por ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        responses: {
          204: { description: "Eliminada", content: {} },
          404: { description: "No encontrada" }
        }
      }
    }
  }
};
