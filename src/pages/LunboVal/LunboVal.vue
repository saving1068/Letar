<template>
	<div>
		<div style="text-align: center !important;width: 1280px;margin: 0 auto;" v-html="content"></div>
	</div>
</template>

<script>
	export default{
		created(){
			this.getAdList()
		},
		data(){
			return{
				content:"",
				list:[]
			}
		},
		methods:{
			getAdList(){
				this.$Api.getAdsList().then((res)=>{
					this.list = res.q.Ads
					if(this.$route.query.type == 1){
			//				console.log(this.$route.query.index)
							console.log(this.list)
							window.location.href = this.list[this.$route.query.index].url
					}else{
						console.log(2)
						this.content = this.list[this.$route.query.index].content
					}
				})
			}
		}
	}
</script>

<style>
</style>