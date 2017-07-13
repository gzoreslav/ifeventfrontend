import _ from 'lodash';
import constants from '../constants';


export const AsyncLoading = {
  fieldName: 'items',
  emptyValue: [],
  init () {
    this[this.fieldName] = this.emptyValue;
    this.loading = false;
    this.error = false;
    this.hasMore = true;
    const action = _(this).get('actions.async');
    const actionSync = _(this).get('actions.sync');

    this.listenTo(action, this.start);
    this.listenTo(action.completed, this.completed);
    this.listenTo(action.failed, this.failed);

    if (actionSync && actionSync.clearStore) {
      this.listenTo(actionSync.clearStore, this.clearStore);
    }
  },
  notify () {
    this.trigger({
      loading: this.loading,
      error: this.error,
      hasMore: this.hasMore,
      [this.fieldName]: this[this.fieldName]
    });
  },
  start () {
    this.loading = true;
    this.error = false;
    this.hasMore = true;
    this[this.fieldName] = this[this.fieldName];
    this.notify();
  },
  sortAndCleanup() {
      this[this.fieldName] = _.sortBy(this[this.fieldName], 'start_time');
      this[this.fieldName] = _.uniq(this[this.fieldName], 'id');
  },
  completed (value) {
    this.loading = false;
    this.error = false;
    if (value.lazy) {
      this.hasMore = value.hasMore;
      this[this.fieldName] = value.doConcat ? this[this.fieldName].concat(_.get(value, 'items.data', [])) :
          _.get(value, 'items.data', []);
    } else {
      this[this.fieldName] = value;
    }
    // additional parse method if needed
    if (this.parse) {
      this.parse();
    }
    this.sortAndCleanup();
    this.notify();
  },
  failed () {
    this.loading = false;
    this.error = true;
    this.notify();
  },
  clearStore () {
    this.loading = false;
    this.error = false;
    this[this.fieldName] = this.emptyValue;
    this.notify();
  }
};
