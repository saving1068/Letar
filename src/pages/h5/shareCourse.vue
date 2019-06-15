<template>
	<!-- 分享课程页面 -->
	<div>
		
		<section class="content">
			<img :src="commentUrl + course.wimagePath"/>
			<span class="live" v-if="isLive">正在直播...</span>
			
			<!-- 课程简介 -->
			<section class="courseIntro">
				<h2>{{course.name}}</h2>
				<p>{{course.abstract}}</p>
				<i class="fa fa-eye eye"></i><span class="nub">{{course.browseNumber}}</span>
				<span class="willNum">{{course.buyNum}} 人最近报名</span><span class="no-money" v-text="price"></span><i id="love" class="fa fa-heart-o" @click="dowGXSZ"></i>
			</section>
			
			<!-- 关注老师 -->
			<section class="attentionMiss">
				<img :src="commentUrl + teacher.teacherPic" @click="dowGXSZ"/>
				<p>{{teacher.teacherName}}</p>
				<span @click="dowGXSZ">关注老师</span>
			</section>
			
			<!-- 详情 目录 评论 -->
			<section class="d-c-comment">
				<ul class="cf">
					<li v-for="(item,index) in tabList" @click="tabs(index)">{{item.tab}}</li>
				</ul>
				
				<ul id="dcc">
					<!-- 详情内容 -->
					<li>

			            <section class="d-item">
							<section class="d-item-text" v-html="course.courseDetail"></section>
						</section>
						<section class="footerH"></section>   <!-- 用于填充固定底部（下载共享师资APP）的位置 -->
						
						<!--<section class="d-item">
							<section class="d-item-text">
								<p>图文详情，由后台编辑，（此部分为详情内容）</p>
								<p>如果你无法简洁的表达你的想法，那只说明你还不够了解它。</p>
								<p> -- 阿尔伯特·爱因斯坦</p>
							</section>
							<img src="../assets/wu.png"/>
						</section>-->
						
					</li>
					
					<!-- 目录内容 -->
					<li>
						<h5>全部课程</h5>
						
						<Scroll :on-reach-bottom="handleReachBottomChapters">
					        <Card dis-hover v-for="(item, index) in chapters" :key="index">
					            <div class="allCourseBox">
									<h6>{{item.courseNum}}</h6>
									<div class="allCourseText">
										<p>{{item.courseTitle}}</p>
										<p>{{item.title}}</p>
									</div>
									<span>时长：{{item.time}}</span>
								</div>
					        </Card>
					        
					        <div class="hintData" v-show="isShowB">暂无数据</div>  <!-- 用于加载无数据后出现的提示 -->
					        
					    </Scroll>
						
						<section class="footerH"></section>  <!-- 用于填充固定底部（下载共享师资APP）的位置 -->
					</li>
					
					<!-- 评论内容 -->
					<li>
						
						<div class="discussContent">
							说点什么...
						</div>

						<Scroll :on-reach-bottom="handleReachBottomComment">
					        <Card dis-hover v-for="(item, index) in comment" :key="index">
					           <div class="discussBox">
									<img :src="commentUrl + item.userInfo.avaterPath"/>
									<span>{{item.userInfo.userName}}</span>
									<span>{{item.content}}</span>
									<span>{{item.time}}</span>
									<span>{{fabulousNum[index]}} 人点赞 <i class="fa fa-thumbs-o-up" @touchend='like(index)'></i></span>
								</div>
					        </Card>
					        
					        <div class="hintData" v-show="isShowC">暂无数据</div>  <!-- 用于加载无数据后出现的提示 -->
					        
					   </Scroll>
					   
						<section class="footerH"></section>  <!-- 用于填充固定底部（下载共享师资APP）的位置 -->
					</li>
				</ul>
			</section>
			
		</section>
		
		<footer class="footer">
			<button @click="dowGXSZ">下载共享师资APP</button>
		</footer>
		
	</div>
</template>

<script>


let tabObj=[
    {"tab":"详情","show":true},
    {"tab":"目录","show":false},
    {"tab":"评论","show":false}
];

export default {
	data() {
	    return {
	    	isLive:false,  //是否正在直播；
	  		tabList:tabObj,  //详情-目录-评论的Tab切换；
	  		visible: false, //底部滑动加载先关闭；
        	id:this.$route.query.id, //获取route参数id；
        	userId:this.$route.query.userId, //获取route参数userId；
        	course:{},  //详情;
        	teacher:{
        		teacherPic:"",
        		teacherName:""
        	},
        	price:'', //判断是否免费的数据；
        	chapters:[],   //目录;
        	comment:[],    //评论;
        	fabulousNum:[], //点赞+1的各个值的个数;
        	fabulousNumOnoff:[], //设置对应数组点赞的开关;
        	j:1,
        	k:1,
        	isShowB:false,
        	isShowC:false,
        	commentUrl:'http://letar.t.aiitec.org', //http协议和地址； 
        	
    	}
 	},
  created(){
  	this.commentUrl = this.$imgUrl;
  	
	this.$Api.getCourseDetails({'a':1,'web':2,'courseId':this.id}).then((res)=>{  //详情接口;
		
		this.course = res.q.course;	
		this.teacher= res.q.course.teacher;
		var price = res.q.course.price;
		if (price == 0) {
			this.price = '免费';
			
		}else{
			this.price = price;
			
		}
		
	})
	
	this.$Api.getChapterList({'a':1,'web':2,'courseId':this.id}).then((res)=>{  //目录接口,课程章节（是否正在直播中）;
		
		var chaptersArr = res.q.chapters;
		this.chapters = res.q.chapters;	
		
		for (let i=0;i<chaptersArr.length;i++) {
			if (chaptersArr[i].status == 2) { //判断（是否正在直播中），要正在直播才显示正在直播标签；
				this.isLive = true;
			}
		}
	})
	
	this.$Api.getCourseCommentList({'a':1,'web':2,'courseId':this.id}).then((res)=>{  //评论接口;
		
		this.comment = res.q.comment;
		for (var i=0;i<res.q.comment.length;i++) {
			this.fabulousNum.push(res.q.comment[i].fabulousNum);
		}
	})
	
  },
  	mounted(){
		
		
		
	},
  methods:{
  	dowGXSZ(){
  		//window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aiitec.letar';
  		
  		this.$router.push({  //跳转到注册页面；
			name: "Login",
			query: {
				id:this.id,
				userId:this.userId
			}
		})
  	},
  	like(index){  //点赞的功能；
  		let onObj = {
  				a:4,
				id:1,
				open:1
  			},
  			offObj = {
  				a:4,
				id:1,
				open:2
  			};
  		
		if (this.fabulousNumOnoff[index] !== index) { //判断什么时候push点击的那个index值，没有就添加（判断点过的赞就不可再点赞）；
			this.fabulousNumOnoff.push(index);
			this.fabulousNum[index] = this.fabulousNum[index]+1; //先让点的那个赞+1；
			this.fabulousNum.splice(index,1,this.fabulousNum[index]); //然后把点的那个赞+1替换掉data里的fabulousNum数组里那个索引的值；
			
			this.$Api.TurnSwitch(onObj).then((res)=>{ //开（点赞评论）；
	  			//console.log(res)
	  		})
		}
  		
  	},

  	tigLove(){ //点击爱心（收藏课程功能）;
  		var love = document.querySelector('#love'),
  			nub = document.querySelector('.nub'),
  			onObj = {
  				a:1,
				id:1,
				open:1
  			},
  			offObj = {
  				a:1,
				id:1,
				open:2
  			};
  		
  		if (love.className == 'fa fa-heart-o') { //收藏课程；
  			love.className = '';
		  	love.className = 'fa fa-heart';
	  		love.style.color = '#f22871';
	  		
	  		this.$Api.TurnSwitch(onObj).then((res)=>{ //开（收藏课程）；
	  			//console.log(res)
	  		})
	  		
  		} else{ //取消收藏课程；
  			love.className = 'fa fa-heart-o';
  			love.style.color = 'rgba(16, 16, 16, 1)';
  			
  			this.$Api.TurnSwitch(offObj).then((res)=>{ //关（取消收藏课程）；
	  			//console.log(res)
	  		})
  		}
		
		
  	},
  	tig(){ //关注老师；
		let attentionMiss = document.querySelector('.attentionMiss'),
			attentionMissSpan = attentionMiss.querySelector('span'),
			onObj = {
				a:2,
				id:1,
				open:1
			},
			offObj = {
				a:2,
				id:1,
				open:2
			};
		
		if (attentionMissSpan.innerHTML == '关注老师') {
			attentionMissSpan.innerHTML = '已关注';
			attentionMissSpan.style.background = '#888';
			attentionMissSpan.style.color = '#fff';
			
			this.$Api.TurnSwitch(onObj).then((res)=>{ //开（关注老师）；
	  			//console.log(res)
	  		})
			
		}else{
			attentionMissSpan.innerHTML = '关注老师';
			attentionMissSpan.style.backgroundColor = 'rgba(63, 81, 181, 1)';
			attentionMissSpan.style.color = 'rgba(250, 255, 0, 1)';
			
			this.$Api.TurnSwitch(offObj).then((res)=>{ //关（取消关注老师）；
	  			//console.log(res)
	  		})
			
		}
  		
  	},
  	tabs(index){
  		
  		if (index == 1) {
  			//console.log('ok1')
  			//window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aiitec.letar';
  			this.$router.push({  //跳转到注册页面；
				name: "Login",
				query: {
					userId:this.userId
				}
			})
  		}else if (index == 2) {
  			//console.log('ok2')
  			//window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aiitec.letar';
  			this.$router.push({  //跳转到注册页面；
				name: "Login",
				query: {
					userId:this.userId
				}
			})
  		}

  	},
  	show: function () {  
        this.visible = true;  //开启底部滑动加载；
   },
    handleReachBottomChapters () {  //滑到底部加载目录；
        return new Promise(resolve => {
        	var that= this;
            setTimeout(() => {
                that.j++;
                this.$Api.getsharesList({'a':1,'web':2,'courseId':this.id,'pa':that.j}).then((res)=>{  //目录
					//console.log(res)
					if(res.q.chapters.length<=0){  //判断comment.length有没有数据，没有就提示；
						this.isShowB = true;
					}else{   //有，就不提示；

		                for (let i = 0; i < res.q.chapters.length; i++) {
		                    this.chapters.push(res.q.chapters[i]); 
		                }
		                resolve();
		                this.isShowB = false; 
					}	
				})                               
            }, 2000); 
        });
    },
    handleReachBottomComment () {  //滑到底部加载评论；
        return new Promise(resolve => {
        	var that= this;
            setTimeout(() => {
            	that.k++;
            	this.$Api.getCourseCommentList({'a':1,'web':2,'courseId':this.id,'pa':that.k}).then((res)=>{  //评论
					//console.log(res)
					if(res.q.comment.length<=0){  //判断comment.length有没有数据，没有就提示；
						this.isShowC = true;
					}else{   //有，就不提示；
		                for (let i = 0; i < res.q.comment.length; i++) {
		                    this.comment.push(res.q.comment[i]); 
		                }
		                resolve();
		                this.isShowC = false;

					}					
				}) 
            }, 2000);
            
        });
    },
    
  }
}	

</script>


<style scoped lang="less">
li{list-style: none;}
img{width: 100%;height: 100%;}

.header{
	left: 0/50rem;
	top: 0/50rem;
	width: 375/50rem;
	height: 45/50rem;
	background-color: rgba(85, 85, 85, 1);
	color: rgba(255, 255, 255, 1);
	font-size: 18/50rem;
	text-align: center;
	font-family: Microsoft Yahei;
	position: absolute;
	ul{
		position: relative;width: 100%;height: 100%;top: 0;left: 0;
		li{position: absolute;font-family: arial;}
		li:nth-of-type(1){
			/*width: 29px;*/height: 100%;left: 21/50rem;top: 0/50rem;font-size: 15/50rem;line-height: 45/50rem;
			i{margin-right: 5/50rem;font-size: 27/50rem;vertical-align: top;margin-top: 8/50rem;}
		}
		li:nth-of-type(2){height: 100%;left: 35%;top: 0/50rem;font-size: 18/50rem;line-height: 45/50rem;}
		li:nth-of-type(3){
			right: 0/50rem;
			top: 0/50rem;
			width: 45/50rem;
			height: 45/50rem;
			font-size: 30/50rem;
			background: url(../../assets/1.png);
		}
	}
}

.content{
	left: 0/50rem;
	top: 0/50rem;
	width: 375/50rem;
	height: (1156-88-220)/50rem;
	background-color: rgba(255, 255, 255, 1);
	position: absolute;
	background: #f0f0f0;
	img{width: 100%;height: 235/50rem;}
	.live{
		left: 252/50rem;
		top: 200/50rem;
		width: 120/50rem;
		height: 25/50rem;
		opacity: 0.8;
		border-radius: 2/50rem;
		background-color: rgba(237, 47, 70, 1);
		color: rgba(255, 255, 255, 1);
		font-size: 16/50rem;
		text-align: center;
		font-family: Microsoft Yahei;
		position: absolute;
	}
	.courseIntro{
		left: 0/50rem;
		top: 235/50rem;
		width: 375/50rem;
		height: 122/50rem;
		line-height: 20/50rem;
		text-align: center;
		position: absolute;
		background: #fff;
		h2{
			left: 10/50rem;
			top: 11/50rem;
			width: 355/50rem;
			height: 44/50rem;
			line-height: 23/50rem;
			color: rgba(16, 16, 16, 1);
			font-size: 16/50rem;
			text-align: left;
			font-family: Arial;
			position: absolute;
		}
		p:nth-of-type(1){
			left: 9/50rem;
			top: 60/50rem;
			width: 351/50rem;
			height: 20/50rem;
			line-height: 20/50rem;
			color: rgba(128, 128, 128, 1);
			font-size: 14/50rem;
			text-align: left;
			font-family: Arial;
			position: absolute;
		}
		
		.eye{
			left: 10/50rem;
			top: 80/50rem;
			width: 20/50rem;
			height: 20/50rem;
			position: absolute;
			color: rgba(125, 125, 125, 1);
			font-size: 20/50rem;
		}
		.nub{
			left: 37/50rem;
			top: 80/50rem;
			/*width: 50/50rem;*/
			height: 20/50rem;
			line-height: 20/50rem;
			color: rgba(125, 125, 125, 1);
			font-size: 14/50rem;
			text-align: left;
			font-family: Arial;
			position: absolute;
		}
		.willNum{
			left: 10/50rem;
			bottom: 4/50rem;
			width: 110/50rem;
			height: 20/50rem;
			line-height: 20/50rem;
			background-color: rgba(255, 255, 255, 0);
			color: rgba(122, 120, 120, 1);
			font-size: 14/50rem;
			text-align: left;
			font-family: Arial;
			position: absolute;
		}
		.no-money{
			right: 55/50rem;
			bottom: 4/50rem;
			/*width: 37px;*/
			height: 26/50rem;
			line-height: 26/50rem;
			color: rgba(63, 81, 181, 1);
			font-size: 18/50rem;
			text-align: left;
			font-family: Arial;
			position: absolute;
		}
		
	}
	
	.attentionMiss{
		left: 0/50rem;
		top: 364/50rem;
		width: 375/50rem;
		height: 82/50rem;
		position: absolute;
		background: #fff;
		img{
			left: 14/50rem;
			top: 12/50rem;
			width: 60/50rem;
			height: 60/50rem;
			border-radius: 100/50rem;
			position: absolute;
		}
		p{
			left: 80/50rem;
			top: 33/50rem;
			width: 250/50rem;
			height: 22/50rem;
			line-height: 23/50rem;
			color: rgba(16, 16, 16, 1);
			font-size: 16/50rem;
			text-align: left;
			font-family: Arial;
			position: absolute;
		}
		span{
			left: 295/50rem;
			bottom: 3/50rem;
			width: 80/50rem;
			height: 25/50rem;
			line-height: 25/50rem;
			border-radius: 21/50rem;
			background-color: rgba(63, 81, 181, 1);
			color: rgba(250, 255, 0, 1);
			font-size: 12/50rem;
			text-align: center;
			font-family: Microsoft Yahei;
			position: absolute;
		}
	}
	
	.d-c-comment{
		position: absolute;
		left: 0/50rem;
		top: 452/50rem;
		width: 100%;
		/*height: 575px;*/
		background: #fff;
		ul:nth-of-type(1){
			width: 100%;
			height: 53/50rem;
			li{float: left;width: 33.33%;height: 100%;font-size: 21/50rem;text-align: center;line-height: 53/50rem;}
		}
		
		ul:nth-of-type(2){
			width: 100%;
			background: #fff;
			li{
				display: none;
			}
			li:nth-of-type(1){
				display: block;
				.d-item{
					width: 100%;
					height: 100%;
					.d-item-text{
						padding: 25/50rem 0 25/50rem 35/50rem;
						width: 320/50rem !important;
						/*height: 100%;*/
						line-height: 20/50rem;
						color: rgba(16, 16, 16, 1);
						font-size: 14/50rem;
						text-align: left;
						font-family: Arial;
						background: #fff;
						
					}
					img{width: 313/50rem;height: 150/50rem;margin-left: 30/50rem;}
				}
			}
			li:nth-of-type(2){
                h5{
                    font-weight: normal;
                    width: 80/50rem;
                    height: 23/50rem;
                    line-height: 20/50rem;
                    color: rgba(117, 117, 117, 1);
                    font-size: 14/50rem;
                    text-align: left;
                    font-family: Arial;
                    padding-left: 1/50rem;
                    box-sizing: border-box;
                }
                .allCourseBox{
                    width: 375/50rem;
                    /*height: 100/50rem;*/
                    line-height: 20/50rem;
                    padding-bottom: 5px;
                    h6{
                        width: 21/50rem;
                        height: 26/50rem;
                        line-height: 26/50rem;
                        color: rgba(143, 141, 143, 1);
                        font-size: 18/50rem;
                        text-align: left;
                        font-family: Arial;
                        font-weight: normal;
                        padding-left: 1px;
                        box-sizing: border-box;
                    }
                    .allCourseText{
                        width: 230/50rem;
                        /*height: 45/50rem;*/
                        line-height: 20/50rem;
                        color: rgba(16, 16, 16, 1);
                        font-size: 14/50rem;
                        text-align: left;
                        font-family: Arial;
                        margin-left: 38/50rem;
                        display: inline-block;
                        p:nth-of-type(2){word-wrap: break-word;}
                    }
                    span{
                        width: 81/50rem;
                        height: 23/50rem;
                        line-height: 17/50rem;
                        border-radius: 3/50rem;
                        background-color: rgba(240, 240, 240, 1);
                        color: rgba(117, 117, 117, 1);
                        font-size: 12/50rem;
                        font-family: Arial;
                        margin-left: 40/50rem; 
                        display: block;
                    }
                }
            }
            li:nth-of-type(3){
                .discussContent{height: 32/50rem;background: url(../../assets/pinglun.png) no-repeat 256/50rem 3/50rem;text-indent: 285/50rem;line-height: 19/50rem;color: #9a9a9a;font-size: 13/50rem;}
                .discussBox{
                    height: 113/50rem;border-bottom: 1px solid #ccc;box-sizing: border-box;width: 100%;position: relative;
                    img{width: 35/50rem;height: 35/50rem;position: absolute;top: 5/50rem;left: 2/50rem;}
                    span{position: absolute;}
                    span:nth-of-type(1){top: 18/50rem;left: 41/50rem;color: #000;font-size: 13/50rem;}
                    span:nth-of-type(2){top: 40/50rem;left: 41/50rem;color: #000;font-size: 13/50rem;/*width: 200/50rem;*/}
                    span:nth-of-type(3){top: 18/50rem;right: 12/50rem;color: #9d9d9d;font-size: 12/50rem;}
                    span:nth-of-type(4){
                        top: 84/50rem;right: 6/50rem;color: #9d9d9d;font-size: 12/50rem;
                        i{font-size: 15/50rem;color: #111;}
                    }
                } 
            }
            
            
		}
	}
}

#love{
	left: 342/50rem;
	bottom: 4/50rem;
	width: 25/50rem;
	height: 25/50rem;
	position: absolute;
	color: rgba(16, 16, 16, 1);
	font-size: 25/50rem;
}


.footerH{
	width: 375/50rem;
	height: 43/50rem;
}
.footer{
	left: 0/50rem;
	bottom: 0/50rem;
	position: fixed;
	z-index: 10;
	button{
		width: 375/50rem;
		height: 43/50rem;
		line-height: 20/50rem;
		background-color: rgba(63, 81, 181, 1);
		color: rgba(255, 255, 255, 1);
		font-size: 14/50rem;
		text-align: center;
		font-family: Arial;
		border: none;
	}
}

/*爱心样式*/
.isBg{color: #f2226d;}

/*下拉提示暂无数据*/
.hintData{height: 40/50rem;text-align: center;line-height: 40/50rem;color: #9d9d9d;font-size: 15/50rem;font-family: arial;}


</style>
<style type="text/css">
.ivu-card-body{padding: 0px !important;border: none !important;}
	
/*后台，客户所添加标签和样式的数据样式*/
.tb-course{width: 100% !important;}
.intro-course img,.d-item-text img{width: 100% !important;}

</style>

