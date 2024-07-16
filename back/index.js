const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3624;

app.use(cors()); 

app.use('/api/get/todos', express.static(__dirname + '/data/todos.json'));

app.listen(PORT, () => {
    console.log("Server is started!");
    console.log('http://' + "localhost" + `:${PORT}`);
});

