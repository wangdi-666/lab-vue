<template>
	<div>
		<editPop title="采购" @close="close" @save="save">
			<div class="form-container">
			<Form :model="form">
				<FormItem label="配件编码">
					<Input v-model="form.materialcode" placeholder="配件编码"></Input>
				</FormItem>
				<FormItem label="配件名称">
					<Input v-model="form.material" placeholder="配件名称"></Input>
				</FormItem>
				<FormItem label="所属车型">
					<Input v-model="form.department" placeholder="所属车型"></Input>
				</FormItem>
				<FormItem label="配件数量">
					<Input v-model="form.count" type="number" placeholder="配件数量"></Input>
				</FormItem>
				<FormItem label="配件价格">
					<Input v-model="form.amount" placeholder="配件价格"></Input>
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
		data() {
			return {
				form: {
					count: 0,
				}
			}
		},
		mounted() {
			this.form = Object.assign( this.form,this.detailData);
			this.form.count = parseInt(this.form.count);
		},
		methods: {
			// 保存
			save() {
				this.form.count = parseInt(this.form.count);
				this.axios({
					url: '/api/purchase',
					method: 'post',
					data: this.form,
					headers: {
						'AUTHORIZATION': this.$store.state.user.user.token,
					}
				}).then(res => {
					this.$Message.success('保存成功');
					this.$emit('close','loadData');
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
