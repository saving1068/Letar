<template>
	<div id="Tips">
		<div class="mask"></div>
		<div class="content">
			<div class="content_top">
				<p class="close_icon" @click="close">
					<img src="../../assets/icon_close_white.png"/>
				</p>
				<p class="top_font">课程文件与资料</p>
				<p class="middle_font">【资料】共享师资介绍</p>
				<p class="bottom_font">(rar, 1459MB)</p>
			</div>
			<p class="content_btn">立即下载</p>
		</div>
	</div>
</template>

<script>
	export default{
		created(){
			console.log(this.courseId)
//			this.getCourseFileList(this.courseId)
		},
		data(){
			return{
				course_list:null
			}
		},
		methods:{
			close() {
				console.log(1)
				this.$emit('download', false)
			},
			getCourseFileList(id) {
				this.$Api.getCourseFileList(id).then((res) => {
					console.log(res)
					this.course_list = res.q.files

				})
			}
		},
		props:{
			courseId:Number
		}
	}
</script>

<style scoped="scoped" lang="scss">
	#Tips{
		position: relative;
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 2000;
			background: rgba(0, 0, 0, .5);
		}
		.content {
			position: fixed;
			box-sizing: border-box;
			width: 377px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			z-index: 2000;
			border-radius: 10px;
			
		}
		.content_top{
			width: 100%;
			height: 150px;
			border-bottom: 1px solid #BBBBBB;
			font-size: 20px;
			position: relative;
			.top_font{
				text-align: center;
				line-height: 50px;
				color: #101010;
			}
			.close_icon{
				position: absolute;
				width: 20px;
				height: 20px;
				top: 10px;
				right: 10px;
				border-radius: 50%;
				/*background-image: url(../../assets/icon_close_white.png) no-repeat;*/
				background-color: #101010;
				/*background-size: 50%;*/
				cursor: pointer;
				font-size: 0;
				img{
					width: 50%;
					height: 50%;
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					left: 0;
					margin:auto;
				}
			}
			.close_icon:hover{
				transform: rotate(90deg);
				transition: 0.5s;
			}
			.middle_font{
				text-align: center;
				line-height: 50px;
				font-size: 23px;
				color: #808080;
			}
			.bottom_font{
				text-align: center;
				line-height: 30px;
				font-size: 18px;
				color: #808080;
			}
		}
		.content_btn{
			text-align: center;
			line-height: 50px;
			color: #3BABF5;
			font-size: 20px;
			cursor: pointer;
		}
	}
</style>