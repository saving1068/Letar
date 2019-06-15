<template>
	<div id="BuyCourse" style="width: 769px;">
		<p class="title">已购课程</p>
		<div class="topBox">
			<li :class="[courseIndex==0?'active':'']" @click="change(0)">全部</li>
			<li :class="[courseIndex==1?'active':'']" @click="change(1)">免费课程</li>
			<li :class="[courseIndex==2?'active':'']" @click="change(2)"> 付费专栏</li>
			<li :class="[courseIndex==3?'active':'']" @click="change(3)">互动直播</li>

		</div>
		<div class="contentBox" v-if="total>0">
			<div class="top">
				<li style="width: 440px;">课程信息</li>
				<li style="width: 116px;">课程类型</li>
				<li style="width: 116px;">课程价格</li>
				<li style="width: 80px;">操作</li>
			</div>
			<div class="bottom">
				<div class="bottom_box" v-for="(item,index) in list">
					<li style="width: 440px;">
						<div class="img" @click="go(item.courseId)" style="cursor: pointer;">
							<img :src="item.wimagePath" />
							<div class="totalCourse" v-if="item.isOver == 1">完 整 版 课 程</div>
						</div>
						<p @click="go(item.courseId)" class="courseTitle">{{item.name}}</p>
					</li>
					<li style="width: 116px;" v-if="item.courseType==1">免费课程</li>
					<li style="width: 116px;" v-if="item.courseType==2">付费专栏</li>
					<li style="width: 116px;" v-if="item.courseType==3">互动直播</li>
					<li style="width: 116px;" v-if="item.courseType==4">VIP 课程</li>
					<li style="width: 116px;" v-if="item.price==0">免费</li>
					<li style="width: 116px;" v-if="item.price!=0">￥{{item.price}}</li>
					
					<li style="width: 80px;" v-if="item.isComment==2&&item.isOver == 1" @click="evaluate(item)"><span>评价</span></li>
					<li style="width: 80px;" v-else><span @click="go(item.courseId)">进入课程</span></li>
				</div>

			</div>
			<div style="margin-top: 20px;margin-bottom: 60px;background: #FFFFFF;text-align: center;">
				<el-pagination @current-change="handleCurrentChange" @prev-click="prev" @next-click="next" :current-page.sync="pa" :page-size="10" layout="prev, pager, next, jumper" :total="total">
				</el-pagination>

			</div>
		</div>
		<div style="height: 400px;position: relative;background: #FFFFFF;margin-left: 9px;" v-if="total==0">

			<div class="noData">

				<div class="icon"></div>
				<span>暂无已购课程</span>

			</div>
		</div>
		<PayDialog v-if="dialogVisible" @close="close" :courseItem="courseItem" :evaluate="true" @changeData="getData"></PayDialog>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				courseIndex: 0,
				pa: 1,
				list: [],
				dialogVisible: false,
				courseItem: {},
				total: -1
			}
		},
		activated() {

			this.getData()
		},
		methods: {
			go(id) {
				this.$router.push({
					name: "ClassDetails",
					query: {
						courseId: id
					}

				})

			},
			close() {

				this.dialogVisible = false
			},

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

			evaluate(item) {
				this.dialogVisible = true
				this.courseItem = { ...item
				}

			},
			change(num) {
				this.courseIndex = num
				this.pa = 1
				this.getData()

			},
			getData() {
				var obj = {
					a: this.courseIndex,
					isBuy: 1,
					pa: this.pa

				}

				this.$Api.CourseList(obj).then((res) => {
					if(res.q.s == 0) {
						this.list = [...res.q.course];
						this.total = res.q.total
						this.list.forEach((val, index) => {
							val.himagePath = this.$imgUrl + val.himagePath
							val.wimagePath = this.$imgUrl + val.wimagePath
						})
					}

					console.log(res)
				})

			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.title {
		font-size: 20px;
		margin-bottom: 19px;
	}
	
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
	
	.topBox {
		width: 760px;
		height: 70px;
		background: #FFFFFF;
		margin-bottom: 10px;
		display: flex;
		padding: 20px;
		margin-left: 9px;
		box-sizing: border-box;
		li {
			width: 80px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			font-size: 16px;
			list-style: none;
			cursor: pointer;
			margin-right: 32px;
		}
		.active {
			background: #3BABF5;
			color: #FFFFFF;
		}
	}
	
	.contentBox {
		margin-left: 9px;
		width: 760px;
		background: #FFFFFF;
		.top {
			height: 60px;
			display: flex;
			li {
				list-style: none;
				line-height: 60px;
				font-size: 20px;
				text-align: center;
			}
			li:first-child {
				text-align: left;
				text-indent: 10px;
			}
		}
		.bottom {
			.bottom_box {
				list-style: none;
				border-top: 1px solid #B3B3B3;
				height: 160px;
				display: flex;
				li {
					height: 100%;
					list-style: none;
					font-size: 16px;
					text-align: center;
					.courseTitle {
						cursor: pointer;
					}
				}
				li:nth-child(1) {
					padding: 20px;
					box-sizing: border-box;
					display: flex;
					.img {
						width: 220px;
						height: 122px;
						position: relative;
						.totalCourse{
							width: 87px;
						height: 25px;
						color: #FFFFFF;
						text-align: center;
						line-height: 25px;
						font-size: 12px;
						background: #ED2F46;
						position: absolute;
						bottom: 2px;
						right: 2px;
						}
						
						img {
							width: 100%;
							height: 100%;
						}
					}
					p {
						width: 170px;
						text-align: left;
						padding-top: 20px;
						margin-left: 10px;
					}
				}
				li:nth-child(2) {
					color: #3BABF5;
					line-height: 160px;
				}
				li:nth-child(3) {
					color: #3BABF5;
					line-height: 160px;
				}
				li:nth-child(4) {
					color: #808080;
					line-height: 160px;
					span {
						cursor: pointer;
					}
				}
				li:last-child {
					span {
						color: #FF9800;
					}
				}
			}
		}
	}
</style>