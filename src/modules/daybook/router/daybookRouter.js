export default {
	name: 'daybook',
	component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DaybookLayout'),
	children: []
};
