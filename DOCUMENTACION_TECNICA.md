# Documentacion Tecnica - Inventario Tecnico UTVM (Backend)

## Tabla de Contenidos

1. [Descripcion General](#1-descripcion-general)
2. [Stack Tecnologico](#2-stack-tecnologico)
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
4. [Estructura de Directorios](#4-estructura-de-directorios)
5. [Configuracion e Instalacion](#5-configuracion-e-instalacion)
6. [Variables de Entorno](#6-variables-de-entorno)
7. [Base de Datos](#7-base-de-datos)
8. [Modulos del Sistema](#8-modulos-del-sistema)
9. [Autenticacion y Autorizacion](#9-autenticacion-y-autorizacion)
10. [API REST - Endpoints](#10-api-rest---endpoints)
11. [Sistema de Reportes](#11-sistema-de-reportes)
12. [Sistema de Logging](#12-sistema-de-logging)
13. [Servicio de Correo Electronico](#13-servicio-de-correo-electronico)
14. [Enumeraciones del Sistema](#14-enumeraciones-del-sistema)
15. [Manejo de Errores](#15-manejo-de-errores)
16. [Helpers y Utilidades](#16-helpers-y-utilidades)

---

## 1. Descripcion General

**Inventario Tecnico UTVM** es una API RESTful desarrollada para la **Universidad Tecnologica del Valle de Mezquital (UTVM)** que permite gestionar el inventario de equipos tecnologicos de la institucion. El sistema administra multiples tipos de equipos incluyendo computadoras, servidores, monitores, impresoras, proyectores, equipos de almacenamiento, equipos de energia, equipos telefonicos, teclados y mouse, todos asociados a empleados, departamentos y unidades academicas.

### Objetivo

Proveer un sistema centralizado para el registro, consulta, actualizacion y eliminacion de equipos tecnologicos, con control de acceso basado en roles (Administrador y Usuario), notificaciones por correo electronico y generacion de reportes en formato Excel.

---

## 2. Stack Tecnologico

| Tecnologia | Version | Proposito |
|---|---|---|
| **Node.js** | - | Runtime de JavaScript del lado del servidor |
| **NestJS** | 11.x | Framework principal para la construccion de la API |
| **TypeScript** | 5.7.x | Lenguaje de programacion tipado |
| **TypeORM** | 0.3.x | ORM para interaccion con la base de datos |
| **PostgreSQL** | 14.3 | Base de datos relacional |
| **Docker** | - | Contenedorizacion de la base de datos |
| **Passport.js** | 0.7.x | Autenticacion con estrategia JWT |
| **@nestjs/jwt** | 11.x | Generacion y validacion de tokens JWT |
| **bcrypt** | 6.x | Encriptacion de contrasenas |
| **Nodemailer** | 7.x | Envio de correos electronicos (via `@nestjs-modules/mailer`) |
| **Winston** | 3.x | Sistema de logging avanzado |
| **xlsx-populate** | 1.21.x | Generacion de reportes en formato Excel (.xlsx) |
| **class-validator** | 0.14.x | Validacion de DTOs |
| **class-transformer** | 0.5.x | Transformacion de datos |
| **SWC** | 1.10.x | Compilador rapido para TypeScript |
| **Jest** | 29.x | Framework de testing |
| **ESLint** | 9.x | Linter para calidad de codigo |
| **Prettier** | 3.x | Formateador de codigo |

---

## 3. Arquitectura del Proyecto

El proyecto sigue la **arquitectura modular de NestJS**, donde cada dominio del negocio esta encapsulado en su propio modulo. El patron implementado es **MVC (Modelo-Vista-Controlador)** adaptado a una API REST:

```
Cliente (Frontend)
       |
       v
  [API Gateway / CORS]
       |
       v
  [Global Prefix: /api/auth]
       |
       v
  [Validation Pipe] --> [Logging Interceptor] --> [Exception Filter]
       |
       v
  [Controllers] --> Reciben peticiones HTTP
       |
       v
  [Services] --> Logica de negocio
       |
       v
  [TypeORM Repositories] --> Acceso a datos
       |
       v
  [PostgreSQL Database]
```

### Flujo de una Peticion

1. El cliente envia una peticion HTTP al servidor.
2. El **CORS** valida el origen de la peticion (`URL_FRONT`).
3. El **ValidationPipe** valida y transforma los datos de entrada usando DTOs.
4. El **LoggingInterceptor** registra informacion de la peticion y respuesta.
5. Si existe autenticacion, el **AuthGuard** (JWT) valida el token y el **UseRoleGuard** verifica los permisos del usuario.
6. El **Controller** delega la logica al **Service**.
7. El **Service** interactua con los **Repositories** de TypeORM.
8. En caso de error, el **AllExceptionsFilter** captura y formatea la respuesta.

### Prefijo Global

Todas las rutas de la API estan prefijadas con `/api/auth`.

---

## 4. Estructura de Directorios

```
inventario-tecnico-back/
|-- docker-compose.yml          # Configuracion de Docker para PostgreSQL
|-- nest-cli.json               # Configuracion del CLI de NestJS
|-- package.json                # Dependencias y scripts
|-- tsconfig.json               # Configuracion de TypeScript
|-- tsconfig.build.json         # Configuracion de build
|-- eslint.config.mjs           # Configuracion de ESLint
|-- .prettierrc                 # Configuracion de Prettier
|-- .gitignore                  # Archivos ignorados por Git
|-- src/
|   |-- main.ts                 # Punto de entrada de la aplicacion
|   |-- app.module.ts           # Modulo raiz
|   |-- common/                 # Utilidades compartidas
|   |   |-- dto/                # DTOs globales (PaginationDto)
|   |   |-- enums/              # Enumeraciones globales (Roles)
|   |   |-- helpers/            # Funciones auxiliares
|   |   |-- logger/             # Sistema de logging (Winston)
|   |-- users/                  # Modulo de usuarios y autenticacion
|   |-- departamento/           # Modulo de departamentos
|   |-- puesto/                 # Modulo de puestos laborales
|   |-- unidad-academica/       # Modulo de unidades academicas
|   |-- emails/                 # Modulo de envio de correos
|   |-- equipos-computo/        # Modulo de equipos de computo
|   |-- equipos-impresion/      # Modulo de impresoras/escaners
|   |-- equipo-proyeccion/      # Modulo de proyectores y pantallas
|   |-- equipo-almacenamiento/  # Modulo de almacenamiento externo
|   |-- equipo-energia/         # Modulo de equipos de energia (No-break, UPS)
|   |-- equipo-telefonico/      # Modulo de equipos telefonicos
|   |-- servidor/               # Modulo de servidores
|   |-- monitor/                # Modulo de monitores
|   |-- teclado/                # Modulo de teclados
|   |-- mouse/                  # Modulo de mouse
|   |-- marca-equipo/           # Catalogo de marcas
|   |-- modelo-equipo/          # Catalogo de modelos
|   |-- tipo-equipo/            # Catalogo de tipos de equipo
|   |-- tipo-procesador/        # Catalogo de tipos de procesador
|   |-- modelo-procesador/      # Catalogo de modelos de procesador
|   |-- tipo-almacenamiento-extraible/  # Catalogo de almacenamiento extraible
|   |-- version-so/             # Catalogo de versiones de sistema operativo
|   |-- estado-funcionamiento/  # Catalogo de estados de funcionamiento
|   |-- utils-reports/          # Utilidades para generacion de reportes Excel
|-- test/                       # Tests e2e
```

### Estructura de un Modulo Tipico

Cada modulo de dominio sigue la misma estructura:

```
modulo/
|-- dto/
|   |-- create-modulo.dto.ts    # DTO para creacion
|   |-- update-modulo.dto.ts    # DTO para actualizacion (extiende de PartialType)
|-- entities/
|   |-- modulo.entity.ts        # Entidad TypeORM
|-- enums/                      # Enumeraciones especificas del modulo (si aplica)
|-- helpers/                    # Funciones auxiliares del modulo (si aplica)
|-- reports/                    # Controlador y servicio de reportes (si aplica)
|-- modulo.controller.ts        # Controlador REST
|-- modulo.module.ts            # Definicion del modulo NestJS
|-- modulo.service.ts           # Servicio con logica de negocio
```

---

## 5. Configuracion e Instalacion

### Prerequisitos

- **Node.js** (version compatible con ES2023)
- **Yarn** (gestor de dependencias recomendado)
- **Docker** y **Docker Compose** (para la base de datos)

### Pasos de Instalacion

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/LaNazSalomon/inventario-tecnico-back.git
   cd inventario-tecnico-back
   ```

2. **Instalar dependencias:**
   ```bash
   yarn install
   ```

3. **Configurar variables de entorno:**
   - Copiar el archivo `.env.template` y renombrarlo a `.env`
   - Configurar las variables de entorno (ver seccion [Variables de Entorno](#6-variables-de-entorno))

4. **Levantar la base de datos con Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Ejecutar en modo desarrollo:**
   ```bash
   yarn start:dev
   ```

### Scripts Disponibles

| Script | Comando | Descripcion |
|---|---|---|
| `build` | `nest build` | Compila el proyecto |
| `start` | `node dist/main` | Inicia en modo produccion |
| `start:dev` | `nest start --watch` | Inicia en modo desarrollo con hot-reload |
| `start:debug` | `nest start --debug --watch` | Inicia en modo debug |
| `start:prod` | `node dist/main` | Inicia en modo produccion |
| `lint` | `eslint "{src,apps,libs,test}/**/*.ts" --fix` | Ejecuta el linter con auto-fix |
| `format` | `prettier --write "src/**/*.ts" "test/**/*.ts"` | Formatea el codigo |
| `test` | `jest` | Ejecuta tests unitarios |
| `test:watch` | `jest --watch` | Tests en modo observador |
| `test:cov` | `jest --coverage` | Tests con reporte de cobertura |
| `test:e2e` | `jest --config ./test/jest-e2e.json` | Tests end-to-end |

---

## 6. Variables de Entorno

El proyecto utiliza `@nestjs/config` con `ConfigModule.forRoot()` para cargar las variables desde un archivo `.env` ubicado en la raiz del proyecto. Las variables se utilizan globalmente (`isGlobal: true`).

| Variable | Descripcion | Ejemplo |
|---|---|---|
| `DB_HOST` | Host de la base de datos PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de la base de datos | `15432` |
| `DB_NAME` | Nombre de la base de datos | `inventario_tecnico` |
| `DB_USERNAME` | Usuario de la base de datos | `postgres` |
| `DB_PASSWORD` | Contrasena de la base de datos | `mi_password` |
| `STAGE` | Entorno de ejecucion (`prod` habilita SSL en la DB) | `dev` / `prod` |
| `PORT` | Puerto donde se ejecuta el servidor | `3000` |
| `URL_FRONT` | URL del frontend para configuracion CORS | `http://localhost:5173` |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | `mi_jwt_secret` |
| `EMAIL_HOST` | Host del servidor SMTP | `smtp.gmail.com` |
| `EMAIL_PORT` | Puerto del servidor SMTP | `587` |
| `EMAIL_USERNAME` | Usuario del correo SMTP | `correo@gmail.com` |
| `EMAIL_PASSWORD` | Contrasena del correo SMTP | `app_password` |
| `EMAIL` | Correo remitente por defecto | `correo@gmail.com` |

---

## 7. Base de Datos

### Motor

**PostgreSQL 14.3** ejecutado dentro de un contenedor Docker.

```yaml
# docker-compose.yml
version: '3'
services:
  db:
    image: postgres:14.3
    restart: always
    ports:
      - "15432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: inventario-tecnico-utvm
    volumes:
      - ./postgres:/var/lib/postgresql/data
```

### Sincronizacion

La base de datos utiliza `synchronize: true` por defecto en `app.module.ts`, lo que significa que TypeORM sincroniza automaticamente el esquema con las entidades. **Para produccion**, se recomienda cambiar `synchronize` a `false` y usar migraciones.

### Diagrama Entidad-Relacion

```
                            +-------------------+
                            |  UnidadAcademica  |
                            |-------------------|
                            | idUnidadAcademica |
                            | nombreUnidad      |
                            +-------------------+
                                  |  1
                                  |
                                  | N
                            +-------------------+
                            |   Departamento    |
                            |-------------------|
                            | idDepartamento    |
                            | nombreDepartamento|
                            | unidadAcademica   |----> UnidadAcademica
                            +-------------------+
                                  |  1
                                  |
                                  | N
+------------+             +-------------------+              +------------+
|   Puesto   |  1      N   |      User         |              | MarcaEquipo|
|------------|-------------|-------------------|              |------------|
| idPuesto   |             | idEmpleado (UUID) |              | id         |
| nombrePuesto|             | password (hash)   |              | nombre     |
| descripcion|             | rol (admin/usuario)|              +------------+
+------------+             | numeroEmpleado    |                    |
                           | nombreEmpleado    |                    | 1
                           | apellidoPaterno   |                    |
                           | apellidoMaterno   |              +---------------+
                           | email             |              | ModeloEquipo  |
                           | puesto            |----> Puesto  |---------------|
                           | departamento      |----> Dept.   | id            |
                           | unidadAcademica   |----> UA      | nombre        |
                           +-------------------+              | marca         |--> MarcaEquipo
                                  |                           +---------------+
                                  | (empleadoAsignado)
                                  |
      +---------------------------+---------------------------+
      |               |               |               |       |
      v               v               v               v       v
+-----------+  +-----------+  +-----------+  +--------+  +---------+
|EquipoComp.|  | Servidor  |  | Monitor   |  |Teclado |  |  Mouse  |
+-----------+  +-----------+  +-----------+  +--------+  +---------+
| Impresora |  | Proyector |  |Almacenam. |  |Energia |  |Telefonico|
+-----------+  +-----------+  +-----------+  +--------+  +----------+
```

### Entidades Principales

#### User (Tabla: `users`)

| Campo | Tipo | Restricciones | Descripcion |
|---|---|---|---|
| `idEmpleado` | UUID | PK, auto-generado | Identificador unico del usuario |
| `password` | text | `select: false` | Contrasena encriptada con bcrypt |
| `rol` | enum (Roles) | default: `usuario` | Rol del usuario (`admin`, `usuario`) |
| `numeroEmpleado` | text | unique, not null | Numero de empleado institucional |
| `nombreEmpleado` | text | not null | Nombre del empleado |
| `apellidoPaterno` | text | not null | Apellido paterno |
| `apellidoMaterno` | text | not null | Apellido materno |
| `email` | text | unique | Correo electronico |
| `puesto` | FK -> Puesto | not null | Puesto laboral |
| `departamento` | FK -> Departamento | not null | Departamento |
| `unidadAcademica` | FK -> UnidadAcademica | not null | Unidad academica |

#### EquiposComputo (Tabla: `equipo-computo`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | UUID | Identificador unico |
| `inventario` | text | Numero de inventario |
| `nombreEquipo` | text | Nombre del equipo |
| `tipoEquipo` | FK -> TipoEquipo | Tipo (desktop, laptop, etc.) |
| `marca` | FK -> MarcaEquipo | Marca del equipo |
| `modelo` | FK -> ModeloEquipo | Modelo del equipo |
| `direccionIP` | text | Direccion IP asignada |
| `direccionServidorDNS` | text | Servidor DNS |
| `mascaraSubRed` | text | Mascara de subred |
| `puertaEnlace` | text | Puerta de enlace |
| `nombreDominio` | text | Nombre de dominio |
| `tipoConexionRed` | enum | Tipo de conexion de red |
| `tipoProcesador` | FK -> TipoProcesador | Tipo de procesador |
| `modeloProcesador` | FK -> ModeloProcesador | Modelo de procesador |
| `velocidadProcesador` | float | Velocidad del procesador |
| `tipoVelocidad` | enum | Unidad de velocidad |
| `nucleos` | int | Numero de nucleos |
| `capacidadRam` | text | Capacidad de RAM |
| `capacidadAlmacenamiento` | text | Capacidad de almacenamiento |
| `sistemaOperativo` | enum | Sistema operativo |
| `versionSO` | FK -> VersionSO | Version del SO |
| `arquitecturaSO` | enum | Arquitectura del SO |
| `estadoLicencia` | enum | Estado de la licencia |
| `estadoFuncionamiento` | FK -> EstadoFuncionamiento | Estado funcional |
| `serie` | text | Numero de serie |
| `mac` | varchar(50) | Direccion MAC |
| `cantidadPuertosUSB` | int | Puertos USB |
| `cantidadPuertosAudio` | int | Puertos de audio |
| `cantidadPuertosRed` | int | Puertos de red |
| `cantidadPuertosHDMI` | int | Puertos HDMI |
| `cantidadPuertosVGA` | int | Puertos VGA |
| `cantidadPuertosDVI` | int | Puertos DVI |
| `cantidadPuertosSerial` | int | Puertos seriales |
| `cantidadPuertosDisplayPort` | int | Puertos DisplayPort |
| `cantidadPuertosMiniHDMI` | int | Puertos Mini HDMI |
| `cantidadPuertosTarjetaMemoria` | int | Ranuras de tarjeta de memoria |
| `cantidadPuertosDIN5` | int | Puertos DIN5 |
| `cantidadPuertosDIN6` | int | Puertos DIN6 |
| `cantidadPuertosMiniDIN` | int | Puertos Mini DIN |
| `cantidadPuertosParalelo` | int | Puertos paralelos |
| `cantidadPuertoSerialCom1` | int | Puertos COM1 |
| `cantidadCamaraWeb` | int | Camaras web integradas |
| `cantidadMicrofono` | int | Microfonos integrados |
| `tipoAlmacenamientoExtraible` | FK -> TipoAlmacenamientoExtraible | Tipo almacenamiento extraible |
| `fechaVencimientoGarantia` | date | Fecha de vencimiento de garantia |
| `complemento` | text | Informacion adicional |
| `empleadoAsignado` | FK -> User | Empleado asignado |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |
| `departamentoArea` | FK -> Departamento | Departamento o area |

#### Servidor (Tabla: `servidor`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idServidor` | UUID | Identificador unico |
| `tipoServidor` | enum | Tipo de servidor (fisico, virtual, etc.) |
| `marca` | FK -> MarcaEquipo | Marca |
| `modelo` | FK -> ModeloEquipo | Modelo |
| `tipoProcesador` | FK -> TipoProcesador | Tipo de procesador |
| `modeloProcesador` | FK -> ModeloProcesador | Modelo de procesador |
| `velocidadProcesador` | float | Velocidad del procesador |
| `nucleosProcesador` | int | Nucleos del procesador |
| `cantidadProcesadores` | int | Cantidad de procesadores |
| `cantidadMaxProcesadores` | int | Capacidad maxima de procesadores |
| `capacidadRAM` | int | RAM en GB |
| `capacidadMaxRAM` | int | Capacidad maxima de RAM |
| `capacidadAlmacenamiento` | int | Almacenamiento en GB |
| `porcentajeUsoAlmacenamiento` | float | Porcentaje de uso |
| `sistemaOperativo` | enum | Sistema operativo |
| `versionSO` | FK -> VersionSO | Version del SO |
| `arquitecturaSO` | enum | Arquitectura |
| `estadoLicenciamientoSO` | enum | Estado de la licencia |
| `tipoConexion` | enum | Tipo de conexion de red |
| `direccionIPInterna` | text | IP interna |
| `direccionIPExterna` | text | IP externa |
| `rol` | text | Rol del servidor |
| `proposito` | text | Proposito |
| `criticidad` | text | Nivel de criticidad |
| `puertosAbiertos` | text | Puertos abiertos |
| `aplicaBalanceoCarga` | boolean | Aplica balanceo de carga |
| `politicaRespaldo` | text | Politica de respaldo |
| `tipoPoliticaRespaldo` | text | Tipo de politica |
| `periodicidadRespaldo` | text | Periodicidad del respaldo |
| `serie` | text | Numero de serie |
| `fechaVencimientoGarantia` | date | Fecha de garantia |
| `estadoFuncionamiento` | FK -> EstadoFuncionamiento | Estado funcional |
| `empleado` | FK -> User | Empleado asignado |
| `departamento` | FK -> Departamento | Departamento |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |

#### Monitor (Tabla: `monitor`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idMonitor` | UUID | Identificador unico |
| `numeroInventario` | int | Numero de inventario |
| `marca` | varchar | Marca del monitor |
| `modelo` | varchar | Modelo del monitor |
| `pulgadas` | float | Tamano en pulgadas |
| `resolucion` | varchar | Resolucion de pantalla |
| `tipoPantalla` | varchar | Tipo de pantalla (LCD, LED, etc.) |
| `cantidadPuertosVGA` | int | Puertos VGA |
| `cantidadPuertosDVI` | int | Puertos DVI |
| `cantidadPuertosHDMI` | int | Puertos HDMI |
| `serie` | varchar | Numero de serie |
| `fechaVencimientoGarantia` | date | Fecha de garantia |
| `estado` | FK -> EstadoFuncionamiento | Estado funcional |
| `empleado` | FK -> User | Empleado asignado |
| `equipo` | FK -> EquiposComputo | Equipo de computo asociado |
| `departamento` | FK -> Departamento | Departamento |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |

#### EquipoImpresion (Tabla: `equipos_impresion`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idEquipoImpresion` | UUID | Identificador unico |
| `inventario` | text | Numero de inventario |
| `compartida` | boolean | Si es compartida |
| `multifuncional` | boolean | Si es multifuncional |
| `serie` | text | Numero de serie |
| `tipoEquipoImpresion` | enum | Tipo (inyeccion tinta, laser, etc.) |
| `modoColorEquipoImpresion` | enum | Modo de color (monocromatica, color) |
| `usuario` | FK -> User | Usuario asignado |
| `estadoFuncionamiento` | FK -> EstadoFuncionamiento | Estado funcional |
| `marcaEquipoImpresion` | FK -> MarcaEquipo | Marca |
| `modeloEquipoImpresion` | FK -> ModeloEquipo | Modelo |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |
| `departamentoArea` | FK -> Departamento | Departamento |

#### EquipoProyeccion (Tabla: `equipos_proyeccion`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idEquipoProyeccion` | UUID | Identificador unico |
| `inventario` | text | Numero de inventario |
| `serie` | text | Numero de serie |
| `pulgadas` | text | Tamano en pulgadas |
| `resolucion` | text | Resolucion |
| `tipoEquipoProyeccion` | enum | Tipo (proyector, pantalla, etc.) |
| `tipoPantalla` | enum | Tipo de pantalla |
| `cantidadPuertosUsbA/B` | int | Puertos USB A y B |
| `cantidadPuertosVga/Dvi/Hdmi` | int | Puertos de video |
| `cantidadPuertosRj45` | int | Puertos de red |
| `cantidadPuertosRca` | int | Puertos RCA |
| `cantidadPuertosSuperVideo` | int | Puertos Super Video |
| `fechaVencimientoGarantia` | date | Fecha de garantia |
| `usuario` | FK -> User | Usuario asignado |
| `estadoFuncionamiento` | FK -> EstadoFuncionamiento | Estado funcional |
| `marcaEquipoProyeccion` | FK -> MarcaEquipo | Marca |
| `modeloEquipoProyeccion` | FK -> ModeloEquipo | Modelo |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |
| `departamentoArea` | FK -> Departamento | Departamento |

#### EquipoAlmacenamiento (Tabla: `equipos_almacenamiento`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idEquipoAlmacenamiento` | UUID | Identificador unico |
| `inventario` | text (nullable) | Numero de inventario |
| `serie` | text (nullable) | Numero de serie |
| `capacidadAlmacenamiento` | text | Capacidad (ej. "1TB") |
| `tipoEquipoAlmacenamiento` | enum | Tipo (disco duro, SSD, NAS, etc.) |
| `usuario` | FK -> User | Usuario asignado |
| `marcaEquipoAlmacenamiento` | FK -> MarcaEquipo | Marca |
| `modeloEquipoAlmacenamiento` | FK -> ModeloEquipo | Modelo |
| `estadoFuncionamiento` | FK -> EstadoFuncionamiento | Estado funcional |
| `departamento` | FK -> Departamento | Departamento |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |

#### EquipoEnergia (Tabla: `equipos_energia`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idEquipoEnergia` | UUID | Identificador unico |
| `inventario` | text (nullable, unique) | Numero de inventario |
| `serie` | text (nullable) | Numero de serie |
| `tipoEquipoEnergia` | enum | Tipo (No-break, regulador, UPS, etc.) |
| `usuario` | FK -> User | Usuario asignado |
| `marcaEquipoEnergia` | FK -> MarcaEquipo | Marca |
| `modeloEquipoEnergia` | FK -> ModeloEquipo | Modelo |
| `estadoFuncionamiento` | FK -> EstadoFuncionamiento | Estado funcional |
| `departamento` | FK -> Departamento | Departamento |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |

#### EquipoTelefonico (Tabla: `equipos_telefonicos`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idEquipoTelefonico` | UUID | Identificador unico |
| `inventario` | text (nullable, unique) | Numero de inventario |
| `serie` | text (nullable) | Numero de serie |
| `tipoEquipoTelefonico` | enum | Tipo (telefono, conmutador, etc.) |
| `tipoConexionRed` | enum | Tipo de conexion |
| `direccionIp` | text (nullable) | Direccion IP |
| `numeroExtension` | text (nullable) | Numero de extension |
| `did` | boolean | DID (marcacion directa) |
| `usuario` | FK -> User | Usuario asignado |
| `marcaEquipoTelefonico` | FK -> MarcaEquipo | Marca |
| `modeloEquipoTelefonico` | FK -> ModeloEquipo | Modelo |
| `estadoFuncionamiento` | FK -> EstadoFuncionamiento | Estado funcional |
| `departamento` | FK -> Departamento | Departamento |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |

#### Teclado (Tabla: `teclado`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idTeclado` | UUID | Identificador unico |
| `numeroInventario` | varchar | Numero de inventario |
| `marca` | varchar | Marca |
| `modelo` | varchar | Modelo |
| `tipoConector` | varchar | Tipo de conector (USB, PS/2, etc.) |
| `serie` | varchar | Numero de serie |
| `fechaVencimientoGarantia` | date | Fecha de garantia |
| `estado` | FK -> EstadoFuncionamiento | Estado funcional |
| `empleado` | FK -> User | Empleado asignado |
| `equipo` | FK -> EquiposComputo | Equipo de computo asociado |
| `departamento` | FK -> Departamento | Departamento |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |

#### Mouse (Tabla: `mouse`)

| Campo | Tipo | Descripcion |
|---|---|---|
| `idMouse` | UUID | Identificador unico |
| `numeroInventario` | varchar | Numero de inventario |
| `marca` | varchar | Marca |
| `modelo` | varchar | Modelo |
| `tipoConector` | varchar | Tipo de conector |
| `mecanismo` | varchar | Mecanismo (optico, laser, etc.) |
| `serie` | varchar | Numero de serie |
| `fechaVencimientoGarantia` | date | Fecha de garantia |
| `estado` | FK -> EstadoFuncionamiento | Estado funcional |
| `empleado` | FK -> User | Empleado asignado |
| `equipo` | FK -> EquiposComputo | Equipo de computo asociado |
| `departamento` | FK -> Departamento | Departamento |
| `unidadAcademica` | FK -> UnidadAcademica | Unidad academica |

### Entidades de Catalogos

| Entidad | Tabla | Campos |
|---|---|---|
| `MarcaEquipo` | `marca-equipo` | `id` (UUID), `nombre` (unique) |
| `ModeloEquipo` | `modelo-equipo` | `id` (UUID), `nombre`, `marca` (FK -> MarcaEquipo) |
| `TipoEquipo` | - | `id` (UUID), `nombre` |
| `TipoProcesador` | - | `id` (UUID), `nombre` |
| `ModeloProcesador` | - | `id` (UUID), `nombre` |
| `VersionSO` | - | `id` (UUID), `nombre` |
| `TipoAlmacenamientoExtraible` | - | `id` (UUID), `nombre` |
| `EstadoFuncionamiento` | `estado-funcionamiento` | `id` (UUID), `estado` |
| `Puesto` | `puesto` | `idPuesto` (UUID), `nombrePuesto`, `descripcion` |
| `Departamento` | `departamento` | `idDepartamento` (UUID), `nombreDepartamento`, `unidadAcademica` (FK) |
| `UnidadAcademica` | `unidad-academica` | `idUnidadAcademica` (UUID), `nombreUnidad` |

---

## 8. Modulos del Sistema

El sistema cuenta con **23 modulos** registrados en `AppModule`:

### Modulos de Infraestructura

| Modulo | Descripcion |
|---|---|
| `LoggerModule` | Modulo global de logging con Winston |
| `ConfigModule` | Carga de variables de entorno (`.env`) |
| `TypeOrmModule` | Conexion a PostgreSQL |
| `MailerModule` | Configuracion del servicio de correo SMTP |

### Modulos de Dominio

| Modulo | Ruta Base | Descripcion |
|---|---|---|
| `UsersModule` | `/api/auth/users` | Gestion de usuarios y autenticacion |
| `DepartamentoModule` | `/api/auth/departamento` | Gestion de departamentos |
| `PuestoModule` | `/api/auth/puesto` | Gestion de puestos laborales |
| `UnidadAcademicaModule` | `/api/auth/unidad-academica` | Gestion de unidades academicas |
| `EmailsModule` | - | Servicio de envio de correos (no expone endpoints) |
| `EquiposComputoModule` | `/api/auth/equipos-computo` | Gestion de equipos de computo |
| `EquiposImpresionModule` | `/api/auth/equipos-impresion` | Gestion de impresoras |
| `EquipoProyeccionModule` | `/api/auth/equipo-proyeccion` | Gestion de proyectores |
| `EquipoAlmacenamientoModule` | `/api/auth/equipo-almacenamiento` | Gestion de almacenamiento externo |
| `EquipoEnergiaModule` | `/api/auth/equipo-energia` | Gestion de equipos de energia |
| `EquipoTelefonicoModule` | `/api/auth/equipo-telefonico` | Gestion de equipos telefonicos |
| `ServidoresModule` | `/api/auth/servidores` | Gestion de servidores |
| `MonitorModule` | `/api/auth/monitor` | Gestion de monitores |
| `TecladoModule` | `/api/auth/teclado` | Gestion de teclados |
| `MouseModule` | `/api/auth/mouse` | Gestion de mouse |

### Modulos de Catalogos

| Modulo | Ruta Base | Descripcion |
|---|---|---|
| `MarcaEquipoModule` | `/api/auth/marca-equipo` | Catalogo de marcas |
| `ModeloEquipoModule` | `/api/auth/modelo-equipo` | Catalogo de modelos |
| `TipoEquipoModule` | `/api/auth/tipo-equipo` | Catalogo de tipos de equipo |
| `TipoProcesadorModule` | `/api/auth/tipo-procesador` | Catalogo de tipos de procesador |
| `ModeloProcesadorModule` | `/api/auth/modelo-procesador` | Catalogo de modelos de procesador |
| `TipoAlmacenamientoExtraibleModule` | `/api/auth/tipo-almacenamiento-extraible` | Catalogo de almacenamiento extraible |
| `VersionSoModule` | `/api/auth/version-so` | Catalogo de versiones de SO |
| `EstadoFuncionamientoModule` | `/api/auth/estado-funcionamiento` | Catalogo de estados de funcionamiento |

### Modulos de Reportes

| Modulo | Ruta Base | Descripcion |
|---|---|---|
| `UtilsReportsModule` | - | Utilidades compartidas para generacion de reportes Excel |

---

## 9. Autenticacion y Autorizacion

### Estrategia de Autenticacion

El sistema utiliza **JWT (JSON Web Tokens)** con la estrategia de **Passport.js** para autenticar peticiones.

#### Flujo de Login

1. El usuario envia `numeroEmpleado` y `password` a `POST /api/auth/users/login`.
2. Se verifica que el usuario existe en la base de datos.
3. Se compara la contrasena proporcionada con el hash almacenado usando `bcrypt.compareSync()`.
4. Si es valido, se genera un JWT con el `idEmpleado` como payload.
5. El token se retorna al cliente junto con datos basicos del usuario.

#### Configuracion JWT

- **Algoritmo:** HS256 (por defecto en `@nestjs/jwt`)
- **Tiempo de expiracion:** 3 horas (`expiresIn: '3h'`)
- **Secreto:** Configurado via variable de entorno `JWT_SECRET`
- **Extraccion:** Desde el header `Authorization: Bearer <token>`

#### Respuesta del Login

```json
{
  "numeroEmpleado": "12345",
  "idEmpleado": "uuid-del-empleado",
  "nombre": "Nombre Completo",
  "unidadAcademica": "uuid-unidad-academica",
  "rol": "admin",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Sistema de Roles

El sistema define dos roles en el enum `Roles`:

| Rol | Valor en BD | Permisos |
|---|---|---|
| **Admin** | `admin` | Acceso total: CRUD de usuarios, reset de contrasenas, y acceso a todos los recursos |
| **User** | `usuario` | Acceso de lectura y operaciones basicas sobre equipos (dependiendo del endpoint) |

### Decoradores de Autorizacion

#### `@Auth(...roles)`

Decorador compuesto que combina:
- `@RoleProtected(...roles)` - Establece los roles requeridos en metadata
- `@UseGuards(AuthGuard(), UseRoleGuard)` - Aplica los guards de autenticacion y autorizacion

**Uso:**
```typescript
@Auth()              // Solo requiere autenticacion (cualquier rol)
@Auth(Roles.Admin)   // Requiere autenticacion + rol Admin
```

#### `@GetUser()`

Decorador de parametro que extrae el usuario autenticado del request.

### Guards

| Guard | Funcion |
|---|---|
| `AuthGuard('jwt')` | Valida el token JWT y agrega el usuario al request |
| `UseRoleGuard` | Verifica que el rol del usuario este en la lista de roles permitidos |

### Estrategia JWT (`JwtStrategy`)

La estrategia de validacion de JWT:
1. Extrae el token del header `Authorization`.
2. Valida la firma con `JWT_SECRET`.
3. Verifica que el token no haya expirado.
4. Busca al usuario en la base de datos por `idEmpleado`.
5. Retorna `idEmpleado`, `rol` y `nombreEmpleado` del usuario.

---

## 10. API REST - Endpoints

### Prefijo Global: `/api/auth`

Todos los endpoints incluyen el prefijo `/api/auth/` antes de la ruta del controlador.

### Modulo de Usuarios (`/api/auth/users`)

| Metodo | Ruta | Auth | Rol | Descripcion |
|---|---|---|---|---|
| `POST` | `/users` | Si | Admin | Crear un nuevo usuario |
| `GET` | `/users` | Si | Cualquiera | Listar usuarios con paginacion |
| `GET` | `/users/:term` | Si | Admin | Buscar usuario por UUID o termino |
| `PATCH` | `/users/:id` | Si | Admin | Actualizar usuario |
| `DELETE` | `/users/:id` | Si | Admin | Eliminar usuario |
| `POST` | `/users/login` | No | - | Iniciar sesion |
| `POST` | `/users/reset-password` | Si | Admin | Resetear contrasena de un usuario |

#### DTOs de Usuarios

**CreateUserDto:**
```typescript
{
  numeroEmpleado: number,       // Requerido
  rol?: Roles,                  // Opcional (default: 'usuario')
  nombreEmpleado: string,       // Requerido
  apellidoPaterno: string,      // Requerido
  apellidoMaterno: string,      // Requerido
  email: string,                // Requerido, formato email
  idPuesto: string,             // UUID v4 requerido
  idDepartamento: string,       // UUID v4 requerido
  idUnidadAcademica: string     // UUID v4 requerido
}
```

**LoginDto:**
```typescript
{
  numeroEmpleado: string,       // Requerido
  password: string              // 6-50 caracteres, debe incluir mayusculas, minusculas y numeros
}
```

**ResetPasswordDto:**
```typescript
{
  usuarioId: string,            // UUID v4
  generarAutomatica: boolean,   // true = genera automaticamente, false = usa contrasenaManual
  contrasenaManual?: string     // Opcional, mismas reglas de password
}
```

### Endpoints CRUD Estandar (Equipos)

Los siguientes modulos comparten un patron CRUD identico:

| Metodo | Ruta | Descripcion |
|---|---|---|
| `POST` | `/` | Crear registro |
| `GET` | `/` | Listar con paginacion y filtro por unidad academica |
| `GET` | `/:id` | Buscar por UUID o termino |
| `PATCH` | `/:id` | Actualizar registro |
| `DELETE` | `/:id` | Eliminar registro |

**Modulos con este patron:**
- `/api/auth/equipos-computo`
- `/api/auth/equipos-impresion`
- `/api/auth/equipo-proyeccion`
- `/api/auth/equipo-almacenamiento`
- `/api/auth/equipo-energia`
- `/api/auth/equipo-telefonico`
- `/api/auth/monitor`
- `/api/auth/teclado`
- `/api/auth/mouse`

### Endpoints del Modulo Servidores (`/api/auth/servidores`)

| Metodo | Ruta | Auth | Descripcion |
|---|---|---|---|
| `POST` | `/servidores` | Si | Crear servidor |
| `GET` | `/servidores` | Si | Listar con paginacion |
| `GET` | `/servidores/:id` | Si | Buscar por UUID |
| `GET` | `/servidores/search/:term` | Si | Buscar por termino |
| `PATCH` | `/servidores/:id` | Si | Actualizar servidor |
| `DELETE` | `/servidores/:id` | Si | Eliminar servidor |

### Endpoints de Catalogos

Todos los catalogos comparten el patron CRUD estandar (POST, GET, GET/:id, PATCH/:id, DELETE/:id):

- `/api/auth/marca-equipo`
- `/api/auth/modelo-equipo`
- `/api/auth/tipo-equipo`
- `/api/auth/tipo-procesador`
- `/api/auth/modelo-procesador`
- `/api/auth/tipo-almacenamiento-extraible`
- `/api/auth/version-so`
- `/api/auth/estado-funcionamiento`
- `/api/auth/departamento`
- `/api/auth/puesto`
- `/api/auth/unidad-academica`

### Endpoints de Reportes

| Metodo | Ruta | Auth | Descripcion |
|---|---|---|---|
| `GET` | `/api/auth/reportes/computo?usuarioId=UUID` | Si | Descargar reporte Excel de equipos de computo |

> **Nota:** Existen modulos de reportes adicionales dentro de los modulos de monitor, teclado, mouse, servidores, impresion, proyeccion, almacenamiento, energia y telefonicos.

### Paginacion

Todos los endpoints de listado soportan los siguientes query params:

| Parametro | Tipo | Descripcion |
|---|---|---|
| `limit` | number (positivo) | Cantidad de registros por pagina (default: 50) |
| `offset` | number (>= 0) | Desplazamiento para paginacion |
| `idUnidadAcademica` | UUID v4 | Filtrar por unidad academica |

**Ejemplo:** `GET /api/auth/equipos-computo?limit=10&offset=0&idUnidadAcademica=uuid`

---

## 11. Sistema de Reportes

El sistema incluye generacion de reportes en formato **Excel (.xlsx)** utilizando la libreria `xlsx-populate`.

### Arquitectura de Reportes

```
Controller de Reportes
       |
       v
Service de Reportes --> UtilsReportsService
       |                       |
       v                       v
  QueryBuilder           XlsxHelper
  (consulta datos)       (genera Excel)
```

### UtilsReportsService

Proporciona dos metodos principales:

| Metodo | Descripcion |
|---|---|
| `generarReporteSimple()` | Genera un Excel con una sola hoja |
| `generarReporteMultiHojas()` | Genera un Excel con multiples hojas |

### XlsxHelper

| Metodo | Descripcion |
|---|---|
| `crearHoja()` | Crea una hoja en el workbook con encabezados en negritas y datos |
| `exportar()` | Exporta el workbook como buffer y lo envia como respuesta HTTP |

### Respuesta del Reporte

El reporte se descarga como archivo `.xlsx` con los headers:
- `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- `Content-Disposition: attachment; filename=nombre-timestamp.xlsx`

---

## 12. Sistema de Logging

El sistema utiliza **Winston** como motor de logging, implementado a traves de un modulo global `LoggerModule`.

### Componentes

#### AppLogger

Servicio global que implementa `LoggerService` de NestJS. Configura Winston con:

| Transport | Archivo | Descripcion |
|---|---|---|
| **File (error)** | `logs/error.log` | Solo errores, max 5MB, 5 archivos rotativos |
| **File (combined)** | `logs/combined.log` | Todos los niveles, max 5MB, 5 archivos rotativos |
| **Console** | - | Salida coloreada en consola |

**Formato de log:** `YYYY-MM-DD HH:mm:ss [Contexto] NIVEL: mensaje`

#### LoggingInterceptor

Interceptor global que registra cada peticion HTTP:
- Metodo HTTP
- URL
- Codigo de respuesta
- Duracion en milisegundos

**Ejemplo de log:** `GET /api/auth/users - Status: 200 - Duration: 45ms`

#### AllExceptionsFilter

Filtro global de excepciones que:
- Captura todas las excepciones (HTTP y no-HTTP)
- Registra errores 500+ como `error` y errores 4xx como `warn`
- Retorna una respuesta JSON estandarizada:

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/auth/users",
  "method": "POST",
  "message": "Mensaje del error"
}
```

---

## 13. Servicio de Correo Electronico

El sistema envia correos electronicos en los siguientes escenarios:

1. **Creacion de usuario**: Se envia un correo al nuevo usuario con sus credenciales de acceso (numero de empleado y contrasena generada automaticamente).
2. **Reseteo de contrasena**: Se envia un correo al usuario con sus nuevas credenciales.

### Configuracion

Utiliza `@nestjs-modules/mailer` con transporte SMTP configurado via variables de entorno.

### Plantilla de Correo

El correo de credenciales incluye una plantilla HTML estilizada con:
- Nombre del empleado
- Numero de empleado
- Contrasena asignada
- Colores institucionales (verde `#275124` y guinda `#691b32`)

---

## 14. Enumeraciones del Sistema

### Roles del Sistema

```typescript
enum Roles {
  Admin = 'admin',
  User = 'usuario'
}
```

### Sistema Operativo

```typescript
enum SistemaOperativo {
  WINDOWS = "Windows",
  MACOS = "macOS",
  LINUX = "Linux",
  CHROME_OS = "ChromeOS",
  FREEBSD = "FreeBSD",
  OPENBSD = "OpenBSD"
}
```

### Arquitectura

```typescript
enum Arquitectura {
  X86 = "x86",
  X86_64 = "x86_64",
  ARM = "ARM",
  ARM64 = "ARM64",
  RISC_V = "RISC-V",
  POWERPC = "PowerPC",
  SPARC = "SPARC",
  MIPS = "MIPS",
  ITANIUM = "Itanium",
  ALPHA = "Alpha"
}
```

### Tipo de Conexion de Red

```typescript
enum TipoConexionRed {
  ETHERNET = "Ethernet",
  WIFI = "WiFi",
  DATOS_MOVILES = "Datos moviles",
  BLUETOOTH = "Bluetooth",
  VPN = "VPN",
  SATELITAL = "Satelital",
  DESCONOCIDA = "Desconocida",
  SIN_CONEXION = "Sin conexion"
}
```

### Estado de Licencia

```typescript
enum EstadoLicencia {
  NO_INSTALADA = "No instalada",
  PRUEBA = "En prueba",
  ACTIVA = "Activa",
  EXPIRADA = "Expirada",
  INVALIDA = "Invalida",
  PERIODO_GRACIA = "Periodo de gracia",
  SUSPENDIDA = "Suspendida",
  REVOCADA = "Revocada"
}
```

### Enumeraciones por Modulo

| Modulo | Enumeracion | Valores |
|---|---|---|
| **Impresion** | `TipoEquipoImpresion` | Inyeccion de tinta, Laser, Termicas, etc. |
| **Impresion** | `ModoColorEquipoImpresion` | Monocromatica, Color |
| **Proyeccion** | `TipoEquipoProyeccion` | Proyector, Pantalla, etc. |
| **Proyeccion** | `TipoPantalla` | LCD, LED, N/A, etc. |
| **Almacenamiento** | `TipoEquipoAlmacenamiento` | Disco duro, SSD, NAS, etc. |
| **Energia** | `TipoEquipoEnergia` | No-break, Regulador, UPS, etc. |
| **Telefonico** | `TipoEquipoTelefonico` | Telefono, Conmutador, etc. |
| **Telefonico** | `TipoConexionRed` | Ethernet, Inalambrica, etc. |
| **Servidor** | `TipoServidor` | Fisico, Virtual, etc. |
| **Computo** | `TipoVelocidad` | GHz, MHz, etc. |

---

## 15. Manejo de Errores

### ManejadorErroresDB

Clase helper estatica que centraliza el manejo de errores de base de datos PostgreSQL:

| Codigo PG | Tipo Error | Excepcion HTTP |
|---|---|---|
| `23505` | Violacion de restriccion UNIQUE | `BadRequestException` |
| `23503` | Violacion de clave foranea | `BadRequestException` |
| `23502` | Violacion de NOT NULL | `BadRequestException` |
| Otros | Error inesperado | `InternalServerErrorException` |

### Excepciones HTTP Utilizadas

| Excepcion | Codigo | Uso |
|---|---|---|
| `BadRequestException` | 400 | Datos invalidos, duplicados, relaciones no encontradas |
| `UnauthorizedException` | 401 | Credenciales invalidas, token no valido |
| `ForbiddenException` | 403 | Rol insuficiente para la accion |
| `NotFoundException` | 404 | Recurso no encontrado |
| `InternalServerErrorException` | 500 | Error inesperado del servidor |

### ValidationPipe Global

Configurado con:
- `whitelist: true` - Solo acepta propiedades definidas en el DTO
- `forbidNonWhitelisted: true` - Rechaza propiedades no definidas

---

## 16. Helpers y Utilidades

### RandomPassword

Clase utilitaria para generacion y encriptacion de contrasenas:

| Metodo | Descripcion |
|---|---|
| `generarContrasenaAleatoria(longitud)` | Genera una contrasena aleatoria con mayusculas, minusculas, numeros y simbolos |
| `Encriptar(texto)` | Genera hash bcrypt con factor de costo 10 |
| `encriptarContrasena(contrasena)` | Alias de Encriptar |
| `cumpleReglas(password, longitud)` | Valida que la contrasena cumpla con los requisitos minimos |

### MensajePassword

Genera plantillas HTML para correos de credenciales con estilos institucionales.

### PaginationDto

DTO reutilizable para paginacion:

```typescript
{
  limit?: number,              // Positivo, default: 50
  offset?: number,             // >= 0, default: 0
  idUnidadAcademica?: string   // UUID v4, para filtrar por unidad academica
}
```

### dateGetTime

Helper simple que genera un timestamp numerico para uso en nombres de archivos.

---

## Notas Adicionales

### CORS

El servidor esta configurado para aceptar peticiones unicamente desde el origen definido en `URL_FRONT`, con las siguientes opciones:
- `credentials: true`
- Metodos: `GET, POST, PUT, PATCH, DELETE, OPTIONS`

### Consideraciones de Produccion

1. **Cambiar `synchronize: false`** en `app.module.ts` para evitar perdida de datos y usar migraciones.
2. **Configurar `STAGE=prod`** para habilitar SSL en la conexion a la base de datos.
3. **Asegurar `JWT_SECRET`** con una clave fuerte y unica.
4. **Configurar correctamente `URL_FRONT`** para restringir el acceso CORS.
5. **Revisar los archivos de log** en el directorio `logs/` para monitoreo.
