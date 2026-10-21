# 📱 Aventuras en Villa Cielo - Prototipo Navegable Móvil

Prototipo interactivo y navegable de alta fidelidad que simula una aplicación móvil para la propuesta **Aventuras en Villa Cielo (Proyecto Cielo / Eco-Combat Córdoba)**. El proyecto combina el diseño gráfico de **Alta Fidelidad de Figma** con la preservación de diagramas e ilustraciones de **Excalidraw**.

---

## 🚀 Cómo Ejecutar el Prototipo Localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/kevin-farias/proyecto-cielo.git
   cd proyecto-cielo
   ```

2. Inicia el servidor local de Node.js:
   ```bash
   node server.js
   ```

3. Abre en tu navegador preferido:
   👉 **http://localhost:3000**

### Jugar por Wi‑Fi en dos computadoras

1. Conecta ambas computadoras a la misma red Wi‑Fi.
2. Inicia `node server.js` en una de ellas. La consola muestra su dirección de red, por ejemplo `http://192.168.1.25:3000`.
3. En ambas computadoras abre esa dirección. El creador de la sala comparte el código de 5 caracteres y el otro jugador lo ingresa.
4. Cada jugador elige tres criaturas y juega sus turnos desde su propia computadora.

La computadora que ejecuta el servidor debe permanecer encendida durante la partida. Si Windows pregunta si Node.js puede aceptar conexiones en la red privada, permite el acceso para que la otra computadora pueda conectarse.

---

## 🌟 Características Destacadas

* **📱 Simulador de Celular Realista:** Chasis móvil con barra de estado viva, reloj sincronizado en tiempo real, muesca cámara y botón de inicio.
* **🔄 Rotación Automática a Modo Horizontal (Landscape):** Al ingresar al combate, la pantalla se transforma automáticamente a orientación apaisada para una experiencia de consola de juego horizontal con margen seguro (*Safe Area Inset*).
* **🎴 Selección de Criaturas antes del Combate:** Permite elegir qué especie de tu colección desplegar en la batalla (*Picaflor Cometa*, *Yaguareté*, *Pecarí de Collar*, *Horco Quebracho*, *Búho Serrano*, *Zorro Gris*).
* **🌿 Sincronización en Tiempo Real con Flora y Fauna:** Cada criatura capturada mediante el escáner QR de la reserva natural añade de forma inmediata su ficha técnica detallada a la sección de **Información de la Flora y Fauna**.
* **🔊 Sintetizador de Audio WebAudio API:** Efectos sonoros integrados para clics, escáner QR, curación, ataques y victorias sin dependencias externas.

---

## 🛠️ Estructura del Proyecto

* `index.html` - Estructura HTML5 modular del teléfono y pantallas de la aplicación.
* `styles.css` - Estilos visuales Figma en tonalidad verde esmeralda, animaciones y responsive landscape.
* `script.js` - Enrutador de pantallas, motor de combate por turnos y simulación de escáner QR.
* `server.js` - Servidor HTTP liviano en Node.js.
* `assets/` - Galería de imágenes e ilustraciones Excalidraw / Figma.

### Guardado de cuentas y administración

La partida activa empieza desde cero en cada apertura o recarga; el progreso de colección y el perfil se guardan por cuenta en `.project-data/progress.json`. El campo **Cuenta de progreso** del perfil identifica cada guardado; usa un nombre distinto para cada cuenta. La red trófica también guarda por cuenta qué especies se están simulando como ausentes.

En **Ajustes → Administración y respaldos** se puede crear y restaurar una copia de todas las cuentas. Para este prototipo local, el PIN predeterminado es `1234`; puedes definir `ADMIN_PIN` antes de iniciar `node server.js` para cambiarlo. No es un sistema de autenticación apropiado para publicar en internet.

### Publicación gratuita para compartir

`render.yaml` prepara un servicio web gratuito de Node en Render. Para publicarlo sin configurar GitHub Pages, inicia sesión en [Render](https://dashboard.render.com/), ve a **New → Blueprint**, conecta este repositorio y elige la rama `main`. Render publicará una URL HTTPS para compartir. El servicio gratuito se suspende tras 15 minutos sin visitas y puede tardar cerca de un minuto en volver a arrancar.

El progreso por cuenta, la red trófica y los respaldos de administrador se guardan localmente en cada navegador y dispositivo; no se sincronizan entre teléfonos. Los respaldos locales usan el PIN `1234`. El duelo por Wi‑Fi funciona mientras el servicio está activo, pero las salas terminan si Render lo reinicia o suspende.

También se conserva `.github/workflows/pages.yml` para GitHub Pages. Esa opción necesita que una persona con permisos de administración active Pages en la configuración del repositorio.

---

## 📜 Licencia y Proyecto
Desarrollado para la presentación del prototipo de la propuesta **Aventuras en Villa Cielo / Proyecto Cielo**.
