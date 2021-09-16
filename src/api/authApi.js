import axios from 'axios';

const authApi = axios.create( {
	baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
	params: {
		key: 'AIzaSyBNQvw7XAPTiiyXr2QUTqIN9ULgsfItM9I'
	}
} );

export default authApi;
