import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/login',
			name: 'login',
			component(resolve) {
				require(['@/views/login/login.vue'], resolve)
			},
			hidden: true
		},
		{
			path: '/',
			component(resolve) {
				require(['@/components/main/main.vue'], resolve)
			},
			children: [{
				path: '/home',
				name: 'home',
				meta: {
					title: "主页"
				},
				component(resolve) {
					require(['@/views/home.vue'], resolve)
				}
			}]
		},
		{
			path: '/',
			meta: {
				showMenu: true,
				title: "教师管理",
				access: ['系统管理员','普通用户'],
			},
			component(resolve) {
				require(['@/components/main/main.vue'], resolve)
			},
			children: [
			{
				path: '/YYSL',
				name: 'YYSL',
				meta: {
					showMenu: true,
					title: "教师",
				},
				component(resolve) {
					require(['@/views/YYSL/YYSL.vue'], resolve)
				}
			}, 
			]
		},
		{
			path: '/',
			meta: {
				showMenu: true,
				title: "实验室管理",
				access: ['系统管理员','普通用户'],
			},
			component(resolve) {
				require(['@/components/main/main.vue'], resolve)
			},
			children: [{
					path: '/PJC',
					name: 'PJC',
					meta: {
						showMenu: true,
						title: "实验室",
						access:'系统管理员',
					},
					component(resolve) {
						require(['@/views/PJC/PJC.vue'], resolve)
					}
				},
				

			]
		},
		{
			path: '/',
			meta: {
				showMenu: true,
				title: "课程管理",
				access: ['系统管理员','普通用户'],
			},
			component(resolve) {
				require(['@/components/main/main.vue'], resolve)
			},
			children: [
				{
					path: '/JS',
					name: 'JS',
					meta: {
						showMenu: true,
						title: "课程",
					},
					component(resolve) {
						require(['@/views/JS/JS.vue'], resolve)
					}
				}, 
			]
		},
	]
})
