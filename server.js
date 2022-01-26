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
const server = http.createServer((req, res) => {
  //call back function will run every time come req to server
  //send response
  console.log(`a request come (receiving request from browser)`);
});

//invoke listen method

server.listen(3000, "localhost", () => {
  //listening on port 3000 in localhost for request
  //function run (fires) when server start listening
  //server running / and lostening for request on port 3000 to localhost
  console.log(`listening on port 3000`);
});
