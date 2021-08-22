import journalApi from '@/api/journalApi';

export const loadEntries = async ( { commit } ) => {
	const { data } = await journalApi.get( '/entries.json' );
	const entries = [];

	if ( data ) {
		for ( let id of Object.keys( data ) ) {
			entries.push( {
				id,
				...data[ id ]
			} );
		}
	}

	commit( 'setEntries', entries );
};

export const updateEntry = async ( { commit }, entry ) => {
	const { id, ...rest } = entry;
	await journalApi.put( `/entries/${id}.json`, rest );
	commit( 'updateEntry', { ...entry } );

};

export const createEntry = async ( { commit }, entry ) => {
	const { data } = await journalApi.post( `/entries.json`, entry );
	entry = {
		...entry,
		id: data.name
	};

	commit( 'addEntry', entry );

	return entry;
};

export const deleteEntry = async ( { commit }, id ) => {
	await journalApi.delete( `/entries/${id}.json` );
	commit( 'deleteEntry', id );
};
