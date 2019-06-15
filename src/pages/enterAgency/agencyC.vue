<template>
	<!-- 入驻代理商——审核页面 -->
	<div class="agencyCBox">
	
	
	<section class="agencyA">
		
		<!-- 步骤条 -->
		<div class="article-steps">
			<div class="article-box">
				<span class="el-icon-circle-check-outline"></span>
				<span class="el-icon-circle-check-outline"></span>
				<span class="article-active">3</span>
				<div class="article-item">签订入驻协议</div>
				<div class="article-item">提交资料</div>
				<div class="article-item article-active">入驻审核</div>
			</div>

		</div>
		
		<!-- 代理商入驻协议内容 -->
		<div class="agencyAContent">
			<h2>提交资料成功！</h2>
			<button @click="done">完成</button>
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
  		
		
    }
  },

  created(){
      this.getData()
  },
  methods:{
  	login(){  //首页头部；
		this.showDialog = true;
	},
  	done(){ //点击完成跳转到入驻老师和代理商——首页页面；
  		this.$router.push('/enterAgency');
  	},
  	getData(){
  		this.$Api.UserDetails().then((res) => {
					console.log(res)
					this.user = { ...res.q.userInfo
					}
					if(this.user.avatarPath != "") {
						this.user.avatarPath = this.$imgUrl + this.user.avatarPath
					}else{
						this.user.avatarPath=require('../../assets/common_footer_logo.png')
					}
                    this.$store.dispatch('changeUser', this.user)

					
				})
  		
  		
  	}
  }
}	
</script>

<style scoped lang="scss">
li{list-style: none;}
.agencyA{
	/*width: 1920px;*/
	width: 100%;
	height: 591px;
	background: #fff;
	/*padding-left: 569px;*/
	box-sizing: border-box;
	position: relative;
	top: 0;
	left: 30%;
	.article-steps{
		width: 783px;
		height: 79px;
		position: relative;
		.article-box{
			width: 783px;height: 40px;position: absolute;left: 0;top: 20px;background: #e6e6e6;border-radius: 15px;
			span{position: absolute;width: 58px;height: 58px;border: 1px solid #fff;border-radius: 60px;top: -10px;color: #7f7f7f;text-align: center;line-height: 58px;background: #e6e6e6;font-size: 28px;}
			span:nth-of-type(1){left: -1px;font-size: 60px;}
			span:nth-of-type(2){left: 252px;font-size: 60px;}
			span:nth-of-type(3){left: 252*2px;}
		}
		.article-item{width: 261px;height: 40px;float: left;line-height: 40px;color: #818181;font-size: 15px;border-radius: 15px;}
		.article-item:nth-of-type(1){text-indent: 80px;border-radius: 15px 0 0 15px;}
		.article-item:nth-of-type(2){width: 260px;text-indent: 75px;}
		.article-item:nth-of-type(3){text-indent: 55px;}
	}
	.agencyAContent{
		width: 783px;
		height: 432px;
		text-align: center;
		h2{font-size: 25px;font-weight: normal;color: #7d7d7d;height: 237px;padding-top: 152px;box-sizing: border-box;}
		button{width: 120px;height: 40px;background: #3babf5;color: #fff;text-align: center;line-height: 40px;border-radius: 4px;border: none;font-size: 15px;}
	}
}


/*步骤条的选中样式*/
.article-active{background: #3babf5 !important;color: #fff !important;}

.cf:after{content: '';display: block;clear: both;}
</style>