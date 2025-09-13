// src/docs/swagger.js
import swaggerUi from 'swagger-ui-express';
import usersDoc from './users.swagger.js';

export function setupSwagger(app) {
  const spec = { ...usersDoc }; // aquí luego puedes fusionar más módulos
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
}
