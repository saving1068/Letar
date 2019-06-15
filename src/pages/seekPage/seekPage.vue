<template>
	<section class="seekPage cf">
		<!-- 搜索页面 -->
	
	<div class="bigL cf" style="float: left;width: 927px;">
		<div class="seekPageLeft">
			<h2>全部课程<i class="fa fa-angle-right"></i></h2>
			<div class="curriculumNav cf">
				<div class="curriculumNavLeft">
					全部课程
				</div>
				
				<!-- 全部课程导航 -->
				<ul class="curriculumNavRight">
					<li v-for="(item,index) in nav" @click="nav_click(index,item.id,item.name)">{{item.name}}</li>
				</ul>
			</div>
		</div>
		
		
		<div class="seekCen">	
			<!-- 选择课程类型导航 -->
			<div class="curriculumTabNav">
				<ul class="curriculumTabNavA cf" id="navA">
					<li v-for="(item,index) in navA"  @click="navA_click(index,item.a)" v-bind:class="item.a == a? 'active_tab':''" >{{item.name}}</li>
				</ul>
				

				<ul class="curriculumTabNavA cf curriculumTabNavB">
					<li class="curriculumNavB-Style">综合排序</li>
					<li>价格
						<i class="fa fa-sort-up" v-bind:class="{active:priceSort}" @click="getPriceSort"></i>
						<i class="fa fa-sort-down" v-bind:class="{active:!priceSort}" @click="getPriceSort"></i>
					</li>
				</ul>
				
				<!-- 课程类型内容 -->
				<div class="curriculumTabNavBContent cf">
					<div class="curriculumTabNavBItem" v-for="(val,key) in curriculumTabNavBItemList" @click="goToDetile(val.courseId)">
 						<p class="free_first_item_img">
							<img :src="head+val.wimagePath" />
							<p class="free_first_item_img_type" v-if="val.isOver == 1">完整版</p>
							<p class="free_first_item_type" v-if="val.courseType == 4">VIP课程</p>
							<p class="free_first_item_type" style="background: #3e50b4;" v-if="val.courseType == 3">互动直播</p>
						</p>
						<!--<p class="free_first_item_teacher">{{val.teacher.teacherName}}</p>-->
						<p class="free_first_item_name">{{val.name}}</p>
						<div v-if="val.courseType !=4">
							{{val.teacher.nickname}}丨{{val.teacher.teacherAppellation}}
						</div>	
						<p class="buyNum" v-if="val.courseType == 1">{{val.buyNum}}人最近报名</p>
						<p class="buyNum" v-if="val.courseType == 3">{{val.buyNum}}人购买</p>
						<p class="buyNum" v-if="val.courseType == 2">{{val.buyNum}}人订阅</p>
						<p class="buyNum" v-if="val.courseType == 4">{{val.buyNum}}人在学</p>
						<div class="free_first_item_bottom">
							<p class="free_first_item_bottom_left" v-if="val.courseType == 1">免费</p>
							<p class="free_first_item_bottom_left" v-if="val.courseType == 4">仅限VIP</p>
							<p class="free_first_item_bottom_left" v-if="val.courseType == 3||val.courseType == 2&&val.isOver != 1">￥{{val.price}}</p>
							<p class="free_first_item_bottom_left" v-if="val.isOver == 1&&val.courseType == 2">￥{{val.price}}/永久</p>
							<p class="free_first_item_bottom_right"># {{val.className}}</p>
						</div>
 					</div>
 					<div class="not_class" v-if="curriculumTabNavBItemList.length == 0">
	 						没有当前课程
	 				</div>
				</div>
				
				<!-- 底部分页 -->
				<div class="block pagination">
				  <el-pagination
				  	background
				    layout="prev, pager, next"
				    :pager-count="5"
				    :total="this.total"
				    @prev-click="prev"
				    @next-click="next"
				    :page-size="24"
				    @current-change="current_change"
				    current-page="1"
				    >
				  </el-pagination>

				</div>
				
			</div>
		</div>
		
	</div>
	
	<div class="bigR cf" style="float: left;">
		<div class="seekPageRight">
			<div class="hot">
				<h2>热门推荐</h2>
				<div class="hotItem" v-for="(val,key) in hotItemList" @click="goToDetile(val.courseId)">
					<p class="free_first_item_img">
						<img :src="head+val.wimagePath" />
						<p class="free_first_item_img_type" v-if="val.isOver == 1">完整版</p>
						<p class="free_first_item_type" v-if="val.courseType == 4">VIP课程</p>
						<p class="free_first_item_type" style="background: #3e50b4;" v-if="val.courseType == 3">互动直播</p>
					</p>
					<!--<p class="free_first_item_teacher">{{val.teacher.teacherName}}</p>-->
					<p class="free_first_item_name">{{val.name}}</p>
					<div v-if="val.courseType !=4">
							{{val.teacher.nickname}}丨{{val.teacher.teacherAppellation}}
						</div>
					<p class="buyNum" v-if="val.courseType == 1">{{val.buyNum}}人最近报名</p>
					<p class="buyNum" v-if="val.courseType == 3">{{val.buyNum}}人购买</p>
					<p class="buyNum" v-if="val.courseType == 2">{{val.buyNum}}人订阅</p>
					<p class="buyNum" v-if="val.courseType == 4">{{val.buyNum}}人在学</p>
					<div class="free_first_item_bottom">
						<p class="free_first_item_bottom_left" v-if="val.courseType == 1">免费</p>
						<p class="free_first_item_bottom_left" v-if="val.courseType == 4">仅限VIP</p>
						<p class="free_first_item_bottom_left" v-if="val.courseType == 3&&val.isOver != 1||val.courseType == 2&&val.isOver != 1">￥{{val.price}}</p>
						<p class="free_first_item_bottom_left" v-if="val.isOver == 1&&val.courseType == 2">￥{{val.price}}/永久</p>
						<p class="free_first_item_bottom_right"># {{val.className}}</p>
					</div>
				</div>
				
			</div>
		</div>
	
	</div>
	</section>
</template>

<script>


export default {
	data() {
    return {
  		openId:'',
  		nav:[{name:"全部",id:0}],
  		navA:[{name:"全部",a:0},{name:"VIP课程",a:4},{name:"付费专栏",a:2},{name:"免费课程",a:1},{name:"互动直播",a:3}],
  		hotItemList:[0,1,2,3,4,5],
  		curriculumTabNavBItemList:[0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5],
  		head:this.$imgUrl,
  		oneClassId:0,
  		classType:0,
  		ifNav:true,
  		total:0,
  		priceSort:true,
  		classPage:1,
  		a:0,
    }
  },
	
  created(){
  		window.scroll(0,0)
		this.getHotList(0,1)
		if(this.$route.query.a){
			this.a = this.$route.query.a
		}else{
			this.a = 0
		}
		this.getCouseList(this.a,2,0,24)
  },
  mounted(){
  	
  },
  computed:{
  	getQuery(){
  		return this.$route.query
  		
  	}
  },
  watch:{
  	classType:(val)=>{
  		console.log(val)
  	},
  	getQuery(a,b){
  		console.log(a)
  		
  		
  	}
  },
  methods:{
  	current_change(val){
  		console.log(val)
  		this.ifNav = false;
  		this.classPage = val
  		this.getCouseList(this.classType,2,this.oneClassId,24,1,val)
  	},
  	next(){
  		this.ifNav = false;
  		this.classPage++
  		this.getCouseList(this.classType,2,this.oneClassId,24,1,this.classPage)
  	},
  	prev(){
  		this.ifNav = false;
  		this.classPage--
  		if(this.classPage <=1){
  			this.classPage = 1
  		}
  		this.getCouseList(this.classType,2,this.oneClassId,24,1,this.classPage)
  	},
  	getPriceSort(){
  		this.priceSort = !this.priceSort
  		this.ifNav = false;
  		if(this.priceSort){
  			this.getCouseList(this.classType,2,this.oneClassId,24,1)
  		}else{
  			this.getCouseList(this.classType,2,this.oneClassId,24,2)
  		}
  	},
  	goToDetile(courseId){
  		console.log(courseId)
		this.$router.push({
			name:'ClassDetails',
			query:{courseId}
		})
  	},
  	getHotList(a,type,li){
  		if(this.$store.state.isLogin){
  			var obj = {
	  			a,
	  			type,
	  			li:6
	  		}
  		}else{
  			var obj = {
	  			a,
	  			type,
	  			li:6,
	  			web:2
	  		}
  		}
  		this.$Api.getCourseList(obj).then((res)=>{
  			this.hotItemList = res.q.course
  		})
  	},
  	getCouseList(a,web,firstClass,li,priceSort,pa){//tab的内容
  		var obj = {
  			a,
  			web,
  			priceSort,
  			firstClass,
  			pa,
  			li
  		}
  		this.$Api.getCourseList(obj).then((res)=>{
  			if(this.ifNav){
  				for(var i=0;i<res.q.categorys.length;i++){
	  				this.nav.push(res.q.categorys[i])
	  			}
  			}
  			this.curriculumTabNavBItemList = res.q.course
  			this.total = res.q.total
  			console.log(this.nav)
  		})
  	},
  	nav_click(index,id,name){
  		this.ifNav = false;
  		this.classPage = 1
  		this.priceSort = true
  		console.log(index,id)
  		let nav = document.querySelector('.curriculumNavRight'),
  			nav_lis = nav.querySelectorAll('li');
  		
  		for (let i=nav_lis.length-1;i>=0;i--) {
  			nav_lis[i].style.color = '#000';
  		}
  		this.oneClassId=id
  		this.getCouseList(this.classType,2,id,24)
			nav_lis[index].style.color = '#3babf5';
		this.$router.push({
			name: "SeekPageTwo",
			query:{
				firstClass:id,
				firstName:name,
			}
		})
  		
  	},
  	navA_click(index,a){
  		this.ifNav = false;
  		this.classPage = 1
  		this.priceSort = true
  		console.log(index,a)
  		this.classType = a
  		this.a = a
  		this.$router.push({
  			name:"SeekPage",
  			query:{
  				a
  			}
  		})
//		if(this.classType !=null){}
//		let navA = document.querySelector('#navA'),
//			navA_lis = navA.querySelectorAll('li');
//		for (let i=navA_lis.length-1;i>=0;i--) {
//			navA_lis[i].style.color = '#000';
//			navA_lis[i].style.background = '#f2f2f2';
//		}
//		
//		navA_lis[index].style.color = '#fff';
//		navA_lis[index].style.background = '#3babf5';
		this.getCouseList(a,2,this.oneClassId,24)
  		
  	},	
  	
  	
  }
}
</script>

<style scoped lang="less">
.active_tab{color:#FFFFFF !important;background: #3babf5;}
li{list-style: none;}
.not_class{font-size: 30px;font-weight: 700;text-align: center;padding-top: 20px;}
.buyNum{height: 20px;color: #7A7878;}
  	.free_first_item {
		font-size: 14px;
		width: 220px;
		float: left;
		margin: 10px 10px;
		height: 200px;
		position: relative;
	}
  .free_first_item_teacher,
	.free_first_item_name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 25px;
	}
	
	.free_first_item_img{
		width: 220px;
		height: 123px;
		background: salmon;
		
	}
	.free_first_item_img_type{
		position: absolute;
		width: 22px;
		height: 70px;top: 0;
		right: 10px;
		background: #E51C23;
		font-size: 12px;
		text-align: center;
		color: #FFFFFF;line-height: 22px;
	}
	.free_first_item_type{
		position: absolute;
		width: 70px;
		left: 0;
		top: 0;
		color: #FFFFFF;
		font-size: 12px;
		padding-left: 15px;
		line-height: 20px;
		background: #E51C23;
		border-bottom-right-radius:10px;
		border-top-right-radius:10px;
	}
	.free_first_item_bottom {
		padding: 18px 0;
		display: flex;
		justify-content: space-between;
	}
	
	.free_first_item_bottom_left {
		color: #3BABF5;
	}

/*搜索页面样式*/
.seekPage{
	/*padding-bottom: 200px;*/
	width: 1280px;
	margin: 0 auto;
	padding-left: 50px;
	background: #fff;
	.seekPageLeft{
		width: 927px;
		/*height: 2070px;*/
		float: left;
		h2{
			font-size: 20px;
			padding-bottom: 35px;
			i{color: #000;font-size: 30px;margin-left: 10px;vertical-align: bottom;}
		}
		
		.curriculumNav{
			border-top: 1px solid #7a7878;
			border-bottom: 1px solid #7a7878;
			padding-top: 30px;
			box-sizing: border-box;
			position: relative;
			.curriculumNavLeft{
				width: 110px;
				height: 100%;
				float: left;
				font-size: 20px;
				color: #7a7878;
			}
			.curriculumNavRight{
				width: 817px;
				height: 100%;
				float: left;
				font-size: 20px;
				color: #101010;
				padding: 0 20px;
				box-sizing: border-box;
				li:nth-of-type(1){color: #3babf5;}
				li{
					float: left;
					margin-left: 20px;
					margin-bottom: 20px;
					text-align: center;
					cursor: pointer;
				}
			}	
		}
		
	}
	
	.seekCen{
		width: 927px;
		float: left;
		/*position: relative;*/
		
		.curriculumTabNav{
			width: 100%;
			/*height: 135px;*/
			padding: 30px 0 0 0;
			/*position: absolute;
			top: 128px;
			left: 0;*/
			.curriculumTabNavA{
				height: 68px;
				background: #f2f2f2;
				padding: 19px 0 0 15px;
				box-sizing: border-box;
				/*li:nth-of-type(1){color: #fff;background: #3babf5;}*/
				li{
					float: left;
					width: 80px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					color: #000;
					font-size: 15px;
					cursor: pointer;
				}
			}
			.curriculumTabNavB{
				height: 66px;
				border: 1px solid #e6e6e6;
				background: #fff;
				li{
					position:relative;
					i{
						position: absolute;
						top: 5px;
						right: 5px;
						font-size: 25px;
						color: #b1b1b1;
					}
				}
			}
			.curriculumTabNavBContent{
				width: 100%;
				/*padding-bottom: 50px;*/
				.curriculumTabNavBItem:nth-of-type(4n+1){
					margin-left: 0px;
				}
				.curriculumTabNavBItem{
					font-size: 16px;
					width: 220px;
					float: left;
					margin-left: 15px;
					position: relative;
					img{
						width: 100%;
						height: 100%;
						cursor: pointer;
					}
				}
			}
		}
		
	}
	
	
	
	.seekPageRight{
		width: 270px;
		/*height: 2070px;*/
		float: left;
		.hot{
			width: 240px;
			background: #f2f2f2;
			margin-left: 30px;
			padding: 20px 10px 0 10px;
			box-sizing: border-box;
			h2{
				font-size: 20px;
				padding-bottom: 19px;
				font-weight: normal;
				border-bottom: 1px solid #808080;
			}
			.hotItem:nth-of-type(1){margin-top: 9px;}
			.hotItem{
				width: 100%;
				height: 260px;
				padding-bottom: 21px;
				box-sizing: border-box;
				position: relative;
				img{
					width: 100%;
					height: 100%;
					cursor: pointer;
				}
			}
		}
	}
	/*底部分页样式*/
	.pagination{
		/*margin: 70px auto;*/
		padding: 50px 0;
		text-align: center;
	}
}



/*全部课程导航选中样式*/
.curriculumNavSel{color: #3babf5;}

/*首先选中的样式*/
/*.curriculumNavA-Style{color: #fff !important;background: #3babf5;}*/
.curriculumNavB-Style{color: #FFFFFF !important;background: #3babf5 !important;}
.active{color: #6d6d6d !important;}

.cf:after{
	content: '';
	display: block;
	clear: both;
}

</style>

<style type="text/css">
	.pagination>.btn-prev{background: #bbb !important;min-width: 80px !important;height: 40px !important;color: #000000 !important;}
	.pagination>.btn-next{background: #fff !important;min-width: 80px !important;height: 40px !important;color: #000000 !important;border: 1px solid #bbb !important;box-sizing: border-box !important;}
	.pagination>.number{background: #fff;min-width: 60px !important;height: 40px !important;color: #000000;border: 1px solid #bbb !important;box-sizing: border-box !important;line-height: 40px !important;}
	.pagination>.number .active{background: #3babf5 !important;color: #000000 !important;}
	.pagination>.btn-quickprev,.btn-quicknext{line-height: 40px !important;}
	.pagination>.el-pager li{color: #000000;min-width: 60px !important;height: 40px !important;}
	.pagination>.el-pagination .btn-next .el-icon,.pagination> .el-pagination .btn-prev .el-icon{font-size: 15px !important;}
</style>