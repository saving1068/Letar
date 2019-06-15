
const Fontsize = document.documentElement.clientWidth / 375
let nowYear = new Date().getFullYear()
let nowMonth = new Date().getMonth() + 1
var newArr = []
var arr = ["汉族", "蒙古族", "满族", "朝鲜族", "赫哲族", "达斡尔族", "鄂温克族", "鄂伦春族", "回族", "东乡族", "土族", "撒拉族", "保安族", "裕固族", "维吾尔族", "哈萨克族", "柯尔克孜族", "锡伯族", "塔吉克族", "乌孜别克族", "俄罗斯族", "塔塔尔族", "藏族", "门巴族", "珞巴族",
	"羌族", "彝族", "白族", "哈尼族", "傣族", "僳僳族", "佤族", "拉祜族", "纳西族", "景颇族",
	"布朗族", "阿昌族", "普米族", "怒族", "德昂族", "独龙族", "基诺族", "苗族", "布依族", "侗族", "水族", "仡佬族", "壮族", "瑶族", "仫佬族", "毛南族", "京族", "土家族", "黎族", "畲族", "高山族"
]
for(var i = 0; i < arr.length; i++) {
	var obj = {
		value: i + 1,
		text: arr[i]
	}
	newArr.push(obj)

}

const store = new Vuex.Store({
	state: {
	      isLogin:null,
	      courseId:null,//免费课程报名的Id
	      user:{},
	      isEnter:true,
	      code:{}
	      
	},
	getters: {
       getisLogin: state => {
      return state.isLogin
    }
	},
	mutations: {
changeState(state,flag){
			state.isLogin=flag
			
	},
	setUser(state,user){
		state.user={...user}
		
	},
	setCode(state,code){
		
		state.code={...code}
	},
	setEnter(state,enter){
		
		state.isEnter=enter
	}
	},
	actions: {
changeLogin({
			commit
		},flag){
			commit('changeState',flag)
		},
		changeUser({
			commit
		},user){
			
			commit('setUser',user)
			
		},
		changeEnter({
			commit
		},enter){
			
			commit('setEnter',enter)
			
		},
		changeCode({
			commit
		},code){
			
			commit('setCode',code)
			
		}
		
		
		
		
	},
	
	
	
	modules: {}

})
export default store