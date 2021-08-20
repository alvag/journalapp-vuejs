import axios from 'axios';

const journalApi = axios.create( {
	baseURL: 'https://test-669cc.firebaseio.com'
} );

export default journalApi;
