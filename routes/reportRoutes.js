// routes/reportRoutes.js
const fs = require("fs");
const path = require("path");

// Load reports.json once when this module is loaded
const reports = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../db/reports.json"), "utf8")
).reviews;

module.exports = [
  {
    method: "GET",
    path: "/api/fmsTasking/v1/caseManagement/report/{id}",
    handler: (request, h) => {
      const id = parseInt(request.params.id);
      const report = reports.find((r) => r.id === id);

      if (!report) {
        return h.response({ message: "Report not found" }).code(404);
      }

      return h.response(report).code(200);
    },
  },
];
