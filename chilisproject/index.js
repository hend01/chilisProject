const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;
const userRoute = require("./routes/userRoute");
const itemroute = require("./routes/itemRoute");

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost/chilis', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use("/api",userRoute);
app.use("/api",itemroute);


