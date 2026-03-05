import { NavigationPort } from "../../application/ports/NavigationPort";


/**
 * Adaptador de navegación basado en el navegador.
 *
 * Implementa el puerto `NavigationPort` para realizar transiciones
 * simples entre pantallas utilizando `location.assign()`.
 *
 * Este adaptador pertenece a la capa de infraestructura dentro
 * de la arquitectura hexagonal y permite que la lógica del juego
 * invoque pantallas de victoria o derrota sin conocer detalles del DOM
 * ni del navegador.
 */
export class BrowserNavigationAdapter implements NavigationPort {
    
    
    /**
     * Navega hacia la pantalla de victoria del juego.
     *
     * Redirige al usuario a la ruta `/winner` usando `location.assign()`.
     *
     * @returns {void}
     */
    goToWin(): void {
        location.assign("/winner");
    }

    
    /**
     * Navega hacia la pantalla de derrota del juego.
     *
     * Redirige al usuario a la ruta `/loser` usando `location.assign()`.
     *
     * @returns {void}
     */
    goToLose(): void {
        location.assign("/loser");
    }
}