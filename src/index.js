const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to API Next application." });
});
app.use(cors());
require("./routers/user.routes")(app);
require("./routers/company.routes")(app);
require("./routers/master.routes")(app);
require("./routers/menu.routes")(app);
require("./routers/slider.routes")(app);
require("./routers/secondslider.routes")(app);
require("./routers/colume.routes")(app);
require("./routers/client.routes")(app);
require("./routers/abouts.routes")(app);
require("./routers/contact.routes")(app);

app.use(express.static('public'));
app.use('/public', express.static('public'));
// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});