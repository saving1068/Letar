<template>
	<div>
		<div class="master">
	    		<div class="master_content">
	    			<div class="master_item" v-for="(v,i) in masterArr">
	    				<div class="master_item_img" @click="goToTeache(v.id)">
	    					<img :src="head+v.halfPic"/>
	    				</div>
	    				<div class="master_item_font">
	    					<p class="master_name">{{v.nickname}}</p>
	    					<p class="master_honor">{{v.teacherAppellation}}</p>
	    					<p class="master_follow">{{v.followNum}}人已关注</p>
	    				</div>
	    				<div v-if="v.followStatus == 2" class="master_follow_btn" @click="floow(v)">
	    					关注
	    				</div>
	    				<div  v-else class="master_follow_btn" @click="floow(v)" style="background: #7A7878;color: #FFFFFF;">
	    					已关注
	    				</div>
	    			</div>
	    		</div>
    		</div>
    		<LDialog v-show="showDialog" @closeDialog='closeDia()' @update="update"></LDialog>
	</div>
</template>

<script>
	export default{
		created(){
			this.getTeacherList()
		},
		data(){
			return{
				head:this.$imgUrl,
				masterArr:[],
				showDialog:false,
			}
		},
		computed:{
			getIsLogin(){
				return this.$store.state.isLogin
				
			}
			
		},
		watch:{
			getIsLogin(a,b){
				this.getTeacherList()	
			}
		},
		methods:{
			goToTeache(id){
				this.$router.push({
					name: "TeacherHomePage",
					query:{
						teacherId:id,
					}
				})
			},
			getTeacherList(){
				if(this.$store.state.isLogin){
					var obj = {
						a:1,
					}
				}else{
					var obj = {
						a:1,
						web:2
					}
				}
				this.$Api.getTeacherList(obj).then((res)=>{
						this.masterArr = res.q.teachers
				})
			},	
			floow(item){
				if(this.$store.state.isLogin){
					if(item.followStatus == 1){
						this.$Api.TurnSwitch({a:2,id:item.id,open:2}).then((res)=>{
							console.log(res)
							if(res.q.s == 0){
								this.getTeacherList()//老师
							}
							
						})
					}else{
						this.$Api.TurnSwitch({a:2,id:item.id,open:1}).then((res)=>{
							console.log(res)
							if(res.q.s == 0){
								this.getTeacherList()//老师
							}
						})
					}
				}else{
					this.showDialog = true
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.master{width: 1280px;margin: 0 auto;padding-bottom: 100px;}
	.master_content{margin: 0 auto;width: 100%;overflow: hidden;}
	.master_item{width: 510px;overflow: hidden;position: relative;float: left;margin-left: 70px;margin-top: 50px;}
	.master_item img{width: 100%;}
	.master_item_img{width: 170px;height: 220px;background: salmon;float: left;cursor: pointer;}
	.master_item_font{float: left;padding: 21px 0 0 21px;font-size: 22px;color: #101010;}
	.master_follow{font-size: 20px;color: #707070;}
	.master_name,.master_honor{line-height: 40px;}
	.master_follow_btn{width: 94px;height: 36px;background:#3BABF5;border-radius: 18px;text-align: center;line-height: 36px;color: #FAFF00;position: absolute;bottom: 0;right: 0;font-size: 18px;}
	.master_follow_btn:hover{cursor: pointer;}
</style>