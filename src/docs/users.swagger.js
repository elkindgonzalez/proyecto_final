// src/docs/users.swagger.js
export default {
  openapi: "3.0.3",
  info: {
    title: "Users API",
    version: "1.0.0",
    description: "Documentación de la API de usuarios con Swagger"
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Servidor local"
    }
  ],
  tags: [
    { name: "Users", description: "Operaciones de usuarios" }
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64fa2c9e2b4d0a3f8e7a1234" },
          first_name: { type: "string", example: "Juan" },
          last_name: { type: "string", example: "Pérez" },
          email: { type: "string", example: "juan.perez@test.com" },
          role: { type: "string", enum: ["user", "admin"], example: "user" },
          pets: { type: "array", items: { type: "string" } },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      CreateUserInput: {
        type: "object",
        required: ["first_name", "last_name", "email", "password"],
        properties: {
          first_name: { type: "string", example: "Juan" },
          last_name: { type: "string", example: "Pérez" },
          email: { type: "string", format: "email", example: "juan.perez@test.com" },
          password: { type: "string", format: "password", example: "123456" },
          role: { type: "string", enum: ["user", "admin"], example: "user" }
        }
      }
    }
  },
  paths: {
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Listar todos los usuarios",
        responses: {
          200: {
            description: "Lista de usuarios obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: {
                      type: "array",
                      items: { $ref: "#/components/schemas/User" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Users"],
        summary: "Crear un nuevo usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateUserInput" }
            }
          }
        },
        responses: {
          201: {
            description: "Usuario creado exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            }
          },
          400: { description: "Datos inválidos" }
        }
      }
    },
    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Obtener un usuario por ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "Usuario encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            }
          },
          404: { description: "Usuario no encontrado" }
        }
      },
      put: {
        tags: ["Users"],
        summary: "Actualizar un usuario por ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateUserInput" }
            }
          }
        },
        responses: {
          200: {
            description: "Usuario actualizado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "success" },
                    payload: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            }
          },
          404: { description: "Usuario no encontrado" }
        }
      },
      delete: {
        tags: ["Users"],
        summary: "Eliminar un usuario por ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          204: {
            description: "Usuario eliminado correctamente",
            content: {} // 👈 evita warnings en Swagger
          },
          404: { description: "Usuario no encontrado" }
        }
      }
    }
  }
};
