import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import userRouter from './routes/user.route.js'
import reportRoute from './routes/report.route.js'
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/users', userRouter)
app.use('/api', reportRoute);

app.get('/', (req, res) => {
    res.send('<h1>GEOCRIMEN</h1>')
})

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto: ${PORT}`);
})
