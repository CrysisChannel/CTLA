const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 1000;

app.use(cors()); 

app.use('/api/get/todos', express.static(__dirname + '/data/todos.json'));

app.post("/api/post/todos", (req, res) => {
    if(!req.readable) res.sendStatus(400);
    let info = "";
    req.on('data', (data) => {
        info += data;
    });
    req.on('end', () => {
        fs.readFile(__dirname + `/data/todos.json`, (error, todos) => {
            if(error) {
                res.sendStatus(500);
                res.end();
            }
            let newInfo = todos.toString() ? JSON.parse(todos.toString()) : [];
            info = JSON.parse(info);
            if(info.id){
                newInfo.forEach((todo, index) => {
                    if(todo.id == info.id) newInfo[index].isCompleted = true;
                });
            }
            else if(info.content){
                info.id = newInfo.length;
                info.isCompleted = false;
                newInfo.push(info);
            }
            fs.writeFile(__dirname + `/data/todos.json`, JSON.stringify(newInfo), (error) => {console.log(error)});  // выводим считанные данные
            res.end();
        });
    });
}); 

app.listen(PORT, () => {
    console.log("Server is started!");
    console.log('http://' + "localhost" + `:${PORT}`);
});

