<template>
	<div id="Tips">
		<div class="mask"></div>
		<div class="content">
			<div class="content_top">
				<p class="close_icon" @click="close">
					<img src="../../assets/icon_close_white.png"/>
				</p>
				<p class="top_font">试看体验已结束</p>
				<p class="bottom_font">Hello，您正在观看的课程已达体验点， 请购买课程后继续观看，谢谢支持！</p>
			</div>
			<div class="content_btn">
				<p @click="showPay">购买本节 </p>
				<p @click="showBuy">购买专栏 </p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		mounted(){
			console.log(this.curse) 
		},
		data(){
			return{
				
			}
		},
		methods:{
			close(){
				console.log(this.curse) 
				this.$emit('close', false)
			},
			showPay(){
				this.$emit("showPay")
			},
			showBuy(){
				this.$emit("showBuy")
			}
			
		},
		props:{
			curse:{
				type: Object,
				default: function() {
					return {}
				},
				required: false
			}
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
			.bottom_font{
				line-height: 30px;
				font-size: 18px;
				color: #808080;
				padding: 0 32px;
			}
		}
		.content_btn{
			text-align: center;
			line-height: 50px;
			color: #3BABF5;
			font-size: 20px;
			cursor: pointer;
			p{
				float: left;
				width: 50%;
				height: 50px;
			}
			p:nth-of-type(1){
				border-right: 1px solid #BBBBBB;
			}
		}
	}
}		
</style>