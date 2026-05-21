import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';

import { connectDB } from './config/dbconfig.mjs';

import paisRoutes from './routes/paisRoutes.mjs';

const app = express();

connectDB();

app.use(express.json());

app.use('/api/paises', paisRoutes);

app.listen(3000, () => {
    console.log('Servidor funcionando');
});