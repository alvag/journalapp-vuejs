import { useStore } from 'vuex';
import { computed } from 'vue';

const useAuth = () => {

	const store = useStore();

	const createUser = async ( user ) => {
		return await store.dispatch( 'auth/createUser', user );
	};

	const loginUser = async ( user ) => {
		return await store.dispatch( 'auth/loginUser', user );
	};

	const checkStatus = async () => {
		return await store.dispatch( 'auth/checkAuth' );
	};

	const logout = () => {
		store.commit( 'auth/logOut' );
		store.commit( 'journal/clearEntries' );
	};

	return {
		createUser,
		loginUser,
		checkStatus,
		logout,
		authStatus: computed( () => store.getters[ 'auth/currentState' ] ),
		username: computed( () => store.getters[ 'auth/username' ] ),
	};

};

export default useAuth;
