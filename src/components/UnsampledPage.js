import React, { Component } from 'react';
import BeerActions from '../actions/BeerActions';
import BeerStore from '../stores/BeerStore';
import uuid from 'uuid';
import API from '../API';

export default class UnsampledPage extends Component {
  constructor () {
    super();

    this.state = {
      unsampledBeer: BeerStore.getUnsampledBeer()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    API.fetchUnsampledBeer();
    BeerStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    BeerStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      unsampledBeer: BeerStore.getUnsampledBeer()
    });
  }

  deleteUnsampled (id) {
    console.log('id unsampledBeer: ', id);
    BeerActions.deleteToWatch(id);
  }

  render () {
    let { unsampledBeer } = this.state;
    console.log('unsampledBeer component: ', unsampledBeer);
    return (
      <div className='componentContainer'>
        <h1>Unsampled Beer</h1>
        <div>
          {
            unsampledBeer.map((beer) => {
              <h4>{beer.name}</h4>
              <div className={`modal fade bs-example-modal-md${beer.beerId} firstLevelModal`} tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
                <div className='modal-dialog modal-md secondLevelModal' role='document'>
                  <div className='modal-content thirdLevelModal'>
                    <div className='modalPicContainer fourthLevelModal' >
                        <h3 className='headings title'><b>{beer.name}</b></h3>
                      </div>
                      <button className='delBtn btn btn-danger' onClick={this.deleteUnsampled.bind(this, beer.beerId)} data-dismiss='modal'>Delete</button>
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
