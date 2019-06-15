<template>
	<!-- 入驻代理商——协议页面 -->
	<div class="agencyABox">

	<section class="agencyA">
		
		<!-- 步骤条 -->
		<div class="article-steps">
			<div class="article-box">
				<span class="article-active">1</span>
				<span>2</span>
				<span>3</span>
				<div class="article-item article-active">签订入驻协议</div>
				<div class="article-item">提交资料</div>
				<div class="article-item">入驻审核</div>
			</div>

		</div>
		
		<!-- 代理商入驻协议内容 -->
		<div class="agencyAContent">
			<h2>老师入驻协议</h2>
			<ul>
				<li v-html="articles.content">
					<!--<p>如果你无法简洁的表达你的想法，那只说明你还不够了解它。</p>
					<p> -- 阿尔伯特·爱因斯坦</p>-->
				</li>
			</ul>
			<p class="isConsent"><i class="el-icon-circle-check" @click="tigColor"></i>我已阅读并同意此协议</p>
			<a href="javascript:;" @click="nextStep">下一步</a>
		</div>
		
	</section>

	</div>
</template>

<script>


export default {
	components:{
		
	},
	data() {
    return {
  		openId:'',
  		
		articles:{},
		
    }
 },

  created(){
		
		this.$Api.getArticleDetails({'a':5}).then((res)=>{  //老师入驻协议；
			//console.log(res)
			this.articles = res.q.articles;	
		})
		
  },
  mounted(){ //页面挂载之后；
  	let isConsent = document.querySelector('.isConsent'),
  		isConsentI = isConsent.querySelector('i');
	isConsentI.setAttribute('index',0);
  },
  methods:{
  	tigColor(){ //是否选中打钩；
  		let isConsent = document.querySelector('.isConsent'),
  			isConsentI = isConsent.querySelector('i');
  		
		if (isConsentI.getAttribute('index') == '0') { //等于蓝色时；
			isConsentI.style.color = '#a0a0a0';
			isConsentI.setAttribute('index',1);
		}else{ //等于灰色时；
			isConsentI.style.color = '#3babf5';
			isConsentI.setAttribute('index',0);
		}
	
  	},
  	nextStep(){ //点击下一步跳转到入驻代理商——提交资料页面；
  		let isConsent = document.querySelector('.isConsent'),
  			isConsentI = isConsent.querySelector('i');
  		
  		//判断是否打钩；
  		if (isConsentI.getAttribute('index') == '0') {  //打钩了，可以跳转；
  			this.$router.push('/agencyBb');
  		} else{ //没有打钩，不可以跳转并且提示打钩；
  			alert("请认真阅读此协议并且打钩同意！");
  		}
  		
  		
  	},
  }
}	
</script>

<style scoped lang="scss">
li{list-style: none;}
.agencyA{
	/*width: 1920px;*/
	width: 100%;
	height: 100%;
	background: #fff;
	/*padding-left: 569px;*/
	box-sizing: border-box;
	position: relative;
	left: 30%;
	top: 0;
	.article-steps{
		width: 783px;
		height: 79px;
		position: relative;
		.article-box{
			width: 783px;height: 40px;position: absolute;left: 0;top: 20px;background: #e6e6e6;border-radius: 15px;
			span{position: absolute;width: 58px;height: 58px;border: 1px solid #fff;border-radius: 60px;top: -10px;color: #7f7f7f;text-align: center;line-height: 58px;background: #e6e6e6;font-size: 28px;}
			span:nth-of-type(1){left: -1px;}
			span:nth-of-type(2){left: 252px;}
			span:nth-of-type(3){left: 252*2px;}
		}
		.article-item{width: 261px;height: 40px;float: left;line-height: 40px;color: #818181;font-size: 15px;border-radius: 15px;}
		.article-item:nth-of-type(1){text-indent: 80px;border-radius: 15px 0 0 15px;}
		.article-item:nth-of-type(2){width: 260px;text-indent: 75px;}
		.article-item:nth-of-type(3){text-indent: 55px;}
	}
	.agencyAContent{
		height: 100%;
		h2{font-size: 25px;font-weight: normal;color: #7d7d7d;height: 84px;line-height: 84px;}
		ul{
			width: 890px;height: 240px;border: 1px solid #b3b3b3;padding-left: 18px;box-sizing: border-box;
			li{height: 100%;padding-top: 9px;box-sizing: border-box;font-size: 15px;color: #0e0e0e;overflow: auto;}
			p:nth-of-type(2){text-indent: 8px;padding-top: 7px;box-sizing: border-box;}
		}
		.isConsent{
			height: 64px;color: #7f7f7f;font-size: 15px;line-height: 64px;position: relative;padding-left: 35px;box-sizing: border-box;
			i{color: #3babf5;font-size: 24px;position: absolute;left: 0px;top: 19px;z-index: 10px;cursor:pointer;}
		}
		a{width: 120px;height: 40px;background: #3babf5;color: #fff;border-radius: 4px;display: inline-block;text-decoration: none;text-align: center;line-height: 40px;font-size: 18px;margin: 15px 0 65px 330px;}
	}
}


/*步骤条的选中样式*/
.article-active{background: #3babf5 !important;color: #fff !important;}

/*是否同意协议*/
.yesNo{color: #a0a0a0 !important;}

.cf:after{content: '';display: block;clear: both;}
</style>