import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal/journalStore';

const mainStore = createStore( {
	modules: {
		journal
	}
} );

export default mainStore;
