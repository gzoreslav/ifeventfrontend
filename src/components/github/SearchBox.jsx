'use strict';

import React from 'react';
import ProfileList from './ProfileList.jsx';
import Spinner from '../common/Spinner.jsx';

import github from '../../services/github.js';

import localStorageWrapper from '../../services/localStorageWrapper.js';

export default class SearchBox extends React.Component {
  constructor(props){

    super(props);

    //init context bindings - due to diff between React.createClass and ES6 class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._getInitialState = this._getInitialState.bind(this);

    //init state
    this.state = this._getInitialState();

    //if results are cached in storage, recache for X mins
    localStorageWrapper.extend('github.search.userName');
    localStorageWrapper.extend('github.search.results');

  }
  _getInitialState(){
    return {
      userName : localStorageWrapper.get('github.search.userName'),
      results : localStorageWrapper.get('github.search.results') || null,
      fetching: false
    };
  }
  handleFocus(e) {
    var target = e.target;
    //dirty but curiously in React this is a known bug and workaround ...
    setTimeout(function() {
      target.select();
    }, 0);
  }
  handleSubmit(e) {
    e.preventDefault();
    document.getElementById('user-name').blur();
    var currentUser = this.state.userName;
    //prevent submiting empty user
    if (currentUser !== "") {
      this.setState({fetching: true});
      github.searchUser(currentUser)
        .then((result) => {
          localStorageWrapper.set('github.search.results',result.data);
          localStorageWrapper.set('github.search.userName',currentUser);
          this.setState({
            results: result.data,
            fetching: false
          });
        })
        .catch((error) => {
          this.setState({
            results: {
              error: error.humanMessage
            },
            fetching: false
          });
        });
    }
  }
  handleChange(e){
    //not sure it's the best way because it will trigger a render on something handled by the browser
    //but have to keep track of this value anyway ...
    this.setState({userName:e.target.value});
  }
  render() {
    var userName = this.state.userName;
    var results = this.state.results;
    var fetching = this.state.fetching;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal" action=".">
          <div className="form-group">
            <label htmlFor="user-name" className="col-sm-2">Search for a Github User</label>
            <div className="col-sm-10">
              <input type="search" name="user-name" className="form-control" id="user-name" placeholder="Enter username" value={userName} onChange={this.handleChange} onFocus={this.handleFocus}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default pull-right">Search</button>
              <Spinner fetching={fetching} className="pull-left"/>
            </div>
          </div>
        </form>
        <ProfileList results={results}/>
      </div>
    )
  }
}