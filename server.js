/*
server side code  powered with node/js 
-server will be thing which will listening to incoming requests from client(browser)
communictation between client and browser :
1. when you type a website adreess or domain name  in browser then hit enter
2.that sends a request to the server which is powering that particular website 
3.then server looks at the request and it decides what to send back to the browser
4.in most cases that will be HTML page which displayed in the browserbut it also can be images / css /JSON===>(any thing come from server as response) 

how the browser know to send request to the correct server (because there is millions servers powering millions websites)?
IP addresses/domains/
*/

/*
IP addresses/domains
-IP address===>Internet Protocol address 
-identifying number associated foe each comouter or computer network 
IP addresses : like addresses for computers which are connected to the internet and all computers connected to the internet have a unique IP address to identify
-some special computers are known as hosts ===>meaning they host the websites on the internet 
-if you create and publish a website it will be hosted on a computer somewhere and that computer will have an IP address to identify it 
-now if we want to connect to a server on that host computer we need to know it is IP address to do it 
-we could then type the IP in the browser if we wanted to connect to the server
-IP addresses it just a series of numbers and it is hard to remember IP address so instead we use domain names to mak these IP addresses 
-then when we typed domain name into browser and hit enter will find the IP address associeted to it 
-then use IP address to find the computer hosting the website and communicate with it  

example (how browser sent request to correct server ?)
*write into browser (domain name / website ) then hit enter
*then the browser will look to the IP address with that domain 
*then use IP adress to connect to the server on the host computer (host the website )
*then server look at the request and decide what send back to browser (responed)usually (HTML bage)
*type some thing in browser and hit enter is get request 
*get request is sent each type you write address in browser or hit link 
*/

/*
HTTP
-communication between server and browser through HTTP 
-HTTP===>hyper text transfer protocol 
-http===> it is just a set of instructions that dictate how communication occurs
-if http not exist they would not really be able to communicate effectively between (browser/client)
-so http some thing like language in real communication (people use english/arabic language to communicate to each other)/the same thing server and browser need http construct to communicate to each other 
Http request ===>send or recieve data from server side resources /reach external server /database
Http methods :(request methods)===>type of request you want to make 
-get 
-post(send data to server )
-delete
-put
*/

/*
create server :create local server in computer using node  
- in node we manually create a server (listen to requests fron browser/ decide response to send to browser )
-core node module ( build in module in node like os/fs)
1-to create server i user http (core node module )
2.use createServer method of http 
3.createServer() method and take call back function as argument  
4.call back function will run every time a requests come in  to server 
5.then call back function send response according to request  
6.call back function take two objects as  parameters (req,res)/so we can access to two objects 
7.req===>obj (information about request )such is url from this obj (to see where come from /request type
8.res===>response obj (we send response to user (browser))
9.invoke listen method
10.listen method take 3 arguments ===> port number as argument (port listen to)/a host name===>default value==>(localhost)/function 
11.function fires when server start listening
*/

/*
localhost:host name (dafault value for )

localhost(host name/domain name on the web===>but this domain name (localhost) will take us to very specific IP adress called loopback IP adreess (127.0.0.1) and it is points directly back to your computer  )
-when you connect to local host domain in browser
-the browser is actually connect to our own computer (which acting as host for our website)
-so host name (localhost)==>listen to requests come to our 0wn computer (this is how use our computer as host when developing website)


port numbers:like doors in computer throygh which internet communication can be made to differnt programms   (represent specefic channal gateway )that server should communicated through
-in your computer (have many softwars connected to internet and send/ recieve data(skype/discord..))
-this softwars do this (send /recieve data ) via different port number to keep information separate from one another 
-so our server need it is own port number to communicate through 
-you can choose any port number (not used by another program)
-in browser we type localhost:3000===>browser know that will connect to our own computer via port 3000
-port (where our server will be listening )
*/

const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  //call back function will run every time come req to server
  //send response
  console.log(`a request come (receiving request from browser)`);
  // console.log(req);
  console.log(req.url); // /(root of website)===>(user has visited up in browser==>it does not say localhost:3000 it just from the point after it )
  console.log(req.method); //GET
  console.log(req.headers.host); //localhost:3000

  //=====================routings
  let path = `./views/`;
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

    case "/about-me":
      //do redirect to /about
      //first of all set statusCode to be 301===>which mean removed resourse(permanent redirect)
      res.statusCode = 301; //Moved Permanently
      //then to make redirect use res.setHeader(set the location)
      res.setHeader("Location", "/about");
      res.end(); //end the response
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
  }
  // console.log(res);
  //formulate for response headers
  //set header content type(text/plain,HTML)
  // res.setHeader("Content-Type", "text/plain"); //we are sending back some plain text tp the browser
  res.setHeader("Content-Type", "text/html"); //content type send back to browser is HTML

  //res.write()===>write to response
  // res.write("hello, iam text plain response from the server"); //to write to response
  // res.write("<h1>testing Html page</h1>");
  // res.write(
  //   "<p>hello i am html element sent to browser as response from server in localhost</p>"
  // );
  // res.write(
  //   '<img src="data:image/jpeg;base64,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">'
  // );

  //write response using fs(send full html page/document)

  // fs.readFile("./views/index.html", (err, data) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //i can just send data in the end method
      // res.write(data);
      res.end(data); //end the response (say okey we have ended this now send it back to browser)
    }
  });
});

//invoke listen method

server.listen(3000, "localhost", () => {
  //listening on port 3000 in localhost for request
  //function run (fires) when server start listening
  //server running / and lostening for request on port 3000 to localhost
  console.log(`listening for requests on port 3000`);
});

/*
request/response
-in createServer(()=>{
  it take function as argument this function take two parameters : req/res
})
-req===>request object (contain all info about request )
*headers(metadata about request)(obj)===>contain host property (host name)
*  method:type of request
*url:(that user has visited up in browser it'd from point after localhost/3000)
---if in browser localhost:3000/about ===>req.url===>(/about)

/:parameters
app.get('/api/:thing',...) = req.params.thing
Query Strings
http://server/route?ball=round = req.query.ball
=================================================================
res===>res object (what we use to send as response to browser)
1.formulate response headers===>response headers give the browser a little bit more information about what kind of response coming back to it 
for  example what type of data sending back to browser(text/Html/json/css/img)
also we can use response headers to set cookies
2.steps to send response from server to browser 
-res.setHeader("Content-Type","")//set header content type (say to browser what data type send back as response)
-res.write("")//write to response
-res.end()//end response and then send back to browser 
3.if i want to send HTML bages as response 
i can write all html elements in sepearates
res.write("")==>but code will be messy to instead of this we can use fs (file system module)
-read file you want send it 
*/

//=================================basic routing=====================================
/*
routes which user visit in browser
-make routes ==>each route user visit /different response recieve
-so figure out the url taht user request in browser (req.url)/url is from point after localhost:3000
-depent on that url(visited by user(requesr url)) send back adifferne response (different html files)

*/

//================================ -- status codes====================================
/*
-status code / response status code ===>describe the type of response being sent to browser 
-how successful the request was 
-range (100-200-300-400-500)
-100-199===>Informational responses for browser
*100==> continue(the client should continue the req or ignore res if req completed)
-200-299
*200===>ok(request success===>meaning of success depend on request type(method))/successful response
-300-399===>redirection messages
*301===>resourse moved(permanent redirect)
-400-499==>Client error responses
*401===>server can not understand the request because (invalid syntax  in client)
*403===>forbidden(client/browser nit have access to server (resourse make req to it ))/unauthorized/sercver refuse request 
*404===>not found(wrong endpoint(url)/not found resourse trying make req to it)
-500-599===>server error response
*500==>enternal server error(encountered error===> server do not know how to handle it )
*505===>http version not support (http version in req not support in server)

//status property is in the res obj 
*/

//=================================redirects==============================
/*
-change url handler 
-detect request for old url and redirect it to the new url 
-for examole old url===>/about-me///new url===>about
-updated url 
-if make request to the old url ===> get 404(error/not found)
-to do this add another case into swuch statement (when case is /about-me redirect it to /about)
*/

//created local server /using swich statement to handle rotes
/*
-but many req types/many routes ===> using switch and this way will make code messy so i use third party backage called express to create node server 
to uses express backage===> framework do all magic (handle routes/req/res)
*/
