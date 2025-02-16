const {PopulationRepositories} = require('../repositories');
const {Population} = require('../models');

let populationCounter = 1

class PopulationService {
  getAllPopulations() {
    return PopulationRepositories.getAll();
  }

  getPopulationById(id) {
    return PopulationRepositories.getById(id);
  }

  createPopulation(province, population) {
    const id = `Data ${populationCounter++}`
    const populations = new Population(id, province, population);

    return PopulationRepositories.create(populations);
  }

  updatePopulation(id, PopulationData) {
    return PopulationRepositories.update(id, PopulationData);
  }

  deletePopulation(id) {
    return PopulationRepositories.delete(id);
  }
}

module.exports = new PopulationService();
