import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
/**
 * Servidor Express utilizado para alojar la aplicación Wordle.
 *
 * Este módulo actúa como servidor HTTP estático y responsable de servir:
 *  - la aplicación principal (`index.html`)
 *  - la pantalla de victoria (`winner.html`)
 *  - la pantalla de derrota (`loser.html`)
 *
 * También expone la carpeta `public/` y la carpeta base del proyecto como
 * recursos estáticos, permitiendo así servir scripts, estilos, imágenes
 * y otros archivos necesarios en el navegador.
 *
 * En un proyecto con arquitectura hexagonal, este archivo representa
 * la infraestructura externa encargada de exponer la aplicación al usuario final.
 */
const app = express();
/** Ruta absoluta del archivo actual. */
const __filename = fileURLToPath(import.meta.url);
/** Directorio actual del archivo. */
const __dirname = path.dirname(__filename);
/**
 * Servimos contenido estático desde:
 *  - el directorio raíz donde se encuentra este archivo
 *  - la carpeta pública donde residen los archivos del frontend
 */
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..", "public")));
/**
 * Ruta principal del juego Wordle.
 *
 * Envía la página principal donde se monta el juego en el navegador.
 */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
/**
 * Ruta mostrada cuando el jugador gana la partida.
 *
 * La navegación hacia esta ruta se realiza desde el adaptador
 * `BrowserNavigationAdapter`.
 */
app.get("/winner", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'winner.html'));
});
/**
 * Ruta mostrada cuando el jugador pierde la partida.
 *
 * La navegación hacia esta ruta también se ejecuta mediante el adaptador
 * `BrowserNavigationAdapter`.
 */
app.get("/loser", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'loser.html'));
});
/**
 * Inicializa el servidor en el puerto 3000.
 *
 * Al ejecutarse, la consola muestra un mensaje indicando
 * que el juego está disponible a través de HTTP.
 */
app.listen(3000, () => { console.log("Wordle is listening at port 3000..."); });
