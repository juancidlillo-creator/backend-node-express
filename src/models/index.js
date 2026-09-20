import sequelize from '../config/db.js';
import Usuario from './Usuario.js';
import Pedido from './Pedido.js';

// Definición de Relaciones (1:N)
// Un usuario puede tener muchos pedidos
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId', as: 'pedidos', onDelete: 'CASCADE'});

// Cada pedido pertenece a un usuario
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario'});

export { sequelize, Usuario, Pedido};
