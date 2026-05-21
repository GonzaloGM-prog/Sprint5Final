import mongoose from 'mongoose';

export async function connectDB() {
try {
    await mongoose.connect(
    'mongodb+srv://grupo-08:grupo-08@cluster0.blryo.mongodb.net/NodeMod3Cohorte5'
    ); 

    console.log('Conexión exitosa a MongoDB');
} catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
}
}
//Centralizar la configuración de conexión a MongoDB en dbConfig.mjs permite 
//tener un único punto de configuración