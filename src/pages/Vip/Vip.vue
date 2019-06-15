<template>
	<div style="width: 769px;">
			<div  class="VIP">
					<p class="title">个人信息</p>
					<div class="top">
						<div class="box">
							<div class="avatar">
								<img :src="user.avatarPath" />
							</div>
							<div class="nameBox">
								<p>{{user.nickname}}</p>
								<p v-if="user.vipStatus==2">尚未开通VIP</p>
								<p v-if="user.vipStatus==1">黄金VIP</p>
							</div>
							<div class="openBtn" @click="toVip" v-if="user.vipStatus==2">立即开通VIP</div>
							<div class="openBtn" @click="toVip" v-if="user.vipStatus==1">立即续费VIP</div>
						</div>
						<div class="Viptext">VIP</div>
					</div>
					<div class="bottom">
						<!--<p>VIP权益</p>-->
						<div class="text" v-html="content"></div>
						<div class="dredge" @click="toVip" v-if="user.vipStatus==2">立即开通</div>
						<div class="dredge" @click="toVip" v-if="user.vipStatus==1">立即续费</div>
						<div style="height: 160px;"></div>
					</div>
				</div>
		
	
	
				<PayDialog v-if="pay" @close="closeDia" :pay="true" :vip="true" />
	
			
	
	</div>
</template>

<script>
	export default{
		data(){
			return {
				pay:false,
				user:{},
				content:""
			}
			
		},
		activated(){
			console.log('dklsjdljasldj')
			if(JSON.stringify(this.$store.state.user)!="{}"){
					this.user={...this.$store.state.user}
					
				}else{
					this.getData()
				}
			
		},
		created(){
			
			this.getArt()
		},
//		computed:{
//			getUser(){
//				return this.$store.state.user
//			}
//		},
//		watch:{
//			getUser(a,b){
//				if(JSON.stringify(a)!="{}"){
//					console.log(a)
//					this.user={...a}
//				}
//				
//				
//			}
//			
//			
//		},
		
		
		methods:{
			getArt(){
				this.$Api.ArticleDetails({a:8}).then((res)=>{
					console.log(res)
					this.content=res.q.articles.content
				})
				
			},
			toVip() {
				this.pay = true

			},
			closeDia() {
				this.getData()
				this.pay = false
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
					

					this.user.imgId = 0
				})
				
				
			}
			
		}
		
		
		
	}
	
	
</script>

<style scoped="scoped" lang="scss">
.VIP {
				margin-bottom: 100px;
				.title {
					font-size: 20px;
					margin-bottom: 19px;
				}
				.top {
					width: 710px;
					height: 300px;
					background: #F5C37A;
					margin: auto;
					
					border-radius: 20px;
					position: relative;
					.box {
						display: flex;
						padding-top: 30px;
						.avatar {
							width: 100px;
							height: 100px;
							border-radius: 50%;
							background: #FFFFFF;
							margin-left: 40px;
							img {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.nameBox {
							padding-top: 20px;
							margin-left: 10px;
							p {
								font-size: 14px;
							}
							p:first-child {
								font-size: 24px;
							}
						}
						.openBtn {
							width: 120px;
							height: 30px;
							cursor: pointer;
							border: 1px solid #9E5F03;
							border-radius: 30px;
							background: #FFD78B;
							color: #9E5F03;
							line-height: 30px;
							margin-top: 30px;
							margin-left: 260px;
							font-size: 16px;
							text-align: center;
						}
					}
					.Viptext {
						color: #FFF000;
						font-size: 120px;
						position: absolute;
						right: 45px;
						top: 87.5px;
					}
				}
				.bottom {
					background: #FFFFFF;
					position: relative;
					bottom: 80px;
					width: 760px;
					padding: 30px;
					margin-left: 9px;
					p {
						font-size: 25px;
					}
					.text {
						font-size: 24px;
					}
					.dredge {
						width: 100px;
						height: 100px;
						background: #3BABF5;
						color: #FFFFFF;
						text-align: center;
						line-height: 100px;
						position: absolute;
						right: 30px;
						bottom: 40px;
						font-size: 24px;
						border-radius: 50%;
						cursor: pointer;
					}
				}
			}
</style>