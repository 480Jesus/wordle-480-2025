/**
 * Puerto encargado de proporcionar palbras aleatorias.
 */

export interface RandomWordPort {

 /**
  * Obtiene una palabra aleatoria para iniciar una nueva partida.
  *
  * @returns {string} - Palabra aleatoria que se utilizará en el juego.
  */
 getRandomWord(): string;
}