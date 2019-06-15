<template>
	<div>
		
		<!--<el-upload
		  action="https://jsonplaceholder.typicode.com/posts/"
		  multiple="true"
		  list-type="picture-card"
		  :on-preview="handlePictureCardPreview"
		  :on-success="handleAvatarSuccess" 
		  :on-remove="handleRemove"
		  :before-upload="beforeUpload">
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrlA">
		</el-dialog>-->
		
		<!--<el-upload 
			multiple="true" 
			class="avatar-uploader" 
			:action="imageUrl" 
			:show-file-list="false" 
			ref="newupload" 
			:on-preview="handlePictureCardPreview" 
			:on-success="handleAvatarSuccessA" 
			:before-upload="beforeUploadA">
			<img :src="dialogImageUrlA" v-show="isNoYesA" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon" v-if="isYesNoA"></i>
		</el-upload>-->
		
		<section class="cf">
			<input class="file" type="file" accept="image/*" name="file[]"  @change="uploadImgA" ref="imgInputA" multiple v-if="userURLA.length < 3"/>
			<img :src="item" v-if="isUrlA" v-for="(item,index) in userURLA" class="upload_imgs"/>
		</section>
		
		
		
	</div>
</template>

<script>
	
export default {
	data() {
		return {
			user:{},  //把接口id数据保存在这个对象下的属性（imgIdA）里；
			isUrlA:false, //用于控制图片的显示隐藏；
			userURLA:[], //多个img的src;
        	//userURLA:'',
        	
        	
		}
	},
	created() {
		
	},
	mounted() {

	},
	methods: {
		
		uploadImgA(e) { //自定义的上传图片；
			//console.log(e.target.files)
			//console.log(this.userURLA.length)

			//限制一次性最多上传3张图片；
			if (this.userURLA.length <= 3) {
				
				var that = this;
				
				//循环上传多张的图片；
				for (let i=0;i<e.target.files.length;i++) {
					
					const isLt2M = e.target.files[i].size / 1024 / 1024 < 2;
					
					console.log(e.target.files[i].size)
					
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
								this.user.imgIdA = res.q.files[0].id
							}
							
						});
						
						
					}else{
						alert('图片大于2M')
					}
					
					
					
				}
				
				
			}else{
				
			}
			
			
			
			

		},
		

		
	}	

}

</script>

<style scoped>
.file{
	width: 100px;
	height: 100px;
	background: pink;
}	
	
	img{
		width: 100px;
		height: 100px;
		float: left;
	}
	
	.cf:after{
		content: '';
		display: block;
		clear: both;
	}
	
	
	 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>