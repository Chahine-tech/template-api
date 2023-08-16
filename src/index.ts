import app from "./app";
import { userRouter } from "./routes";

const start = async () => {
  app.get("/", async (request, reply) => {
    reply.send({ name: "My api" });
  });

  app.register(userRouter, { prefix: "/api/user" });
  app.listen({ port: 3000, host: "127.0.0.1" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address} 🚀`);
  });
};

start();
