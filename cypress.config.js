const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "http://localhost:3000/",
  "reporter": "mochawesome",
  "reporterOptions": {
      "reportDir": "mochawesome-report",
      "overwrite": false,
      "html": false,
      "json": true
    },
  },
});
