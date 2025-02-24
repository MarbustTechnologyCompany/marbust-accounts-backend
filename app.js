require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database.util');
const authMiddleware = require('./middleware/auth.middleware');

// Import Routes
const defaultRoutes = require('./modules/default/routes/default.routes');
const userRoutes = require('./modules/users/routes/user.routes');
const systemRoutes = require('./modules/users/routes/system.routes');
const mbrelaxRoutes = require('./modules/mbrelax/routes/healthApp.routes');
const systemUpdateRoutes = require('./modules/system-updates/routes/systemUpdate.routes');
const marbustEducationCoursesRoutes = require('./modules/education/routes/courses.routes');
const marbustComputersMaintenanceRoutes = require('./modules/computers/routes/maintenance.routes');

const app = express();
// Setup Cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// App Routes
app.use(defaultRoutes);
app.use('/users',userRoutes);
app.use('/system', authMiddleware, systemRoutes);
app.use('/system-updates', authMiddleware, systemUpdateRoutes);
app.use('/mbrelax', mbrelaxRoutes);
app.use('/marbust-education/courses', marbustEducationCoursesRoutes);
app.use('/marbust-computers/maintenance', authMiddleware, marbustComputersMaintenanceRoutes);

// Sync Database and start server
sequelize.sync({ alter: true })
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });