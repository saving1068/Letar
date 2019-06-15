<template>
	<div>
		<div class="warp">
			<div class="top">
				<div class="top_step">
					全部课程<span v-if="CourseDetails.firstCategory!=''"><i class="el-icon-arrow-right"></i>{{CourseDetails.firstCategory}}</span>
					<span v-if="CourseDetails.secondCategory!=''"><i class="el-icon-arrow-right"></i>{{CourseDetails.secondCategory}}</span>
					<span v-if="CourseDetails.thirdCategory!=''"><i class="el-icon-arrow-right"></i>{{CourseDetails.thirdCategory}}</span>
					<i class="el-icon-arrow-right"></i>{{CourseDetails.name}}
				</div>
				<div class="top_content">
					<div class="top_content_img">
						<div v-show="videoActived==index" style="width:100%; height:320px;" v-for="(item,index) in ChapterList" :id="'id_test_video'+index" :key="index"></div>
						<img :src="CourseDetails.wimagePath" v-if="!videoImgae" />
						<!--<video id="video" ref="video" v-else width="100%" height="320" controls="controls" preload="metadata" controlsList="nodownload" @mouseenter="removeClick">
							<source :src="firstLive" type="video/mp4"></source>
							<source :src="firstLive" type="video/ogg"></source>
							<source :src="firstLive" type="video/webm"></source>
							<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
								<param name="movie" value="myvideo.swf" />
								<param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
							</object> 当前浏览器不支持 video直接播放，点击这里下载视频：
							<a href="myvideo.webm">下载视频</a>
						</video>-->
						<div v-if="getVip" class="top_content_font">您已经免费观看3分钟,继续观看请开通VIP会员</div>
						<div class="live_btn" v-if="CourseDetails.courseType == 3&&isLiveUrl !=''" @click="goToLive">
							<div class="live_btn_img">
								<img src="../../assets/live.png" />
							</div>
							<p>正在直播</p>
						</div>
					</div>
					<div class="top_content_detail">
						<div class="className">
							{{CourseDetails.name}}
						</div>
						<div class="pay_top_box">
							<div class="classFlag" v-if="CourseDetails.courseType == 1">
								免费课程
							</div>
							<div class="classFlag" style="background: #4150b7; float: left;" v-if="CourseDetails.courseType == 2">
								付费专栏
							</div>
							<div class="classFlag" style="background: #4150b7; float: left;" v-if="CourseDetails.courseType == 3">
								互动直播
							</div>
							<div class="classFlag" style="background: #ed3046; float: left;margin-left: 10px;" v-if="CourseDetails.isOver == 1">
								完整版课程
							</div>
							<div class="classFlag" style="background: red;border: none;" v-if="CourseDetails.courseType == 4">
								VIP 课程
							</div>
						</div>
						<div class="classLook">
							<li class="classLook_1" v-if="CourseDetails.courseType == 1">{{CourseDetails.buyNum}} 人最近报名</li>
							<li class="classLook_1" v-if="CourseDetails.courseType == 2">{{CourseDetails.buyNum}} 人订阅</li>
							<li class="classLook_1" v-if="CourseDetails.courseType == 4">{{CourseDetails.buyNum}} 人在学</li>
							<li class="classLook_1" v-if="CourseDetails.courseType == 3">{{CourseDetails.buyNum}} 人购买</li>
							<li class="classLook_2"></li>
							<li class="classLook_3">{{CourseDetails.browseNumber}}人观看过</li>
							<li class="classLook_2"></li>
							<li class="classLook_5" @click="share_show">
								<div class="classLook_5_img">
									<img src="../../assets/share.png" />
								</div>
								<font>分享</font>
							</li>
							<li class="classLook_6" @click="followClass">
								<div class="classLook_6_img">
									<img v-if="!isCollection" src="../../assets/follow.png" />
									<img v-else src="../../assets/followed.png" />
								</div>
								<font v-if="!isCollection">收藏</font>
								<font v-else>已收藏</font>
							</li>
						</div>
						<div class="class_price" v-if="CourseDetails.courseType == 2">
							￥{{CourseDetails.price}}/永久
						</div>
						<div class="class_price" v-if="CourseDetails.courseType == 3">
							￥{{CourseDetails.price}}
						</div>
						<div class="class_vip" v-if="CourseDetails.courseType == 4">
							仅限VIP会员
						</div>
						<div class="allBtn">
							<div class="class_btn" v-if="CourseDetails.courseType==1">
								<p v-if="CourseDetails.isBuy !=1" @click="join">立即报名</p>
								<p v-else style="background: #8C939D;">已报名</p>
							</div>

							<div class="class_btn" style="padding-top: 30px;">
								<p v-if="CourseDetails.courseType==2&&CourseDetails.isBuy!=1||CourseDetails.courseType==3&&CourseDetails.isBuy!=1" @click="buy">立即购买</p>

								<p v-if="CourseDetails.courseType==2&&CourseDetails.isBuy==1||CourseDetails.courseType==3&&CourseDetails.isBuy==1" style="background: #8C939D;">已购买</p>
							</div>

							<div class="Vipclass_btn" v-if="CourseDetails.courseType == 4&&CourseDetails.vipStatus==2" @click="ifVip">
								<p>立刻开通尊享VIP会员</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="content_left">
					<div class="content_left_top">
						<li :class="{'active_coloe':isChange==0}" @click="change(0)">详情</li>
						<li :class="{'active_coloe':isChange==1}" @click="change(1)">目录</li>
						<li :class="{'active_coloe':isChange==2}" @click="change(2)">评论（{{commentTotal}}）</li>
						<div class="active" :style="bottomStyle"></div>
					</div>
					<div class="content_left_middle">
						<div class="content_left_detail" v-if="isChange==0">
							<div class="test" style="width: 100%;overflow: hidden;" v-html="CourseDetails.courseDetail"></div>
						</div>
						<div class="content_left_catalog" v-if="isChange==1">
							<p class="catalog_titel">全部课程 ({{courseTotal}})</p>
							<ul class="catalog_content">
								<li v-for="(v,i) in ChapterList">
									<div class="catalog_class">
										<div class="catalog_class_title_box" @click="choise(i,v.id,v.type,v)">
											<p class="catalog_class_title_one"><span v-if="i+1<10">0</span>{{i+1}}&nbsp;&nbsp;&nbsp;{{v.title}}
												<!--{{v.courseTitle}}-->
											</p>
											<!--<p class="catalog_class_title" style="color: #757575;">（{{v.title}}）</p>-->
										</div>
										<div class="catalog_class_price">
											<div v-if="CourseDetails.courseType==2">
												<p class="catalog_price" v-if="v.isTry != 1">￥{{v.chapterPrice}}</p>
												<div class="catalog_buy" v-if="v.buyStatus == 2&&v.isTry != 1" @click="buySingle(v)">购买</div>
												<!--<div class="catalog_buy" style="background: #00dc91;" v-if="v.isTry == 1" @click="buySingle(v)">免费试看</div>-->
												<div class="catalog_buy" v-if="v.buyStatus == 1" style="color:#E51C23;background: #FFFFFF;">已购买本节</div>
											</div>
											<div v-if="CourseDetails.courseType==3">
												<p class="live" v-if="v.type==1">录播</p>
												<p class="live" v-if="v.type==3">直播录制回放</p>
												<p class="live" v-if="v.type==2&&v.status ==1">直播</p>
												<p class="live" v-if="v.type==2&&v.status ==2" @click="goToLive(v)">正在直播</p>
											</div>
											<div v-if="CourseDetails.courseType==4">
												<p class="live" style="color: #FAFF00;" v-if="CourseDetails.vipStatus== 2&&v.isTry != 1" @click="ifVip">立刻加入VIP</p>
											</div>
										</div>
										<div style="overflow: hidden;">
											<p class="catalog_class_time" v-if="v.type == 1||v.type == 3">时长：{{v.time}}</p>
											<p class="catalog_class_time" v-if="v.type == 2&&v.status == 2||v.type == 2&&v.status == 1">直播时间：{{v.time}}</p>
											<p class="catalog_class_time" v-if="v.isTry == 1&&CourseDetails.courseType!=3" style="color: #B3B3B3;">免费试看</p>
											<p class="catalog_class_time" v-if="v.isTry == 3&&CourseDetails.courseType!=3" style="color: #B3B3B3;">试看3分钟</p>
										</div>

									</div>
								</li>
							</ul>
						</div>
						<div class="content_left_comment" v-if="isChange==2">
							<div class="comment_input" v-if="ifInput" :style="inputStyle">
								<input v-model="inputVal" class="comment_input_val" type="text" placeholder="请输入想评论的信息" @keydown="inputKeyDowm" maxlength="200" />
								<input @click="sendCommentSubmit" class="comment_input_btn" type="button" value="完成" />
							</div>
							<div class="comment_title">
								<div class="comment_title_val">
									<div @click="ifInput_1">
										<p class="comment_title_val_icon">
											<img src="../../assets/commit.png" />
										</p>
										<p class="comment_title_val_font">说点什么...</p>
									</div>
								</div>
							</div>
							<ul class="comment_list">
								<li class="conment_item" v-for="(v,i) in comment_List">
									<div class="conment_item_info">
										<p class="conment_item_img"><img v-if="v.userInfo.avaterPath" :src="head+v.userInfo.avaterPath" /></p>
										<p class="conment_item_name">{{v.userInfo.userName}}</p>
										<p class="conment_item_time">{{v.time}}</p>
									</div>
									<div class="conment_item_val">
										<p>{{v.content}}</p>
									</div>
									<div class="conment_item_like">
										<p class="conment_item_like_font">{{v.fabulousNum}}人点赞</p>
										<p class="conment_item_like_img" @click="like(v.id,v.isFabulous)">
											<img src="../../assets/up.png" v-if="v.isFabulous == 1" />
											<img src="../../assets/notUp.png" v-else/>
										</p>
									</div>
								</li>
							</ul>
							<div class="btn_page">
								<el-pagination background layout="prev, pager, next" :total="commentTotal" @prev-click="prev" @next-click="next" @current-change="current_change"></el-pagination>
							</div>
						</div>
					</div>
				</div>
				<div class="content_rigth">
					<div class="content_right_top" v-if="CourseDetails.courseType != 4">
						<div class="content_right_top_info">
							<div class="content_right_top_info_img" @click="goToTeache(teachInfo.id)">
								<img :src="head+teachInfo.teacherPic" />
							</div>
							<div class="content_right_top_info_val">
								<p class="content_right_top_info_val_name">{{teachInfo.nickname}}</p>
								<p class="content_right_top_info_val_honor">{{teachInfo.teacherAppellation}}</p>
							</div>
						</div>
						<div class="profile">
							教师简介
						</div>
						<div class="profile_val">
							<p>{{teachInfo.abstract}}</p>
						</div>
						<div class="profile_like">
							<div class="profile_like_num">
								{{teachInfo.attention}} 人已关注
							</div>
							<div v-if="followShow" class="profile_like_btn" @click="followTeach">
								关注
							</div>
							<div v-else class="profile_like_btn" @click="followTeach" style="background: #7A7878;color: #FFFFFF;">
								已关注
							</div>
						</div>
					</div>
					<div class="content_right_top" v-else>
						<div class="content_right_top_info">
							<p style="color: #101010;font-size: 22px;">VIP权益</p>
							<div style="width: 305px;font-size: 18px;color: #101010;padding-top: 10px;" v-html="VipArticleDetail">

							</div>
						</div>

					</div>
					<div class="content_right_bottom">
						<div class="content_right_bottom_title">
							课程文件与资料
						</div>
						<li class="content_right_bottom_item" v-for="(v,i) in course_list">
							<div @click="downFile(v)" style="overflow: hidden;cursor: pointer;">
								<div class="bottom_item_icon">
									<img v-if="v.type==1" src="../../assets/files.png" />
									<img v-else src="../../assets/file.png" />
								</div>
								<div class="bottom_item_font">
									【{{v.fileName}}】<span style="font-size: 16px;color: #7D7D7D;">{{v.size}}KB</span>
								</div>
							</div>
						</li>
					</div>
				</div>
			</div>
			<PayDialog v-if="paySingle" @close="closeSingle" @changeData="changeData" :pay="true" :course="true" :single="true" :courseData="CourseDetails" :chapter="chapterItem">
			</PayDialog>
			<PayDialog v-if="pay" @close="closeDia" :pay="true" @changeData="changeData" :course="true" :courseData="CourseDetails" /></PayDialog>
		</div>
		<!--<div style="height: 160px;"></div>-->
		<div class="share" v-if="ifShare" @click="share_not">
			<div class="share_content">
				<div class="share_icon">
					<img :src="setImgae" />
				</div>
				<div class="share_title">
					<p><img src="../../assets/common_footer_logo.png" /></p>
					<h3>共享师资</h3>
				</div>
				<div class="share_font">
					打开微信，通过点击底部<br />“发现”按钮，“扫一扫”二维码后，点击弹出页面右上角的分享按钮，就可以分享给朋友们啦！
				</div>
			</div>
		</div>
		<LDialog v-show="showDialog" @closeDialog='close()'></LDialog>
		<Tips :courseId="course.id" @download="closeDownload" v-show="showDownload"></Tips>
		<Tipenrol @join="closeJoin" v-show='showJoin'></Tipenrol>
		<Tiptry :curse="course" v-show="ifTry" @close="closeifTry" @showPay="showPay" @showBuy="showBuy"></Tiptry>
		<PayDialog v-if="VipPay" @close="closeVipDia" :pay="true" :vip="true" />
		
		
		<div class="tryOver" v-if="getVip">
			<div class="tryOver_bg"></div>
			<div class="tryOver_content">
				<div class="content_top">
					<p class="close_icon" @click="close_try">
						<img src="../../assets/icon_close_white.png"/>
					</p>
					<p class="top_font">试看体验已结束</p>
					<p class="bottom_font">Hello，您正在观看的课程已达体验点， 请购买课程后继续观看，谢谢支持！</p>
				</div>
				<div class="content_btn" @click="getVip_one" >
					立刻开通VIP
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Tips from "@/components/Tips/Tips.vue"
	import Tipenrol from "@/components/Tips/Tipenrol.vue"
	import Tiptry from "@/components/Tips/Tiptry.vue"
	export default {
		components: {
			Tips,
			Tipenrol,
			Tiptry
		},
		created() {
			console.log(this.$route.query.courseId)
			console.log(this.$store.state.isLogin)
			this.$store.state.courseId = this.$route.query.courseId
			this.getIsLogin().then(() => {
				if(this.$store.state.isLogin) {
					console.log("已登陆")
					this.UserDetails()
					var obj = {
						courseId: this.$route.query.courseId,
					}
					this.getCourseCommentList(obj) //课程评论；
					this.getCourseDetails(obj) //课程详情；
					this.getChapterList({courseId: this.$route.query.courseId,li:10000}) //课程章节；
				} else if(this.$store.state.isLogin == false) {
					var obj = {
						courseId: this.$route.query.courseId,
						web: 2
					}
					this.getCourseCommentList(obj) //课程评论；
					this.getCourseDetails(obj) //课程详情；
					this.getChapterList({courseId: this.$route.query.courseId,li:10000,web: 2}) //课程章节；
					console.log("未登陆")
				}

			})

			window.scrollTo(0, 0)

			this.getVipLatinos()
			this.getCourseFileList() //课程文件目录；
		},

		watch: {
			getisLogin(a, b) {
				console.log(a, "就感觉好呢")
				if(this.$store.state.isLogin) {
					console.log("已登陆")
					this.UserDetails()
					var obj = {
						courseId: this.$route.query.courseId,
					}
					this.getCourseCommentList(obj) //课程评论；
					this.getCourseDetails(obj) //课程详情；
					this.getChapterList(obj) //课程章节；
				} else if(this.$store.state.isLogin == false) {
					var obj = {
						courseId: this.$route.query.courseId,
						web: 2
					}
					this.getCourseCommentList(obj) //课程评论；
					this.getCourseDetails(obj) //课程详情；
					this.getChapterList(obj) //课程章节；
					console.log("未登陆")
				}

			}

		},

		mounted() {
			this.setImage()
		},

		data() {
			return {
				head: this.$imgUrl,
				isChange: 0,
				CourseDetails: [],
				ChapterList: [], //目录
				teachInfo: [],
				catalog_List: [],
				comment_List: [1, 2, 3, 4, 5, 6, 7, 8],
				course_list: [],
				commentNum: 1,
				commentTotal: 0,
				courseTotal: 0,
				paySingle: false,
				pay: false,
				chapterItem: {},
				firstLive: "",
				liveUrl: '',
				play: null,
				showDialog: false,
				isBuy: 2,
				isFollow: false,
				ifFollow: false,
				ifFollowTeach: false,
				vipStatus: 2,
				followShow: true,
				isCollection: false, //未收藏
				showDownload: false,
				showJoin: false,
				ChapterListBuy: 2,
				course: {
					id: this.$route.query.courseId,
					ChapterId: 0
				},
				ifTry: false,
				ifJoin: null,
				ifInput: false,
				inputVal: "",
				isLiveUrl: "",
				VipArticleDetail: "",
				ifShare: false,
				VipPay: false,
				changVideo: null,
				setImgae: "",
				tenxunVideo: "",
				player: [],
				videoImgae: false,
				videoActived: 0,
				getVip:false
				//				videoClicked: 0,
			}
		},
		methods: {
			close_try(){
				this.getVip = false
			},
			getVip_one(){
				this.getVip = false
				this.VipPay = true
			},
			setImage() {
				var QRCode = require('qrcode')
				//微信授权重定向网址
				let newUrl = "http://pc.letar.d.aiitec.org/?from=singlemessage#/shareCourse?id=" + this.$route.query.courseId
				var that = this;
				QRCode.toDataURL(newUrl, {
					width: 100,
					height: 100, // 高度
					text: '56663159'
				}, function(err, url) {
					that.setImgae = url
				})
			},
			closeVipDia() {
				this.VipPay = false
			},
			removeClick() {
				document.getElementById('video').oncontextmenu = function() {
					return false
				}
				console.log(111)
			},
			inputKeyDowm(event) {
				if(event.keyCode == 13) {
					if(this.$store.state.isLogin) {
						this.sendCommentSubmit()
					} else {
						this.showDialog = true
					}
				}
			},
			goToTeache(id) {
				this.$router.push({
					name: "TeacherHomePage",
					query: {
						teacherId: id,
					}
				})
			},
			changeData() {
				this.UserDetails()
				var obj = {
					courseId: this.$route.query.courseId,
				}
				this.getCourseCommentList(obj) //课程评论；
				this.getCourseDetails(obj) //课程详情；
				this.getChapterList(obj) //课程章节；

			},

			share_not() {
				this.ifShare = false
			},
			share_show() {
				this.ifShare = true
			},
			getVipLatinos() {
				this.$Api.getArticleDetails({
					a: 8
				}).then((res) => {
					console.log(res)
					this.VipArticleDetail = res.q.articles.content
				})
			},
			downFile(item) {
				if(this.$store.state.isLogin) {
					if(this.CourseDetails.courseType == 4) {
						if(this.CourseDetails.vipStatus == 1) {
							window.location.href = item.fileUrl
						}
					} else {
						if(this.CourseDetails.isBuy == 1) {
							window.location.href = item.fileUrl
						} else {
							alert("请购买或报名此课程")
						}
					}
				} else {
					this.showDialog = true
				}
			},
			goToTeache(id) {
				this.$router.push({
					name: "TeacherHomePage",
					query: {
						teacherId: id,
					}
				})
			},
			goToVip() {
				this.$router.push({
					name: "Vip"
				})
			},
			current_change(val) {
				if(this.$store.state.isLogin) {
					var obj = {
						courseId: this.$route.query.courseId,
						pa: val,
					}
				} else {
					var obj = {
						courseId: this.$route.query.courseId,
						pa: val,
						web: 2
					}
				}
				this.commentNum = val
				this.getCourseCommentList(obj)
			},
			sendCommentSubmit() { //完成评论
				var obj = {
					a: 1,
					type: 1,
					courseId: this.$route.query.courseId,
					content: this.inputVal,
				}
				this.$Api.sendCommentSubmit(obj).then((res) => {
					console.log(res)
					if(res.q.s == 0) {
						this.ifInput = false;
						this.getCourseCommentList({
							courseId: this.$route.query.courseId
						})
						this.inputVal = ""
					} else {
						this.$message({
							showClose: true,
							message: "评论内容不能为空",
							type: 'error'
						});
					}
				})
			},
			ifInput_1() { //评论
				console.log(this.ifInput)
				if(this.$store.state.isLogin) {
					if(this.CourseDetails.courseType == 4) { //是不是VIP
						if(this.CourseDetails.vipStatus == 1) {
							this.ifInput = !this.ifInput
						} else {
							alert("请成为Vip")
						}
					} else {
						if(this.CourseDetails.isBuy == 1) {
							this.ifInput = !this.ifInput
						} else {
							alert("购买后才能评论")
						}
					}
				} else {
					this.showDialog = true
				}

			},
			showPay() {
				this.ifTry = false
				this.paySingle = true

			},
			showBuy() {
				this.ifTry = false
				this.buy()
			},
			ifVip() {
				if(this.$store.state.isLogin) {
					console.log(1111)
					this.VipPay = true
				} else {
					this.showDialog = true
				}
			},
			closeDownload() {
				this.showDownload = false;
			},
			closeifTry() {
				this.ifTry = false
			},
			join() {
				if(this.$store.state.isLogin) {
					this.showJoin = true;
					this.$store.state.courseId = this.$route.query.courseId
				} else {
					this.showDialog = true
				}
			},
			closeJoin() {
				this.showJoin = false;
				this.getCourseDetails({
					courseId: this.$route.query.courseId
				}) //课程详情；
			},
			async getIsLogin() {
				await this.isLogin()
			},
			isLogin() {
				var that = this
				return new Promise((resolve, reject) => {
					var timer = setInterval(get, 50)

					function get() {
						if(that.$store.state.isLogin != null) {
							clearInterval(timer)
							resolve()
						}

					}

				})

			},

			goToLive(item) {
				if(this.$store.state.isLogin) {
					if(this.isBuy == 1) {
						this.$router.push({
							name: "Live",
							query: {
								courseId: this.$route.query.courseId,
								id: this.isLiveUrl
							}
						})
					} else {
						this.chapterItem = { ...item
						}
						this.buy()
						this.$message({
							showClose: true,
							message: "请购买课程后观看",
							type: 'error'
						});

					}
				} else {
					alert("请先登录")
				}
			},
			like(id, isFabulous) { //点赞
				console.log(this.$store.state.isLogin)
				if(this.$store.state.isLogin) {
					console.log(isFabulous)
					if(isFabulous == 2) {
						var obj = {
							a: 4,
							id,
							open: 1
						}
						this.$Api.TurnSwitch(obj).then((res) => {
							if(res.q.s == 0) {
								this.getCourseCommentList({
									courseId: this.$route.query.courseId
								}) //课程评论；
							}
						})
					} else {
						var obj = {
							a: 4,
							id,
							open: 2
						}
						this.$Api.TurnSwitch(obj).then((res) => {
							if(res.q.s == 0) {
								this.getCourseCommentList({
									courseId: this.$route.query.courseId
								}) //课程评论；
							}
						})
					}

				} else {
					this.showDialog = true
				}

			},
			UserDetails() {
				this.$Api.UserDetails().then((res) => {
					console.log(res)
					if(res.q.s == 0) {
						this.vipStatus = res.q.userInfo.vipStatus
					}
				})
			},
			close() {
				this.showDialog = false
			},
			followClass() {
				if(this.$store.state.isLogin) {
					if(this.isFollow == 2) { //未关注
						var obj = {
							a: 1,
							id: this.$route.query.courseId,
							open: 1
						}
						this.$Api.TurnSwitch(obj).then((res) => {
							console.log(res)
							if(res.q.s == 0) {
								this.isCollection = !this.isCollection
							}
						})
					} else {
						var obj = {
							a: 1,
							id: this.$route.query.courseId,
							open: 2
						}
						this.$Api.TurnSwitch(obj).then((res) => {
							console.log(res)
							if(res.q.s == 0) {
								this.isCollection = !this.isCollection
							}
						})
					}
				} else {
					this.showDialog = true
				}

			},
			followTeach() {
				if(this.$store.state.isLogin) {
					if(this.followShow) {
						console.log(this.followShow, "未关注")
						var obj = {
							a: 2,
							id: this.teachInfo.id,
							open: 1
						}
						this.$Api.TurnSwitch(obj).then((res) => {
							console.log(res)
							if(res.q.s == 0) {
								this.followShow = !this.followShow
							}
						})
					} else {
						console.log(this.followShow, "关注")
						var obj = {
							a: 2,
							id: this.teachInfo.id,
							open: 2
						}
						this.$Api.TurnSwitch(obj).then((res) => {
							console.log(res)
							if(res.q.s == 0) {
								this.followShow = !this.followShow
							}
						})
					}
				} else {
					this.showDialog = true
				}

			},
			playVideo(i, type) {
				console.log('playerhdjagdjasgfjus', i)
				this.videoActived = i
				this.firstLive = this.ChapterList[i].videoUrl
				var that = this
			
					if(type == 3) { //试看3分钟
						this.tenxunVideo = this.ChapterList[i].videoUrl
						this.player[i] = new TcPlayer('id_test_video' + i, {
							"m3u8": this.firstLive,
							"m3u8": this.firstLive, //请替换成实际可用的播放地址
							"m3u8_hd": this.firstLive,
							"m3u8_sd": this.firstLive,
							"flv": this.firstLive, //增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
							"autoplay": true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
							"coverpic": this.CourseDetails.wimagePath,
							"width": '762', //视频的显示宽度，请尽量使用视频分辨率宽度
							"height": '320', //视频的显示高度，请尽量使用视频分辨率高度
							"coverpic": {
								"style": "stretch",
								"src": this.CourseDetails.wimagePath
							},
							"wording": {
								2032: "请求视频失败，请检查网络",
								2048: "请求m3u8文件失败，可能是网络错误或者跨域问题",
								2032:"获取视频失败，请检查播放链接是否有效",
								1002:"请更换浏览器或更新最新版本",
								1001:"网络错误，请检查网络配置或者播放链接是否正确"
							},
							"listener": (msg) => {
								console.log(msg)
                               if(msg.src.el.currentTime){
                               	if(msg.src.el.currentTime >= 180) {
									that.player[i].destroy()
									that.player[i] = null
									that.videoImgae = false
									that.getVip = true
								}
                               }else {
                               	if(msg.detail.watchedTime >= 180) {
									that.player[i].destroy()
									that.player[i] = null
									that.videoImgae = false
									that.getVip = true
								}
                               }
								
							}
						});
						
						//						console.log(player.currentTime)
					} else {
						this.player[i] = new TcPlayer('id_test_video' + i, {
							"m3u8": this.firstLive,
							"m3u8": this.firstLive, //请替换成实际可用的播放地址
							"m3u8_hd": this.firstLive,
							"m3u8_sd": this.firstLive,
							"flv": this.firstLive, //增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
							"autoplay": true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
							"coverpic": this.CourseDetails.wimagePath,
							"width": '762', //视频的显示宽度，请尽量使用视频分辨率宽度
							"height": '320', //视频的显示高度，请尽量使用视频分辨率高度
							"coverpic": {
								"style": "stretch",
								"src": this.CourseDetails.wimagePath
							},
							"wording": {
								2032: "请求视频失败，请检查网络",
								2048: "请求m3u8文件失败，可能是网络错误或者跨域问题",
								2032:"获取视频失败，请检查播放链接是否有效",
								1002:"请更换浏览器或更新最新版本",
								1001:"网络错误，请检查网络配置或者播放链接是否正确"
							},
							"listener": (msg) => {

							}
						});
					}
				
				
				//				if(this.changVideo != i){
				//					this.firstLive = null
				//					setTimeout(()=>{
				//						this.firstLive = this.ChapterList[i].videoUrl
				//							var that = this;
				//							setTimeout(() => {
				//								that.$refs.video.play()
				//							}, 1000)
				//					},1000)
				//					this.changVideo = i;
				//				}else{
				//					this.firstLive = this.ChapterList[i].videoUrl
				//						var that = this;
				//						setTimeout(() => {
				//							that.$refs.video.play()
				//						}, 1000)
				//				}
			},
			choise(i, courseId, type, item) {
				if(this.player[i]) {
					this.player[i].destroy()
					this.player[i] = null
					this.videoImgae = false
				}
				this.videoIndex = i
				if(this.$store.state.isLogin) {
					this.videoImgae = true
					this.chapterItem = { ...item
					}
					if(this.CourseDetails.courseType == 4) { //是否VIP课程
						console.log("VIP课程")
						if(this.vipStatus == 1) { //是VIP可以观看
							this.playVideo(i)
						} else {
							if(item.buyStatus == 1) {
								this.playVideo(i)
							} else {
								if(item.isTry == 3) {
									//										console.log("试看机会")
									//										var that = this
									//										this.firstLive = this.ChapterList[i].videoUrl
									//										setTimeout(() => {
									//											console.log(that.$refs.video)
									//											that.$refs.video.play()
									//											var timer = setInterval(() => {
									//												if(that.$refs.video.currentTime >= 180) {
									//													clearInterval(timer)
									//													that.firstLive = null
									//													that.course.ChapterId = that.ChapterList[i].id
									//													that.VipPay = true
									//													console.log(that.$refs.video.currentTime)
									//												}
									//	
									//											}, 1000)
									//	
									//										}, 1000)
									this.playVideo(i, item.isTry)
								} else if(item.isTry == 1) {
									this.playVideo(i, item.isTry)
								} else {
									this.VipPay = true
								}
							}
						}
					} else if(this.CourseDetails.courseType == 3) { //是否互动直播
						if(this.CourseDetails.isBuy == 1) {
							if(type == 2 && item.status == 2) { //是不是正在直播课程
								//							if(item.buyStatus == 1) { //是否已购买
								this.$router.push({
									name: "Live",
									query: {
										courseId: this.$route.query.courseId,
										id: this.isLiveUrl
									}
								})
								//							} else {
								//								this.paySingle = true
								//							}
							} else if(type == 2) {
								alert("请留意直播时间")
							}
							//						else {
							//							if(item.buyStatus == 1) {
							//								this.playVideo(i)
							//							} else {
							//								this.paySingle = true
							//								if(item.isTry == 3) {
							//									alert("未购买本章节,进入试看")
							//									console.log("试看机会")
							//									var that = this
							//									this.firstLive = this.ChapterList[i].videoUrl
							//									setTimeout(() => {
							//										console.log(that.$refs.video)
							//										that.$refs.video.play()
							//										var timer = setInterval(() => {
							//											if(that.$refs.video.currentTime >= 180) {
							//												clearInterval(timer)
							//												that.firstLive = null
							//												that.course.ChapterId = that.ChapterList[i].id
							//												that.ifTry = true
							//												console.log(that.$refs.video.currentTime)
							//											}
							//
							//										}, 1000)
							//
							//									}, 1000)
							//								}else if(item.isTry == 1){
							//									this.playVideo(i)
							//								}else {
							//									alert("没有试看机会")
							//								}
							//							}
							//						}
						} else {
							this.buy()
						}
					} else if(this.CourseDetails.courseType == 1) { //免费课程
						if(this.CourseDetails.isBuy == 1) {
							this.playVideo(i)
						} else {
							console.log("请报名")
							this.showJoin = true;
						}

					} else {
						console.log(this.ChapterList[i].buyStatus, "是否购买 1是 2否")
						if(this.ChapterList[i].buyStatus == 1) { //除VIP课程，看是否购买
							this.playVideo(i)
						} else {
							var that = this
							if(this.ChapterList[i].isTry == 3) {
								this.$message({
									showClose: true,
									message: "进入试看3分钟模式",
									type: 'success'
								});
								this.firstLive = this.ChapterList[i].videoUrl
								setTimeout(() => {
									console.log(that.$refs.video)
									that.$refs.video.play()
									var timer = setInterval(() => {
										if(that.$refs.video.currentTime >= 180) {
											clearInterval(timer)
											that.firstLive = null
											that.course.ChapterId = that.ChapterList[i].id
											that.ifTry = true
											console.log(that.$refs.video.currentTime)
										}

									}, 1000)

								}, 1000)
							} else if(this.ChapterList[i].isTry == 1) {
								this.playVideo(i)
							} else {
								this.firstLive = null
								alert("请购买本章节或课程")
							}
						}
					}
				} else {
					this.showDialog = true
				}

				//				this.play.play()

				//				
			},
			buy() {
				if(this.$store.state.isLogin) {
					this.pay = true
				} else {
					this.showDialog = true
					console.log("请登陆")
				}

			},
			buySingle(item) {

				this.chapterItem = { ...item
				}
				this.paySingle = true
			},
			closeSingle() {
				this.paySingle = false

			},
			closeDia() {
				this.pay = false

			},

			change(i) {
				console.log(i)
				this.isChange = i
			},

			prev() {
				console.log("上一页")
				this.commentNum--
					//				console.log(this.$route.query.courseId)
					if(this.$store.state.isLogin) {
						var obj = {
							courseId: this.$route.query.courseId,
							pa: this.commentNum,
						}
					} else {
						var obj = {
							courseId: this.$route.query.courseId,
							pa: this.commentNum,
							web: 2
						}
					}

				this.getCourseCommentList(obj)
			},
			next() {
				this.commentNum++
					//				console.log(this.$route.query.courseId)
					if(this.$store.state.isLogin) {
						var obj = {
							courseId: this.$route.query.courseId,
							pa: this.commentNum,
						}
					} else {
						var obj = {
							courseId: this.$route.query.courseId,
							pa: this.commentNum,
							web: 2
						}
					}
				this.getCourseCommentList(obj)
				console.log("下一页")
			},
			getCourseDetails(obj) {

				this.$Api.getCourseDetails(obj).then((res) => {
					console.log(res)
					this.CourseDetails = res.q.course
					this.CourseDetails.wimagePath = this.$imgUrl + this.CourseDetails.wimagePath
					this.teachInfo = res.q.course.teacher
					this.isBuy = res.q.course.isBuy
					this.isFollow = res.q.course.isCollection

					console.log(this.teachInfo.followStatus)
					if(this.teachInfo.followStatus == 2) {
						this.followShow = true
					} else {
						this.followShow = false
					}
					if(this.isFollow == 2) {
						console.log("未收藏")
						this.isCollection = false
					} else {
						console.log("已收藏")
						this.isCollection = true
					}
				})
			},
			getChapterList(obj) {

				obj.a = 1

				this.$Api.getChapterList(obj).then((res) => {

					this.ChapterList = res.q.chapters
					this.courseTotal = res.q.total
					for(var i = 0; i < res.q.chapters.length; i++) {
						if(res.q.chapters[i].type == 2 && res.q.chapters[i].status == 2) {
							this.isLiveUrl = res.q.chapters[i].id
						}
					}
					console.log(this.isLiveUrl, "正在直播的课程")
					//					this.firstLive = res.q.chapters[this.ChapterList.length-1].videoUrl
					//					console.log(this.firstLive)
				})
			},
			getCourseCommentList(id, pa) {
				this.$Api.getCourseCommentList(id, pa).then((res) => {
					console.log(res)
					this.comment_List = res.q.comment
					this.commentTotal = res.q.total
				})
			},
			getCourseFileList(id) {
				console.log(id)
				this.$Api.getCourseFileList({
					courseId: this.$route.query.courseId
				}).then((res) => {
					console.log(res)
					this.course_list = res.q.files

				})
			}
		},
		computed: {
			bottomStyle() {
				if(this.isChange == 0) {
					return {
						"left": "0%"
					}
				} else if(this.isChange == 1) {
					return {
						"left": "200px"
					}
				} else if(this.isChange == 2) {
					console.log("变变变")
					return {
						"left": "400px"
					}
				}
			},
			inputStyle() {
				if(this.ifInput) {
					return {
						"width": "100%"
					}
				} else {
					return {
						"width": "0"
					}
				}
			},
			getisLogin() {
				return this.$store.state.isLogin

			}
		},
	}
</script>

<style scoped="scoped">
	.share {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .5);
	}
	
	.share_icon {
		width: 160px;
		height: 160px;
		margin: 0 auto;
	}
	
	.share_title {
		margin: 0 auto;
		width: 180px;
		display: flex;
	}
	
	.share_font {
		width: 198px;
		font-size: 16px;
		margin: 0 auto;
	}
	
	.share_title p {
		width: 63px;
		height: 56px;
	}
	
	.share_title h3 {
		font-size: 28px;
		color: #101010;
		line-height: 56px;
	}
	
	.share_content {
		position: fixed;
		box-sizing: border-box;
		width: 280px;
		height: 420px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		z-index: 2000;
		border-radius: 20px;
		padding-top: 40px;
	}
	
	.test img {
		width: 100%;
	}
	
	li {
		list-style: none;
	}
	
	img {
		width: 100%;
		height: 100%;
	}
	
	.warp {
		background: #f3f3f3;
		padding-top: 20px;
		width: 1280px;
		margin: 0 auto;
		padding-left: 10px;
	}
	
	.top {
		background: #FFFFFF;
	}
	
	.top_step {
		font-size: 20px;
	}
	
	.top_content {
		padding: 24px 0;
		display: flex;
		margin: 0 auto;
	}
	
	.top_content_img {
		width: 60%;
		height: 320px;
		background: #2B1773;
		position: relative;
	}
	.top_content_font{
		position: absolute;
	    bottom: 0;
	    width: 70%;
	    left: 50px;
	    height: 48px;
	    text-align: center;
	    font-size: 16px;
	    line-height: 48px;
	    color: #fff;
	}
	.top_content_img img {
		position: absolute;
		top: 0;
	}
	
	.top_content_detail {
		width: 40%;
		padding-left: 25px;
	}
	
	.pay_top_box {
		overflow: hidden;
	}
	
	.className {
		font-size: 25px;
	}
	
	.classFlag {
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #FFFFFF;
		background: #BBBBBB;
		border: 1px solid #7A7878;
		margin: 13px 0;
		font-size: 16px;
		float: left;
		padding: 0 5px;
	}
	
	.classLook {
		padding: 5px 0;
		font-size: 16px;
		color: #7A7878;
		overflow: hidden;
	}
	
	.classLook li {
		float: left;
	}
	
	.classLook_1 {
		padding-right: 13px;
	}
	
	.classLook_3 {
		padding: 0 13px;
	}
	
	.classLook_5 {
		overflow: hidden;
		padding: 0 13px;
		cursor: pointer;
	}
	
	.classLook_5_img {
		width: 16px;
		height: 17px;
		float: left;
		/*background: salmon;*/
		margin-top: 2px;
	}
	
	.classLook_5 font {
		padding-left: 9px;
	}
	
	.classLook_6_img {
		width: 14px;
		height: 14px;
		float: left;
		/*background: salmon;*/
		margin-top: 3px;
	}
	
	.classLook_6:hover {
		cursor: pointer;
	}
	
	.classLook_6 font {
		padding-left: 9px;
	}
	
	.classLook_2 {
		width: 1px;
		height: 23px;
		background: #7A7878;
	}
	
	.class_price {
		padding: 30px 15px;
		font-size: 20px;
		color: #ff9401;
	}
	
	.class_btn {
		padding-top: 92px;
	}
	
	.class_btn p {
		width: 120px;
		height: 50px;
		background: #3BA6F8;
		color: #FFFFFF;
		font-size: 20px;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		float: left;
	}
	
	.class_btn p:hover {
		cursor: pointer;
	}
	
	.class_vip {
		font-size: 20px;
		color: red;
		padding-top: 20px;
	}
	
	.Vipclass_btn {
		cursor: pointer;
		overflow: hidden;
	}
	
	.Vipclass_btn p {
		width: 210px;
		height: 50px;
		background: #3BA6F8;
		color: #FFFFFF;
		font-size: 20px;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		float: left;
	}
	
	.content {
		padding: 40px 0;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		width: 1280px;
	}
	
	.content_left {
		background: #FFFFFF;
		width: 750px;
	}
	
	.content_rigth {
		width: 36%;
	}
	
	.content_left_top {
		overflow: hidden;
		position: relative;
	}
	
	video::-webkit-media-controls-enclosure {
		overflow: hidden;
	}
	
	video::-webkit-media-controls-panel {
		width: calc(100% + 30px);
	}
	
	.live_btn {
		width: 90px;
		height: 135px;
		position: absolute;
		left: 0;
		right: 0;
		top: 80px;
		bottom: 0;
		margin: 0 auto;
		text-align: center;
		font-size: 22px;
		color: #FFFFFF;
	}
	
	.live_btn:hover {
		cursor: pointer;
	}
	
	.live_btn p {
		padding-top: 10px;
	}
	
	.live_btn_img {
		width: 90px;
		height: 90px;
	}
	
	.live_btn_img img{
		width: 100%;
		position: relative;
	}
	.live {
		width: 120px;
		height: 30px;
		border-radius: 14px;
		color: #FFFFFF;
		background: #3BABF5;
		font-size: 16px;
		text-align: center;
		line-height: 30px;
	}
	
	.content_left_top li {
		float: left;
		width: 200px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 22px;
	}
	
	.content_left_top li:hover {
		color: #3BA6F8;
		cursor: pointer;
	}
	
	.active_coler {
		color: #3BA6F8;
	}
	
	.active {
		position: absolute;
		width: 200px;
		height: 5px;
		background: #3BA6F8;
		top: 0;
		transition: .5s;
	}
	
	.content_left_detail {
		padding: 20px 40px 50px 0;
		box-sizing: border-box;
		width: 700px;
	}
	
	.content_left_detail div img {
		width: 100% !important;
		height: 100% !important;
	}
	/*目录*/
	
	.content_left_catalog {
		padding: 20px 10px 50px 10px;
	}
	
	.catalog_titel {
		font-size: 20px;
		color: #757575;
	}
	
	.catalog_content li {
		padding: 10px 0;
		overflow: hidden;
	}
	
	.catalog_num {
		float: left;
		height: 50px;
		font-size: 24px;
		line-height: 35px;
	}
	
	.catalog_class {
		padding-left: 10px;
		position: relative;
	}
	
	.catalog_class_title_box {
		overflow: hidden;
		width: 600px;
		cursor: pointer;
	}
	
	.catalog_class_title_one {
		float: left;
		font-size: 24px;
	}
	
	.catalog_class_title {
		font-size: 24px;
		word-wrap: break-word;
		float: left;
	}
	
	.catalog_class_price {
		overflow: hidden;
		position: absolute;
		right: 0;
		top: 15px;
	}
	
	.catalog_price {
		float: left;
		text-align: center;
		line-height: 30px;
		color: #FF9800;
		padding-right: 20px;
	}
	
	.catalog_buy {
		float: left;
		background: #3BABF5;
		color: #FFFFFF;
		text-align: center;
		line-height: 30px;
		width: 70px;
		border-radius: 5px;
		cursor: pointer;
	}
	
	.catalog_class_time {
		color: #757575;
		font-size: 16px;
		padding-top: 5px;
		float: left;
		padding-right: 40px;
	}
	/*评论*/
	
	.content_left_comment {
		padding: 10px 20px 50px 20px;
		position: relative;
	}
	
	.comment_input {
		width: 100%;
		height: 50px;
		transition: 5s all;
	}
	
	.comment_input_btn {
		width: 100px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		border: none;
		outline: none;
		font-size: 20px;
		cursor: pointer;
		color: #FFFFFF;
		background: #3BA6F8;
		border-radius: 5px;
	}
	
	.comment_input_val {
		width: 600px;
		height: 50px;
		border: none;
		font-size: 20px;
	}
	
	.conment_item {
		border-bottom: 1px solid #B3B3B3;
		position: relative;
		margin-bottom: 20px;
	}
	
	.comment_title {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.comment_title_val {
		float: right;
		overflow: hidden;
	}
	
	.comment_title_val_icon {
		width: 22px;
		height: 25px;
		/*background: skyblue;*/
		float: left;
	}
	
	.comment_title_val_font {
		padding: 0 10px;
		font-size: 16px;
		float: left;
	}
	
	.conment_item_info {
		font-size: 16px;
		overflow: hidden;
	}
	
	.conment_item_img {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #707070;
		float: left;
		overflow: hidden;
	}
	
	.conment_item_name {
		padding: 0 10px;
		float: left;
		line-height: 36px;
	}
	
	.conment_item_time {
		color: #808080;
		font-size: 14px;
		float: right;
		line-height: 36px;
	}
	
	.conment_item_val {
		padding: 20px 0 20px 65px;
	}
	
	.conment_item_val p {
		width: 350px;
		font-size: 16px;
		line-height: 25px;
		word-wrap: break-word
	}
	
	.conment_item_like {
		overflow: hidden;
		position: absolute;
		right: 0;
		bottom: 17px;
	}
	
	.conment_item_like_font {
		float: left;
		padding: 0 8px;
		font-size: 14px;
		color: #808080;
	}
	
	.conment_item_like_img {
		float: left;
		width: 14px;
		height: 16px;
		/*background: #3BA6F8;*/
	}
	
	.conment_item_like_img:hover {
		cursor: pointer;
	}
	
	.btn_page {
		width: 100%;
		margin: 0 auto;
		text-align: center;
	}
	/*老师简介*/
	
	.content_right_top {
		background: #FFFFFF;
	}
	
	.content_right_top_info {
		padding: 20px 0 23px 10px;
		overflow: hidden;
	}
	
	.content_right_top_info_img {
		width: 80px;
		height: 80px;
		background: #7A7878;
		border-radius: 50%;
		float: left;
		overflow: hidden;
		cursor: pointer;
	}
	
	.content_right_top_info_val {
		float: left;
		font-size: 18px;
		padding-left: 5px;
		padding-top: 10px;
	}
	
	.content_right_top_info_val_name {
		color: #3BA6F8;
	}
	
	.profile {
		font-size: 14px;
		color: #7A7878;
		padding-left: 23px;
	}
	
	.profile_val {
		font-size: 18px;
		padding: 0 26px;
	}
	
	.profile_val p {
		padding: 16px 50px 9px 35px;
		width: 216px;
		border-bottom: 1px solid #BBBBBB;
	}
	
	.profile_like {
		padding: 46px 16px 32px 150px;
		overflow: hidden;
	}
	
	.profile_like_num {
		font-size: 16px;
		padding-right: 16px;
		color: #707070;
		float: left;
	}
	
	.profile_like_btn {
		font-size: 14px;
		width: 54px;
		height: 29px;
		line-height: 29px;
		text-align: center;
		color: #FAFF00;
		background: #3BA6F8;
		float: left;
		border-radius: 14px;
	}
	
	.profile_like_btn:hover {
		cursor: pointer;
	}
	/*课程文件与资料*/
	
	.content_right_bottom {
		padding: 23px 10px;
		background: #FFFFFF;
	}
	
	.content_right_bottom_title {
		font-size: 22px;
	}
	
	.content_right_bottom_item {
		overflow: hidden;
		padding-top: 20px;
	}
	
	.bottom_item_icon {
		float: left;
		width: 20px;
		height: 18px;
		margin-top: 5px;
	}
	
	.bottom_item_font {
		float: left;
		font-size: 18px;
		padding-left: 22px;
		color: #000000;
	}
	.tryOver{
		position: relative;	
	}
	.tryOver_bg{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .5);
	}
	.tryOver_content{
		position: fixed;
		box-sizing: border-box;
		width: 377px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		z-index: 2000;
		border-radius: 10px;
	}
	.content_top{
		width: 100%;
		height: 150px;
		border-bottom: 1px solid #BBBBBB;
		font-size: 20px;
		position: relative;
	}
	.top_font{
				text-align: center;
				line-height: 50px;
				color: #101010;
			}
		.close_icon{
			position: absolute;
			width: 20px;
			height: 20px;
			top: 10px;
			right: 10px;
			border-radius: 50%;
			/*background-image: url(../../assets/icon_close_white.png) no-repeat;*/
			background-color: #101010;
			/*background-size: 50%;*/
			cursor: pointer;
			font-size: 0;
		}
		.close_icon img{
			width: 50%;
			height: 65%;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			margin:auto;
		}
		.close_icon:hover{
				transform: rotate(90deg);
				transition: 0.5s;
		}
		.bottom_font{
				line-height: 30px;
				font-size: 18px;
				color: #808080;
				padding: 0 32px;
			}
		.content_btn{
			text-align: center;
			line-height: 50px;
			color: #3BABF5;
			font-size: 20px;
			cursor: pointer;
			color: #28A3F4;
		}

</style>
<style lang="css">
	.test img {
		width: 100%;
	}
	.top_content_img .vcp-error-tips{
		/*color: orange;*/
		font-size: 30px;
	}
</style>