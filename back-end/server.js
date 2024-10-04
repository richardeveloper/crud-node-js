const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRoutes = require('./main/routes/productRoutes');
const userRoutes = require('./main/routes/userRoutes');
const orderRoutes = require('./main/routes/orderRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
