import React, { Component } from 'react';
import BeerActions from '../actions/BeerActions';
import SearchTable from './SearchTable';
import API from '../API';

export default class SearchPage extends Component {
  constructor () {
    super();
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentWillMount() {
    BeerActions.getRandomBeer();
  }

  submitSearch (e) {
    e.preventDefault();
    BeerActions.getRandomBeer();
  }

  render () {
    return (
      <div className='componentContainer'>
        <h1>Get A Random Beer</h1>
        <form onSubmit={this.submitSearch} >
          <button className='btn btn-primary' >Random Beer</button>
        </form>
        <SearchTable />
      </div>
    );
  }
}
