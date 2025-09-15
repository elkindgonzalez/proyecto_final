AdoptMe API

Este proyecto es una API backend desarrollada con **Node.js**, **Express** y **MongoDB**.  
Gestiono usuarios, mascotas y adopciones de forma segura y escalable.  

Documenté todos los endpoints con **Swagger**, validé su funcionamiento con **tests funcionales**, implementé un módulo de **Mocking** para generar datos de prueba y **Dockericé** el proyecto publicando la imagen en **DockerHub**.  

Con este trabajo cumplo de forma completa los objetivos de documentación, pruebas y despliegue.

---

## 🚀 Tecnologías utilizadas
- Node.js + Express
- MongoDB + Mongoose
- Swagger (documentación de APIs)
- Jest + Supertest (tests funcionales)
- Docker + DockerHub

---

## 📌 Instalación y ejecución local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/elkindgonzalez/adoptme.git
   cd adoptme
Instalar dependencias

bash
Copiar código
npm install
Configurar variables de entorno en .env

ini
Copiar código
PORT=8080
MONGO_URL=mongodb+srv://...
JWT_SECRET=secreto
Ejecutar en desarrollo

bash
Copiar código
npm run dev
Ejecutar en producción

bash
Copiar código
npm start
📚 Documentación con Swagger
Exposé toda la documentación de la API en un único módulo unificado:

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

PUT /api/adoptions/{id} → Actualizar adopción

DELETE /api/adoptions/{id} → Cancelar adopción

🧪 Tests funcionales
Desarrollé pruebas funcionales con Jest + Supertest para todos los endpoints de adoption.router.js.
Verifiqué tanto casos de éxito como de error, asegurando la correcta gestión de adopciones.

Ejecutar los tests:

bash
Copiar código
npm test
🧩 Módulo de Mocking
Implementé el router mocks.router.js bajo la ruta /api/mocks con los siguientes endpoints:

GET /api/mocks/mockingpets → Generar mascotas ficticias.

GET /api/mocks/mockingusers → Generar 50 usuarios de prueba con:

Contraseña "coder123" encriptada.

role alternando entre "user" y "admin".

pets como array vacío.

POST /api/mocks/generateData → Inserta en la base de datos la cantidad de usuarios y mascotas que reciba como parámetros (users, pets).

Cómo probar los endpoints de mocks
Generar usuarios falsos sin insertarlos en la base de datos

bash
Copiar código
curl http://localhost:8080/api/mocks/mockingusers
Generar mascotas ficticias

bash
Copiar código
curl http://localhost:8080/api/mocks/mockingpets
Generar e insertar datos en la base de datos

bash
Copiar código
curl -X POST http://localhost:8080/api/mocks/generateData \
-H "Content-Type: application/json" \
-d '{"users": 10, "pets": 5}'
Comprobar los registros insertados

bash
Copiar código
curl http://localhost:8080/api/users
curl http://localhost:8080/api/pets

🐳 Dockerización
Dockerfile
Creé un Dockerfile que construye la imagen del proyecto:

dockerfile
Copiar código
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
Construcción de la imagen
bash
Copiar código
docker build -t elkindgonzalez/adoptme:latest .
Ejecución del contenedor
bash
Copiar código
docker run -d -p 8080:8080 --name adoptme-container elkindgonzalez/adoptme:latest
📦 Imagen en DockerHub
La imagen final está publicada en DockerHub:
👉 https://hub.docker.com/r/elkindgonzalez/adoptme

✅ Conclusión
Cumplí con toda la consigna:

Migré y amplié el router mocks con endpoints de generación de datos.

Documenté Users, Pets y Adoptions en Swagger.

Desarrollé tests funcionales para adopciones.

Dockericé el proyecto y subí la imagen a DockerHub.

Incluí en este README.md las instrucciones completas para ejecutar y validar el proyecto.