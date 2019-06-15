import EnterAgency from "@/pages/enterAgency/enterAgency"; //入驻代理页面；
import AgencyA from "@/pages/enterAgency/agencyA"; //入驻代理商——协议页面；
import AgencyB from "@/pages/enterAgency/agencyB"; //入驻代理商——提交资料页面；
import AgencyC from "@/pages/enterAgency/agencyC"; //入驻代理商——审核页面；

import AgencyAa from "@/pages/enterAgency/agencyAa"; //入驻老师——协议页面；
import AgencyBb from "@/pages/enterAgency/agencyBb"; //入驻老师——提交资料页面；

import MyIncome from "@/pages/symbiosisAgency/myIncome"; //合作——我的收入页面；

//H5的页面；
import Login from '@/pages/h5/Login'; //注册页面；
import ShareCourse from '@/pages/h5/shareCourse'; //分享课程页面；
import UserAgreement from '@/pages/h5/userAgreement'; //用户协议页面；

import store from '../store/store.js'

const router = new VueRouter({
	base: "/",
	//   mode: 'hash',
	routes: [{
			path: '/',
			name: 'Main',
			redirect: {
				name: 'Index'
			},
			component: resolve => require(['@/pages/Main'], resolve),
			children: [{
					path: '/Index',
					name: 'Index',
					component: resolve => require(['@/pages/Home/Home'], resolve),
					meta: {
						keepAlive: true,
						title: "共享师资"
					}
				},
				{
					path: '/Mine',
					name: 'Mine',
					redirect: {
						name: 'MineInformation'
					},
					component: resolve => require(['@/pages/Mine/Mine'], resolve),
					meta: {
						keepAlive: false
					},
					children: [{
							path: 'Cash',
							name: 'Cash',
							component: resolve => require(['@/pages/Cash/Cash'], resolve),
							meta: {
								keepAlive: true,
								title: "共享师资"
							}
						}, {
							path: 'MineInformation',
							name: 'MineInformation',
							component: resolve => require(['@/pages/MineInformation/MineInformation'], resolve),
							meta: {
								keepAlive: true,
								title: "共享师资"
							}

						}, {
							path: 'BuyCourse',
							name: 'BuyCourse',
							component: resolve => require(['@/pages/BuyCourse/BuyCourse'], resolve),
							meta: {
								keepAlive: true,
								title: "共享师资"
							}

						}, {
							path: 'Vip',
							name: 'Vip',
							component: resolve => require(['@/pages/Vip/Vip'], resolve),
							meta: {
								keepAlive: true,
								title: "共享师资"
							}

						}, {
							path: 'Teacher',
							name: 'Teacher',
							component: resolve => require(['@/pages/Teacher/Teacher'], resolve),
							meta: {
								keepAlive: true,
								title: "共享师资"
							}

						},
						{
							path: 'Course',
							name: 'Course',
							component: resolve => require(['@/pages/Course/Course'], resolve),
							meta: {
								keepAlive: true,
								title: "共享师资"
							}

						},
						{
							path: 'History',
							name: 'History',
							component: resolve => require(['@/pages/History/History'], resolve),
							meta: {
								keepAlive: true,
								title: "共享师资"
							}

						},
						{
							path: 'WithDraw',
							name: 'WithDraw',
							component: resolve => require(['@/pages/WithDraw/WithDraw'], resolve),
							meta: {
								keepAlive: false,
								title: "共享师资"
							}

						},
						{
							path: 'Recharge',
							name: 'Recharge',
							component: resolve => require(['@/pages/Recharge/Recharge'], resolve),
							meta: {
								keepAlive: false,
								title: "共享师资"
							}

						},
						{
							path: 'RechargePay',
							name: 'RechargePay',
							component: resolve => require(['@/pages/RechargePay/RechargePay'], resolve),
							meta: {
								keepAlive: false,
								title: "共享师资"
							}

						}

					]

				},
				{
					path: '/enterAgency',
					component: resolve => require(['@/pages/enterAgency/enterAgency'], resolve),
					name: 'EnterAgency',
					meta: {
						keepAlive: false
					}
				}, //入驻代理页面；
				{
					path: '/ClassDetails', //课程详情；
					name: 'ClassDetails',
					component: resolve => require(['@/pages/ClassDetails/ClassDetails'], resolve),
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/DownLoad',
					name: 'DownLoad',
					component: resolve => require(['@/pages/DownLoad/DownLoad'], resolve),
					meta: {
						keepAlive: false
					}
				},
				{
					path: '/agencyA',
					component: resolve => require(['@/pages/enterAgency/agencyA'], resolve),
					name: 'AgencyA',
					meta: {
						keepAlive: false
					}
				}, //入驻代理商——协议页面；
				{
					path: '/agencyB',
					component: resolve => require(['@/pages/enterAgency/agencyB'], resolve),
					name: 'AgencyB',
					meta: {
						keepAlive: false
					}
				}, //入驻代理商——提交资料页面；
				{
					path: '/agencyC',
					component: resolve => require(['@/pages/enterAgency/agencyC'], resolve),
					name: 'AgencyC',
					meta: {
						keepAlive: false
					}
				}, //入驻代理商——审核页面；
				{
					path: '/agencyAa',
					component: resolve => require(['@/pages/enterAgency/agencyAa'], resolve),
					name: 'AgencyAa',
					meta: {
						keepAlive: false
					}
				}, //入驻老师——协议页面；
				{
					path: '/agencyBb',
					component: resolve => require(['@/pages/enterAgency/agencyBb'], resolve),
					name: 'AgencyBb',
					meta: {
						keepAlive: false
					}
				}, //入驻老师——提交资料页面；
				{
					path: '/myIncome',
					component: resolve => require(['@/pages/symbiosisAgency/myIncome'], resolve),
					name: 'MyIncome',
					meta: {
						keepAlive: false
					}
				}, //合作——我的收入页面；

				{
					path: '/teacherHomePage',
					component: resolve => require(['@/pages/teacherHomePage/teacherHomePage'], resolve),
					name: 'TeacherHomePage',
					meta: {
						keepAlive: false
					}
				}, //老师主页页面；
				{
					path: '/seekPage',
					component: resolve => require(['@/pages/seekPage/seekPage'], resolve),
					name: 'SeekPage',
					meta: {
						keepAlive: false
					}
				}, //搜索页面；
				{
					path: '/SeekPageTwo',
					component: resolve => require(['@/pages/SeekPageTwo/SeekPageTwo'], resolve),
					name: 'SeekPageTwo',
					meta: {
						keepAlive: false
					}
				}, //搜索页面；
				{
					path: '/seekPageThree',
					component: resolve => require(['@/pages/seekPageThree/seekPageThree'], resolve),
					name: 'seekPageThree',
					meta: {
						keepAlive: false
					}
				}, //搜索页面；
				{
					path: '/topSeach',
					component: resolve => require(['@/pages/topSeach/topSeach'], resolve),
					name: 'TopSeach',
					meta: {
						keepAlive: false
					}
				}, //搜索页面；
				{
					path: '/TeachList',
					component: resolve => require(['@/pages/TeachList/TeachList'], resolve),
					name: 'TeachList',
					meta: {
						keepAlive: false
					}
				}, //更多老师
				{
					path: '/aboutUs',
					component: resolve => require(['@/pages/About/AboutUs'], resolve),
					name: 'AboutUs',
					meta: {
						keepAlive: false
					}
				}, //关于我们页面；
				{
					path: '/feedback',
					component: resolve => require(['@/pages/feedback/feedback/feedback'], resolve),
					name: 'Feedback',
					meta: {
						keepAlive: false
					}
				}, //意见反馈页面；
				{
					path: '/LunboVal',
					component: resolve => require(['@/pages/LunboVal/LunboVal'], resolve),
					name: 'LunboVal',
					meta: {
						keepAlive: false
					}
				}, //意见反馈页面；
				
				{
					path: '/sy',
					component: resolve => require(['@/pages/About/sy'], resolve),
					name: 'sy',
					meta: {
						keepAlive: false
					}
				}, //试用页面；
				
			]
		},

		{
			path: '/Live', //直播间；
			name: 'Live',
			component: resolve => require(['@/pages/Live/Live'], resolve),
			meta: {
				keepAlive: false
			}
		},

		{
			path: '*',
			name: '404',
			meta: {
				title: '404 功能建设中',
			},
			component: resolve => require(['@/pages/building'], resolve),
		},

		//H5页面的部分；
		{
			path: '/login',
			component: Login,
			name: 'Login'
		}, //注册页面；
		{
			path: '/shareCourse',
			component: ShareCourse,
			name: 'ShareCourse'
		}, //分享课程页面；
		{
			path: '/userAgreement',
			component: UserAgreement,
			name: 'UserAgreement'
		}, //用户协议页面；
		{
			path: '/PayPage',
			component: resolve => require(['@/pages/PayPage/PayPage'], resolve),
			name: 'PayPage',
			meta: {
				keepAlive: false
			}
		},
		{
			path: 'auth',
			name: 'Auth',
			component: resolve => require(['@/pages/Auth'], resolve),

		}
	]
})

router.beforeEach((to, from, next) => {

	if(to.meta.title) { //如果设置标题，拦截后设置标题
		document.title = to.meta.title
	}
	var url = location.search; //获取url中"?"符后的字串   
	console.log(url)
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	let openId = theRequest.code; //授权后的code
	console.log(openId)
	if(!openId) {
		
		next()
	} else {
		var newUrl=window.location.protocol+"//"+window.location.host+"/#/"+to.name+url
		window.location.replace(newUrl)
	}
})

export default router;