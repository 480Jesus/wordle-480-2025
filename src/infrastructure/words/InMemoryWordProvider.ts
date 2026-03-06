import { RandomWordPort } from "../../application/ports/RandomWordPort";


/**
 * Proveedor de palabras en memoria para el juego Wordle.
 *
 * Implementa el puerto `RandomWordPort` y obtiene palabras aleatorias
 * desde una lista proporcionada en el constructor.  
 * 
 * Esta implementación forma parte de la capa de infraestructura
 * dentro de la arquitectura hexagonal y resulta útil para:
 *  - pruebas,
 *  - entornos locales,
 *  - prototipos,
 *  - o versiones del juego sin backend.
 */
export class InMemoryWordProvider implements RandomWordPort{

    
    /**
     * Crea una instancia del proveedor de palabras en memoria.
     *
     * @param {string[]} words - Lista de palabras disponibles para seleccionar aleatoriamente.
     */

    constructor (private readonly words: string[]) {}

    /**
     * Retorna una palabra aleatoria de la lista interna.
     *
     * Si la lista está vacía, lanza un error para indicar que no hay palabras disponibles.
     *
     * @returns {string} Una palabra seleccionada aleatoriamente.
     * @throws {Error} Si no existen palabras cargadas en el proveedor.
     */
    
    getRandomWord(): string {
        if (this.words.length === 0){
            throw new Error("No words available")
        }
        const index = Math.floor(Math.random() * this.words.length);
        return this.words[index]
    }
}