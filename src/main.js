import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/styles.scss';
import mainStore from '@/store/store';

createApp( App )
.use( mainStore )
.use( router )
.mount( '#app' );
