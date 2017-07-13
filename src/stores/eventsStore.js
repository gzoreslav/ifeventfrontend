import Reflux from 'reflux';
import actions from '../actions';
import {AsyncLoading} from '../mixins/store';


export const eventsStore = Reflux.createStore({
  actions: {
    async: actions.events.fetchCity
  },
  mixins: [AsyncLoading]
});