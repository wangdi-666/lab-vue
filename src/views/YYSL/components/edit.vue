<template>
	<div>
		<editPop  :title="status == 1 ? '修改教师信息' : '查询教师信息'" @close="addClose" @save="submit">
			<div class="form-container">
				<Form :model="form" >
				  <FormItem label="用户名">
				    <Input v-model="form.username" placeholder="用户名" :disabled="status == 2 "></Input>
				  </FormItem>
				  <FormItem label="手机号码">
				    <Input v-model="form.mobile" placeholder="手机号码" :disabled="status == 2"></Input>
				  </FormItem>
				  <FormItem label="教师信息">
				    <Input v-model="form.remark" placeholder="教师信息" :disabled="status == 2"></Input>
				  </FormItem>
				</Form>
			</div>
		</editPop>
	</div>
</template>

<script>
	import editPop from '@/components/edit-pop/edit-pop.vue';
	export default {
	    components: {
	        editPop,
	    },
		props: {
			detailData: {
				type: Object,
				default () {
					return {}
				}
			},
			status: {
				type: String,
				default () {
					return {}
				}
			},
		},
	    data () {
	        return {
					form: {
						username:'',
						mobile:'',
						remark:'',
						id:'',
						status:'',
					},
	        }
	    },
	    mounted () {
	        this.form = Object.assign( this.form,this.detailData);
	    },
		methods: {
			// 提交
			submit() {
				if(this.status == '1'){
					this.form.id = this.form.id.toString();
					this.form.status = this.form.status.toString();
					this.axios({
						url: 'lob/updateTeacher',
						method: 'post',
						data: this.form,
						headers: {
							'AUTHORIZATION': this.$store.state.user.user.token,
						}
					}).then(res => {
						this.$Message.success('修改成功');
						this.$emit('close','loadData');
						this.$parent.status = '1'
					}).catch(err => {
						this.$Message.error('请求失败');
						console.log(err);
					})
				}else{
					this.addClose();
				}
				
				
			},
			addClose() {
				this.$parent.status = '1'
				this.$emit('close');
				
			},
		}
	}
</script>

<style scoped>
	.form-container{
		margin: 0 auto;
		display: flex;
		align-items: center;
		height: 100%;
		width: 300px;
	}
	>>>.ivu-form-item{
		display: flex;
	}
	>>>.ivu-form-item-label{
		width: 100px;
	}
</style>
