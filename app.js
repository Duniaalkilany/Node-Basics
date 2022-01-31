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
*/

const express = require("express"); //require //return function

// console.log(express);
// console.log(typeof express); //function
const app = express(); //set up express up by invoke express

console.log("app====>", typeof app); //function
app.listen(3000, () => {
  //function fires when app run and start listening for rquests on port 3000 in localhost
  console.log("listening for requests on port 3000");
});

//rotes handlers
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
