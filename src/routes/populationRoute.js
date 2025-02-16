const express = require('express');
const { PopulationController } = require('../controllers'); 
const validate = require('../middleware/validate');
const { populationSchema } = require('../validations/validationSchema');

const router = express.Router();

router.get('/', PopulationController.getAllPopulations);
router.get('/:id', PopulationController.getPopulationById);
router.post('/', validate(populationSchema), PopulationController.createPopulation);
router.put('/:id', validate(populationSchema),  PopulationController.updatePopulation);
router.delete('/:id', PopulationController.deletePopulation);

module.exports = router;
