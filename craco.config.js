const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "src": path.resolve(__dirname, "src"),
      "@OperationContext$": path.resolve(__dirname, "src/components/OperationContext"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utilities": path.resolve(__dirname, "src/components/utilities"),
    }
  }
}
