// src/docs/users.swagger.js
export default {
  openapi: '3.0.3',
  info: { title: 'Users API', version: '1.0.0' },
  tags: [{ name: 'Users', description: 'Operaciones de usuarios' }],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string', enum: ['user', 'admin'] },
          pets: { type: 'array', items: { type: 'string' } },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' }
        }
      },
      CreateUserInput: {
        type: 'object',
        required: ['first_name','last_name','email','password'],
        properties: {
          first_name: { type: 'string' },
          last_name:  { type: 'string' },
          email:      { type: 'string', format: 'email' },
          password:   { type: 'string', format: 'password' },
          role:       { type: 'string', enum: ['user','admin'] }
        }
      }
    }
  },
  paths: {
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'Listar usuarios',
        parameters: [
          { in: 'query', name: 'limit', schema: { type: 'integer', default: 20 } },
          { in: 'query', name: 'page',  schema: { type: 'integer', default: 1 } }
        ],
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: { type: 'object',
              properties: {
                ok: { type: 'boolean' }, total: { type: 'integer' },
                page: { type: 'integer' }, limit: { type: 'integer' },
                items: { type: 'array', items: { $ref: '#/components/schemas/User' } }
              }
            } } }
          }
        }
      },
      post: {
        tags: ['Users'],
        summary: 'Crear usuario',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateUserInput' } } }
        },
        responses: {
          200: { description: 'Creado' },
          400: { description: 'Datos incompletos' }
        }
      }
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Obtener usuario por id',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'OK' }, 404: { description: 'No encontrado' } }
      }
    }
  }
};
