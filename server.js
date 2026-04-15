const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const EnquiryRoute = require('./routes/enquiryRouter');
const projectRouter = require('./routes/projectRoute');
const AuthRouter=require('./routes/authRouter')

app.use(cors({
    origin: ["https://sparkly-sunshine-f6f57b.netlify.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(express.json());

app.use((err, req, res, next) => {
  console.log("🔥 GLOBAL ERROR");
  console.log(err);

  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

app.use('/api', EnquiryRoute);
app.use('/api', projectRouter);
app.use('/api',AuthRouter)

const port = process.env.PORT || 5009;

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});