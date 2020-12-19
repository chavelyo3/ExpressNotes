const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.static('./'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/api_routes")(app);
require("./routes/html_routes")(app);

app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
});