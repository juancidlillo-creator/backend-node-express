import Usuario from '../models/Usuario.js';

export const subirArchivo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'No se subió ningún archivo o el formato no es permitido.' 
            });
        }

        const filePath = `/uploads/${req.file.filename}`;
        let usuarioActualizado = null;

        // Si en el body envían el ID del usuario, le asociamos la foto
        const { usuarioId } = req.body;
        if (usuarioId) {
            const usuario = await Usuario.findByPk(usuarioId);
            if (usuario) {
                usuario.foto = filePath;
                await usuario.save();
                usuarioActualizado = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    foto: usuario.foto
                };
            }
        }

        res.status(200).json({
            success: true,
            message: 'Archivo subido exitosamente.',
            data: {
                filename: req.file.filename,
                url: filePath,
                usuario: usuarioActualizado || 'No se asoció a ningún usuario'
            }
        });

    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error interno al procesar el archivo.', 
            error: error.message 
        });
    }
};