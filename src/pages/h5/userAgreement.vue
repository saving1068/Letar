<template>
	<div class="userAgreement">
			
			<h1 v-text="articlesTitle">用户注册协议</h1>
			
			<div class="userAgreementBody" v-html="articlesContent">
				<!--<div class="compileProtocol">后台协议编辑内容</div>
				<div class="compileProtocol">后台协议编辑内容</div>
				
				<div class="protocolContent">
					<p>如果你无法简洁的表达你的想</p>
					<p>法，那只能说明你还不够了解它。</p>
					<p>--阿尔伯特·爱因斯坦</p>
				</div>
				<div class="protocolContent">
					<p>如果你无法简洁的表达你的想</p>
					<p>法，那只能说明你还不够了解它。</p>
					<p>--阿尔伯特·爱因斯坦</p>
				</div>
				<div class="protocolContent">
					<p>如果你无法简洁的表达你的想</p>
					<p>法，那只能说明你还不够了解它。</p>
					<p>--阿尔伯特·爱因斯坦</p>
				</div>
				<div class="protocolContent">
					<p>如果你无法简洁的表达你的想</p>
					<p>法，那只能说明你还不够了解它。</p>
					<p>--阿尔伯特·爱因斯坦</p>
				</div>
				<div class="protocolContent">
					<p>如果你无法简洁的表达你的想</p>
					<p>法，那只能说明你还不够了解它。</p>
					<p>--阿尔伯特·爱因斯坦</p>
				</div>	-->
			</div>
			
		</div>
</template>

<script>


export default {
	data() {
	    return {
	  		openId:'',
	  		articlesTitle:'',
	  		articlesContent:''
    }
 },
  created(){
	
	this.$Api.getArticleDetails({'a':4}).then((res)=>{
		var articles = res.q.articles;
		this.articlesTitle = articles.title; //标题；
		this.articlesContent = articles.content; //内容；
	})
	
  },
  methods:{
  	
  	
  }
}	

</script>

<style scoped lang="less">
li{list-style: none;}
.userAgreement {
  width: 100%;
  height: 100%;
  background: #fff;
}
.userAgreement .header {
  height: 37/50rem;
  text-align: center;
  line-height: 37/50rem;
  font-size: 15/50rem;
  position: relative;
}
.userAgreement .header i {
  position: absolute;
  left: 22/50rem;
  top: 5/50rem;
  font-size: 26/50rem;
  color: #848484;
}
.userAgreement h1 {
  height: 58/50rem;
  text-indent: 12/50rem;
  font-size: 18/50rem;
  line-height: 58/50rem;
  font-weight: normal;
}
.userAgreement .userAgreementBody {
  padding: 0 76/50rem 0 90/50rem;
  box-sizing: border-box;
}
.userAgreement .userAgreementBody .compileProtocol {
  height: 23/50rem;
  font-size: 12/50rem;
  line-height: 23/50rem;
}
.userAgreement .userAgreementBody .compileProtocol:nth-of-type(2) {
  margin-bottom: 19/50rem;
}
.userAgreement .userAgreementBody .protocolContent {
  font-size: 13/50rem;
}
.userAgreement .userAgreementBody .protocolContent p:nth-of-type(3) {
  padding-top: 3/50rem;
  padding-bottom: 5/50rem;
}
	
</style>