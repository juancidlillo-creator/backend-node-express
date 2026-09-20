import { Op } from 'sequelize';
import Usuario from '../models/Usuario.js';


// GET /usuarios

export const ObtenerUsuarios = async (req, res) => {
    try {
        const { nombre } = req.query;

        // Si viene req.query.nombre, creamos el filtro con Op.iLike (insensible a mayúsculas/minúsculas)
        const donde = nombre
        ? { nombre: { [Op.iLike]: `%${nombre}%` } }
        : {};

        const usuarios = await Usuario.findAll({
        where: donde,
        attributes: { exclude: ['password'] }
        });

        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
    }
};

// GET /usuarios/:id
export const obtenerPorIdUsuarios = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id, {
        attributes: { exclude: ['password'] }
        });

        if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error);
        res.status(500).json({ mensaje: 'Error al obtener el usuario', error: error.message });
    }
};

// POST /usuarios
export const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const existeEmail = await Usuario.findOne({ where: { email } });
        if (existeEmail) {
        return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        const nuevoUsuario = await Usuario.create({ nombre, email, password });

        const { password: _, ...usuarioSinPassword } = nuevoUsuario.toJSON();

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: usuarioSinPassword });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ mensaje: 'Error al crear el usuario', error: error.message });
    }
};

