import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

export const login = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'El email es requerido' });
    }

    const payload = { email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
        mensaje: 'Autorización exitosa',
        token
    });
};