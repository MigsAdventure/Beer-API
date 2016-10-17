import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveRandomBeer (beerResults) {
    console.log('serverActions: ', beerResults)
    AppDispatcher.dispatch({
      type: 'RECEIVE_RANDOM_BEER',
      payload: { beerResults }
    });
  },

  receiveSampled (sampled) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_SAMPLED',
      payload: {sampled}
    });
  },

  receiveNotSampled (notSampled) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_NOT_SAMPLED',
      payload: {notSampled}
    });
  },

};
export default ServerActions;
