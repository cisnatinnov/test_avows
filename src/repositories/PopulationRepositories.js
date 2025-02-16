class PopulationRepository {
  constructor() {
    this.populations = [];
  }

  getAll() {
    return this.populations;
  }

  getById(id) {
    return this.populations.find(population => population.id === id);
  }

  create(population) {
    this.populations.push(population);
    return population;
  }

  update(id, populationData) {
    const populationIndex = this.populations.findIndex(population => population.id === id);
    if (populationIndex === -1) return null;

    this.populations[populationIndex] = { ...this.populations[populationIndex], ...populationData };
    return this.populations[populationIndex];
  }

  delete(id) {
    const lastChar = id.slice(-1);
    const populationIndex = this.populations.findIndex(population => population.id.endsWith(lastChar));
    
    if (populationIndex === -1) return null;

    const deletedPopulation = this.populations.splice(populationIndex, 1);
    return deletedPopulation[0];
  }
}

module.exports = new PopulationRepository();
