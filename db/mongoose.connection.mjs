import mongoose from 'mongoose';
import log from '@ajar/marker';

export const connectDB = async (uri)=> {
    mongoose.set("strictQuery", false);
    
    await mongoose.connect(uri);
    log.magenta(' ✨  Connected to Mongo DB ✨ ');
    
    // --> Optional config object
    /* 
    await mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,   
    });
    log.magenta(' ✨  Connected to Mongo DB ✨ ')
     */

    // --> Old callback syntax
    /* 
    mongoose.connect(uri,()=> log.magenta(' ✨  Connected to Mongo DB ✨ ')); 
    */
}