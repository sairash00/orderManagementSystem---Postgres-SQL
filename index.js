import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 3000;
console.log(PORT);

// connectDB().then(() => {
//     console.log('Database connected successfully');
// }).catch((error) => {
//     console.error('Database connection failed: ', error);
// })

app.listen(PORT, () => {
    console.log('server start on port', PORT);
});