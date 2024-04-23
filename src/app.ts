import express, { Application } from "express"

const initServer = async () => {

  const app: Application = express();
  const port: number = 3000;

  //use
  app.use(express.static(__dirname + "/public"));

  //set
  app.set("view engine", "pug");
  app.set("views", __dirname + "/views");

  app.get("/", (req, res) => {
    res.render("index", { foo: "FOO" });
  });

  app.listen(port, () => {
    console.log(`😎 Server is running on http://localhost:${port}`);
  });
};

initServer();
