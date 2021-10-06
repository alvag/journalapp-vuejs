import axios from 'axios';

const journalApi = axios.create( {
	baseURL: 'https://test-669cc.firebaseio.com'
} );

journalApi.interceptors.request.use( config => {
	config.params = {
		auth: localStorage.getItem( 'idToken' )
	};

	/*config.headers = {
	 'authorization': ''
	 }*/

	return config;
} );

export default journalApi;
