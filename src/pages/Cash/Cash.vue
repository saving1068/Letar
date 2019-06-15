<template>
	<div id="Cash" style="width: 769px;">
		<p class="title">我的钱包</p>

		<div class="top">
			<p class="topText">我的余额</p>
			<div class="box">
				<span style="color:#E51C23 ;font-size: 40px;margin-left: 96px;">￥</span>
				<span style="font-size: 40px;color: #E51C23;margin-left: 10px;">{{user.balance}}</span>
				<div class="btn" style="margin-right: 20px;" @click="gowithDraw">提现</div>
				<div class="btn" style="margin-right: 10px;" @click="goRecharge">充值</div>
			</div>
		</div>

		<div class="bottom">
			<p class="topText">我的余额</p>
			<div class="box">
				<div class="noData" v-if="total==0">
					<div class="icon"></div>
					<span>暂无余额明细</span>
				</div>
				<div v-if="total>0" class="content">
					<div class="top">
						<li>时间</li>
						<li>金额</li>
						<li>说明</li>
					</div>
					<div class="bottom">
						<li v-for="item in list">
							<div>{{item.time}}</div>
							<div v-if="item.type==2">￥-{{item.price}}</div>
							<div v-if="item.type==1">￥+{{item.price}}</div>
							<div>{{item.message}}</div>
						</li>

					</div>
				</div>
				<div style="width: 100%;background: #FFFFFF;text-align: center;position: absolute;bottom: 0;left: 0;">
					<el-pagination @current-change="handleCurrentChange" @prev-click="prev" @next-click="next" :current-page.sync="pa" :page-size="10" layout="prev, pager, next, jumper" :total="total">
					</el-pagination>

				</div>
			</div>

		</div>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				user: {},
				pa: 1,
				list: [],
				total: -1
			}

		},
		activated() {
			
				this.getUserDetails()
			
			this.getData()
		},
		methods: {
			handleCurrentChange(e) {
				this.pa = e
				this.getData()

			},

			prev(e) {
				this.pa = e
				this.getData()
			},
			next(e) {
				this.pa = e
				this.getData()

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

			gowithDraw() {
				if(this.user.mobile==""){
					this.$message({
									showClose: true,
									message: '请先绑定手机号',
									type: 'error'
								});
					this.$router.push({
					name: "MineInformation",
					query: {
						index: 0
					}
				})
					
				}else{
					this.$router.push({
					name: "WithDraw",
					query: {
						index: 5
					}
				})
					
				}

			},
			getData() {
				var obj = {
					a: 1,
					pa: this.pa,
					li: 10
				}
				this.$Api.DetailedList(obj).then((res) => {
					if(res.q.s == 0) {
						this.list = [...res.q.detailed]
						this.total = res.q.total

					}

					console.log(res)
				})

			},
			goRecharge() {
				this.$router.push({
					name: "Recharge",
					query: {
						index: 5
					}
				})

			},

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
		}
		.box {
			background: #FFFFFF;
			height: 80px;
			line-height: 80px;
			margin-top: 20px;
			position: relative;
			.btn {
				float: right;
				width: 120px;
				height: 40px;
				background: #3BABF5;
				color: #FFFFFF;
				text-align: center;
				line-height: 40px;
				font-size: 18px;
				border-radius: 5px;
				margin-top: 20px;
				cursor: pointer;
			}
		}
	}
	
	.bottom {
		margin-top: 30px;
		margin-bottom: 60px;
		width: 760px;
		margin-left: 9px;
		.topText {
			font-size: 24px;
			font-weight: bold;
		}
		.box {
			margin-top: 20px;
			height: 500px;
			background: #FFFFFF;
			position: relative;
			padding-left: 60px;
			padding-right: 60px;
			box-sizing: border-box;
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
			.content {
				.top {
					width: 100%;
					display: flex;
					border-bottom: 1px solid #BBBBBB;
					li {
						width: 33.33%;
						text-align: center;
						line-height: 70px;
						list-style: none;
						font-size: 14px;
					}
				}
				.bottom {
					margin: 0;
					width: 100%;
					position: relative;
					li {
						width: 100%;
						list-style: none;
						height: 36px;
						border-bottom: 1px solid #BBBBBB;
						display: flex;
						div {
							width: 33.33%;
							text-align: center;
							font-size: 14px;
							line-height: 36px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
					}
				}
			}
		}
	}
</style>