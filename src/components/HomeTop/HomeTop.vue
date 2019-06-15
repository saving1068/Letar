<template>
	<div id="HomeTop">
		<div class="swiper_box">
			<el-carousel :interval="5000" arrow="always">
				<el-carousel-item v-for="(v,i) in tabImg" :key="i" v-if="tabImg.length>0">
					<img :src="head+v.image_url" @click="goToUrl(v,i)" />
				</el-carousel-item>
				
			</el-carousel>
		</div>

		<div class="leftBox">
			<div class="menu">
				<div class="menu_item" v-for="(listItem,index) in className" @mouseover="over(index)" @mouseout="out(index)">
					<a class="menu_item_title" @click="goFirst(listItem.id,listItem.name)">
						{{listItem.name}}
					</a>
					<a class="menu_item_sort" v-if="listItem.list[1]" @click="goSecond(listItem.list[1],listItem)">
						{{listItem.list[1].name}}
					</a>
					<a class="menu_item_sort sort2" v-if="listItem.list[2]" @click="goSecond(listItem.list[2],listItem)">
						{{listItem.list[2].name}}
					</a>
					<i class="menu_item_img">

						</i>
					<div class="menu_content" v-if="listItem.flag" :style="[{'top':index*-50+'px'}]">
						<li class="menu_content_item" v-for="(item,listIndex) in listItem.list" v-if="listIndex>0">
							<div style="line-height: 50px;float: left;width: 120px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;height: 50px;">
								<a class="menu_content_title" @click="goSecond(item,listItem)">{{item.name}}</a>
							</div>
							<div class="menu_content_val" style="padding-top: 15px;">
								<div v-for="threeItem in item.third" style="line-height:normal;">
									<a @click="goThird(threeItem,item,listItem)">{{threeItem.name}}</a>
								</div>
							</div>
						</li>

					</div>

				</div>

			</div>

		</div>

		<div class="rightBox">
			<div class="login" v-if="!getisLogin">
				<p class="login_title">跟进你的学习进度</p>
				<div class="login_logo">
					<img src="../../assets/common_footer_logo.png" />
				</div>
				<h3>共享师资</h3>
				<div class="login_btn" @click="showDialog()">
					登录
				</div>
			</div>
			<div class="Mine" v-if="getisLogin">
				<div class="top">
					<div class="avatar"  @click="go" style="cursor: pointer;">
						<img :src="user.avatarPath" />
					</div>
					<div  class="nickname" style="margin-left: 5px;margin-right: 5px;">
						<span @click="go">{{user.nickname}}</span>
					</div>
					
					<span @click="logOut">退出</span>
				</div>
				<div class="mid">
					<div style="cursor: pointer;float: left;" @click="myCourse">
						<span class="num">{{user.followNum}}</span><span>门课程</span>
					</div>
					<div style="float:right; cursor: pointer;" @click="Course">
						<span class="num">{{user.collectionNum}}</span><span>门收藏</span>
					</div>

				</div>
				<p style="font-size: 14px;color: #B3B3B3;width: 100%;float: left;line-height: 70px;" v-if="user.live==''">今天暂无直播课程</p>
				<p class="second" v-if="user.live!=''">
					<a style="color: #000000;" @click="goCourse(user.live.id)">{{user.live.name}}</a>
				</p>
				<!--<p v-if="user.live!=''&&user.live.status==1" style="font-size: 14px;color: #B3B3B3;width: 100%;float: left;">还未开播</p>
				<p v-if="user.live!=''&&user.live.status==2" style="font-size: 14px;color: #B3B3B3;width: 100%;float: left;">直播中</p>-->
				<p class="third" v-if="user.live!=''" style="font-size: 14px;color: #B3B3B3;width: 100%;float: left;margin-bottom: 10px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{user.live.liveTime}}</p>
				<div class="bottom" @click="myCourse">
					<div></div>
					<span>我的课程</span>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				head: this.$imgUrl,
				tabImg: [],

				isMenu: false,
				isLogin: false,
				user: {},
				className: []
			}

		},
		computed: {
			getisLogin() {

				return this.$store.state.isLogin

			},
			getUser(){
				return this.$store.state.user
				
			}
			
		},
		watch: {
			getisLogin: function(a, b) {
				console.log(a)

				if(a != null) {

					this.isLogin = a
					if(this.isLogin) {
						this.getDetails()
					}

				}

			},
			getUser(a,b){
				if(JSON.stringify(a) == "{}"){
					if(this.isLogin){
						
						this.getDetails()
						
					}
					
					
				}
				
				
				
			}

		},
		created() {
			this.getAdsList() //轮播
			this.getClassName()
			if(this.$store.state.isLogin) {
				if(JSON.stringify(this.$store.state.user) != "{}") {
					this.user = { ...this.$store.state.user
					}

				} else {
					this.getDetails()
				}
			}
		},
		activated() {

			this.getDetails()
		},
		methods: {
			goCourse(id) {
				this.$router.push({
					name: "ClassDetails",
					query: {
						courseId: id
					}

				})

			},
			goToUrl(item, index) {
				if(item.type == 1) {
					window.location.href = item.url
				} else {
					this.$router.push({
						name: "LunboVal",
						query: {
							type: item.type,
							index,
						}
					})
				}
			},
			goFirst(id, name) {
				this.$router.push({
					name: "TopSeach",
					query: {
						firstClass: id,
						level: 1,
						firstName: name

					}

				})

			},
			goSecond(obj, secondObj) {

				this.$router.push({
					name: "TopSeach",
					query: {
						firstName: secondObj.name,
						firstClass: secondObj.id,
						secondClass: obj.id,
						secondName: obj.name,
						level: 2

					}

				})

			},
			goThird(obj, secondObj, firstObj) {
				this.$router.push({
					name: "TopSeach",
					query: {
						firstName: firstObj.name,
						firstClass: firstObj.id,
						secondName: secondObj.name,
						secondClass: secondObj.id,
						thirdName: obj.name,
						thirdClass: obj.id,
						level: 3

					}

				})

			},
			getClassName() {
				this.$Api.getCategoryList({
					a: 0
				}).then((res) => {
					console.log(res)
					if(res.q.categorys.length > 0) {
						this.className = [...res.q.categorys.splice(1, 6)]; //"一级分类列表"
						for(var i = 0; i < this.className.length; i++) {
							this.className[i].flag = false

						}

					}

				})
			},

			myCourse() {
				this.$router.push({
					name: "BuyCourse",
					query: {
						index: 1
					}
				})

			},
			Course() {
				this.$router.push({
					name: "Course",
					query: {
						index: 4
					}
				})

			},
			getAdsList() {
				this.$Api.getAdsList().then((res) => {
					console.log(res, "轮播图")
					this.tabImg = res.q.Ads

				})

			},
			go() {
				this.$router.push({
					name: "Mine"
				})

			},
			getDetails() {
				this.$Api.UserDetails().then((res) => {
					if(res.q.s == 0) {
						console.log(res)
						this.user = { ...res.q.userInfo
						}
						if(this.user.avatarPath == "") {
							this.user.avatarPath = require('../../assets/common_footer_logo.png')
						} else {

							this.user.avatarPath = this.$imgUrl + this.user.avatarPath

						}
						this.$store.dispatch('changeUser', this.user)

					}

				})

			},
			logOut() {
				this.$emit('logOut')

			},
			over(i) {
				var obj = { ...this.className[i]
				}
				obj.flag = true

				this.$set(this.className, i, obj)
				//				this.className[i].flag = true
				console.log(this.className)
			},
			out(i) {

				this.className[i].flag = false
			},
			showDialog() {

				this.$emit("showDiaglog")

			}

		}

	}
</script>

<style scoped="scoped" lang="scss">
	#HomeTop {
		.el-carousel__item {
			img {
				width: 100%;
				height: 100%;
			}
		}
		height: 300px;
		width: 100%;
		background: salmon;
		position: relative;
		.swiper_box {
			width: 100%;
			height: 100%;
			margin: auto;
			position: absolute;
			/*z-index: 100;*/
		}
		.leftBox {
			position: relative;
			width: 1200px;
			margin: auto;
			z-index: 50;
			.menu {
				position: absolute;
				background: #e6e6e6;
				left: 0;
				top: 0;
				.menu_item {
					width: 276px;
					height: 50px;
					position: relative;
					padding: 0 17px 0 10px;
					display: flex;
					.menu_item_title {
						font-size: 18px;
						color: #101010;
						float: left;
						padding: 13px 0;
					}
					a:hover {
						text-decoration: underline;
					}
					.menu_item_sort {
						float: left;
						padding-left: 25px;
						font-size: 14px;
						color: #7D7D7D;
						padding-top: 15px;
					}
					.sort2 {
						padding-left: 12px;
						padding-right: 14px;
					}
					.menu_item_img {
						width: 7px;
						height: 14px;
						background: url(../../assets/list_icon_more.png) no-repeat;
						background-size: 100% 100%;
						float: right;
						position: absolute;
						top: 18px;
						right: 10px;
					}
				}
				.menu_item:hover {
					background: #cccccc;
				}
				.menu_content {
					width: 500px;
					position: absolute;
					left: 276px;
					top: 0;
					z-index: 999;
					background: #FFFFFF;
					box-shadow: 1px 1px 10px #e7e7e7, -1px -1px 10px #e7e7e7;
					a {
						font-size: 14px;
						color: #000000;
					}
					li {
						list-style: none;
					}
					.menu_content_title {
						width: 120px;
						font-weight: bold;
						margin-left: 21px;
					}
					.menu_content_val {
						display: flex;
						flex-wrap: wrap;
						width: 360px;
						padding-left: 40px;
						div {
							float: left;
							margin-bottom: 7px;
							a {
								height: 24px;
								font-size: 14px;
								margin-right: 30px;
							}
						}
					}
					.menu_content_item {
						display: flex;
						margin-bottom: 10px;
					}
					.menu_content_item:first-child {
						margin-top: 30px;
					}
				}
			}
		}
		.rightBox {
			position: relative;
			width: 1200px;
			margin: auto;
			z-index: 20;
			.login {
				width: 200px;
				height: 250px;
				background: #E6E6E6;
				border-radius: 5px;
				position: absolute;
				right: 0;
				top: 25px;
				.login_title {
					font-size: 18px;
					padding-top: 33px;
					text-align: center;
				}
				.login_logo {
					width: 64px;
					height: 56px;
					margin: auto;
					margin-top: 19px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				h3 {
					margin-top: 9px;
					font-size: 28px;
					text-align: center;
				}
				.login_btn {
					width: 170px;
					height: 40px;
					margin: auto;
					line-height: 40px;
					background: #3BA6F8;
					text-align: center;
					color: #FFFFFF;
					font-size: 23px;
					border-radius: 5px;
					cursor: pointer;
					margin-top: 10px;
				}
			}
			.Mine {
				width: 200px;
				height: 250px;
				background: #E6E6E6;
				border-radius: 5px;
				position: absolute;
				right: 0;
				top: 25px;
				padding-left: 20px;
				padding-top: 26px;
				padding-right: 20px;
				box-sizing: border-box;
				.top {
					height: 40px;
					display: flex;
					line-height: 40px;
					.avatar {
						width: 40px;
						height: 40px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					span {
						font-size: 14px;
					
						cursor: pointer;
					}
					
					span:last-child {
					
						color: #B3B3B3;
					}
					.nickname{
						width: 80px;
						/*对宽度的定义,根据情况修改*/
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
						span {
						display: block;
						font-size: 14px;
						width: 100%;
						color: #000000;
						/*对宽度的定义,根据情况修改*/
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					}
				
				.nickname {
					clear: both;
				}
				.nickname span {
					float: left;
					max-width: 100%;
				}
				.nickname:after {
					content: "...";
				}
					
					
					
				}
				.mid {
					height: 50px;
					border-bottom: 1px solid #B3B3B3;
					line-height: 50px;
					span {
						font-size: 14px;
						margin-left: 4px;
					}
					.num {
						margin-left: 0px;
						font-size: 18px;
					}
				}
				.second {
					display: block;
					font-size: 14px;
					width: 100%;
					/*对宽度的定义,根据情况修改*/
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-top: 10px;
					margin-bottom: 5px;
					a {
						display: block;
						font-size: 14px;
						width: 100%;
						/*对宽度的定义,根据情况修改*/
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				.second {
					clear: both;
				}
				.second a {
					float: left;
					max-width: 100%;
				}
				.second:after {
					content: "...";
				}
				.bottom {
					width: 100%;
					height: 40px;
					background: #CCCCCC;
					display: flex;
					line-height: 40px;
					cursor: pointer;
					div {
						width: 22px;
						height: 23px;
						background: url(../../assets/common_header_icon_course.png) no-repeat;
						background-size: 100%;
						margin-left: 40px;
						position: relative;
						top: 8px;
					}
					span {
						font-size: 14px;
						margin-left: 10px;
					}
				}
				a:hover {
					text-decoration: underline;
				}
			}
		}
		.bigBox {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 0;
			left: 0;
			top: 0;
			.midBox {
				width: 1200px;
				height: 100%;
				margin: auto;
				display: flex;
				position: relative;
			}
			/*.menu_item:hover .menu_content{display: block;}*/
		}
	}
</style>
<style type="text/css">
	.swiper_box .el-carousel__arrow--left {
		left: 50% !important;
		margin-left: -300px;
	}
	
	.swiper_box .el-carousel__arrow--right {
		right: 50% !important;
		margin-right: -370px;
	}
</style>