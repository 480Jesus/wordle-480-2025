
/**
 * Puerto de navegación utilizado por la lógica del juego para indicar transiciones
 * de las diferentes pantallas del juego, win and death screens.
 * 
 * Forma parte de la arquitectura hexagonal: desacopla la lógica del juego de otras partes de la aplicación
 */
export interface NavigationPort {
    /**
     * Navega hacia la pantalla de victoria del juego.
     * llama cuando el jugador adivina la palabra correcta.
     * 
     * @returns {void} No devuelve ningún valor.
     */
    goToWin(): void;

    
    /**
     * Navevega hacia la pantalla de derrota del juego.
     * llamada cuando el jugador agota sus intentos sin adivinar la palabra correcta.
     * 
     * @returns {void} No devuelve ningún valor.
     */
    goToLose(): void;
}