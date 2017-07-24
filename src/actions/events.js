import Reflux from 'reflux';
import _ from 'lodash';
import moment from 'moment';
import request from '../services/FBService';
import constants from '../constants';


const actions = Reflux.createActions([
    {fetchCity: {asyncResult: true}}
]);

const prepareIdQuery = id => {
    return `&ids=${id}&fields=name,link,events{start_time.order(chronological),end_time,name,place,description,cover}&limit=100`;
};

const fmt = 'YYYY-MM-DD';

const newEvent = (start, end) => {
    return ((moment(start).format(fmt) >= moment().format(fmt)) || (moment(end || start).format(fmt) >= moment().format(fmt)));
};

actions.fetchCity.listen(() => {
    let events = [];
    request(constants.queries.places, 'search')
        .then(response => {
            _(response.data)
                .map(item => {
                    request(prepareIdQuery(item.id))
                        .then(resp => {
                            events = _(_.get(resp, `${item.id}.events.data`, []))
                                .filter(event => newEvent(event.start_time, event.end_time))
                                .value();
                            actions.fetchCity.completed({
                                lazy: true,
                                hasMore: true,
                                doConcat: true,
                                items: {data: events}
                            });
                        })
                        .catch(error => {
                            actions.fetchCity.failed(error);
                        });
                })
                .value();
        })
        .then(() => {
            _(constants.pages)
                .map(item => {
                    request(prepareIdQuery(item.id))
                        .then(resp => {
                            events = _(_.get(resp, `${item.id}.events.data`, []))
                                .filter(event => newEvent(event.start_time, event.end_time))
                                .value();
                            actions.fetchCity.completed({
                                lazy: true,
                                hasMore: true,
                                doConcat: true,
                                items: {data: events}
                            });
                        })
                        .catch(error => {
                            actions.fetchCity.failed(error);
                        });
                })
                .value();
        })
        .catch(error => {
            actions.fetchCity.failed(error);
        });
});

export default actions;
