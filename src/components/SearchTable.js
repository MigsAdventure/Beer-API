import React, { Component } from 'react';
import BeerActions from '../actions/BeerActions';
import BeerStore from '../stores/BeerStore';

export default class SearchTable extends Component {
  constructor () {
    super();

    this.state = {
      beerResults: BeerStore.getBeerResults(),
    };

    this._onChange = this._onChange.bind(this);
    this.addSampled = this.addSampled.bind(this);
    this.addNotSampled = this.addNotSampled.bind(this);
  }

  componentWillMount () {
    BeerStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    BeerStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      beerResults: BeerStore.getBeerResults(), 
    });
  }

  addSampled (beer) {
    console.log('table Results to send:',beer)
    BeerActions.addSampled(beer);
  }

  addNotSampled (beer) {
    BeerActions.addNotSampled(beer);
  }

  render () {
    let { beerResults } = this.state;
    return (
      <div className='compContainer'> 
        <div className='randomBeerContainer'>
          <h2>{beerResults.data.name}</h2>
        </div>    
        <div className='btnContainer'>
          <button className='btn btn-primary' onClick={this.addSampled.bind(null, beerResults)}>Sampled</button>
          <button className='btn btn-success' onClick={this.addNotSampled.bind(null, beerResults)}>Not Sampled</button>
        </div>
      </div>
    );
  }
}
