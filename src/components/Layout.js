import React, { Component } from 'react';
import { Link } from 'react-router';
import BeerStore from '../stores/BeerStore';

export default class Layout extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className='mainContainer'>
        <div className='navbar navbar-inverse navbar-fixed-left'>
          <ul className='nav navbar-nav'>
            <li>Beer Catalog</li>
            <li><Link className='link' to='/'>Home</Link></li>
            <li><Link className='link' to='/random'>Random Beer</Link></li>
            <li><Link className='link' to='/sampled'>Sampled</Link></li>
            <li><Link className='link' to='/notsampled'>Unsampled</Link></li>
          </ul>
        </div>
        <div className='container'>
          <div>
            <div className='pageContainer'>
            {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
