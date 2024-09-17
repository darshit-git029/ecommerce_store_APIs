//express configration
const express = require('express');
const app = express();

//swagger configration
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentOne = require('./swagger/swagger-product.json');
const swaggerDocumentTwo = require('./swagger/swagger-user.json')
const swaggerDocumentthree = require('./swagger/swagger-cart.json')
var options = {};
app.use('/api-product', swaggerUi.serveFiles(swaggerDocumentOne, options), swaggerUi.setup(swaggerDocumentOne));
app.use('/api-user', swaggerUi.serveFiles(swaggerDocumentTwo, options), swaggerUi.setup(swaggerDocumentTwo));
app.use('/api-cart', swaggerUi.serveFiles(swaggerDocumentthree, options), swaggerUi.setup(swaggerDocumentthree));

//bodyParser 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cookies-parser configration
const cookieparser = require("cookie-parser")
app.use(cookieparser())

//routes configration
const productRouter = require('./routes/product.route')
const categoryRouter = require("./routes/category.route");
const userRouter = require('./routes/user.route')
const cartRouter = require('./routes/cart.route')
app.use('/api', productRouter)
app.use('/api', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api',cartRouter)

//define port 
const port = process.env.port;

//port listening
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
