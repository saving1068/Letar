<template>
	<div class="gxsz" style="min-height: 100%;">
		
		<section class="content">
			<input type="text" placeholder="请输入手机号" id="mob" maxlength="11" @blur="limitTip"/>
			<button v-if="num<1" @click="getYZM" class="getCode">获取验证码</button>
			<button v-if="num>1">{{num}}</button>
			<input type="text" placeholder="请输入验证码" maxlength="6" @blur="codeTip" v-model="code"/>
			<button @click="btnClick">注册</button>
			<i class="fa fa-check-circle" @click="tigBg" id="check"></i>
			<p @click="goYH">我已阅读《用户注册协议》</p>
		</section>
		
	</div>
</template>

<script>


export default {
	data() {
	    return {
	  		openId:'',
	  		code:'',
	  		smsKey:'',
	  		referee_id:this.$route.query.id, //获取route参数id；
	  		userId:this.$route.query.userId, //获取route参数userId；
	  		num: 0,
	  		disabled: true,
			disInput: true,
			onoff:true,
			
    }
 },
  created(){
	
	this.$Api.getSessionId().then(res=>{ //获取会话接口；
		localStorage.setItem("session",res.s)
	})
	
	
  },
  methods:{
  	limitTip(event){  //手机输入框位数限制提示；
  		event = event||window.event;
  		var parName = /^1[0-9]{10}$/; 
		
		if (parName.test(event.target.value)) { //手机号验证提示；
			event.target.style.border = 'none';
			event.target.style.borderBottom = '2px solid #f2f2f2';
		}else{
			event.target.style.border = '1px solid rgba(255,0,0,0.4)';
		}
  		
  	},
  	codeTip(event){  //验证码输入框位数限制提示；
  		event = event||window.event;
		
		if (event.target.value.length == 6) { //验证码验证提示；
			event.target.style.border = 'none';
			event.target.style.borderBottom = '2px solid #f2f2f2';
		}else{
			event.target.style.border = '1px solid rgba(255,0,0,0.4)';
		}
  		
  	},
  	tigBg(){
  		let content = document.querySelector('.content'),
  		    contentI = content.querySelector('i');
  		
  		if (contentI.className !== 'isConsent') {
  			contentI.className = '';
	  		contentI.className = 'isConsent';
	  		contentI.style.width = '18px';
	  		contentI.style.height = '18px';
	  		contentI.style.bottom = '9px';
  		} else{
  			contentI.className = '';
	  		contentI.className = 'fa fa-check-circle';
	  		contentI.style.width = '18px';
	  		contentI.style.height = '18px';
	  		contentI.style.bottom = '11px';
  		}
  		
  	},
  	
  	btnClick(){  //点击注册；
  		var content = document.querySelector('.content'),
  		    inputs = content.querySelectorAll('input'), 
  		    check = document.querySelector('#check'),
			parName = /^1[0-9]{10}$/; 
			
		if (!inputs[0].value.trim()&&!inputs[1].value.trim()) { 
			alert("手机号和验证码都不能为空");
		} else if(!inputs[0].value.trim()){ 
			alert("手机号不能为空");
		}else if(!inputs[1].value.trim()){ 
			alert("验证码不能为空");
		}else if(check.className == 'isConsent') {
			alert('请阅读用户注册协议，且打勾');
		}else{
			
			if (parName.test(inputs[0].value)) {  //手机号正则匹配正确；
				
				if (this.onoff == true) { //开关：用来可以重复点击注册按钮而不会报验证码错误；
					
					//判断是否有userId;
					if (this.$route.query.userId == undefined) { //没有userId就用id；
						//alert('没有userId')
						
						this.$Api.getSmsCode({'a':2,'type':7,'mobile':inputs[0].value,'code':inputs[1].value}).then((res) =>{  //验证验证码接口；
						
							let s = res.q.s; 
							this.smsKey = res.q.smsKey;
							//this.referee_id = this.userId;
							
							if (s == 0) {  //判断验证码正确，就可以注册成功；
								
								var loginObj = {
									a:1,
									mobile:inputs[0].value,
									code:1,
									smsKey:this.smsKey,
									referee_id:this.referee_id,
								}
								
								console.log(loginObj.referee_id)
								
								this.$Api.UserLogin(loginObj).then((res)=>{ //用户登录注册接口；
									if(res.q.s==0){
										window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aiitec.letar';
									}
								})
								
								this.onoff = false;
							}else{
								alert('验证码错误');
							}
				
						})
						
						
					}else{ //有userId就用userId；
						//alert('有userId')
						
						this.$Api.getSmsCode({'a':2,'type':7,'mobile':inputs[0].value,'code':inputs[1].value}).then((res) =>{  //验证验证码接口；
						
							let s = res.q.s; 
							this.smsKey = res.q.smsKey;
							
							if (s == 0) {  //判断验证码正确，就可以注册成功；
								
								var loginObj = {
									a:1,
									mobile:inputs[0].value,
									code:1,
									smsKey:this.smsKey,
									referee_id:this.userId,
								}
								
								console.log(loginObj.referee_id)
								
								this.$Api.UserLogin(loginObj).then((res)=>{ //用户登录注册接口；
									if(res.q.s==0){
										window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aiitec.letar';
									}
								})
								
								this.onoff = false;
							}else{
								alert('验证码错误');
							}
				
						})
						
						
					}
					
					
				
				}
				
			}else{
				alert('手机号格式不对！')
			}
			
		}
		
  	},
  	getYZM(){ //点击获取验证码；
  		
  		let getCode = document.querySelector('.getCode'),
  		    mob = document.querySelector('#mob'),
  		    mobVal = mob.value; //手机号码；
  		
  		if (!mobVal.trim()) {
  			
			alert('手机号必填');
  			
  		}else{
  			
  			this.$Api.getSmsCode({'a':1,'type':7,'mobile':mobVal}).then((res) =>{  //获取验证码接口；
				console.log(res)
				if (res.q.s !== 0) { //账号已存在；
					alert('账号已存在')

				}else{  //手机账号没有注册过，可以注册；
					//alert("获取验证码成功，请稍等！");
					this.num = 60;
					this.countDown();
				}
			})
	  		
  		}
  		
  		
  		
  	},
  	goYH(){
  		this.$router.push({
  			name:"UserAgreement"
  		});
  	},
  	countDown() {
		let c = this.num;
		var that=this;
		var cd = setInterval(() => {
			if(that.num < 1) {
				that.num= 0;
                that.disInput=true;
				clearInterval(cd);
			} else {
				c--;
				that.disInput=false;
				that.num = c;
			}

		}, 1000)

	},

  	
  }
}	


</script>

<style scoped lang="less">
li{list-style: none;}
.gxsz{background-color: #fff;}
.content{
	height: 100%;
	position: relative;
	input:nth-of-type(1){
		position: absolute;
		left: 10/50rem;
		top: 0/50rem;
		width: (710/2)/50rem;
		height: (100/2)/50rem;
		color: #757575;
		font-size: 15/50rem;
		font-family: Microsoft Yahei;
		text-indent: 10/50rem;
		outline: none;
		border: none;
		border-bottom: 2px solid #f2f2f2;
	}
	button:nth-of-type(1){
		left: 280/50rem;
		top: (30/2)/50rem;
		width: 81/50rem;
		height: 20/50rem;
		color: #757575;
		font-size: 15/50rem;
		text-align: center;
		font-family: Microsoft Yahei;
		outline: none;
		border: none;
		position: absolute;
		background: #fff;
		z-index: 20;
	}
	
	input:nth-of-type(2){
		left: 10/50rem;
		top: 52/50rem;
		width: (710/2)/50rem;
		height: (100/2)/50rem;
		color: #757575;
		font-size: 15/50rem;
		font-family: Microsoft Yahei;
		position: absolute;
		text-indent: 10/50rem;
		outline: none;
		border: none;
		border-bottom: 2px solid #f2f2f2;
	}
	
	button:nth-of-type(2){
		left: 38/50rem;
		top: (350/2)/50rem;
		width: 302/50rem;
		height: 40/50rem;
		line-height: 23/50rem;
		border-radius: 49/50rem;
		background-color: #3babf5;
		color: rgba(255, 255, 255, 1);
		font-size: 15/50rem;
		text-align: center;
		font-family: Arial;
		position: absolute;
		border: none;
	}
	i{
		position: fixed;
		left: 89/50rem;
		bottom: 4/50rem;
		width: 25/50rem;
		height: 25/50rem;
		font-size: 22/50rem;
		color: #0076ff;
	}
	p{
		position: fixed;
		left: 117/50rem;
		bottom: 8/50rem;
		width: 169/50rem;
		height: 23/50rem;
		line-height: 20/50rem;
		color: rgba(16, 16, 16, 1);
		font-size: 14/50rem;
		text-align: center;
		font-family: Arial;
		line-height: 27/50rem;
	}
}

/*是否同意我已阅读用户注册协议样式*/
.isConsent{border: 1px solid #9b9b9b;border-radius: 30/50rem;background: #fff;}

.cf:after{content: '';display: block;clear: both;}	
</style>