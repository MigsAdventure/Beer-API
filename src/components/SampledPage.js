import React, { Component } from 'react';
import BeerActions from '../actions/BeerActions';
import BeerStore from '../stores/BeerStore';
import API from '../API';
import uuid from 'uuid';

export default class SampledPage extends Component {
  constructor () {
    super();

    this.state = {
      sampledBeer: BeerStore.getSampledBeer()
    };

    this._onChange = this._onChange.bind(this);
    this.deleteSampled = this.deleteSampled.bind(this);
  }

  componentWillMount () {
    API.fetchSampledBeer();
    BeerStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    BeerStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      sampledBeer: BeerStore.getSampledBeer()
    });
  }

  deleteSampled (id) {
    BeerActions.deleteSample(id);
  }

  render () {
    let { sampledBeer } = this.state;
    console.log('sampledBeer component: ', sampledBeer);
    return (
      <div className='componentContainer'>
        <h1>Sampled Beer</h1>
        <div>
          {
            sampledBeer.map((beer) => {
              <h4>{beer.name}</h4>
              <div className={`modal fade bs-example-modal-md${beer.beerId} firstLevelModal`} tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
                <div className='modal-dialog modal-md secondLevelModal' role='document'>
                  <div className='modal-content thirdLevelModal'>
                    <div className='modalPicContainer fourthLevelModal' >
                        <h3 className='headings title'><b>{beer.name}</b></h3>
                      </div>
                      <button className='delBtn btn btn-danger' onClick={this.deleteSampled.bind(this, beer.beerId)} data-dismiss='modal'>Delete</button>
                  </div>
                </div>
              </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
