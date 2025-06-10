import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import reportRoute from './routes/report.route.js'
import usuarioRoute from './routes/usuario.route.js'
import morgan from 'morgan';
import cors from 'cors';
import extraerUbicacion from './routes/ubicacion.route.js';


const app = express();
const PORT = 3000;


app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', reportRoute);
app.use('/api', usuarioRoute);

app.use('/api', extraerUbicacion);
// app.use('/api',extraerUbicacion);


app.get('/', (req, res) => {
    res.send('<h1>GEOCRIMEN</h1>')
})

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto: ${PORT}`);
})
