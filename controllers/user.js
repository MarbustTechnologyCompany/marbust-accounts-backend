const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const { Role, createDefaultRoles } = require('../models/role');
const User = require('../models/user');
const UserCredential = require('../models/userCredential');

let rolesChecked = false;

const checkAndCreateRoles = async () => {
    if (!rolesChecked) {
        const roles = await Role.findAll();
        if (roles.length === 0) {
            await createDefaultRoles();
        }
        rolesChecked = true;
    }
};

exports.register = async (req, res) => {
    try {
        await checkAndCreateRoles();
        const { firstName, lastName, email, phone, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Crear usuario
        const user = await User.create({ firstName, lastName, email, phone });

        // Encriptar contraseña y crear credenciales de usuario
        const hashedPassword = await bcrypt.hash(password, 12);
        await UserCredential.create({ userId: user.id, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        await checkAndCreateRoles();
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // Verificar contraseña
        const userCredential = await UserCredential.findOne({ where: { userId: user.id } });
        const isPasswordValid = await bcrypt.compare(password, userCredential.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Wrong password.' });
        }

        // Generar token JWT
        const token = jwt.sign({ userId: user.id, roleId: user.roleId },  config.jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Fetching profile failed.' });
    }
};