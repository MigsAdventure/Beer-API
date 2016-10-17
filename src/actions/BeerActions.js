import API from '../API';

const BeerActions = {
  getRandomBeer (beer) {
    API.receiveRandomBeer(beer);
  },

  addNotSampled (beer) {
    API.addNotSampled(beer);
  },

  addSampled (beer) {
    API.addSampled(beer);
  },

  deleteSampled (id) {
    API.deleteSampled(id);
  },

  deleteNotSampled (id) {
    API.deleteNotSampled(id);
  }
};

export default BeerActions;
