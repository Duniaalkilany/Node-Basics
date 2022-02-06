//create blog schema/model
const mongoose = require("mongoose");
//create Schema using moongose object//Schema ==> to define structure of documents that will store inside the collection
//Schema===> is a constructor function used to create new schemas(objects)
const Schema = mongoose.Schema; //constructor function(class)
console.log(Schema);
console.log(typeof Schema); //function
//mongoose create Schema
//create (blog/document) schema
//this create new instance // Schema object
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true, //this field is required for blog document
    },

    snippet: {
      type: String,
      required: true,
    },

    body: {
      type: String,

      required: true,
    },
  },
  {
    //optional object to set timestamps===>automativally generate time stamp proparties on documents
    //createdAt://updatedAt:===>everytime we create /update document it will automatically assighn values for timesramps proparties (createdAt/updatedAt)
    timestamps: true,
  }
);

//create model

//takes in as arguments (nameof model==>capital===>name of model is important ==>look at model name then pluralize it and then look for hat collection inside Db when ever we use the model in future to communicate with Db )
//based on modelname ===>(plurulize it )====>look for collection name(no need when use model to say find collection (blogs)//it will lookfor modelname/plularize it (collection name automatically) so itwill look to the collection (blogs automatically based on model name))
//second arguments is the Schema we want to based this model on(what type of object we want store in this collection )so we look to the related Schema and just created it
//modelname(fiest argu should be singuler of the collection name)
const Blog = mongoose.model("Blog", blogSchema);
console.log(typeof Blog); //function
// console.log(Blog); //Model{}
// module.exports = {
//   Blog: Blog, //say just Blog
// };

module.exports = Blog;
/*
-two types of database:(structure data differntly)
1.sql
-use tables/rows/coloumns to store records of data   
2.nosql
-use collections and documentes
-examples:mongoDB
*/

/*
how nosql DB work:
-DB split up into collections (bit like tables in sql DB)
-so each collectionused to store a particuler type of data 
-for example (user collectionstore user documents//blog collection store blog documents)
-you can create any number of collections but each collection have one type of documents

*/
/*
-each collection have one type of documents (for example blog collection have blog documents)
-each document ===>bit like a record in sql database (each one represnt single item of data )==>blog document represent single blog//user document represent single user
-each document stored in format simillar to json /js obj (series of key/value pairs)
-each document(record)have auto-generated unique id to identify it 
-for example blog docment stored in db in json obj format like this :
{
    "_id":123456,//auto-generated unique id for each document
    "title":"opening party",
    "snippet":"fff",
    "body":"blah blah blah"
}
*/

/*
-connection:
-from code we can conect to collection in mongoDB
-then we can save /read/update/delete documents inside it 
*/

/*
mongoDB setup/Atlas
-when we work with mongoDB there are two different setup options:
1.install mongoDB locally ,use and then deploy 
2.or we could use a cloud database which is already hosted for us(mongoDB atlas)
-build new cluster /database
-cluster collection 
-own data
-give database name
-give collection name
-inside collection to create documents ==>create user (for database access)===>use (username,password)to connect to database ==>(not any one can connect to database just invalid user that we created )
-connect your application
-connection string  
-
*/

/*
mongoose&models&schemas
mongoose ==>to connect and interract with the database
-Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
-mongoose is ODM library(object document maping )library===>it is wraps the standered mongodb API and provide us 
with much easier way to connect and communicate to with data base 
-using mongoose we create simple data models which have database query methods to create/get/delete/update database document
-mongoose queries the correct database colletion based on the name of model we used then it performs the ation required and return us a response 
//using mongoose to connect to DB:
1.install mongoose library (third-party backage)
2.require it
3.use mongoose object to connect to db using connect method ===>mongoose.connect(dbURI,{optional object to stop deprecation warning})
4.mongoose.connect(dbURI) is async task (take time to done) it will return promise so it can take then /catch methods
5.we do not want server to star listening for request before connect to DB(because for example if a user request the home page and home page lists a load of data dependes on database we cant get or show data until server connect ti DB  (connection to DB  established) )
6.so we put app.listen inside then method (function that fire when promise(connection) done)
7.create schema / model for (blog data(blog collection))
8.so create folder called models (inside it blog.js) to create blog schema and model inside it 
9.we used mongoose to create schema and model so require it inside blog.js 
10.use Schema constructor function(class) which use to create Schemas mongoose.Schema
11.then use this Schema constructor to create Schema for a type of data (document)//this create new instance of Schema object
12.pass obj as parameters to Shema class //this object will describe the structure of the document we want to store in collection 
13.{}==>this obj describe document that will stored in collection in DB (series of proparties /types/required)
14.{
    proparties we want our document to have /type of it/required or nor 
    firstProperty:{
        type:,
        required://this field is required for document
    },
    secondProperty:String
}
15.using mongoose to create new instance (new Schema) new Schema({},{optionaml object to set timestamps propert 
timestamps:})
16.after create Schema (document Schema ) then create model (based on the created Schema )
17.Schema (thing defined structure of document)//model is thing that surroundes that and then provides us with interface by which to communicate with DB collection for that document 
18.create constant to store model(capital letter for model constant) by using model method //mongoose.model()

19.mongoose.model('modelname(singuler of collection name),Schema that model based on)
20.after create Schema/model/the third step is export (model )
21.
*/
/*
-mongoose used to create schemas and models 
-in mongoose we make schema first 
schema mean ==> the structure of a type of data /document stored in the database collection 
so it is describe what proparties it should have and type of these proparties and etc

**for examole in user collection there is user data type(user document) so the structure of user data type/document is defined by user schema 
user schema:
name:string/required 
age:number

**blog schema 
title:string/required
body:string/required
snippet:string/required

so schema define the structure of collection document and is the structure of documents stored in collection in DB
-the next thing to do after create schema is create model based on schema 
-model==>the thing actually allowes us to communicate with database collection 
-for example if we create blog model which is based on blog schema , model will have both statc and instance methods which we can use to save/get/delete/update frpm the blogs collection 
*/
/*
getting&saving data 

-we using model ti interact with collection /Db
*/
