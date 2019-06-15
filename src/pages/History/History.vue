<template>
	<div id="History" style="margin-bottom: 60px;width: 769px;">
		<p class="title">观看历史</p>
		<div class="contentBox" v-if="total>0" style="width: 760px;">
			<li v-for="item in list">
				<div class="top" @click="go(item.courseId)" style="cursor: pointer;">
					<img :src="item.wimagePath"/>
					<div class="free_first_item_type" v-if="item.courseType == 4">VIP课程</div>
					<div class="free_first_item_img_type" v-if="item.isOver == 1">完整版</div>
				</div>
				<div class="text" style="margin-top: 20px;">
					<a style="color: #000000;" @click="go(item.courseId)">{{item.name}}</a>
				</div>
				
			</li>
			<div style="height: 30px;width: 100%;"></div>
				<div style="background: #FFFFFF;text-align: center;width:100%;position: absolute;bottom: 0;left: 0;">
			 <el-pagination
     
      @current-change="handleCurrentChange"
      @prev-click="prev" @next-click="next"
      :current-page.sync="pa"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
			
			</div>
		</div>
	    
	    <div style="height: 400px;position: relative;background: #FFFFFF;margin-left: 9px;width: 760px;" v-if="total==0">
	    	<div class="noData">

				<div class="icon"></div>
				<span>暂无观看历史</span>

			</div>
	    </div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				pa:1,
				list:[],
				total:-1
			}
		},
		created(){
			this.getData()
		},
		methods:{
			go(id){
				this.$router.push({
					name: "ClassDetails",
					query: {
						courseId: id
					}

				})
				
			},
			getData(){
				var obj={
					a:8,
				    isBuy:0,
				    pa:this.pa,
				    li:9
				}
				this.$Api.CourseList(obj).then((res)=>{
					this.list=[...res.q.course]
					console.log(res)
					this.total=res.q.total
					this.list.forEach((item)=>{
						item.himagePath=this.$imgUrl+item.himagePath
item.wimagePath = this.$imgUrl + item.wimagePath
					})
				})
			},
			handleCurrentChange(e) {
				this.pa = e
				this.getData()

			},
           prev(e) {
				this.pa = e
				this.getData()
			},
			next(e) {
				this.pa = e
				this.getData()

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

.title{
		font-size: 20px;
		margin-bottom: 19px;
	}
.contentBox{
	width: 760px;
	padding: 20px;
	box-sizing: border-box;
	background: #FFFFFF;
	margin-left: 9px;
	display: flex;
	flex-wrap:wrap;
	position: relative;
	
	li{
		list-style: none;
		width: 220px;
		margin-right:30px ;
		height: 210px;
		background: #F5F5F5;
		margin-bottom: 30px;
		.top{
			width: 100%;
			height: 120px;
			position:relative;
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
			img{
				width: 100%;
				height: 100%;
			}
		}
		p{
			font-size: 14px;
			margin-top: 8px;
		}
		p:last-child{
			margin-top: 15px;
			color: #7A7878;
		}
		.text{
			font-size: 14px;
			margin-top: 8px;
			padding-right: 30px;
			box-sizing: border-box;
			height: 42px;
			overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
		}
	}
	li:nth-child(3n){
		margin-right:0px ;
	}
}	
</style>