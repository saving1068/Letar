<template>
	<div id="LHeader" v-if="isPc">
		<div class="headBox">
			<div class="icon" @click="goHome">

			</div>

			<div :class=" [flag?'active':'','courseList']" v-if="!isHome" @mouseover="over" @mouseout="out">
				<i class="courseIcon">
			 		
			 	</i>
				<span>课程分类</span>
				<div class="firstBox" :style="[{'height':first?className.length*50+'px':'0px'},{'overflow':second?'visible':'hidden'}]">
					<li v-for="(item,index) in className" @mouseover="onFirst(index)" @mouseout="outFirst(index)" class="firstLi">
						<a class="firstTitle" @click="goFirst(item.id,item.name)">{{item.name}}</a>
						<a style="margin-left: 25px;" v-if="item.list[1]" @click="goSecond(item.list[1],item)">{{item.list[1].name}}</a>
						<a style="margin-left: 12px;" v-if="item.list[2]" @click="goSecond(item.list[2],item)">{{item.list[2].name}}</a>
						<i></i>
						<div class="secondBox" v-if="item.flag" :style="[{'top':0}]">
							<li v-for="(listItem,index) in item.list" v-if="index>0" style="float: left;width: 100%;">
								<div style="line-height: 50px;float: left;width: 120px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;height: 50px;">
									<a class="titleName" @click="goSecond(listItem,item)">{{listItem.name}}</a>
								</div>
								<div class="thirdBox" style="padding-top: 15px;">
									<div v-for="third in listItem.third" style="line-height:normal;">
										<a @click="goThird(third,listItem,item)">{{third.name}}</a>
									</div>
								</div>
							</li>
						</div>

					</li>

				</div>

			</div>
			<div class="courseList" v-if="isHome">

			</div>

			<div class="inputBox">
				<div class="left">课堂</div>
				<div class="right">
					<input type="text" placeholder="共享师资大课堂" v-model="searchText" @keydown="goKeyDown" />
				</div>
			</div>
			<div class="searchBox" @click="goSearch">

			</div>
			<div :class="[loginFlag?'activeItem':'','item']" style="margin-left: 2%;cursor: pointer;" @mouseover="loginOver" @mouseout="loginOut" @click="login" v-if="!getisLogin">
				<span>登录</span>
			</div>
			<div :class="[personFlag?'activeItem':'','item']" style="margin-left: 2%;" @mouseover="personOver" @mouseout="personOut" v-if="getisLogin">
				<span>个人中心</span>
				<i :class="[personFlag?'activeIcon':'']"></i>
				<div :class="[ personFlag?'active':'' ,'personBox']" :style="[{'height':personFlag?'320px':'0px'}]">
					<li @click="go('个人信息')">个人信息</li>
					<li @click="go('已购课程')">已购课程</li>
					<li @click="go('VIP')">VIP</li>
					<li @click="go('关注的老师')">关注的老师</li>
					<li @click="go('收藏的课程')">收藏的课程</li>
					<li @click="go('我的钱包')">我的钱包</li>
					<li @click="go('观看历史')">观看历史</li>
					<!--	<li @click="go('实名认证')">实名认证</li>-->
					<li @click="go('退出')">退出登录</li>

				</div>
			</div>
			<div :class="[togetherFlag?'activeItem':'','item']" style="margin-left: 1%;" @mousemove="togetherOver" @mouseout="togetherOut">
				<span>合作</span>
				<i :class="[togetherFlag?'activeIcon':'']" style="right: 20px;"></i>
				<div :class="[ togetherFlag?'active':'' ,'togetherBox']" :style="[{'height':togetherFlag?'80px':'0px'}]">
					<li @click="go('入驻代理')">入驻代理</li>
					<li @click="go('代理商')">代理商</li>

				</div>
			</div>

			<div :class="[teacherFlag?'activeItem':'', 'item']" style="margin-left: 1%;" @mousemove="teacherOver" @mouseout="teacherOut">
				<span>我要讲课</span>
				<i :class="[teacherFlag?'activeIcon':'']"></i>
				<div :class="[ teacherFlag?'active':'' ,'togetherBox']" :style="[{'height':teacherFlag?'80px':'0px'}]">
					<li @click="go('入驻老师')">入驻老师</li>
					<li @click="go('我是老师')">我是老师</li>

				</div>
			</div>
		</div>

		<LDialog v-show="showDialog" @closeDialog='closeDia()'></LDialog>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>是否确定退出登录</span>
			<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="logOut">确 定</el-button>
  </span>
		</el-dialog>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				isPc: true,
				isHome: true,
				first: false,
				second: false,
				flag: false,
				showDialog: false,
				dialogVisible: false,
				personFlag: false,
				togetherFlag: false,
				teacherFlag: false,
				loginFlag: false,
				isLogin: false,
				searchText: "",
				className: []
			}
		},
		computed: {
			getisLogin() {

				return this.$store.state.isLogin

			}

		},
		watch: {
			getisLogin: function(a, b) {
				console.log(a)
				console.log(this.$route.path.indexOf("Mine"))
				if(a != null) {

					this.isLogin = a

					if(a == false) {
						if(this.$route.name == "MyIncome" || this.$route.name == "AgencyBb" || this.$route.name == "AgencyAa" || this.$route.name == "AgencyC" || this.$route.name == "AgencyB" || this.$route.name == "AgencyA" || this.$route.path.indexOf("Mine") != -1) {
							this.$router.replace({
								name: "Index"
							})

						}

					}

				}

			},
			'$route' (to, from) {

				if(to.name == "Index") {
					this.isHome = true
				} else {
					this.isHome = false
				}
				if(to.name == "Login" || to.name == "ShareCourse" || to.name == "UserAgreement" || to.name == "Auth") {
					this.isPc = false
				} else {
					this.isPc = true
				}
				if(this.$store.state.isLogin == false) {
					if(to.name == "MyIncome" || to.name == "AgencyBb" || to.name == "AgencyAa" || to.name == "AgencyC" || to.name == "AgencyB" || to.name == "AgencyA" || to.path.indexOf("Mine") != -1) {

						this.$router.replace({
							name: from.name
						})

					}

				}
				if(to.name == "MyIncome") {
					if(this.$store.state.user.userType == 1) {
						this.$router.replace({
							name: from.name
						})

					}

				}

			}

		},
		created() {
			if(this.$route.name == "Index") {
				this.isHome = true
			} else {
				this.isHome = false

			}
			this.getClassName()

		},
		methods: {
			goKeyDown(event) {
				if(event.keyCode == 13) {
					this.goSearch()
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
			goSecond(obj, firstObj) {

				this.$router.push({
					name: "TopSeach",
					query: {
						firstName: firstObj.name,
						firstClass: firstObj.id,
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

			goSearch() {
				if(this.searchText == "") {
					this.$router.push({
						name: "SeekPage"
					})

				} else {
					this.$router.push({
						name: "TopSeach",
						query: {
							search: this.searchText

						}

					})
				}

			},

			getClassName() {
				this.$Api.getCategoryList({
					a: 0
				}).then((res) => {
					console.log(res)
					if(res.q.categorys.length > 0) {
						this.className = [...res.q.categorys.splice(1)]; //"一级分类列表"
						for(var i = 0; i < this.className.length; i++) {
							this.className[i].flag = false

						}

					}

					console.log(this.className)

				})
			},

			goHome() {

				this.$router.push({
					name: "Index"
				})
			},
			logOut() {
				this.$Api.UserLogout().then((res) => {
					if(res.q.s == 0) {
						this.dialogVisible = false
						localStorage.removeItem("session")
						this.$store.dispatch('changeLogin', false)
					this.$store.dispatch('changeUser',{})
						this.$Api.getSessionId().then((res) => {
							if(res.q.s == 0) {
								this.$Api.setSessionId(res.s)
								localStorage.setItem("session", res.s)
                                 
								this.$message({
									message: '退出成功',
									type: 'success'
								});
								if(this.$route.name=="Index"){
									this.$router.replace({
									name: this.$route.name
								})
								}
								

							}
						})

						console.log(res)
					}
				})

			},

			closeDia() {
				this.showDialog = false

			},

			go(text) {
				if(text == '个人信息') {
					this.$router.push({
						name: 'Mine',
						query: {
							index: 0
						}
					})
				} else if(text == "已购课程") {
					this.$router.push({
						name: 'BuyCourse',
						query: {
							index: 1
						}
					})

				} else if(text == "VIP") {
					this.$router.push({
						name: 'Vip',
						query: {
							index: 2
						}
					})

				} else if(text == "关注的老师") {
					this.$router.push({
						name: 'Teacher',
						query: {
							index: 3
						}
					})

				} else if(text == "收藏的课程") {
					this.$router.push({
						name: 'Course',
						query: {
							index: 4
						}
					})

				} else if(text == "我的钱包") {
					this.$router.push({
						name: 'Cash',
						query: {
							index: 5
						}
					})

				} else if(text == "观看历史") {
					this.$router.push({
						name: 'History',
						query: {
							index: 6
						}
					})

				} else if(text == '入驻代理') {
					this.$router.push({
						name: 'EnterAgency'
					})
				} else if(text == '代理商') {
					if(this.$store.state.isLogin) {
						if(this.$store.state.user.userType == 3) {
							this.$router.push({
								name: 'MyIncome',
								query: {
									type: 1
								}
							})

						} else if(this.$store.state.user.userType == 2) {
							//							this.$message({
							//								showClose: true,
							//								message: '您不是代理商账户',
							//								type: 'error'
							//							});
							this.$router.push({
								name: 'MyIncome',
								query: {
									type: 2
								}
							})

						} else {
							this.$message({
								showClose: true,
								message: '您还不是代理商',
								type: 'error'
							});
							this.$router.push({
								name: 'AgencyA'

							})

						}

					} else {
						this.$message({
							showClose: true,
							message: '您还未登录',
							type: 'error'
						});
						this.showDialog = true

					}

				} else if(text == '我是老师') {

					if(this.$store.state.isLogin) {
						if(this.$store.state.user.userType == 2) {
							this.$router.push({
								name: 'MyIncome',
								query: {
									type: 2
								}
							})

						} else if(this.$store.state.user.userType == 3) {
							this.$message({
								showClose: true,
								message: '您不是老师账户',
								type: 'error'
							});
							this.$router.push({
								name: 'MyIncome',
								query: {
									type: 1
								}
							})

						} else {
							this.$message({
								showClose: true,
								message: '您还不是老师',
								type: 'error'
							});
							this.$router.push({
								name: 'AgencyAa'

							})

						}
					} else {
						this.$message({
							showClose: true,
							message: '您还未登录',
							type: 'error'
						});
						this.showDialog = true

					}

				} else if(text == '入驻老师') {
					this.$router.push({
						name: 'EnterAgency'
					})

				} else if(text == '退出') {
					this.dialogVisible = true
					 
					
				}

			},

			loginOver() {

				this.loginFlag = true
			},
			login() {
				this.showDialog = true

			},
			loginOut() {
				this.loginFlag = false
			},
			over() {

				this.first = true
				this.flag = true
			},
			teacherOver() {
				this.teacherFlag = true
			},
			teacherOut() {

				this.teacherFlag = false
			},
			togetherOver() {
				this.togetherFlag = true
			},
			togetherOut() {
				this.togetherFlag = false
			},
			personOver() {
				this.personFlag = true
			},
			personOut() {
				this.personFlag = false
			},
			out() {
				this.first = false
				this.flag = false
			},
			onFirst(index) {
				this.second = true
				this.className[index].flag = true
			},
			outFirst(index) {
				this.second = false
				this.className[index].flag = false
			}
		}

	}
</script>

<style scoped="scoped" lang="scss">
	.headBox {
		height: 100px;
		display: flex;
		justify-content: center;
		.icon {
			margin-top: 25px;
			width: 180px;
			height: 56px;
			background: url(../../assets/common_header_logo.png) no-repeat;
			background-size: 100% 100%;
			cursor: pointer;
			position: relative;
			bottom: 3px;
		}
		.title {
			line-height: 50px;
			font-size: 27px;
			margin-left: 0.2%;
		}
		.courseList {
			padding-top: 25px;
			box-sizing: border-box;
			padding-left: 25px;
			width: 166px;
			height: 100%;
			margin-left: 2.3%;
			line-height: 50px;
			position: relative;
			.firstBox {
				width: 280px;
				overflow: hidden;
				transition: 0.5s;
				top: 100.3px;
				left: 0;
				z-index: 999;
				background: #FFFFFF;
				box-shadow: 1px 1px 10px #e7e7e7, -1px -1px 10px #e7e7e7;
				position: absolute;
				a {
					font-size: 15px;
					color: #000000;
					margin: 0;
					cursor: pointer;
				}
				a:hover {
					text-decoration: underline;
				}
				.firstTitle {
					font-size: 18px;
					margin-left: 11px;
					font-weight: bold;
				}
				.firstLi {
					height: 50px;
					list-style: none;
					i {
						width: 7px;
						height: 14px;
						background: url(../../assets/list_icon_more.png) no-repeat;
						background-size: 100% 100%;
						float: right;
						position: relative;
						top: 18px;
						right: 18px;
					}
					.secondBox {
						position: absolute;
						z-index: 999;
						left: 280px;
						width: 500px;
						background: #FFFFFF;
						box-shadow: 1px 1px 10px #e7e7e7, -1px -1px 10px #e7e7e7;
						li {
							list-style: none;
							.titleName {
								width: 120px;
								font-weight: bold;
								color: #000000;
								margin-left: 21px;
							}
							.thirdBox {
								width: 340px;
								margin-left: 20px;
								float: right;
								display: flex;
								flex-wrap: wrap;
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
						}
					}
				}
				li:hover {
					background: #CCCCCC;
				}
			}
			.courseIcon {
				width: 36px;
				height: 38px;
				float: left;
				background: url(../../assets/common_header_icon_course.png) no-repeat;
				background-size: 100% 100%;
				position: relative;
				top: 6px;
			}
			span {
				margin-left: 7.7%;
				font-size: 20px;
			}
		}
		.active {
			box-shadow: 1px 5px 10px #e7e7e7, -1px 1px 10px #e7e7e7;
		}
		.inputBox {
			margin-top: 25px;
			width: 362px;
			height: 50px;
			box-sizing: border-box;
			margin-left: 2.3%;
			display: flex;
			border: 1px solid #808080;
			border-right: 0;
			.left {
				width: 48px;
				height: 48px;
				line-height: 48px;
				text-align: center;
				font-size: 16px;
				border-right: 1px solid #808080;
			}
			.right {
				width: 314px;
				height: 46px;
				input {
					width: 100%;
					height: 100%;
					border: none;
					outline: none;
					font-size: 14px;
					text-indent: 9px;
				}
			}
		}
		.searchBox {
			margin-top: 25px;
			width: 50px;
			height: 50px;
			background: url(../../assets/common_header_btn_search.png) no-repeat;
			background-size: 100% 100%;
			cursor: pointer;
		}
		.item {
			width: 110px;
			height: 100px;
			transition: 0.5s;
			line-height: 100px;
			position: relative;
			li {
				list-style: none;
				text-align: center;
				line-height: 40px;
				font-size: 18px;
				width: 100%;
				height: 40px;
			}
			li:hover {
				cursor: pointer;
				background: #CCCCCC;
			}
			.personBox {
				width: 100%;
				top: 100px;
				background: #FFFFFF;
				position: absolute;
				transition: 0.5s;
				overflow: hidden;
				z-index: 999;
			}
			.togetherBox {
				width: 100%;
				top: 100px;
				background: #FFFFFF;
				position: absolute;
				transition: 0.5s;
				overflow: hidden;
				z-index: 999;
			}
			.active {
				border-top: 1px solid #CCCCCC;
				box-shadow: 1px 5px 10px #e7e7e7, -1px 5px 10px #e7e7e7;
			}
			span {
				width: 100%;
				text-align: center;
				float: left;
				font-size: 17px;
			}
			i {
				width: 12px;
				height: 7px;
				margin-left: 6px;
				background: url(../../assets/common_header_btn_pulldown.png) no-repeat;
				background-size: 100% 100%;
				float: right;
				position: absolute;
				transition: 0.5s;
				top: 48px;
				right: 5px;
			}
			.activeIcon {
				transform: rotate(180deg);
			}
		}
		.activeItem {
			box-shadow: 1px 5px 10px #e7e7e7, -1px 5px 10px #e7e7e7;
		}
	}
</style>