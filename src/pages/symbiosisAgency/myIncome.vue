<template>
	<!-- 合作-我的收入页面 -->
	<div class="myIncomeBox">
		
	<section class="myIncome cf">
		
		<!-- 代理商 -->
		<div class="myIncome-left">
			<h1 v-text="types">代理商</h1>
			<ol id="tabMyBox">
				<li class="active" @click="tabMy">我的收入</li>
				<li @click="tabMs">我的粉丝</li>
			</ol>
		</div>
		
		<!-- 我的收入 -->
		<div class="myIncome-right myIncome-rightA myIncome-right-avtive">
			<h2>我的收入</h2>
			<table border="1" cellspacing="0" width="800px">
				<tbody>
					<tr height="168">
						<td colspan="3">
							<h3>
								￥
								<span v-text="this.userInfo.todayInc">200</span>
							</h3>
							<div>今日收入</div>
						</td>
						<td colspan="3">
							<h3>
								￥
								<span v-text="this.userInfo.totalInc">2300.00</span>
							</h3>
							<div>总收入</div>
						</td>
					</tr>
					<tr height="100">
						<td colspan="2">
							<p v-text="this.userInfo.directDevelop">1500</p>
							<p>直接推荐</p>
						</td>
						<td colspan="2">
							<p v-text="this.userInfo.development">1500</p>
							<p>剩余发展名额</p>
						</td>
						<td colspan="2">
							<p v-text="this.userInfo.indirectDevelop">1500</p>
							<p>间接推荐</p>
						</td>
					</tr>
					<tr height="59">
						<td colspan="6">
							<button @click="goMyWallet">提现</button>
						</td>
					</tr>
				</tbody>
			</table>
			
			<h2>收入明细</h2>
			    
			<div class="incomeTable">
				<div class="fansThead cf">
					<div v-for="(item,index) in incomeTheadList">{{item}}</div>
				</div>
			    
				<div class="fansTbody" id="fansTbodyA">
					<div class="fansTbodyItemS cf" v-for="(item,index) in fansItemIncome">
						<div class="fansTbodyItem">
							<div v-text="item.time.slice(0,10)">2018-12-12</div>
							<div v-text="item.time.slice(11,item.time.length)">17:12：00</div>
						</div>
						<div class="fansTbodyItem">
							<img :src="item.userInfo.avaterPath"/>
							<span v-text="item.userInfo.nickname">学员昵称</span>
							<span v-text="item.userInfo.mobile">18315556666</span>
						</div>
						<div class="fansTbodyItem">
							<p v-text="item.message.slice(0,7)">共享师资VIP</p>
							<p v-text="item.message.slice(8,item.message.length)">2018-05-22至2022-05-22</p>
						</div>
						<div class="fansTbodyItem">
							+
							<b v-text="item.price">100</b>
						</div>
					</div>						
					
				</div>
				
				<!-- 我的收入明细底部分页 -->
				<div class="pagination">
				  <el-pagination
				  	@size-change="handleSizeChange"
      				@current-change="handleCurrentChangeA"
				  	background
				    layout="prev, pager, next"
				    :pager-count="5"
				    :page-size="20" 
				    :total="this.IncomeTotal">
				  </el-pagination>
				</div>
				
			</div>
			
		</div>
		
		<!-- 我的粉丝 -->
		<div class="myIncome-right myIncome-rightB">
			<h2>我的粉丝</h2>
			<ol class="fansNav cf">
				<li class="fansNav-active" @click="tabFansTableA">全部</li>
				<li @click="tabFansTableB">VIP</li>
				<li>
					<span id="numberR">{{calmFansAllTotal}}</span>
					<span id="relation">{{fansNub[0]}}</span>
				</li>
			</ol>
			
			<div class="fansTable fansTable-active">
				<div class="fansThead cf">
					<div v-for="(item,index) in fansTheadList">{{item}}</div>
				</div>
				
				<div class="fansTbody" id="fansTbodyB">
					<div class="fansTbodyItemS cf"  v-for="(item,index) in fansItemAll">
						<div class="fansTbodyItem">
							<img :src="item.userInfo.avaterPath"/>
							<span>{{item.userInfo.nickname}}</span>
							<span>{{item.userInfo.mobile}}</span>
							<span>{{item.time}}</span>
						</div>
						<div class="fansTbodyItem">
							<p v-show="isVip[index]">共享师资VIP</p>
							<p v-if="noVip[index]">非共享师资VIP</p>
							<p v-if="isVip[index]">{{item.startTime}}至{{item.endTime}}</p>
						</div>
						<div class="fansTbodyItem" @click="withdrawDepositShowA(index)">
							￥{{item.price}}
						</div>
					</div>	
				</div>
				
				<!-- 我的粉丝全部底部分页 -->
				<div class="pagination">
				  <el-pagination
				  	@size-change="handleSizeChange"
      				@current-change="handleCurrentChangeB"
				  	background
				    layout="prev, pager, next"
				    :pager-count="5"
				    :page-size="20" 
				    :total="this.fansAllTotal">
				  </el-pagination>
				</div>
				
			</div>
			
			<div class="fansTable">
				<div class="fansThead cf">
					<div v-for="(item,index) in fansTheadList">{{item}}</div>
				</div>
				
				<div class="fansTbody">
					<div class="fansTbodyItemS cf"  v-for="(item,index) in fansItemVip">
						<div class="fansTbodyItem">
							<img :src="item.userInfo.avaterPath"/>
							<span>{{item.userInfo.nickname}}</span>
							<span>{{item.userInfo.mobile}}</span>
							<span>{{item.time}}</span>
						</div>
						<div class="fansTbodyItem">
							<p v-show="isVip[index]">共享师资VIP</p>
							<p v-if="noVip[index]">非共享师资VIP</p>
							<p>{{item.startTime}}至{{item.endTime}}</p>
						</div>
						<div class="fansTbodyItem" @click="withdrawDepositShowB(index)">
							￥{{item.price}}
						</div>
					</div>
				</div>
				
				<!-- 我的粉丝Vip底部分页 -->
				<div class="pagination">
				  <el-pagination
				  	@size-change="handleSizeChange"
      				@current-change="handleCurrentChangeC"
				  	background
				    layout="prev, pager, next"
				    :pager-count="5"
				    :page-size="20" 
				    :total="this.fansVipTotal">
				  </el-pagination>
				</div>
				
			</div>
		</div>
		
		<!-- 提交时弹出来的收入明细内容 -->
		<div class="withdrawDepositBox" :class="{'withdrawDepositBoxActive':isActive}">
			<div class="sourceOfIncome">
				<h2>收入明细<i class="el-icon-error" @click="withdrawDepositNone"></i></h2>
				
				<div class="incomeTable alertBox">
					<div class="fansThead cf">
						<div v-for="(item,index) in incomeTheadList">{{item}}</div>
					</div>
					
					<div class="fansTbody alert">
						<div class="fansTbodyItemS cf"  v-for="(item,index) in smallAllIncomeList">
							<div class="fansTbodyItem">
								<div v-text="item.time.slice(0,10)">2018-12-12</div>
								<div v-text="item.time.slice(11,item.time.length)">17:12：00</div>
							</div>
							<div class="fansTbodyItem">
								<img :src="item.userInfo.avaterPath"/>
								<span v-text="item.userInfo.id">学员昵称</span>
								<span v-text="item.userInfo.mobile">18315556666</span>
							</div>
							<div class="fansTbodyItem">
								<p v-text="item.message.slice(0,7)">共享师资VIP</p>
								<p v-text="item.message.slice(8,item.message.length)">2018-05-22至2022-05-22</p>
							</div>
							<div class="fansTbodyItem">
								+
								<b v-text="item.price">100</b>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</section>
	
	</div>
</template>

<script>


export default {
	components:{
		
	},
	data() {
    return {
  		openId:'',
  		incomeTheadList:["时间","用户信息","收入详情","收入金额"],
  		fansTheadList:["用户信息","VIP状态","收益价值"],
  		fansNub:["位关系粉丝","位VIP关系粉丝"],
  		isActive:false,
  		fansItemIncome:[], //收入明细；
  		fansItemAll:[], //全部粉丝；
  		fansItemVip:[], //Vip粉丝；
  		fansID:[],  //获取粉丝数据的ID；
  		smallAllIncomeList:[], //小模块的全部收入明细；
  		IncomeTotal:1, //收入明细请求数据的分页数;
  		fansAllTotal:1, //我的粉丝全部请求数据的分页数;
  		fansVipTotal:1, //我的粉丝VIP请求数据的分页数;
  		calmFansAllTotal:'',//获取静态渲染的全部粉丝的数据总条数；
  		calmFansVipTotal:'',//获取静态渲染的VIP粉丝的数据总条数；
		isVip:[], //是VIP；
		noVip:[], //不是VIP；
		userInfo:{},
		timeData:'', //年月日；
		timeHMS:'', //时分秒；
		imageUrlHeader:'http://letar.t.aiitec.org',  
 		type:this.$route.query.type, //是老师还是代理参数；
 		types:'',  //是老师还是代理渲染；
 		
		
    }
 },

  created(){
  	
  	this.$Api.UserDetails().then((res)=>{ //代理商总收入部分，要传session；
  		console.log(res)
  		this.userInfo = res.q.userInfo;
  		
  		if(this.type == 2){ //是老师；
  			this.types = '老师';
  		}else if(this.type == 1){ //是代理商；
  			this.types = '代理商';
  		}
  		
  	})
  	
  	var IncomeObj = {
  		'userId':'',
  		'pa':1,
  		'li':20
  	}
  	this.$Api.getIncomeList(IncomeObj).then((res) =>{  //收入明细，要传session；
		console.log(res)
		
		this.fansItemIncome=[...res.q.income];
		this.fansItemIncome.forEach((item)=>{
			if(item.userInfo.avaterPath==""){ //判断没有图片的url时,给img元素一个默认的图片；
				item.userInfo.avaterPath=require('../../assets/common_footer_logo.png');
			}else{
				item.userInfo.avaterPath=this.$imgUrl+item.userInfo.avaterPath
			}

		})

	})
	
  },
  mounted(){ //页面挂载之后；
 	
  },
  methods:{	
  	handleSizeChange(val) {
		console.log(`每页 ${val}条`);
	},
	handleCurrentChangeA(val) {
		console.log(`当前页: ${val}`);
		var IncomeObj = {
	  		'userId':this.fansID,
	  		'pa':val,
	  		'li':20
	  	}
		console.log(IncomeObj.pa)
		this.fansItemIncome = [];
		this.$Api.getIncomeList(IncomeObj).then((res) =>{  //收入明细分页数据，要传session；
			console.log(res)
			var IncomeList = res.q.income;
			this.IncomeTotal = res.q.total;
			for (var i=0;i<IncomeList.length;i++) {
				this.fansItemIncome.push(IncomeList[i]);
			}
		})
		console.log(this.IncomeTotal)
	},
	
	handleCurrentChangeB(val) {
		console.log(`当前页: ${val}`);
		var fansObj = {
			'a':1,
	  		'userId':this.fansID,
	  		'pa':val,
	  		'li':20
	  	}
		console.log(fansObj.pa)
		this.fansItemAll = [];
		this.$Api.getFansList(fansObj).then((res) =>{  //我的粉丝全部分页数据，要传session；
			console.log(res)
			var fansList = res.q.fans;
			this.fansAllTotal = res.q.total;
			for (var i=0;i<fansList.length;i++) {
				this.fansItemAll.push(fansList[i]);
			}
		})
		console.log(this.fansAllTotal)
	},
	handleCurrentChangeC(val) {
		console.log(`当前页: ${val}`);
		var fansObj = {
			'a':2,
	  		'userId':this.fansID,
	  		'pa':val,
	  		'li':20
	  	}
		console.log(fansObj.pa)
		this.fansItemVip = [];
		this.$Api.getFansList(fansObj).then((res) =>{  //我的粉丝VIP分页数据，要传session；
			console.log(res)
			var fansList = res.q.fans;
			this.fansVipTotal = res.q.total;
			for (var i=0;i<fansList.length;i++) {
				this.fansItemVip.push(fansList[i]);
			}
		})
		console.log(this.fansVipTotal)
	},
  	tabMy(){  //点击我的收入；
  		let tabMyBox = document.querySelector('#tabMyBox'),
  		    tabMyBoxLi = tabMyBox.querySelectorAll('li'),
  		    myIncomeRightS = document.querySelectorAll('.myIncome-right');
  		
  		for (let i=0;i<tabMyBoxLi.length;i++) {
			tabMyBoxLi[i].className = '';
			myIncomeRightS[i].className = 'myIncome-right myIncome-rightA';
		}
		tabMyBoxLi[0].className = 'active';
		myIncomeRightS[0].className = 'myIncome-right myIncome-rightA myIncome-right-avtive';
		
  	},
  	tabMs(){ //点击我的粉丝；
  		let tabMyBox = document.querySelector('#tabMyBox'),
  		    tabMyBoxLi = tabMyBox.querySelectorAll('li'),
  		    myIncomeRightS = document.querySelectorAll('.myIncome-right'),
  		    fansObj = {
				'a':1,
				'userId':'',
				'pa':1,
	         	'li':20
			}
  		
  		for (let i=0;i<tabMyBoxLi.length;i++) {
			tabMyBoxLi[i].className = '';
			myIncomeRightS[i].className = 'myIncome-right myIncome-rightA';
		}
		tabMyBoxLi[1].className = 'active';
		myIncomeRightS[1].className = 'myIncome-right myIncome-rightB myIncome-right-avtive';
		
		//再次点击回来时，都要先清空数组里的数据，重新渲染数据；
		this.fansItemAll = [];
		this.isVip = [];
        this.noVip = [];	
			
		this.$Api.getFansList(fansObj).then((res) =>{ //我的全部粉丝；
			console.log(res)

			this.fansItemAll = [...res.q.fans];
			this.calmFansAllTotal = res.q.total; //获取静态渲染的全部粉丝数据总条数；
			
			this.fansItemAll.forEach((item)=>{
				
				if(item.userInfo.avaterPath==""){ //判断没有图片的url时,给img元素一个默认的图片；
					item.userInfo.avaterPath=require('../../assets/common_footer_logo.png');
				}else{
					item.userInfo.avaterPath=this.$imgUrl+item.userInfo.avaterPath;
				}
				
				if (item.vipStatus == '1') { //判断请求回来的数据是否有VIP粉丝,是VIP粉丝；
					
					item.vipStatus = true;
					this.isVip.push(item.vipStatus);
					this.noVip.push(!item.vipStatus);
					
					
				}else{ //不是VIP粉丝；
					
					item.vipStatus = false;
					this.isVip.push(item.vipStatus);
					this.noVip.push(!item.vipStatus);
					
					
				}
				
			})
			
			console.log(this.noVip)
		})	
	
		
  	},
  	tabFansTableA(){ //点击我的粉丝的全部；
  		let fansNav = document.querySelector('.fansNav'),
  		    fansNavLi = fansNav.querySelectorAll('li'),
  		    fansTableS = document.querySelectorAll('.fansTable'),
		    numberR = document.querySelector('#numberR'),
  		    relation = document.querySelector('#relation'),
  		    fansObj = {
				'a':1,
				'userId':'',
				'pa':1,
	         	'li':20
			};
  		
  		for (let i=0;i<fansTableS.length;i++) {
  			fansNavLi[i].className = '';
  			fansTableS[i].className = 'fansTable';
  		}
  		fansNavLi[0].className = 'fansNav-active';
  		fansTableS[0].className = 'fansTable fansTable-active';
  		numberR.innerHTML = `${this.calmFansAllTotal}`;
  		relation.innerHTML = `${this.fansNub[0]}`;
  		
  		//再次点击回来时，都要先清空数组里的数据，重新渲染数据；
		this.fansItemAll = [];
		this.isVip = [];
        this.noVip = [];	
			
		this.$Api.getFansList(fansObj).then((res) =>{ //我的全部粉丝；
			console.log(res)

			this.fansItemAll = [...res.q.fans];
			this.calmFansAllTotal = res.q.total; //获取静态渲染的全部粉丝数据总条数；
			
			this.fansItemAll.forEach((item)=>{
				
				if(item.userInfo.avaterPath==""){ //判断没有图片的url时,给img元素一个默认的图片；
					item.userInfo.avaterPath=require('../../assets/common_footer_logo.png');
				}else{
					item.userInfo.avaterPath=this.$imgUrl+item.userInfo.avaterPath;
				}
				
				if (item.vipStatus == '1') { //判断请求回来的数据是否有VIP粉丝,是VIP粉丝；
					
					item.vipStatus = true;
					this.isVip.push(item.vipStatus);
					this.noVip.push(!item.vipStatus);
					
				}else{ //不是VIP粉丝；
					
					item.vipStatus = false;
					this.isVip.push(item.vipStatus);
					this.noVip.push(!item.vipStatus);
					
				}
				
			})
			
			console.log(this.noVip)
		})	
  		
  	},
  	tabFansTableB(){ //点击 我的粉丝VIP；
  		let fansNav = document.querySelector('.fansNav'),
  		    fansNavLi = fansNav.querySelectorAll('li'),
  		    fansTableS = document.querySelectorAll('.fansTable'),
  		    numberR = document.querySelector('#numberR'),
  		    relation = document.querySelector('#relation'),
  		    fansObj = {
				'a':2,
				'userId':'',
				'pa':1,
	         	'li':20
			}
  		
  		for (let i=0;i<fansTableS.length;i++) {
  			fansNavLi[i].className = '';
  			fansTableS[i].className = 'fansTable';
  		}
  		fansNavLi[1].className = 'fansNav-active';
  		fansTableS[1].className = 'fansTable fansTable-active';
  		numberR.innerHTML = '';
  		relation.innerHTML = `${this.fansNub[1]}`;
  		
  		//再次点击回来时，都要先清空数组里的数据，重新渲染数据；
  		this.fansItemVip = [];
        this.isVip = [];
        this.noVip = [];
        
        
  		this.$Api.getFansList(fansObj).then((res) =>{ //我的Vip粉丝；
			console.log(res)
			
			this.fansItemVip = [...res.q.fans];
			
			this.calmFansVipTotal = res.q.total; //获取静态渲染的Vip粉丝数据总条数；
			numberR.innerHTML = `${this.calmFansVipTotal}`;
			
			this.fansItemVip.forEach((item)=>{
				
				if(item.userInfo.avaterPath==""){ //判断没有图片的url时,给img元素一个默认的图片；
					item.userInfo.avaterPath=require('../../assets/common_footer_logo.png');
				}else{
					item.userInfo.avaterPath=this.$imgUrl+item.userInfo.avaterPath
				}
				
				if (item.vipStatus == '1') { //判断请求回来的数据是否有VIP粉丝,是VIP粉丝；
					
					item.vipStatus = true;
					this.isVip.push(item.vipStatus);
					this.noVip.push(!item.vipStatus);
					
				}else{ //不是VIP粉丝；
					
					item.vipStatus = false;
					this.isVip.push(item.vipStatus);
					this.noVip.push(!item.vipStatus);
					
				}
				
			})
			
			console.log(this.noVip)
		})
  		
  	},
  	withdrawDepositShowA(index){  //点击显示提现；
  		this.isActive = true;
  		
  		this.$Api.getFansList({'a':1}).then((res) =>{ //我的全部粉丝；
			console.log(res)
			this.fansID = res.q.fans[index].userInfo.id;
			
			
		})	
  		
  		setTimeout(()=>{
  			var IncomeObj = {
		  		'userId':this.fansID,
		  		'pa':1,
		  		'li':20
		  	}
  			console.log(IncomeObj.userId)
  			this.$Api.getIncomeList(IncomeObj).then((res) =>{ //我的全部粉丝的收入明细；
  				
  				this.smallAllIncomeList = [];
  				
				console.log(res)
				
				this.smallAllIncomeList = [...res.q.income];
				this.smallAllIncomeList.forEach((item)=>{
					
					if(item.userInfo.avaterPath==""){ //判断没有图片的url时,给img元素一个默认的图片；
						item.userInfo.avaterPath=require('../../assets/common_footer_logo.png');
					}else{
						item.userInfo.avaterPath=this.$imgUrl+item.userInfo.avaterPath;
					}
		
				})
				
				
			})
  			
  		},100)
  		
  	},
  	withdrawDepositShowB(index){  //点击显示提现；
  		this.isActive = true;
  		
  		this.$Api.getFansList({'a':2}).then((res) =>{ //我的VIP粉丝；
			console.log(res)
			this.fansID = res.q.fans[index].userInfo.id;
		})	
  		
  		setTimeout(()=>{
  			var IncomeObj = {
		  		'userId':this.fansID,
		  		'pa':1,
		  		'li':20
		  	}
  			console.log(IncomeObj.userId)
  			this.$Api.getIncomeList(IncomeObj).then((res) =>{ //我的VIP粉丝的收入明细；
  				
  				this.smallAllIncomeList = [];
				console.log(res)	
				
				this.smallAllIncomeList = [...res.q.income];
				this.smallAllIncomeList.forEach((item)=>{
					if(item.userInfo.avaterPath==""){ //判断没有图片的url时,给img元素一个默认的图片；
						item.userInfo.avaterPath=require('../../assets/common_footer_logo.png');
					}else{
						item.userInfo.avaterPath=this.$imgUrl+item.userInfo.avaterPath;
					}
		
				})
				
				
			})
  			
  		},100)
  		
  	},
  	withdrawDepositNone(){  //点击隐藏提现；
  		this.isActive = false;
  	},
  	goMyWallet(){ //跳到我的钱包页面；
  		this.$router.push({
  			name:"Cash",
  			query:{
  				index:5
  			}
  		});
  	},

  }
}	
</script>

<style scoped lang="scss">
li{list-style: none;}
.myIncomeBox{position: relative;}

.myIncome{
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	padding: 40px 0 122px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	.myIncome-left{
		width: 200px;height: 155px;background: #fff;float: left;
		h1{height: 54px;background: url(../../assets/agent.png) no-repeat 10px 18px;text-indent: 44px;line-height: 65px;font-weight: normal;font-size: 18px;}
		ul{width: 100%;height: 155-54px;}
		li{height: 50px;box-sizing: border-box;text-indent: 29px;line-height: 50px;font-size: 18px;cursor:pointer;}
	}
	.myIncome-rightA{
		width: 830px;height: 100%;float: left;padding-left: 30px;box-sizing: border-box;display: none;
		h2{height: 45px;font-size: 18px;padding-top: 6px;box-sizing: border-box;font-weight: normal;color: #000;}
		h2:nth-of-type(2){height: 69px;padding-top: 20px;}
		table{
			border-collapse: collapse;border: 1px solid #979797;background: #fff;
		}
		td{text-align: center;}
		table:nth-of-type(1){
			h3{font-size: 50px;}
			div{font-size: 25px;padding-top: 10px;color: #000;}
			tbody{
				tr:nth-of-type(1){
					td{width: 50%;color: #000;}
				}
				tr:nth-of-type(2){
					td{width: 33.33%;}
					p{font-size: 20px;color: #000;}
					p:nth-of-type(1){color: #e32429;}
				}
				tr:nth-of-type(3){
					button{width: 120px;height: 40px;background: #3babf5;border: none;color: #fff;border-radius: 4px;cursor: pointer;}
				}
			}
		}
		
	}
	
	.myIncome-rightB{
		display: none;
		height: 100%;
		width: 830px;float: left;padding-left: 30px;box-sizing: border-box;
		h2{height: 45px;font-size: 18px;padding-top: 6px;box-sizing: border-box;font-weight: normal;color: #000;}
		.fansNav{
			height: 70px;background: #fff;padding: 20px 0 0 20px;box-sizing: border-box;width: 100%;position: relative;margin-bottom: 10px;
			li{width: 80px;height: 30px;float: left;font-size: 18px;text-align: center;line-height: 30px;cursor: pointer;}
			li:nth-of-type(3){position: absolute;bottom: 0px;right: 0px;width: 200px;height: 22px;line-height: normal;font-size: 13px;color: #30a8f4;text-align: right;padding-right: 9px;box-sizing: border-box;cursor: default;}
		}
	}
}

.incomeTable{
	height: 100%;
	border: 1px solid #b3b3b3;background: #fff;
	.fansThead{
		height: 58px;border-bottom: 1px solid #b3b3b3;text-align: center;line-height: 58px;color: #000;font-size: 18px;
		div{width: 25%;height: 100%;float: left;box-sizing: border-box;}
		div:nth-of-type(1){padding-left: 19px;}
		div:nth-of-type(2){padding-right: 19px;}
		div:nth-of-type(4){padding-right: 19px;}
	}
	.fansTbody{
		height: 718-59px;
		padding: 0 19px 11px;box-sizing: border-box;overflow: auto;
		.fansTbodyItemS{
			height: 80px;border-bottom: 1px solid #b3b3b3;
			.fansTbodyItem{
				width: 25%;height: 100%;float: left;text-align: center;position: relative;
				div{color: #000000;font-size: 15px;}
				div:nth-of-type(1){padding: 22px 0 6px 0;}
				img{width: 40px;height: 40px;position: absolute;top: 18px;left: 0;border-radius: 80px;background: pink;}
				span{position: absolute;left: 50px;font-size: 13px;color: #000;}
				span:nth-of-type(1){top: 20px;font-size: 17px;}
				span:nth-of-type(2){top: 43px;}
				p{height: 20px;font-size: 13px;color: #000;}
				p:nth-of-type(1){color: #ff9b05;}
				b{font-weight: normal;}
			}
			.fansTbodyItem:nth-of-type(3){padding-top: 22px;box-sizing: border-box;}
			.fansTbodyItem:nth-of-type(4){color: #ff9b05;font-size: 15px;line-height: 80px;cursor:pointer;}
		}
	}
}

.fansTable{
	border: 1px solid #b3b3b3;display: none;background: #fff;
	.fansThead{
		height: 58px;border-bottom: 1px solid #b3b3b3;text-align: center;line-height: 58px;color: #000;font-size: 18px;
		div{width: 33.33%;height: 100%;float: left;box-sizing: border-box;}
		div:nth-of-type(1),div:nth-of-type(3){padding-right: 19px;}
	}
	.fansTbody{
		height: 718-59px;
		padding: 0 19px 11px;box-sizing: border-box;overflow: auto;
		.fansTbodyItemS{
			height: 80px;border-bottom: 1px solid #b3b3b3;
			.fansTbodyItem{
				width: 33.33%;height: 100%;float: left;text-align: center;position: relative;
				img{width: 60px;height: 60px;position: absolute;top: 10px;left: 0;border-radius: 80px;background: pink;}
				span{position: absolute;left: 69px;font-size: 13px;color: #000;}
				span:nth-of-type(1){top: 6px;font-size: 17px;}
				span:nth-of-type(2){top: 35px;}
				span:nth-of-type(3){top: 55px;}
				p{height: 20px;font-size: 13px;color: #000;}
				p:nth-of-type(1){color: #ff9b05;}
			}
			.fansTbodyItem:nth-of-type(2){padding-top: 22px;box-sizing: border-box;}
			.fansTbodyItem:nth-of-type(3){color: #ff9b05;font-size: 15px;line-height: 80px;cursor:pointer;padding-top: 0;}
		}
	}
}

/*提交时弹出来的收入明细内容*/
.withdrawDepositBox{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background: rgba(0,0,0,0.5);
	display: none;
	.sourceOfIncome{
		width: 770px;
		height: 517px;
		position: absolute;
		left: 30%;
		top: 230px;
		h2{
			font-size: 15px;background: #29a4f4;height: 37px;box-sizing: border-box;border-bottom: 1px solid #59595b;color: #fff;line-height: 37px;padding-left: 10px;
			i{position: absolute;top: 7px;right: 10px;font-size: 22px;cursor:pointer;}
		}
	}
}
.withdrawDepositBoxActive{display: block;}

/*我的收入和粉丝选中样式*/
.active{border-left: 2px solid #3dacf4;color: #3dacf4;cursor:default !important;}

/*我的收入和粉丝选中显示*/
.myIncome-right-avtive{display: block !important;}

/*我的粉丝选中样式*/
.fansNav-active{color: #fff;background: #3babf5;cursor: default !important;}
.fansTable-active{display: block !important;}

.alertBox{height: 480px !important;}
.alert{height: 420px !important;}

.cf:after{content: '';display: block;clear: both;}

/*底部分页样式*/
.pagination{margin: 20px auto;text-align: center;}
</style>
<style type="text/css">
/*底部分页UI组件样式*/

/*左右按钮到底不可选时的样式*/
.pagination  .btn-active{background: #bbb !important;border: none !important;}

/*左右按钮字体大小*/
.pagination .el-pagination .btn-prev .el-icon,.pagination  .el-pagination .btn-next .el-icon{font-size: 15px;}
/*左右按钮样式*/
.pagination  .btn-prev,.pagination .btn-next{width: 80px !important;height: 40px !important;background: #fff !important;color: #000000 !important;border: 1px solid #bbb !important;box-sizing: border-box;}

/*分页数字按钮样式*/
.pagination  .number{width: 60px !important;height: 40px !important;border: 1px solid #bbb !important;line-height: 38px !important;color: #000000 !important;background: #fff !important;box-sizing: border-box;}
/*分页数字选中样式*/
.pagination  .el-pagination.is-background .el-pager li:not(.disabled).active{border: none !important;background: #3BABF5 !important;color: #fff !important;}

/*分页省略号*/
.pagination  .el-pagination.is-background .el-pager li{width: 40px;height: 40px;background: #fff;color: #000000;line-height: 38px;font-size: 15px;}
</style>