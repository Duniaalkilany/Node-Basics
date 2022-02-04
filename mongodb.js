const express = require("express");

const app = express();
const morgan = require("morgan");
const BlogModel = require("./models/blog"); //require exported
console.log(BlogModel); //{ Blog: Model { Blog } }
//connecct to mongoDB //connection string//dbURI
const mongoURI = "mongodb://localhost:27017/test";
// "mongodb://dunia:1433127@nodetest-shard-00-00.2jc39.mongodb.net:27017,nodetest-shard-00-01.2jc39.mongodb.net:27017,nodetest-shard-00-02.2jc39.mongodb.net:27017/test?ssl=true&replicaSet=atlas-h83lav-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoose = require("mongoose");
const { result } = require("lodash");
console.log(mongoose); //object
// console.log(typeof mongoose);
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((result) => {
    //call back function fires if promise resolve (connection complete)
    console.log(`connected to db`);
    app.listen(3000, () => {
      console.log("start listening for requests on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.json()); //this middleware//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads
// app.use(express.urlencoded({ extended: true }));
//saving&getting data

//========================================request handlers=============================//
/*get req from browser to get all blogs saved in DB ===>
in browser/client:localhost:3000/blogs
server handle this request and send back response (html bage/json /text) 
*/

//========================
app.get("/add", (req, res) => {
  //craete new instance new blog//save document to collection in DB
  const blog = new BlogModel({
    //check Schema to know properties you have to add in obj
    title: "test",
    snippet: "test2",
    body: "test3",
  });
  console.log(blog);
  console.log(typeof blog); //object
  //save to DB
  //once saved to database it will send to us as response (document(json obj))
  //so res be  will the saved document
  blog
    .save() //save it to blogs collection//this is async task //return promise
    .then((result) => {
      res.send(result); //Content-Type: application/json;
    })
    .catch((err) => {
      console.log(err);
    });
});

//find single document
app.get("/singleBlog", (req, res) => {
  BlogModel.findById("61f9c8dca5ce17d8b2e470fe")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    }); //get all documents inside collection //async;
});
app.get("/", (req, res) => {
  res.sendFile("./views/index.html", {
    root: __dirname,
  });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", {
    root: __dirname,
  });
});

app.get("/about-us", (req, res) => {
  res.redirect("./views/about.html");
});

//======================================REST route handlers================================//
/*

post request to add data/create dat/craete document in collection 
create new blog
post request to the endpoint /blogs 
-take object in req body then using this data to create new instance of the blog document using blog model we created
-add data to instance then save document it in DB
*/
app.post("/blogs", (req, res) => {
  console.log(req.body);
  //use data to create new instance of blog document using model we created

  const blog = new BlogModel(req.body); //created new instance of blog document using model we craeted

  //save to db
  blog
    .save()
    .then((result) => {
      //result //created instance in db
      // res.send(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    }); //async operation
  // res.send(blog);
});

/*
create new insrtance of doc obj using create method 
*/

app.post("/new", (req, res) => {
  const content = req.body;
  BlogModel.create(content)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/*
get all documents in the collection from db

get /blogs
-using model we create 
-created model has methods 
-to get all documents using find()===>this will retuyrned all document in collection 


*/
app.get("/blogs", (req, res) => {
  BlogModel.find()
    .then((result) => {
      res.send(result); //array of documents(blogs)objects
    })
    .catch((err) => {
      console.log(err);
    });
});

/*
route parameters:
route parameters are the part of route (end point)that are variable (could be changed )

get specific document
send get request to endpoint/
get===> endpoint/blogs/:id==>make id as route parameter(:id===> to donate that is route parameter/changable)
-then we we make req we have to pass send value of parameter in req url
-if use (route parameter/send value to it in req) 
-then in req obj check params property ({id(routeparameter):"value"})
-in server we need to exteact id parameter from request url to see if it is id and use it
-then use model method findOne({_id:id})/findById(id)/find({_id:id})
-if you want to query from db by  by a document's id use findById(id)(syntax suger)
-query from db the doc with match id 
-send(document)  back to user 

*/
app.get(`/blogs/:id`, (req, res) => {
  console.log(req.params); //{id:"2"}
  //extract id(parameter) from req url

  const id = req.params.id; //value recieved fron req//"2"

  //then using model with
  //findById===dindOne({id:id})
  // BlogModel.findOne({ _id: id })//out put will be object with match id
  // BlogModel.find({ _id: id }) //output will be array contain object with match id
  BlogModel.findById(id) //if query from db by id //output will be object with match id
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//for testing get a document by name

app.get("/blog/:title", (req, res) => {
  console.log(req.params); //{title:"value fron req url"}
  const title = req.params["title"]; //extract name from req url
  BlogModel.find({ title: title }) //array of object with matching title
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/*
update
to update document /blog 
-send put http request tp end point /blogs/:id
-route parameter (changable(variable))id
-in request body send object (complete represntation of blog object/document with updated proparties) 
-in server handle put request 
***extract id parameter
**extract body 
**find document with same id 
**note that findone is async so then using result returned to assign it with updated proparties from extracted body obj
**save it to db (it is also async operation )
**after save then send res 
*/

app.put("/blogs/:id", (req, res) => {
  //req.body
  console.log(req.body); //object (complete representation of document(blog) object)

  const body = req.body;
  //extract id para from req
  console.log(req.params); //{id:""}
  const id = req.params.id;
  //find document with match extract id
  BlogModel.findOne({ _id: id })
    .then((result) => {
      result.title = body.title;
      result.snippet = body.snippet;
      result.body = body.body;
      result
        .save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  //body
});

//========================updating ising model.update()=======================================
//updateOne()
//updateMany()
app.put("/blog/:id", (req, res) => {
  const id = req.params.id;
  const content = req.body;
  options = {
    //upsert: false,
    //multi: false,
    new: true, //to return updated or new document//if not set this true it will return original document
  };
  // BlogModel.updateOne({ _id: id }, content) //it is updated doc in database but not retuen the doc it will retuen obj (report obj)
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   }); //update according to filter object but it return object with some fields
  /*
{
    "acknowledged": true,
    "modifiedCount": 1,//modefided in db
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
  */
  // BlogModel.findOneAndUpdate({ _id: id }, content, options)
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  BlogModel.findByIdAndUpdate(id, content, { new: true }) //to return new updated doc
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//if i want to update according to title not id

app.put("/blo/:title", (req, res) => {
  const title = req.params.title;
  const content = req.body;

  BlogModel.findOneAndUpdate({ title: title }, content, { new: true }) //return updated obj
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//destructuring

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body; //extract title/body from req body obj
  BlogModel.findByIdAndUpdate(id, { title, body }, { new: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/*
handle delete requests

delete===> /blogs/:id
-extract route para fron req url
-then using 
*/

app.get("/deleted", (req, res) => {
  BlogModel.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  BlogModel.findByIdAndDelete(id)
    .then((result) => {
      res.send(result); //deleted document
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", {
    root: __dirname,
  });
});

//requests types:
/*
-get requests :to get resorse from the server (request data from server)
-post request: create new data in our databsase(web form and hit submit that mean we send a post request to the server with a new data and it can added to database)
-delet request:delete data (foe example delete a document from database )
-put request:update exesting data

*restful APIs/services
client-server architecture 
-app it self is the client (front-end)
-back-end(server)==>getting /saving data 
-communication between front-end and back-end happens using **Http protocol**(hyper text transfer protocol)
-server expose a bunch of services that are accessible via http ptotocol
-so client can then directly call the services by sending http requests 
-RESt===>(representational state transfer)==>(a convention of building http services )
-so in server we use simple http protocol priniciples to provide support to (create , read , update , delete) data (crud operations )


*example
-in server (we shouls expose a service at an end point like this)
http://companyName/api/customers
-so from client send http request to this endpoint (to talk to our service)

*endpoints:
-adress can start with http/https that depends on the application and it's requirements 
 ---if you want data exchange in secure channel use https 
-after http/https we have domain name (domain of the application)
-/api==>many companies use this in endpoint to indicate/expose their restful services (include woed api )
(can be after domain name or before ) 
-customers===>this is refer to a collection of customers in application in restful world we refer to this part 
as a resourse 
-all opreation around customers /collection /resourse such as (create/read/update/delete customer/resourse ) is done by sending http request to the endpoint 
-the type of the http request determines the kind of operation 
-so every http request has a verb/method that determine it's type

*get/getting data
*post/creating data
*update/update data
*delete/delete data

*examples:
get resorses/get customers 
-to get list of  all customers 
1.send http get request from (client/browser) to the adress (endpoint)
get ===> api/customers
2.server will handle request send back a response(array of customer objects(documents)) 

get single customer 
1.make get request to endpoint 
get api/customer/:id
2.then server responed by sending us customer object /document

update exist document/customer
1.send put http request to endpoint (/api/customer/:id)
but also whe send object in the body of the request ===>(complete representation of custpmerobject with update proparties )
2.then server responsed and updating document/customer with the giving id 

delete customer
1.sned delete request 
delete api/customer/:id
2.server responsed wth delete customer with the giving id 


create a document/customer
1.send post http request to the endpoint 
post api/customers
(working with customers collection / add new customer doc in the collection )
we should send object in the body of the request 
2.server gets this object and creates a customer/document for us 

//restful convention ==>expose our resources like customers using a simple meaningful address and support various operation around them such as (creating/reading/updating/deleting..) using standered http methods 


**handelong http requests in server 
, create REST route handlers for each of the REST Methods that properly calls the correct CRUD method from the matching data model.






























*/
