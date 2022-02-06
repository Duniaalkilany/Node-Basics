const mongoose = require("mongoose");

//mongoose object to create Schema
/*create Scheme===>define the structure of a type of data/document/record stored in acaollection in Db
-documents stored in collection as json object format ("proparty":value)so Schema define structure of documents(proparties name/type/required field or not )

*/
const Schema = mongoose.Schema; //constructor//class//create new schema instanses

console.log(typeof Schema); //function
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    age: Number,
    country: {
      type: String,
      required: true,
    },
    married: Boolean,
  },
  {
    //optional obj to timestamps poparty
    timestamps: true, //in Db auto generated for tipestamps proparties (createdAt/updatedAt)
  }
);
console.log(typeof userSchema); //object
/*create model(communicate with collection )
-modelname===>singuler od collection name
-no need to 
*/
const UserModel = mongoose.model("user", userSchema);
console.log(UserModel); //Model{user}
console.log(typeof UserModel); //function

module.exports = UserModel;
