// Test setup for Jest
const mongoose = require('mongoose');

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/architectai-test';

// Global test setup
beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_URI);
});

// Global test teardown
afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

// Clean up after each test
afterEach(async () => {
  // Clear all collections
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});
