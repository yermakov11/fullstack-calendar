require('dotenv').config();
const express = require("express");
const cors = require("cors");
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const corsOptions = require('./middleware/corsOptions');
const connectDB = require('./db/connection');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));                              
app.use(express.json());                                 
app.use(express.urlencoded({ extended: true }));
app.use(logger);                                         
app.use('/api/events', require('./routes/eventRoutes')); 
app.use(notFound);                                       
app.use(errorHandler);                                   

const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error('Failed to connect to the database:', e);
        process.exit(1);
    }
};

start();