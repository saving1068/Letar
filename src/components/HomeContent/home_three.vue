<template>
	<div>
		<div id="fourth_warp">
			<div v-if="onlineArr.length>0" >
				<p class="online_title">精选互动直播</p>
	    		<div class="online_content" >
		    		<div class="online_content_img">
		    			<el-carousel :interval="4000" ref="tab">
						    <el-carousel-item v-for="(v,i) in onlineArr"  :key="i" :name="String(tab_Num)" >
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
		    			<div class="online_content_font_item" v-for="(v,i) in onlineArr"  @mouseenter="setActiveItem(i)" @click="goToCourseDetails(v.courseId)">
		    				<div class="online_icon"><img src="../../assets/play.png"/></div>
		    				<div v-if="v.isLive==1" class="online_ing">直播中</div>
		    				<div v-else class="online_ing">{{v.liveShortTime}}</div>
		    				<!--{{v.teacher.teacherName}}——-->{{v.name}}
		    			</div>
	    				<p class="online_content_line"></p>
	    			</div>
		    	</div>
			</div>
	    	<div class="free" v-for="(v,i) in fourClassList_1">
	    		<keep-alive>
	    		<ElseItem   :item="v" :id="classId"></ElseItem>
	    		</keep-alive>
	    	</div>
    		
    	</div>
	</div>
</template>

<script>
	import ElseItem from '../ElseItem/ElseItem';
	export default{
		components: {
			ElseItem,	
	    },
	    created(){
	    	console.log(this._props.classId)//一级ID
	    	this.getSelected()
	    	this.getOneClass(this._props.classId)
	    },
		data(){
			return{
				head:this.$imgUrl,
				four_1_live:[],
				fourClassList_1:[],
				classType:["全部","VIP课程","付费专栏","免费课程","互动直播"],
				one:[],
				two:[],
				three:[],
				four:[],
				payBusinessNum:0,
				num:0,
				num_1:0,
				num_2:0,
				num_3:0,
				tab_Num:0,
				onlineArr:[]
			}
		},
		methods:{
			goToCourseDetails(id){
				console.log(id)
				this.$router.push({
					name:"ClassDetails",
					query:{courseId:id}
				})
			},
			setActiveItem(index){
				console.log(index,this.tab_Num)
				this.tab_Num = index
				this.$refs.tab.setActiveItem(this.tab_Num)
				
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
			change(i,type){
				console.log(i,type)
				if(type == 0){
					if(i||i==0){
						this.num = i
						this.getClassList(this._props.classId,this.fourClassList_1[type].id,type,i)
					}
				}else if(type == 1){
					if(i||i==0){
						this.num_1 = i
						this.getClassList(this._props.classId,this.fourClassList_1[type].id,type,i)
					}
				}else if(type == 2){
					if(i||i==0){
						this.num_2 = i
						this.getClassList(this._props.classId,this.fourClassList_1[type].id,type,i)
					}
				}else if(type == 3){
					if(i||i==0){
						this.num_3 = i
						this.getClassList(this._props.classId,this.fourClassList_1[type].id,type,i)
					}
				}
				
			},
			getOneClass(firstClass){
				this.$Api.PcCouseList({a:0,firstClass,li:6}).then((res)=>{
					console.log(res,"编程")
					this.four_1_live = res.q.course;
					this.fourClassList_1 = res.q.categorys
					
					
				})
			},
			
		},
		props: {
    		classId: Number,  //定义传值的类型<br>    }
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
	
	/*.free{margin: 0 auto;width: 1240px;}*/
	.free_top{position: relative;text-align: center;}
	.free_top>p{color: #101010;font-size: 30px;line-height: 80px;}
	.free_top_line{width: 150px;height: 2px;background:#585858;position: absolute;top: 70px;left: 45%;}
	.free_more{display: flex;font-size: 18px;position: absolute;top: 34px;right: 0;}
	.free_more_img{width: 9px;height: 16px;background: #FA8072;margin-top: 5px;}
	.free_line{width: 100%;height: 5px;background: #808080;margin-top: 10px;}
	.free_first{overflow: hidden;}
	.free_first_item{font-size: 14px;float: left;}
	.free_first_item_img{width: 220px;height: 123px;background: salmon;}
	.free_first_item_bottom{padding: 18px 0;display: flex;justify-content: space-between;}
	.free_first_item_bottom_left{color: #3BABF5;}
	
	.master_content{display: flex;align-content: space-between;flex-wrap: wrap;justify-content: space-around;min-height: 720px;padding-top: 30px;width: 1200px;margin: 0 auto;}
	.master_item{width: 510px;overflow: hidden;position: relative;}
	.master_item_img{width: 170px;height: 220px;background: salmon;float: left;}
	.master_item_font{float: left;padding: 21px 0 0 21px;font-size: 22px;color: #101010;}
	.master_follow{font-size: 20px;color: #707070;}
	.master_name,.master_honor{line-height: 40px;}
	.master_follow_btn{width: 94px;height: 36px;background:#3BABF5;border-radius: 18px;text-align: center;line-height: 36px;color: #FAFF00;position: absolute;bottom: 0;right: 0;font-size: 18px;}
	
	/*VIP课程*/
	.vipClass_content{width: 95%;margin: 0 auto;}
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