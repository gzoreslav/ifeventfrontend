'use strict';

import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import {EventsList} from './common/Event.jsx';
import actions from '../actions';
import {eventsStore} from '../stores/eventsStore';


const City = React.createClass({
    mixins: [
        Reflux.connect(eventsStore, 'data')
    ],
    getInitialState() {
        return {
            data: {}
        }
    },
    componentDidMount() {
        this.fetch();
    },
    componentWillReceiveProps(newProps) {
        this.fetch();
    },
    fetch() {
        actions.events.fetchCity();
    },
    render() {
        const events = _.get(this.state, 'data.items', []);
        return (
            <div className="container-wrapper">
                <h1>Події міста ({events.length}) {this.state.data.loading ? 'Завантаження...' : ''}</h1>
                {events.length === 0 ? <h3>Не знайдено жодної події</h3> : <EventsList events={events}/>}
            </div>
        );
    }
});

export default City;
