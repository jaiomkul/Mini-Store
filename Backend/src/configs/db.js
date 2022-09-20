const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://jpg:jpg123@ok.dxdgipu.mongodb.net/mini?retryWrites=true&w=majority"
  );
};

module.exports = connect;
