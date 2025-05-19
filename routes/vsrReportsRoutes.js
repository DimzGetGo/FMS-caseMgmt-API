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
        sortDir = "ASC",
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
        return sortDir === "DESC" ? bVal - aVal : aVal - bVal;
      });

      const totalCount = sorted.length;
      const totalPage = Math.ceil(totalCount / size);
      const start = (page - 1) * size;
      const pageItems = sorted.slice(start, start + size);

      const dataList = pageItems.map((report, index) => ({
        count: start + index + 1,
        bookingId: report.bookingId,
        bookingNo: report.bookingNo,
        type: report.reportType,
        isLastReviewed: index === 0, // first one in the list marked as latest
      }));

      return {
        data: {
          totalCount,
          totalPage,
          pageNumber: page,
          pageSize: size,
          dataList,
        },
        code: 0,
        message: "Success",
        currentDateTime: new Date().toISOString(),
      };
    },
  },
];
