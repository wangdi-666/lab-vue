<template>
	<div>
		<editPop title="新增用户" @close="addClose" @save="addUser">
			<div class="form-container">
				<Form :model="form" >
				  <FormItem label>
				    <Input v-model="form.name" placeholder="用户昵称"></Input>
				  </FormItem>
					<FormItem label>
					  <Input v-model="form.id" placeholder="用户账号"></Input>
					</FormItem>
					<FormItem label>
					  <Input v-model="form.pw" placeholder="用户密码"></Input>
					</FormItem>
					<FormItem label>
					  <Input v-model="form.phone" placeholder="用户电话号码"></Input>
					</FormItem>
					<FormItem label>
					 <RadioGroup v-model="form.type">
					 	  <Radio label="健康" ></Radio>
					 	  <Radio label="危险" ></Radio>
					 </RadioGroup>
					</FormItem>
					<FormItem label>
					  <Input v-model="form.gzid" placeholder="关注的人"></Input>
					  <p>关注的人，请填写用户昵称，用户英文冒号(:)分割。</p>
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
	    data () {
	        return {
	            form: {
					name: '',
					id: '',
					pw: '',
					phone: '',
					type: '健康',
					gzid: '',
				}
	        }
	    },
	    mounted () {
	        
	    },
		methods: {
			addUser() {
				this.axios({
					url: '/API/Home/InUser',
					method: 'GET',
					params: this.form,
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
</style>
