const express = require('express');
const app = express();
const PORT = 3624;

app.get("api/get", (req, res) => {
    res.end("Hello World");
});
app.listen(PORT, () => {
    console.log("Server is started!");
    console.log('http://' + "localhost" + `:${PORT}`);
});
