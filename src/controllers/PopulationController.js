const { PopulationService } = require('../services');

class PopulationController {
    async getAllPopulations(_req, res) {
        const users = PopulationService.getAllPopulations();
        res.json(users);
    }

    async getPopulationById(req, res) {
        const user = PopulationService.getPopulationById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'Population not found' });
        }
        res.json(user);
    }

    async createPopulation(req, res) {
        const { province, population } = req.body;
        const user = PopulationService.createPopulation(province, population);
        res.status(201).json({
            message: 'Population created successfully',
            user,
        });
    }

    async updatePopulation(req, res) {
        const user = PopulationService.updatePopulation(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'Population not found' });
        }
        res.json(user);
    }

    async deletePopulation(req, res) {
        const user = PopulationService.deletePopulation(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Population not found' });
        }
        res.json({ message: 'Population deleted successfully' });
    }
}

module.exports = new PopulationController();
