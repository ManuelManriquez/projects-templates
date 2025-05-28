import { mkdirSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

// Directory used for test file uploads
const TEST_UPLOADS_DIR = join(import.meta.dir, '..', 'test-uploads');

/**
 * Global setup to be executed before running any tests
 */
export function globalSetup() {
  // Create the test uploads directory if it doesn't exist
  if (!existsSync(TEST_UPLOADS_DIR)) {
    mkdirSync(TEST_UPLOADS_DIR, { recursive: true });
  }

  console.log('🧪 Test setup complete');
}

/**
 * Global teardown to be executed after all tests have finished
 */
export function globalTeardown() {
  // Clean up the test uploads directory
  if (existsSync(TEST_UPLOADS_DIR)) {
    rmSync(TEST_UPLOADS_DIR, { recursive: true, force: true });
  }

  console.log('🧹 Test cleanup complete');
}

/**
 * Useful constants for tests
 */
export const TEST_CONFIG = {
  uploadsDir: TEST_UPLOADS_DIR,
  baseUrl: 'http://localhost',
  testTimeout: 5000,
};

/**
 * Helper function to add delay in async tests
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Helper object containing sample test data
 */
export const testData = {
  validUser: {
    name: 'Test User',
    email: 'test@example.com',
    age: 25
  },

  invalidUser: {
    name: '',
    email: 'invalid-email',
    age: -1
  },

  sampleText: 'Sample text for testing',

  sampleJson: {
    message: 'Hello from tests',
    timestamp: new Date().toISOString(),
    data: [1, 2, 3, 4, 5]
  }
};

// Automatically run setup on import
globalSetup();
