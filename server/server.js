const dotenv = require('dotenv');

const app = require('./app');

// get access to config.env file
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});