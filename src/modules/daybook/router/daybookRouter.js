export default {
	name: 'daybook',
	component: () => import(/* webpackChunkName: "DaybookLayout" */ '@/modules/daybook/layouts/DaybookLayout'),
	children: [
		{
			path: '',
			name: 'no-entry',
			component: () => import(/* webpackChunkName: "NoEntrySelected" */ '@/modules/daybook/views/NoEntrySelected')
		},
		{
			path: ':id',
			name: 'entry',
			component: () => import(/* webpackChunkName: "EntryView" */ '@/modules/daybook/views/EntryView'),
			props: ( route ) => {
				return {
					id: route.params.id
				};
			}
		}
	]
};
