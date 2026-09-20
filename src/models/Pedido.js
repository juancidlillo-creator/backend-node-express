import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1
        }
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
        defaultValue: 'pendiente'
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'usuarios', key: 'id'},
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'pedidos',
    timestamps: true
});

export default Pedido;
