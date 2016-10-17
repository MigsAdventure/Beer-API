import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  receiveRandomBeer (beer) {
    axios.get(`/api/beer/random`)
    .then((res) => {
      ServerActions.receiveRandomBeer(res.data);
    })
    .catch((err) => {
      console.log('ERROR! API.receiveRandomBeer', err);
    });
  },

  addNotSampled (beer) {
    axios.post('/api/beer/notSampled', beer)
      .then((res) => {
        ServerActions.receiveUnsampledList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.addNotSampled', err);
      });
  },

  addSampled (beer) {
    axios.post('/api/beer/sampledList', beer)
      .then((res) => {
        console.log('new beer received AddSample:', res)
        ServerActions.receivesampled(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.addSampled', err);
      });
  },

  fetchSampledList () {
    axios.get('/api/beer/sampled')
      .then((res) => {
        ServerActions.receiveSampledList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchSampled', err);
      });
  },

  fetchUnsampledList () {
    axios.get('/api/beer/unsampledList')
      .then((res) => {
        ServerActions.receiveUnsampledList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchWatchList', err);
      });
  },

  deleteSampled (id) {
    axios.delete(`/api/beer/sampledList?id=${id}`)
      .then((res) => {
        API.fetchSampledList();
      })
      .catch((err) => {
        console.log('ERROR! API.deleteSampled', err);
      });
  },

  deleteUnsampled (id) {
    axios.delete(`/api/beer/unsampledList?id=${id}`)
      .then((res) => {
        API.fetchUnsampledList();
      })
      .catch((err) => {
        console.log('ERROR! API.deleteUnsampled', err);
      });
  },


};

export default API;
