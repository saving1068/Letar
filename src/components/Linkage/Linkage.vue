<template>
	<div id="Linkage">
		<el-select v-model="sheng" @change="choseProvince" placeholder="省级地区">
			<el-option v-for="item in province" :key="item.value" :label="item.text" :value="item.value">
			</el-option>
		</el-select>
		<el-select v-model="shi" @change="choseCity" placeholder="市级地区">
			<el-option v-for="item in shi1" :key="item.value" :label="item.text" :value="item.value">
			</el-option>
		</el-select>
		<el-select v-model="qu" @change="choseBlock" placeholder="区级地区">
			<el-option v-for="item in qu1" :key="item.value" :label="item.text" :value="item.value">
			</el-option>
		</el-select>
	</div>
</template>

<script>
	export default {
		props: {
			region: {
				type: Array,
				default: function() {
					return []
				},
				required: true
			}

		},

		computed: {
			getRegion() {
				return this.region
			}

		},
		data() {
			return {
				mapJson: null,
				cityData: [],
				province: '',
				sheng: '',
				shi: '',
				shi1: [],
				qu: '',
				qu1: [],
				city: '',
				block: ''
				//    region:{
				//    	id:0,
				//    	name:""
				//    }
			}
		},
		watch: {
			getRegion(a, b) {
			
              if(a.length > 0) {
					for(let i = 0; i < this.cityData.length; i++) {
						if(this.cityData[i].value == a[0].id) {
							this.sheng = this.cityData[i].text
							this.shi1 = this.cityData[i].children
							

						}

					}
					if(a.length>1){
						for(let i=0;i<this.shi1.length;i++){
							if(this.shi1[i].value== a[1].id){
								this.shi = this.shi1[i].text
								this.qu1 = this.shi1[i].children
							}
							
							
						}
						
						
						
					}
					if(a.length>2){
						for(let i=0;i<this.qu1.length;i++){
							if(this.qu1[i].value== a[2].id){
								this.qu=this.qu1[i].text
								a.id = this.qu1[i].value
								a.name = this.qu1[i].text
								
								
							}
							
							
						}
						
						
						
					}
					

				}
              
              
              
              
              
              
              
			}
		},
		methods: {
			// 加载china地点数据，三级
			getCityData: function() {
				var that = this
				that.province = []
				that.city = []
				that.block = []
				// 省市区数据分类
				for(var item in this.mapJson) {
					if(item.match(/0000$/)) { //省
						that.province.push({
							value: item,
							text: this.mapJson[item],

						})
					}
					//					else {//区
					//              that.block.push({id: item, value: this.mapJson[item]})
					//            }
				}
				// 分类市级

				if(this.region.length > 0) {
					for(let i = 0; i < this.cityData.length; i++) {
						if(this.cityData[i].value == this.region[0].id) {
							this.sheng = this.cityData[i].text
							this.shi1 = this.cityData[i].children
							

						}

					}
					if(this.region.length>1){
						for(let i=0;i<this.shi1.length;i++){
							if(this.shi1[i].value== this.region[1].id){
								this.shi = this.shi1[i].text
								this.qu1 = this.shi1[i].children
							}
							
							
						}
						
						
						
					}
					if(this.region.length>2){
						for(let i=0;i<this.qu1.length;i++){
							if(this.qu1[i].value== this.region[2].id){
								this.qu=this.qu1[i].text
								this.region.id = this.qu1[i].value
								this.region.name = this.qu1[i].text
								
								this.$emit('sendId', this.region)
							}
							
							
						}
						
						
						
					}
					

				} else {
					
						for(let j = 0; j < this.cityData.length; j++) {
							if(this.province[0].value == this.cityData[j].value) {
								this.sheng = this.cityData[j].text
								this.shi1 = this.cityData[j].children
								this.shi = this.cityData[j].children[0].text
								this.region.id = this.shi1[0].value
								this.region.name = this.shi1[0].text
								this.qu1 = this.cityData[j].children[0].children

								this.qu = this.cityData[j].children[0].children[0].text
								this.E = this.qu1[0].id

							}

						}

					

				}

			},
			// 选省
			choseProvince: function(e) {

				for(var index2 in this.cityData) {

					if(e === this.cityData[index2].value) {
						this.shi1 = this.cityData[index2].children
						this.shi = this.cityData[index2].children[0].text
						this.region.id = this.shi1[0].value
						this.region.name = this.shi1[0].text
						this.qu1 = this.cityData[index2].children[0].children

						this.qu = this.cityData[index2].children[0].children[0].text
						this.E = this.qu1[0].id
					}
				}
				this.$emit('sendId', this.region)
			},
			// 选市
			choseCity: function(e, val) {
				console.log(e)
				this.id = e

				for(var index3 in this.city) {
					if(e === this.city[index3].id) {
						this.qu1 = this.city[index3].children

					

						this.qu = this.city[index3].children[0].value
						this.E = this.qu1[0].id
						// console.log(this.E)
					}
				}
			
			},
			// 选区
			choseBlock: function(e) {
				console.log(e)
				for(let i=0;i<this.qu1.length;i++){
					if(this.qu1[i].value==e){
						this.region.id = this.qu1[i].value
						this.region.name = this.qu1[i].text
						
						
					}
					
					
				}
				
				
				
				
				this.$emit('sendId', this.region)
				// console.log(this.E)
			},
			//			choseCity:function(e) {
			//      for (var index3 in this.city) {
			//        if (e === this.city[index3].id) {
			//          this.qu1 = this.city[index3].children
			//          this.qu = this.city[index3].children[0].value
			//          this.E = this.qu1[0].id
			//          // console.log(this.E)
			//        }
			//      }
			//    },
			//    // 选区
			//    choseBlock:function(e) {
			//      this.E=e;
			//      // console.log(this.E)
			//    }

		},
		created: function() {
			this.cityData = [...this.$newCity]
			this.mapJson = this.$cityData

			this.getCityData()
		}
	}
</script>

<style lang="scss">
#Linkage{
	.el-select{
	width: 185px !important;
	.el-input{
		.el-input__inner{
			padding: 0;
			text-indent: 5px;
		}
	}
}
}
</style>