<template>
	<div id="app">
          
		<router-view></router-view>
      
	</div>
</template>

<script type="text/javascript">
//启动app方法
function startApp(url, url2) {
	//url是跳转的scheme地址,这个建议下个反编译的软件,去第三方apk查他们设置的scheme_url和scheme_host是什么,我就是这样干的
	//url2是应用下载地址,要分清ios和android的不一样
	//将下载地址保存到全局变量
	downloadUrl = url2;
	if(ua.match(/ipad|iphone|ipod|ios/i)) {
		//外部一个定时器,专门盯着启动app的定时器loop;就叫它killer吧
		//计时6秒,之后干掉loop.
		window.setTimeout(function() {
			$('#message').html('');
			$('.result-message').eq(0).css("display", "none");
			clearTimeout(loop);
			time = parseInt('6000') / 1000;
		}, 6000);
		//尝试启动应用
		location.href = url;
		//同时开始应用启动倒计时
		countDown();
		
	} else {
		//安卓的就是用iframe来测试是否安装和启动应用了
		window.setTimeout(function() {
			$('#message').html('');
			$('.result-message').eq(0).css("display", "none");
			clearTimeout(loop);
			time = parseInt('6000') / 1000;
		}, 6000);
		//创建iframe并启动应用入口
				openApp(url);
 
			}
 
		}
 
		function openApp(src) {
			// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP
			var ifr = document.createElement('iframe');
			ifr.src = src;
			ifr.style.display = 'none';
			document.body.appendChild(ifr);
			//切换到iframe时
			//此时,会有个问题,如后切换到应用时间小于killer所需要杀死loop的时间,loop就会跳到下载提示,killer`就失去作用了
			countDown();
			window.setTimeout(function() {
				document.body.removeChild(ifr);
			}, 5000);
			//倒计时
 
		}
 
		function countDown() {
			//每秒调用一次
			loop = window.setTimeout('countDown()', 1000);
			if(time > 0) {
				$('.result-message').eq(0).css("display", "block");
				$('#message').html('正在尝试打开客户端 ' + time + 's');
		 
						time--;
						if(time == 0) {
							/*if(ua.match(/ipad|iphone|ipod|ios/i)){
						console.log(downloadUrl);
						location.href = downloadUrl;
					}*/
					//如果计时到0,loop任然没被干掉,就说明应用没有启动,此时,跳到下载提示界面
					//定时器的局限性还是很大,不能响应式反应,所以只能做到这一步了
					$('#message').html('');
					$('.result-message').eq(0).css("display", "none");
					clearTimeout(loop);
					time = parseInt('6000') / 1000;
					var btnArray = ['否', '是'];
					mui.confirm('您没有安装该应用,是否下载安装包?', '应用下载', btnArray, function(e) {
						if(e.index == 1) {
							location.replace(downloadUrl);
						} else {
							return;
						}
					});
		}
	}
}

</script>

<script>
	export default {
		name: 'App',

		created() {

			this.init();
		    console.log(this.$route.query)
                
		},
		methods: {
			init(max_width = 480) {
				// (function (doc, win) {
				let doc = document;
				let win = window;
				let docEl = doc.documentElement;
				//console.log(docEl)
				let resizeEvt =
					"orientationchange" in window ? "orientationchange" : "resize";
				let recalc = function() {
					let clientWidth = docEl.clientWidth;
					//console.log(clientWidth)
					if(!clientWidth) return;
					clientWidth = clientWidth > max_width ? max_width : clientWidth;
					docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
					//console.log( docEl.style.fontSize)
				};

				if(!doc.addEventListener) return;
				win.addEventListener(resizeEvt, recalc, false);
				doc.addEventListener("DOMContentLoaded", recalc, false);

				// })(document, window);
			},
			getType(id){
				
				this.$Api.getOrderType({id:id}).then((res)=>{
					if(res.q.s==0){
						if(res.q.orderType==1){
							this.$router.push({
								name:"Vip",
								query:{
									index:2,
									pay:true
								}
							})
							
						}else if(res.q.orderType==2){
							this.$router.push({
								name:"BuyCourse",
								query:{
									index:1,
									pay:true
								}
							})
							
						}else if(res.q.orderType==3){
							this.$router.push({
								name:"BuyCourse",
								query:{
									index:1,
									pay:true
								}
							})
							
						}else if(res.q.orderType==4){
							this.$router.push({
								name:"Cash",
								query:{
									index:5,
									pay:true
								}
							})
							
						}
						
						
					}
					
				})
				
			},
			
            getTrade_no(){
				
				var url = location.search; //获取url中"?"符后的字串   
				//				console.log(url)
				var theRequest = new Object();
				if(url.indexOf("?") != -1) {
					var str = url.substr(1);
					
					var strs = str.split("&");
					for(var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				
				return  theRequest.out_trade_no
				
				
			}
			
			

		}
	}
</script>



<style>
	html,body{
		height: 100%;
		
		
	}
	
	
	#app {
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		
		
		
	}
	::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background: rgba(118,176,243,.3);
 /* border-radius: 5px;*/
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-thumb {
  width: 8px;
  min-height: 15px;
  background: rgba(0,0,0,.2);
/*  border-radius: 5px;*/
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,.3);
}
::-webkit-scrollbar-track {
  background-color: #fff;
}
.main-center-index::-webkit-scrollbar-track-piece {
  background: #fff;
}
::-webkit-scrollbar-track-piece {
  background: #fff;
}
</style>