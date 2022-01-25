/*
the file system
-file system core module (built in module in node to add / receive functionallityof ===>(abilty to interact with filesystem on computer with js ) 
-using filesystem module to do things like on computer :
1.read files
2.create file(write)
3.delete files 



*/
//import fs core module (to interact with file system on computer)
const fs = require("fs");

console.log(fs); //object (methods/properties)

/*
reading files
-fs.readFile()===>read method ===>take two arguments (path for file you want to read,function and this function will fire when read method complete)
-so read method is async operation(takes sometime to do)
-so when asyn ope finish (readFile) it will fire call back function 
-callback function take two parameters (err,data)==>come from async operation 
-when we loged the data ===><buffer>

-Buffer ===> is a backage of data that has been sent to us when we read file on computer /using readFile method of fs core module

-fs.readFile() is async (it will take some time to do but it will not freeze or block the rest of code )
-if file i want to write to not exist ===> it will create this file and then write gext to it 
*/
fs.readFile("./docs/blog.txt", (err, data) => {
  if (err) {
    console.log("error", err); //no such file or directory,
  } else {
    console.log("data:", data); //<buffer >
    console.log(data.toString()); //hell from the other side
  }
});
//no blocking
console.log(
  "fs.readFile() is async it will take some time to finished and do but it will not block the rest of code so hello from console "
);
/*writing files
-fs.writeFile()====> it will take 3 arguments (relative path to file you want to weite to , text you want wrirte "string")
-fs.writeFile() is async (take some time ) when it is finished run callback function 
-overwrite(replace old text with new text)
*/
fs.writeFile("./docs/blog.txt", "i am writting to you from js :)", () => {
  console.log("file is written ");
});

fs.writeFile("./docs/blog2.txt", "i am writting to you from js :)", () => {
  console.log("file is written ");
});
/*directories
-fs.mkdir("",(err)=>{
    
})
-fs.existsSync("./")
-fs.rmdir("",(err)=>{})
1.create new folder (directory )===> fs.mkdir()
fs.mkdir()===>take three arguments ('path where you want to create this dir and name of it  ')
2.fs.mkdir===> is async task / fire callback function when done /
3.if we run fs.mkdir("samepath") again with same relative path it will get error // file already exists {
4.so to avoid get erroe each time run code i should check just if this file not exist run this method
5. to check if file exist i use fs method called exist 
fs.existsSync("path of file to check ")
6.note existsSync is a sync operation (it will block executed the rest of code untill this operation is done)
7.if you want to remove folder(directory) use fs.rmdir("",()=>{})
8.fs.rmdir() is async operation / when completed fire call back functio 
*/
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("directory created");
  });
} else {
  console.log("this file is already exist!!!");
  //if folderle exist remove it

  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder removed ");
  });
}

/*deleting files
-fs.unlink("path",()=>{

})
-it is async operation when done fire the call back function 
*/
if (fs.existsSync("./docs/blog3.txt")) {
  fs.unlink("./docs/blog3.txt", (err) => {
    if (err) {
      console.log();
    }
    console.log("file deleted ");
  });
} else {
  console.log("file not exist ");
}
console.log("after sunc operation ");
