import { log } from 'console';
import 'dotenv/config';


const PORT = process.env.PORT || 3000;

function ejecutarServidor(){
    console.log(`Servidor iniciado en el puerto ${PORT}`);
}

ejecutarServidor()