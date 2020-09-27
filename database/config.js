const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("BD Conectada");
    // mongoose.connect("mongodb://localhost:27017/test", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
  } catch (error) {
    console.log("Error en la bd: ", error);
    throw new Error("Error en a bd");
  }
};

module.exports = {
  dbConnection,
};
