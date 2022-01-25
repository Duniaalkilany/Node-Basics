/*
-using fs modules (interact with file system on computer ( read/write file on computer))
-some times this files is very very very large so instead of using fs core module we use streams/buffers
streams : start using data , before it has finished loading (it is fully been read)
1.readStream
2.writeSream

huge data source(huge file)and we want to read it =============>browser
-we could  wait until all of this arge daya  been read and then do sonething with this data  (fs.readFile===> is async operation (take time to read file) then fire callback fun )
-it will take alot of time (wait reading all data )
-instead of waiting to load all we could pass the data a bit at a time through a stream and this way 
a small chunks of data are packaged up into what's known as buffers(package of data that sent to us when we read a file  )
-then sent down the stream every time buffer fills 
-so every time we get new chunck of data from the buffer we can start use it 
-examplrs===>(streaming something on netflix/youtube)===> you do not nead to wait until all video to load then watch
(little bit of data sent to browser a bit at time so you can start watch directly without wait the whole video to load )
*/

const fs = require("fs");

/*
we read large  data(large file) via stream
-require fs core module
-create stream to first of all read from file using
fs.createReadStream("file path ==>read from where")
-it will start read data from file 
-.on (eventListener)
-"data"===>event
-function 
-so we are listening to data event on this readStream(every time we will receive data (buffer of data from stream))
-every time receive buffer(small backage of data sent to us fron stream(reading from largefile))will fire this call back function 

-fired call back function take chunck(buffer) received as parameters so we can access this chunk of data 
-getdata as buffers(chunks)===>package of data (liitle part of data a bit at a time )
*/

const readStream = fs.createReadStream("./docs/blog3.txt", {
  encoding: "utf-8",
});
const writeStream = fs.createWriteStream("./docs/blog4.txt");
console.log(readStream); //object
// readStream.on("data", (chunk) => {
//   console.log(`new chunk----------------`);
//   console.log(chunk);
//   /* -in fs.createReadStream("",)
// -we can add second argument (option)
// to receive data in readable form/no need to use toString() method*/
//   //   console.log(chunk.toString());
//   writeStream.write("\nnew chunk\n");
//   writeStream.write(chunk);
// });

//================================write stream===================================================
/*
-to write data to file a bit at time 
-create writeStream=fs
-then use it inside on (eventlistener)===>read chunk then write this chunk
*/
//===================================pipe(piping)=================================================

/*-pipe whatever you read from read stream into the writestreame/instead of on event listener
 */

readStream.pipe(writeStream);

//==============================duplex stream================================//
/*
duplex stream : we can read and write through 
*/
