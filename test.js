let name = "dunia";
console.log(name);
let arr = [1, 2, 3, 4];

function addOne(arr) {
  return arr.map((ele) => {
    return ele + 1;
  });
}

console.log(addOne(arr));

function sayHi(userName) {
  console.log(`hi ${userName} `);
}
sayHi("dunia");
/*
write on run js files through node 
-node 
-create js file 
-click node fileName ===>this file will run on computer 
-terminal will act as console (will logs whau in js file )
*/
