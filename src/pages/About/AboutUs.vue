<template>
	<section class="AboutUs">
		<!-- 关于我们 -->	
		<h1 v-text="articles.title">关于我们</h1>
 			
		<div class="AboutUsContent" v-html="articles.content">
			<p>如果你无法简洁的表达你的想法，那只说明你还不够了解它。</p>
			<p>&nbsp;&nbsp;--&nbsp;阿尔伯特·爱因斯坦</p>
		</div>
		
	</section>
</template>

<script>


export default {
	data() {
    return {
  		openId:'',
  		articles:{},
  		
    }
  },

  created(){
	
	this.$Api.ArticleDetails({a:6}).then(res=>{
		this.articles = res.q.articles;
		
	})
	
  },
  methods:{
  	
  }
}	
</script>

<style scoped lang="less">
/*关于我们样式*/
.AboutUs{
	background: #fff;
	padding: 90px 0 80px 712px;
	box-sizing: border-box;
	h1{
		font-size: 25px;
		margin-bottom: 80px;
	}
	.AboutUsContent{
		width: 489px;
		padding-left: 29px;
		box-sizing: border-box;
		margin-top: 12px;
		p{
			font-size: 20px;
		}
	}
	.AboutUsContent:nth-of-type(1){
		margin-top: 0px;
	}
} 	
</style>