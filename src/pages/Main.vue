<template>
	<div id="main">
		<LHeader ></LHeader>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<LFooter />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				openId: '',
				isHome: false
			}
		},
        watch:{
        	'$route' (to, from){
        		console.log(to)
        		console.log(this.$store.state.isLogin)
        		
        		
        	}
        	
        	
        },
        
		created() {
			 console.log(this.$route.query)
			if(localStorage.getItem("session")) {
				this.getUserDetail()
				
				
                if(this.getTrade_no()){
                          	
                 this.getType(this.getTrade_no())
                	
                }
                
                
			} else {
				this.getData().then(() => {
					this.$store.dispatch('changeLogin', false)

				})

			}
		},
		methods: {
			changeData(){
				console.log("update")
				this.$router.replace({
					name:this.$route.name
				})
				
			},
			getType(id){
				
				this.$Api.getOrderType({id:id}).then((res)=>{
					if(res.q.s==0){
						if(res.q.orderType==1){
							this.$router.replace({
								name:"Vip",
								query:{
									index:2
								
								}
							})
							
						}else if(res.q.orderType==2){
							this.$router.replace({
								name:"BuyCourse",
								query:{
									index:1
									
								}
							})
							
						}else if(res.q.orderType==3){
							this.$router.replace({
								name:"BuyCourse",
								query:{
									index:1
									
								}
							})
							
						}else if(res.q.orderType==4){
							this.$router.replace({
								name:"Cash",
								query:{
									index:5
									
								}
							})
							
						}
						
						
					}
					
				})
				
			},
			
            getTrade_no(){
				
				var url = location.hash; //获取url中"?"符后的字串   
				//				console.log(url)
				var theRequest = new Object();
				if(url.indexOf("?") != -1) {
					
					var str = url.split("?")[1];
					var strs = str.split("&");
					for(var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				
				return  theRequest.out_trade_no
				
				
			},
			async getData() {

				//  		await this.removeSession()
				await this.getNewSession()

			},
			removeSession() {
				var that = this
				return new Promise((resolve, reject) => {
					var timer = setInterval(remove, 50)

					function remove() {
						localStorage.removeItem("session")
						if(!localStorage.getItem("session")) {
							that.$Api.setSessionId(null)
							clearInterval(timer)
							resolve()

						}

					}

				})

			},

			getNewSession() {

				var that = this;
				localStorage.removeItem("session")
				that.$Api.setSessionId(null)
				return new Promise((resolve, reject) => {
					//  	var timer=setInterval(()=>{
					that.$Api.getSessionId().then((res) => {
						if(res.q.s == 0) {
							console.log(2)
							localStorage.setItem("session", res.s)
							if(localStorage.getItem("session")) {
								that.$Api.setSessionId(localStorage.getItem("session"))

							}

							//  				clearInterval(timer)
							resolve()
						}

					})
					//  	},50)
				})

			},

			getCode() {

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
				let openId = theRequest.code; //授权后的code
				return openId;

			},
			getUserDetail() {

				this.$Api.UserDetails().then((res) => {
					console.log(res)
					if(res.q.s == 0) {
						this.$store.dispatch('changeLogin', true)
						var user = { ...res.q.userInfo
						}
						if(user.avatarPath != "") {
							user.avatarPath = this.$imgUrl + user.avatarPath
						}else{
						user.avatarPath=require('../assets/common_footer_logo.png')
					}
						this.$store.dispatch('changeUser', user)
					} else {

						this.$store.dispatch('changeLogin', false)

						this.getData().then(() => {
							//  				console.log(this.$Api.getSession())
							if(this.$route.query.code) {
								this.$Api.UserLogin({
									'a': 3,
									'code': this.$route.query.code
								}).then((res) => {
									if(res.q.s == 0) {
										this.$store.dispatch('changeLogin', true)

									}

								})
							} else {
								this.$store.dispatch('changeLogin', false)

							}
						})

					}
				})

			}
		}
	}
</script>

<style>
	#main {
		height: 100%;
	}
</style>