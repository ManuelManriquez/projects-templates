# Todas las pruebas
bun test

# Solo pruebas unitarias
bun run test:unit

# Solo pruebas de integración
bun run test:integration

# En modo watch (se ejecutan automáticamente al cambiar archivos)
bun run test:watch

# Prueba específica
bun run tests/unit/routes.test.ts