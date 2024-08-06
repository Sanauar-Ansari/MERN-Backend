const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://sanauaransari99:chand12345@cluster0.eaao2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// "mongodb+srv://sanauaransari99:sanauar12345@cluster0.acjsjqi.mongodb.net/";
// "mongodb+srv://sanauaransari99:sanauar12345@cluster0.acjsjqi.mongodb.net/foodmenia?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Successfully connected with database, yehhhhh!!!");
    //Fetched the data of food_items collection
    const fetch_data = mongoose.connection.db.collection("food_items");
    const data = await fetch_data.find({}).toArray();
    global.food_items = data;
    //Fetched the data of foodCategory collection
    const fetch_dataTwo = mongoose.connection.db.collection("foodCategory");
    const dataTwo = await fetch_dataTwo.find({}).toArray();
    global.foodCategory = dataTwo;
    // console.log(global.foodCategory);
  } catch (err) {
    console.log(
      "-----There is a problem while connecting to database-----" + err
    );
  }
};

module.exports = mongoDB;
