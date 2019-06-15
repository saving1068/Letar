<template>
	<div class="dialog">
		<div class="mask"></div>
		<div class="dialog-content" v-show="register&&!read">

			<div class="title">
				手机账号注册
				<i @click="close"></i>

			</div>
			<div class="input">
				<div class="inputBox">
					<input type="tel" maxlength="11" v-model="tel" placeholder="请输入手机号码" />
				</div>
			</div>
			<div class="input">
				<div class="inputBox">
					<input type="tel" maxlength="6" v-model="codeText" placeholder="请输入手机验证码" />
					<button class="code pointer" @click="getCode" v-if="code==0" style="font-size: 14px;">发送验证码</button>
					<button class="code" v-if="code>0">{{code}}</button>
				</div>
			</div>
			<div class="customer">
				<div :class="['icon',flag?'active':'']" @click="change"></div>
				<span style="font-size: 14px;">我已阅读并接受<a @click="showRead" style="color: #000000;">《用户协议》</a></span>
			</div>
			<div  :class="[flag&tel.length==11&codeText.length==6 ?'submit':'notActive']" @click="registerSubmit">
				注册
			</div>
			<div class="have">
				<span>已有账号,</span>
				<a href="javascript:void(0)" @click="changeLogin(1)">马上登录</a>
			</div>

		</div>

		<div class="dialog-content" v-show="!register&&!read">
			<div class="tab">
				<li :class="[wxFlag?'':'active']" @click="changeTab(0)">手机账号登录</li>
				<li :class="[wxFlag?'active':'','last']" @click="changeTab(1)">微信账号登录</li>
				<i :class="[wxFlag?'activeIcon':'close']" @click="close"></i>
			</div>
			<div class="qeBox" v-show="wxFlag">
				<div :id="idName" style="width: 300px;margin:30px auto;">

				</div>
			</div>
			<div v-show="!wxFlag">
				<div class="input" style="margin-top: 40px;">
					<div class="inputBox">
						<input type="tel" maxlength="11" v-model="telLogin" placeholder="请输入手机号码" />
					</div>
				</div>
				<div class="input" style="margin-bottom: 50px;">
					<div class="inputBox">
						<input type="tel" maxlength="6" v-model="codeLogin" placeholder="请输入手机验证码" />
						<button class="code pointer" v-if="codeSecond==0" @click="loginCode" style="font-size: 14px;">发送验证码</button>
						<button class="code" v-if="codeSecond>0">{{codeSecond}}</button>
					</div>
				</div>
				<div class="submit" @click="Login">
					登录
				</div>
				<div class="have">
					<span>没有账号,</span>
					<a href="javascript:void(0)" @click="changeLogin(2)">立即注册</a>
				</div>
			</div>

		</div>
       <div class="ReadBox" v-if="read">
       	<div class="title">
				用户协议
				<i @click="closeRead"></i>
       
        </div>
         <div class="ReadContent" v-html="content">
			</div>
       	
       </div>
	</div>
</template>
<script>
	import VueQArt from 'vue-qart'
	export default {
		name: 'Dialog',

		components: {
			VueQArt
		},
		data() {
			return {
				code: 0,
				codeSecond: 0,
				flag: false,
				register: false,
				wxFlag: true,
				tel: "",
				codeText: "",
				telLogin: "",
				codeLogin: "",
				idName: "login_container",
				timer: null,
				content:"",
				read:false
			}
		},
		computed: {
			modal: function() {
				let options = this.dialogOption;
				return {
					title: options.title || '提示',
					text: options.text,
					cancelButtonText: options.cancelButtonText ? options.cancelButtonText : '取消',
					confirmButtonText: options.confirmButtonText ? options.confirmButtonText : '确定',
				}
			}
		},
		created() {
			var num = Math.floor(Math.random() * 10000000);
			this.idName += num
            this.getData()
            
            
		},
		mounted(){
			       var that = this
					var newUrl = encodeURIComponent(window.location.protocol + "//" + window.location.host)
					console.log(newUrl)
					var obj = new WxLogin({
						self_redirect: false,
						id: that.idName,
						appid: "wx8de63880e496e198",
						scope: "snsapi_login",
						redirect_uri: newUrl,
						state: "",
						style: "",
						href: 'https://h5.crocodilesecret.d.aiitec.org/static/weixin.css'

					});
					document.getElementById(that.idName).setAttribute("width", "100%")
		},
		methods: {
			showRead(){
				this.read=true
				
			},
			closeRead(){
				this.read=false
			},
			getData(){
				this.$Api.getArticleDetails({a:4}).then((res)=>{
					console.log(res)
					this.content=res.q.articles.content
				})
				
			},
			registerSubmit() {
				var obj = {
					a: 2,
					mobile: this.tel,
					type: 7,
					code: this.codeText
				}
//				if(!this.flag) {
//					this.$message({
//						showClose: true,
//						message: '请先阅读用户信息',
//						type: 'error'
//					});
//					return
//
//				}

				this.$Api.SmsCode(obj).then((res) => {
					console.log(res)
					if(res.q.s == 0) {
						var newObj = {

							a: 1,
							mobile: this.tel,
							smsKey: res.q.smsKey

						}

					}
					this.$Api.UserLogin(newObj).then((res) => {
						console.log(res)
						if(res.q.s == 0) {
							this.$store.dispatch('changeLogin', true)
							
							console.log(this.$route.name)
							if(this.$route.name=="Index"||this.$route.name=="SeekPage"||this.$route.name=="ClassDetails"){
									
								}
							
							this.init()
							this.$emit('closeDialog', false)
						} else {
							this.$message({
								showClose: true,
								message: res.q.d,
								type: 'error'
							});

						}
					})
				})

			},

			loginCode() {

				var obj = {
					a: 1,
					type: 1,
					mobile: this.telLogin,

				}
				var regAn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

				if(!regAn.test(this.telLogin)) {
					this.$message({
						showClose: true,
						message: '请输入正确手机号',
						type: 'error'
					});
					return

				}

				this.$Api.SmsCode(obj).then((res) => {
					console.log(res)
					if(res.q.s == 0) {
						this.codeSecond = 60
						this.countDown(2)

					} else {
						this.$message({
							showClose: true,
							message: res.q.d,
							type: 'error'
						});

					}

				})

			},
			init() {
				this.code = 0
				this.codeSecond = 0
				this.flag = false
				this.register = false
				this.wxFlag = true
				this.tel = ""
				this.codeText = ""
				this.telLogin = ""
				this.codeLogin = ""
				clearInterval(this.timer)

			},
			Login() {
				var reg = /^[0-9]*$/
				if(!reg.test(this.codeLogin)) {

					this.$message({
						showClose: true,
						message: "请输入数字验证码",
						type: 'error'
					});

				}

				var obj = {
					a: 2,
					mobile: this.telLogin,
					type: 1,
					code: this.codeLogin
				}
				this.$Api.SmsCode(obj).then((res) => {
					console.log(res)
					if(res.q.s == 0) {
						var newObj = {

							a: 1,
							mobile: this.telLogin,
							smsKey: res.q.smsKey

						}
						this.$Api.UserLogin(newObj).then((res) => {
							console.log(res)
							if(res.q.s == 0) {
								this.$store.dispatch('changeLogin', true)
								
								if(this.$route.name=="Index"||this.$route.name=="SeekPage"||this.$route.name=="ClassDetails"){
									console.log(this.$route.name)
									
								}
								this.init()
								this.$emit('closeDialog', false)
								this.$message({
									showClose: true,
									message: '登录成功',
									type: 'success'
								});

							} else {
								this.$message({
									showClose: true,
									message: res.q.d,
									type: 'error'
								});

							}
						})
					} else {
						this.$message({
							showClose: true,
							message: res.q.d,
							type: 'error'
						});

					}

				})

			},

			getCode() {

				var obj = {
					a: 1,
					type: 7,
					mobile: this.tel,

				}

				var regAn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

				if(!regAn.test(this.tel)) {
					this.$message({
						showClose: true,
						message: '请输入正确手机号',
						type: 'error'
					});
					return

				}

				this.$Api.SmsCode(obj).then((res) => {
					if(res.q.s == 0) {
						this.code = 60;
						this.countDown(1)
					} else {
						this.$message({
							showClose: true,
							message: res.q.d,
							type: 'error'
						});

					}

				})

			},
			changeTab(num) {

				if(num == 0) {

					this.wxFlag = false

				} else {
					this.wxFlag = true

				}

			},

			changeLogin(num) {
				this.code == 0
				if(num == 1) {
					//					var that=this
					console.log(1)
					this.register = false
					var that = this
					var newUrl = encodeURIComponent(window.location.protocol + "//" + window.location.host)
					console.log(newUrl)
					var obj = new WxLogin({
						self_redirect: false,
						id: that.idName,
						appid: "wx8de63880e496e198",
						scope: "snsapi_login",
						redirect_uri: newUrl,
						state: "",
						style: "",
						href: 'https://h5.litakeji.com/static/css/weixin.css'

					});
					document.getElementById(that.idName).setAttribute("width", "100%")

				} else {

					this.register = true

				}

			},
			close() {
				console.log(1)
				this.init()
				this.$emit('closeDialog', false)
			},
			countDown(type) {
				if(type == 1) {
					this.timer = setInterval(() => {
						if(this.code < 1) {
							this.code = 0;

							clearInterval(this.timer);
						} else {
							this.code--;

						}

					}, 1000)

				} else {
					this.timer = setInterval(() => {
						if(this.codeSecond < 1) {
							this.codeSecond = 0;

							clearInterval(this.timer);
						} else {
							this.codeSecond--;

						}

					}, 1000)

				}

			},
			change() {
				this.flag = !this.flag
			},

		}

	}
</script>

<style scoped="scoped" lang="scss">
	.dialog {
		position: relative;
		.ReadBox{
			position: fixed;
			box-sizing: border-box;
			border-radius: 10px;
			width:750px;
			height: 570px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			z-index: 2010;
				.title {
					width: 100%;
					height: 70px;
				font-size: 28px;
				font-weight: 600;
				text-align: center;
				border-radius: 10px 10px 0 0;
				background: #28a3f4;
				line-height: 70px;
				color: #FFFFFF;
				position: relative;
				i {
					width: 16px;
					height: 16px;
					position: absolute;
					cursor: pointer;
					right: 10px;
					top: 26px;
					background: url(../../assets/icon_close_white.png) no-repeat;
					background-size: 100%;
				}
			}
			.ReadContent{
				height: 500px;
				width: 100%;
				overflow-y: scroll;
				color: #000000;
				overflow-x: hidden;
				/*font-size: 18px;*/
				/*white-space:nowrap;*/
			}
		}
		
		.dialog-content {
			position: fixed;
			box-sizing: border-box;
			border-radius: 10px;
			width: 460px;
			height: 370px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			z-index: 2000;
			.tab {
				display: flex;
				position: relative;
				li {
					width: 230px;
					height: 50px;
					list-style: none;
					text-align: center;
					font-size: 16px;
					line-height: 50px;
					border-radius: 10px 0 0 0;
					background: #CDCDCD;
					cursor: pointer;
				}
				.close {
					width: 16px;
					height: 16px;
					background: url(../../assets/icon_close_grey.png) no-repeat;
					background-size: 100%;
					position: absolute;
					cursor: pointer;
					right: 10px;
					top: 16px;
				}
				.activeIcon {
					width: 16px;
					height: 16px;
					background: url(../../assets/icon_close_white.png) no-repeat;
					background-size: 100%;
					position: absolute;
					cursor: pointer;
					right: 10px;
					top: 16px;
				}
				.last {
					border-radius: 0 10px 0 0;
				}
				.active {
					color: #FFFFFF;
					background: #28A3F4;
				}
			}
			.qeBox {
				font-size: 16px;
				p {
					color: #818181;
					text-align: center;
				}
				img {
					width: 150px;
					text-align: center;
					height: 150px;
				}
			}
			.submit {
				margin: auto;
				margin-top: 20px;
				width: 350px;
				height: 40px;
				font-size: 20px;
				line-height: 40px;
				border-radius: 5px;
				background: #3babf5;
				color: #FFFFFF;
				cursor: pointer;
				text-align: center;
			}
			.notActive{
				margin: auto;
				margin-top: 20px;
				width: 350px;
				height: 40px;
				font-size: 20px;
				line-height: 40px;
				border-radius: 5px;
				background: #BBBBBB;
				color: #FFFFFF;
				cursor: pointer;
				text-align: center;
				
				
			}
			.have {
				margin-top: 20px;
				font-size: 14px;
				text-align: center;
				a {
					color: #3babf5;
					cursor: pointer;
				}
			}
			.customer {
				width: 350px;
				height: 40px;
				margin: auto;
				display: flex;
				line-height: 40px;
				margin-top: 10px;
				.icon {
					position: relative;
					top: 9px;
					border: 1px solid #888888;
					border-radius: 50%;
					box-sizing: border-box;
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}
				.active {
					width: 20px;
					height: 20px;
					border: none;
					background: url(../../assets/common_icon_selete.png) no-repeat;
					background-size: 100%;
				}
			}
			.title {
				font-size: 28px;
				font-weight: 600;
				text-align: center;
				border-radius: 10px 10px 0 0;
				background: #28a3f4;
				line-height: 70px;
				color: #FFFFFF;
				position: relative;
				i {
					width: 16px;
					height: 16px;
					position: absolute;
					cursor: pointer;
					right: 10px;
					top: 26px;
					background: url(../../assets/icon_close_white.png) no-repeat;
					background-size: 100%;
				}
			}
			.input {
				margin-top: 20px;
				width: 100%;
				height: 50px;
				.inputBox {
					width: 350px;
					height: 100%;
					border-bottom: 1px solid #808080;
					margin: auto;
					position: relative;
					input {
						border: none;
						outline: none;
						font-size: 16px;
						width: 100%;
						height: 100%;
					}
					.pointer {
						cursor: pointer;
					}
					.code {
						position: absolute;
						outline: none;
						border: none;
						background: #FFFFFF;
						width: 80px;
						text-align: center;
						right: 0;
						top: 15px;
						color: #28a3f4;
					}
				}
			}
		}
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 2000;
			background: rgba(0, 0, 0, .5);
		}
	}
</style>