import mongoose from "mongoose";
const {Schema ,model} = mongoose;

const TaskSchema = new Schema({
    title: { type: String, required : true },
    done: { type: Boolean, default: false },
}, {timestamps:true})


export default model('task', TaskSchema);