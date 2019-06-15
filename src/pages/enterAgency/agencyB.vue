<template>
	<!-- 入驻代理商——提交资料页面 -->
	<div class="agencyBBox">
	
	
	<section class="agencyA">
		
		<!-- 步骤条 -->
		<div class="article-steps">
			<div class="article-box">
				<span class="el-icon-circle-check-outline"></span>
				<span class="article-active">2</span>
				<span>3</span>
				<div class="article-item">签订入驻协议</div>
				<div class="article-item article-active">提交资料</div>
				<div class="article-item">入驻审核</div>
			</div>

		</div>
		
		<!-- 入驻代理商个人信息内容 -->
		<div class="agencyAContent">
			<h2>个人信息</h2>
			
			<form class="cf">
				<p><span>*</span>真实姓名</p>
				<input type="text" placeholder="须与身份证一致" required="required" id="name" @blur="nameVerify" maxlength="18"/>
				<span class="verify"></span>
			</form>
			<form class="cf">
				<p><span>*</span>性别</p>
				<select id="sex">
					<option value="1">男</option>
					<option value="2">女</option>
				</select>
			</form>
			<form class="cf">
				<p><span>*</span>我的职业</p>
				<input type="text" placeholder="请填写职业" required="required" id="profession" @blur="professionVerify" maxlength="16"/>
				<span class="verify"></span>
			</form>
			<form class="cf">
				<p><span>*</span>身份证明</p>
				<select id="idCard">
					<option value="身份证">身份证</option>
					<!--<option value=""></option>-->
				</select>
			</form>
			<form class="cf">
				<p><span>*</span>证件号码</p>
				<input type="text" placeholder="请填写真实证件号码" required="required" id="IDnumber" @blur="IDnumberVerify" maxlength="18"/>
				<span class="verify"></span>
			</form>
			
			<form class="cf fileBox">
				<p><span>*</span>上传身份证</p>

				<div class="fileItem">
		
					<div class="fileBg">
						<i class="el-icon-plus"></i>
						<span>点击上传图片</span>
						<input class="file" type="file" accept="image/*" name="file[]" id="publish-imgA"  @change="uploadImgA" ref="imgInputA"/>
						<img :src="userURLA" v-if="isUrlA"/>
					</div>
					
					<h6>身份证正面</h6>
				</div>
				
				<div class="fileItem">
					
					<div class="fileBg">
						<i class="el-icon-plus"></i>
						<span>点击上传图片</span>
						<input class="file" type="file" accept="image/*" name="file[]" id="publish-imgB"  @change="uploadImgB" ref="imgInputB"/>
						<img :src="userURLB" v-if="isUrlB"/>
					</div>
					
					<h6>本人手持身份证</h6>
					
				</div>
				
			</form>
			
			<form class="cf">
				<p><span>*</span>邮箱</p>
				<input type="email" placeholder="请填写邮箱" required="required" id="email" @blur="emailVerify" maxlength="30"/>
				<span class="verify"></span>
			</form>
			<form class="cf">
				<p><span>*</span>推荐人手机</p>
				<input type="text" placeholder="请填写手机号码" id="recommendMob" @blur="recommendMobVerify" maxlength="11"/>
				<span class="verify"></span>
			</form>
			<form class="cf">
				<p><span>*</span>手机号码</p>
				<input type="text" placeholder="请填写手机号码" required="required" id="mob" @blur="mobileVerify" maxlength="11"/>
				<span class="verify"></span>
			</form>
			<form>
				<input type="text" placeholder="验证码" class="code" required="required" maxlength="6" :disabled="disInput" v-model="code"/>
				<button v-if="num<1" @click="getCode" class="getCode">获取验证码</button>
				<button v-if="num>1" class="getCode">{{num}}</button>
			</form>
			
			<el-button
			    plain
			    class="submitData"
			    @click="submitData">
			    提交资料
			</el-button>
			
		</div>
		
	</section>
	
	</div>
</template>

<script>



export default {

	data() {
    return {
    	user:{},
    	userURLA:'',
    	userURLB:'',
    	isUrlA: false,
    	isUrlB: false,

  		imageUrl:'http://letar.t.aiitec.org/api/Base/UploadImage',
  		imageUrlHeader:'http://letar.t.aiitec.org',  
  		code:'', //验证码初始值；
		name:'', //真实姓名;
		idNum:'', //身份证号码;
		idImages:'',  //上传两张身份证照片的 id;
	    quaType:'',   //资格证书类型;
	    quaImage:'',  //附带案例通过;
	    sex:3,   //性别；
	    professional:'',  //职业；
	    email:'',  //邮箱；
	    mobile:'',  //手机号码；
	    recommendMobile:'',  //推荐人手机；
	    smsKey:'',     //验证码返回；
	    idImagesA:'',
	    idImagesB:'',
	    num: 0,
  		disabled: true,
		disInput:true,
		
		
    }
 },
 
  created(){
  	
	
  },
  mounted(){
  	
  },
  methods:{
  	uploadImgA(e) { //自定义的上传图片；
		console.log(e.target.files)
		var that = this
		let oFReader = new FileReader();
		oFReader.readAsDataURL(e.target.files[0]);
		oFReader.onload = function(oFREvent) {
			let imgData = oFREvent.currentTarget.result;
			that.user.avatarPath = imgData;
			that.userURLA = imgData;
			that.isUrlA = true;
		}
		//console.log(this.userURL)
		var form = new FormData(); //上传图片保存的信息；
		var obj = {
			n: "UploadImage",
			s: localStorage.getItem("session"),
			q: {}
		};
		form.append("s", localStorage.getItem("session"));
		form.append("n", "UploadImage");
		form.append("file[]", e.target.files[0], e.target.files[0].name);
		var config = {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			data: form
		};

		this.$Api.UploadImage(config).then((res) => { //上传图片返回的接口信息；
			console.log(res)
			if(res.q.s == 0) {
				this.user.imgIdA = res.q.files[0].id
			}

		})

	},
	
	uploadImgB(e) { //自定义的上传图片；
		console.log(e.target.files)
		var that = this
		let oFReader = new FileReader();
		oFReader.readAsDataURL(e.target.files[0]);
		oFReader.onload = function(oFREvent) {
			let imgData = oFREvent.currentTarget.result;
			that.user.avatarPath = imgData;
			that.userURLB = imgData;
			that.isUrlB = true;
		}
		//console.log(this.userURL)
		var form = new FormData(); //上传图片保存的信息；
		var obj = {
			n: "UploadImage",
			s: localStorage.getItem("session"),
			q: {}
		};
		form.append("s", localStorage.getItem("session"));
		form.append("n", "UploadImage");
		form.append("file[]", e.target.files[0], e.target.files[0].name);
		var config = {
			headers: {
				"Content-Type": "multipart/form-data"
			},
			data: form
		};

		this.$Api.UploadImage(config).then((res) => { //上传图片返回的接口信息；
			console.log(res)
			if(res.q.s == 0) {
				this.user.imgIdB = res.q.files[0].id
			}

		})

	},

  	submitData(){ //点击提交资料跳转到入驻代理商——审核页面；
  		let agencyAContent = document.querySelector('.agencyAContent'),
		    agencyAContentFormList = agencyAContent.querySelectorAll('form'),
		    agencyAContentFormInput1 = agencyAContentFormList[0].querySelector('input'),  //真实姓名；
		    agencyAContentFormInput2 = agencyAContentFormList[2].querySelector('input'),  //我的职业；
		    agencyAContentFormInput3 = agencyAContentFormList[4].querySelector('input'),  //证件号码；
		    agencyAContentFormInput4A = agencyAContentFormList[5].querySelectorAll('input')[0],  //身份证正面；
		    agencyAContentFormInput4B = agencyAContentFormList[5].querySelectorAll('input')[1],  //本人手持身份证；
		    agencyAContentFormInput5 = agencyAContentFormList[6].querySelector('input'), //邮箱；
		    agencyAContentFormInput6 = agencyAContentFormList[8].querySelector('input'), //手机号码；
		    agencyAContentFormInput7 = agencyAContentFormList[7].querySelector('input'), //推荐人手机；
		    agencyAContentFormInput8 = agencyAContentFormList[9].querySelector('input'), //获取验证码；
		    sex = document.querySelector('#sex'), //性别；
		    idCard = document.querySelector('#idCard'); //身份证明；
		
		let nameVerify = /^[\u4E00-\u9FA5A-Za-z]+$/, //真实姓名正则；
			professionVerify = /^([\u4e00-\u9fa5]){2,11}$/, //职业正则；
			IDnumberVerify = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //证件号码正则；
			emailVerify = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/ig, //邮箱正则；
			mobileVerify = /^1[0-9]{10}$/; //手机正则、推荐人手机正则；
 			
	
		//判断输入框都不能为空；
		if (nameVerify.test( agencyAContentFormInput1.value.trim() )&&
			professionVerify.test( agencyAContentFormInput2.value.trim() )&&
			IDnumberVerify.test( agencyAContentFormInput3.value.trim() )&&
			emailVerify.test( agencyAContentFormInput5.value.trim() )&&
			mobileVerify.test( agencyAContentFormInput6.value.trim() )&&
			mobileVerify.test( agencyAContentFormInput7.value.trim() )&&
			agencyAContentFormInput8.value.trim()){
				
				this.$Api.getSmsCode({'a':2,'type':9,'mobile':agencyAContentFormInput6.value,'code':agencyAContentFormInput8.value}).then((res) =>{  //验证验证码；
					console.log(res)

					if (res.q.s != 0) {
						
						this.$notify.error({
				          title: '错误',
				          message: '请把信息填写完整！'
				        });
				        
					}else{
						this.smsKey = res.q.smsKey;
						
						this.$Api.getTeacherRegister({	'a':2,
														'name':agencyAContentFormInput1.value,
														'idNum':agencyAContentFormInput3.value,
														'idImages':this.user.imgIdA +","+ this.user.imgIdB,
														'quaType':idCard.value,
														'quaImage':this.quaImage,
														'sex':sex.value,
														'professional':agencyAContentFormInput2.value,
														'email':agencyAContentFormInput5.value,
														'mobile':agencyAContentFormInput6.value,
														'recommendMobile':agencyAContentFormInput7.value,
														'smsKey':this.smsKey
						}).then((res)=>{  //代理商入驻申请；
							console.log(res)
							this.$router.push('/agencyC'); //都把信息填好了才可以跳转到审核页面；
						})
						
					}
					
				})
				
		} else{
			
			this.$notify.error({
	          title: '错误',
	          message: '请把信息填写完整！'
	        });
	        
		}

  	},
  	getCode(){  //获取验证码；
  		let getCode = document.querySelector('.getCode'),
  		    mob = document.querySelector('#mob'),
  		    mobVal = mob.value; //手机号码；
  		
  		if( mobVal.trim() ){
  			
  			this.$Api.getSmsCode({'a':1,'type':9,'mobile':mobVal}).then((res) =>{  //获取验证码；
				console.log(res)
				
				if (res.q.s != 0) {
					this.$message({
						showClose: true,
						message: "该手机号不能重复申请！",
						type: 'error'
					});
				}else{
					this.num = 60;
					this.countDown();
				}
				
			})
	  		
			
  		}else{
  			//alert('手机输入框为空不能获取')
  			this.$message({
				showClose: true,
				message: "手机输入框为空不能获取！",
				type: 'error'
			});
  		}
  		
  	},
  	countDown() {
		let c = this.num;
		var that=this;
		var cd = setInterval(() => {
			if(that.num < 1) {
				that.num= 0;
                that.disInput=true
				clearInterval(cd);
			} else {
				c--;
				that.disInput=false
				that.num = c
			}

		}, 1000)

	},
	nameVerify(){  //真实姓名验证；
  		var name = document.querySelector('#name'),
		    verifys = document.querySelectorAll('.verify'),
		    nameVerify = /^[\u4E00-\u9FA5A-Za-z]+$/; //真实姓名正则；
		
		if (!name.value.trim()) {  //输入框为空时；
			verifys[0].innerHTML = '真实姓名不能为空';
			verifys[0].style.color = 'red';
		}else{
			if(nameVerify.test(name.value)){//如果验证正确执行以下代码
				verifys[0].innerHTML = '';
			}else {//验证不成功，执行以下代码
				verifys[0].innerHTML = '不能有数字，请重新输入';
				verifys[0].style.color = 'red';
			}
		}		
  	},
  	professionVerify(){  //职业验证；
  		var profession = document.querySelector('#profession'),
		    verifys = document.querySelectorAll('.verify'),
		    professionVerify = /^([\u4e00-\u9fa5]){2,11}$/; //职业正则；
		
		if (!profession.value.trim()) {  //输入框为空时；
			verifys[1].innerHTML = '职业不能为空';
			verifys[1].style.color = 'red';
		}else{
			if(professionVerify.test(profession.value)){//如果验证正确执行以下代码
				verifys[1].innerHTML = '';
			}else if (profession.value.length == 1) {
				verifys[1].innerHTML = '不能一位数，请重新输入';
				verifys[1].style.color = 'red';
			}else{//验证不成功，执行以下代码
				verifys[1].innerHTML = '格式不正确，请重新输入';
				verifys[1].style.color = 'red';
			}	
			
		}		
  	},
  	IDnumberVerify(){ //证件号码验证；
  		var IDnumber = document.querySelector('#IDnumber'),
  		    verifys = document.querySelectorAll('.verify'),		
  		    IDnumberVerify = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //证件号码正则；
  		
  		if (!IDnumber.value.trim()) {  //输入框为空时；
			verifys[2].innerHTML = '证件号码不能为空';
			verifys[2].style.color = 'red';
		}else{
			if(IDnumberVerify.test(IDnumber.value)){//如果验证正确执行以下代码
				verifys[2].innerHTML = '';
			}else {//验证不成功，执行以下代码
				verifys[2].innerHTML = '证件号码格式不正确，请重新输入';
				verifys[2].style.color = 'red';
			}
		}
  		
  	},
  	emailVerify(){  //邮箱验证；
  		var email = document.querySelector('#email'),
		    verifys = document.querySelectorAll('.verify'),
		    emailVerify = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/ig; //邮箱正则；
		
		if (!email.value.trim()) {  //输入框为空时；
			verifys[3].innerHTML = '邮箱不能为空';
			verifys[3].style.color = 'red';
		}else{
			if(emailVerify.test(email.value)){//如果验证正确执行以下代码
				verifys[3].innerHTML = '';
			}else {//验证不成功，执行以下代码
				verifys[3].innerHTML = '邮箱格式不正确，请重新输入';
				verifys[3].style.color = 'red';
			}
		}		
  	},
  	mobileVerify(){  //手机验证；
  		var mob = document.querySelector('#mob'),
		    verifys = document.querySelectorAll('.verify'),
		    mobileVerify = /^1[0-9]{10}$/; //手机正则；
		
		if (!mob.value.trim()) {  //输入框为空时；
			verifys[5].innerHTML = '手机不能为空';
			verifys[5].style.color = 'red';
		}else{
			if(mobileVerify.test(mob.value)){//如果验证正确执行以下代码
				verifys[5].innerHTML = '';
			}else {//验证不成功，执行以下代码
				verifys[5].innerHTML = '手机格式不正确，请重新输入';
				verifys[5].style.color = 'red';
			}
		}		
  	},
  	recommendMobVerify(){  //手机验证；
  		var recommendMob = document.querySelector('#recommendMob'),
		    verifys = document.querySelectorAll('.verify'),
		    mobileVerify = /^1[0-9]{10}$/; //手机正则；
		
		if (!recommendMob.value.trim()) {  //输入框为空时；
			verifys[4].innerHTML = '推荐人手机不能为空';
			verifys[4].style.color = 'red';
		}else{
			if(mobileVerify.test(recommendMob.value)){//如果验证正确执行以下代码
				verifys[4].innerHTML = '';
			}else {//验证不成功，执行以下代码
				verifys[4].innerHTML = '推荐人手机格式不正确，请重新输入';
				verifys[4].style.color = 'red';
			}
		}		
  	},
	
	
	
  }
}	
</script>

<style scoped lang="scss">
 #publish-imgA {
	width: 120px;
	height: 80px;
	position: absolute;
	cursor: pointer;
	opacity: 0;
	z-index: 100;
	top: 0;
	left: 0;
}

#publish-imgB {
	width: 120px;
	height: 80px;
	position: absolute;
	cursor: pointer;
	opacity: 0;
	z-index: 100;
	top: 0;
	left: 0;
}

li{list-style: none;}
.agencyA{
	width: 100%;
	height: 100%;
	background: #fff;
	box-sizing: border-box;
	position: relative;
	top: 0;
	left: 30%;
	.article-steps{
		width: 783px;
		height: 79px;
		position: relative;
	.article-box{
			width: 783px;height: 40px;position: absolute;left: 0;top: 20px;background: #e6e6e6;border-radius: 15px;
			span{position: absolute;width: 58px;height: 58px;border: 1px solid #fff;border-radius: 60px;top: -10px;color: #7f7f7f;text-align: center;line-height: 58px;background: #e6e6e6;font-size: 28px;}
			span:nth-of-type(1){left: -1px;font-size: 60px;}
			span:nth-of-type(2){left: 252px;}
			span:nth-of-type(3){left: 252*2px;}
		}
		.article-item{width: 261px;height: 40px;float: left;line-height: 40px;color: #818181;font-size: 15px;border-radius: 15px;}
		.article-item:nth-of-type(1){text-indent: 80px;border-radius: 15px 0 0 15px;}
		.article-item:nth-of-type(2){width: 260px;text-indent: 75px;}
		.article-item:nth-of-type(3){text-indent: 55px;}
	}
	.agencyAContent{
		height: 100%;
		h2{
			color: #7d7d7d;
			font-size: 25px;
			height: 77px;
			line-height: 77px;
			font-weight: normal;
		}
		form{
			width: 480px;height: 60px;position: relative;
			p{
				width: 140px;height: 100%;text-align: right;font-size: 18px;float: left;line-height: 28px;
				span{color: #ff0e08;margin-right: 10px;}
			}
			input{width: 298px;height: 28px;border: 1px solid #b4b4b4;text-indent: 9px;font-size: 13px;float: right;}
			.fileItem{
				width: 120px;height: 100%;float: left;position: relative;
				.fileBg{
					width: 120px;height: 80px;position: absolute;left: 0;top: 0;background: #ccc;
					i{position: absolute;top: 16px;left: 39%;font-size: 26px;color: #818181;font-weight: 600;}
					span{position: absolute;bottom: 16px;left: 20%;font-size: 12px;color: #818181;}
					img{width: 120px;height: 80px;position: absolute;left: 0;top: 0;}
				}
				h6{width: 100%;height: 50px;font-weight: normal;font-size: 15px;color: #111;padding-top: 13px;box-sizing: border-box;text-align: center;position: absolute;bottom: 0;left: 0;}
			}
			.fileItem:nth-of-type(1){margin-right: 56px;margin-left: 39px;}
			select{width: 78px;height: 28px;border: 1px solid #b4b4b4;border-radius: 5px;color: #808080;margin-left: 39px;font-size: 13px;padding-left: 9px;}
			.file{width: 120px;height: 80px;border: none;outline: none;background: #ccc;float: left;opacity: 0;}
			.code{width: 158px;float: left;margin-left: 179px;}
			.getCode{width: 108px;height: 28px;border: 1px solid #b4b4b4;text-align: center;line-height: 28px;color: #38aff3;background: #fff;font-size: 13px;border-radius: 4px;float: right;}
		}
		.fileBox{
			height: 139px;
			position: relative;
			div{float: left;}
			h6{width: 120px;height: 50px;font-weight: normal;font-size: 15px;color: #111;padding-top: 13px;box-sizing: border-box;text-align: center;}
		}
		.submitData{width: 120px;height: 40px;border-radius: 4px;background: #3babf5;text-align: center;line-height: 20px;color: #fff;font-size: 15px;border: none;float: left;margin: 30px 0px 59px 330px;}
	}
}

.verify{position: absolute;left: 189px;top: 30px;}

/*步骤条的选中样式*/
.article-active{background: #3babf5 !important;color: #fff !important;}

.cf:after{content: '';display: block;clear: both;}	
</style>
