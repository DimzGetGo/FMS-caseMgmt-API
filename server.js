const Hapi = require("@hapi/hapi");
const reportRoutes = require("./routes/reportRoutes");
const vsrReportsRoutes = require("./routes/vsrReportsRoutes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-with"],
      },
    },
  });

  server.route(reportRoutes); // updated to use array
  server.route(vsrReportsRoutes); // already in array format

  await server.start();
  console.log(`🚀 Hapi server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
