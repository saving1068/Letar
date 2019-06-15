import router from '../router'
//import { Message } from 'element-ui';

import store from '../store/store'
import Route from '@/router'
let devUrl = "/api/";

if(window.location.host == "pc.letar.d.aiitec.org") {
	//	let url = 'http://' + window.location.host;
	Vue.prototype.$imgUrl = 'http://letar.t.aiitec.org';
	devUrl = "http://letar.d.aiitec.org/api/";
	//Vue.prototype.$imgUrl = url;
} else if(window.location.host == "pc.letar.t.aiitec.org") {

	devUrl = "http://letar.t.aiitec.org/api/";
	Vue.prototype.$imgUrl = 'http://letar.t.aiitec.org';
} else if(window.location.host == "h5.litakeji.com") {
	devUrl = "https://gxsz.litakeji.com/api/";

	Vue.prototype.$imgUrl = 'https://gxsz.litakeji.com';
} else {
	Vue.prototype.$imgUrl = 'http://letar.t.aiitec.org';
}

let SessionId = '';

//axios响应拦截
axios.interceptors.response.use(function(response) {
	if(response.data.q.s != '0') {
		if(response.data.q.s == '1002' || response.data.q.s == '1012' || response.data.q.s == '1100' || response.data.q.s == '1105' || response.data.q.s == '1106' || response.data.q.s == '1107' || response.data.q.s == '1110') {
			//    localStorage.removeItem("sessionId"); 
			if(store.state.isLogin) {
				ELEMENT.Message({
					message: '您的账号在别处登录',
					type: 'warning'
				});
				store.dispatch('changeLogin', false)
				Route.replace({
						name:"Index"
					})
			
			}

			//    next(false);
			console.log('jump to reg page')
		} else {
			//    errorMsg(response.data.q.d);
		}
	}

	return response;
}, function(error) {
	console.log("response error")
	console.log(error)
	// console.log(error.config);
	// console.log(error.status)
	console.log(error.request.status)
	console.log('Errorfff', error.message);
	console.log('sssaaa', error.response);
	let error_message = '请求失败，请稍后重试！';
	if(error.response) {
		console.log(8888888888)
		
		
		  switch (error.response.status) {
		    case 404:
		    ELEMENT.Message({
					message: error_message,
					type: 'warning'
				});
		      break;
		       case 429:
		    ELEMENT.Message({
					message: error_message,
					type: 'warning'
				});
		      break;
		    case 401:
		       ELEMENT.Message({
					message: error_message,
					type: 'warning'
				});
		      break;
		    case 500:
		      ELEMENT.Message({
					message: error_message,
					type: 'warning'
				});
		      break;
		    default:
		     ELEMENT.Message({
					message: error_message,
					type: 'warning'
				});
		      break;
		  }
	}
	return Promise.reject(error);
});

function axiosApi(url, option, method = 'post', stopLogin = false) {
	let promise;

	promise = new Promise((resolve, reject) => {
		option.headers = {
			'Content-Type': 'application/json',

			'Device-Type': 'h5'

		}
		if(method != 'post') {
			option.data = {};
		}
		let obj = Object.assign({
			method,
			url,
		}, option)

		axios(obj).then((response) => {

				if(response.data.q) {
					if(response.data.q.s != '0') {
						//					let error = checkErr(response.data.q.s)
						if(!stopLogin) {
							//						if(response.data.q.s == '1100') {
							//							sessionStorage.setItem('path', router.app._route.fullPath)
							//							
							//						}
						}
					}
				}

				resolve(response.data)
			})
			.catch((err) => {
				//			console.log(err);
				//
				//			var dialog = document.createElement('div');
				//			var str = '<div style="background: rgba(0,0,0,0.6);width: 60%;z-index: 111111;font-size:0.34rem;' +
				//				'border-radius: 0.05rem;text-align: center;color: #fff;position: absolute;top: 40%;left: 20%;">' +
				//				'服务器错误<br>' +
				//				err + '</div>';
				//			dialog.id = 'dialog_err';
				//			dialog.innerHTML = str;
				//			document.getElementById('app').appendChild(dialog);
				//
				//			setTimeout(function() {
				//				document.getElementById('app').removeChild(document.getElementById('dialog_err'))
				//			}, 2500)
				//              

				reject(err)
			})
	})
	return promise;
}

function getSession() {
	let result = localStorage.getItem('session');
	if(result) {
		SessionId = result;
		return result;
	}
}

const Api = {
	setSessionId(Session) {
		
		SessionId = Session

	},
	getSession() {
		return SessionId;

	},

	//
	// ──────────────────────────────────────── I ──────────
	//   Base  基础底层
	// ──────────────────────────────────────────────────
	//

	/**
	 * 1.  获取会话 SessionId
	 *
	 * @param {a}            1 学生 2 评审员 3 记分员
	 * @param {deviceType}   1Ios 2Android 3WindowsPhone 4 微信 5 网页 6 微信小程序
	 * @returns
	 */
	getSessionId() {
		return axiosApi(devUrl + 'Base/Session', {
			data: {
				n: 'Session',
				md5: '',
				q: {
					'a': 1,
					'deviceType': 3
				}
			}
		})
	},

	/**
	 * 2.  登录 UserLogin
	 *
	 * @param {a}            1 手机登录 2 微信登录
	 * @param {mobile}       手机号
	 * @param {code}         授权Code
	 * @param {smsKey}       验证码反回的key
	 * @param {referee_id}   推荐人id
	 * @returns
	 */
	UserLogin({
		a,
		mobile,
		code,
		smsKey,
		referee_id
	}) {
		return axiosApi(devUrl + 'Cis/UserLogin', {
			data: {
				n: 'UserLogin',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					mobile,
					code,
					smsKey,
					referee_id,
					web:2
				}
			}
		})

	},

	UserUpdateSubmit({
		avatarPath,
		nickname,
		sex,
		id,
		name
	}) {
		return axiosApi(devUrl + 'Cis/UserUpdateSubmit', {
			data: {
				n: 'UserUpdateSubmit',
				s: SessionId ? SessionId : getSession(),
				q: {
					userInfo: {
						avatarPath,
						nickname,
						sex,
						region: {
							id

						}

					}

				}

			}

		})

	},

	/**
	 * 3.  获取验证码 SmsCode
	 *
	 * @param {a}            1 获取验证码 2 验证验证码
	 * @param {type}         1 登录 2 第三方登录绑定 3 修改手机验证旧手机 4 修改手机验证新手机 5 教师注册 6 提现
	 * @param {mobile}       手机号
	 * @param {code}         验证码 a=2 时传
	 * @returns
	 */
	SmsCode({
		a,
		type,
		mobile,
		code
	}) {
		return axiosApi(devUrl + 'Base/SmsCode', {
			data: {
				n: 'SmsCode',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					type,
					mobile,
					code
				}
			}
		})

	},
	/**
	 *  获取用户信息 UserDetails
	 *
	 
	 * @returns
	 */

	UserDetails() {
		return axiosApi(devUrl + 'Cis/UserDetails', {
			data: {
				n: 'UserDetails',
				s: SessionId ? SessionId : getSession(),
				q: {

				}
			}
		})

	},
	/**
	 *  登出 UserLogout
	 *
	 
	 * @returns
	 */
	UserLogout() {
		return axiosApi(devUrl + 'Cis/UserLogout', {
			data: {
				n: 'UserLogout',
				s: SessionId ? SessionId : getSession(),
				q: {

				}
			}

		})

	},
	UserChangeBind({
		a,
		mobile,
		code,
		smsKey
	}) {
		return axiosApi(devUrl + 'Cis/UserChangeBind', {
			data: {
				n: 'UserChangeBind',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					mobile,
					code,
					smsKey
				}
			}

		})

	},

	/**
	 * 22. 课程 列表 CourseList
	 *
	 * @param {a}   1 平台课程列表；2 学校课程列表
	 * @param {platform} 1 后台 2前端
	 * @param {pa, li, ob, ot}  显示条数
	 * @returns
	 */
	getCourseList({
		a,
		type,
		priceSort,
		firstClass,
		secondClass,
		thirdClass,
		isBuy,
		teacherId,
		pa,
		li,
		sk,
		web
	}) {
		return axiosApi(devUrl + 'Course/CourseList', {
			data: {
				n: 'CourseList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					web,
					type,
					priceSort,
					firstClass,
					secondClass,
					thirdClass,
					isBuy,
					teacherId,
					'ta': {
						pa,
						li,
						w:{
							sk
						}
					}
				}
			}
		})
	},
	CourseList({
		a,
		type,
		firstClass,
		secondClass,
		thirdClass,
		isBuy,
		teacherId,
		pa,
		li

	}) {
		return axiosApi(devUrl + 'Course/CourseList', {
			data: {
				n: 'CourseList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					type,
					firstClass,
					secondClass,
					thirdClass,
					isBuy,
					teacherId,
					'ta': {
						pa,
						li
					}
				}
			}
		})

	},
	PcCouseList({
		a,
		type,
		firstClass,
		secondClass,
		thirdClass,
		isBuy,
		teacherId,
		pa,
		li
	}) {
		return axiosApi(devUrl + 'Course/PcCouseList', {
			data: {
				n: 'PcCouseList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					type,
					firstClass,
					secondClass,
					thirdClass,
					isBuy,
					teacherId,
					'ta': {
						pa,
						li
					}
				}
			}
		})

	},

	ReportSubmit({
		chapterId,
		imageIds,
		content,
		reasonIds,
		mobile
	}) { //直播间举报接口;
		return axiosApi(devUrl + 'Course/ReportSubmit', {
			data: {
				n: 'ReportSubmit',
				s: SessionId ? SessionId : getSession(),
				q: {
					chapterId,
					imageIds,
					content,
					reasonIds,
					mobile
				}
			}
		})
	},

	UserFeedBack({
		content,
		mobile
	}) { //意见反馈接口;
		return axiosApi(devUrl + 'Base/UserFeedBack', {
			data: {
				n: 'UserFeedBack',
				s: SessionId ? SessionId : getSession(),
				q: {
					content,
					mobile
				}
			}
		})
	},
	
	LiveCount({
		chapterId
	}) { //直播间在线人数接口;
		return axiosApi(devUrl + 'Course/LiveCount', {
			data: {
				n: 'LiveCount',
				s: SessionId ? SessionId : getSession(),
				q: {
					chapterId
				}
			}
		})
	},
	
	ReportReason() { //直播间举报原因接口;
		return axiosApi(devUrl + 'Course/ReportReason', {
			data: {
				n: 'ReportReason',
				s: SessionId ? SessionId : getSession(),
				q: {

				}
			}
		})
	},

	Appreciate({
		courseChapterId,
		pa,
		li
	}) { //直播间赞赏接口;
		return axiosApi(devUrl + 'Course/Appreciate', {
			data: {
				n: 'Appreciate',
				s: SessionId ? SessionId : getSession(),
				q: {
					courseChapterId,
					ta: {
						pa,
						li
					}
				}
			}
		})
	},

	sendCommentSubmit({
		a,
		type,
		courseId,
		content,
		chapterId
	}) { //发送直播间评论列表;
		return axiosApi(devUrl + 'Course/CommentSubmit', {
			data: {
				n: 'CommentSubmit',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					type,
					courseId,
					content,
					chapterId

				}
			}
		})
	},

	getLiveCourseCommentList({
		chapterId,
		type,
		pa,
		li
	}) { //直播间评论列表;
		return axiosApi(devUrl + 'Course/LiveCourseCommentList', {
			data: {
				n: 'LiveCourseCommentList',
				s: SessionId ? SessionId : getSession(),
				q: {
					chapterId,
					type,
					ta: {
						pa,
						li
					}

				}
			}
		})
	},

	getAdviserSubmit({
		name,
		mobile,
		company,
		email
	}) { //顾问咨询提交；
		return axiosApi(devUrl + 'Cis/AdviserSubmit', {
			data: {
				n: 'AdviserSubmit',
				s: SessionId ? SessionId : getSession(),
				q: {
					name,
					mobile,
					company,
					email
				}
			}
		})
	},

	getTeacherRegister({
		a,
		name,
		idNum,
		idImages,
		quaType,
		quaImage,
		sex,
		professional,
		email,
		mobile,
		recommendMobile,
		smsKey
	}) { //老师和代理商入驻申请；
		return axiosApi(devUrl + 'Cis/TeacherRegister', {
			data: {
				n: 'TeacherRegister',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					name,
					idNum,
					idImages,
					quaType,
					quaImage,
					sex,
					professional,
					email,
					mobile,
					recommendMobile,
					smsKey
				}
			}
		})
	},

	getArticleDetails({
		a
	}) { //文章详情（常见的协议和文章等等内容）；
		return axiosApi(devUrl + 'Cms/ArticleDetails', {
			data: {
				n: 'ArticleDetails',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					web: 2,
				}
			}
		})
	},

	ArticleDetails({
		a
	}) {
		return axiosApi(devUrl + 'Cms/ArticleDetails', {
			data: {
				n: 'ArticleDetails',
				s: SessionId ? SessionId : getSession(),
				q: {
					a

				}
			}
		})

	},

	GetCardName({
		cardNumber
	}) {
		return axiosApi(devUrl + 'Base/GetCardName', {
			data: {
				n: 'GetCardName',
				s: SessionId ? SessionId : getSession(),
				q: {
					cardNumber

				}
			}
		})

	},

	getIncomeList({
		userId,
		pa,
		li
	}) { //我的收入；
		return axiosApi(devUrl + 'Fina/IncomeList', {
			data: {
				n: 'IncomeList',
				s: SessionId ? SessionId : getSession(),
				q: {
					userId,
					'ta': {
						pa,
						li
					}
				}
			}
		})
	},

	getFansList({
		a,
		userId,
		pa,
		li
	}) { //我的粉丝；
		return axiosApi(devUrl + 'Cis/FansList', {
			data: {
				n: 'FansList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					userId,
					'ta': {
						pa,
						li
					}
				}
			}
		})
	},

	UploadImage({
		data
	}) { //上传图片；
		return axiosApi(devUrl + 'Base/UploadImage', {
			data
		})
	},

	getSmsCode({
		a,
		type,
		mobile,
		code
	}) { //获取验证码；
		return axiosApi(devUrl + 'Base/SmsCode', {
			data: {
				n: 'SmsCode',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					type,
					mobile,
					code
				}
			}
		})
	},

	TeacherDetail({
		id,
		web,
	}) { //老师详情；
		return axiosApi(devUrl + 'Cis/TeacherDetail', {
			data: {
				n: 'TeacherDetail',
				s: SessionId ? SessionId : getSession(),
				q: {
					id,
					web
				}
			}
		})
	},

	TurnSwitch({
		a,
		id,
		open
	}) { //开关；关注老师
		return axiosApi(devUrl + 'Base/TurnSwitch', {
			data: {
				n: 'TurnSwitch',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					id,
					open
				}
			}
		})
	},
	
	LiveRoom({
		a,
		chapterId
	}) { //直播间；
		return axiosApi(devUrl + 'Course/LiveRoom', {
			data: {
				n: 'LiveRoom',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					chapterId
				}
			}
		})
	},
	
	PaySubmit({
		
		a,
		payment,
		isBalance,
		courseId,
		chapterId,
		price,
		payNum
	}) { //发起支付(打赏)；
		return axiosApi(devUrl + 'Oms/PaySubmit', {
			data: {
				n: 'PaySubmit',
				s: SessionId ? SessionId : getSession(),
				q: {
					payType:2,
					a,
					payment,
					isBalance,
					courseId,
					chapterId,
					price,
					payNum
				}
			}
		})
	},
	
	getCourseDetails({
		a,
		web,
		courseId,
		pa,
		li
	}) { //H5页面的共享师资分享里详情； 课程详情
		return axiosApi(devUrl + 'Course/CourseDetails', {
			data: {
				n: 'CourseDetails',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					web,
					courseId,
					'ta': {
						pa,
						li
					}
				}
			}
		})
	},

	getChapterList({
		a,
		web,
		courseId,
		pa,
		li
	}) { //H5页面的共享师资分享里目录； 课程目录
		return axiosApi(devUrl + 'Course/ChapterList', {
			data: {
				n: 'ChapterList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					web,
					courseId,
					'ta': {
						pa,
						li
					}
				}
			}
		})
	},

	getCourseCommentList({
		a,
		web,
		courseId,
		pa,
		li
	}) { //H5页面的共享师资分享的评论； 课程评论
		return axiosApi(devUrl + 'Course/CourseCommentList', {
			data: {
				n: 'CourseCommentList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					web,
					courseId,
					'ta': {
						pa,
						li
					}
				}
			}
		})
	},

	untilSessionId() {
		return new Promise((resolve, reject) => {
			let timer = setInterval(() => {
				let result = getSession();
				if(result) {
					console.log(result)
					resolve();
					clearInterval(timer);
				} else {
					console.log('wait');
				}
			}, 50)
		})
	},

	//老师列表 TeacherList
	//a:1 老师列表 2 关注老师列表 3 名师精选
	getTeacherList({
		a,
		web
	}) {
		return axiosApi(devUrl + 'Cis/TeacherList', {
			data: {
				n: 'TeacherList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					web,
				}
			}
		})
	},
	TeacherList({
		a,
		pa,
		li
	}) {
		return axiosApi(devUrl + 'Cis/TeacherList', {
			data: {
				n: 'TeacherList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					ta: {
						pa,
						li
					}
				}
			}
		})

	},

	getAdsList() { //获取轮播图
		return axiosApi(devUrl + 'Base/AdsList', {
			data: {
				n: 'AdsList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a: 4,
					web: 2,
				}
			}
		})
	},
	getCategoryList({
		a,
		id
	}) { //分类列表
		return axiosApi(devUrl + 'Base/CategoryList', {
			data: {
				n: 'CategoryList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					id,
					web: 2,
				}
			}
		})
	},
	getCourseFileList({
		courseId
	}) { //课程文件目录
		return axiosApi(devUrl + 'Course/CourseFileList', {
			data: {
				n: 'CourseFileList',
				s: SessionId ? SessionId : getSession(),
				q: {
					courseId
				}
			}
		})
	},

	//评价课程
	CourseEvaluateSubmit({
		courseId,
		content,
		starrating
	}) {
		return axiosApi(devUrl + 'Course/CourseEvaluateSubmit', {
			data: {
				n: 'CourseEvaluateSubmit',
				s: SessionId ? SessionId : getSession(),
				q: {
					courseId,
					content,
					starrating
				}
			}
		})

	},

	//添加银行卡

	AddBankCard({
		cardUserName,
		bankName,
		bankAddress,
		cardNum
	}) {
		return axiosApi(devUrl + 'Fina/AddBankCard', {
			data: {
				n: 'AddBankCard',
				s: SessionId ? SessionId : getSession(),
				q: {
					cardUserName,
					bankName,
					bankType: 1,
					bankAddress,
					cardNum

				}

			}

		})

	},
	
	//查看银行卡
	CheckBankCard(){
		return axiosApi(devUrl + 'Fina/CheckBankCard', {
			data: {
				n: 'CheckBankCard',
				s: SessionId ? SessionId : getSession(),
				q: {
					
				}

			}

		})
		
		
		
		
	},
	GetOrderStatus({id}){
		return axiosApi(devUrl + 'Oms/GetOrderStatus', {
			data: {
				n: 'GetOrderStatus',
				s: SessionId ? SessionId : getSession(),
				q: {
					id
				}

			}

		})
		
		
		
		
	},
	
	getOrderType({id}){
		
		return axiosApi(devUrl + 'Oms/getOrderType', {
			data: {
				n: 'getOrderType',
				s: SessionId ? SessionId : getSession(),
				q: {
					id
				}

			}

		})
		
		
		
		
	},
	//钱包明细
	
	DetailedList({a,pa,li}){
			return axiosApi(devUrl + 'Fina/DetailedList', {
			data: {
				n: 'DetailedList',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,
					ta:{
						pa,li
					}
				}

			}

		})
		
		
		
	},
	//提现
	
	ForwardSubmit({a,bankId,price,aliaccount,aliName,smsKey}){
		return axiosApi(devUrl + 'Fina/ForwardSubmit', {
			data: {
				n: 'ForwardSubmit',
				s: SessionId ? SessionId : getSession(),
				q: {
					a,bankId,price,aliaccount,aliName,smsKey
				}

			}

		})
		
		
		
		
		
	}
	
	

}

export default Api;