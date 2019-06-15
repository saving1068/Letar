<template>
	<div>
		<p class="title">
			<span>我的钱包</span>
			<img src="../../assets/icon_tittlebar_disabled.png" />
			<span style="margin-left: 20px;">充值</span>
			<img src="../../assets/icon_tittlebar_disabled.png" />
			<span style="margin-left: 20px;" v-if="way==1">微信支付</span>
			<span style="margin-left: 20px;" v-if="way==2">支付宝支付</span>
		</p>
		<div class="top">
			<p class="topText" v-if="way==2">支付宝支付</p>
			<p class="topText" v-if="way==1">微信支付</p>
			<div class="rechargeBox">
				<!--<div class="change" @click="change(2)" v-if="way==1">支付宝支付</div>
             <div class="change" @click="change(1)" v-if="way==2">微信支付</div>-->
				<div class="imgBox">
					<img :src="img" />

				</div>
				<p v-if="way==2" class="text">支付宝扫一扫支付</p>
				<p v-if="way==1" class="text">微信扫一扫支付</p>
				<div class="btnBox">

					<div class="btn" style="margin-left: 230px;" @click="goCash">我已支付</div>
					<div class="btn" style="margin-left: 60px;" @click="goCancel">取消</div>
				</div>

			</div>

			<!-- <p v-if="showD">不能跳转</p>-->
		</div>
		<div class="dialogContent" v-if="showD">
			<div class="mask"></div>
			<div class="content">
				<div class="content_top">
					<p class="close_icon" @click="close">
						<img src="../../assets/icon_close_white.png" />
					</p>
					<p class="top_font">提示</p>
					<p class="bottom_font">您是否取消支付？</p>
				</div>
				<div class="content_btn">
					<p @click="comfirm">确定</p>
					<p @click="cancel">取消 </p>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				way: this.$route.query.way,
				img: "",
				flag: false,
				a: false,
				showD: false,
				routerName: "",
				timer: null

			}
		},
		created() {
			var QRCode = require('qrcode')
			var that = this
			//微信授权重定向网址
			let newUrl = this.$route.query.img

			QRCode.toDataURL(newUrl, {
				width: 100,
				height: 100, // 高度
				text: '56663159'
			}, function(err, url) {
				console.log(url)
				that.img = url

			})
			this.getData()

		},
		methods: {
			getData() {

				this.timer = setInterval(() => {
					var obj = {
						id: this.$route.query.id
					}
                    this.$Api.GetOrderStatus(obj).then((res) => {
									if(res.q.s == 0) {
										if(res.q.orderStatus == 2) {

											 this.a=true
											 this.$router.replace({
											 	name:"Cash"
											 	
											 })

											this.$message({
												showClose: true,
												message: '支付成功',
												type: 'success'
											});
											clearInterval(this.timer)

										}

									}

								})
                    
                    
				}, 1000)

			},

			goCash() {
				this.a = true
				this.$router.go(-2)

			},
			goCancel() {

				this.$router.go(-1)
			},

			cancel() {
				this.showD = false

			},
			comfirm() {
				this.a = true
				this.$router.replace({
					name: this.routerName
				})
			},
			close() {
				this.showD = false
			},
			change(num) {
				this.way = num

			},
			closeDia() {
				this.pay = false
			},
			show() {
				this.showD = true

			}

		},
		beforeRouteLeave(to, from, next) {
			if(!this.a) {
				console.log(to)
				this.routerName = to.name
				this.show()
				next(false)

			} else {
				if(to.name == "Recharge" || to.name == "Cash") {
					to.query.index = 5
				} else if(to.name == "MineInformation") {
					to.query.index = 0
				} else if(to.name == "BuyCourse") {
					to.query.index = 1
				} else if(to.name == "Vip") {
					to.query.index = 2
				} else if(to.name == "Teacher") {
					to.query.index = 3
				} else if(to.name == "Course") {
					to.query.index = 4
				} else if(to.name == "History") {
					to.query.index = 6
				}
               clearInterval(this.timer)
				next()
			}

		}

	}
</script>

<style scoped="scoped" lang="scss">
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .5);
	}
	
	.dialogContent {
		position: relative;
		.content {
			position: fixed;
			box-sizing: border-box;
			width: 377px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			z-index: 2000;
			border-radius: 10px;
			.content_top {
				width: 100%;
				height: 100px;
				border-bottom: 1px solid #BBBBBB;
				font-size: 20px;
				position: relative;
				.top_font {
					text-align: center;
					line-height: 50px;
					color: #101010;
				}
				.close_icon {
					position: absolute;
					width: 20px;
					height: 20px;
					top: 10px;
					right: 10px;
					border-radius: 50%;
					/*background-image: url(../../assets/icon_close_white.png) no-repeat;*/
					background-color: #101010;
					/*background-size: 50%;*/
					cursor: pointer;
					font-size: 0;
					img {
						width: 50%;
						height: 50%;
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						left: 0;
						margin: auto;
					}
				}
				.close_icon:hover {
					transform: rotate(90deg);
					transition: 0.5s;
				}
				.bottom_font {
					line-height: 30px;
					font-size: 18px;
					color: #808080;
					padding: 0 32px;
					text-align: center;
				}
			}
			.content_btn {
				text-align: center;
				line-height: 50px;
				color: #3BABF5;
				font-size: 20px;
				cursor: pointer;
				p {
					float: left;
					width: 50%;
					height: 50px;
				}
				p:nth-of-type(1) {
					border-right: 1px solid #BBBBBB;
				}
			}
		}
	}
	
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
			padding-bottom: 30px;
		}
		.rechargeBox {
			height: 370px;
			padding-top: 30px;
			box-sizing: border-box;
			position: relative;
			box-sizing: border-box;
			background: #FFFFFF;
			.change {
				position: absolute;
				line-height: 14px;
				top: 30px;
				right: 60px;
				font-size: 14px;
				color: #3BABF5;
				cursor: pointer;
			}
			.imgBox {
				width: 160px;
				height: 160px;
				margin: auto;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.text {
				margin-top: 20px;
				text-align: center;
				font-size: 14px;
			}
			.btnBox {
				display: flex;
				margin-top: 60px;
				.btn {
					width: 120px;
					height: 40px;
					border-radius: 5px;
					background: #3BABF5;
					text-align: center;
					line-height: 40px;
					color: #FFFFFF;
					font-size: 18px;
					cursor: pointer;
				}
			}
		}
	}
</style>