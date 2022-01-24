/*
refactoring code 
1. modularity ===>givide large software into chunks (smaller parts)
module : just file has related code 
-split our code into files , then  import /export things from and to  these files ()
-keep code mush more moduler / reusable/ easier to maintain 

/*

- Node.js has included experimental support for ES6 support
-using module.exports/ require===> old school 
-to export from module (make accessable (sharing functionallity) with other modules) use 
module.exports={
    //if i named key same name as value (shortcut )
    key,
key:value

}
(so i export object have proparties )
*/
/*
- import (receiving what i export )===>extract here in this file(module)
-if i export then require i can use it whwre i require(omprt it)==<can access to it (accessable)
in node js i use 
1-old way ===> require all things (all proparties)/whole object i exported /-in old node js the whole js file are required /you can not extract or require just a part 

const anyName= require("module path")
---anyName ===>object that exported 

2- destructuring in node able use to not require all js file (all the exported obj from module )
, using destructuring ===> can extract whatever property from (exported obj)/require(extract) just apart 
const {, }= require ("")//proparty names at it is inexported obj in  module where export 


/*
-ES6
-export ===>keyword ===>to share functionallity across differnt modules 
-export ===> to make (var / class/ function /object ...) accessable by another files (modules )
-module.export (old school )/export in ES6

export before thing want to export 
 export more than one thing ===>  export {

}
export default ===> using once in each module 

Aliases export as 


*/

const xyz = require("./people"); //all properties in the object exported in module

console.log(xyz); //{}===>object have every things exported from module//{properties exported from module }
console.log(typeof xyz); //object
console.log(xyz.people);
console.log(xyz.ages[1]);

const { people } = require("./people"); // whatever proparties you want extract from the object exported in peple module(same names)
console.log(people[1]);

/*
-node js comes with some built in core modules we can also require it to add functionallity (receiving functionallity )
1.os

*/
//os is core module (built in module can require/extract it )//get information about current operating system
const OS = require("os");

console.log(OS); //object

console.log(OS.platform()); //linux
console.log(OS.homedir()); //home/dunia
console.log(OS.freemem()); //amount of free memory in this machine
