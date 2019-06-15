<template>
	<div id="PayDialog">
		<div class="mask"></div>
		<div class="content" v-show="flag">
			<div class="top">
				<span v-if="!evaluate">提示</span>
				<span v-if="evaluate">评价</span>
				<i @click="close"></i>
			</div>

			<div class="AddBox" v-if="add">
				<div class="title">
					添加银行卡
				</div>
				<div class="bottom">
					<div class="left">
						<li>真实姓名:</li>
						<li>银行卡号:</li>
						<li>银行名称:</li>
						<li>支行名称:</li>
						<!--<li>手机号码:</li>
            			<li>验证码:</li>-->
					</div>
					<div class="right">
						<li>
							<input type="text" style="width: 120px;" placeholder="请输入姓名" v-model="cardUserName" />

						</li>
						<li>
							<input type="tel" maxlength="19" placeholder="请输入银行卡号" v-model="cardNum" @blur="blurBank" />
						</li>
						<li>
							<input type="text" placeholder="自动识别银行卡号生成" v-model="bankName" />
						</li>
						<li>
							<input type="text" placeholder="请输入支行名称" v-model="bankAddress" />
						</li>
						<!--<li>
            				<input type="tel" maxlength="11" placeholder="请输入手机号码"/>
            			</li>
            			<li>
            				<input type="tel" maxlength="6" style="width: 120px;"  placeholder="请输入验证码"/>
            				<div class="btn" @click="getCode" v-if="code<=0">获取验证码</div>
            				<div class="btn" v-if="code>0">{{code}}</div>
            			</li>-->

					</div>

				</div>

				<div class="comfirm" @click="comfirmBank">确定</div>
			</div>

			<div class="VipBox" v-if="evaluate">
				<div class="midBox">
					<div class="imgBox">
						<img :src="courseItem.wimagePath" />
					</div>
					<div class="titleBox">
						<p>{{courseItem.name}}</p>
						<p>{{courseItem.teacher.nickname}}</p>
					</div>

				</div>

			</div>
			<div class="evaluateBox" v-if="evaluate">
				<div class="point">
					<span>评分</span>

					<el-rate v-model="value1" @change="changeRate"></el-rate>

				</div>

				<div class="text">
					<span>评语</span>
					<textarea v-model="evaText"></textarea>
				</div>

				<div class="btnBox">

					<div @click="close">放弃</div>
					<div @click="submitEva">提交</div>
				</div>

			</div>

			<div class="VipBox" v-if="course">
				<div class="pay">
					<div class="imgBox">
						<img :src="courseData.wimagePath" />
					</div>
					<div class="title">
						<p>{{courseData.name}}</p>
						<p>{{courseData.teacher.nickname}}</p>
					</div>
					<div class="price" v-if="single">￥{{chapter.chapterPrice}}/永久</div>
					<div class="price" v-else>￥{{courseData.price}}/永久</div>
				</div>
				<div class="single" v-if="single">
					{{chapter.title}}
				</div>
				<div class="totalPrice">
					<div class="left">
						<li>开通时长</li>
						<li>应付</li>

					</div>
					<div class="right">
						<li>永久</li>
						<li v-if="single">￥{{chapter.chapterPrice}}</li>
						<li v-else>￥{{courseData.price}}</li>
					</div>

				</div>

			</div>

			<div class="VipBox" v-if="vip">
				<div class="title">
					<i></i>
					<span>共享师资VIP会员</span>
				</div>
				<div class="bottom">
					<div class="left">
						<li>开通时长</li>
						<li>应付</li>
					</div>
					<div class="right">
						<select @change="select">
							<option v-for="(item,index) in vipArr">{{item}}</option>

						</select>
						<p style="margin-bottom: 30px;">￥{{VipIndex*VipPrice}}</p>
					</div>
				</div>

			</div>
			<div class="payBox" v-if="pay">
				<p class="title">支付方式</p>
				<div class="way">
					<li>
						<div :class="payIndex==0?'active':''" @click="change(0)"></div>
						<span>余额支付</span>
					</li>
					<li style="margin-left: 60px;">
						<div :class="payIndex==1?'active':''" @click="change(1)"></div>
						<span>微信支付</span>

					</li>
					<li style="margin-left: 60px;">
						<div :class="payIndex==2?'active':''" @click="change(2)"></div>
						<span>支付宝支付</span>

					</li>
				</div>
				<div class="Count" v-if="payIndex==0">
					<div class="first">
						<i></i>
						<span>当前余额:￥{{user.balance}}</span>
					</div>
					<div class="second">
						<span v-if="balance>0">支付剩余:￥{{balance}}</span>
						<span v-if="balance<0">余额不足，请进行充值</span>
					</div>
					<div class="third">
						<span @click="goBuy">余额充值</span>
					</div>

				</div>
				<div style="height: 50px;" v-if="payIndex==1||payIndex==2">
					<!--<div class="qeImg">
						<img :src="wxImg" v-if="wxImg!=''" />
						<p>微信扫一扫支付</p>
					</div>-->

				</div>
				<!--<div class="qeBox" v-if="payIndex==2">
					<div class="qeImg" id="zbSubmit">
						<img :src="zbImg" />

						<p>支付宝扫一扫支付</p>
					</div>

				</div>-->
				<div class="payBtn" @click="submit">马上支付</div>
			</div>
		</div>
		<div class="qeBox" v-if="!flag">
			<img :src="wxImg" v-if="wxImg!=''" />
			<p>微信扫一扫支付</p>

			<div class="btnBox">
				<div class="btn" @click="Paysuccess">我已支付</div>
				<div class="btn" @click="cancelPay">取消</div>
			</div>
		</div>

	</div>
</template>

<script>
	//	import BCI from '../../plugin/CheckBank';
	export default {
		props: {
			evaluate: {
				type: Boolean,
				default: false,
				required: false
			},
			pay: {
				type: Boolean,
				default: false,
				required: false
			},
			vip: {
				type: Boolean,
				default: false,
				required: false

			},
			course: {
				type: Boolean,
				default: false,
				required: false

			},
			single: {
				type: Boolean,
				default: false,
				required: false

			},
			add: {
				type: Boolean,
				default: false,
				required: false

			},
			courseData: {
				type: Object,
				default: function() {
					return {}
				},
				required: false

			},
			chapter: {
				type: Object,
				default: function() {
					return {}
				},
				required: false

			},
			courseItem: {
				type: Object,
				default: function() {
					return {}
				},
				required: false
			}

		},

		data() {
			return {
				payIndex: 0,
				wxImg: '',
				zbImg: '',

				value1: 5,
				evaText: '',
				user: {},
				balance: 0,
				VipPrice: 0,
				vipArr: [
					"一年", "两年", "三年"

				],
				VipIndex: 1,
				a: 0,
				code: 0,
				cardUserName: "",
				bankName: "",
				bankAddress: "",
				cardNum: "",
				flag: true,
				timer: null,
				head: "http://letar.t.aiitec.org"
			}
		},
		created() {

			if(this.vip) {
				this.a = 1
			}
			if(this.single) {
				this.a = 3
			} else if(this.course) {
				this.a = 2
			}

			if(this.vip) {
				this.getPrice()

			} else {

				if(JSON.stringify(this.$store.state.user) != "{}") {
					this.user = { ...this.$store.state.user
					}
					if(this.single) {
						this.balance = this.sub(this.user.balance , this.chapter.chapterPrice)
					} else if(this.course) {
						this.balance = this.sub(this.user.balance , this.courseData.price)
					} else if(this.vip) {
						this.balance =  this.sub(this.user.balance , this.VipPrice * this.VipIndex)
					}
				} else {
					this.getUserDetails()
				}

			}

		},
		methods: {
			goBuy() {
				this.$emit("close")
				this.$router.push({

					name: "Recharge",
					query: {
						index: 5
					}

				})

			},

			luhnCheck(bankno) {
				var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）

				var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
				var newArr = new Array();
				for(var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
					newArr.push(first15Num.substr(i, 1));
				}
				var arrJiShu = new Array(); //奇数位*2的积 <9
				var arrJiShu2 = new Array(); //奇数位*2的积 >9

				var arrOuShu = new Array(); //偶数位数组
				for(var j = 0; j < newArr.length; j++) {
					if((j + 1) % 2 == 1) { //奇数位
						if(parseInt(newArr[j]) * 2 < 9)
							arrJiShu.push(parseInt(newArr[j]) * 2);
						else
							arrJiShu2.push(parseInt(newArr[j]) * 2);
					} else //偶数位
						arrOuShu.push(newArr[j]);
				}

				var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
				var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
				for(var h = 0; h < arrJiShu2.length; h++) {
					jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
					jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
				}

				var sumJiShu = 0; //奇数位*2 < 9 的数组之和
				var sumOuShu = 0; //偶数位数组之和
				var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
				var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
				var sumTotal = 0;
				for(var m = 0; m < arrJiShu.length; m++) {
					sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
				}

				for(var n = 0; n < arrOuShu.length; n++) {
					sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
				}

				for(var p = 0; p < jishu_child1.length; p++) {
					sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
					sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
				}
				//计算总和
				sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

				//计算luhn值
				var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
				60
				var luhn = 10 - k;

				if(lastNum == luhn) {
					console.log("验证通过");
					return true;
				} else {
					this.$message({
						showClose: true,
						message: '银行卡号必须符合luhn校验',
						type: 'error'
					});

					return false;
				}
			},

			//检查银行卡号
			CheckBankNo(bankno) {
				var bankno = bankno.replace(/\s/g, '');
				if(bankno == "") {
					this.$message({
						showClose: true,
						message: '请填写银行卡号',
						type: 'error'
					});

					return false;
				}
				
				var num = /^\d*$/; //全数字
				if(!num.exec(bankno)) {

					this.$message({
						showClose: true,
						message: '银行卡号必须全为数字',
						type: 'error'
					});
					return false;
				}
				//开头6位
				var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
				if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
					this.$message({
						showClose: true,
						message: '银行卡号开头6位不符合规范',
						type: 'error'
					});
					return false;
				}
//				//Luhn校验
//				if(!this.luhnCheck(bankno)) {
//					return false;
//				}
				return true;
			},

			cancelPay() {
				clearInterval(this.timer)
				this.flag = true

			},
			Paysuccess() {
				clearInterval(this.timer)
				this.flag = true
				this.$emit('close')
			},

			blurBank() {
				this.CheckBankNo(this.cardNum)

				this.$Api.GetCardName({
					cardNumber: this.cardNum
				}).then((res) => {
					if(res.q.name != "") {
						this.bankName = res.q.name
					}
					console.log(res)
				})

			},

			comfirmBank() {
				var obj = {
					cardUserName: this.cardUserName,
					bankName: this.bankName,
					bankAddress: this.bankAddress,
					cardNum: this.cardNum
				}
				var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
					regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

				if(this.cardUserName == "" || regEn.test(this.cardUserName) || regCn.test(this.cardUserName)) {
					this.$message({
						showClose: true,
						message: '请输入您的真实姓名',
						type: 'error'
					});
					return false;
				}

				this.CheckBankNo(this.cardNum)

				if(this.bankAddress == "") {
					this.$message({
						showClose: true,
						message: '请输入银行支行名称',
						type: 'error'
					});
					return false;

				}

				this.$Api.AddBankCard(obj).then((res) => {
					console.log(res)
					if(res.q.s == 0) {

						this.$message({
							showClose: true,
							message: '添加成功',
							type: 'success'
						});
                     this.$emit('close')
					}else{
						this.$message({
							showClose: true,
							message: res.q.d,
							type: 'error'
						});
						
						
					}
				})

			},

			getCode() {

				this.code = 60
				this.countDown()

			},
			countDown() {
				var cd = setInterval(() => {
					if(this.code < 1) {
						this.code = 0;

						clearInterval(cd);
					} else {
						this.code--;

					}

				}, 1000)

			},

			getPrice() {
				this.$Api.ArticleDetails({
					a: 14
				}).then((res) => {
					console.log(res)
					this.VipPrice = Number(res.q.articles.content)
					if(JSON.stringify(this.$store.state.user) != "{}") {
						this.user = { ...this.$store.state.user
						}
						if(this.single) {
						this.balance = this.sub(this.user.balance , this.chapter.chapterPrice)
					} else if(this.course) {
						this.balance = this.sub(this.user.balance , this.courseData.price)
					} else if(this.vip) {
						this.balance =  this.sub(this.user.balance , this.VipPrice * this.VipIndex)
					}
					} else {
						this.getUserDetails()
					}
				})

			},

			getUserDetails() {

				this.$Api.UserDetails().then((res) => {
					if(res.q.s == 0) {

						this.user = { ...res.q.userInfo
						}
						if(this.user.avatarPath != "") {
							this.user.avatarPath = this.$imgUrl + this.user.avatarPath
						} else {
							this.user.avatarPath = require('../../assets/common_footer_logo.png')
						}
						this.$store.dispatch('changeUser', this.user)
						if(this.single) {
							this.balance = this.user.balance - this.chapter.chapterPrice
						} else if(this.course) {
							this.balance = this.user.balance - this.courseData.price
						} else if(this.vip) {
							this.balance = this.user.balance - this.VipPrice * this.VipIndex
						}

					}

				})

			},

			submit() {

				if(this.payIndex == 0) {
					var obj = {

						a: this.a,
						payment: 3

					}
					if(this.balance<0){
                	this.$message({
								showClose: true,
								message: '余额不足',
								type: 'error'
							});
                        return ;
                	
                }
					
				} else if(this.payIndex == 2) {
					var obj = {

						a: this.a,
						payment: 1

					}
				} else if(this.payIndex == 1) {
					var obj = {

						a: this.a,
						payment: 2

					}
				}
                
                
                
				if(this.single) {
					obj.chapterId = this.chapter.id
				} else if(this.course) {
					obj.courseId = this.courseData.courseId
				}
				if(this.vip) {
					obj.payNum = this.VipIndex
				}

				this.$Api.PaySubmit(obj).then((res) => {
					if(res.q.s == 0) {
						if(this.payIndex == 2) {
							window.location.href = res.q.aliPay
						} else if(this.payIndex == 1) {
							this.flag = false
							var that = this
							this.timer = setInterval(() => {
								var obj = {
									id: res.q.id
								}
								this.$Api.GetOrderStatus(obj).then((res) => {
									if(res.q.s == 0) {
										if(res.q.orderStatus == 2) {

											this.flag = true
											this.$emit('close')
                                            this.$emit('changeData')
											this.$message({
												showClose: true,
												message: '购买成功',
												type: 'success'
											});
											clearInterval(this.timer)

										}

									}

									console.log(res)
								})

							}, 2000)

							var QRCode = require('qrcode')

							//微信授权重定向网址
							let newUrl = res.q.wxPay.code_url

							QRCode.toDataURL(newUrl, {
								width: 100,
								height: 100, // 高度
								text: '56663159'
							}, function(err, url) {
								console.log(url)
								that.wxImg = url

							})
						} else {
							this.$emit('close')
							this.$emit('changeData')
							this.$message({
								showClose: true,
								message: '购买成功',
								type: 'success'
							});

						}

					} else {
						this.$message({
							showClose: true,
							message: res.q.d,
							type: 'error'
						});

					}
				})

			},
			change(num) {
				this.payIndex = num

			},
			close() {
				this.$emit('close')

			},
			changeRate(e) {

				this.value1 = e

			},
			select(e) {
				console.log(e.target.value)
				if(e.target.value == "一年") {
					this.VipIndex = 1

				} else if(e.target.value == "两年") {
					this.VipIndex = 2
				} else if(e.target.value == "三年") {
					this.VipIndex = 3
				}
				this.balance = this.sub(this.user.balance, this.VipPrice * this.VipIndex)
			},

			submitEva() {
				var obj = {
					courseId: this.courseItem.courseId,
					content: this.evaText,
					starrating: this.value1
				}
				if(this.evaText == "") {
					this.$message({
						showClose: true,
						message: '评语不能为空',
						type: 'error'
					});
					return;

				}

				this.$Api.CourseEvaluateSubmit(obj).then((res) => {
					if(res.q.s == 0) {
						this.$message({
							showClose: true,
							message: '评论成功',
							type: 'success'
						});

						this.$emit('changeData')
						setTimeout(() => {
							this.$emit('close')
						}, 500)

					} else {

						this.$message({
							showClose: true,
							message: '评论失败',
							type: 'error'
						});
					}

				})

			},
			sub(num1,num2){
            var r1,r2,m,n;
            try{r1=num1.toString().split(".")[1].length}catch(e){r1=0}
            try{r2=num2.toString().split(".")[1].length}catch(e){r2=0}
            n = (r1>=r2)?r1:r2;
            m = Math.pow(10,Math.max(r1,r2));
            return ((num1*m - num2*m)/m).toFixed(n);
        }
			
		}

	}
</script>

<style scoped="scoped" lang="scss">
	#PayDialog {
		position: relative;
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 2000;
			background: rgba(0, 0, 0, .5);
		}
		.qeBox {
			position: fixed;
			box-sizing: border-box;
			width: 500px;
			height: 360px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			z-index: 2000;
			text-align: center;
			border-radius: 20px;
			img {
				width: 180px;
				height: 180px;
				margin-top: 30px;
			}
			p {
				font-size: 14px;
			}
			.btnBox {
				display: flex;
				margin-top: 40px;
				.btn {
					width: 120px;
					height: 40px;
					background: #3BABF5;
					color: #FFFFFF;
					text-align: center;
					line-height: 40px;
					font-size: 18px;
					border-radius: 5px;
					cursor: pointer;
				}
				.btn:first-child {
					margin-left: 80px;
				}
				.btn:last-child {
					margin-left: 100px;
				}
			}
		}
		.content {
			position: fixed;
			box-sizing: border-box;
			width: 700px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			z-index: 2000;
			.top {
				height: 38px;
				background: #28A3F4;
				text-indent: 12px;
				position: relative;
				span {
					color: #FFFFFF;
					font-size: 16px;
					line-height: 38px;
				}
				i {
					width: 22px;
					height: 22px;
					background: url(../../assets/icon_close_whites.png) no-repeat;
					background-size: 100%;
					position: absolute;
					right: 8px;
					top: 8px;
					cursor: pointer;
				}
			}
			.AddBox {
				width: 610px;
				margin: auto;
				.title {
					padding: 40px;
					font-size: 28px;
				}
				.bottom {
					display: flex;
					.left {
						width: 165px;
						li {
							list-style: none;
							text-align: right;
							margin-bottom: 40px;
							font-size: 18px;
						}
					}
					.right {
						margin-left: 23px;
						li {
							list-style: none;
							margin-bottom: 36px;
							display: flex;
							input {
								width: 250px;
								height: 30px;
								font-size: 16px;
								text-indent: 11px;
								outline: none;
							}
							.btn {
								width: 110px;
								height: 30px;
								border: 1px solid #B3B3B3;
								border-radius: 5px;
								text-align: center;
								line-height: 30px;
								font-size: 14px;
								color: #3BABF5;
								margin-left: 23px;
								cursor: pointer;
							}
						}
					}
				}
				.comfirm {
					width: 120px;
					height: 40px;
					border-radius: 5px;
					background: #3BABF5;
					font-size: 18px;
					color: #FFFFFF;
					text-align: center;
					line-height: 40px;
					margin: auto;
					margin-bottom: 30px;
					cursor: pointer;
				}
			}
			.VipBox {
				width: 610px;
				margin: auto;
				border-bottom: 1px solid #BBBBBB;
				.pay {
					padding-top: 20px;
					padding-bottom: 20px;
					box-sizing: border-box;
					display: flex;
					position: relative;
					.imgBox {
						width: 220px;
						height: 123px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.title {
						width: 165px;
						margin-left: 20px;
						position: relative;
						p {
							font-size: 18px;
						}
						p:last-child {
							color: #808080;
							position: absolute;
							bottom: 0;
						}
					}
					.price {
						position: absolute;
						bottom: 20px;
						right: 0;
						font-size: 18px;
						color: #FF9800;
					}
				}
				.single {
					font-size: 20px;
					margin-bottom: 30px;
				}
				.totalPrice {
					display: flex;
					.left {
						width: 80px;
						list-style: none;
						li {
							font-size: 18px;
							font-weight: bold;
							text-align: right;
							margin-bottom: 36px;
						}
					}
					.right {
						margin-left: 54px;
						list-style: none;
						li {
							color: #E51C23;
							font-size: 18px;
							margin-bottom: 36px;
						}
					}
				}
				.midBox {
					width: 410px;
					margin: 20px auto;
					display: flex;
					margin-bottom: 30px;
					.imgBox {
						width: 220px;
						height: 123px;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.titleBox {
						width: 165px;
						margin-left: 20px;
						position: relative;
						p {
							font-size: 18px;
						}
						p:last-child {
							color: #808080;
							position: absolute;
							bottom: 0;
						}
					}
				}
				.title {
					height: 120px;
					i {
						width: 65px;
						height: 65px;
						background: url(../../assets/common_footer_logo.png) no-repeat;
						background-size: 100%;
						float: left;
						margin-top: 30px;
					}
					span {
						font-size: 28px;
						float: left;
						margin-top: 40px;
						margin-left: 6px;
					}
				}
				.bottom {
					display: flex;
					.left {
						width: 75px;
						text-align: right;
						font-size: 18px;
						font-weight: bold;
						li {
							list-style: none;
						}
						li:first-child {
							margin-bottom: 30px;
						}
					}
					.right {
						margin-left: 38px;
						select {
							width: 160px;
							height: 30px;
							border: 1px solid #BBBBBB;
							border-radius: 5px;
							font-size: 16px;
						}
						p {
							text-align: center;
							font-size: 20px;
							color: #E51C23;
							margin-top: 27px;
						}
					}
				}
			}
			.evaluateBox {
				width: 610px;
				margin: auto;
				padding-top: 30px;
				box-sizing: border-box;
				.point {
					display: flex;
					span {
						font-size: 18px;
						font-weight: bold;
						margin-left: 36px;
					}
					.el-rate {
						margin-left: 54px;
						position: relative;
						top: 4px;
					}
				}
				.text {
					display: flex;
					margin-top: 36px;
					margin-bottom: 45px;
					span {
						font-size: 18px;
						font-weight: bold;
						margin-left: 36px;
					}
					textarea {
						margin-left: 54px;
						width: 300px;
						height: 200px;
						resize: none;
						outline: none;
					}
				}
				.btnBox {
					display: flex;
					margin-bottom: 30px;
					div {
						width: 100px;
						height: 40px;
						text-align: center;
						font-size: 18px;
						line-height: 40px;
						border-radius: 5px;
						cursor: pointer;
					}
					div:first-child {
						background: #CCCCCC;
						margin-left: 150px;
					}
					div:last-child {
						margin-left: 50px;
						background: #3BABF5;
						color: #FFFFFF;
					}
				}
			}
			.payBox {
				width: 610px;
				margin: auto;
				padding-top: 30px;
				box-sizing: border-box;
				.title {
					font-size: 18px;
					font-weight: bold;
				}
				.way {
					padding-left: 37px;
					margin-top: 30px;
					box-sizing: border-box;
					display: flex;
					li {
						list-style: none;
						display: flex;
						div {
							width: 24px;
							height: 24px;
							border: 1px solid #BBBBBB;
							border-radius: 50%;
							box-sizing: border-box;
							position: relative;
							top: 3px;
							cursor: pointer;
						}
						span {
							font-size: 20px;
							margin-left: 9px;
						}
						.active {
							border: none;
							background: url(../../assets/common_icon_selete.png) no-repeat;
							background-size: 100%;
						}
					}
				}
				.Count {
					.first {
						padding-left: 37px;
						box-sizing: border-box;
						margin-top: 40px;
						i {
							width: 18px;
							display: inline-block;
							height: 18px;
							background: url(../../assets/icon_details_disable.png) no-repeat;
							background-size: 100%;
							margin-left: 3px;
							position: relative;
							top: 2px;
						}
						span {
							font-size: 18px;
							margin-left: 10px;
						}
					}
					.second {
						margin-top: 30px;
						span {
							font-size: 18px;
							margin-left: 70px;
						}
					}
					.third {
						text-align: right;
						margin-top: 20px;
						span {
							margin-right: 30px;
							font-size: 18px;
							color: #E51C23;
							cursor: pointer;
						}
					}
				}
				.qeBox {
					height: 200px;
					position: relative;
					.qeImg {
						width: 160px;
						height: 200px;
						padding: 1px;
						margin: auto;
						position: relative;
						img {
							width: 160px;
							height: 160px;
						}
						p {
							width: 100%;
							text-align: center;
							font-size: 14px;
							position: absolute;
							bottom: 20px;
						}
					}
				}
				.payBtn {
					width: 120px;
					height: 40px;
					border-radius: 5px;
					color: #FFFFFF;
					text-align: center;
					line-height: 40px;
					margin: auto;
					font-size: 18px;
					background: #3BABF5;
					cursor: pointer;
					margin-top: 30px;
					margin-bottom: 30px;
				}
			}
		}
	}
</style>