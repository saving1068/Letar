<template>
	<div id="Teacher" style="width: 769px;">
		<p class="title">关注的老师</p>
					<div class="contentBox" v-if="total>0" >
						<div class="top">
							<li>老师</li>
							<li style="width: 190px;">关注人数</li>
							<li>操作</li>
						</div>
						<div class="bottom">
							<li v-for="item in teacherList">
								<div class="avatar" @click="go(item.id)" style="cursor: pointer;">
									<img :src="item.avaterPath" />
								</div>
								<div class="name">
									<p>
										<a @click="go(item.id)">{{item.nickname}}</a>
									</p>
									<p>{{item.teacherAppellation}}</p>
								</div>
								<div class="person">{{item.followNum}}人</div>
								<div class="cancel" @click="cancelTeacher(item.id)"><span>取消关注</span></div>

							</li>

						</div>
						<div style="margin-top: 20px;margin-bottom: 60px;background: #FFFFFF;text-align: center;">
							<el-pagination @current-change="handleCurrentChange" @prev-click="prev" @next-click="next"  :current-page.sync="teacherPa" :page-size="10" layout="prev, pager, next, jumper" :total="total">
							</el-pagination>

						</div>
					</div>
					<div style="height: 400px;position: relative;background: #FFFFFF;margin-left: 9px;width: 760px;" v-if="total==0">

			<div class="noData">

				<div class="icon"></div>
				<span>暂无已购课程</span>

			</div>
		</div>
					
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>是否确定取消关注</span>
			<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="cancelT">确 定</el-button>
  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				teacherId:0,
				teacherPa: 1,
				pa:1,
				dialogVisible:false,
				teacherList: [],
				total:-1
			}
			
		},
		activated(){
			
			this.getTeacher()
		},
		methods:{
			go(id){
				this.$router.push({
					name:"TeacherHomePage",
					query:{
						teacherId:id
					}
					
				})
				
			},
			handleCurrentChange(e) {
				this.pa = e
				this.getTeacher()

			},
			prev(e) {
				this.pa = e
				this.getTeacher()
			},
			next(e) {
				this.pa = e
				this.getTeacher()

			},
			
			cancelTeacher(id){
				this.teacherId = id
				this.dialogVisible = true
			},
			handleCurrentChange(){
				
			},
			cancelT() {
				var obj = {
					a: 2,
					id: this.teacherId,
					open: 2

				}
				this.$Api.TurnSwitch(obj).then((res) => {
					if(res.q.s == 0) {
						this.dialogVisible = false
						this.$message({
							showClose: true,
							message: '取消关注成功',
							type: 'success'
						});
						this.getTeacher()
					} else {
						this.dialogVisible = false
						this.$message({
							showClose: true,
							message: '取消关注失败',
							type: 'error'
						});
					}
				})
			},
			
			getTeacher() {
				this.$Api.TeacherList({
					a: 2,
					pa: this.pa
				}).then((res) => {
					if(res.q.s == 0) {
						this.teacherList = [...res.q.teachers]
						this.total=res.q.total
						if(this.teacherList.length>0){
							for(var i=0;i<this.teacherList.length;i++){
								if(this.teacherList[i].avaterPath==""){
									this.teacherList[i].avaterPath=require('../../assets/common_footer_logo.png')
									
								}else{
									
									this.teacherList[i].avaterPath=this.$imgUrl+this.teacherList[i].avaterPath
									
								}
							}
							 
						}
                        
                        
                        
					}

				})

			}
			
			
		}
		
		
	}
</script>

<style scoped="scoped" lang="scss">
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

#Teacher {
		.title {
			font-size: 20px;
			margin-bottom: 19px;
		}
		.contentBox {
			width: 760px;
			background: #FFFFFF;
			margin-bottom: 60px;
			margin-left: 9px;
			.top {
				width: 100%;
				height: 60px;
				border-bottom: 1px solid #B3B3B3;
				display: flex;
				li {
					line-height: 60px;
					font-size: 20px;
					list-style: none;
				}
				li:first-child {
					width: 66%;
					text-indent: 20px;
				}
			}
			.bottom {
				li {
					list-style: none;
					height: 140px;
					display: flex;
					border-bottom: 1px solid #B3B3B3;
					.avatar {
						width: 80px;
						height: 80px;
						background: #000000;
						border-radius: 50%;
						margin-top: 30px;
						margin-left: 20px;
						img {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.name {
						width: 260px;
						margin-left: 30px;
						p {
							font-size: 18px;
						}
						p:first-child {
							color: #3BABF5;
							margin-top: 45px;
						}
						p:last-child {
							margin-top: 10px;
							color: #101010;
						}
					}
					.person {
						width: 67px;
						height: 100%;
						text-align: center;
						font-size: 16px;
						color: #3BABF5;
						line-height: 140px;
						margin-left: 125px;
					}
					.cancel {
						width: 67px;
						text-align: center;
						height: 100%;
						font-size: 16px;
						color: #FF9800;
						line-height: 140px;
						margin-left: 100px;
						span {
							cursor: pointer;
						}
					}
				}
				li:last-child {
					border: none;
				}
			}
		}
	}
</style>