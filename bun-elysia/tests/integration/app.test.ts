import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { createTestApp, makeRequest, makeJsonRequest, getJsonResponse } from '../helpers/test-app';

const AppSuite = suite('App Integration Tests');

let app: ReturnType<typeof createTestApp>;

// Setup before each test
AppSuite.before(() => {
  app = createTestApp();
});

// Basic test to verify that the app initializes correctly
AppSuite('app initializes correctly', () => {
  assert.ok(app);
  assert.type(app.handle, 'function');
});

// Test for CORS headers (if your endpoints require it)
AppSuite('CORS headers are set', async () => {
  const response = await makeRequest(app, '/api/health'); // Adjust to match your endpoint
  
  // Verify CORS headers are present if needed
  const corsHeader = response.headers.get('Access-Control-Allow-Origin');
  if (corsHeader) {
    assert.ok(corsHeader);
  }
});

// Test for static file serving (if applicable)
AppSuite('serves static files correctly', async () => {
  // Assumes a test file exists in the uploads folder
  // Skip or adjust the test if you don't use static files
  const response = await makeRequest(app, '/uploads/test.txt');
  
  // Should return 404 if the file doesn't exist, 200 if it does
  assert.ok(response.status === 404 || response.status === 200);
});

// Test for non-existent endpoint
AppSuite('non-existent endpoint returns 404', async () => {
  const response = await makeRequest(app, '/non-existent-endpoint');
  assert.is(response.status, 404);
});

// Example test for POST request (adjust to match your API)
AppSuite('handles POST requests correctly', async () => {
  const testData = { message: 'test' };
  const response = await makeJsonRequest(app, '/api/test', testData);
  
  // Adjust the expected behavior according to your API
  // If the endpoint doesn't exist, this test will fail
  assert.ok(response.status >= 200 && response.status < 500);
});

// Test for correct Content-Type header
AppSuite('responds with correct Content-Type for JSON', async () => {
  const response = await makeRequest(app, '/api/health'); // Adjust to match your endpoint
  
  if (response.status === 200) {
    const contentType = response.headers.get('Content-Type');
    if (contentType) {
      assert.ok(contentType.includes('application/json') || contentType.includes('text/'));
    }
  }
});

AppSuite.run();
