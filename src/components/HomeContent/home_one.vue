<template>
	<div>
		<div class="first_warp">
			<div v-if="onlineArr.length>0">
				<p class="online_title">精选互动直播</p>
	    		<div class="online_content" >
		    		<div class="online_content_img">
		    			<el-carousel :interval="4000" ref="tab">
						    <el-carousel-item v-for="(v,i) in onlineArr"  :key="i" :name="String(tab_Num)">
						    <img :src="head+v.wimagePath" @click="goToCourseDetails(v.courseId)"/>
						    <div class="sign">
			    				<!--<p>{{v.teacher.teacherName}}——</p>-->
			    				<p>{{v.name}}</p>
			    			</div>
			    			<div class="sign_btn" @click="goToCourseDetails(v.courseId)">
			    				立即报名
			    			</div>
						    </el-carousel-item>
						 </el-carousel>
		    			
		    		</div>
			    	<div class="online_content_font">
		    			<div class="online_content_font_item" v-for="(v,i) in onlineArr" @click="goToCourseDetails(v.courseId)"  @mouseenter="setActiveItem(i)">
		    				<div class="online_icon"><img src="../../assets/play.png"/></div>
		    				<div class="online_ing" v-if="v.isLive==1">直播中</div>
		    				<div class="online_ing" v-else>{{v.liveShortTime}}</div>
		    				<!--{{v.teacher.teacherName}}——-->{{v.name}}
		    			</div>
	    				<p class="online_content_line"></p>
	    			</div>
		    	</div>
			</div>
	    	<div class="free">
	    		<div class="free_top">
	    			<div class="free_top_p">
	    				<p>免费体验专区</p>
	    				<div class="free_top_line"></div>
	    			</div>
	    			<div class="free_more">
	    				<div class="free_more_font" @click="goToSeekPage(1)">更多</div>
	    				<div class="free_more_img">
	    					<img src="../../assets/icon_tittlebar_disabled.png"/>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="free_line"></div>
	    		<div class="free_content">
	    			<el-tabs v-model="free" @tab-click="freeChange">
	    				<el-tab-pane label="课程" disabled name="not" ></el-tab-pane>
					    <el-tab-pane label="不限" name="123">
					    	<vcontent :message="freeArr"></vcontent>
					    </el-tab-pane>
					    <el-tab-pane v-for="(v,i) in freeCategorys" :label="v.name" :name="v.name" :key="i">
					    	<vcontent :message="freeArr"></vcontent>
					    </el-tab-pane>
					 </el-tabs>
	    			
	    		</div>
	    	</div>
    		<div class="free">
	    		<div class="free_top">
	    			<div class="free_top_p">
	    				<p>VIP精品推荐</p>
	    				<div class="free_top_line"></div>
	    			</div>
	    			<div class="free_more">
	    				<div class="free_more_font" @click="goToSeekPage(4)">更多</div>
	    				<div class="free_more_img">
	    					<img src="../../assets/icon_tittlebar_disabled.png"/>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="free_line"></div>
	    		<div class="free_content">
	    			<el-tabs v-model="vip" @tab-click="vipChange">
	    				<el-tab-pane label="课程" disabled name="not"></el-tab-pane>
	    				<el-tab-pane label="不限" name="first">
					    	<vcontent :message="vipArr"></vcontent>
					    </el-tab-pane>
					    <el-tab-pane v-for="(v,i) in VipCategorys" :label="v.name" :name="v.name" :key="i">
					    	<vcontent :message="vipArr"></vcontent>
					    </el-tab-pane>
					 </el-tabs>
	    		</div>
	    	</div>
    		<div class="free">
	    		<div class="free_top">
	    			<div class="free_top_p">
	    				<p>订阅付费专栏</p>
	    				<div class="free_top_line"></div>
	    			</div>
	    			<div class="free_more">
	    				<div class="free_more_font" @click="goToSeekPage(2)">更多</div>
	    				<div class="free_more_img">
	    					<img src="../../assets/icon_tittlebar_disabled.png"/>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="free_line"></div>
	    		<div class="free_content">
	    			<el-tabs v-model="pay" @tab-click="payChange">
	    				<el-tab-pane label="课程" disabled name="not"></el-tab-pane>
					    <el-tab-pane label="不限" name="first">
					    	<vcontent :message="payArr"></vcontent>
					    </el-tab-pane>
					    <el-tab-pane v-for="(v,i) in payCategorys" :label="v.name" :name="v.name" :key="i">
					    	<vcontent :message="payArr"></vcontent>
					    </el-tab-pane>
					 </el-tabs>
					 
	    		</div>
	    	</div>
    		<div class="master">
    			<div class="free_top">
    				<div class="free_top_p">
	    				<p>大师专题</p>
	    				<div class="free_top_line"></div>
	    			</div>
	    			<div class="free_more" @click="goToTeachList">
	    				<div class="free_more_font">更多</div>
	    				<div class="free_more_img">
	    					<img src="../../assets/icon_tittlebar_disabled.png"/>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="free_line"></div>
	    		<div class="master_content">
	    			<div class="master_item" v-for="(v,i) in masterArr">
	    				<div class="master_item_img" @click="goToTeache(v.id)">
	    					<img :src="head+v.halfPic"/>
	    				</div>
	    				<div class="master_item_font">
	    					<p class="master_name">{{v.nickname}}</p>
	    					<p class="master_honor">{{v.teacherAppellation}}</p>
	    					<p class="master_follow">{{v.followNum}}人已关注</p>
	    				</div>
	    				<div v-if="v.followStatus == 2" class="master_follow_btn" @click="floow(v)">
	    					关注
	    				</div>
	    				<div  v-else class="master_follow_btn" @click="floow(v)" style="background: #7A7878;color: #FFFFFF;">
	    					已关注
	    				</div>
	    			</div>
	    		</div>
    		</div>
    	</div>
		<LDialog v-show="showDialog" @closeDialog='closeDia()' @update="update"></LDialog>
	</div>
</template>

<script>
	 import vcontent from '../contentList/contentList';
	export default {
		created(){
//			this.getSelected()//精选推送_互动直播
//			this.getFreeClass()//精选推送_免费
//			this.getVipClass()//精选推送_VIP
//			this.getPayClass()//精选推送_付费
//			this.getTeacherList()//老师
			
		},
		mounted(){
			this.getSelected()//精选推送_互动直播
			this.getFreeClass()//精选推送_免费
			this.getVipClass()//精选推送_VIP
			this.getPayClass()//精选推送_付费
			this.getTeacherList()//老师
		},
		components: {
			vcontent,	
	    },
		data(){
			return{
				head:this.$imgUrl,
				onlineArr:[],//互动直播
				free:"123",
				freeArr:[],//免费课程
				freeCategorys:[],//免费-二级课程列表
				vip:"first",
				vipArr:[],//Vip课程
				VipCategorys:[],//Vip-二级课程列表
				pay:"first",
				payArr:[],//精选推送_付费课程
				payCategorys:[],//精选推送_付费二级课程列表
				masterArr:[],
				tab_Num:0,
				showDialog:false,
			}
		},
		computed:{
			getIsLogin(){
				return this.$store.state.isLogin
				
			}
			
		},
		watch:{
			getIsLogin(a,b){
				this.getTeacherList()
				
				
			}
			
			
			
		},
		
		
		methods:{
			goToTeachList(){
				console.log(this.$router)
				this.$router.push({
					name: "TeachList",
				})
			},
			closeDia(){
				
				this.showDialog=false
			},
			update(){
				console.log("update")
				this.getTeacherList()
				
			},
			goToTeache(id){
				this.$router.push({
					name: "TeacherHomePage",
					query:{
						teacherId:id,
					}
				})
			},
			goToSeekPage(a){
				this.$router.push({
					name: "SeekPage",
					query:{
						a,
					}
				})
			},
			setActiveItem(index){
//				console.log(index)
				this.tab_Num = index
				this.$refs.tab.setActiveItem(this.tab_Num)
				
			},
			floow(item){
				if(this.$store.state.isLogin){
					if(item.followStatus == 1){
						this.$Api.TurnSwitch({a:2,id:item.id,open:2}).then((res)=>{
							console.log(res)
							if(res.q.s == 0){
								this.getTeacherList()//老师
							}
							
						})
					}else{
						this.$Api.TurnSwitch({a:2,id:item.id,open:1}).then((res)=>{
							console.log(res)
							if(res.q.s == 0){
								this.getTeacherList()//老师
							}
						})
					}
				}else{
					this.showDialog = true
				}
				
				
			},
			goToCourseDetails(id){
				console.log(id)
				this.$router.push({
					name:"ClassDetails",
					query:{courseId:id}
				})
			},
			getSelected(){//精选推送_互动直播
				if(this.$store.state.isLogin){
					var obj = {
						a:3,
						type:1
					}
				}else{
					var obj = {
						a:3,
						web:2,
						type:1
					}
				}
				
				this.$Api.getCourseList(obj).then((res)=>{
//					console.log(res,"精选推送")
                    if(res.q.course.length>6){
                    	this.onlineArr = res.q.course.splice(0,6)
                    }else{
                    	this.onlineArr = res.q.course
                    }
					
//					console.log(this.onlineArr,"精选推送")
				})
			},
			getFreeClass(){//精选推送_免费课程
				if(this.$store.state.isLogin){
					var obj ={
						a:1,
					}
				}else{
					var obj ={
						a:1,
						web:2
					}
				}
				this.$Api.getCourseList(obj).then((res)=>{
//					console.log(res,"免费课程")
					this.freeArr = res.q.course
					this.freeCategorys = res.q.categorys
				})
			},
			getVipClass(){//精选推送_VIP课程
				if(this.$store.state.isLogin){
					var obj ={
						a:4,
					}
				}else{
					var obj ={
						a:4,
						web:2
					}
				}
				this.$Api.getCourseList(obj).then((res)=>{
//					console.log(res,"VIP课程")
					this.vipArr = res.q.course
					this.VipCategorys = res.q.categorys
				})
			},
			getPayClass(){//精选推送_付费课程
				if(this.$store.state.isLogin){
					var obj ={
						a:2,
					}
				}else{
					var obj ={
						a:2,
						web:2
					}
				}
				this.$Api.getCourseList(obj).then((res)=>{
//					console.log(res,"付费课程")
					this.payArr = res.q.course
					this.payCategorys = res.q.categorys
				})
			},
			getTeacherList(){
				if(this.$store.state.isLogin){
					var obj = {
						a:1,
					}
				}else{
					var obj = {
						a:1,
						web:2
					}
				}
				this.$Api.getTeacherList(obj).then((res)=>{
					if(res.q.teachers.length>6){
						this.masterArr = res.q.teachers.slice(0,6)
					}else{
						this.masterArr = res.q.teachers
					}
				})
			},			
			getFreeChangClass(a,id){
				this.$Api.getCourseList({a,firstClass:id}).then((res)=>{
//					console.log(res,"免费课程")
					if(a == 1){
						this.freeArr = res.q.course
					}else if (a == 4){
						this.vipArr = res.q.course
					}else if(a == 2){
						this.payArr = res.q.course
					}
					
				})
			},
			freeChange(tab,event){
				if(tab.index == 1){
					this.getFreeChangClass(1,0)
				}else{
					this.getFreeChangClass(1,this.freeCategorys[tab.index-2].id)
				}
			},
			vipChange(tab,event){
				console.log(tab.index)
				if(tab.index == 1){		
					this.getFreeChangClass(4,0)
				}else{
	
					this.getFreeChangClass(4,this.VipCategorys[tab.index-2].id)
				}
			},
			payChange(tab,event){
				if(tab.index == 1){		
					this.getFreeChangClass(2,0)
				}else{
					this.getFreeChangClass(2,this.payCategorys[tab.index-2].id)
				}
			},
		}
	}
</script>

<style scoped="scoped">
	img{width: 100%;height: 100%;}
	li{list-style: none;}
	.first_warp,.online_warp,#second_warp,#third_warp,#fourth_warp{padding-bottom: 50px;}
	.online_title{text-align: center;}
	.tab_bar{width: 100%;border-bottom: #9c9c9c solid 1px;padding-bottom: 160px;}
	.online_content{padding: 20px 0px 30px;overflow: hidden;display: flex;width: 1300px;margin: 0 auto;}
	.online_content_img{width: 50%;height: 300px;background: salmon;position: relative;}
	.sign{position: absolute;top: 95px;left: 100px;z-index: 99;}
	.sign p{color: #FFFFFF;font-size: 23px;}
	.sign_btn{z-index:99;position: absolute;font-size: 16px;color: #FFFFFF;background: #3BA6F8;top: 167px;left: 240px;width: 120px;height: 46px;text-align: center;line-height: 46px;}
	.sign_btn:hover{cursor: pointer;}
	.online_content_font{width:50%;height: 300px;background: #F1F1F1;position: relative;padding: 10px 0;box-sizing: border-box;}
	.online_content_font_item{padding:10px 30px;font-size: 18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.online_content_font_item:hover{background: #ffffff;cursor: pointer;}
	.online_icon{width: 23px;height: 23px;float: left;border-radius: 50%;background: #FFFFFF;position: absolute;z-index: 12;}
	.online_ing{float: left;padding: 0 20px 0 40px;color: #3BABF5;}
	.online_content_line{height: 300px;border: #808080 dotted 1.5px;position: absolute;top: 0;left: 40px;}
	
	
	.free_top{position: relative;text-align: center;}
	.free_top_p{color: #101010;font-size: 30px;height: 80px;}
	.free_top_p>p{line-height: 70px;}
	.free_top_line{width: 150px;height: 2px;background:#585858;margin: 0 auto;}
	.free_more{display: flex;font-size: 18px;position: absolute;top: 34px;right: 0;cursor: pointer;}
	.free_more_img{width: 9px;height: 16px;margin-top: 5px;}
	.free_more_img img{vertical-align: top;}
	.free_line{width: 100%;height: 5px;background: #808080;margin-top: 10px;}
	.free_first{overflow: hidden;}
	.free_first_item{font-size: 14px;float: left;}
	.free_first_item_img{width: 220px;height: 123px;background: salmon;}
	.free_first_item_bottom{padding: 18px 0;display: flex;justify-content: space-between;}
	.free_first_item_bottom_left{color: #3BABF5;}
	
	.master_content{display: flex;align-content: space-between;flex-wrap: wrap;justify-content: space-around;min-height: 720px;padding-top: 30px;width: 1200px;margin: 0 auto;}
	.master_item{width: 510px;overflow: hidden;position: relative;}
	.master_item_img{width: 170px;height: 220px;background: salmon;float: left;cursor: pointer;}
	.master_item_font{float: left;padding: 21px 0 0 21px;font-size: 22px;color: #101010;}
	.master_follow{font-size: 20px;color: #707070;}
	.master_name,.master_honor{line-height: 40px;}
	.master_follow_btn{width: 94px;height: 36px;background:#3BABF5;border-radius: 18px;text-align: center;line-height: 36px;color: #FAFF00;position: absolute;bottom: 0;right: 0;font-size: 18px;}
	.master_follow_btn:hover{cursor: pointer;}
	
	/*VIP课程*/
	.vipClass_content_tab{padding:20px 0;overflow: hidden;font-size: 20px;color: #808080;}
	.vipClass_content_tab_title{float: left;height: 70px;width: 145px;}
	.vipClass_content_tab_warp,.education_content_tab_warp{width:1035px;float: left;overflow: hidden;}
	.vipClass_content_tab_item,.education_content_tab_item{padding-right: 90px;float: left;padding-bottom: 20px;}
	.vipClass_content_tab_item:hover{cursor: pointer;color: #3BABF5;}
	
	.active{color: #3BABF5;}
	.border_line{background: #BBBBBB;height: 2px;width: 100%;float: left;}
	
	.education_content_tab{padding-top:20px;float: left;}
	.education_content_tab_title{height: 70px;width: 145px;float: left;}
	.education_content_tab_item:hover{cursor: pointer;color: #3BABF5;}
	
</style>
<style type="text/css">
	.free_content .el-tabs__nav-scroll{width: 1300px;margin: 0 auto;}
	.tab_bar .el-tabs__item{font-size: 26px !important;height: 80px;line-height: 80px;border: #FFFFFF !important;}
	/*.tab_bar .el-tabs__nav{padding: 0 490px;}*/
	/*.tab_bar .el-tabs__active-bar{left: 490px !important;}*/
	.tab_bar .el-tab-pane{font-size: 30px;color: #101010;}
	.free_content .el-tabs__nav{padding: 0;}
	.free_content .el-tabs__active-bar{display: none;}
	
	
	#second_warp .el-tabs__item,#third_warp .el-tabs__item,#fourth_warp .el-tabs__item{font-size: 20px !important;height: 80px;line-height: 80px;border: #FFFFFF !important;}
	#second_warp .el-tabs__nav,#third_warp .el-tabs__nav,#fourth_warp .el-tabs__nav{padding: 0}
	#second_warp .el-tabs__active-bar,#third_warp .el-tabs__active-bar,#fourth_warp .el-tabs__nav{left: 490px !important;}
	#second_warp .el-tab-pane,#third_warp .el-tab-pane,#fourth_warp .el-tabs__nav{font-size: 30px;color: #101010;}
	.vipClass_content .el-tabs__nav{padding: 0;}
	.vipClass_content .el-tabs__active-bar{display: none;}
	
	

</style>