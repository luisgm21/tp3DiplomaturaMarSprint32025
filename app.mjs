import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');

connectDB();

app.use('/api', superHeroRoutes);

app.use((req, res) => {
    res.status(404).send({message: 'Ruta no encontrada'});
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});