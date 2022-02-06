/*
 *express router

 -Express servers can quickly get big and out of control if you build them in one monolithic server file.
 - There are many strategies for breaking the route handling logic into modules
 -pattern use to separate routers that contain all of the routing logic and handlers using Express.router()
 - we kept the route definitions in the server and imported the handler functions from other modules. 
 -Instantiate express.router instead of express()
 -express.router===>something that come was fully backed into express 
 -we use it to manage all off our routes more effecianelly and more tightly as well 
 -we use express.router to split our routes into different files and manage them in small groups of routes that belong together
 -this make app more ****moduler***, easy to update (no one big messy file)
 -each resource have group of routes (/blogs)
-type of resource (have routes we grouped it together)
-express.Router (router)allow us to extract the routes into different files / which create a kind of minny app then use these routes in app (app.use(router)) 
//==============================================prefixes==================================================//
-The server can prefix imported routes
-when we use() router 
-you can prefix all of it's routes from the server.
-we can use these routes to specific url , app.use("/api",userRoutes)===>which mean it is only going to apply /api to routes 
which mean http://domainname/users will not worl (404)===>instead http://domainname/api/users
-to makes routes more useble in rest api we can delete the resource name from endpoints and at it is as prefixes with router (you can prefix all of it is routes with the resourse )
 
//======================================MVC========================================================//
- split the code 
MVC basics:
-stands for mpdel/view/controller
-it is away for structuring our code/files
-keep code more moduler/reusable/easier to read 
-developers say they want to take like an MVC approach /MVC methodalogies 
*model===>models/how we describe our data structure and we use them to interact with the db 
*view===>(where you made our html tamplets/front end tamplet )that the user will see 
*controller===>the thing that forms the link between models and views /like middleman that use the models to get data and then pass this data into view 
//===controller 
-extract route handler funcions from routes file 
-place these routes handler functions into a seperate controller file 

//so following MVC methodalogy/way to structure our code (route file for route/model for model/controller forrote handler functions/)
*/
const express = require("express"); //third party framework//function
const mongoose = require("mongoose"); //third party library (ODM)//object
const userRoutes = require("./routes/userRoutes");
const app = express();

const mongoURI = "mongodb://localhost:27017/test";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((result) => {
    //connect to db i async task so when connected start server to listening to requests
    console.log("connected to db");
    app.listen(3002, () => {
      console.log("start listening to requests on port 3002");
    });
  })
  .catch((err) => {
    console.log(err);
  });
//middle wares

app.use(express.json()); //parse json payload come with req
//route handlers//user routes
//add speciv url/
app.use("/api", userRoutes); //userRoutes(handlers)//so it will use/apply all of thess handlers to app
//error handlers middlewares

/*
in express there is built-in error handler middleware but we can handle errors also by creating custom midlewares


*/

//catch all 404

app.use((req, res, next) => {
  res.status(404).json(`not found${req.originalUrl}`);
});

//500errors//internal server error

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(err.status || 500).send({
    message: err.message,
    code: err.code,
  });
});
