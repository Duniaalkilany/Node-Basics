/*
-global object (part of global scope / that mean we can access it any where /any file)
-in browser (global object is window )
-in node js global object is (global)===>global conText in node environment 
-like in browser global object (window) no need to explicity type (global or window) when use it ===> it is available to us out of the  box 
-in window object (there is document property )/in global no document property
-in browser side (variables added to window object when declared used var keywoed (variable scope drama))
-global variable/functions declared using var not added to window object like in browser side/so i can not access it everywhere every side as global context (related to modules )
*/
console.log("Global object ", global); //global object in node

//global object methods
//run one time after 2 second//run function after a delay
global.setTimeout(() => {
  console.log("hello");
}, 2000);
//no need to expilicity type global (it is global context) can access it any where / ant file (out the box)
setTimeout(() => {
  console.log(`hiiiii`);
  clearInterval(interval); //stop run setInterval function (stop repeatelly call of function )
}, 3000);

//global object method //repeatelly call function after a gain of delay
const interval = setInterval(() => {
  console.log("run every 1 second");
}, 1000);

//(2 proparties available in node :dirname===>directory name/filename===> file name)
console.log(__dirname); //absoulte path of the current folder===>home/dunia/Node.JS
console.log(__filename); //absoulte path of the current folder with the file name===>home/dunia/Node.JS/global.js

//second differnet from global object in browser (window) ang global in node that in node i can not access DOM elements
//we loss access to some js features like DOM (we can not interact with html page )
//no document property in global object
// console.log(document.querySelector("h1")); //document is not defined

const setfun = setTimeout(() => {
  console.log(`testing  / call function /run function after a delay`);
  //to stop repeately calling of setInterval fun //after 3 second
  clearInterval(int);
}, 3000);

const int = setInterval(() => {
  console.log(
    "every second / repeately call afunction ater second and every second"
  );
}, 1000);

//global variable declared using var not added to window object like in browser side
var name = "dunia";

console.log(global.name); //undefined
