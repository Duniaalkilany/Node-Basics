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
****get req===>app.get() (using get methodtake two args (url path (what path of url you want listen to), function takes two para(req,res)  ) )
req obj (req info)//res obj (use it to send response)
*****res (no need set res header content-type then use write method then end) instead because using third party (express ) we use send method

*****res.send()===> infers (content-type)/statusCode//no need to set them manually(res.setHeader("Content-Type","test/plain")//res.statusCode)
*****res.sendFile('path/absolutr path (from relative to root on our computer ',{
  //object to specify root
  root:__dirname
})===>send file like html file as response 

*/

const express = require("express"); //require //return function
const { readdirSync } = require("fs");
// console.log(express);
// console.log(typeof express); //function
const app = express(); //set up express up by invoke express

console.log("app====>", typeof app); //function
app.listen(3000, () => {
  //function fires when app run and start listening for rquests on port 3000 in localhost
  console.log("listening for requests on port 3000");
});
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
