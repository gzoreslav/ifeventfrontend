'use strict';

import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import moment from 'moment';
import {Row, Col, Button} from 'react-bootstrap'

import {EventsList} from './common/Event.jsx';
import Loading from './common/Loader.jsx';
import actions from '../actions';
import {eventsStore} from '../stores/eventsStore';


const TimeWrapper = React.createClass({
    render() {
        if (!this.props.emptyLabel && (this.props.events.length === 0)) {
            return <div/>;
        }
        const noData = this.props.emptyLabel || 'Не знайдено жодної події';
        return (
          <div className="time-wrapper">
              {this.props.label ?
                  <h3>{this.props.label}{this.props.showCounter ?
                      <span className="badge counter">{this.props.events.length}</span> : ''}
                  </h3> : ''
              }
              {this.props.events.length === 0 ? <h4 className="no-data">{noData}</h4> : <EventsList events={this.props.events}/>}
          </div>
        );
    }
});

const today = moment();
const weekEnd = moment().weekday(7);
const monthEnd = moment().endOf('month');

const TimeWrappers = React.createClass({
    isToday(event) {
        return moment(event.start_time).format('YYYY-MM-DD') <= today.format('YYYY-MM-DD');
    },
    isThisWeek(event) {
        return moment(event.start_time).format('YYYY-MM-DD') <= weekEnd.format('YYYY-MM-DD');
    },
    isThisMonth(event) {
        return moment(event.start_time).format('YYYY-MM-DD') <= monthEnd.format('YYYY-MM-DD');
    },
    render() {
        let laterEvents = [];
        let todayEvents = [];
        let weekEvents = [];
        let monthEvents = [];
        _(this.props.events).map(event => {
            if (this.isToday(event)) {
                todayEvents.push(event);
            } else if (this.isThisWeek(event)) {
                weekEvents.push(event);
            } else if (this.isThisMonth(event)) {
                monthEvents.push(event);
            } else {
                laterEvents.push(event);
            }
        })
        .value();
        return (
            <div>
                <TimeWrapper label="Сьогодні" events={todayEvents} emptyLabel="Сьогодні немає подій" showCounter/>
                <TimeWrapper label="Ще цього тижня" events={weekEvents} emptyLabel="Більше немає подій цього тижня" showCounter/>
                <TimeWrapper label="Ще цього місяця" events={monthEvents} emptyLabel="Більше немає подій цього місяця" showCounter/>
                <TimeWrapper label="Пізніше" events={laterEvents} showCounter/>
            </div>
        );
    }
});

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
                <Loading loading={this.state.data.loading} mask={true}>
                    <Row>
                        <Col xs={10}>
                            <h1>Події міста <span className="badge counter">{events.length}</span></h1>
                        </Col>
                        <Col xs={2}>
                            <Button bsStyle="success" className="btn-refresh" onClick={this.fetch}>Оновити</Button>
                        </Col>
                    </Row>
                    {events.length === 0 ? <h4 className="no-data">Не знайдено жодної події</h4> : <TimeWrappers events={events}/>}
                </Loading>
            </div>
        );
    }
});

export default City;
