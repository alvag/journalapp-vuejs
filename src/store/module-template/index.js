import moduleState from './state';
import * as moduleActions from './actions';
import * as moduleMutations from './mutations';
import * as moduleGetters from './getters';

const moduleStore = {
	namespaced: true,
	moduleState, moduleGetters, moduleActions, moduleMutations,
};

export default moduleStore;
