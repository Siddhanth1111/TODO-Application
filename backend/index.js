// write basic express boilerplate code
// with express.json() middleware

const express = require("express");
const { createTodo, updateTodo } = require("./types");
const todo = require("./db");
const app = express();
app.use(express.json());
const cors = require("cors");

// to limit who can fetch the data we can use origin
// app.use(cors({
//     origin : "http://localhost:5173"
// })); 
//for now we will apply it for all

app.use(cors());


//body{
    // title : String,
    // description : String
//}
app.post("/todos",async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong input"
        })
        return;
    }

    //put it in mongodb
    await todo.create({
        title : createPayload.title,
        description  : createPayload.description,
        completed : false
    })

    res.json({
        msg : "Todo created successfully"
    })

})

app.get("/todos",async (req,res)=>{
    const allTodos = await todo.find({});
    res.json({
        todos : allTodos
    })
})

app.put("/completed",async (req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        })
        return;
    }
    
    await todo.updateMany({
        _id : req.body.id
    },{
        completed : true
    })

    res.json({
        msg : "Task complete ho gya hehe"
    })
    
})


app.listen(3000);