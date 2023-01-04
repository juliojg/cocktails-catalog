# Catálogo de cocktails

## Dependencias
Para instalar las dependencias del proyecto se necesita `npm` instalado y correr el siguiente comando en el root del proyecto.

```
npm install
```

## Dev server
Para iniciar el servidor de desarrollo (previamente hay que instalar las dependencias), se debe ejecutar:

```
npm start
```

## Tests
Para correr los tests se debe ejecutar:

```
npm run test
```

## Linter

Se utilizó ESLint como herramienta de análisis de código estático, para efectuar una revisión se debe ejecutar:
``` npx eslint src/```

## Configuración
El proyecto esta construido con la herramienta `create-react-app`. La misma utiliza webpack pero esconde la mayor parte de la configuración al usuario para hacerlo trasparente al mismo.

# Estructura del proyecto
## Módulos
El proyecto está pensado para ser modular. Los módulos cargan nuevos componentes, los archivos i18n que les correspondan, y actualizan el estado de la aplicación.

En la carpeta `/src/` existen los siguientes directorios:

- components (componentes genéricos que se utilizan en toda la app, y se encargan de definir las vistas)
- containers (componentes que se conectan con el estado de la app y se encargan de gestionarlo, generalmente son wrappers de componentes básicos (components))
- context (manejo general del estado de la app)
- hooks (hooks personalizados de la aplicación)
- mocks (mocks / objetos de prueba para los tests de la aplicación)
- router (manejo de rutas de la app)
- styles (estilos globales de la aplicación y variables reutilizables, como colores)
- translations (manejo de las traducciones de la app)
- types (los tipos básicos que se utilizan en la app)
- utils (conjunto de funciones básicas auxiliares)

## Estilos
Para estilar el proyecto se utilizó css básico. Cada componente posee un archivo de css en su misma ruta si esta requiere ser estilada. La carpeta `/src/styles` posee un archivo ```colors.css``` que define las variables de colores que se utilizan en el proyecto.
## Componentes y containers
La principal diferencia entre estos dos tipos de componentes es que los containers se contectan con el estado de la aplicación y tienen la función específica de proveer de datos a aquellos componentes genéricos que lo requieran.

## Hooks
Se definieron dos hooks personalizados para gestionar las llamadas a la api provista, ambos generan las variables resultado de sus respectidas llamadas, junto a dos variables extra para conocer el estado de la llamada (cargado, o fallida):

- useGetList: Se encarga de hacer un llamado GET a la url principal para obtener el listado de entidades a mostrar y, una vez obtenida,  para cada una de ellas hacer otro pedido a la url que retorna los detalles de las entidades y generar/retornar una lista con los detalles de todas estas.
- useGetDetailById: Se encarga de hacer un llamado GET a la url que retorna los detalles de las entidades y retornar estos. Se utiliza principalmente para el caso de que el usuario acceda a la ruta de la entidad directamente sin pasar previamente por el listado general.

## Context / Store
El estado de la aplicación consiste del listado de entidades, y la página actual en la que se encuentra el usuario. Ambos datos son gestionados por un Context Provider básico de React.

## Tests
Se proveen tests unitarios para los componentes, estos se identifican con el sufijo ".tests.ts" / ".tests.tsx".

## Dependencias utilizadas
#### i18next
Esta libreria se utilizó para realizar las traduciones.