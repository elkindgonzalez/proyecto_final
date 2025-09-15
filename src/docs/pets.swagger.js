// src/docs/pets.swagger.js
export default {
  openapi: "3.0.3",
  info: {
    title: "Pets API",
    version: "1.0.0",
    description: "Documentación de la API de mascotas con Swagger"
  },
  servers: [
    { url: "http://localhost:8080", description: "Servidor local" }
  ],
  tags: [{ name: "Pets", description: "Operaciones de mascotas" }],
  components: {
    schemas: {
      Pet: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          specie: { type: "string" },
          birthDate: { type: "string", format: "date" },
          adopted: { type: "boolean" },
          owner: { type: "string" },
          image: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      CreatePetInput: {
        type: "object",
        required: ["name", "specie"],
        properties: {
          name: { type: "string" },
          specie: { type: "string" },
          birthDate: { type: "string", format: "date" },
          image: { type: "string" }
        }
      }
    }
  },
  paths: {
    "/api/pets": {
      get: {
        tags: ["Pets"],
        summary: "Listar todas las mascotas",
        responses: {
          200: {
            description: "Lista de mascotas",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Pet" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Pets"],
        summary: "Crear una mascota",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreatePetInput" }
            }
          }
        },
        responses: {
          201: {
            description: "Mascota creada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/Pet" }
                  }
                }
              }
            }
          },
          400: { description: "Datos inválidos" }
        }
      }
    },
    "/api/pets/{id}": {
      get: {
        tags: ["Pets"],
        summary: "Obtener mascota por ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: {
            description: "Mascota encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/Pet" }
                  }
                }
              }
            }
          },
          404: { description: "No encontrada" }
        }
      },
      put: {
        tags: ["Pets"],
        summary: "Actualizar mascota por ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreatePetInput" }
            }
          }
        },
        responses: {
          200: {
            description: "Mascota actualizada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/Pet" }
                  }
                }
              }
            }
          },
          404: { description: "No encontrada" }
        }
      },
      delete: {
        tags: ["Pets"],
        summary: "Eliminar mascota por ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        responses: {
          204: { description: "Eliminada" },
          404: { description: "No encontrada" }
        }
      }
    }
  }
};
