<template>
	<div id="Course" style="width: 769px;">
		<p class="title">收藏的课程</p>
		<div class="contentBox" v-if="total>0">
			<div class="top">
				<li style="width: 440px;">课程信息</li>
				<li style="width: 116px;">课程类型</li>
				<li style="width: 116px;">课程价格</li>
				<li style="width: 80px;">操作</li>
			</div>
			<div class="bottom">
				<div class="bottom_box" v-for="item in list">
					<li style="width: 440px;">
						<div class="img" style="cursor: pointer;" @click="go(item.courseId)">
							<img :src="item.wimagePath"/>
							<div class="totalCourse" v-if="item.isOver == 1">完 整 版 课 程</div>
						</div>
						<p><a style="color: #000000;" @click="go(item.courseId)">{{item.name}}</a></p>
					</li>
				<li  style="width: 116px;" v-if="item.courseType==1">免费课程</li>
						<li  style="width: 116px;" v-if="item.courseType==2">付费专栏</li>
							<li  style="width: 116px;" v-if="item.courseType==3">互动直播</li>
								<li  style="width: 116px;" v-if="item.courseType==4">VIP 课程</li>
					<li style="width: 116px;" v-if="item.courseType==1">免费</li>
					<li style="width: 116px;" v-if="item.courseType==4">仅限VIP会员</li>
					<li style="width: 116px;" v-if="item.courseType==3">￥{{item.price}}</li>
					<li style="width: 116px;" v-if="item.courseType==2">￥{{item.price}}/永久</li>
					<li style="width: 80px;" @click="close(item.courseId)"><span>取消收藏</span></li>
				</div>
			
				
				
			</div>
			
			<div style="margin-top: 20px;margin-bottom: 60px;background: #FFFFFF;text-align: center;">
			 <el-pagination
     
     @current-change="handleCurrentChange" @prev-click="prev" @next-click="next"
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
				<span>暂无收藏课程</span>

			</div>
			
			
			
		</div>
		
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>是否确定取消收藏</span>
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
				list:[],
				pa:1,
				dialogVisible:false,
				id:0,
				total:-1
				
				
			}
			
		},
		activated(){
			
			this.getCourse()
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
			
			cancelT(){
				var obj={
					a:1,
					id:this.id,
					open:2
				}
				this.$Api.TurnSwitch(obj).then((res)=>{
					if(res.q.s==0){
						this.dialogVisible = false
						this.$message({
							showClose: true,
							message: '取消收藏成功',
							type: 'success'
						});
						this.getCourse()
					}else{
						this.dialogVisible = false
						this.$message({
							showClose: true,
							message: '取消收藏失败',
							type: 'error'
						});
					}
						
						
					
				
				})
				
			},
			handleCurrentChange(e) {
				this.pa = e
				this.getCourse()

			},

			prev(e) {
				this.pa = e
				this.getCourse()
			},
			next(e) {
				this.pa = e
				this.getCourse()

			},
			getCourse(){
				var obj={
					a:6,
				    isBuy:1,
				    pa:this.pa
					
				}
				
				this.$Api.CourseList(obj).then((res)=>{
					if(res.q.s==0){
						this.list=[...res.q.course];
						this.total=res.q.total
						this.list.forEach((val,index)=>{
							val.himagePath=this.$imgUrl+val.himagePath
							val.wimagePath = this.$imgUrl + val.wimagePath
						})
					}
					
					console.log(res)
				})
				
				
			},
			close(id){
				this.id=id
				this.dialogVisible=true
				
				
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

#Course{
	.title{
		font-size: 20px;
		margin-bottom: 19px;
	}
	.contentBox{
			width: 760px;
	background: #FFFFFF;
	margin-bottom: 60px;
	margin-left: 9px;
	.top{
		height:60px;
		display:flex;
		
		li{
			list-style: none;
			line-height: 60px;
			font-size: 20px;
			text-align: center;
		}
		li:first-child{
			text-align: left;
			text-indent: 10px;
		}
	}
	.bottom{
		.bottom_box{
			list-style: none;
			border-top:1px solid #B3B3B3;
			height: 160px;
			display: flex;
			li{
				height: 100%;
			
				list-style: none;
				font-size: 16px;
			     text-align: center;	
			}
			li:nth-child(1){
				padding: 20px;
				box-sizing: border-box;
				display: flex;
				.img{
					width:220px;
					height: 122px;
					position: relative;
					.totalCourse{
						width: 87px;
						height: 25px;
						color: #FFFFFF;
						text-align: center;
						line-height: 25px;
						font-size: 12px;
						background: #ED2F46;
						position: absolute;
						bottom: 2px;
						right: 2px;
					}
					img{
						width: 100%;
						height: 100%;
					}
				}
				p{
					width: 170px;
					text-align: left;
					padding-top: 20px;
					margin-left: 10px;
				}
			}
			li:nth-child(2){
				color: #3BABF5;
				
				line-height: 160px;
			}
			li:nth-child(3){
				color: #3BABF5;
				
				line-height: 160px;
			}
			li:nth-child(4){
				color: #808080;
				line-height: 160px;
				span{
					cursor: pointer;
				}
				
			}
		}
		
		
		
	}
	}
}
	
	
	
	
</style>