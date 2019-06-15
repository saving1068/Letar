<template>
	<div id="LFooter" style="display: inline-block;width: 100%;" v-if="isPc">
		
		<div class="footer_top">
			<div class="box">
				<p>合作链接</p>
				<div class="liBox">
					<li>共享师资</li>
					<li>共享师资</li>
					<li>共享师资</li>
					<li>共享师资</li>
				</div>
			</div>
		</div>
		<div class="footer_bottom">
			<div class="box">
				<div class="icon"></div>
				<div class="title">共享师资</div>
				<div style="text-align: center;font-size: 14px;color: #808080;">广州利他网络科技有限公司 版权所有丨<a @click="goUs">关于我们</a>丨<a @click="goSuggest">意见反馈</a></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				isPc:true
			}
		},
		'$route' (to, from) {
				
				if(to.name=="Login"||to.name=="ShareCourse"||to.name=="UserAgreement"){
					this.isPc=false
				}else{
					this.isPc=true
				}
				
				console.log(to)
			},
			methods:{
				goUs(){
					this.$router.push({
						name:"AboutUs"
						
					})
					
					
				},
				goSuggest(){
					this.$router.push({
						name:"Feedback"
						
					})
					
					
				}
				
				
			}
			
		
	}
</script>

<style scoped="scoped" lang="scss">
.footer_top{
	width: 100%;
	height: 133px;
	background: #444547;
	.box{
		width: 1200px;
		height: 132px;
		margin: auto;
		border-bottom:1px solid #757575;
		padding-top:21px;
		box-sizing:border-box;
		p:first-child{
			font-size: 23px;
			
			color: #808080;
		}
		.liBox{
			margin-top: 39px;
			li{
				list-style: none;
				float: left;
				font-size: 17px;
				color: #808080;
				margin-left: 50px;
			}
		}
		
	}
}
.footer_bottom{
	height: 201px;
	background: #444547;
	.box{
		width: 62.5%;
		height: 100%;
		margin: auto;
		padding-top: 37px;
		box-sizing: border-box;
		position: relative;
		a{
			color:#808080 ;
		}
		.icon{
			width: 64px;
			height: 56px;
			background: url(../../assets/common_footer_logo.png) no-repeat;
			background-size:100% 100% ;
		    margin: auto;
			
		}
		.title{
			color:#808080 ;
			margin:11px auto;
			font-size: 17px;
			text-align: center;
		}
	}
	
	
	
}
</style>