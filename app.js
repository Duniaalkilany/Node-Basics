/*
what express and why we use it ? 
-we can create sever manually using http npdule but it is complex when start dealing with more complex routes/and handling post requests and other requests types and other server-side logic so using http leads to some messy code
-express is a framework using to build node app (website) /easily manage routing requests/responses/serverside-logic in mush elegant way
also make code easier to read /update and extend /less time/clean code /fast/
-install express(npm i express)
-then use it by these steps:
1.require express module ===>will return function and store it in express
2.to use it const app =express()//set up express ===>invoke(call) express () ===>stored in app 
3.then listen for requests using listen method (port#,host name (defailt value===>localhost(no ned to add )))
4.listening for requests 
5.****get req===>app.get() (using get methodtake two args (url path (what path of url you want listen to), function takes two para(req,res)  ) )
req obj (req info)//res obj (use it to send response)
*****res (no need set res header content-type then use write method then end) instead because using third party (express ) we use send method

*****res.send()===> infers (content-type)/statusCode//no need to set them manually(res.setHeader("Content-Type","test/plain")//res.statusCode)
*****res.sendFile('path/absolutr path (from relative to root on our computer ',{
  //object to specify root
  root:__dirname
})===>send file like html file as response 


//=======================redirects
-redirect(old url (route redirect to the new url))
-in express 
1.create new get handler for the url that we want to redirect(old url)
2.res.redirect("new url")

//==========================404(error handler)
(use ===> use this function for every incoming req )
**position of use method is very important (at button /after req handlers)//exopress will move from top to button and check so if find use method before handler it will fire middleware function and send response to browser / and will not carry on to the rest codeso it will not reach get the rest handlers
-app.use()-==>use method using to create middleware and fire middle ware functions in express 
//use to create middleware / fire middle ware function
  //callback function take (req,res) as para/middlewatre function 
  //use function is going to fire every time a req come (for every single req coming in)
  //but only if the req reach use function point in the code 
  1.when send req from browser(wrong url/endpoint)//for not exist end point
  2.express will run code from top to button
  3.check for every get handler 
  4.if find a match endpoint //(fire callback function related to get handler)and will send response to browser and not carry on to the rest of code 
  5.if matches (req url with routes //any of get handler) then express send response do not care about rest code 
  6.if not matches any of req handlers and reach use method(middleware function fires and send res)
   7.you have to set status manually 
   res.status(404)===>return res so you can chaining with send ()

   //=================================middlewares==================================================//
   -middleware: ia a name for any code which run on the server between getting a request and send response
   -a function run in get handlers it is also middleware (code run between getting req and send res )the different that get handler it is only fire functions only for get requests to certain ruotes

   -the use method is generelly used to create middlewares and run middleware code (function) 
   -use method function run for every single requests coming in (it will run for every types of requests to all routes )
   -position /order of middleware is important (control how runs)
   **middleware examples:
   1.logger middleware===>logs details for every req
   2.404==>return 404 pages
   3.authentication (check middleware for protected routes)
   4.middleware to parese json data from requests (json==>js)
  -middle ware 404 (catch all non existing routes must me at the button because it send response and when send rs to beowser express not come on the rest code  )
  -logger middleware===>at top (run for every single req and logs details for request)

  
//===================================using next() function ==========================================//

-the browser hangs (no response) when run middleware because express does not  automatically know 
how to move on we have to explicity tell express to move on to the next function down the middleware
- we do this by using next function (use it as para to middleware  function(to access it )(req,res.next))
-then call it (that mean we say to express look we finished inside this middleware now move on to the next (because we are not sending response yet to browser we just do something (like log details) and now move on and check routes handlers to  send response ) )
//===================================logger middleware ================================//
-run for every single req comimg on and logs details about it 
-at top cause if i add i at button then express move from top to button and is stop carry on (move on to the rest of code when response send so when i send res it will not reach logger middle ware so i add it at top and because express does not know whan to do after run middleware function (do something /nort send res) we use next function as para in middleware function and call it to say to express that we finished inside middleware and move on to the next)
  

//==================================third-party middleware======================================//
-using node and express ===>thereis tons of middleware functions that is already created and we can use 
-for example there is middleware called
1. (morgan)==> is alogger and smillar thing to our custom middleware(logger we created)
2.helmet ===>security piece of middleware and others 
so if there a middleware package no need to write middle ware from scrath for example to use morgan middleware:

-from npmjs.comm(morgan ===> is http req logger middleware for node  )
-install it npm i morgan
-require it //morgan is function 
-invoke it (morgan (a predefined format string))===>pass arguments to dictate how it is going to be formatted what will log to console

//======================================express middleware/built in middlrware//static files/json/(ready-made middleware come along with express(static))===============================================//
-if we add static files to our project (images /css file ) we can not automatically accessthat file from the browser 
-the server protects all files automatically from users in browser so they can not access any of our files 
-so to make the browser(user) access to something we have to specify what files should be allowed to be accessed
-what files should be public
-to do that we use some (ready-made)middleware comes along with express 
-to make static files public (can access it /browser can access it )
*express.static("public")
*express.json()==>This is a built-in middleware function in Express. It parses incoming requests with JSON payloads 
*/

const express = require("express"); //require //return function
const morgan = require("morgan");

// console.log(morgan); //return function//so to use this middleware invoke morgan function
console.log(express);
// console.log(typeof express); //function
const app = express(); //set up express up by invoke express
console.log(app);
console.log("app====>", typeof app); //function
app.listen(3000, () => {
  //function fires when app run and start listening for rquests on port 3000 in localhost
  console.log("listening for requests on port 3000");
});

//=======================static middleware(come along with express )==============================//
app.use(express.static("public")); //pass folder name (all files in this folder will be accessable (available as static file to the front end ))
//=====================morgan middleware(third-party middleware) //instead of logger (custom middleware)========================//
app.use(morgan("common")); //instead of build logger function from scratch just invoke
//======================logger middleware===========================//

app.use((req, res, next) => {
  console.log(req);
  //run for every request /logs req details (on serverside)
  //browser will hanginig (no response send eventhough req details logs )==>because after express run logget middleware function it does not know what to do next and how to move one to the
  console.log(
    `method:${req.method}, url:${req.url},path:${req.path},host:${req.hostname}`
  );
  next(); //invoke next function//finished inside this middleware moveon to next code
});

//======================testing middleware===========================//
app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});
//======================================routes handlers
app.get("/", (req, res) => {
  //this function run each time (get request) to server
  //when fires (aceess req obj)

  //   console.log("request", req); //obj
  console.log(req.method);
  console.log(req.url); //url //endpoint (visited through browser)

  ///send response to browser
  // res.send("hello world"); //send text/plain to browser//no need to formulate response headers//set res header content-type

  // res.send("<h1>hello am html as response </h1>");
  res.sendFile("./views/index.html", {
    root: __dirname, //absoulute path(path from root of our computer) //specify root
  });
});

app.get("/about", function (req, res) {
  res.sendFile("./views/about.html", {
    //we need to tell express where path relative from(what path relative to )

    root: __dirname, //absolute path (path from the root of our computer) of directory path(current path )/home/dunia/Node.JS/
  });
});

//redirects
//no need to set res.statusCode ===>setting automatically(301)===>moved resourse (redirect)
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page
//in this case we have to manually set res statuse code // because if not set it will be 200 because res send
app.use((req, res) => {
  console.log(res.status(404)); //this method status===> return response itself(res) so you can chaining
  // res.statusCode = 404;
  res.status(404).sendFile("./views/404.html", {
    root: __dirname,
  });
});

//=============================middlewares====================================//
