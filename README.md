# BTG-Back-Challenge

## Descripción
Challenge diseñado para validar conocimientos técnicos en react y AWS, por ello para el front-end se diseña una API que permite:
- Realizar suscripciones (FIC y FPV).
- Cancelar suscripciones (FIC y FPV).
- Historial de transacciones
- Mostrar notificaciones sobre cada acción realizada

## Tecnologías Utilizadas
- **Lenguaje de Programación:** Javascript
- **Frameworks y Librerías:**
  - **React:** Biblioteca para construir interfaces de usuario.
  - **Axios:** Cliente HTTP para realizar solicitudes a APIs.
  - **ESLint:** Herramienta para identificar y reportar patrones encontrados en el código ECMAScript/JavaScript.
  - **React Bootstrap:** Componentes de Bootstrap construidos con React.
  - **Bootstrap:** Biblioteca de CSS para diseño responsivo.
- **Servicios en la Nube:**
  - **AWS S3:** Almacenamiento de objetos en la nube, utilizado para almacenar y servir archivos estáticos.
  - **AWS CloudFormation:** Herramienta para gestionar y aprovisionar recursos en la nube mediante plantillas en formato JSON o YAML.

## Instalación
Para instalar y configurar el entorno de desarrollo, sigue los siguientes pasos:

## Instalación
1. **Clona el repositorio:**
  ```bash
    git clone https://github.com/gioakol/BTG-Front-challenge.git
  ```

3. **Navega al directorio del proyecto**
  ```bash
  cd BTG-Front-challenge
  ```

3. **Instala las dependencias**
  ```bash
  npm install
  ```

3. **Instala los componentes adicionales**
  ```bash
  npm install react-bootstrap bootstrap
  npm install react-bootstrap bootstrap axios
  ```

4. **Ejecución**
  ```bash
  npm run dev
  ```

5. **Publicación**
  ```bash
  npm run build
  ```

## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

  ```bash
    BTG-Front-challenge/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    ├── package.json
    ├── .env
    ├── .gitignore
    ├── vite-config.js
    ├── package.json
    ├── .eslintrc.cjs
    └── README.md
  ```

## Infraestructura Cloud
![image](https://github.com/user-attachments/assets/e0c95ca1-0d4b-4508-a736-4a373e097311)

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
