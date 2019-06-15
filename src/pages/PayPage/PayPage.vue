<template>
<div>
</div>
</template>

<script>
	export default {

		data() {
			return {
				payment: this.$route.query.payment
			}
		},
		created() {
			
			localStorage.removeItem("session")
			
			if(this.$route.query.session){
//				alert(this.$route.query.session)
				this.setSession(this.$route.query.session).then(()=>{
					this.getData()
					
				})
				
			}
			
			
			

		},
		methods: {
              
              getData(){
              	if(this.$route.query.courseId) {
				var obj = {
					payType: 2,
					a: 2,
					payment: this.payment,
					courseId: this.$route.query.courseId
				}
				this.$Api.PaySubmit(obj).then((res) => {
					console.log(res)
					if(res.q.s == 0) {
						if(this.payment == 1) {
							alert(res.q.wxPay.code_url)
							window.location.href = res.q.aliPay
						} 
					}

					
				})

			}
              },
            async  setSession(session){
              await this.session(session)
              	
             },
             session(session){
             	var that=this
             	return new Promise((resolve,reject)=>{
             		var timer=setInterval(setS,50)
             		
             		function setS(){
             			localStorage.setItem('session',session)
             			if(localStorage.getItem("session")){
             				
             				that.$Api.setSessionId(localStorage.getItem("session"))
             				clearInterval(timer)
             				resolve()
             			}
             			
             			
             			
             			
             		}
             		
             		
             		
             	})
             	
             }
              
              
              
		}

	}
</script>

<style>

</style>