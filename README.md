# CitaSuSalud

**CitaSuSalud** es un sistema de gestión de citas médicas que permite a los pacientes gestionar sus citas de manera eficiente, desde la creación hasta la cancelación. Este sistema conecta a los pacientes con los especialistas médicos, brindando una interfaz intuitiva tanto para los pacientes como para los administradores.

## Funcionalidades

### Paciente:
- **Registro de citas médicas**: Los pacientes pueden ver la disponibilidad de los especialistas y agendar una cita médica.
- **Cancelación de citas**: Los pacientes pueden cancelar citas previamente programadas.
  
### Administrador:
- **Gestión de especialistas**: Los administradores pueden registrar y gestionar a los especialistas médicos.
- **Gestión de horarios**: Los administradores pueden asignar horarios disponibles a los especialistas.

### Especialidades:
- Los pacientes pueden elegir entre diferentes especialidades médicas para agendar citas, como medicina general, ginecología, cardiología, etc.

## Tecnologías utilizadas

- **Frontend**: React.js
  - Uso de hooks (`useState`, `useEffect`) para el manejo de estados y efectos secundarios.
  - React Router para navegación entre vistas (páginas de citas, administración, etc.).
  - Fetch API para interactuar con el backend.
  
- **Backend**: Node.js, Express.js
  - Rutas y controladores para manejar las operaciones crear, leer, eliminar de citas.
  - MongoDB como base de datos para almacenar la información de los pacientes, citas, y especialistas.
  
- **Base de Datos**: MongoDB
  - Se utilizan tres colecciones principales: `Usuarios`, `Horarios`, `Citas`, y `Especialidades`.
  - Relaciones entre las colecciones: `Citas` contiene referencias a `Usuarios` (pacientes) y `Especialidades` (especialistas).

## Estructura de la base de datos

### 1. **Usuarios**:
```json
{
  "idUsuario": "Número de identificación único",
  "nombre": "Nombre del paciente",
  "correo": "Correo electrónico del paciente",
  "password": "Contraseña cifrada",
  "rol": "Paciente o Administrador"
}
```
### 2. **Especialidades**:
```json
{
  "nombre": "Nombre de la especialidad (ej. Ginecología)",
  "doctor": "Nombre del doctor",
  "fechaIngreso": "Fecha de ingreso del doctor"
}
```
### 3. **Citas**:
```json
{
  "_id": "ID único de la cita",
  "pacienteId": "Referencia al paciente que agendó la cita",
  "doctorId": "Referencia al especialista médico",
  "especialidad": "Especialidad de la cita",
  "fecha": "Fecha de la cita",
  "hora": "Hora de la cita",
  "motivo": "Motivo de la cita"
}

```
## Instalación y configuración (Backend)
### 1.Backend (Node.js, Express.js, MongoDB)
```
git clone https://github.com/usuario/citasusalud.git
```
### 2. Navega a la carpeta del backend:
```
cd citasusalud/backend
```
### 3. Instala las dependencias:
```
npm install
```
### 4. Inicia el servidor:
```
npm start
```
## Instalación y configuración(Frontend)

### 1. Navega a la carpeta del frontend:
```
cd citasusalud/frontend
```
### 2. Instala las dependencias:
```
npm install
```
### 3. Inicia el servidor:
```
npm start
```

## Configuración de MongoDB
- MongoDB URI: Asegúrate de tener MongoDB instalado y en ejecución, o usa MongoDB Atlas para la configuración remota.
- Si usas MongoDB Atlas, asegúrate de cambiar la URL para su funcionamiento.
