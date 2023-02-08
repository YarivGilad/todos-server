// import libraries
import log from '@ajar/marker';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {connectDB} from './db/mongoose.connection.mjs'
import taskRouter from './modules/task/task.router.mjs'


//environment variables
const {PORT, DB_URI_LOCAL, DB_URI_REMOTE, NODE_ENV} = process.env;

//set a different db uri per environment 
const DB_URI = NODE_ENV === 'production' ? DB_URI_REMOTE : DB_URI_LOCAL;

log.yellow('--------------------------------->')
log.cyan(`NODE_ENV`,`✨ ${NODE_ENV} ⚡`); 

//define express app
const app = express();

// apply middleware
app.use(cors());
app.use(morgan('dev'));

// routing
app.use('/api/tasks', taskRouter);

app.use((err,req,res,next)=> {
   res.status(500).json({message:err.message});
})

app.use('*',(req,res)=> {
    res.status(404).json({message: `endpoint ${req.url} was not found`})
})

//make the app listen on port...
// app.listen(PORT, ()=> {
//     connectDB(DB_URI);
//     log.magenta(`listening on`,` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`); 
// }) 


;(async ()=> {
    await connectDB(DB_URI);
    await app.listen(PORT);
    log.magenta(`listening on port`,` ✨ ⚡ ${PORT} ✨ ⚡`); 
    log.yellow('--------------------------------->')
})()
