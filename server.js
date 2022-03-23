const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const axios = require('axios');
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const requestRoutes = require('./routes/request');
const cors = require('cors');
require('dotenv').config()

app.use(express.json({ extended: false }))

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
}).then(() => console.log('DB Connecetd'))


//middlewares
app.use(morgan('dev'))
app.use(cors())

//api routes
app.use('/api',authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes)
app.use('/api', requestRoutes)

app.use(cookieParser)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))