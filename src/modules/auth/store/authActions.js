import authApi from '@/api/authApi';

export const createUser = async ( { commit }, user ) => {
	const { name: displayName, email, password } = user;

	try {
		const { data } = await authApi.post( ':signUp', { email, password, returnSecureToken: true } );
		const { idToken, refreshToken } = data;

		await authApi.post( ':update', { displayName, idToken } );

		delete user.password;
		commit( 'loginUser', { user, idToken, refreshToken } );

		return { ok: true };
	} catch ( { response } ) {
		console.log( response );
		return { ok: false, message: response.data.error.message };
	}
};

export const loginUser = async ( { commit }, user ) => {
	const { email, password } = user;

	try {
		const { data } = await authApi.post( ':signInWithPassword', { email, password, returnSecureToken: true } );
		const { displayName, idToken, refreshToken } = data;

		delete user.password;
		user.name = displayName;
		commit( 'loginUser', { user, idToken, refreshToken } );

		return { ok: true };
	} catch ( { response } ) {
		console.log( response );
		return { ok: false, message: response.data.error.message };
	}
};

export const checkAuth = async ( { commit } ) => {
	const idToken = localStorage.getItem( 'idToken' );

	if ( !idToken ) {
		commit( 'logOut' );
		return { ok: false, message: 'No hay token' };
	}

	try {
		const { data } = await authApi.post( ':lookup', { idToken } );
		console.log( data );
		const { displayName: name, email } = data.users[ 0 ];
		const user = { name, email };
		commit( 'loginUser', { user, idToken } );
		return { ok: true };
	} catch ( error ) {
		commit( 'logOut' );
		return { ok: false, message: error.response.data.error.message };
	}
};
