const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

// get access to config.env file
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_URL.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
    );

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});