<template>
	<div>
	
		<div class="top">
		 <div class="box">
		 	<p>共享师资</p>
		 	<p>让教育更公平｜让用户爱上我们</p>
		 	<div class="downLoad" id="qrcodeCanvas" style="position: relative;">
		 		<img :src="img"/>
		 	</div>
		 	<p>扫描二维码下载手机APP</p>
		 </div>
		 <div class="btn android" style="margin-left: 36.5%;"></div>
		 <div class="btn ios" style="margin-left: 6.25%;"></div>
		</div>
		<div class="mid">
			<div style="margin: auto;width: 900px;display: flex;">
			<div class="left">
				<p>课程资源任您自由选择</p>
				<p style="margin-top: 78px;">共享师资拥有数万家在线教育机构，</p>
				<p>提供了超过10万门的课程资源，</p>
				<p>我们帮助您将这些资源整合，</p>
				<p>让您轻松获取海量的教育内容。</p>
			</div>
			<div class="right">
				
			</div>
			</div>
		</div>
		<div class="mid_2">
			<div style="margin: auto;width: 900px;display: flex;">
			<div class="left">
				
			</div>
			<div class="right">
				<p>线上直播即时问答</p>
				<p style="margin-top: 80px;">随时随地发送站内提问</p>
				<p>老师一对一问答</p>
			</div>
			</div>
		</div>
		<div class="bottom">
			<div style="margin: auto;width: 900px;display: flex;">
				<div class="left">
				<p>入驻老师/代理 尊享高额分成</p>
				<p style="margin-top: 40px;">不仅可以学习众多专业课程，</p>
				<p>还能赚钱</p>
			</div>
			<div class="right">
				
			</div>
			</div>
			
			
		</div>
		
	</div>
</template>

<script>
	

	export default{
		
    data(){
    	return {
    		img:require("../../assets/1534494703.png")
    	}
    },
    created(){
   
//  	var QRCode = require('qrcode')
//  
////  	
//			var that = this
//			//微信授权重定向网址
//			let newUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.aiitec.letar"
//
//			QRCode.toDataURL(newUrl, {
//				width: 100,
//				height: 100, // 高度
//				text: '56663159',
//				 src: require('../../assets/common_footer_logo.png')
//			}, function(err, url) {
//				console.log(url)
//				that.img = url
//
//			})
    	
    },
    methods:{
    	
    	
    	
    }
	}
</script>

<style scoped="scoped" lang="scss">
.top{
	width: 100%;
	height: 830px;
	background: url(../../assets/bg_image_1920x830.png) no-repeat;
	background-size:100% 100% ;
	padding-top:100px ;
	.box{
		width: 920px;
		height: 500px;
		padding-top: 50px;
		box-sizing: border-box;
		margin:  auto;
		position: relative;
		background:url(../../assets/download_image_firstscreen_920x480.png) no-repeat ;
		background-size:100% 100% ;
		p{
			color: #FFFFFF;
			font-size: 36px;
			text-align: center;
			margin-top: 15px;
		}
		p:first-child{
			height: 70px;
			width: 318px;
			font-size: 44px;
			color: #FFFFFF;
			
			text-align: center;
			margin: auto;
			border-bottom:1px solid #FFFFFF ;
		}
		p:last-child{
			font-size: 14px;
		}
		.downLoad{
			width: 160px;
			height: 160px;
			
			/*background: url(../../assets/image_qr-code_160x160.png) no-repeat;
			background-size:100% 100% ;*/
			margin: auto;
			margin-top: 40px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		
	}
	.btn{
			width: 198px;
			height: 78px;
		  margin-top: 109px;
			border-radius:5px ;
			float: left;
		}
		.android{
			background:url(../../assets/download_btn_android.png) no-repeat ;
			background-size:100% 100% ;
		}
		.ios{
			background:url(../../assets/download_btn_iphone.png) no-repeat ;
			background-size:100% 100% ;
		}
}
.mid{
	height: 830px;
	.left{
		width:380px;
		
		padding-top:300px;
		box-sizing: border-box;
		
		p{
			font-size: 18px;
		}
		p:first-child{
			font-size: 36px;
			
		}
	}
	.right{
		width: 323px;
		height: 618px;
		
		background: url(../../assets/image_show_320x618.png) no-repeat;
		background-size:100% 100%;
		margin-left: 230px;
		margin-top: 107px;
	}
}
.mid_2{
	height: 830px;
	background: #FAFAFA;
	display: flex;
	.left{
		width: 377px;
		height: 618px;
		background: url(../../assets/image_show_377x618.png) no-repeat;
		background-size:100% 100% ;
	
		margin-top: 107px;
	}
	.right{
		width: 300px;
		padding-top: 333px;
		box-sizing: border-box;
		margin-left: 245px;
		p{
			font-size: 18px;
			text-align: right;
		}
		p:first-child{
			font-size: 36px;
		}
	}
}
.bottom{
	height: 830px;
	display: flex;
	.left{
		width: 240px;
		
		padding-top: 333px;
		box-sizing: border-box;
		p{
			font-size: 18px;
		}
		p:first-child{
			font-size: 36px;
		}
	}
	.right{
	margin-left: 172px;
		width:526px;
		height: 585px;
		margin-top: 122px;
		background: url(../../assets/image_show_526x585.png) no-repeat;
		background-size:100% 100% ;
	}
}
</style>