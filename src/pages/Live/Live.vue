<template>
	<div class="liveBigBox">

		<div class="top">
			<div class="top_left" @click="goback"><i class="el-icon-arrow-left"></i></div>
			<p class="top_name" v-text="videoCourseTitle">课程名称</p>
			<div class="top_img">
				<img :src="heardURL + teacher.teacherPic" />
			</div>
		</div>

		<div class="live_video">
			<div class="c_video" id="id_test_video" style="width: 100%;height: 100%;">
				
				<i class="fa fa-warning" @click="isComplainFrameS"></i>
				<a class="playTour" href="javascript:;" @click="isPlayTourShow">打赏</a>
				<p class="fawManGoToClass"><span v-text="count">1000</span>人在上课</p>

				<!-- 打赏提示 -->
				<div class="playTour-hint" v-show="isPlayTour">
					<h6 class="playTour-number">
						￥<span>1</span>
					</h6>
					<p>当前余额：￥<span v-text="nowBalance">10</span>，支付成功剩余￥<span v-text="finallyBalance">9</span></p>
					<input type="text" placeholder="请输入您要打赏的金额" v-model="balance" @blur="budgetSettle" id="btnInputPlayTour" />
					<input type="button" value="立即打赏" @click="isThankPlayTourShow" />
				</div>

				<!-- 感谢打赏 -->
				<div class="thankPlayTour" v-show="isThankPlayTour">
					<p>感谢打赏！</p>
				</div>

			</div>
			<div class="activity">
				<div class="activity_top">
					<li class="activity_top_item" @click="change(0)" :class="[tabIndex==0? 'activity_top_item_active':'']">评论</li>
					<li class="activity_top_item" @click="change(1)" :class="[tabIndex==1? 'activity_top_item_active':'']">提问</li>
					<li class="activity_top_item" @click="change(2)" :class="[tabIndex==2? 'activity_top_item_active':'']">赞赏</li>
					<div class="activity_item_bottom" :style="bottomStyle"></div>
				</div>
				
				<!-- 评论 -->
				<div class="activity_val_one" v-if="tabIndex==0">
					<li v-for="(v,i) in commentList">
						<div class="activity_val_img">
							<img :src="v.userInfo.avaterPath" class="headPortrait"/>
						</div>
						
						<div class="activity_val_info">
							<div class="activity_val_info_top">
								<p v-text="v.userInfo.userName">用户昵称</p>
								<p class="fr" v-text="v.time">2018/01/01,19:30</p>
							</div>
							<div class="activity_val_info_font" v-text="v.content">
								<p>如果你无法简洁的表达你的想法，那只说明你还不够了解它。</p>
								<p>--阿尔伯特·艾因食堂</p>
							</div>
						</div>
					</li>

				</div>

				<div class="comment">
					<!-- 用于限制文本域的字数200 -->
					<textarea placeholder="请输入评论内容..." id="appraise" maxlength="200"
						onchange="this.value=this.value.substring(0, 200)" 
						onkeydown="this.value=this.value.substring(0, 200)" 
						onkeyup="this.value=this.value.substring(0, 200)"
					></textarea>
				</div>
				<div class="comment_btn" @click="sendLiveAppraise">
					发送
				</div>
				
				<!-- 提问 -->
				<div class="activity_val_two" v-if="tabIndex==1">
					<li v-for="(v,i) in askList" :class="[i %2 == 0?'question_bg':'']">
						<div class="activity_val_img">
							<img :src="v.userInfo.avaterPath" class="headPortrait"/>
						</div>
						<div class="activity_val_info">
							<div class="activity_val_info_top">
								<p v-text="v.userInfo.userName">用户昵称</p>
								<p class="fr"><span v-text="v.sqNum">1000</span>人同问</p>
							</div>
							<div class="activity_val_info_font" v-text="v.content">
								<p>如果你无法简洁的表达你的想法，那只说明你还不够了解它。</p>
								<p>--阿尔伯特·艾因食堂</p>
							</div>
						</div>
						<div class="question_sameBox" @click="alsoAsk(i)">
							<span class="question_same">同问</span>
						</div>
					</li>

				</div>
				
				<!-- 赞赏 -->
				<div class="activity_val_three" v-if="tabIndex==2">
					<!-- 老师资料 -->
					<header class="cf">
						
						<div class="img-borA">
							<img :src="heardURL + teacher.teacherPic"/>
						</div>
						
						<ul>
							<li v-text="teacher.nickname">老师名称</li>
							<li v-text="teacher.teacherAppellation">老师称谓</li>
						</ul>
						<span>收到赞赏{{appreciateTotal}}次</span>
					</header>

					<!-- 赞赏排行版 -->
					<nav>
						赞赏排行版
						<p @click="ref">
							<i class="el-icon-refresh"></i>
							<span>刷新</span>
						</p>
					</nav>

					<footer>
						<ul>
							<li class="cf" v-for="(item,index) in appreciate">
								<span>{{item.rank}}：</span>
								<img :src="item.avaterPath"/>
								<span v-text="item.nickname">Neo</span>
								<a href="javascript:;" @click="cash(index)">踢榜</a>
							</li>
						</ul>
					</footer>

				</div>

			</div>
		</div>

		<!-- 投诉框 -->
		<div class="complainFrame-bg" v-if="isComplainFrameShow">
			<div class="complainFrame">
				<h2>投诉<i class="el-icon-error" @click="isComplainFrameHide"></i></h2>

				<div class="complainFrame-content">
					<div class="complainCause">
						<h3><span>*</span>投诉原因（多选）</h3>
						<ul class="checkbox">
							<li class="cf" v-for="(item,index) in reasonsArr">
								<i @click="addIClass($event,index)"></i>
								<span v-text="item.content">诱导学员私下交易</span>
							</li>
						</ul>
						<textarea placeholder="内容描述" v-model="Text"></textarea>
					</div>
					<div class="uploadingImg">
						<h3>上传截图<span>（最多3张图，每张不超过2M）</span></h3>
						
						<section class="cf uploadingImgs">
							<div class="fileBox" v-if="userURLA.length < 3"></div>
							<input class="file" type="file" accept="image/*" name="file[]"  @change="uploadImgA" ref="imgInputA" v-if="userURLA.length < 3"/>
							<img :src="item" v-if="isUrlA" v-for="(item,index) in userURLA" class="upload_imgs"/>
						</section>
						
					</div>
					<div class="contactWay complainCause">
						<h3><span>*</span>联系方式<b>（提供联系方式，以便工作人员回访）</b></h3>
						<form action="" method="">
							<input type="text" maxlength="11" placeholder="手机号（默认当前用户手机号码）" v-model="mobile" id="shouji"/>
							<input type="button" value="提交" @click="informSubmit" />
						</form>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				isComplainFrameShow: false,
				isPlayTour: false,
				isThankPlayTour: false, //显示与隐藏打赏成功；
				imageUrl: 'http://letar.t.aiitec.org/api/Base/UploadImage',
				heardURL: 'http://letar.t.aiitec.org',
				tabIndex: 0,
				arr: [1, 2, 3, 4],
				commentList: [],
				askList: [],
				idImages: '', //上传两张身份证照片的 id;
				nowBalance: 0, //当前余额的钱；
				balance: null, //预打赏的余额（也就是打赏的输入框要输入的余额）；
				finallyBalance: null, //支付成功后剩余余额；
				onoffBalance: false, //打赏开关；
				reasonsArr: [], //举报原因的静态渲染数据；
				reasonsIdArr: ['', '', '', ''], //举报原因的数据内容的id；
				mobile: '',
				Text: '',
				appreciate: [], //直播间赞赏接口数据;
				appreciateTotal: null, //赞赏的总数；
				id: this.$route.query.id, //获取route参数章节id；
				idA:this.$route.query.courseId, //获取route参数课程Id；
				course: {},
				teacher: {},
				chapters: [],
				videoUrl: null, //直播视频的url；
				videoCourseTitle: '',
				courseH: '',
				indexAppreciate_cash: null,
				isPlay: false, //先是没点击踢榜按钮的；
				shouji:null, //一载入就附上用户的默认手机号；
				count:null, //直播间在线人数；
				//投诉上传图片的;
				user:[],
				isUrlA:false, 
				userURLA:[],
			}
		},
		created() {

			var liveCommentObj = {
					'chapterId': this.id,
					'type': 1
				},
				liveAskObj = {
					'chapterId': this.id,
					'type': 2
				},
				admireObj = {
					'courseChapterId': this.id
				},
				CourseObj = {
					'courseId': this.idA,
					'web': 2
				},
				ChapterObj = {
					'a': 1,
					'web': 2,
					'courseId': this.id
				},
				LiveObj = {
					'a': 1,
					'chapterId': this.id
				};
			
			this.$Api.LiveRoom(LiveObj).then(res => { //直播间接口；
				//console.log(res)
				this.videoUrl = res.q.chapter.liveUrl[1]; //直播视频url；
				this.videoCourseTitle = res.q.chapter.courseTitle; //对应直播视频的名字；
				
				var player = new TcPlayer('id_test_video', {
					"m3u8": res.q.chapter.liveUrl[2],
					"flv": res.q.chapter.liveUrl[1], //增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
					"autoplay": true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
					"coverpic": "http://www.test.com/myimage.jpg",
					"width": '480', //视频的显示宽度，请尽量使用视频分辨率宽度
					"height": '320' //视频的显示高度，请尽量使用视频分辨率高度
				});

			})

			this.$Api.getCourseDetails(CourseObj).then( res => { //课程详情（拿老师的资料）,不用传sessionId；
				console.log(res)
				
				this.course = res.q.course;
				this.teacher = res.q.course.teacher;
				
			})

			this.$Api.getLiveCourseCommentList(liveCommentObj).then((res) => { //接收直播评论接口,不用传sessionId；
				//console.log(res)
				
				this.commentList = [...res.q.comment];
								
				this.commentList.forEach((item)=>{
					
					if(item.userInfo.avaterPath == ""){ //判断没有图片的url时,给img元素一个默认的图片；
						item.userInfo.avaterPath = require('../../assets/common_footer_logo.png');
					}else{
						item.userInfo.avaterPath = this.$imgUrl+item.userInfo.avaterPath;
					}

				})
				
			})

			setInterval(() => { //每一分钟自动更新直播评论接口信息；
				
				this.commentList = []; //要先清空原来重复的消息；
				
				this.$Api.getLiveCourseCommentList(liveCommentObj).then((res) => { //接收直播评论接口,不用传sessionId；
					//console.log(res)
					
					this.commentList = [...res.q.comment];
								
					this.commentList.forEach((item)=>{
						
						if(item.userInfo.avaterPath == ""){ //判断没有图片的url时,给img元素一个默认的图片；
							item.userInfo.avaterPath = require('../../assets/common_footer_logo.png');
						}else{
							item.userInfo.avaterPath = this.$imgUrl+item.userInfo.avaterPath;
						}

					})
					
				})
				
			}, 60000)
			
			this.$Api.getLiveCourseCommentList(liveAskObj).then((res) => { //接收直播提问接口,不用传sessionId；
				//console.log(res)
				
				this.askList = [...res.q.comment];
								
				this.askList.forEach((item)=>{
					
					if(item.userInfo.avaterPath==""){ //判断没有图片的url时,给img元素一个默认的图片；
						item.userInfo.avaterPath = require('../../assets/common_footer_logo.png');
					}else{
						item.userInfo.avaterPath = this.$imgUrl+item.userInfo.avaterPath;
					}

				})

			})

			this.$Api.Appreciate(admireObj).then(res => { //直播间赞赏接口,不用传sessionId;
				console.log(res)

				this.appreciateTotal = res.q.total;
				
				this.appreciate = [...res.q.appreciate];
								
				this.appreciate.forEach((item)=>{
					
					if(item.avaterPath == ""){ //判断没有图片的url时,给img元素一个默认的图片；
						item.avaterPath = require('../../assets/common_footer_logo.png');
					}else{
						item.avaterPath = this.$imgUrl+item.avaterPath;
					}

				})	
				
			})

			this.$Api.UserDetails().then(res => { //用户详情接口（账户余额）,先默认扣1元；
				//console.log(res)
				this.nowBalance = res.q.userInfo.balance;
				this.finallyBalance = this.nowBalance - 1;
				this.shouji = res.q.userInfo.mobile;
				
			})

			this.$Api.ReportReason().then(res => { //举报原因的静态渲染接口,不用传sessionId；
				//console.log(res)
				var reasonsArr = res.q.reasons;
				for(let i = 0; i < reasonsArr.length; i++) {
					this.reasonsArr.push(reasonsArr[i]);
				}

			})
			
			
			//加载页面先渲染的；
			this.$Api.LiveCount({'chapterId':this.id}).then(res=>{ //直播间在线人数接口；
				//console.log(res)
				this.count = res.q.count;
			})
			
			//然后每5秒自动更新直播在线人数接口信息；
			setInterval(() => {
				
				this.$Api.LiveCount({'chapterId':this.id}).then(res=>{ //直播间在线人数接口；
					//console.log(res)
					this.count = res.q.count;
				})
				
			},5000)
			
		},
		mounted() {

		},
		methods: {
			uploadImgA(e) { //自定义的上传图片；
			//console.log(e.target.files)
			//console.log(this.userURLA.length)
			console.log(this.userURLA)
			//限制一次性最多上传3张图片；
			if (this.userURLA.length <= 3) {	
			
				var that = this;
				
				//循环上传多张的图片；
				for (let i=0;i<e.target.files.length;i++) {
					
					const isLt2M = e.target.files[i].size / 1024 / 1024 < 2;
					
					//console.log(e.target.files[i].size)
					
					if (isLt2M) {
						
						let oFReader = new FileReader();
						oFReader.readAsDataURL(e.target.files[i]);
						
						oFReader.onload = function(oFREvent) {
							let imgData = oFREvent.currentTarget.result;
							that.user.avatarPath = imgData;
							
							that.userURLA.push(that.user.avatarPath);
							that.isUrlA = true;
							
							//console.log(that.isUrlA)
							
						}
						
						//console.log(this.userURL)
						var form = new FormData(); //上传图片保存的信息；
						var obj = {
							n: "UploadImage",
							s: localStorage.getItem("session"),
							q: {}
						};
						form.append("s", localStorage.getItem("session"));
						form.append("n", "UploadImage");
						form.append("file[]", e.target.files[i], e.target.files[i].name);
						var config = {
							headers: {
								"Content-Type": "multipart/form-data"
							},
							data: form
						};
						
						
						this.$Api.UploadImage(config).then((res) => { //上传图片返回的接口信息；
							console.log(res)
							
							if(res.q.s == 0) {
								this.user.push(res.q.files[i].id);
								
							}
							
						});
						
						
					}else{
						//alert('图片每张不能超过2M！')
						
						this.$message({
							showClose: true,
							message: "图片每张不能超过2M！",
							type: 'error'
						});
						
					}

				}
				
			}

		},
      
			cash(index) { //踢馆按钮；

				this.isPlay = true; //点击了踢榜按钮；
				
				if (!this.onoffBalance) {  
					//点击显示打赏框；
					this.isPlayTour = true;
					this.onoffBalance = !this.onoffBalance;
					
				} else{
					//隐藏打赏框；
					this.isPlayTour = false;
					this.onoffBalance = !this.onoffBalance;
	
				}
				
	
			},
			ref() { //刷新按钮；
				let admireObj = {
					'courseChapterId': this.id
				};

				this.$Api.Appreciate(admireObj).then(res => { //直播间赞赏接口,不用传sessionId;
					console.log(res)
//					this.appreciate = res.q.appreciate;
					
					this.appreciateTotal = res.q.total;
				
					this.appreciate = [...res.q.appreciate];
									
					this.appreciate.forEach((item)=>{
						
						if(item.avaterPath == ""){ //判断没有图片的url时,给img元素一个默认的图片；
							item.avaterPath = require('../../assets/common_footer_logo.png');
						}else{
							item.avaterPath = this.$imgUrl+item.avaterPath;
						}
	
					})
					
				})

			},

			informSubmit() { //点击提交举报资料；
				
				let checkbox = document.querySelector('.checkbox'),
					IS = checkbox.querySelectorAll('i'),
					shouji = document.querySelector('#shouji'),
					mobileVerify = /^1[0-9]{10}$/; //手机正则;
				
				if (shouji.value == '') { //没填手机号就默认当前用户手机号；
					
					//判断投诉文本框是否为空；
					if(this.Text == ''){  //为空；
						
						this.$message({
							showClose: true,
							message: "内容描述不能为空！",
							type: 'error'
						});
						
					}else{ //不为空；
						
						let RepSubObj = {
							chapterId: this.id,
							imageIds: this.user[0] + ',' + this.user[1] + ',' + this.user[2],
							content: this.Text,
							reasonIds: this.reasonsIdArr[0] + ',' + this.reasonsIdArr[1] + ',' + this.reasonsIdArr[2] + ',' + this.reasonsIdArr[3],
							'mobile': this.shouji
						};
						
						this.$Api.ReportSubmit(RepSubObj).then( res => { //举报原因的静态渲染接口,不用传sessionId；
							console.log(res)
		
							if(res.q.s == 0) { //举报资料提交成功后，先清空输入框的全部消息且举报框消失；
								//console.log('提交成功')
								
								this.$message({
									showClose: true,
									message: "投诉提交成功！",
									type: 'success'
								});
								
								for(let i = 0; i < this.reasonsArr.length; i++) {
									IS[i].className = '';
								}
								this.Text = '';
								this.mobile = '';
								this.isComplainFrameShow = false; //也要移除投诉框；
								this.userURLA = []; //清空上传图片路径；
							}
		
						})
						
					}
					
					
				} else if( mobileVerify.test(shouji.value.trim()) ){ //填了,就要匹配手机正则；
					
					if(this.Text == ''){  //为空；
						
						this.$message({
							showClose: true,
							message: "内容描述不能为空！",
							type: 'error'
						});
						
					}else{ //不为空；
						
						let RepSubObj = {
							chapterId: this.id,
							imageIds: this.userURLA[0] + ',' + this.userURLA[1] + ',' + this.userURLA[2],
							content: this.Text,
							reasonIds: this.reasonsIdArr[0] + ',' + this.reasonsIdArr[1] + ',' + this.reasonsIdArr[2] + ',' + this.reasonsIdArr[3],
							mobile: this.mobile
						};
						
						this.$Api.ReportSubmit(RepSubObj).then(res => { //举报原因的静态渲染接口,不用传sessionId；
							console.log(res)
		
							if(res.q.s == 0) { //举报资料提交成功后，先清空输入框的全部消息且举报框消失；
								//console.log('提交成功')
								
								this.$message({
									showClose: true,
									message: "投诉提交成功！",
									type: 'success'
								});
								
								for(let i = 0; i < this.reasonsArr.length; i++) {
									IS[i].className = '';
								}
								this.Text = '';
								this.mobile = '';
								this.isComplainFrameShow = false; //也要移除投诉框；
								this.userURLA = []; //清空上传图片路径；
							}
		
						})
						
					}
					
					
				}else{
					
					this.$message({
						showClose: true,
						message: "手机号码必须是11位数！",
						type: 'error'
					});
					
				}
				
				

			},
			addIClass(event, index) { //选中投诉原因（多选项）；
				event = event || window.event;
				let checkbox = document.querySelector('.checkbox'),
					IS = checkbox.querySelectorAll('i');

				if(event.target.className == 'el-icon-circle-check') { //判断已选中就取消；

					this.$Api.ReportReason().then(res => { //举报原因的数据接口；
						console.log(res)
						var reasonsArr = res.q.reasons;
						this.reasonsIdArr[index] = '';
						console.log(this.reasonsIdArr)
					})

					event.target.className = '';
				} else { //没选中，就选中打钩；

					this.$Api.ReportReason().then(res => { //举报原因的数据接口；
						console.log(res)
						var reasonsArr = res.q.reasons;
						this.reasonsIdArr[index] = reasonsArr[index].id;
						console.log(this.reasonsIdArr)
					})

					event.target.className = 'el-icon-circle-check';

				}

			},
			budgetSettle() {
				this.finallyBalance = this.nowBalance - this.balance;
				//console.log(this.finallyBalance)
			},
			isThankPlayTourShow() { //显示感谢打赏；
				var thankPlayTour = document.querySelector('.thankPlayTour'),
					btnInputPlayTour = document.querySelector('#btnInputPlayTour'),
					playObjA = {
						payType: 2,
						a: 5,
						payment: 3,
						isBalance: 1,
						chapterId: this.id,
						price: 1
					},
					playObjB = {
						payType: 2,
						a: 5,
						payment: 3,
						isBalance: 1,
						chapterId: this.id,
						price: this.balance
					};

				this.$Api.UserDetails().then(res => { //用户详情接口（账户余额）；
					console.log(res)
					let balance = res.q.userInfo.balance;
					this.nowBalance = res.q.userInfo.balance;

					if(balance == 0) { //金额为0时，余额不足，跳转余额充值页面；

						this.$router.push({
							name: 'Mine',
							query: {
								index: 5
							}
						});

					} else { //余额充足就显示感谢打赏；

						if(btnInputPlayTour.value == '') { //如果请输入您要打赏的金额输入框没有值，那等于默认值扣1元；
							this.$Api.PaySubmit(playObjA).then((res) => {
								console.log(res)
								
								this.isPlayTour = false;
								this.onoffBalance = false;
								this.isThankPlayTour = true;
		
								setTimeout(() => {
									thankPlayTour.style.transform = 'scale(1)';
									thankPlayTour.style.opacity = '1';
		
									setTimeout(() => {
										thankPlayTour.style.transform = 'scale(0)';
										thankPlayTour.style.opacity = '0';
		
										setTimeout(() => {
											this.isThankPlayTour = false;
										}, 2000)
		
									}, 3000)
		
								}, 50)
								
							})
							//console.log(1)
						} else if(btnInputPlayTour.value <= 0){
							alert('请输入正确的值！')
						}else{ //扣输入框的值；
							
							this.$Api.PaySubmit(playObjB).then((res) => {
								console.log(res)
								
								this.isPlayTour = false;
								this.onoffBalance = false;
								this.isThankPlayTour = true;
		
								setTimeout(() => {
									thankPlayTour.style.transform = 'scale(1)';
									thankPlayTour.style.opacity = '1';
		
									setTimeout(() => {
										thankPlayTour.style.transform = 'scale(0)';
										thankPlayTour.style.opacity = '0';
		
										setTimeout(() => {
											this.isThankPlayTour = false;
										}, 2000)
		
									}, 3000)
		
								}, 50)
								
							})
							//console.log('其他')
						}

					}

				})
				
				//判断是否点的是踢榜；
				if (this.isPlay) { //点过了踢榜按钮；
						
					let admireObj = {
						'courseChapterId': this.id
					};
					
					this.appreciate = []; //先清空；
					this.$Api.Appreciate(admireObj).then(res => { //直播间赞赏接口,不用传sessionId;
						console.log(res)
						
						this.appreciateTotal = res.q.total;
						
						this.appreciate = [...res.q.appreciate];
										
						this.appreciate.forEach((item)=>{
							
							if(item.avaterPath == ""){ //判断没有图片的url时,给img元素一个默认的图片；
								item.avaterPath = require('../../assets/common_footer_logo.png');
							}else{
								item.avaterPath = this.$imgUrl+item.avaterPath;
							}
		
						})
						
					})

					this.isPlay = false;
				}

			},
			isPlayTourShow() { //点击打赏按钮；

				if(this.onoffBalance == false) { //先开；
					this.isPlayTour = true;
					this.onoffBalance = true;
					this.balance = null;
					
					let admireObj = {
						'courseChapterId': this.id
					};
					
					this.appreciate = []; //先清空；
					this.$Api.Appreciate(admireObj).then(res => { //直播间赞赏接口,不用传sessionId;
						console.log(res)
						
						this.appreciateTotal = res.q.total;
						
						this.appreciate = [...res.q.appreciate];
										
						this.appreciate.forEach((item)=>{
							
							if(item.avaterPath == ""){ //判断没有图片的url时,给img元素一个默认的图片；
								item.avaterPath = require('../../assets/common_footer_logo.png');
							}else{
								item.avaterPath = this.$imgUrl+item.avaterPath;
							}
		
						})
						
					})
					
					
					this.$Api.UserDetails().then(res => { //用户详情接口（账户余额）；
						console.log(res)
						let balance = res.q.userInfo.balance;
						this.nowBalance = res.q.userInfo.balance;

						if(balance == 0) { //金额为0时，余额不足，跳转余额充值页面；
							this.finallyBalance = 0;
							
							this.$router.push({
					  			name:"Cash",
					  			query:{
					  				index:5    
					  			}
					  		});
							
						} else {
							this.finallyBalance = this.nowBalance - 1; //余额充足就-1；
						}

					})

				} else {
					this.isPlayTour = false;
					this.onoffBalance = false;
				}

			},
			isComplainFrameS() {
				this.isComplainFrameShow = true; //添加投诉框；
			},
			isComplainFrameHide() {
				this.isComplainFrameShow = false; //移除投诉框；
			},


			goback() {
				this.$router.go(-1);
			},
			change(i) {
				var appraise = document.querySelector('#appraise'),
					Comment = document.querySelector('.comment'),
					comment_btn = document.querySelector('.comment_btn');

				if(i == 0) {
					this.tabIndex = 0;
					appraise.placeholder = "请输入评论内容...";
					Comment.style.display = 'block';
					comment_btn.style.display = 'block';
				} else if(i == 1) {
					this.tabIndex = 1;
					appraise.placeholder = "请输入提问内容...";
					Comment.style.display = 'block';
					comment_btn.style.display = 'block';
				} else if(i == 2) {
					this.tabIndex = 2;
					Comment.style.display = 'none';
					comment_btn.style.display = 'none';
				}
			},
			sendLiveAppraise() { //点击发送直播评价和提问；
				var appraise = document.querySelector('#appraise'),
					activity_top_items = document.querySelectorAll('.activity_top_item');

				if(appraise.value.trim()) { //文本域为空时，不能发，就不会请求，就不会刷新；

					if(activity_top_items[0].className.indexOf('activity_top_item_active') !== -1) { //是在评论区域时；
						console.log('评论')

						var appraiseObj = {
							'a': 2,
							'type': 1,
							'courseId': 0,
							'content': appraise.value,
							'chapterId': this.id
						}

						this.$Api.sendCommentSubmit(appraiseObj).then((res) => { //发送直播评论接口；
							console.log(res)
							
							this.commentList = []; //先清空绑定的数组数据；
							
							var liveCommentObj = {
								'chapterId': this.id,
								'type': 1
							}
							
							this.$Api.getLiveCourseCommentList(liveCommentObj).then((res) => { //再次请求接收直播评论接口；
								console.log(res)
								
								this.commentList = [...res.q.comment];
								
								this.commentList.forEach((item)=>{
									
									if(item.userInfo.avaterPath == ""){ //判断没有图片的url时,给img元素一个默认的图片；
										item.userInfo.avaterPath = require('../../assets/common_footer_logo.png');
									}else{
										item.userInfo.avaterPath = this.$imgUrl+item.userInfo.avaterPath;
									}
				
								})
								
							})
						})

					}

					if(activity_top_items[1].className.indexOf('activity_top_item_active') !== -1) { //是在提问区域时；
						console.log('提问')

						var askObj = {
							'a': 2,
							'type': 2,
							'courseId': 0,
							'content': appraise.value,
							'chapterId': this.id
						}

						this.$Api.sendCommentSubmit(askObj).then((res) => { //发送直播提问接口；
							console.log(res)
							
							this.askList = []; //也会先清空重复的消息，再添加渲染；
							var liveAskObj = {
								'chapterId': this.id,
								'type': 2
							}
							
							this.$Api.getLiveCourseCommentList(liveAskObj).then((res) => { //再次请求接收直播提问接口；
								console.log(res)
								
								this.askList = [...res.q.comment];
								
								this.askList.forEach((item)=>{
									
									if(item.userInfo.avaterPath==""){ //判断没有图片的url时,给img元素一个默认的图片；
										item.userInfo.avaterPath = require('../../assets/common_footer_logo.png');
									}else{
										item.userInfo.avaterPath = this.$imgUrl+item.userInfo.avaterPath;
									}

								})
								
								console.log(this.askList)
							})

						})
					}

					appraise.value = ''; //清空提问输入框；

				}

			},
			alsoAsk(i) { //点击同问，增加同问人数；				
				var liveAskObj = {
						'chapterId': this.id,
						'type': 2
					},
					question_sameS = document.querySelectorAll('.question_same'),
					onObj = {
						a: 5,
						id: 1,
						open: 1
					};

				question_sameS[i].className = 'question_same question_same_active';

				this.$Api.getLiveCourseCommentList(liveAskObj).then((res) => { //接收直播提问接口；
					console.log(res)
					var isSame = res.q.comment[i].isSame; //点击的那个同问；

					if(this.askList[i].isSame == 1) { //判断已点击过那个同问，就不能在点击添加次数了；
						console.log('已点击过同问')
					} else { //还没有点击过同问；
						this.askList[i].sqNum++; //显示已点击过那个同问的次数；
						this.askList[i].isSame = 1; //已点击过那个同问；

						this.$Api.TurnSwitch(onObj).then((res) => { //开（同问点击）；
							console.log(res)
						})

						console.log(this.askList[i].sqNum)
					}

					console.log(this.askList[i])
				})

			},
			
			
		},
		computed: {
			bottomStyle() {
				if(this.tabIndex == 0) {
					return {
						"left": "0%"
					}
				} else if(this.tabIndex == 1) {
					return {
						"left": "33.33%"
					}
				} else if(this.tabIndex == 2) {
					return {
						"left": "66.66%"
					}
				}
			},
		},

	}
</script>

<style scoped="scoped" lang="less">
	/*投诉上传多张图片样式*/
	.uploadingImgs{
		height: 130px;
		padding-left: 50px;
		position: relative;
		.file{
			width: 88px;
			height: 98px;
			position: absolute;
			left: 50px;
			top: 0;
			opacity: 0;
			cursor: pointer;
		}
		img{
			width: 88px;
			height: 98px;
			float: left;
			margin-left: 25px;
		}
	}
	
	.fileBox{
		width: 88px;
		height: 98px;
		float: left;
		border: 1px solid #666;
		background: url(../../assets/icon_add.png) no-repeat 23px 28px;
		background-size: 44px 44px;
		cursor: pointer;
	}
	
	img {
		width: 100%;
		height: 100%;
	}
	
	li {
		list-style: none;
	}
	
	.liveBigBox {
		width: 100%;
		position: relative;
	}
	
	.top {
		width: 100%;
		padding: 20px 40px 20px 30px;
		overflow: hidden;
		background: #313131;
	}
	
	.top_left {
		float: left;
		margin: 18px 0;
	}
	
	.top_name {
		float: left;
		font-size: 25px;
		color: #FFFFFF;
		padding-left: 30px;
		margin: 15px 0;
	}
	
	.top_img {
		float: right;
		width: 60px;
		height: 60px;
		background: #FFFFFF;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.top_left i {
		font-size: 30px;
		font-weight: 600;
		color: #fff;
		vertical-align: bottom;
	}
	
	.top_img img {
		border-radius: 100px;
	}
	/*视频样式*/
	
	.live_video {
		display: flex;
	}
	
	video::-webkit-media-controls-panel {
		background: #313131;
		color: #FFFFFF;
	}
	
	.c_video {
		width: 1583px;
		height: 850px;
		position: relative;
	}
	
	.fa-warning {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 35px;
		color: #fff;
		cursor: pointer;
		z-index: 50;
	}
	
	.playTour {
		width: 100px;
		height: 100px;
		position: absolute;
		bottom: 100px;
		right: 8px;
		background: #ff9800;
		border-radius: 150px;
		color: #fff;
		font-size: 30px;
		text-align: center;
		line-height: 100px;
		z-index: 50;
	}
	
	.fawManGoToClass {
		font-size: 20px;
		color: #fff;
		position: absolute;
		bottom: 55px;
		right: 10px;
		z-index: 50;
	}
	
	.fawManGoToClass span {
		padding-right: 5px;
	}
	
	.activity {
		/*width: 320px;*/
		width: 350px;
		height: 850px;
		background: #1d1d1d;
	}
	
	.activity_top {
		position: relative;
		overflow: hidden;
	}
	
	.activity_top_item {
		color: #FFFFFF;
		height: 80px;
		width: 33.33%;
		font-size: 25px;
		float: left;
		text-align: center;
		line-height: 80px;
	}
	
	.activity_top_item:hover {
		cursor: pointer;
	}
	
	.activity_top_item_active {
		color: #3babf3;
	}
	
	.activity_item_bottom {
		background: #3BABF3;
		position: absolute;
		width: 33.33%;
		height: 2px;
		bottom: 0;
		transition: .5s;
	}
	
	.activity_val_one,
	.activity_val_two,
	.activity_val_three {
		color: #FFFFFF;
		position: relative;
		height: 600px;
		overflow: auto;
	}
	
	.activity_val_one li,
	.activity_val_two li {
		overflow: hidden;
		padding: 10px 10px;
		position: relative;
	}
	
	.activity_val_img {
		float: left;
		width: 36px;
		height: 36px;
		background: #FFFFFF;
		border-radius: 50%;
	}
	
	.activity_val_info {
		float: left;
		font-size: 14px;
	}
	
	.activity_val_info_top {
		overflow: hidden;
		width: 100%;
		position: absolute;
		top: 8px;
		left: 0;
	}
	
	.activity_val_info_top p:nth-of-type(1) {
		float: left;
		line-height: 38px;
		font-size: 14px;
		padding-left: 50px;
		box-sizing: border-box;
	}
	
	.activity_val_info_top p:nth-of-type(2) {
		float: left;
		line-height: 38px;
		font-size: 14px;
	}
	
	.activity_val_info_font {
		width: 240px;
		padding-left: 10px;
		padding-top: 10px;
	}
	
	.activity_val_info_font p {
		line-height: 25px;
	}
	/*新增赞赏的布局样式*/
	
	.activity_val_three {
		width: 320px;
		height: 770px;
		padding-top: 10px;
		box-sizing: border-box;
	}
	
	.activity_val_three header {
		width: 98%;
		background: #fff;
		height: 65px;
	}
	
	.activity_val_three header img {
		width: 47px;
		height: 47px;
		border-radius: 50px;
		/*margin: 8px 8px 0 15px;*/
	}
	
	.activity_val_three header ul {
		display: inline-block;
		color: #000000;
		font-size: 12px;
		vertical-align: top;
		margin-top: 15px;
	}
	
	.activity_val_three header span {
		color: #a3a3a3;
		font-size: 12px;
		float: right;
		padding: 10px 5px 0 0;
	}
	
	.activity_val_three nav {
		height: 30px;
		border-bottom: 1px solid #808080;
		box-sizing: border-box;
		line-height: 30px;
		text-indent: 6px;
		color: #e87f05;
		font-size: 12;
	}
	
	.activity_val_three nav p {
		float: right;
		margin-right: 8px;
		color: #808080;
		font-size: 14;
		cursor: pointer;
	}
	
	.activity_val_three footer {
		width: 98%;
		background: #fff;
	}
	
	.activity_val_three footer li {
		height: 47px;
		line-height: 47px;
		color: #000000;
		padding: 0 10px 0 5px;
		box-sizing: border-box;
		font-size: 12px;
	}
	
	.activity_val_three footer li span {
		color: #ff9800;
	}
	
	.activity_val_three footer li img {
		width: 32px;
		height: 32px;
		border-radius: 35px;
		vertical-align: middle;
	}
	
	.activity_val_three footer li span:nth-of-type(2) {
		color: #000000;
		padding-left: 7px;
	}
	
	.activity_val_three footer li a {
		width: 50px;
		height: 25px;
		border-radius: 10px;
		background: #f23d52;
		float: right;
		line-height: 25px;
		text-align: center;
		margin-top: 12px;
		color: #fff;
	}
	
	.comment {
		position: absolute;
		bottom: 61px;
		z-index: 10;
	}
	
	.comment textarea {
		resize: none;
		width: 320px;
		height: 115px;
		border: none;
		background: #4d4b4c;
		outline: none;
		color: #FFFFFF;
		font-size: 15px;
		text-indent: 10px;
		padding: 25px 0 0 0;
		box-sizing: border-box;
	}
	
	.comment textarea:-webkit-input-placeholder {
		color: #FFFFFF;
	}
	
	.comment textarea:-moz-placeholder {
		color: #FFFFFF;
	}
	
	.comment textarea:-moz-placeholder {
		color: #FFFFFF;
	}
	
	.comment textarea:-ms-input-placeholder {
		color: #FFFFFF;
	}
	
	.comment_btn {
		width: 80px;
		height: 30px;
		background: #28A3F4;
		color: #FFFFFF;
		text-align: center;
		line-height: 30px;
		border-radius: 6px;
		margin-left: 180px;
		position: absolute;
		bottom: 25px;
		cursor: default;
		z-index: 10;
	}
	
	.question_bg {
		background: #d9d9d9;
		color: #000000;
	}
	
	.question_sameBox {
		width: 100%;
		height: 36px;
		float: left;
	}
	
	.question_same {
		width: 36px;
		height: 36px;
		background: #fff;
		font-size: 12px;
		border-radius: 50%;
		text-align: center;
		line-height: 36px;
		color: #000000;
		float: right;
	}
	
	.question_same:hover {
		background: #3babf5;
		cursor: pointer;
	}
	
	.question_same_active {
		background: #3babf5;
	}
	
	.headPortrait {
		width: 36px;
		height: 36px;
		border-radius: 50px;
	}
	
	.cf:before {
		content: '';
		display: block;
		clear: both;
	}
	/*投诉框样式*/
	
	.complainFrame-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		top: 0;
		left: 0;
		z-index: 20;
	}
	
	.complainFrame {
		width: 700px;
		height: 650px;
		position: absolute;
		top: 80px;
		left: 610px;
		background: #fff;
		background: #fff;
	}
	
	.complainFrame h2 {
		height: 36px;
		background: #29a4f4;
		line-height: 36px;
		text-indent: 10px;
		color: #fff;
		font-size: 14px;
		font-weight: normal;
	}
	
	.el-icon-error {
		float: right;
		font-size: 22px;
		margin: 7px 10px 0 0;
		cursor: pointer;
	}
	
	.complainFrame-content {
		padding: 10px 0 0 30px;
		box-sizing: border-box;
	}
	
	.complainCause {
		height: 311px;
	}
	
	.complainCause h3 {
		height: 23px;
		font-size: 20px;
		color: #000000;
		font-weight: normal;
	}
	
	.complainCause h3 span {
		color: #fc0e01;
		padding-right: 10px;
	}
	
	.checkbox {
		height: 148px;
		padding-left: 50px;
		box-sizing: border-box;
	}
	
	.checkbox li {
		height: 30px;
		padding-top: 10px;
		box-sizing: border-box;
		font-size: 17px;
		color: #111;
	}
	
	.checkbox li i {
		width: 20px;
		height: 20px;
		border-radius: 30px;
		border: 1px solid #b3b3b3;
		float: left;
		cursor: pointer;
	}
	
	.checkbox li span {
		float: left;
		padding-left: 12px;
		box-sizing: border-box;
	}
	
	.complainCause textarea {
		resize: none;
		width: 534px;
		height: 98px;
		border: 1px solid #bbb;
		text-indent: 10px;
		padding-top: 10px;
		box-sizing: border-box;
		font-size: 14px;
		margin: 20px 0 0 52px;
	}
	
	.el-icon-circle-check {
		color: #0076FF;
		font-size: 22px;
		border: none !important;
	}
	
	.uploadingImg {
		height: 168px;
	}
	
	.uploadingImg h3 {
		font-weight: normal;
		height: 38px;
		font-size: 18px;
		text-indent: 22px;
		color: #000000;
	}
	
	.uploadingImg h3 span {
		color: #808080;
	}
	
	.contactWay {
		height: 125px !important;
	}
	
	.contactWay h3 {
		height: 30px;
	}
	
	.contactWay h3 b {
		font-weight: normal;
		color: #808080;
		font-size: 15px;
	}
	
	.contactWay form {
		height: 95px;
		padding-left: 52px;
		box-sizing: border-box;
	}
	
	.contactWay form input:nth-of-type(1) {
		width: 536px;
		height: 30px;
		border: 1px solid #bbb;
		font-size: 12px;
		text-indent: 10px;
		line-height: 30px;
	}
	
	.contactWay form input:nth-of-type(2) {
		width: 120px;
		height: 40px;
		color: #fff;
		background: #3babf5;
		text-align: center;
		line-height: 40px;
		font-size: 18px;
		border-radius: 5px;
		border: none;
		margin: 15px 0 0 208px;
	}
	/*打赏提示样式*/
	
	.playTour-hint {
		width: 836px;
		height: 497px;
		position: absolute;
		bottom: 70px;
		left: 25%;
		background: #ffe3c2;
		z-index: 50;
	}
	
	.playTour-number {
		width: 127px;
		height: 127px;
		border-radius: 130px;
		background: #3f51b5;
		color: #ff9800;
		font-size: 40px;
		position: absolute;
		top: 89px;
		left: 40%;
		line-height: 127px;
		text-indent: 20px;
	}
	
	.playTour-number span {
		font-size: 80px;
		color: #ffe600;
	}
	
	.playTour-hint p {
		color: #e51c23;
		font-size: 22px;
		position: absolute;
		top: 238px;
		left: 0;
		width: 100%;
		text-align: center;
	}
	
	.playTour-hint input {
		position: absolute;
		border-radius: 5px;
		font-size: 20px;
	}
	
	.playTour-hint input:nth-of-type(1) {
		top: 285px;
		left: 22%;
		width: 410px;
		height: 56px;
		color: #9a9a9a;
		border: 1px solid #9a9a9a;
		background: #fff;
		text-align: center;
	}
	
	.playTour-hint input:nth-of-type(2) {
		top: 360px;
		left: 37%;
		width: 175px;
		height: 65px;
		color: #e6d217;
		background: #3f51b5;
		border: none;
		cursor: pointer;
	}
	/*感谢打赏样式*/
	
	.thankPlayTour {
		width: 360px;
		height: 360px;
		background: #a0a0a0 url(../../assets/smiling.png) no-repeat 120px 78px;
		position: absolute;
		left: 40%;
		top: 20%;
		border-radius: 10px;
		transition: 2s;
		transform: scale(0);
		opacity: 0;
		z-index: 50;
	}
	
	.thankPlayTour p {
		font-size: 28px;
		color: #fff;
		position: absolute;
		left: 115px;
		top: 225px;
	}

.fr{float: right !important;margin-right: 10px;}	
</style>

<style type="text/css">
.liveBigBox	.vcp-player{
		width: 100% !important;
		height: 850px !important;
	}
</style>