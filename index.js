const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(express.json());
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qhvkztn.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
const userCollection = client.db('aircnc').collection('users')
const roomsCollection= client.db('aircnc').collection('rooms')
const bookingCollection= client.db('aincnc').collection('bookings')



app.put('/user/:email', async(req, res)=> {
  const email = req.params.email
  const user = req.body
  const query = {email: email}
  const options = {upsert: true}
  const updateDoc = {
    $set: user
  }
  const result = await userCollection.updateOne(query,updateDoc, options)
  res.send(result)
})






    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
app.get("/", (req, res) => {
  res.send("hello world");
});
