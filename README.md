# 👥 UserHub

Aplicación Angular 17 (modo no-standalone) que permite listar y filtrar usuarios obtenidos desde una API pública utilizando interceptores HTTP y pipes personalizados.

![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS-Enabled-pink?logo=sass)

## 📋 Descripción del Proyecto

UserHub es una aplicación web desarrollada con Angular 17 que consume la API de [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para mostrar información de usuarios en tarjetas (cards) con un diseño limpio y moderno. La aplicación implementa interceptores HTTP personalizados para el manejo de peticiones y pipes personalizados para el formateo y filtrado de datos en tiempo real.

## ✨ Características Principales

- ✅ **Listado de usuarios** desde API pública (JSONPlaceholder)
- ✅ **Interceptor HTTP personalizado** para todas las peticiones
- ✅ **Pipes personalizados** para formateo y filtrado de datos
- ✅ **Diseño responsive** con cards modernas
- ✅ **Filtrado en tiempo real** por ciudad
- ✅ **Manejo global de errores HTTP**
- ✅ **Logging de peticiones** en consola

## 🛠️ Tecnologías Utilizadas

- **Angular 17** (modo no-standalone)
- **TypeScript 5.0+**
- **RxJS** para programación reactiva
- **SCSS** para estilos avanzados
- **HttpClient** para consumo de API
- **FormsModule** para two-way data binding

## 📦 Instalación y Configuración

### Prerrequisitos

```bash
Node.js >= 18.x
npm >= 9.x
Angular CLI >= 17.x
```

### Pasos de instalación

```bash
# 1. Clonar el repositorio
Para SSH - git clone git@github.com:santigg23/api_jsonplaceholder_basic.git
Para HTTPS - https://github.com/santigg23/api_jsonplaceholder_basic.git

# 2. Navegar al directorio del proyecto
cd userhub

# 3. Instalar dependencias
npm install

# 4. Ejecutar la aplicación en modo desarrollo
ng serve

# 5. Abrir en el navegador
http://localhost:4200
```

### Comandos útiles

```bash
# Compilar para producción
ng build --configuration production

# Ejecutar tests unitarios
ng test

# Ejecutar linter
ng lint
```

## 🏗️ Estructura del Proyecto

```
userhub/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── user-list/
│   │   │       ├── user-list.component.ts
│   │   │       ├── user-list.component.html
│   │   │       └── user-list.component.scss
│   │   │
│   │   ├── interceptors/
│   │   │   └── http-interceptor.service.ts
│   │   │
│   │   ├── pipes/
│   │   │   ├── capitalize-name.pipe.ts
│   │   │   └── filter-by-city.pipe.ts
│   │   │
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   │
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   │
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Funcionalidades Implementadas

### 1. 🔌 Interceptor HTTP

**Archivo:** `src/app/interceptors/http-interceptor.service.ts`

El interceptor personalizado intercepta todas las peticiones HTTP de la aplicación y realiza las siguientes acciones:

#### Funcionalidades:
- **Header personalizado**: Agrega automáticamente el header `X-App-Name: UserHub` a todas las peticiones
- **Logging pre-petición**: Muestra en consola "⏳ Enviando solicitud HTTP..." antes de cada petición
- **Logging post-respuesta**: Muestra en consola "✅ Respuesta recibida" cuando llega la respuesta exitosa
- **Manejo global de errores HTTP**:
  - **Error 404**: Muestra "❌ Error 404: Recurso no encontrado"
  - **Error 500**: Muestra "❌ Error 500: Error interno del servidor"
  - **Otros errores**: Muestra mensaje personalizado con código y descripción

#### ¿Cómo funciona?

```typescript
// Se registra en app.module.ts como proveedor
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }
]
```

El interceptor utiliza operadores de RxJS:
- **tap()**: Para ejecutar efectos secundarios (logging) sin modificar el flujo
- **catchError()**: Para capturar y manejar errores HTTP de forma centralizada

#### Ejemplo de uso:
Cada vez que se realiza una petición HTTP en la aplicación, el interceptor actúa automáticamente. Puedes verificarlo abriendo la consola del navegador (F12) y observando los mensajes.

---

### 2. 🔧 Pipes Personalizados

#### a) **capitalizeName Pipe**

**Archivo:** `src/app/pipes/capitalize-name.pipe.ts`

Transforma nombres completos poniendo en mayúscula la primera letra de cada palabra y el resto en minúsculas.

**Ejemplos de transformación:**
```
Entrada: "juan pérez"           → Salida: "Juan Pérez"
Entrada: "MARIA GARCIA LOPEZ"   → Salida: "Maria Garcia Lopez"
Entrada: "ana de la torre"      → Salida: "Ana De La Torre"
```

**Uso en el template:**
```html
<h2>{{ user.name | capitalizeName }}</h2>
```

**Características:**
- Convierte todo el texto a minúsculas primero
- Capitaliza la primera letra de cada palabra
- Maneja correctamente espacios múltiples
- Retorna string vacío si no hay valor

---

#### b) **filterByCity Pipe**

**Archivo:** `src/app/pipes/filter-by-city.pipe.ts`

Filtra un array de usuarios por ciudad basándose en un término de búsqueda ingresado por el usuario.

**Características:**
- ✅ Búsqueda **case-insensitive** (no distingue mayúsculas/minúsculas)
- ✅ Búsqueda **parcial** usando `includes()` 
- ✅ Retorna el array completo si no hay filtro aplicado
- ✅ Filtrado en tiempo real mientras el usuario escribe

**Uso en el template:**
```html
<div *ngFor="let user of users | filterByCity:cityFilter">
  <!-- contenido de la card -->
</div>
```

**Ejemplo de funcionamiento:**
```
Búsqueda: "new"
Resultado: Usuarios de "New York", "Newport", "Newcastle"

Búsqueda: "gwenborough"
Resultado: Solo usuarios de "Gwenborough"
```

---

### 3. 🎨 Diseño de la Interfaz

La aplicación utiliza un diseño moderno y responsive implementado con SCSS.

#### Características del diseño:
- **Cards elegantes** con gradiente púrpura/azul en el header
- **Efecto hover** con elevación y sombra dinámica
- **Iconos emoji** para mejor experiencia visual
- **Layout responsive** con CSS Grid
- **Transiciones suaves** en todos los elementos interactivos
- **Campo de búsqueda** con feedback visual al hacer focus

#### Variables SCSS utilizadas:
```scss
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$border-radius: 12px;
```

---

## 📊 API Utilizada

**Endpoint:** `https://jsonplaceholder.typicode.com/users`

**Método:** GET

### Datos obtenidos por cada usuario:
- ✅ Nombre completo (`name`)
- ✅ Nombre de usuario (`username`)
- ✅ Email (`email`)
- ✅ Teléfono (`phone`)
- ✅ Ciudad (`address.city`)
- ✅ Nombre de empresa (`company.name`)
- ✅ Sitio web (`website`)

### Ejemplo de respuesta:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "city": "Gwenborough"
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona"
  }
}
```

---

## 🔍 Guía de Uso

### Paso 1: Cargar la aplicación
Al abrir la aplicación en `http://localhost:4200`, automáticamente se cargarán todos los usuarios desde la API.

### Paso 2: Observar los logs del interceptor
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Observa los mensajes:
   - ⏳ Enviando solicitud HTTP...
   - ✅ Respuesta recibida

### Paso 3: Filtrar usuarios por ciudad
1. Localiza el campo de búsqueda en la parte superior
2. Escribe el nombre de una ciudad (ej: "Gwenborough", "Wisoky", "McKenzie")
3. Observa cómo la lista se filtra automáticamente en tiempo real

### Paso 4: Verificar la capitalización de nombres
Todos los nombres de usuario se muestran con el formato correcto gracias al pipe `capitalizeName`:
- "LEANNE GRAHAM" → "Leanne Graham"
- "ervin howell" → "Ervin Howell"

---

## 📸 Capturas de Pantalla

### Vista Principal
Listado completo de usuarios en formato de cards con información detallada.

![Vista Principal](screenshots/main-view.png)

### Consola del Navegador
Mensajes del interceptor HTTP mostrando el ciclo de vida de las peticiones.

![Logs del Interceptor](screenshots/console-logs.png)

### Filtrado por Ciudad
Campo de búsqueda funcionando en tiempo real.

![Filtrado por Ciudad](screenshots/city-filter.png)

---

## 🧪 Pruebas y Verificación

### Verificar el Interceptor HTTP

1. Abre DevTools (F12)
2. Ve a la pestaña **Console**
3. Recarga la página
4. Verifica que aparezcan los mensajes:
   - ⏳ Enviando solicitud HTTP...
   - ✅ Respuesta recibida

### Verificar el pipe capitalizeName

1. Observa los nombres en las cards
2. Todos deben tener formato "Nombre Apellido" (primera letra mayúscula)
3. Ejemplo: "Leanne Graham", "Ervin Howell"

### Verificar el pipe filterByCity

1. Escribe "Gwenborough" en el campo de búsqueda
2. Deberías ver solo 1 usuario
3. Escribe "South" 
4. Deberías ver usuarios de ciudades que contienen "South"
5. Borra el texto
6. Deberías ver todos los usuarios nuevamente

### Verificar el manejo de errores

Para probar el manejo de errores del interceptor:

1. Abre `user.service.ts`
2. Cambia temporalmente la URL a: `https://jsonplaceholder.typicode.com/usersXXX`
3. Recarga la aplicación
4. En la consola deberías ver: "❌ Error 404: Recurso no encontrado"

---

## 💡 Conceptos Técnicos Aplicados

### Interceptores HTTP
- **Middleware pattern** para peticiones/respuestas HTTP
- **RxJS operators** (tap, catchError)
- **Configuración global** mediante providers en módulos

### Pipes
- **Pure pipes** para transformación de datos
- **Optimización automática** con Angular change detection
- **Reutilización** en múltiples componentes

### Programación Reactiva
- **Observables** para manejo asíncrono de datos
- **Subscribe pattern** para consumo de streams
- **Error handling** con RxJS

### Two-Way Data Binding
- **ngModel** para sincronización bidireccional
- **FormsModule** para formularios template-driven

### Directivas Estructurales
- **\*ngFor** para iteración de listas
- **\*ngIf** para renderizado condicional

---

## 📚 Recursos de Aprendizaje

- [Documentación oficial de Angular](https://angular.io/docs)
- [Guía de Interceptores HTTP](https://angular.io/guide/http-intercept-requests-responses)
- [Guía de Pipes](https://angular.io/guide/pipes)
- [RxJS Documentation](https://rxjs.dev/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

---

## 🚀 Mejoras Futuras

- [ ] Agregar paginación para mejorar performance
- [ ] Implementar búsqueda por múltiples campos (nombre, email, empresa)
- [ ] Agregar animaciones con Angular Animations
- [ ] Implementar lazy loading de módulos
- [ ] Agregar modo oscuro (dark mode)
- [ ] Implementar tests unitarios y e2e
- [ ] Agregar notificaciones toast para errores
- [ ] Implementar caché de peticiones HTTP

---

## 👨‍💻 Autor

**[Tu Nombre]**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com

---

## 📄 Licencia

Este proyecto fue creado con fines educativos como parte de un ejercicio de aprendizaje de Angular.

---

## 🙏 Agradecimientos

- API pública proporcionada por [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- Comunidad de Angular por la excelente documentación
- Iconos emoji para mejorar la experiencia visual

---

## 📞 Soporte

Si tienes alguna pregunta o problema:

1. Revisa la sección de [Issues](https://github.com/tu-usuario/userhub/issues)
2. Crea un nuevo issue si no encuentras solución
3. Consulta la documentación oficial de Angular

---

**⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub!**
