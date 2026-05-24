import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';

import { connectDB } from './config/dbconfig.mjs';

import paisRoutes from './routes/paisRoutes.mjs';

const app = express();

connectDB();
//leer datos enviados desde foremularios html
app.use(express.urlencoded({ extended: true }));
//configurar ejs
app.set('view engine', 'ejs');
//configurar json
app.use(express.json());
//ruta para los paises
app.use('/api/paises', paisRoutes);
//ruta principal
app.get('/', (req, res) => {

    res.redirect('/api/paises/dashboard');

});
//confi del archivo publicc de css
app.use(express.static('public'));
app.listen(3000, () => {
    console.log('Servidor funcionando');
});