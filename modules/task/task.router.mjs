// import libraries
import express from "express";
import taskModel from './task.model.mjs';
import raw from '../../middleware/route.async.wrapper.mjs';
// create router object
const router = express.Router();

// apply middleware to router
router.use(express.json()); // enable json parsing on incoming requests body

// define routing functions

// GET ALL TASKS
router.get('/', async (req,res)=> {
    const tasks = await taskModel.find();
   res.status(200).json(tasks);
});

// GET TASK by ID
router.get('/:id', raw( async (req,res)=> {
   const task = await taskModel.findById(req.params.id);
   res.status(200).json(task)
}));


// CREATE TASK 
router.post('/', raw(async (req,res,next)=> {
    const task = await taskModel.create(req.body);
    res.status(200).json(task)
}));

// UPDATE REPLACE TASK 
router.put('/:id', raw(async (req,res)=> {
    const task = await taskModel.findByIdAndUpdate(req.param.id,req.body,{
        new: true, upsert: false
    })
   res.status(200).json(task);
}));

// UPDATE MERGE TASK 
router.patch('/:id', async (req,res)=> {
    const task = await taskModel.findByIdAndUpdate(req.param.id,req.body,{
        new: true, upsert: false
    })
   res.status(200).json(task);
});

// DELETE TASK 
router.delete('/:id', async (req,res)=> {
   const task = await taskModel.findByIdAndRemove(req.param.id)
   res.status(200).json(task);
});



export default router;