# Galería de Imágenes con React

Una aplicación web para gestionar una galería de imágenes construida con React y Vite.

## Requisitos Previos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)

## Dependencias Principales

```bash
# Dependencias de producción
react            # Biblioteca principal de React
react-dom        # Renderizado de React para web
react-router-dom # Enrutamiento de la aplicación
express          # Framework de Node.js para crear el servidor API
multer           # Middleware para manejo de archivos multipart/form-data

# Dependencias de desarrollo
vite             # Herramienta de construcción y desarrollo
@vitejs/plugin-react # Plugin de Vite para React
```

## Configuración del Proyecto

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd galeria-react
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Inicia el servidor(se corre en el puerto 3001):
```bash
node server.js
```

## Estructura del Proyecto

```
galeria-react/
├── src/
│   ├── components/     # Componentes de React
│   ├── styles/        # Archivos CSS
│   ├── App.jsx        # Componente principal
│   └── main.jsx       # Punto de entrada
├── server.js/          # Endpoint y logica 
└── index.html        # HTML principal
```

## Características

- Carga y visualización de imágenes
- Formulario para agregar nuevas imágenes
- Diseño responsive
- Animaciones suaves
- Vista previa de imágenes
- Gestión de errores
