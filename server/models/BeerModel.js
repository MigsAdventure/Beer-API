// const axios = require('axios');
const { get } = require('axios');
require('dotenv').load();
const connection = require('../config/db');
const squel = require('squel').useFlavour('mysql');

const sampledTable = 'sampledList';
const notSampledTable = 'notSampledList';

connection.query(`CREATE TABLE IF NOT EXISTS ${sampledTable} (
   name VARCHAR(100),
   beerId INT(200),
   id INT NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (id, name),
   UNIQUE(name)
)`, (err) => {
  if (err) throw err;
});

exports.getRandom = (randomBeer, cb) => {
  get(`http://api.brewerydb.com/v2/beer/random?key=c04230c4714f39b64e6fcf959d6fcbf5`)
    .then((res) => {
      cb(null, res.data);
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};

exports.addSampled = (sampled, cb) => {
  exports.readData(sampledTable, (err, sampled) => {
    if (err) throw err;
  });
  exports.create(sampledTable, sampled, cb);
};

exports.deleteSampled = (id, cb) => {
  let currId = parseInt(id.id);
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${sampledTable} WHERE beerId = ${currId}`, (err, undeletedSampled) => {
      if (err) return reject(err);
      exports.readData(sampledTable, (err, data) => {
        if (err) throw err;
        cb(null, data);
      });
    });
  });
};

exports.deleteNotSampled = (id, cb) => {
  let currId = parseInt(id.id);
  console.log('currId deleteNotSampled: ', currId);
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${notSampledTable} WHERE beerId = ${currId}`, (err, UndeletedNotSampled) => {
      if (err) return reject(err);
      exports.readData(notSampledTable, (err, data) => {
        if (err) throw err;
        cb(null, data);
      });
    });
  });
};

exports.addnotSampledList = (notSampled, cb) => {
  exports.readData(notSampledTable, (err, notSampledList) => {
    if (err) throw err;
    exports.create(notSampledTable, notSampled, cb)
  });
};

exports.readData = function (tablename, cb) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tablename}`, (err, data) => {
      if (err) return reject(err);
      // resolve(sampled);
      cb(null, data);
    });
  });
};

exports.create = (tablename, beer, cb) => {
  console.log('create: ', beer)
  let randomBeer = {
    beerId: beer.id,
    name: beer.name,
  };


  return new Promise((resolve, reject) => {
    let sql = squel.insert()
      .into(tablename) //  insert tablename
      .setFields(randomBeer)
      .toString();

    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
      exports.readData(tablename, (err, data) => { //  insert tablename
        if (err) throw err;
        cb(null, data);
      });
    });
  });
};
