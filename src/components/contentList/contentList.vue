<template>
	<div>
		<div class="free_first">
    		<li class="free_first_item" v-for="(v,i) in message" @click="goToCourseDetails(v.courseId)">
    			<p class="free_first_item_img">
    				<img :src="head+v.wimagePath"/>
    				<p class="free_first_item_img_type" v-if="v.isOver == 1">完整版</p>
					<p class="free_first_item_type" v-if="v.courseType == 4">VIP课程</p>
    			</p>
    			<!--<p class="free_first_item_teacher">{{v.teacher.teacherName}}</p>-->
    			<p class="free_first_item_name">{{v.name}}</p>
    			<div class="free_first_item_bottom">
    				<p class="free_first_item_bottom_left" v-if="v.courseType == 1">免费</p>
					<p class="free_first_item_bottom_left" v-if="v.courseType == 4">仅限VIP</p>
					<p class="free_first_item_bottom_left" v-if="v.courseType == 3||v.courseType == 2">￥{{v.price}}</p>
					<p class="free_first_item_bottom_left" v-if="v.isOver == 1&&v.courseType==2">￥{{v.price}}/永久</p>
					<!--<p class="free_first_item_bottom_right" v-if="v.courseType == 1"># 名师课</p>-->
					<p class="free_first_item_bottom_right"># {{v.className}}</p>
    			</div>
    		</li>
    	</div>
	</div>
</template>

<script>
export default{
	mounted(){
//		console.log(this._props)
	},
	data(){
		return{
			head:this.$imgUrl,
			freeArr:[1,2,3,4,5,6,7,8,9,0],
		}
	},
	methods:{
		goToCourseDetails(id){
			console.log(id)
			this.$router.push({
				name:"ClassDetails",
				query:{courseId:id}
			})
		}
	},
	props: {
    	message: Array,  //定义传值的类型<br>    }
	}
}
</script>

<style scoped="scoped">
	img{width: 100%;height: 100%;}
	li{list-style: none;}
	.free_first{overflow: hidden;width: 1300px;margin: 0 auto;}
	.free_first_item{font-size: 14px;width: 220px;float: left;margin: 10px 10px;height: 200px;position: relative;}
	.free_first_item:hover{cursor: pointer;}
	.free_first_item_teacher,.free_first_item_name{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.free_first_item_img{width: 220px;height: 123px;background: salmon;}
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
	.free_first_item_bottom{padding: 18px 0;display: flex;justify-content: space-between;}
	.free_first_item_bottom_left{color: #3BABF5;}
</style>
