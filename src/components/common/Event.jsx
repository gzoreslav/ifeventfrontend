'use strict';

import React from 'react';
import _ from 'lodash';
import moment from 'moment';


const Event = ({event}) => {
    return (
        <div className="card-wrapper">
            <div className="card thumbnail">
                <div className="cover" style={{backgroundImage: `url(${event.cover.source})`}}/>
                <div className="caption">
                    <h3>{event.name}</h3>
                    <p className="description">{event.description}</p>
                </div>
                <div className="footer">
                    <div>
                        <span className="glyphicon glyphicon-map-marker" aria-hidden="true"/>&nbsp;
                        {event.place.name}
                    </div>
                    <div>
                        <span className="glyphicon glyphicon-calendar" aria-hidden="true"/>&nbsp;
                        {moment(event.start_time).format('LL о LT')}
                    </div>
                    <a target="_blank" href={`https://www.facebook.com/events/${event.id}`}>
                        детальніше у Facebook →
                    </a>
                </div>
            </div>
        </div>
    );
};

export const EventsList = ({events}) => {
    const items = _(events)
        .map(event => <Event event={event}/>)
        .value();
    return (
        <div className="events-wrapper">
            {items}
        </div>
    );
};

export default Event;