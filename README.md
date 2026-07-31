# Portfolio de Ingeniería de Software: Aplicaciones Interactivas en TypeScript

**[Ver demostración (GitHub Pages)](https://adrianperezpoleo.github.io/adrian-perez-interactive-applications/)**

Este repositorio contiene una colección de aplicaciones web interactivas, visualizadores matemáticos y juegos desarrollados en **TypeScript puro (Vanilla TypeScript)**.

El enfoque de este proyecto es la aplicación de los **principios de Programación Orientada a Objetos (POO)**, los **patrones de diseño SOLID** y la arquitectura **Modelo-Vista-Controlador (MVC)**. Como no se usan frameworks pesados para la lógica, demuestran una buena comprensión del diseño de software, la programación orientada a eventos y la manipulación del DOM y el Canvas.

---

## Arquitectura y Tecnologías

Todas las aplicaciones en este repositorio comparten la misma estructura:

* **Lenguaje:** TypeScript.
* **Arquitectura:** Patrón MVC y Arquitectura Orientada a Eventos (Patrón Observer).
* **Herramienta de Construcción:** Vite.
* **Estilos:** Framework CSS Bulma.
* **Renderizado:** API de HTML5 Canvas y manipulación del DOM.
* **Documentación:** TypeDoc.

---

## Proyectos Incluidos

El portfolio está dividido en dos categorías: Juegos Interactivos y Visualizadores Matemáticos.

### Juegos Interactivos

Implementaciones de juegos clásicos.

* **Juego del Ahorcado (Hangman):** Clásico juego de adivinar palabras que incluye dibujo dinámico en el canvas. 
* **8-Puzzle:** Un rompecabezas deslizante que implementa conceptos de búsqueda en el espacio de estados. Se centra en la manipulación de matrices, validación del estado y actualizaciones dinámicas del DOM.
* **MiniBalatro:** Una implementación ligera de mecánicas basadas en el póker, centrada en la validación de reglas y algoritmos de puntuación.

### Visualizadores Matemáticos

Aplicaciones diseñadas para renderizar conceptos matemáticos y simulaciones físicas de forma dinámica utilizando la API del Canvas.

* **Calculadora de la Regla Trapezoidal:** Una herramienta interactiva para aproximar la integral definida de funciones matemáticas. Analiza funciones definidas por el usuario y dibuja las aproximaciones de área correspondientes en tiempo real.
* **Animación de Proyectil:** Un simulador de cinemática basado en física que calcula y renderiza trayectorias en 2D basadas en la velocidad inicial, ángulo y altura.
* **Curvas de Lissajous:** Visualización de movimientos armónicos, mostrando en una gráfica el sistema de ecuaciones paramétricas que describen el movimiento complejo de un péndulo.

---

## Guía de Inicio

Para explorar el código y ejecutar el portfolio localmente, siga estos pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/AdrianPerezPoleo/adrian-perez-interactive-applications.git
cd adrian-perez-interactive-applications
```

### 2. Instalar dependencias

Este proyecto utiliza un único `package.json` para gestionar todas las dependencias globalmente.

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

Inicie el servidor de Vite para explorar las aplicaciones de forma interactiva:

```bash
npm run dev
```

Navegue a la URL `localhost` proporcionada en su navegador para ver el menú principal.

### 4. Construir y generar la documentación

Para compilar el código TypeScript y generar la documentación de la API con TypeDoc en la carpeta `dist/docs/`:

```bash
npm run build:all
```

---

## Autor

**Adrián Pérez Poleo**

* Estudiante de Ingeniería Informática en la [Universidad de La Laguna (ULL)](https://www.ull.es/)
* Contacto: alu0101635224@ull.edu.es
* [Perfil de LinkedIn](https://www.linkedin.com/in/adrián-pérez-poleo-2a7639378)

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](https://www.google.com/search?q=LICENSE).