import { shallowMount } from '@vue/test-utils';
import About from '../../../src/views/About';

describe( 'Pruebas del About', () => {
	test( 'debe renderizar el componente correctamente', () => {
		const wrapper = shallowMount( About );
		expect( wrapper.html() ).toMatchSnapshot();
	} );
} );
