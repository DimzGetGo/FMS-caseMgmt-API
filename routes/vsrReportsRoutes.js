const vsrData = require("../db/vehicleReports.json"); // Assuming the 200 reports are in this JSON file

module.exports = [
  {
    method: "GET",
    path: "/api/fmsTasking/v1/caseManagement/vsrReports",
    handler: (request, h) => {
      const {
        page,
        size,
        sortCol = "bookingId",
        sortDir = "DESC",
        vehicleId,
      } = request.query;

      if (!page || !size || !vehicleId) {
        return h
          .response({ code: 1, message: "Missing query params" })
          .code(400);
      }

      const reports = vsrData.filter((r) => r.vehicleId == vehicleId);

      const sorted = reports.sort((a, b) => {
        const aVal = a[sortCol];
        const bVal = b[sortCol];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "DESC" ? bVal - aVal : aVal - bVal;
        }

        return sortDir === "DESC"
          ? String(bVal).localeCompare(String(aVal))
          : String(aVal).localeCompare(String(bVal));
      });

      const totalCount = sorted.length;
      const totalPage = Math.ceil(totalCount / size);
      const start = (page - 1) * size;
      const pageItems = sorted.slice(start, start + size);

      const dataList = pageItems.map((report, index) => {
        const globalIndex = start + index;

        return {
          count:
            sortDir === "DESC" ? totalCount - globalIndex : globalIndex + 1,
          bookingId: report.bookingId,
          bookingNo: report.bookingNo,
          type: report.reportType,
          caseNo: report.caseNo,
          isLastReviewed: globalIndex === 0,
        };
      });

      return {
        data: {
          totalCount,
          totalPage,
          pageNumber: Number(page),
          pageSize: size,
          dataList,
        },
        code: 0,
        message: "Success",
        currentDateTime: new Date().toISOString(),
      };
    },
  },
  {
    method: "GET",
    path: "/api/fmsTasking/v1/caseManagement/report/by-case-no/{caseNo}",
    handler: (request, h) => {
      const { caseNo } = request.params;

      const report = vsrData.find((r) => r.caseNo === caseNo);

      if (!report) {
        return h.response({ code: 1, message: "Report not found" }).code(404);
      }

      return h.response({
        data: report,
        code: 0,
        message: "Success",
        currentDateTime: new Date().toISOString(),
      });
    },
  },
];
