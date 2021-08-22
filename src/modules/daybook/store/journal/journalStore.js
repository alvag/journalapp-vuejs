import state from './journalState';
import * as actions from './journalActions';
import * as getters from './journalGetters';
import * as mutations from './journalMutations';

const journalStore = {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};

export default journalStore;
