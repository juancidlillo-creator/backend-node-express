# Módulo 6 - Aplicación Web Node.js + Express 

Servidor web desarrollado con Node.js y Express.js que abarca desde la creación del servidor base, sirviendo contenido estático y dinámico, hasta la persistencia en archivos planos y la modularización bajo el patrón MVC (Modelo-Vista-Controlador).

---

## 📋 Resumen del Desarrollo por Lecciones

### Lección 1: Conociendo Node y Express
* **Ecosistema Node.js:** Node.js es un entorno de ejecución (*runtime*) de JavaScript del lado del servidor construido sobre el motor V8 de Google Chrome. Permite desarrollar aplicaciones backend escalables, no bloqueantes y orientadas a eventos.
* **Beneficios de Express sobre Node puro:** Express.js aporta un marco de trabajo (*framework*) minimalista que simplifica significativamente la gestión del enrutamiento HTTP, el manejo de *middlewares*, la parseación de solicitudes y la integración con motores de plantillas, evitando escribir código verboso con los módulos HTTP nativos de Node.js.
* **Flujo Básico Servidor–Cliente:**

![Flujo Básico Servidor-Cliente](./public/flujo-servidor-cliente.png)


#### Infografía del Stack Técnico (Tarea PLUS)
* **Runtime:** Node.js
* **Framework Backend:** Express.js
* **Motor de Plantillas:** Handlebars (HBS)
* **Persistencia:** Archivos planos (`fs/promises`)
* **Gestión de Entorno:** `dotenv`
* **Herramientas de Desarrollo:** Nodemon

---

### Lección 2: Instalación y Configuración de Node
* **Nombre del archivo principal:** Se eligió el nombre `app.js` como punto de entrada del servidor para seguir la convención estándar de la industria en aplicaciones Express.
* **Variables de Entorno:** Se implementó la librería `dotenv` para abstraer la configuración del puerto (`PORT`) mediante un archivo local `.env`, evitando exponer credenciales o valores sensibles en el código fuente.

---

### Lección 3: Gestión de Paquetes en Node
* **Dependencias Instaladas:**
  * `express`: Framework backend principal.
  * `dotenv`: Carga de variables de entorno desde `.env`.
  * `hbs`: Motor de plantillas dinámicas.
  * `nodemon` (como `devDependency`): Reinicio automático del servidor ante cambios en el código durante el desarrollo.
* **Scripts en `package.json`:**
  * `npm start`: Ejecuta `node app.js` para entornos de producción.
  * `npm run dev`: Ejecuta `nodemon app.js` para agilizar la etapa de desarrollo.

---

### Lección 4: Sirviendo Contenido Web
* **Archivos Estáticos (`/public`):** Se utilizó el middleware `express.static('public')` para servir el documento estático `index.html` maquetado con Bootstrap 5.
* **Respuestas JSON y HTML:** Se configuraron las rutas `/` (HTML estático) y `/status` (JSON).
* **Vista Dinámica (Tarea PLUS):** Se configuró el motor **Handlebars (HBS)** (`app.set('view engine', 'hbs')`) para inyectar datos dinámicos en la ruta `/vistaDinamica` mediante la vista `views/index.hbs`.

---

### Lección 5: Persistencia en Archivos Planos
* **Registro de Logs de Acceso:** Se desarrolló un helper dedicado (`helpers/logHelper.js`) que hace uso de la API asíncrona `fs.appendFile()` (`fs/promises`) para almacenar cada visita web en `logs/access.log`.
* **Estructura del Registro:** Cada acceso almacena el parámetro de fecha y hora ISO, el método HTTP utilizado y la ruta accedida[cite: 2, 4]:
  ```text
  [2026-09-05T20:30:00.123Z] METODO: GET | RUTA: /
  [2026-09-05T20:30:04.456Z] METODO: GET | RUTA: /status
  [2026-09-05T20:30:08.789Z] METODO: GET | RUTA: /dinamico

---

## 📁 Estructura del Proyecto

```text
.
├── controllers/
│   └── mainController.js   # Lógica de procesamiento y respuestas para cada ruta
├── helpers/
│   └── logHelper.js        # Módulo de interacción asíncrona con el File System
├── logs/
│   └── access.log          # Historial plano de peticiones HTTP en tiempo real
├── middlewares/
│   └── loggerMiddleware.js # Middleware de interceptación y registro de accesos
├── public/
│   ├── index.html          # Documento HTML estático estilizado con Bootstrap 5
│   └── flujo-servidor-cliente.png # Diagrama visual del flujo cliente-servidor
├── routes/
│   └── router.js           # Enrutador modular de Express (Express Router)
├── views/
│   └── index.hbs           # Plantilla dinámica en Handlebars
├── .env.example            # Plantilla de variables de entorno
├── .gitignore              # Exclusión de node_modules, .env y logs
├── app.js                  # Punto de entrada principal de la aplicación
├── package.json            # Configuración de dependencias y scripts de NPM
└── README.md               # Documentación completa del proyecto

```
---

### Módulo 7: Acceso de Datos en Aplicaciones Node.js

En esta etapa del proyecto se incorporó la persistencia real con PostgreSQL y Sequelize, pasando de almacenar información en archivos planos a trabajar con una base de datos relacional y un ORM.

## Objetivo del módulo

El objetivo principal fue aprender a:

- conectar una aplicación Express con PostgreSQL;
- definir modelos con Sequelize;
- crear relaciones entre entidades;
- consultar datos mediante ORM y SQL directo;
- manejar transacciones para garantizar integridad de datos;
- validar entradas y organizar la API con rutas modularizadas.

---

## 1. Conexión a PostgreSQL con Sequelize

Se creó la configuración de conexión en `src/config/db.js` usando la librería `sequelize` y la variable de entorno `DATABASE_URL`.

```js
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  define: { timestamps: true }
});
```

Esto permite que la aplicación se conecte a PostgreSQL y opere con modelos definidos en el proyecto.

---

## 2. Modelos y entidades del proyecto

Se definieron dos entidades principales:

### Modelo `Usuario`

Archivo: `src/models/Usuario.js`

Características:

- `id` autoincremental
- `nombre` requerido
- `email` único y validado como email
- `password` obligatorio
- `estado` con valor por defecto `true`
- timestamps automáticos (`createdAt`, `updatedAt`)

### Modelo `Pedido`

Archivo: `src/models/Pedido.js`

Características:

- `id` autoincremental
- `descripcion` obligatoria
- `monto` decimal con validación mínima
- `estado` con valores: `pendiente`, `completado`, `cancelado`
- `usuarioId` como clave foránea

---

## 3. Relaciones entre modelos

En `src/models/index.js` se configuraron las relaciones entre `Usuario` y `Pedido`:

```js
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId', as: 'pedidos', onDelete: 'CASCADE' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
```

Esto representa una relación de uno a muchos:

- un usuario puede tener muchos pedidos;
- cada pedido pertenece a un único usuario.

---

## 4. Asociación de modelos al servidor

En `src/app.js` se sincroniza la base de datos al iniciar la aplicación:

```js
await sequelize.sync({ alter: true });
```

Con esto, Sequelize crea o actualiza las tablas necesarias según la estructura de los modelos.

---

## 5. API REST con consultas a base de datos

Se modularizaron las rutas en `src/routes/usuarioRouters.js` y se añadieron endpoints para gestionar usuarios y relaciones.

### Endpoints principales

- `GET /api/usuarios` → listar usuarios
- `POST /api/usuarios` → crear usuario
- `GET /api/usuarios/:id` → buscar por ID
- `PUT /api/usuarios/:id` → actualizar usuario
- `DELETE /api/usuarios/:id` → eliminar usuario
- `GET /api/usuarios/:id/pedidos` → obtener pedidos de un usuario

Además, se incorporaron dos rutas comparativas importantes:

- `GET /api/usuarios/orm` → consulta usando Sequelize ORM
- `GET /api/usuarios/sql` → consulta directa con SQL usando el cliente `pg`

---

## 6. ORM vs SQL tradicional

### Uso de ORM (Sequelize)

Se desarrolló el controlador `src/controllers/usuarioOrmController.js` para consultar usuarios con `Usuario.findAll()`.

```js
const usuarios = await Usuario.findAll({
  attributes: { exclude: ['password'] }
});
```

Ventajas:

- sintaxis más legible;
- mayor seguridad al encapsular consultas;
- mejor integración con modelos y relaciones.

### Uso de SQL tradicional

También se usó el cliente `pg` para ejecutar una consulta directa:

```js
const query = 'SELECT id, nombre, email, estado, "createdAt", "updatedAt" FROM usuarios;';
const result = await client.query(query);
```

Esto permite comparar ambos enfoques y entender la diferencia entre abstracción y trabajo directo con SQL.

---

## 7. Validaciones de datos

Se implementaron validaciones en los datos de entrada usando `express-validator` y el middleware `validateUsuario.js`.

Esto permite reforzar la integridad del sistema antes de guardar información, por ejemplo:

- email válido;
- nombre obligatorio;
- datos completos antes de crear o actualizar;
- control previo de errores en la API.

---

## 8. Transaccionalidad

La parte más importante del módulo fue la gestión de transacciones con Sequelize.

Archivo: `src/controllers/transaccionController.js`

Se implementó la creación de un usuario y un pedido dentro de una misma transacción:

```js
const t = await sequelize.transaction();
```

Flujo:

1. se crea el usuario;
2. se crea el pedido asociado;
3. si todo sale bien, se hace `commit()`;
4. si ocurre un error, se ejecuta `rollback()`.

Esto garantiza que no queden datos inconsistentes en la base de datos.

Además, si la transacción falla, se registra el detalle en un archivo de logs mediante el helper `registrarFalloTransaccion()`.

---

## 9. Manejo de errores y logs

Se mantuvo la práctica de registrar eventos importantes en archivos de logs para facilitar la depuración.

Por ejemplo, al producirse un fallo en la transacción, se escribe en `logs/transactions.log` la operación y el error asociado.

Esto ayuda a:

- identificar fallas rápidamente;
- auditar errores de negocio;
- controlar la integridad del sistema.

---

## 10. Estructura final del proyecto

La estructura quedó así:

```text
backend-node-express/
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── mainController.js
│   │   ├── transaccionController.js
│   │   ├── usuarioController.js
│   │   └── usuarioOrmController.js
│   ├── helpers/
│   │   └── logHelper.js
│   ├── middlewares/
│   │   ├── loggerMiddleware.js
│   │   └── validateUsuario.js
│   ├── models/
│   │   ├── index.js
│   │   ├── Pedido.js
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── router.js
│   │   └── usuarioRouters.js
├── public/
│   └── index.html
├── views/
│   └── index.hbs
├── logs/
│   ├── access.log
│   └── transactions.log
├── package.json
├── .env
├── .gitignore
├── README.md
└── ...
```

# Módulo 8 - Implementación de API Backend Node Express

En esta etapa se consolidó el proyecto como una API RESTful funcional, conectada a PostgreSQL mediante Sequelize, con autenticación JWT, rutas protegidas, validación de datos y subida de archivos con `multer`. La aplicación queda preparada para ser consumida por un cliente externo, como una aplicación web o móvil.

## Objetivos alcanzados

- Diseñar endpoints REST utilizando los métodos HTTP `GET`, `POST`, `PUT` y `DELETE`.
- Separar la aplicación en rutas, controladores, middlewares, modelos y configuración.
- Implementar autenticación mediante JSON Web Tokens (JWT).
- Proteger rutas privadas verificando la existencia, validez y expiración del token.
- Implementar carga de imágenes con validación de tipo y tamaño.
- Mantener respuestas JSON con mensajes y datos útiles para el cliente.
- Validar la información recibida antes de crear o actualizar registros.

## Instalación y ejecución

Se requiere Node.js 18 o superior, PostgreSQL y npm.

```bash
npm install
npm run dev
```

Para ejecutar el servidor sin Nodemon:

```bash
npm start
```

El servidor queda disponible en `http://localhost:3000`, o en el puerto definido mediante la variable `PORT`.

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con los datos de conexión a PostgreSQL y la clave usada para firmar los tokens:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_base_de_datos
JWT_SECRET=una_clave_secreta_segura
```

La aplicación utiliza `DATABASE_URL` en `src/config/db.js`. Si no se define `JWT_SECRET`, el código utiliza una clave predeterminada para desarrollo; en un entorno real se debe definir una clave privada mediante variables de entorno.

## Endpoints REST principales

La URL base para los recursos es `http://localhost:3000/api`.

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/usuarios` | Lista usuarios. Acepta el filtro opcional `?nombre=texto`. |
| `POST` | `/api/usuarios` | Registra un usuario validando nombre, email y password. |
| `GET` | `/api/usuarios/:id` | Obtiene un usuario por su identificador. |
| `PUT` | `/api/usuarios/:id` | Actualiza nombre o email de un usuario. |
| `DELETE` | `/api/usuarios/:id` | Elimina un usuario. |
| `GET` | `/api/usuarios/:id/pedidos` | Obtiene un usuario junto con sus pedidos relacionados. |
| `GET` | `/api/usuarios/orm` | Consulta usuarios utilizando Sequelize ORM. |
| `GET` | `/api/usuarios/sql` | Consulta usuarios mediante SQL directo con `pg`. |
| `POST` | `/api/usuarios/transaccion` | Crea un usuario y un pedido dentro de una transacción. |

Ejemplo de body para crear un usuario:

```json
{
  "nombre": "Ana Perez",
  "email": "ana@example.com",
  "password": "123456"
}
```

### Pedidos

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/pedidos` | Lista pedidos incluyendo los datos básicos del usuario. |
| `POST` | `/api/pedidos` | Crea un pedido asociado a un usuario existente. |
| `GET` | `/api/pedidos/:id` | Obtiene un pedido por su identificador. |
| `PUT` | `/api/pedidos/:id` | Actualiza descripción, monto o estado. |
| `DELETE` | `/api/pedidos/:id` | Elimina un pedido. |

Ejemplo de body para crear un pedido:

```json
{
  "descripcion": "Pedido de material de oficina",
  "monto": 150.5,
  "usuarioId": 1,
  "estado": "pendiente"
}
```

Los estados permitidos son `pendiente`, `completado` y `cancelado`. La descripción es obligatoria, el monto debe ser mayor o igual a 1 y el `usuarioId` debe corresponder a un usuario existente.

## Autenticación con JWT

### 1. Obtener el token

Enviar una solicitud `POST` a `/api/auth/login` con un email:

```json
{
  "email": "ana@example.com"
}
```

La respuesta incluye un token válido durante una hora:

```json
{
  "mensaje": "Autorización exitosa",
  "token": "eyJ..."
}
```

### 2. Consumir una ruta protegida

El token debe enviarse en el encabezado `Authorization` usando el formato `Bearer`:

```text
Authorization: Bearer eyJ...
```

Rutas protegidas implementadas:

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/users/perfil` | Devuelve la información del usuario contenida en el token. |
| `POST` | `/api/users/upload-foto` | Permite subir una imagen de perfil a un usuario autenticado. |

Si no se envía el token, la API responde con estado `401`. Si el token es inválido o expiró, responde con estado `403`.

El token se genera en `src/controllers/authController.js` y se valida en `src/middlewares/authMiddleware.js`. En un cliente externo se recomienda conservarlo en memoria o en un mecanismo seguro de sesión y enviarlo únicamente por HTTPS.

## Subida de archivos

La API cuenta con dos opciones de carga:

- `POST /api/upload`: recibe el archivo en el campo `archivo`.
- `POST /api/users/upload-foto`: ruta protegida que recibe el archivo en el campo `imagen`.

La solicitud debe utilizar `multipart/form-data`. Se aceptan archivos `jpeg`, `jpg`, `png`, `gif` y `webp`, con un tamaño máximo de 2 MB. Los archivos se guardan en `uploads/` con un nombre único y se sirven públicamente desde `/uploads/<nombre-del-archivo>`.

Para asociar una carga con un usuario mediante `/api/upload`, se puede incluir `usuarioId` como campo adicional del formulario. Cuando el usuario existe, se guarda la ruta de la imagen en su registro.

Ejemplo de respuesta exitosa:

```json
{
  "success": true,
  "message": "Archivo subido exitosamente.",
  "data": {
    "filename": "1720000000000-123456789.png",
    "url": "/uploads/1720000000000-123456789.png",
    "usuario": "No se asoció a ningún usuario"
  }
}
```

## Validaciones y manejo de errores

Las validaciones se ejecutan antes de llegar al controlador mediante `express-validator`. Esto evita guardar datos incompletos y devuelve errores controlados con estado `400`. También se verifican:

- existencia del email antes de registrar un usuario;
- existencia del usuario antes de crear un pedido;
- existencia del registro antes de actualizarlo o eliminarlo;
- estados permitidos y montos válidos en los pedidos;
- tipo MIME, extensión y tamaño de los archivos;
- presencia, formato y expiración del token JWT.

Los controladores responden con códigos HTTP apropiados, como `201` para creaciones, `200` para operaciones exitosas, `400` para datos inválidos, `401` para ausencia de autenticación, `403` para tokens inválidos o expirados, `404` cuando no existe un recurso y `500` ante errores internos.

