const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

app.use(cors());
app.use(express.json());

//create
app.post("/todos", async (req, res) => {
    try{
        const { title } = req.body;
        const { end_date } = req.body;
        const { description } = req.body;
        const { create_date } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (title, end_date, description, create_date) VALUES($1) RETURNING * ",
        [title, end_date, description, create_date]
        
        );

        res.json(newTodo.rows[0]);
    }catch (err){
        console.error(err.message);
    }
});
//get all
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})
//get single
app.get("/todos/:id", async(req, res) => {
    try {
        const {id} =req.params;
        const todo= await pool.query("SELECT * FROM todolist WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
})
//update
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {title} = req.params;
        const {end_date} = req.params;
        const {description} = req.params;
        const {create_date} = req.params;
        const updateTodo = await pool.query("UPDATE todo SET title, end_date, description, create_date = $1 WHERE todo_id = $2", [title, end_date, description, create_date, id]);
        res.json("Todo was updated")
    } catch (err) {
        console.error(err.message);
    }
})
//delete
app.delete("/todos/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo was deleted");
    } catch (error) {
        console.error(err.message);
    }
})


app.listen(3000, ()=>{
    console.log("server has started on port 3000")
});