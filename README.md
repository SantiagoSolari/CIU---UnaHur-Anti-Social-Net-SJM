# 🧠 UnaHur Anti-Social Net (Frontend) 

![Image](./src/assets/ANTI-SOCIALNET.jpeg)
## 📌 Tabla de Contenidos

- [⚙️ Instalación y Configuración](#%EF%B8%8F-instalación-y-configuración)
- [✨ Características](#-características)
- [📁 Estructura del Proyecto](#estructura-del-proyecto)
- [🧑‍💻 Autores](#-autores)

## ⚙️ Instalación y Configuración

#### 1. 🔁 Clonar el repositorio:
 - Abrimos una terminal bash o cmd, y ejecutamos el siguiente comando para clonar el repositorio en la PC: 

``` 
git clone https://github.com/SantiagoSolari/CIU---UnaHur-Anti-Social-Net-SJM.git

```
- Nos movemos a la carpeta del proyecto:
```
cd CIU---UnaHur-Anti-Social-Net-SJM
```

#### 2. 📦 Instalamos dependencias:
- Ejecutamos el siguiente comando para instalar dependencias: 
```
npm install
```

#### 3. 🔧 Configuramos la semilla:
- Debemos clonar el backend de la siguiente API:
```
git clone https://github.com/SantiagoSolari/backendApi
```

- Debemos descargar las dependencias ejecutando el siguiente comando en la consola:
```
npm i
```

- Debemos Poblar la base de datos ejecutando el siguiente comando en la consola:
```
node seed.js
```
- Debemos inicializar el backend para poder utilizar la API junto al front ejecutando el siguiente comando en la consola:
```
npm run dev
```

#### 4. 🚀 Iniciamos el servidor:

- Ejecutamos nuestra aplicacion de React 
  ```
  npm run dev
  ```

## ✨ Características:

✅ Páginas:
  - **Home**: muestra un feed con publicaciones recientes junto a secciones como un banner de bienvenida y una sección "Sobre nosotros".
    
  - **Perfil**: accesible solo para usuarios autenticados, muestra el nombre de usuario, sus publicaciones con detalles básicos y un botón para cerrar sesión.
    
  - **Crear Post**: página donde el usuario puede crear un post con descripción obligatoria, URLs de imágenes opcionales y selección de etiquetas.
    
  - **Login**: permite que el usuario inicie sesión en la red social.
    
  - **Registro**: permite al usuario registrarse en la red social.

## Estructura del Proyecto

```text
CIU---Unahur-Anti-Social-Net-SJM/
│   .gitignore
|   eslint.config.js
|   index.html
|   package-lock.json         
│   package.json     # Archivo de configuracion
|   README.md
│   vite.config.js
├── public/
└── src/
    ├── App.css       
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    │ 
    ├── assets/ # imagenes globales
    ├── components/ # Componentes de nuestra aplicación
    ├── context/      # Definicion del contexto
    ├── pages/     # Páginas de nuestra aplicación
```


## 🧑‍💻 Autores

 - Solari Santiago Ivan     - Estudiante de la Universidad Nacional de Hurlingham
 - Tesar Molina Julieta  - Estudiante de la Universidad Nacional de Hurlingham
 - Alvarez Melina Milagros    - Estudiante de la Universidad Nacional de Hurlingham
