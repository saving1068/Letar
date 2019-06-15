<template>
	<div>
		<div class="content">
			<div class="left">
				<div class="box_select">
					<li v-for="(item,index) in leftData" @click="change(index)">

						<router-link :to="{name:'MineInformation',query: {index: index}}" v-if="index==0" :class="[index==activeIndex?'active':'']">{{item}} </router-link>
						<router-link :to="{name:'BuyCourse',query: {index: index}}" v-if="index==1" :class="[index==activeIndex?'active':'']">{{item}} </router-link>
						<router-link :to="{name:'Vip',query: {index: index}}" v-if="index==2" :class="[index==activeIndex?'active':'']">{{item}} </router-link>
						<router-link :to="{name:'Teacher',query: {index: index}}" v-if="index==3" :class="[index==activeIndex?'active':'']">{{item}} </router-link>
						<router-link :to="{name:'Course',query: {index: index}}" v-if="index==4" :class="[index==activeIndex?'active':'']">{{item}} </router-link>
						<router-link :to="{name:'Cash',query: {index: index}}" v-if="index==5" :class="[index==activeIndex?'active':'']">{{item}} </router-link>
						<router-link :to="{name:'History',query: {index: index}}" v-if="index==6" :class="[index==activeIndex?'active':'']">{{item}} </router-link>
					</li>
					<div class="leftHeng" :style="[{'top':activeIndex*48+'px'}]"></div>
				</div>
				<div class="box_download">
					<li @click="goDownLoad"></li>
					<li @click="goDownLoad"></li>
				</div>
			</div>
			<div class="right">
				  <keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
			</div>

		</div>

	</div>
</template>

<script>
	export default {

		data() {
			return {

				leftData: ["个人信息", "已购课程", "共享师资VIP", "关注的老师", "收藏的课程", "我的钱包", "观看历史"],
				activeIndex: this.$route.query.index,
				pay: false,

				user: {},
				

			}

		},
		computed: {
			getIndex() {
				return this.$route.query.index
			}
			
			
		},
		created() {
			window.scrollTo(0,0)
            

		},
		watch: {
			getIndex(a, b) {
				this.activeIndex = a
			}
			
			
			

		},

		methods: {

			changeData() {
				this.getUserDetails()
			},
		

			goDownLoad() {
				
				this.$router.push({
					name: "DownLoad"

				})

			},
			login() {

			},

			getCourse() {
				var obj = {
					a: 6,
					isBuy: 1,
					pa: this.pa

				}

				this.$Api.CourseList(obj).then((res) => {
					if(res.q.s == 0) {
						this.list = [...res.q.course];
						this.list.forEach((val, index) => {
							val.himagePath = this.$imgUrl + val.himagePath
						})
					}

					console.log(res)
				})

			},

			change(index) {
				console.log(this.$route)
                 if(this.$route.name=='RechargePay'){
                 	
                 	
                 }else{
                 	this.activeIndex = index
                 }
				

			},

		}
		

	}
</script>

<style scoped="scoped" lang="scss">
	.content {
		display: flex;
		background: #f5f5f5;
		justify-content: center;
		.left {
			width: 200px;
			margin-bottom: 60px;
			padding-top: 40px;
			.box_select {
				height: 336px;
				background: #FFFFFF;
				position: relative;
				.leftHeng {
					height: 48px;
					width: 2px;
					position: absolute;
					transition: 0.5s;
					background: #3BABF5;
					top: 0;
					left: 0;
				}
				li {
					height: 48px;
					line-height: 48px;
					font-size: 16px;
					list-style: none;
					text-align: left;
					cursor: pointer;
					span {
						margin-left: 30px;
					}
					a {
						color: #000000;
						text-align: left;
						text-indent: 30px;
						display: inline-block;
						width: 100%;
						height: 100%;
					}
				}
				.active {
					color: #3BABF5;
				}
			}
			.box_download {
				background: #FFFFFF;
				margin-top: 30px;
				padding: 20px;
				li {
					width: 150px;
					height: 40px;
					list-style: none;
					margin: auto;
					background: url(../../assets/btn_android-download.png) no-repeat;
					background-size: 100%;
					cursor: pointer;
				}
				li:first-child {
					margin-bottom: 20px;
					background: url(../../assets/btn_iphone-download.png) no-repeat;
				}
			}
		}
		.right {
			margin-left: 30px;
			padding-top: 40px;
		}
	}
</style>