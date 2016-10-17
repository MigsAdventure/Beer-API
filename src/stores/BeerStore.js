import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _beerResults = [];
let _sampled = [];
let _notSampled = [];

class BeerStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'RECEIVE_RANDOM_BEER': {
          let { beerResults } = action.payload;
          _beerResults = beerResults;
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_SAMPLED': {
          let {sampled} = action.payload;
          _sampled = sampled;
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_NOT_SAMPLED': {
          let {notSampled} = action.payload;
          _notSampled = notSampled;
          this.emit('CHANGE');
        } break;
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getBeerResults () {
    return _beerResults;
  }

  getSampledBeer () {
    return _sampled;
  }

  getUnsampledBeer () {
    return _notSampled;
  }

}

export default new BeerStore();
