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
- store (manejo general del estado de la app)
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
En una primera propuesta se optó por manejar el estado a través de Contexts, para lo cual se utilizaban dos hooks personalizados. Esto cambió en esta nueva versión y quedó la carpeta para hooks auxiliares para testeo futuro.

## Redux / Store
El estado de la aplicación es gestionado por redux, haciendo uso de reselect para la derivación de valores significativos de este a través de selectores, consiste de un objeto con los siguientes campos:

```
interface CatalogState {
  pagination: {
    currentPage: number | null;
    drinksPerPage: number;
    maxShowablePages: number;
  };
  ui: {
    show: boolean
  },
  cocktails: {
    byId: {
      [id: string]: CocktailDetail | null;
    };
    allIds: string[];
    // Status for cocktails fetched/retrieved to show in current page 
    statusList: Status;
    errorList: Error;
    
    statusDetails: Status;
    errorDetails: Error;
  };
  currentCocktailDetail: {
    detail: CocktailDetail | null;
    status: Status;
    error: Error;
  };
}
```
En cocktails.byId se aprovecha la generación de objetos indexables para almacenar los detalles de cada cocktail, y en allIds los ids de los cocktails visualizables.

De esta forma, con byId se aprovechan los beneficios de poder recuperar un cocktail en O(1) si este fue previamente recuperado (y validar en caso contrario que hay que pedirlo a la api) y con allIds tener un sentido de orden y seguridad de que ids son válidas.

Generar un listado de todos los cocktails con toda su información equivale a: 

```cocktails.allIds.map(id => cocktails.byId[id])```


## Paginado
La aplicación provee un paginado básico, recuerda el número de página de un usuario si este accede al detalle de una entidad y vuelve al listado, e infiere el número de página correspondiente si se accede directamente a este detalle por medio de la url. Una vez obtenida toda la lista de entidades a través de la api, solo se busca el detalles de aquellas que sean requeridas por la página actual, evitando que la búsqueda sera costosa en una primera instancia (de esta forma se hacen igual cantidad de llamados a la api que entidades mostradas en la página actual, y no de las n existentes en el listado).

## Routing
La aplicación genera las siguientes rutas accesibles directamente:
- `/` (home del proyecto, que deja acceder al listado.)
- `/drinks` (listado de entidades, footer de paginación)
- `/drinks/:id` (detalle de entidad por id)

Cada componente posee links para navegar entre las rutas de manera que el estado de la aplicación no sea actualizado si no es necesario (entrar al detalle de una entidad y volver al listado no genera que se vuelva a requerir obtener el listado).

Cada ruta es accesible de manera directa por el navegador.

Rutas no admitidas redirigen a pantallas/vistas de error apropiadas (404,entidad no encontrada, y error al recuperar el listado.)

## Tests
Se proveen tests unitarios para los componentes, estos se identifican con el sufijo ".tests.ts" / ".tests.tsx".

## Dependencias utilizadas
### i18next

Esta libreria se utilizó para realizar las traduciones.
### i18next-browser-languagedetector

Librería para identificar el lenguaje del navegador.
### reduxjs/toolkit

Librería que provee muchas otras para utilizar Redux como herramienta de gestión de estado.
### testing-library

Librería para testeo.

## Mejoras posibles:

- Accesibilidad: la aplicación contempla poder usarse sin mouse, y que la descripción de cada imagen de los cocktails/entidades sea mínimamente descriptiva para lectores de pantalla. Esto podría ampliarse.
- Responsive: solo se validó que la aplicación se vea de manera correcta en un celular con pantalla estándar mínima, y el footer de paginado se colapse para dejar solo las flechas de navegación. Esto podría ampliarse.
- Buscador: funcionalidad para buscar entidades, se propone agregar un header, un buscador, y gestionarlo de manera apropiada (debounce de inputs, autocompletado, etc.)
- Paginado inteligente: Preveer/cachear páginas extra para que el usuario pueda navegar sin ver un spinner en cada salto.
- Soporte a más idiomas.
- Cacheo de imágenes en el navegador.
