
const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      checkForSession = require('./middlewares/checkForSession'),
      swag = require('./controllers/swag_controllers'),
      auth_controller = require('./controllers/auth_controller'),
      cart_controller = require('./controllers/cart_controller'),
      search_controller = require('./controllers/search_controller')

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))
app.use(checkForSession)
app.use( express.static( `${__dirname}/../build`))

app.get('/api/swag', swag.read);
app.get('/api/user', auth_controller.getUser);
app.get('/api/search', search_controller.search)
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
