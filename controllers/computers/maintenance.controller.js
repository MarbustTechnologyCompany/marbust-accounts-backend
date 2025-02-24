const sendEmail = require('../../services/sendEmail.service');

const Computer = require('../../models/computers/MarbustComputersComputer.model');
const Maintenance = require('../../models/computers/MarbustComputersMaintenance.model');
const MaintenanceType = require('../../models/computers/MarbustComputersMaintenanceType.model');


exports.getMyComputers = async (req, res) => {
    try {
        const computers = await Computer.findAll({
            where: {
                userId: req.userId
            }
        });
        res.status(200).json(computers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud', serverReport: error});
    }
}

exports.createComputer = async (req, res) => {
    // Get data from request body and userId from token
    const { name, computerType } = req.body;

    // Search if computer already exists
    const computerExists = await Computer.findOne({
        where: {
            name,
            computerType: computerType,
            userId: req.userId
        }
    });

    if (computerExists) {
        return res.status(400).json({ error: 'Ya existe un equipo con ese nombre y tipo' });
    }

    try {
        const newComputer = await Computer.create({
            name,
            userId: req.userId,
            computerType
        });

        res.status(201).json(newComputer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud', serverReport: error});
    }
}