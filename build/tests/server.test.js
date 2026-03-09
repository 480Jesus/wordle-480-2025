"use strict";
/**
 * Test de integración para el endpoint principal.
 * Verifica que el servidor responda correctamente al endpoint /.
 * Para ejecutar: npm test
 * Para añadir más tests: crea nuevos archivos .test.ts en esta carpeta
 */
const supertest = require('supertest');
const appInstance = require('../src/app');
describe('Server Root Endpoint', () => {
    it('should return 200 for root path', async () => {
        const response = await supertest(appInstance).get('/');
        expect(response.status).toBe(200);
        // Como sirve un archivo HTML, verificamos que el content-type sea text/html
        expect(response.headers['content-type']).toContain('text/html');
    });
});
