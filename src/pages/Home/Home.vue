<template>
	<div>
		<keep-alive>
		<HomeTop @showDiaglog="homeTop" @logOut="showLogOut" @changeData="update"></HomeTop>
		</keep-alive>
		<div class="tab_bar">
			<el-tabs v-model="online" class="tab_bar_warp" @tab-click="getTrue">
				<el-tab-pane label="精选推荐" name="first">
					<keep-alive>
					<Homeone v-if="allNum == 0" style="width: 95%;margin: 0 auto;"></Homeone>
						</keep-alive>
				</el-tab-pane>
				<el-tab-pane label="VIP课程" name="second">
					<keep-alive>
					<Hometwo v-if="allNum == 1" :classId="vipNum" style="width: 95%;margin: 0 auto;"></Hometwo>
					</keep-alive>
				</el-tab-pane>
				<!--<el-tab-pane label="付费课程" name="third">
					<keep-alive>
					<Hometwo :classId="payNum" v-if="allNum == 2" style="width: 95%;margin: 0 auto;"></Hometwo>	
						</keep-alive>
				</el-tab-pane>-->
				<el-tab-pane v-for="(item,index) in className" :label="item.name" :key="index">
					<keep-alive>
					<Homethree :classId="item.id" v-if="allNum == index+2" style="width: 95%;margin: 0 auto;"></Homethree>
					</keep-alive>
				</el-tab-pane>
				
			</el-tabs>
		</div>
		<keep-alive>
			<LDialog v-show="showDialog" @closeDialog='closeDia()' @update="update"></LDialog>
		</keep-alive>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			  <span>是否确定退出登录</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取消</el-button>
			    <el-button type="primary" @click="loginOut">确定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	import HomeTop from '@/components/HomeTop/HomeTop';
	import Homeone from '@/components/HomeContent/home_one';

	import Hometwo from '@/components/HomeContent/home_two';
	import Homethree from '@/components/HomeContent/home_three';
	export default {
		created(){
			
			
			
		},
		
		activated() {
			
			
			this.getClassName() //一级分类名;
			

		},
		mounted() {},
		components: {
		
			HomeTop,
			Homeone,
			Hometwo,
			Homethree
		},
		data() {
			return {
				head: this.$imgUrl,
				vipNum: 4,
				payNum:2,
				className: [],
				dialogVisible: false,
				isHome: true,
				online: "first",
				isMenu: false,
				showDialog: false,	
				menu_list:[1,2,3,4,5],
				allNum:0,
			}
		},
		methods: {
			update(){
				console.log("update")
				
			},
			
			getTrue(tab,event){
				console.log(tab.index)
				if(tab.index){
					this.allNum = tab.index
				}
			},
			homeTop() {

				this.showDialog = true

			},
			showLogOut() {
				this.dialogVisible = true

			},
			loginOut() {
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
							}
						})

						//					console.log(res)
					}
				})

			},

			getClassName() {
				this.$Api.getCategoryList({
					a: 1
				}).then((res) => {
					console.log(res)
					if(res.q.categorys.length>0){
						this.className = res.q.categorys.splice(7, 11); //"一级分类列表"
					}
					
					console.log(this.className,"一级分类列表")
				})
			},

			closeDia() {

				this.showDialog = false
				//				this.move()
			},
			move() {
				var mo = function(e) {
					e.preventDefault();
				};
				document.body.style.overflow = ''; //出现滚动;
				document.removeEventListener("touchmove", mo, false);
			},
			go() {
				//				this.stop()
				this.showDialog = true
			},
			stop() {
				var mo = function(e) {
					e.preventDefault();
				};
				document.body.style.overflow = 'hidden';
				document.addEventListener("touchmove", mo, false); //禁止页面滑动
			},

		},
	}
	
</script>

<style scoped="scoped" lang="scss">
	/*精选课*/
	
	img {
		width: 100%;
		height: 100%;
	}
	
	li {
		list-style: none;
	}
	
	.first_warp,
	.online_warp,
	#second_warp,
	#third_warp,
	#fourth_warp {
		margin: 0 auto;
	}
	
	.education_content_tab {
		padding-top: 20px;
		float: left;
	}
	
	.education_content_tab_title {
		height: 70px;
		width: 145px;
		float: left;
	}
	
	.education_content_tab_item:hover {
		cursor: pointer;
		color: #3BABF5;
	}
	
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 9999;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
<style type="text/css">
	.tab_bar .el-tabs__nav-scroll{width: 1100px;margin: 0 auto;}
	.tab_bar .el-tabs__item {
		font-size: 26px !important;
		height: 80px;
		line-height: 80px;
		border: #FFFFFF !important;
	}
	
	.tab_bar .el-tabs__nav {
		margin: 0 auto;
	}
	
	.tab_bar .el-tab-pane {
		font-size: 30px;
		color: #101010;
	}
	
	.free_content .el-tabs__nav {
		padding: 0;
	}
	
	.free_content .el-tabs__active-bar {
		display: none;
	}
	
	#second_warp .el-tabs__item,
	#third_warp .el-tabs__item,
	#fourth_warp .el-tabs__item {
		font-size: 20px !important;
		height: 80px;
		line-height: 80px;
		border: #FFFFFF !important;
	}
	
	#second_warp .el-tabs__nav,
	#third_warp .el-tabs__nav,
	#fourth_warp .el-tabs__nav {
		padding: 0
	}
	
	#second_warp .el-tabs__active-bar,
	#third_warp .el-tabs__active-bar,
	#fourth_warp .el-tabs__nav {
		left: 490px !important;
	}
	
	#second_warp .el-tab-pane,
	#third_warp .el-tab-pane,
	#fourth_warp .el-tabs__nav {
		font-size: 30px;
		color: #101010;
	}
	
	.vipClass_content .el-tabs__nav {
		padding: 0;
	}
	
	.vipClass_content .el-tabs__active-bar {
		display: none;
	}
	
	
</style>