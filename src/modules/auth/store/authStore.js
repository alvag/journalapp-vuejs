import state from './authState';
import * as actions from './authActions';
import * as mutations from './authMutations';
import * as getters from './authGetters';

const authStore = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};

export default authStore;
