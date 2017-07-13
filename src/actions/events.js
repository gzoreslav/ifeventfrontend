import Reflux from 'reflux';
import _ from 'lodash';
import request from '../services/FBService';
import constants from '../constants';


const actions = Reflux.createActions([
    {fetchCity: {asyncResult: true}}
]);

const prepareIdQuery = id => {
    const today = new Date().toISOString();
    return `&ids=${id}&fields=name,link,events.since(${today}){start_time.order(chronological),end_time,name,place,description,cover}`;
};

actions.fetchCity.listen(() => {
    request(constants.queries.places, 'search')
        .then(response => {
            _(response.data)
                .map(item => {
                    request(prepareIdQuery(item.id))
                        .then(resp => {
                            actions.fetchCity.completed({
                                lazy: true,
                                hasMore: true,
                                doConcat: true,
                                items: _.get(resp, `${item.id}.events`, [])
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
                    request(prepareIdQuery(item))
                        .then(resp => {
                            actions.fetchCity.completed({
                                lazy: true,
                                hasMore: true,
                                doConcat: true,
                                items: _.get(resp, `${item}.events`, [])
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
