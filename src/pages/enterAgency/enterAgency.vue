<template>
	<!-- 入驻代理页面 -->
	<section class="enterAgency">
		
		<!-- 我是老师，我要代理 -->
		<div class="isMissAndAgency">
			<div class="isMissAndAgency-bg">
				<div class="isMissAndAgency-text">
					<p>共享师资</p>
					<p>让教育更公平<span>|</span>让用户爱上我们</p>
					<p></p>
				</div>
				
				<div style="margin: auto;width: 920px;display: flex;height: 282px;" class="cf">
					<div class="isMiss isItem">
						<h1>我是老师</h1>
						<hr />
						<p>需要引入教育内容</p>
						<el-button :plain="true" @click="missFor" id="missA">内容引入</el-button>
						<!--<a href="javascript:;" @click="missFor">内容引入</a>-->
					</div>
					<div class="isAgency isItem">
						<h1>我要代理</h1>
						<hr />
						<p>希望代理平台课程</p>
						<el-button :plain="true" @click="agencyFor" id="missB">课程代理</el-button>
						<!--<a href="javascript:;" @click="agencyFor">课程代理</a>-->
					</div>
				</div>
				
			</div>
		</div>
		
		<!-- 共享师资-引入和代理内容 -->
		<div class="missContent">
			
			<div class="contentItem">
				
				<div style="height: 830px;">
					<h2>共享师资·内容引入</h2>
					<p class="efficient">高效实现您的教育内容需求</p>
					
					<div class="cf" style="margin: auto;width: 1200px;display: flex;">
						<div class="applyItem fl">
							<h3>10万门课程资源</h3>
							<h3>任您自由选择</h3>
							<ul>
								<li>共享师资拥有数万家在线教育机构，</li>
								<li>提供了超过十万门的课程资源，</li>
								<li>我们帮助您将这些资源整合，</li>
								<li>让您轻松获取海量的教育内容。</li>
							</ul>
							<a @click="goForYou">立即申请</a>
						</div>
						<img src="../../assets/qz.png" class="fl"/>
					</div>
				</div>
				
				<div style="height: 830px;padding-top: 190px;box-sizing: border-box;">
					<div class="cf" style="margin: auto;width: 1200px;display: flex;">
						<img src="../../assets/ruzhi0.png" class="fl"/>
						<div class="applyItem fl" style="text-align: right;">
							<h3>名师大牛+精品课程</h3>
							<h3>提升平台影响力</h3>
							<ul>
								<li>联合众多学院知名机构</li>
								<li>汇聚众多教育名师行业大牛</li>
								<li>研发多门体系课程，系统学习专业知识</li>
								<li>开设专题讲座，近距离接触前沿思维</li>
							</ul>
							<a @click="goForYou">立即申请</a>
						</div>
					</div>
				</div>
				
			</div>
			
			<div class="contentItem">
				
				<div style="height: 830px;">
					<h2>共享师资·课程代理</h2>
					<p class="efficient">提供最优质、最专业的培训课程解决方案</p>
					
					<div class="cf" style="margin: auto;width: 1200px;display: flex;">
						<div class="applyItem fl">
							<h3>200个细节类目</h3>
							<h3>覆盖教育用户</h3>
							<ul>
								<li>我们为您提供了众多类目细分，</li>
								<li>包括校园学习、职业技能、兴趣生活等等，</li>
								<li>您可以从中选择适合您的平台用户需求类目课程。</li>
							</ul>
							<a @click="goForYou">立即申请</a>
						</div>
						<img src="../../assets/qz.png" class="fl"/>
					</div>	
				</div>	
				
				<div style="height: 830px;padding-top: 190px;box-sizing: border-box;">
					<div class="cf" style="margin: auto;width: 1200px;display: flex;">
						<img src="../../assets/ruzhi0.png" class="fl"/>
						<div class="applyItem fl" style="text-align: right;">
							<h3>名师大牛+精品课程</h3>
							<h3>提升平台影响力</h3>
							<ul>
								<li>联合众多学院知名机构</li>
								<li>汇聚众多教育名师行业大牛</li>
								<li>研发多门体系课程，系统学习专业知识</li>
								<li>开设专题讲座，近距离接触前沿思维</li>
							</ul>
							<a @click="goForYou">立即申请</a>
						</div>
					</div>	
				</div>	
			</div>
			
		</div>
		
		<!-- 请教育顾问来电为您介绍 -->
		<div class="for-you" id="forYou">
			<h2>请教育顾问来电为您介绍 </h2>
			<p>留下您的联系方式，我们的教育顾问将与您联系</p>
			<form class="cf" id="inputs">
				<input type="text" placeholder="企业名称" required="required" @blur="companyVerify" maxlength="26"/>
				<input type="text" placeholder="姓名" required="required" @blur="nameVerify" maxlength="26"/>
				<input type="text" placeholder="手机" required="required" @blur="mobileVerify" maxlength="11"/>
				<input type="email" placeholder="邮箱" required="required" @blur="emailVerify" maxlength="30"/>
				<span class="verify"></span>
				<span class="verify"></span>
				<span class="verify"></span>
				<span class="verify"></span>
			</form>
			
			<el-button
			    plain
			    @click="goEnterAgency">
			    立即申请
			</el-button>
			
		</div>

	</section>
</template>

<script>


export default {
	components:{
		
	},
	data() {
    return {
  		openId:'',
  		liList:[0,1,2],
		users:'',
		
		
    }
 },

  created(){
  	

	
  },
  mounted(){ //页面挂载之后；
  	
  	
  },
  methods:{
  	
  	open2() {
	    this.$message({
	      message: '成功！',
	      type: 'success'
	    });
	  }, 
	  open4() {
        this.$message.error(this.users);
      },
      
  	missFor(){ //点击我是老师；
  		
  		this.$Api.UserDetails().then( res => { //用户信息接口；
  			//console.log(res)
  			
  			//判断用户身份；
  			if (res.q.userInfo.userType == 1) { //是普通用户；
				this.$router.push('/agencyAa'); //点我是老师，就跳老师申请协议；
				
  			}else if (res.q.userInfo.userType == 2){ //是老师；
  				//点我是老师，就跳老师申请协议；
  				this.open2();
  				this.$router.push({
					name: "MyIncome",
					query: {
						type:2  //是老师；
					}
				})
  				
  			}else if (res.q.userInfo.userType == 3){ //是代理商；
  				//alert('您不是老师！') //点我是老师，就不跳了；	
  				this.users = '您不是老师账户！';
  				this.open4();
  			}
  			
  		})
  				
  	},
  	agencyFor(){ //点击我是代理商；
  		
  		this.$Api.UserDetails().then( res => { //用户信息接口；
  			//console.log(res)
  			
  			//判断用户身份；
  			if (res.q.userInfo.userType == 1) { //是普通用户；
  				this.$router.push('/agencyA'); //点我是代理商，就跳代理商申请协议；
  				
  			}else if (res.q.userInfo.userType == 2){ //是老师；
  				//alert('您不是代理商！') //点我是代理商，就不跳了；
  				this.users = '您不是代理商账户！';
  				this.open4();
  				
  			}else if (res.q.userInfo.userType == 3){ //是代理商；
  				//点我是代理商，就跳代理商页面；
  				this.open2();
  				this.$router.push({
					name: "MyIncome",
					query: {
						type:1  //是代理商；
					}
		
				})
  				
  			}
  			
  		})
  		
  	},
  	goForYou(){  //锚点；
  		document.getElementById("forYou").scrollIntoView(); 
  	},
  	goEnterAgency(){  
		var inputs = document.querySelector('#inputs'),
			input = inputs.querySelectorAll('input'),
			nameVerify = /^[\u4E00-\u9FA5A-Za-z]+$/, //姓名正则；
			mobileVerify = /^1[0-9]{10}$/, //手机正则；
			emailVerify = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/, //邮箱正则；
			obj = {
				'name':input[1].value,  //姓名；
				'mobile':input[2].value,  //手机；
				'company':input[0].value,  //企业名称;
				'email':input[3].value  //邮箱；
			};
		
		if (input[0].value.trim()&&
			nameVerify.test( input[1].value.trim() )&&
			mobileVerify.test( input[2].value.trim() )&&
			emailVerify.test( input[3].value.trim() ) ) {

			this.$Api.getAdviserSubmit(obj).then((res)=>{  //顾问咨询提交接口；
				console.log(res);
				
				this.$notify({
		          title: '成功',
		          message: '您的信息申请成功',
		          type: 'success'
		        });
		        
				//获取到用户填写的信息后，跳回本页面顶置顶部；
				document.querySelector('.headBox').scrollIntoView(); 

				//清空所有输入框；
				input[0].value = '';
				input[1].value = '';
				input[2].value = '';
				input[3].value = '';
				
//				for (var i=input.length;i>0;i--) { 
//					input[i].value = '';
//					console.log(i)
//				}
		
			})
			
		}else{
			this.$notify.error({
	          title: '错误',
	          message: '请把信息填写完整！'
	        });

			
		}
		
  	},
  	companyVerify(){  //企业名称验证；
  		var inputs = document.querySelector('#inputs'),
  			input = inputs.querySelectorAll('input'),
  			verifys = document.querySelectorAll('.verify'); 
		
		if (!input[0].value.trim()) {  //输入框为空时；
			verifys[0].innerHTML = '企业名称不能为空';
			verifys[0].style.color = 'red';
		}else{
			verifys[0].innerHTML = '';
		}	
		
  	},
  	nameVerify(){  //姓名验证；
  		var inputs = document.querySelector('#inputs'),
  			input = inputs.querySelectorAll('input'),
  			verifys = document.querySelectorAll('.verify'),
  			nameVerify = /^[\u4E00-\u9FA5A-Za-z]+$/; //姓名正则；
		
		if (!input[1].value.trim()) {  //输入框为空时；
			verifys[1].innerHTML = '姓名不能为空';
			verifys[1].style.color = 'red';
		}else{
			if(nameVerify.test(input[1].value)){//如果验证正确执行以下代码
				verifys[1].innerHTML = '';
			}else {//验证不成功，执行以下代码
				verifys[1].innerHTML = '不能有数字，请重新输入';
				verifys[1].style.color = 'red';
			}
		}		
  	},
  	mobileVerify(){  //手机验证；
  		var inputs = document.querySelector('#inputs'),
  			input = inputs.querySelectorAll('input'),
  			verifys = document.querySelectorAll('.verify'),
  			mobileVerify = /^1[0-9]{10}$/; //手机正则；
		
		if (!input[2].value.trim()) {  //输入框为空时；
			verifys[2].innerHTML = '手机不能为空';
			verifys[2].style.color = 'red';
		}else{
			if(mobileVerify.test(input[2].value)){//如果验证正确执行以下代码
				verifys[2].innerHTML = '';
			}else {//验证不成功，执行以下代码
				verifys[2].innerHTML = '手机格式不正确，请重新输入';
				verifys[2].style.color = 'red';
			}
		}		
  	},
  	emailVerify(){  //邮箱验证；
  		var inputs = document.querySelector('#inputs'),
  			input = inputs.querySelectorAll('input'),
  			verifys = document.querySelectorAll('.verify'),
  			emailVerify = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/; //邮箱正则；
		
		if (!input[3].value.trim()) {  //输入框为空时；
			verifys[3].innerHTML = '邮箱不能为空';
			verifys[3].style.color = 'red';
		}else{
			if(emailVerify.test(input[3].value)){//如果验证正确执行以下代码
				verifys[3].innerHTML = '';
			}else {//验证不成功，执行以下代码
				verifys[3].innerHTML = '邮箱格式不正确，请重新输入';
				verifys[3].style.color = 'red';
			}
		}		
  	},
  	
  	
  }
}	
</script>

<style scoped lang="scss">
#missA,#missB{
	width: 98px;height: 38px;border: 1px solid #fff;border-radius: 4px;text-align: center;font-size: 15px;color: #fff;text-decoration: none;display: inline-block;
}
#missA{
	background: #1d9ef2;
}
#missB{
	background: #0253bf;
}
#missA:hover{
	background: none;
}
#missB:hover{
	background: #0253bf;
}
.enterAgency{
	width: 100%;
	background: #fff;
	.isMissAndAgency{
		height: 830px;
		background: url(../../assets/ruzhi0.png) no-repeat;
		background-size: 100% 100%;
		.isMissAndAgency-bg{
			position: relative;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0,0,0,.6);
			box-sizing: border-box;
		}
		.isMissAndAgency-text{
			width: 100%;height: 548px;
			p{color: #fff;text-align: center;}
			p:nth-of-type(1){font-size: 40px;padding: 170px 0 90px 0;}
			p:nth-of-type(2){
				font-size: 55px;padding-bottom: 60px;
				span{margin: 0 25px;vertical-align: top;}
			}
			p:nth-of-type(3){width: 317px;height: 1px;background: #fff;/*margin-left: 302px;*/margin: auto;}
		}
		.isItem{
			width: 440px;height: 230px;color: #fff;text-align: center;/*position: absolute;bottom: 52px;*/
			h1{height: 85px;padding-top: 30px;box-sizing: border-box;font-size: 35px;}
			hr{width: 40px;background: #fff;height: 1px;border: none;margin-left: 200px;}
			p{height: 64px;font-size: 13px;padding-top: 32px;box-sizing: border-box;}
			a{width: 98px;height: 38px;border: 1px solid #fff;border-radius: 4px;text-align: center;line-height: 38px;font-size: 15px;color: #fff;text-decoration: none;display: inline-block;}
		}
		.isMiss{background: #1d9ef2;float: left;}
		.isAgency{background: #0253bf;float: right;margin-left: 40px;}
	}
	.missContent{
		background: #fff;
		.contentItem{
			height: 1662px;
			color: #000;
			position:relative;
			h2{font-size: 41px;padding-top: 100px;box-sizing: border-box;text-align: center;padding-bottom: 30px;}
			.efficient{text-align: center;font-size: 18px;height: 100px;}
			img{width: 700px;height: 450px;}
			img:nth-of-type(1){border: 1px solid #f0f0f0;}
			img:nth-of-type(2){}
			.applyItem{
				width: 500px;height: 450px;padding-top: 62px;box-sizing: border-box;
				h3{font-size: 35px;padding-bottom: 15px;}
				li{list-style: none;font-size: 17px;padding-top: 14px;}
				a{width: 200px;height: 60px;background: #3babf5;color: #fff;border-radius: 4px;display: inline-block;text-decoration: none;text-align: center;line-height: 60px;margin-top: 39px;font-size: 18px;}
			}
			
		}
	}
	.for-you{
		height: 630px;background: #e6e6e6;text-align: center;color: #000000;position: relative;
		h2{font-size: 42px;padding-top: 100px;}
		p{font-size: 18px;padding-top: 30px;padding-bottom: 50px;}
		form{width: 920px;height: 200px;position: relative;margin: auto;}
		input{width: 430px;height: 40px;text-indent: 20px;line-height: 40px;background: #fff;border: none;float: left;margin-bottom: 60px;}
		input:nth-of-type(odd){margin-right: 60px;}
		a{width: 200px;height: 60px;background: #3babf5;color: #fff;border-radius: 4px;display: inline-block;text-decoration: none;text-align: center;line-height: 60px;font-size: 18px;position: absolute;bottom: 98px;left: 45%;}
	}
}

.verify{position: absolute;}
.verify:nth-of-type(1){bottom: 135px;left: 20px;}
.verify:nth-of-type(2){bottom: 135px;left: 512px;}
.verify:nth-of-type(3){bottom: 35px;left: 20px;}
.verify:nth-of-type(4){bottom: 35px;left: 512px;}

.fl{float: left;}
.fr{float: right;}

.cf:after{
	content: '';
	display: block;
	clear: both;
}	
</style>

<style type="text/css">
/*elementUI通知组件样式*/	
.enterAgency .el-button{background: #3BABF5;width: 200px;height: 60px;color: #fff;font-size: 20px;}	
</style>