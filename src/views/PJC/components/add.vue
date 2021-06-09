<template>
	<div>
		<editPop title="新增实验室" @close="close" @save="save">
			<div class="form-container">
			<Form :model="form">
				<FormItem label="编号">
					<Input v-model="form.serail" placeholder="编号"></Input>
				</FormItem>
				<FormItem label="名称">
					<Input v-model="form.lab" placeholder="名称"></Input>
				</FormItem>
				<FormItem label="机器数量">
					<Input v-model="form.count" placeholder="机器数量"></Input>
				</FormItem>
				<FormItem label="描述">
					<Input v-model="form.remark" placeholder="描述"></Input>
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
		data() {
			return {
				form: {
					count: "",
					serail: "",
					lab: "",
					remark: ""
				}
			}
		},
		mounted() {
			
		},
		methods: {
			// 保存
			save() {
				this.form.count = parseInt(this.form.count);
				this.axios({
					url: '/lob/addLab',
					method: 'post',
					data: this.form,
					headers: {
						'AUTHORIZATION': this.$store.state.user.user.token,
					}
				}).then(res => {
					this.$Message.success('新增成功');
					this.$emit('close','loadData');
					this.$parent.loadList();
					this.close();
				}).catch(err => {
					this.$Message.error('请求失败');
					console.log(err);
				})
			},
			close() {
				this.$emit('close');
			},
		}
	}
</script>

<style scoped>
	.form-container {
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 500px;
	}

	.btn-list {
		display: flex;
		align-items: center;
		padding: 20px 40px;
	}

	.color-red {
		color: red;
	}
	>>>.ivu-form-item{
		display: flex;
	}
	>>>.ivu-form-item-label{
		width: 100px;
	}
</style>
