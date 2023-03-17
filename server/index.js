const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db.js');
const {errorHandler} = require('./middleware/errorMiddleware.js');

const PORT = process.env.PORT || 5000;


dotenv.config();
db();
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cookieParser());

app.use(express.json());

app.use('/api/users', require('./routes/userRoute'));
app.use('/api/company', require('./routes/companyRoute'));
app.use('/api/product', require('./routes/productRoute'));

app.use(errorHandler);

app.listen(PORT , () => {
    console.log(`Server started on port ${PORT}`);
})


