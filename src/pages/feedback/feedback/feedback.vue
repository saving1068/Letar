<template>
	<section class="feedback">
	<!-- 意见反馈 -->
	
		<div style="margin: auto;width: 750px;">
			
			<h2><span>*</span>意见反馈内容</h2>
			<textarea placeholder="意见反馈内容"></textarea>		
			
			<h2><span>*</span>联系方式<i>（提供联系方式，以便工作人员回访）</i></h2>
			<form>
				<input type="text" id="txt_mobile" placeholder="您的手机号（默认当前手机用户号码）" maxlength="11" @blur="par_mobile"/>
				<input type="button" value="提交" @click="btn"/>
			</form>
			
		</div>
		
	</section>
</template>

<script>


export default {
	data() {
    return {
  		mobile:null,
  		
    }
  },

  created(){
	//一载入就附上用户的默认手机号；
	this.$Api.UserDetails().then((res)=>{ //代理商总收入部分，要传session；
  		console.log(res)
  		
		this.mobile = res.q.userInfo.mobile;
  	})
	
	
  },
  methods:{
  	par_mobile(event){
  		event = event||window.event;
  		var parName = /^1[0-9]{10}$/; 
		
		if (parName.test(event.target.value)) { //手机号验证提示；
			event.target.style.borderColor = '#888';
		}else{
			event.target.style.borderColor = 'rgba(255,0,0,0.4)';
		}
  	},
  	btn(){
  		
  		if(!this.$store.state.isLogin){
  			this.$message({
							showClose: true,
							message: '您还未登录',
							type: 'error'
						});
  			return ;
  			
  		}else{ //登录了的；
  			
  			let txtarea = document.querySelector('textarea'),
				txt_mobile = document.querySelector('#txt_mobile'),
				parName = /^1[0-9]{10}$/; 
			
			if (txt_mobile.value == '') { //手机号没填，默认是当前用户手机号；
				
				this.$Api.UserFeedBack({'content':txtarea.value,'mobile':this.mobile}).then(res=>{
					console.log(res)
					
					if (res.q.s == 0) { //请求成功后，清空输入框内容信息；
						txtarea.value = '';
						txt_mobile.value = '';
						
						this.$message({  //vue的公共组件弹窗提示；
							showClose: true,
							message: "反馈成功!",
							type: 'success'
						});
						
					}else{
						//alert('请填写意见反馈信息！')
						
						this.$message({
							showClose: true,
							message: "请填写意见反馈信息！",
							type: 'error'
						});
					}
		
				})
				
			}else{ //填了；
				
				this.$Api.UserFeedBack({'content':txtarea.value,'mobile':txt_mobile.value}).then(res=>{
					console.log(res)
					
					if (res.q.s == 0) { //请求成功后，清空输入框内容信息；
						txtarea.value = '';
						txt_mobile.value = '';
						
						this.$message({
							showClose: true,
							message: "反馈成功!",
							type: 'success'
						});
						
					}else{
						//alert('请填写意见反馈信息！')
						this.$message({
							showClose: true,
							message: "请填写意见反馈信息！",
							type: 'error'
						});
					}
		
				})
				
				
			}	
  			
  		}

  	},
  }
}	
	
</script>

<style scoped lang="less">
/*意见反馈样式*/
.feedback{
	height: 592px;
	padding: 70px 0 0 0px;
	box-sizing: border-box;
	h2{
		font-size: 24px;
		padding-bottom: 20px;
		span{
			color: #fc0d05;
			padding-right: 8px;
		}
		i{
			color: #888;
			font-size: 19px;
			font-style: normal;
			padding-left: 16px;
			font-weight: normal;
		}
	}
	textarea{
		border:1px solid #888;outline:none;resize:none;width: 748px;height: 198px;padding: 13px 0 0 8px;box-sizing: border-box;color: #888;margin-bottom: 30px;
	}
	
	form{
		input:nth-of-type(1){width: 398px;height: 34px;border:1px solid #888;font-size: 18px;text-indent: 7px;color: #888;display: block;}
		input:nth-of-type(2){width: 120px;height: 40px;background: #3babf5;color: #fff;font-size: 18px;border:none;outline:none;border-radius: 5px;margin: 40px 0 0 285px;}
	}
}	
</style>