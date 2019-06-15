<template>
	<section class="teacherHomePage">
		<!-- 老师主页 -->
		
		<div style="margin: auto;width: 975px;">
			
			<!-- 教师简介 -->
			<div class="teacherIntro cf">
				<img :src="heardURL + teacher.halfPic" />
	
				<div class="teacherIntroText">
					<h2 v-text="teacher.nickname">李光斗（教师名称）</h2>
					<h3 v-text="teacher.teacherAppellation">中国品牌第一人（教师称谓）</h3>
					<h4>教师简介</h4>
					<p v-text="teacher.abstract">如果你无法简洁的表达你的想法，那只说明你还不够了解它。</p>
					<div class="attention">
						<span>{{teacher.followNum}}人已关注</span><span @click="miss_onoff" id="m_onoff">关注</span>
					</div>
				</div>
			</div>
	
			<!-- 主讲课程 -->
			<div class="masterCourse">
				<h2>主讲课程</h2>
	
				<div class="masterCourseBox cf">
					
					<div class="masterCourseItem" v-for="(val,key) in courseList" @click="goMainCourse(key)">
						<img :src="heardURL + val.wimagePath"/>
						<p v-text="val.name">李光斗观察——</p>
						<p v-text="val.abstract">财经的娱乐解读，娱乐的财经观</p>
						<p>{{val.buyNum}}人购买</p>
						<p><span>￥{{price[key]}}</span><span># {{val.className}}</span></p>
						
						<b v-if="hdzb[key]">互动直播</b>
						<i v-if="vipkc[key]">VIP课程</i>
						<em v-if="wzb[key]">完整版</em>
						
					</div>
	
				</div>
				
				<!-- 我的收入明细底部分页 -->
				<div class="pagination">
				  <el-pagination
				  	@size-change="handleSizeChange"
	  				@current-change="handleCurrentChangeA"
				  	background
				    layout="prev, pager, next"
				    :pager-count="5"
				    :page-size="9" 
				    :total="this.missTotal">
				  </el-pagination>
				</div>
				
			</div>
			
		</div>
		

	</section>
</template>

<script>
	

	export default {
		data() {
			return {
				heardURL: 'http://letar.t.aiitec.org',
				masterCourseItemList: [0, 1, 2, 3, 4, 5],
				teacherId: this.$route.query.teacherId, //从其他页面跳转过来老师的id参数；
				courseList: [],
				teacher: {},
				price:[],
				courseType:[],
				missOnoff:false,
				courseId:[], //老师主讲课程id；
				missTotal:null,
				hdzb:[],
				vipkc:[],
				wzb:[],
				
				
			}
		},
		computed:{
			getisLogin() {
				return this.$store.state.isLogin

			}
			
		},
		
		created() {
			
			this.getIsLogin().then(()=>{
				
				console.log(this.$store.state.isLogin)
				//判断用户是否登录；
				if (this.$store.state.isLogin) {  //登录了；
					
					this.two_api(1);
					
				} else if(this.$store.state.isLogin == false) {  //未登录；
					
					this.two_api(2);
					
				}
				
			})

		},
		
		watch: {
			getisLogin(a, b) {
				console.log(a,"就感觉好呢")
				if(this.$store.state.isLogin) {
					
					console.log("已登陆")
					this.two_api(1);
					
				} else if(this.$store.state.isLogin == false) {
					
					console.log("未登陆")
					this.two_api(2);
					
				}

			}

		},
		
		methods: {
			async getIsLogin() {
				await this.isLogin()
			},
			isLogin() {
				var that = this
				return new Promise((resolve, reject) => {
					var timer = setInterval(get, 50)

					function get() {
						if(that.$store.state.isLogin != null) { //判断登录状态不为null；
							clearInterval(timer)
							resolve()
						}

					}

				})

			},
			two_api(web){ //设置好渲染的接口；
				var mainObj = {
					a: 7,
					web:web,
					teacherId: this.teacherId,
					li: 9
				},
				missObj = {
					web:web,
					id: this.teacherId
				};
				
				this.$Api.TeacherDetail(missObj).then( res => { //老师详情接口；
					console.log(res)
					this.teacher = res.q.teacher;
					this.teaId = res.q.teacher.id;
					
					//判断进入该页面是否已关注老师；
					if (res.q.teacher.followStatus == 1) { //已关注；
						let m_onoff = document.querySelector('#m_onoff');
						m_onoff.className = 'offMiss';
						m_onoff.innerHTML = '已关注';
					}
					
				})
				
				this.$Api.getCourseList( mainObj ).then( res => { //老师主讲课程接口；
					console.log(res)
					
					let course = res.q.course;
					this.courseList = res.q.course;
					this.missTxt = course[0].teacher;
					this.missTotal = res.q.total;
					//console.log(this.missTotal)
					
					for(let i = 0; i < course.length; i++) {
						
						this.courseId.push(course[i].courseId);
						
						var price = res.q.course[i].price;
						if (price == 0) {
							this.price.push('免费');
						}else{
							this.price.push(price);
						}
						//console.log(this.price)
						
						var courseType = res.q.course[i].courseType;
						if(parseInt(courseType) == 1) {
							this.courseType.push('免费课程');	
							
							this.hdzb.push(false); 
							this.vipkc.push(false); 

						} else if(parseInt(courseType) == 2) {
							this.courseType.push('付费专栏');
							
							this.hdzb.push(false); 
							this.vipkc.push(false); 

						} else if(parseInt(courseType) == 3) {
							this.courseType.push('互动直播');
							
							this.hdzb.push(true); 
							this.vipkc.push(false); 

						} else if(parseInt(courseType) == 4) {
							this.courseType.push('VIP课程');
							
							this.hdzb.push(false);
							this.vipkc.push(true); 
						}
						
						if (res.q.course[i].isOver == 1) { //是完整版；
							this.wzb.push(true);
						}else{ //不是完整版；
							this.wzb.push(false);
						}
						
					}
					
				})
				
			},
			//点击底部分页的饿了吗UI组件；
			handleSizeChange(val) {
				console.log(`每页 ${val}条`);
			},
			handleCurrentChangeA(val) {
				console.log(`当前页: ${val}`);
				var mainObj = {
					'a': 7,
			  		'userId':this.teacherId,
			  		'teacherId': this.teacherId,
			  		'pa':val,
			  		'li':9
			  		
			    };
				
				//还是要先清空底部分页静态渲染的数据，再来重新渲染底部分页；
				this.courseList = [];
				this.courseId = [];
				this.hdzb = [];
				this.vipkc = [];
				this.wzb = [];
				
				this.$Api.getCourseList(mainObj).then((res) =>{  //老师主讲课程分页；
					console.log(res)
					let course = res.q.course;
					this.courseList = res.q.course;
					
					for(let i = 0; i < course.length; i++) {
					
						this.courseId.push(course[i].courseId);
						
						var price = res.q.course[i].price;
						if (price == 0) {
							this.price.push('免费');
						}else{
							this.price.push(price);
						}
						//console.log(this.price)
						
						var courseType = res.q.course[i].courseType;
						if(parseInt(courseType) == 1) {
							this.courseType.push('免费课程');	
							
							this.hdzb.push(false); 
							this.vipkc.push(false); 
						} else if(parseInt(courseType) == 2) {
							this.courseType.push('付费专栏');
							
							this.hdzb.push(false); 
							this.vipkc.push(false); 
						} else if(parseInt(courseType) == 3) {
							this.courseType.push('互动直播');
							
							this.hdzb.push(true); 
							this.vipkc.push(false); 
						} else if(parseInt(courseType) == 4) {
							this.courseType.push('VIP课程');
							
							this.hdzb.push(false); 
							this.vipkc.push(true); 
						}
						
						if (res.q.course[i].isOver == 1) { //是完整版；
							this.wzb.push(true);
						}else{ //不是完整版；
							this.wzb.push(false);
						}
						
					}
					
				})
				//console.log(this.courseList)
			},
			
			goMainCourse(key){ //跳转到课程；
				
				this.$router.push({
		  			name:"ClassDetails",
		  			query:{
		  				courseId:this.courseId[key]     //点击该课程跳转带的ID参数；
		  			}
		  		});
		  		
			},
			miss_onoff(){
				var	onoffObjB = { //开；
						a:2,
						id:this.teaId,
						open:1
					},onoffObjA = {  //关；
						a:2,
						id:this.teaId,
						open:2
					},
					m_onoff = document.querySelector('#m_onoff');
				
				//console.log(onoffObj.id)
				
				if (this.missOnoff) {  //取消关注；
					m_onoff.className = '';
					m_onoff.innerHTML = '关注';
					this.missOnoff = !this.missOnoff;
					console.log('取消')
					
					this.$Api.TurnSwitch(onoffObjA).then(res=>{  //关注老师，关接口；
						console.log(res,'已关注')
					})
					
				} else{ //关注；
					m_onoff.className = 'offMiss';
					m_onoff.innerHTML = '已关注';
					this.missOnoff = !this.missOnoff;
					console.log('关注')
					
					this.$Api.TurnSwitch(onoffObjB).then(res=>{  //关注老师，开接口；
						console.log(res,'关注了')
					})
					
				}
				
			},
			
		}
	}
</script>

<style scoped lang="less">
	/*教师简介样式*/
	
	.teacherHomePage {
		background: #fff;
		padding: 30px 0px 107px;
		box-sizing: border-box;
		.teacherIntro {
			width: 974px;
			padding: 20px 0 16px 16px;
			box-sizing: border-box;
			border: 1px solid #bbb;
			margin-bottom: 30px;
			img {
				width: 170px;
				height: 220px;
			}
			.teacherIntroText {
				width: 786px;
				height: 100%;
				float: right;
				text-indent: 20px;
				h2 {
					font-size: 23px;
					color: #3ba6f8;
					padding-top: 19px;
					font-weight: normal;
				}
				h3 {
					font-size: 23px;
					padding-top: 18px;
				}
				h4 {
					font-size: 20px;
					color: #6e6e6e;
					font-weight: normal;
					padding-top: 18px;
				}
				p {
					padding: 10px 0 15px 0;
					text-indent: 50px;
					font-size: 20px;
					color: #101010;
				}
				.attention {
					height: 52px;
					text-align: right;
					span:nth-of-type(1) {
						color: #717171;
						font-size: 18px;
						margin-right: 10px;
					}
					span:nth-of-type(2) {
						width: 93px;
						height: 35px;
						background: #3babf5;
						border-radius: 15px;
						color: #f1ff00;
						text-align: center;
						line-height: 35px;
						font-size: 18px;
						display: inline-block;
						text-indent: 0;
						margin-right: 9px;
						cursor: pointer;
					}
				}
			}
		}
	}
	/*主讲课程样式*/
	
	.masterCourse {
		width: 974px;
		border: 1px solid #bbb;
		h2 {
			font-size: 24px;
			height: 79px;
			padding: 19px 0 0 16px;
			box-sizing: border-box;
		}
		.masterCourseBox {
			padding: 0 67px 0 27px;
			box-sizing: border-box;
			.masterCourseItem:nth-of-type(3n+1) {
				margin-left: 0px;
			}
			.masterCourseItem {
				width: 220px;
				height: 260px;
				float: left;
				margin-left: 109px;
				position: relative;
				cursor: pointer;
				img {
					width: 220px;
					height: 122px;
				}
				p {
					font-size: 15px;
					color: #131313;
					text-indent: 5px;
					height: 22px;
					text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
				}

				p:nth-of-type(3) {
					color: #a8a8a8;
					position: absolute;
					bottom: 47px;
					width: 100%;
				}
				p:nth-of-type(4) {
					width: 100%;
					position: absolute;
					bottom: 28px;
					left: 0;
					span:nth-of-type(1) {
						color: #3faff7;
						float: left;
					}
					span:nth-of-type(2) {
						/*float: left;*/
						/*padding-left: 100px;*/
						position: absolute;
						top: 0;
						right: 10px;
					}
				}
				
				b{
					position: absolute;
					font-size: 12px;
					color: #fff;
					top: 0;
					left: 0;
					width: 55px;
					height: 20px;
					background: #474eb8;
					text-align: center;
					line-height: 20px;
					border-radius: 0 10px 10px 0;
					font-weight: normal;
				}	
				i{
					font-size: 12px;
					color: #fff;
					position: absolute;
					top: 0;
					left: 0;
					width: 55px;
					height: 20px;
					background: #e51d20;
					text-align: center;
					line-height: 20px;
					border-radius: 0 10px 10px 0;
					font-style: normal;
				}
				em{
					font-size: 12px;
					color: #fff;
					position: absolute;
					top: 0;
					right: 10px;
					width: 20px;
					height: 70px;
					background: #e51d20;
					text-align: center;
					font-style: normal;
					line-height: 23px;
				}
				
			}
		}
	}
	
	.Interactive-live {
		position: absolute;
		left: 0;
		top: 0;
		width: 55px;
		height: 19px;
		border-radius: 0 8px 8px 0;
		background: #3e52b5;
		color: #fff;
		font-size: 10px;
		text-align: center;
		line-height: 19px;
		z-index: 10;
	}
	
	/*取消关注老师样式*/
	.offMiss{color: #fff !important;background: #888 !important;}
	
	.cf:after {
		content: "";
		display: block;
		clear: both;
	}
</style>
<style type="text/css">
/*底部分页UI组件样式*/
/*底部分页样式*/
.teacherHomePage .pagination{margin: 20px auto;text-align: center;}
/*左右按钮到底不可选时的样式*/
.teacherHomePage .pagination  .btn-active{background: #bbb !important;border: none !important;}

/*左右按钮字体大小*/
.teacherHomePage .pagination .el-pagination .btn-prev .el-icon,.pagination  .el-pagination .btn-next .el-icon{font-size: 15px;}
/*左右按钮样式*/
.teacherHomePage .pagination  .btn-prev,.pagination .btn-next{width: 80px !important;height: 40px !important;background: #fff !important;color: #000000 !important;border: 1px solid #bbb !important;box-sizing: border-box;}

/*分页数字按钮样式*/
.teacherHomePage .pagination  .number{width: 60px !important;height: 40px !important;border: 1px solid #bbb !important;line-height: 38px !important;color: #000000 !important;background: #fff !important;box-sizing: border-box;}
/*分页数字选中样式*/
.teacherHomePage .pagination  .el-pagination.is-background .el-pager li:not(.disabled).active{border: none !important;background: #3BABF5 !important;color: #fff !important;}

/*分页省略号*/
.teacherHomePage .pagination  .el-pagination.is-background .el-pager li{width: 40px;height: 40px;background: #fff;color: #000000;line-height: 38px;font-size: 15px;}	
</style>