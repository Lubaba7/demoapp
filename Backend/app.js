// Import express
const express = require("express")
const mysql2 = require("mysql2")
const app = express()
const cors = require("cors")
app.use(cors())

const port = 5000;

// connect server with database
let dbConfig = {
        database: "demoapp",
        user: "demoapp",
        host: "localhost",
        password: "demoapp"
}

let connection = mysql2.createConnection(dbConfig)

connection.connect((err)=> {
    if(err) throw err;
    console.log("MYSQL Connected...");
})

app.use(express.json())

app.post("/add-employee", (req, res) => {
    const {first_name, last_name, email, password} = req.body
    console.log(first_name);
    const sql = `INSERT INTO employ_test(first_name, last_name,	email, password) VALUES ("${first_name}", "${last_name}", "${email}", "${password}")` ;


    connection.query(sql, (err, result)=>{
        if(err) throw err;
        console.log("data successfully iserted");
    })
    
    
    const response = {
        status: "success",
        message: "Employee add successfully"
    }

    res.status(201).json(response)
})







app.listen(port, (err, result) => {
    if(err){
        console.log(err);
    }else{
        console.log("Server is running on port: 5000");
    }
})