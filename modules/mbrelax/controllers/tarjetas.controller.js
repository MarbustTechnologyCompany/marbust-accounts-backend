const MBRelaxProvincias = require('../models/Provincia.model');
const MBRelaxCiudades = require('../models/Ciudad.model');


// Get All the Cities
exports.getCiudades = async (req, res) => {
    try {
        const ciudades = await MBRelaxCiudades.findAll();
        res.status(200).json(ciudades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud', serverReport: error});
    }
}

// Get All the Cities by Province
exports.getCiudadesByProvincia = async (req, res) => {
    const { idProvincia } = req.params;
    try {
        const ciudades = await MBRelaxCiudades.findAll({
            where: {
                provinciaId: idProvincia
            }
        });
        res.status(200).json(ciudades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud', serverReport: error});
    }
}

// Get All the Provinces
exports.getProvincias = async (req, res) => {
    try {
        const provincias = await MBRelaxProvincias.findAll();
        if (!provincias) {
          // Return empty array if no provinces found
          return res.status(200).json([]);
        }
        // Return an array of provinces with the id and name
        const result = provincias.map(provincia => {
          return {
            id: provincia.id,
            name: provincia.name
          };
        });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud', serverReport: error});
    }
}