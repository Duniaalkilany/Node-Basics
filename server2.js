//create local server using http core module

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("a request received");
  console.log(req.url); //(user visies it through browser)
  console.log(req.method); //req type

  //switch statement to check routes

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;

    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

    //redirect===>old route to new one /change update for url(user visited )===>resourse permanently moved
    case "/about--us":
      res.statusCode = 301; //moved(redirect)
      res.setHeader("Location", "/about");
      res.end();
      break;

    default:
      path += "404.html";
      res.statusCode = 404;
  }
  //response //formulate response headers  //set header content-type

  res.setHeader("Content-Type", "text/html");
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3001, "localhost", () => {
  //fires when server run up start lisrening for reqs on port 3001 in localhost
  //port==>doors in computer (server (send/receive data through it in host computer))
  console.log("Listening for requests on port 3001");
});
