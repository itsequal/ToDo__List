var express = require('express')
var app = express()
var cors = require('cors');
var bodyParser = require('body-parser');
const ws = require('ws');
const wsc = new ws.Server({
  port: 3000
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var port = process.env.PORT || 1339;

require('./routes/routes.js')(app);

app.get("/api", (req, res) => {
  res.json({
    message: "API working"
  });
});

app.listen(port, (err) => {
  if (err) console.log('Error in setup');
  console.log('Server listening on port', port);
});

var conexiones = new Array();

wsc.on("connection", ws => {
  conexiones.push(ws);
  console.log("nueva conexion"); 

  ws.on("message", event => {
    console.log("eventou" + event);
        conexiones.forEach(env => {
          env.send(event);
        })
  });
});