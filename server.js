import express from "express";
import bodyParser from "body-parser";
import './config/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger.js";
// routes
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


const app = express();
const port = 3000;

//middleware
app.use(bodyParser.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

