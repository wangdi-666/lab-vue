<template>
	<div>
		<editPop title="课程实验管理" @close="addClose" @save="submit">
			<div class="form-container">
				<Form :model="form" >
				  <FormItem label="课程名称">
				    <Input v-model="form.lessonName" placeholder="课程名称"></Input>
				  </FormItem>
				  <FormItem label="授课老师">
				    <Input v-model="form.lessonTeacher" placeholder="授课老师"></Input>
				  </FormItem>
				  <FormItem label="学生数量">
				    <Input v-model="form.lessonCount" placeholder="学生数量"></Input>
				  </FormItem>
				  <FormItem label="第几周">
				    <Input v-model="form.lessonWeek" placeholder="第几周"></Input>
				  </FormItem>
				  <FormItem label="第几节课">
					  <!-- v-model="form.lessonOrder" -->
						<Select style="width:162px" v-model="form.lessonOrder" >
					        <Option v-for="item in cityList" :value="item.lessonOrder" :key="item.lessonOrder">{{ item.lessonOrder }}</Option>
					    </Select>
				  </FormItem>
				</Form>
			</div>
		</editPop>
	</div>
</template>

<script>
	import editPop from './edit-pop/edit-pop.vue';
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
				cityList:[
					{
						lessonOrder: '1',
						lessonOrder: '1'
					},
					{
						lessonOrder: '2',
						lessonOrder: '2'
					},
					{
						lessonOrder: '3',
						lessonOrder: '3'
					},
					{
						lessonOrder: '4',
						lessonOrder: '4'
					},
					{
						lessonOrder: '5',
						lessonOrder: '5'
					},
					
				],
	            form: {
							lessonName:'',
							lessonTeacher:'',
							lessonCount:'',
							lessonWeek:'',
							lessonOrder:'',
					}
	        }
	    },
		methods: {
			// 提交
			submit() {
				this.axios({
					url: '/lob/addLes',
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
