/**
 * Test de integración para el endpoint de salud.
 * Verifica que el servidor responda correctamente al endpoint /health.
 * Para ejecutar: npm test
 * Para añadir más tests: crea nuevos archivos .test.ts en esta carpeta
 */

import supertest from 'supertest';
import appInstance from '../src/app';

describe('Health Endpoint', () => {
  it('should return 200 and text OK', async () => {
    const response = await supertest(appInstance).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });
});