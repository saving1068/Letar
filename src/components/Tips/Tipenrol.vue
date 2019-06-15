<template>
	<div id="Tips">
		<div class="content">
			<div class="img" v-if="success">
				<img src="../../assets/success@2x.png"/>
			</div>
			<div class="content_top">
				是否立刻报名此课程
			</div>
			<div class="content_btn">
				<p style="color: #B3B3B3;border-right: 1px solid #B3B3B3;" @click="close">取消</p>
				<p style="color: #3BABF5;" @click="join">报名</p>
			</div>
		</div>
		<LDialog v-show="showDialog" @closeDialog='closeDia()'></LDialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				showDialog:false,
				success:false,
			}
		},
		methods:{
			close() {
				console.log(1)
				this.$emit('join', false)
			},
			join(){
				if(this.$store.state.isLogin){
					var obj = {
						payType:2,
						a:2,
						payment:3,
						isBalance:1,
						courseId:this.$store.state.courseId
					}
					this.$Api.PaySubmit(obj).then((res)=>{
						console.log(res)
						if(res.q.s == 0){
//							console.log(this.success)
//							this.success = true
//							var that = this
//							setTimeout(()=>{
//								that.success = false
//							},2000)
//							console.log(this.success)
							this.$message({
								showClose: true,
								message: '报名成功',
								type: 'success'
							});
							this.$emit('join', false)
						}else{
							this.$message({
								showClose: true,
								message: '报名失败',
								type: 'error'
							});
						}
					})
				}else{
					this.showDialog = true
				}
			},
			closeDia() {
				this.showDialog = false
				},
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#Tips{
		position: relative;
		.content {
			position: fixed;
			box-sizing: border-box;
			width: 300px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			z-index: 2000;
			border-radius: 10px;
			
		}
		.content_top{
			width: 100%;
			height: 100px;
			border-bottom: 1px solid #BBBBBB;
			font-size: 24px;
			text-align: center;
			line-height: 100px;
		}
		.content_btn{
			display: flex;
			text-align: center;
			color: #3BABF5;
			font-size: 24px;
			cursor: pointer;
			p{
				width: 50%;
				height: 100%;
				line-height: 50px;
			}
		}
	}
</style>