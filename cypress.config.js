const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "9khz36",
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
