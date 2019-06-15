<template>
	<div>
		<div class="free_top">
			<p>{{item.name}}</p>
			<!--<div class="free_top_line"></div>-->
			<div class="free_more">
				<div class="free_more_font" @click="goToSeekPage">更多</div>
				<div class="free_more_img">
					<img src="../../assets/icon_tittlebar_disabled.png"/>
				</div>
			</div>
		</div>
		<div class="free_line"></div>
		<div class="vipClass_content">
			<div class="vipClass_content_tab">
				<div style="width: 1280px;margin: 0 auto;">
					<p class="vipClass_content_tab_title">全部课程</p>
					<ul class="vipClass_content_tab_warp">
						<li class="vipClass_content_tab_item" :class="{'active':activeInde == i}" @click="change(i,0)" v-for="(v,i) in item.course_category">{{v.name}}</li>
					</ul>
				</div>
				<div class="border_line"></div>
				<div class="education_content_tab">
					<div style="width: 1280px;margin: 0 auto;">
						<p class="education_content_tab_title">课程类型</p>
						<ul class="education_content_tab_warp">
							<li class="education_content_tab_item" :class="{'active':payBusinessNum == i}" @click="changeType(i)" v-for="(v,i) in classType">{{v}}</li>
						</ul>
					</div>
				</div>
			</div>

		</div>

		<div class="free_first">
			<li class="free_first_item" v-for="(v,i) in message" @click="goToCourseDetails(v.courseId)">
				<p class="free_first_item_img">
					<img :src="head+v.wimagePath" />
					<p class="free_first_item_img_type" v-if="v.isOver == 1">完整版</p>
					<p class="free_first_item_type" v-if="v.courseType == 4">VIP课程</p>
					<p class="free_first_item_type" style="background: #3e50b4;" v-if="v.courseType == 3">互动直播</p>
				</p>
				<!--<p class="free_first_item_teacher">{{v.teacher.teacherName}}</p>-->
				<p class="free_first_item_name">{{v.name}}</p>
				<div class="free_first_item_bottom">
					<p class="free_first_item_bottom_left" v-if="v.courseType == 1">免费</p>
					<p class="free_first_item_bottom_left" v-if="v.courseType == 4">仅限VIP</p>
					<p class="free_first_item_bottom_left" v-if="v.courseType == 3||v.courseType == 2">￥{{v.price}}</p>
					<p class="free_first_item_bottom_left" v-if="v.isOver == 1">￥{{v.price}}/永久</p>
					<p class="free_first_item_bottom_right"># {{v.className}}</p>
				</div>
			</li>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			console.log(this.item,this.id,"传过来的信息")
			this.getData()
		},

		data() {
			return {
				head:this.$imgUrl,
				freeArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
				activeInde: 0,
				payBusinessNum: 0,
				classType: ["全部", "VIP课程", "付费专栏", "免费课程", "互动直播"],
				typeNum:0,
				message: []
			}
		},
		methods: {
			goToSeekPage(){
				this.$router.push({
					name: "SeekPage",
				})
			},
			goToCourseDetails(id) {
				console.log(id)
				this.$router.push({
					name: "ClassDetails",
					query: {
						courseId: id
					}
				})
			},
			change(i, num) {
				console.log(i)
				this.activeInde = i
				this.getData()
			},
			changeType(i){
				this.payBusinessNum = i
				if(i==0){
					this.typeNum = 0
				}else if(i == 1){
					this.typeNum =4
				}else if(i == 2){
					this.typeNum = 2
				}else if(i == 3){
					this.typeNum =1
				}else if(i == 4){
					this.typeNum =3
				}
				this.getData()
			},
			getData() {
				if(this.$store.state.isLogin){
					var obj = {
						a: this.typeNum,
						firstClass: this.id,//一级
						secondClass: this.item.id,//二级
						thirdClass: this.item.course_category[this.activeInde].id
	
					}
				}else{
					var obj = {
						a: this.typeNum,
						firstClass: this.id,//一级
						secondClass: this.item.id,//二级
						thirdClass: this.item.course_category[this.activeInde].id,
						web:2
					}
				}
				

				this.$Api.getCourseList(obj).then((res) => {
					this.message = [...res.q.course]
					console.log(this.message,"课程列表")
				})

			}

		},
		props: {
			item: {
				type: Object,
				default: function() {
					return {}
				},
				required: false
			},
			id: {
				type: Number,
				default: 0,
				required: false

			}

		}
	}
</script>

<style scoped="scoped">
	img {
		width: 100%;
		height: 100%;
	}
	
	li {
		list-style: none;
	}
	
	.free_first {
		overflow: hidden;
		width: 1300px;
		margin: 0 auto;
	}
	
	.free_first_item {
		font-size: 14px;
		width: 220px;
		float: left;
		margin: 10px 10px;
		height: 200px;
		position: relative;
	}
	.free_first_item:hover{cursor: pointer;}
	.free_first_item_teacher,
	.free_first_item_name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
	
	.free {
		margin: 0 auto;
		width: 1300px;
	}
	
	.free_top {
		position: relative;
		text-align: center;
	}
	
	.free_top>p {
		color: #101010;
		font-size: 30px;
		line-height: 80px;
	}
	
	.free_top_line {
		width: 150px;
		height: 2px;
		background: #585858;
		position: absolute;
		top: 70px;
		left: 45%;
	}
	
	.free_more {
		display: flex;
		font-size: 18px;
		position: absolute;
		top: 34px;
		right: 0;
		cursor: pointer;
	}
	
	.free_more_img {
		width: 9px;
		height: 16px;
		/*background: #FA8072;*/
		margin-top: 5px;
	}
	.free_more_img img{vertical-align: top;}
	.free_line {
		width: 100%;
		height: 5px;
		background: #808080;
		margin-top: 10px;
	}
	
	.free_first {
		overflow: hidden;
	}
	
	.free_first_item {
		font-size: 14px;
		float: left;
	}
	
	.free_first_item_img {
		width: 220px;
		height: 123px;
		background: salmon;
	}
	
	.free_first_item_bottom {
		padding: 18px 0;
		display: flex;
		justify-content: space-between;
	}
	
	.free_first_item_bottom_left {
		color: #3BABF5;
	}
	
	.vipClass_content {
		/*width: 95%;*/
		margin: 0 auto;
	}
	
	.vipClass_content_tab {
		padding: 20px 0;
		overflow: hidden;
		font-size: 20px;
		color: #808080;
	}
	
	.vipClass_content_tab_title {
		float: left;
		height: 30px;
		width: 145px;
	}
	.border_line{background: #BBBBBB;height: 2px;width: 100%;float: left;}
	.education_content_tab_title{width: 145px;float: left;padding-top: 30px;overflow: hidden;}
	.vipClass_content_tab_warp{
		width: 1035px;
		float: left;
		overflow: hidden;
	}
	.education_content_tab_warp{
		width: 1035px;
		float: left;
		overflow: hidden;padding-top: 30px;
	}
	
	.vipClass_content_tab_item,
	.education_content_tab_item {
		padding-right: 90px;
		float: left;
		padding-bottom: 20px;
	}
	.education_content_tab_item:hover {
		cursor: pointer;
		color: #3BABF5;
	}
	.vipClass_content_tab_item:hover {
		cursor: pointer;
		color: #3BABF5;
	}
	
	.active {
		color: #3BABF5;
	}
</style>