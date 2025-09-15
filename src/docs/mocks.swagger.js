// src/docs/mocks.swagger.js
export default {
  openapi: "3.0.3",
  info: {
    title: "Mocks API",
    version: "1.0.0",
    description: "Documentación de la API de mocks para pruebas"
  },
  servers: [
    { url: "http://localhost:8080", description: "Servidor local" }
  ],
  tags: [{ name: "Mocks", description: "Operaciones de generación de datos de prueba" }],
  components: {
    schemas: {
      GenerateDataInput: {
        type: "object",
        required: ["users", "pets"],
        properties: {
          users: { type: "integer", example: 10 },
          pets: { type: "integer", example: 5 }
        }
      }
    }
  },
  paths: {
    "/api/mocks/mockingpets": {
      get: {
        tags: ["Mocks"],
        summary: "Generar mascotas ficticias",
        responses: {
          200: {
            description: "Lista de mascotas generadas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      specie: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/mocks/mockingusers": {
      get: {
        tags: ["Mocks"],
        summary: "Generar usuarios ficticios",
        responses: {
          200: {
            description: "Lista de usuarios generados",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      first_name: { type: "string" },
                      last_name: { type: "string" },
                      email: { type: "string" },
                      password: { type: "string" },
                      role: { type: "string", enum: ["user", "admin"] },
                      pets: { type: "array", items: { type: "string" } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/mocks/generateData": {
      post: {
        tags: ["Mocks"],
        summary: "Generar e insertar datos en la base de datos",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GenerateDataInput" }
            }
          }
        },
        responses: {
          201: {
            description: "Datos generados e insertados correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    usersInserted: { type: "integer", example: 10 },
                    petsInserted: { type: "integer", example: 5 }
                  }
                }
              }
            }
          },
          400: { description: "Parámetros inválidos" }
        }
      }
    }
  }
};
