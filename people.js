const people = ["dunia", "dalia", "manar", "rawaa"];
const ages = [10, 20, 30, 40];
console.log(people);
console.log(`hello from people module `);
module.exports = {
  //export properies
  //when prop//val same name in object//shortcut (use one )
  people: people,
  ages,
};
