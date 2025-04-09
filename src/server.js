const Hapi = require("@hapi/hapi");
const route = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5555,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["http://notesapp-v1.dicodingacademy.com"],
      },
    },
  });

  server.route(route);
  await server.start();

  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
