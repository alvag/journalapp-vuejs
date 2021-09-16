import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal/journalStore';
import auth from '@/modules/auth/store/authStore';

const mainStore = createStore( {
	modules: {
		journal,
		auth
	}
} );

export default mainStore;
