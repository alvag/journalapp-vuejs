import authApi from '@/api/authApi';

export const createUser = async ( { commit }, user ) => {
	const { name, email, password } = user;

	try {
		const { data } = await authApi.post( ':signUp', { email, password, returnSecureToken: true } );
		console.log( data );
		return { ok: true };
	} catch ( { response } ) {
		console.log( response );
		return { ok: false, message: response.data.error.message };
	}
};
