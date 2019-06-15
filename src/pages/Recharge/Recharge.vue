<template>
	<div>
		<p class="title">
			<span>我的钱包</span>
			<img src="../../assets/icon_tittlebar_disabled.png" />
			<span style="margin-left: 20px;">充值</span>
		</p>
		<div class="top">
			<p class="topText">余额充值</p>
			<div class="rechargeBox">
				<div class="price">
					<span>充值金额：</span>
					<input type="tel" placeholder="请输入充值的金额" v-model="price" />
				</div>
				<div class="way">
					<span style="	margin-left: 60px;margin-right: 50px;">充值方式：</span>
					<div :class="[way==1?'active':'','icon']" @click="change(1)"></div>
					<span>微信</span>
					<div :class="[way==2?'active':'','icon']" @click="change(2)" style="margin-left: 80px;"></div>
					<span>支付宝</span>
				</div>
				<!--<div class="tel">
					<span>充值金额：</span>
					<input type="tel" v-model="price" />
				</div>-->
				<!--<div class="code">
		 			<input type="tel"  maxlength="6" placeholder="输入验证码"/>
		 			<div class="btn" @click="getCode">获取验证码</div>
		 		</div>-->
				<div class="comfirm" @click="comfirm">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				way: 1,
				user: {},
				price: "",
				flag: false
			}
		},
		created() {
			if(JSON.stringify(this.$store.state.user) != "{}") {
				this.user = { ...this.$store.state.user
				}

			} else {
				this.getUserDetails()
			}

		},

		methods: {
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
			change(num) {
				this.way = num

			},
			getCode() {
				//				var obj={
				//					a:1,
				//					type:
				//				}
				//				this.$Api.SmsCode()

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
				var reg=/^[0-9]*$/
				if(!reg.test(this.price)){
					this.$message({
						showClose: true,
						message: '请输入正确金额',
						type: 'error'
					});
					
					
					 return;
				}
				
				if(Number(this.price)>=100000000){
					
					this.$message({
						showClose: true,
						message: '您充值的金额过大',
						type: 'error'
					});
					return;
					
				}
				

				if(this.way == 1) {
					var obj = {
						a: 4,
						payment: 2,
						price: this.price
					}
				} else {
					var obj = {
						a: 4,
						payment: 1,
						price: this.price
					}
				}

				this.$Api.PaySubmit(obj).then((res) => {
					if(res.q.s == 0) {
						if(this.way == 1) {
							this.$router.push({
								name: "RechargePay",
								query: {
									way: this.way,
									index: 5,
									img: res.q.wxPay.code_url,
									id:res.q.id
								}

							})
						} else {
							window.location.href = res.q.aliPay
						}

					}

				})

			}
		},

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
		.rechargeBox {
			height: 280px;
			padding-top: 30px;
			box-sizing: border-box;
			background: #FFFFFF;
			.price {
				display: flex;
				span {
					font-size: 18px;
					margin-left: 60px;
					margin-right: 50px;
				}
				input {
					width: 150px;
					height: 24px;
					border: none;
					font-size: 18px;
					outline: none;
				}
			}
			.tel {
				margin-top: 30px;
				input {
					outline: none;
				}
				span {
					font-size: 18px;
				}
				span:first-child {
					margin-left: 60px;
					margin-right: 50px;
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
				margin: 60px auto;
				cursor: pointer;
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
			.way {
				display: flex;
				margin-top: 30px;
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
		}
	}
</style>