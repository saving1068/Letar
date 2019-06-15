<template>
	<div id="MineInformation">
		<p class="title">个人信息</p>
		<div class="submitBox">
			<div class="left">
				<li>名称：</li>
				<li style="margin-top: 40px;">头像：</li>
				<li style="margin-top: 220px;">性别：</li>
				<li style="margin-top: 40px;">地址：</li>
				<li style="margin-top: 44px;">手机号码：</li>
			</div>
			<div class="right">
				<div class="name">
					<input type="text" v-model="user.nickname" style="text-indent: 10px;" />
				</div>
				<div class="submitImage">
					<img src="../../assets/home_icon_add_pic@3x.png" v-if="user.avatarPath==''" style="cursor: pointer;" />
					<input type="file" accept="image/*" name="file[]" id="publish-img" v-if="user.avatarPath==''" @change="uploadImg" ref="imgInput" />
					<img :src="user.avatarPath" v-if="user.avatarPath!=''" />
					<div class="submitBtn">

					</div>
					<input type="file" accept="image/*" name="file[]" class="publish-img" @change="uploadImg" ref="imgInput" />
				</div>
				<div class="changeSex">
					<li>
						<div :class="[user.sex==1?'active':'']" @click="change(1)"></div>
						<span>男</span>
					</li>
					<li style="margin-left: 40px;">
						<div :class="[user.sex==2?'active':'']" @click="change(2)"></div>
						<span>女</span>
					</li>

				</div>
				<div class="cityBox">
					<Linkage @sendId="getId" :region="user.pcRegion"></Linkage>
				</div>
				<div class="tel">
					<div class="first">
						<input type="tel" placeholder="默认手机号码" maxlength="11" v-model="user.mobile" :disabled="disabled" @blur="blurTel" />
						<a href="javascript:void(0)" @click="changeTel" v-if="disabled">更换号码</a>
					</div>
					<div class="second">
						<input type="tel" maxlength="6" placeholder="输入验证码" :disabled="disInput" v-model="code" />
						<button v-if="num<1" @click="getCode">获取验证码</button>
						<button v-if="num>1">{{num}}</button>
					</div>
				</div>
				<button class="submitBtn" @click="submit">提交</button>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
        
		data() {
			return {
				sex: 1,
				disabled: true,
				disInput: true,
				user:{},
				code: "",
				num: 0,
				region: [],
				smsKey: ""

			}
		},
//		computed:{
//			getUser(){
//				return this.$store.state.user
//			}
//		},
//		watch:{
//			getUser(a,b){
//				if(JSON.stringify(a)!="{}"){
//					console.log(a)
//					this.user={...a}
//				}
//				
//				
//			}
//			
//			
//		},
		activated() {
				if(JSON.stringify(this.$store.state.user)!="{}"){
					this.user={...this.$store.state.user}
					
				}else{
					this.getData()
				}
//		this.getData()

		},
		methods: {
		
			
			
			uploadImg(e) {
				console.log(e.target.files)
				var that = this
				let oFReader = new FileReader();
				oFReader.readAsDataURL(e.target.files[0]);
				oFReader.onload = function(oFREvent) {
					let imgData = oFREvent.currentTarget.result;
					that.user.avatarPath = imgData;
				}
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
						this.user.imgId = res.q.files[0].id
					}

				})

			},

			change(num) {
				this.user.sex = num
			},
			getId(data) {
				this.user.region = data

			},
			getData() {
				
				this.$Api.UserDetails().then((res) => {
					console.log(res)
					this.user = { ...res.q.userInfo
					}
					if(this.user.avatarPath != "") {
						this.user.avatarPath = this.$imgUrl + this.user.avatarPath
					}else{
						this.user.avatarPath=require('../../assets/common_footer_logo.png')
					}
                    this.$store.dispatch('changeUser', this.user)

					this.user.imgId = 0
				})

			},
			blurTel() {
				this.disabled = true

			},
			changeTel() {
				this.disabled = false

			},
			getCode() {

				var obj = {
					a: 1,
					type: 4,
					mobile: this.user.mobile,
				}
				var regAn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

				if(!regAn.test(this.user.mobile)) {
					this.$message({
						showClose: true,
						message: '请输入正确手机号',
						type: 'error'
					});
					return

				}

				this.$Api.SmsCode(obj).then((res) => {
					if(res.q.s == 0) {

						this.num = 60
						this.countDown()
					} else {
						var err = res.q.d
						this.$message({
							showClose: true,
							message: err,
							type: 'error'
						});
					}

					console.log(res)
				})

			},
			countDown() {
				let c = this.num
				var that = this
				var cd = setInterval(() => {
					if(that.num < 1) {
						that.num = 0;
						that.disInput = true
						clearInterval(cd);
					} else {
						c--;
						that.disInput = false
						that.num = c
					}

				}, 1000)

			},
			submit() {

				//				
				if(this.user.avatarPath == "") {
					this.$message({
						showClose: true,
						message: '请先上传头像再保存',
						type: 'error'
					});
					return
				}

				if(this.user.region.id == "" || this.user.region.id == "0" || this.user.region.name == "") {
					this.$message({
						showClose: true,
						message: '请选择您的地址信息',
						type: 'error'
					});
					return

				}

//				var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
//					regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
//
//				if(regEn.test(this.user.nickname) || regCn.test(this.user.nickname)) {
//					this.$message({
//						showClose: true,
//						message: '请不要使用非法字符作为名称',
//						type: 'error'
//					});
//					return
//				}

				if(this.num > 0) {

					if(this.user.mobile == "") {
						this.$message({
							showClose: true,
							message: '请输入手机号',
							type: 'error'
						});
						return

					}

					if(this.user.mobile == "") {
						this.$message({
							showClose: true,
							message: '请输入手机号',
							type: 'error'
						});
						return

					}
					var regAn = /^[1][3,4,5,7,8][0-9]{9}$/

					if(!regAn.test(this.user.mobile)) {
						this.$message({
							showClose: true,
							message: '请输入正确手机号',
							type: 'error'
						});
						return

					}

					var regDn = /^[0-9]*$/

					if(this.code == "" || this.code.length < 6 || !regDn.test(this.code)) {
						this.$message({
							showClose: true,
							message: '请输入正确验证码',
							type: 'error'
						});
						return

					}
					console.log(this.user)
					var obj = {
						a: 2,
						mobile: this.user.mobile,
						type: 4,
						code: this.code

					}
					this.$Api.SmsCode(obj).then((res) => {
						if(res.q.s == 0) {
							var bindObj = {
								a: 1,
								mobile: this.user.mobile,
								smsKey: res.q.smsKey
							}
							this.$Api.UserChangeBind(bindObj).then((r) => {
								if(r.q.s == 0) {
									let newobj = {
										avatarPath: this.user.imgId,
										nickname: this.user.nickname,
										sex: this.user.sex,
										id: this.user.region.id,

									}

									this.$Api.UserUpdateSubmit(newobj).then((response) => {
										if(response.q.s == 0) {
											this.$message({
												showClose: true,
												message: '修改成功',
												type: 'success'
											});
											this.num = 0
											this.code = ""
											this.$emit("changeData")
										} else {
											this.$message({
												showClose: true,
												message: '修改失败',
												type: 'error'
											});
										}

									})

								} else {

									this.$message({
										showClose: true,
										message: '修改手机绑定失败',
										type: 'error'
									});

								}
							})

						} else {
							this.$message({
								showClose: true,
								message: '验证错误',
								type: 'error'
							});

						}

					})

				} else {

					let newobj = {
						avatarPath: this.user.imgId,
						nickname: this.user.nickname,
						sex: this.user.sex,
						id: this.user.region.id,

					}

					this.$Api.UserUpdateSubmit(newobj).then((response) => {
						if(response.q.s == 0) {
							this.$message({
								showClose: true,
								message: '修改成功',
								type: 'success'
							});
							this.num = 0
							this.code = ""
							this.getData()
						} else {
							this.$message({
								showClose: true,
								message: '修改失败',
								type: 'error'
							});
						}

					})

				}

			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.title {
		font-size: 20px;
		margin-bottom: 19px;
	}
	
	.submitBox {
		width: 760px;
		height: 647px;
		background: #FFFFFF;
		margin-bottom: 235px;
		margin-left: 9px;
		display: flex;
		.left {
			width: 90px;
			margin-left: 60px;
			padding-top: 20px;
			box-sizing: border-box;
			li {
				list-style: none;
				font-size: 18px;
				text-align: right;
			}
		}
		.right {
			margin-left: 30px;
			padding-top: 14px;
			box-sizing: border-box;
			.name {
				input {
					width: 207px;
					height: 30px;
					outline: none;
				}
			}
			.submitImage {
				width: 170px;
				margin-top: 33px;
				position: relative;
				img {
					width: 170px;
					height: 170px;
				}
				#publish-img {
					width: 170px;
					height: 170px;
					position: absolute;
					cursor: pointer;
					opacity: 0;
					z-index: 2;
					top: 0;
					left: 0;
				}
				.submitBtn {
					width: 100px;
					height: 30px;
					margin: 13px auto;
					background: url(../../assets/btn_upload.png) no-repeat;
					background-size: 100%;
					cursor: pointer;
					position: relative;
				}
				.publish-img {
					position: absolute;
					z-index: 99;
					width: 100px;
					height: 30px;
					opacity: 0;
					left: 35px;
					bottom: 0;
					cursor: pointer;
				}
			}
			.changeSex {
				display: flex;
				margin-top: 38px;
				li {
					list-style: none;
					font-size: 18px;
					display: flex;
					div {
						width: 24px;
						height: 24px;
						box-sizing: border-box;
						border-radius: 50%;
						background: #FFFFFF;
						border: 1px solid #B3B3B3;
						cursor: pointer;
					}
					.active {
						border: none;
						background: url(../../assets/common_icon_selete.png) no-repeat;
						background-size: 100%;
					}
					span {
						margin-left: 20px;
					}
				}
			}
			.cityBox {
				margin-top: 35px;
			}
			.tel {
				margin-top: 33px;
				.first {
					input {
						width: 207px;
						height: 30px;
						outline: none;
						border: none;
						border: 1px solid #B3B3B3;
						background: #FFFFFF;
						text-indent: 11px;
						font-size: 18px;
					}
					a {
						font-size: 18px;
						color: #3BABF5;
						margin-left: 20px;
					}
				}
				.second {
					margin-top: 30px;
					margin-bottom: 30px;
					input {
						width: 130px;
						height: 30px;
						outline: none;
						border: none;
						border: 1px solid #B3B3B3;
						background: #FFFFFF;
						text-indent: 11px;
						font-size: 18px;
					}
					button {
						width: 110px;
						height: 30px;
						border: 1px solid #B3B3B3;
						color: #3BABF5;
						text-align: center;
						line-height: 30px;
						background: #FFFFFF;
						border-radius: 5px;
						cursor: pointer;
						outline: none;
						margin-left: 30px;
					}
				}
			}
			.submitBtn {
				margin-left: 118px;
				width: 120px;
				height: 40px;
				outline: none;
				border: none;
				cursor: pointer;
				border-radius: 5px;
				background: #3BABF5;
				text-align: center;
				font-size: 18px;
				color: #FFFFFF;
				line-height: 40px;
			}
		}
	}
</style>