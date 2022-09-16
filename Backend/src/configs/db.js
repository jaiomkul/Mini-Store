const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://jpg:jpg123@cluster0.wsmkwff.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = connect;
