<template>
	<section class="headbar">
		<div class="logo">
			<img src="@/assets/images/sys.png" alt="logo">
			<h1>{{systemName}}</h1>
		</div>
		<div class="right">
			<!-- <div class="top" @click="change()">
				修改密码
			</div> -->
			<!-- <div class="name">{{userName}}</div>s -->
			<div class="exit" @click="loginOut">退出</div>
			<screen v-model="isFullscreen" style="margin-right: 10px;"></screen>
		</div>		
		<!-- 修改密码 -->
		<pwd v-if="showPwd" @close="close"></pwd>
	</section>
</template>

<script>
	import screen from '@/components/headbar/allscreen/screen';
	import pwd from "./component/pwd";
	import { SYSTEM_NAME} from '@/config/config.js';
	export default{
		components:{
			 screen,
			 pwd     
		 },
		data(){
			return{
				systemName: SYSTEM_NAME,
				showPwd: false,
				isFullscreen: false,
			}
		},
		computed: {
			// userName () {
			// 	return this.$store.state.user.user.NAME;
			// }
        },
		methods:{
			close () {
				this.showPwd = false;
			},
			change () {
				this.showPwd=true;
			},
			/* 退出 */
			loginOut () {
				this.$router.push("/login");
			},
		},
	}
</script>

<style lang="less">
	@import url("./headbar.less");
</style>
<style>
	.ivu-layout-header{
		height: 50px !important;
	}
</style>>
