<template>
	<div>
		<p class="title">
			<span>我的钱包</span>
			<img src="../../assets/icon_tittlebar_disabled.png" />
			<span style="margin-left: 20px;">提现</span>
			<img src="../../assets/icon_tittlebar_disabled.png" />
			<span style="margin-left: 20px;">银行</span>
		</p>

		<div class="top">
			<p class="topText">余额提现</p>
			<div class="content">
				<div class="way">
					<div :class="[way==1?'active':'','icon']" @click="change(1)" style="margin-left: 66px;"></div>
					<span>银行卡</span>
					<div :class="[way==2?'active':'','icon']" @click="change(2)" style="margin-left: 80px;"></div>
					<span>支付宝</span>
				</div>
				<div v-if="way==1">
					<div class="selectBox">
						<li>
							<span>银行卡:</span>
							<el-select v-model="activeCard" clearable placeholder="请选择">
								<el-option v-for="item in options" :key="item.bankId" :label="item.cardNum+'                         ' + item.bankName" :value="item.bankId" v-if="options.length>0">
								</el-option>
								
							</el-select>
						</li>
						<li style="position: relative;">
							<span>提现金额:</span>
							<input type="tel" class="price" placeholder="请输入提现的金额" v-model="price" />
							<span style="position: absolute;right: 0;color: #3BABF5;font-size: 18px;line-height: 52px;cursor: pointer;margin-right: 30px;" @click="All">全部提现</span>
						</li>

						<span class="add" @click="show">添加新的银行卡</span>

					</div>

					<p class="text">当前余额￥{{user.balance}}元</p>
					<p class="text">提现手续费：{{art}}%</p>
					<p class="textBox">
						<span>验证账户：</span>
						<span>{{user.mobile}}</span>
					</p>
					<div class="code">
						<input type="tel" maxlength="6" placeholder="输入验证码" v-model="codeText" />
						<div class="btn" @click="getCode" v-if="code==0">获取验证码</div>
						<div class="btn" v-if="code>0">{{code}}</div>
					</div>
					<div class="comfirm" @click="comfirm">确定</div>

				</div>

				<div v-if="way==2">
					<div class="selectBox">
						<li>
							<span>支付宝账户:</span>
							<input type="text" class="price" placeholder="请输入支付宝账户" v-model="aliPay" />
						</li>
						<li style="position: relative;">
							<span>支付宝姓名:</span>
							<input type="text" class="price" placeholder="请输入支付宝姓名" v-model="aliPayName" />
						</li>

					</div>
					<div class="selectBox" style="height: 58px;">
						<li style="position: relative;">
							<span>提现金额:</span>
							<input type="tel" class="price" placeholder="请输入提现的金额" v-model="aliPrice" />
							<span style="position: absolute;right: 0;color: #3BABF5;font-size: 18px;line-height: 52px;cursor: pointer;margin-right: 30px;" @click="AllAli">全部提现</span>
						</li>
					</div>
					<p class="text">当前余额￥{{user.balance}}元</p>
					<p class="text">提现手续费：{{art}}%</p>
					<p class="textBox">
						<span>验证账户：</span>
						<span>{{user.mobile}}</span>
					</p>
					<div class="code">
						<input type="tel" maxlength="6" placeholder="输入验证码" v-model="aliCodeText" />
						<div class="btn" @click="getAliCode" v-if="aliCode==0">获取验证码</div>
						<div class="btn" v-if="aliCode>0">{{aliCode}}</div>
					</div>
					<div class="comfirm" @click="comfirmAli">确定</div>
				</div>

			</div>
		</div>
		<div class="bottom">

			<p class="topText">提现记录</p>
			<div class="content" :style="[{'height':total==0?'300px':'auto'}]">
				<div v-if="total>0">
					<div class="contentTitle">
						<li>提现时间</li>
						<li>提现金额</li>
						<li>提现状态</li>
					</div>
					<div class="item" v-for="item in list">
						<li>{{item.time}}</li>
						<li >￥{{item.price}}</li>
						<li v-if="item.status==1">提现中</li>
						<li v-if="item.status==2" style="color: #3BABF5;">提现成功</li>
						<li v-if="item.status==3" style="color: #E51C23;">提现失败，请重试</li>
					</div>
					<div style="background: #FFFFFF;text-align: center;position: absolute;bottom: 0;left: 0;width: 100%;">
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="pa" :page-size="10" layout="prev, pager, next, jumper" :total="total">
						</el-pagination>

					</div>
				</div>

				<div class="noData" v-if="total==0">

					<div class="icon"></div>
					<span>暂无余额明细</span>

				</div>

			</div>

		</div>
		<PayDialog v-if="showDia" @close="closeDia" :add="true" />

	</div>
</template>

<script>
	export default {
		data() {
			return {
				showDia: false,
				price: "",
				list: [],
				pa: 1,
				way: 1,
				options: [],
				activeCard: "",
				user: {},
				pa: 1,
				total: -1,
				code: 0,
				bankId: 0,
				codeText: "",
				aliPay: "",
				aliPayName: "",
				aliPrice: "",
				aliCode: 0,
				aliCodeText: "",
				timer: null,
				art:""

			}
		},
		created() {
			this.getCard()
			this.getData()
			this.getArt()
			if(JSON.stringify(this.$store.state.user) != "{}") {
				this.user = { ...this.$store.state.user
				}

			} else {
				this.getUserDetails()
			}

		},

		methods: {
			getArt(){
				this.$Api.ArticleDetails({a:12}).then((res)=>{
					console.log(res)
					this.art=res.q.articles.content
				})
				
			},
			getAliCode() {
				var obj = {
					a: 1,
					type: 6,
					mobile: this.user.mobile

				}
				this.$Api.SmsCode(obj).then((res) => {
					if(res.q.s == 0) {
						this.aliCode = 60;
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

			comfirmAli() {
				if(this.aliPay == "") {
					this.$message({
						showClose: true,
						message: '请输入支付宝账户',
						type: 'error'
					});
					return;

				}
				var reg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/

				if(!reg.test(this.aliPay)) {
					this.$message({
						showClose: true,
						message: '请输入正确的支付宝账户',
						type: 'error'
					});
					return;
				}

				if(this.aliPayName == "") {
					this.$message({
						showClose: true,
						message: '请输入姓名',
						type: 'error'
					});
					return;

				}

				var reg1 = /^\d+(\.\d+)?$/;
				if(!reg1.test(this.aliPrice)) {
					this.$message({
						showClose: true,
						message: '请输入正确金额',
						type: 'error'
					});

					return;
				}

				if(Number(this.aliPrice) >= 100000000) {

					this.$message({
						showClose: true,
						message: '您提现的金额过大',
						type: 'error'
					});
					return;

				}

				var obj = {
					a: 2,
					type: 6,
					mobile: this.user.mobile,
					code: this.aliCodeText
				}

				this.$Api.SmsCode(obj).then((res) => {
					if(res.q.s == 0) {
						var submitObj = {
                                 a:2,
                                 price:Number(this.aliPrice),
                                 aliaccount:this.aliPay,
                                 aliName:this.aliPayName,
                                 smsKey:res.q.smsKey
						}
						this.$Api.ForwardSubmit(submitObj).then((response) => {
							if(response.q.s == 0) {
                              this.$message({
									showClose: true,
									message: '提现成功',
									type: 'success'
								});
								this.getData()
								this.$router.go(-1)
							} else {

								this.$message({
									showClose: true,
									message: response.q.d,
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
			AllAli() {

				if(Number(this.user.balance) >= 100000000) {

					this.$message({
						showClose: true,
						message: '您提现的金额过大',
						type: 'error'
					});
					return;

				}
				this.aliPrice = this.user.balance

			},

			All() {

				if(Number(this.user.balance) >= 100000000) {

					this.$message({
						showClose: true,
						message: '您提现的金额过大',
						type: 'error'
					});
					return;

				}
				this.price = this.user.balance

			},

			getCode() {

				var obj = {
					a: 1,
					type: 6,
					mobile: this.user.mobile

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

			getData() {
				var obj = {
					a: 2,
					pa: this.pa,
					li: 10

				}
				this.$Api.DetailedList(obj).then((res) => {
					console.log(res)
					this.list = [...res.q.detailed]
					this.total = res.q.total
				})

			},

			getUserDetails() {
				this.$Api.UserDetails().then((res) => {
					console.log(res)
					this.user = { ...res.q.userInfo
					}
					if(this.user.avatarPath != "") {
						this.user.avatarPath = this.$imgUrl + this.user.avatarPath
					} else {
						this.user.avatarPath = require('../../assets/common_footer_logo.png')
					}
					this.$store.dispatch('changeUser', this.user)

					this.user.imgId = 0
				})

			},

			getCard() {
				this.$Api.CheckBankCard().then((res) => {
					console.log(res)
					if(res.q.banks.length>0){
						this.options = [...res.q.banks]
					}
					
					if(this.options.length > 0) {
						this.activeCard = this.options[0].bankId
					}
				})

			},
			closeDia() {
				this.getCard()
				this.showDia = false
			},
			handleCurrentChange() {

			},
			change(num) {
				this.way = num
				this.code = 0
				this.aliCode = 0
				clearInterval(this.timer)
			},
			show() {
				this.showDia = true
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
						if(this.aliCode < 1) {
							this.aliCode = 0;

							clearInterval(this.timer);
						} else {
							this.aliCode--;

						}

					}, 1000)

				}

			},

			comfirm() {
				if(this.price == "") {
					this.$message({
						showClose: true,
						message: '请输入金额',
						type: 'error'
					});
					return;
				}
				var reg = /^\d+(\.\d+)?$/;
				if(!reg.test(this.price)) {
					this.$message({
						showClose: true,
						message: '请输入正确金额',
						type: 'error'
					});

					return;
				}

				if(Number(this.price) >= 100000000) {

					this.$message({
						showClose: true,
						message: '您提现的金额过大',
						type: 'error'
					});
					return;

				}
                if(this.options.length==0) {

					this.$message({
						showClose: true,
						message: '您还未添加银行卡',
						type: 'error'
					});
					return;

				}
                
				var obj = {
					a: 2,
					type: 6,
					mobile: this.user.mobile,
					code: this.codeText
				}
				this.$Api.SmsCode(obj).then((res) => {
					if(res.q.s == 0) {
						var submitObj = {
							a: 1,
							bankId: this.activeCard,
							price: Number(this.price),
							smsKey: res.q.smsKey
						}
						this.$Api.ForwardSubmit(submitObj).then((response) => {
							if(response.q.s == 0) {
								this.$message({
									showClose: true,
									message: '提现成功',
									type: 'success'
								});
								this.getData()
								this.$router.go(-1)
							} else {
								this.$message({
									showClose: true,
									message: response.q.d,
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

			}

		}

	}
</script>

<style scoped="scoped" lang="scss">
	.title {
		font-size: 20px;
		margin-bottom: 19px;
		img {
			position: relative;
			top: 1px;
			margin-left: 20px;
		}
	}
	
	.top {
		width: 760px;
		margin-left: 9px;
		.topText {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 20px;
		}
		.content {
			padding-top: 30px;
			padding-bottom: 30px;
			background: #FFFFFF;
			.textBox {
				margin-top: 40px;
				font-size: 18px;
				span:first-child {
					margin-left: 76px;
				}
				span:last-child {
					margin-left: 40px;
				}
			}
			.selectBox {
				width: 525px;
				height: 105px;
				background: #F5F5F5;
				margin-left: 60px;
				margin-top: 25px;
				margin-bottom: 20px;
				position: relative;
				li {
					list-style: none;
					line-height: 52px;
					height: 50%;
					span:first-child {
						margin-left: 34px;
					}
					span:last-child {
						margin-left: 16px;
					}
					span {
						font-size: 18px;
					}
				}
				.price {
					margin-left: 40px;
					font-size: 18px;
					height: 100%;
					border: none;
					outline: none;
					background: #F5F5F5 !important;
				}
				.price::-webkit-input-placeholder {
					color: #808080;
				}
				.price::-moz-placeholder {
					/* Mozilla Firefox 19+ */
					color: #808080;
				}
				.price:-moz-placeholder {
					/* Mozilla Firefox 4 to 18 */
					color: #808080;
				}
				.price:-ms-input-placeholder {
					/* Internet Explorer 10-11 */
					color: #808080;
				}
				.add {
					font-size: 18px;
					color: #3BABF5;
					position: absolute;
					top: 20px;
					right: -150px;
					cursor: pointer;
				}
			}
			.text {
				font-size: 18px;
				margin-left: 66px;
				color: #808080;
			}
			.way {
				display: flex;
				span {
					font-size: 18px;
				}
				.icon {
					width: 24px;
					height: 24px;
					border: 1px solid #B3B3B3;
					border-radius: 50%;
					box-sizing: border-box;
					margin-right: 10px;
					cursor: pointer;
				}
				.active {
					border: none;
					background: url(../../assets/common_icon_selete.png) no-repeat;
					background-size: 100%;
				}
			}
			.code {
				display: flex;
				margin-top: 30px;
				input {
					width: 130px;
					height: 30px;
					font-size: 18px;
					margin-left: 190px;
					margin-right: 20px;
					text-indent: 11px;
					outline: none;
				}
				.btn {
					width: 110px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					font-size: 14px;
					color: #3BABF5;
					border: 1px solid #B3B3B3;
					border-radius: 5px;
					cursor: pointer;
				}
			}
			.comfirm {
				width: 120px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				font-size: 18px;
				color: #FFFFFF;
				background: #3BABF5;
				border-radius: 5px;
				margin: 30px auto;
				cursor: pointer;
			}
		}
	}
	
	.bottom {
		width: 760px;
		margin-left: 9px;
		margin-bottom: 20px;
		margin-top: 30px;
		.topText {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 20px;
		}
		.content {
			background: #FFFFFF;
			padding-left: 60px;
			padding-right: 175px;
			padding-bottom: 50px;
			box-sizing: border-box;
			position: relative;
			.noData {
				width: 150px;
				height: 24px;
				line-height: 24px;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				margin: auto;
				display: flex;
				.icon {
					width: 24px;
					height: 24px;
					background: url(../../assets/common_icon_remind.png) no-repeat;
					background-size: 100%;
				}
				span {
					font-size: 18px;
					margin-left: 10px;
				}
			}
			.contentTitle {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #CCCCCC;
				li {
					width: 33.33%;
					text-align: center;
					line-height: 46px;
					list-style: none;
					font-size: 14px;
					color: #808080;
				}
			}
			.item {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #CCCCCC;
				li {
					width: 33.33%;
					text-align: center;
					line-height: 32px;
					list-style: none;
					font-size: 14px;
					color: #808080;
				}
			}
		}
	}
</style>
<style type="text/css">
	.selectBox li .el-input__inner {
		width: 370px;
		margin-left: 40px;
		background: #F5F5F5 !important;
		border: none !important;
	}
	
	.selectBox li .el-input__inner::-webkit-input-placeholder {
		color: #808080;
	}
	
	.selectBox li .el-input__inner::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #808080;
	}
	
	.selectBox li .el-input__inner:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #808080;
	}
	
	.selectBox li .el-input__inner:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #808080;
	}
</style>