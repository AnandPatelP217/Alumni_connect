require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
const cron = require('./scheduler/auto_alumni_transition')

// lets solve cors policy 
const corsOptions = {
    origin:"*",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
}

const authRoute = require('./router/auth');
const studentRoute = require('./router/student');
const adminRoute = require('./router/admin');
const alumniRoute = require('./router/alumni');
const meetingRoute = require('./router/meeting');
const vacancyRoute = require('./router/vacancy');

app.use(cors(corsOptions)); 

app.use(express.json());//express middleware it will make server handle json files

app.use("/api/v1/auth",authRoute); 
app.use('/api/v1/student',studentRoute);
app.use('/api/v1/admin',adminRoute);
app.use('/api/v1/alumni',alumniRoute);
app.use('/api/v1/meeting',meetingRoute);
app.use('/api/v1/vacancy',vacancyRoute);

app.use(errorMiddleware);


const PORT = process.env.PORT;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    });
});
