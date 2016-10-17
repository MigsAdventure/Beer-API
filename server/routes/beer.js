const express = require('express');
const router = express.Router();
const BeerModel = require('../models/BeerModel');

router.route('/random')
  .get((req, res) => {
    let randomBeer = req.query;
    BeerModel.getRandom(randomBeer, (err, random) => {
      res.status(err ? 400 : 200).send(err || random);
    });
  });

router.route('/unsampledList')
  .post((req, res) => {
    let beerNotSampled = req.body;
    BeerModel.addTounsampledList(beerNotSampled, (err, unsampledList) => {
      res.status(err ? 400 : 200).send(err || unsampledList);
    });
  })
  .get((req, res) => {
    BeerModel.readData('unsampled', (err, unsampled) => {
      res.status(err ? 400 : 200).send(err || unsampled);
    });
  })
  .delete((req, res) => {
    let id = req.query;
    console.log('req.query: ', req.query);
    BeerModel.deleteUnsampled(id, (err, deleteUnsampled) => {
      res.status(err ? 400 : 200).send(err || deletedUnsampled);
    });
  });

router.route('/sampledList')
  .post((req, res) => {
    let sampledBeer = req.body;
    console.log('req.body:', req.body)
    BeerModel.addSampled(sampledBeer, (err, sampled) => {
      res.status(err ? 400 : 200).send(err || sampled);
    });
  })
  .get((req, res) => {
    BeerModel.readData('sampledList', (err, sampled) => {
      res.status(err ? 400 : 200).send(err || sampled);
    });
  })
  .delete((req, res) => {
    let id = req.query;
    BeerModel.deleteSampled(id, (err, undeletedSamples) => {
      res.status(err ? 400 : 200).send(err || undeletedSamples);
    });
  });

module.exports = router;
