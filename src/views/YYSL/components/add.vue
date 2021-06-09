<template>
	<div>
		<editPop title="添加教师信息" @close="addClose" @save="submit">
			<div class="form-container">
				<Form :model="form" >
				  <FormItem label="姓名">
				    <Input v-model="form.username" placeholder="张三"></Input>
				  </FormItem>
				  <FormItem label="密码">
				    <Input v-model="form.password" type="password" placeholder="888888"></Input>
				  </FormItem>
				  <FormItem label="电话">
				    <Input v-model="form.mobile" placeholder="15874178202"></Input>
				  </FormItem>
				  <FormItem label="教师信息">
				    <Input v-model="form.remark" placeholder="物理老师"></Input>
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
			}
		},
	    data () {
	        return {
	            form: {
						remark:'',
						password: '',
						username: '',
						mobile:'',
						"flag": "1",
						"sysRole": {
								"roleName": "普通用户"
							}
					}
	        }
	    },
		methods: {
			// 提交
			submit() {
				this.axios({
					url: '/lob/addUser',
					method: 'post',
					data: this.form,
					headers: {
						'AUTHORIZATION': this.$store.state.user.user.token,
					}
				}).then(res => {
					this.$Message.success('添加成功');
					this.$emit('close','loadData');
				}).catch(err => {
					this.$Message.error('请求失败');
					console.log(err);
				})
			},
			addClose() {
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
