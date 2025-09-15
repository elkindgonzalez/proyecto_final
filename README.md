# AdoptMe API

Este proyecto es una API backend desarrollada con Node.js, Express y MongoDB.  
Gestiona usuarios, mascotas y adopciones de forma segura y escalable.  
Documenté todos los endpoints con **Swagger** y validé su funcionamiento con **tests funcionales**.  
Incluí un módulo de **Mocking** para generar datos de prueba (usuarios y mascotas).  
Dockericé el proyecto y publiqué la imagen final en **DockerHub**.  
Con este trabajo cumplo de forma completa los objetivos de documentación, pruebas y despliegue.

---

## 🚀 Tecnologías utilizadas
- Node.js + Express
- MongoDB + Mongoose
- Swagger (documentación)
- Jest + Supertest (tests funcionales)
- Docker + DockerHub

---

## 📌 Instalación y ejecución local

1. Clonar el repositorio  
   ```bash
   git clone https://github.com/elkindgonzalez/adoptme.git
   cd adoptme

Instalar dependencias

npm install


Configurar variables de entorno en .env

PORT=8080
MONGO_URL=mongodb+srv://...
JWT_SECRET=secreto


Ejecutar en desarrollo

npm run dev


Ejecutar en producción

npm start

📚 Documentación con Swagger

Exposé toda la documentación de la API en un solo módulo unificado:

URL local: http://localhost:8080/api/docs

Módulos documentados:

Users

Pets

Adoptions

🔧 Endpoints principales
Users

GET /api/users → Listar usuarios

POST /api/users → Crear usuario

GET /api/users/{id} → Obtener usuario por ID

PUT /api/users/{id} → Actualizar usuario

DELETE /api/users/{id} → Eliminar usuario

Pets

GET /api/pets → Listar mascotas

POST /api/pets → Crear mascota

GET /api/pets/{id} → Obtener mascota por ID

PUT /api/pets/{id} → Actualizar mascota

DELETE /api/pets/{id} → Eliminar mascota

Adoptions

GET /api/adoptions → Listar adopciones

POST /api/adoptions → Crear adopción

GET /api/adoptions/{id} → Obtener adopción por ID

DELETE /api/adoptions/{id} → Cancelar adopción

🧪 Tests funcionales

Desarrollé pruebas funcionales con Jest + Supertest para todos los endpoints de adoptions.router.js.
Verifican casos de éxito y de error, asegurando la correcta gestión de adopciones.

Ejecutar los tests:

npm test

🧩 Módulo de Mocking

Implementé un router mocks.router.js bajo la ruta /api/mocks con:

GET /api/mocks/mockingpets → Generar mascotas ficticias.

GET /api/mocks/mockingusers → Generar 50 usuarios de prueba con:

Contraseña "coder123" encriptada.

role alternando entre "user" y "admin".

pets como array vacío.

POST /api/mocks/generateData → Inserta en la base de datos la cantidad de usuarios y mascotas que reciba como parámetros (users, pets).

Puedo comprobar los registros generados con los endpoints GET /api/users y GET /api/pets.

📝 Cómo probar los endpoints de mocks

Generar usuarios falsos sin insertarlos en la base de datos

curl http://localhost:8080/api/mocks/mockingusers


Esto devuelve un array de 50 usuarios simulados con formato de MongoDB.

Generar mascotas ficticias

curl http://localhost:8080/api/mocks/mockingpets

Generar e insertar datos en la base de datos

Ejemplo: crear 10 usuarios y 5 mascotas de prueba en MongoDB.

curl -X POST http://localhost:8080/api/mocks/generateData \
-H "Content-Type: application/json" \
-d '{"users": 10, "pets": 5}'

Comprobar los registros insertados

Ver usuarios insertados:

curl http://localhost:8080/api/users

Ver mascotas insertadas:

curl http://localhost:8080/api/pets

🐳 Dockerización

Dockerfile

Creé un Dockerfile que construye la imagen del proyecto:

FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]

Construcción de la imagen
docker build -t elkindgonzalez/adoptme:latest .

Ejecución del contenedor
docker run -d -p 8080:8080 --name adoptme-container elkindgonzalez/adoptme:latest

📦 Imagen en DockerHub

La imagen final está publicada en DockerHub:
👉 https://hub.docker.com/r/elkindgonzalez/adoptme

✅ Conclusión

Cumplí con la consigna completa:

Migré y amplié el router mocks con endpoints de generación de datos.

Documenté Users, Pets y Adoptions en Swagger.

Desarrollé tests funcionales para adopciones.

Dockericé el proyecto y subí la imagen a DockerHub.

Incluí en este README.md las instrucciones para ejecutar y validar todo el proyecto.