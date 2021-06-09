<template>
	<div>
		<editPop title="预约实验室" @close="addClose" @save="submit">
			<div class="form-container">
				<!-- 操作按钮 -->
				 <div class="margin-20">
					 <Input   v-model="params.lab" placeholder="实验室名" style="width: 100px;margin-right: 10px;" />
					 <Button  type="primary" @click="LoadData">查询</Button>
					 <!-- <Button type="primary" @click="add">新增实验室</Button> -->
				 </div>
				 <!-- 列表 -->
				<Table :columns="columns" :data="tableData" size="small"  border  height="400">
					<template slot="action" slot-scope="{row}">
							<Button type="primary" @click="yyROw(row)">预约</Button>
					</template>
				</Table>
				 <!-- 分页 -->
				 <!-- <Page id="page" class="pages" :total="allTotal" show-total @on-change="handleChange" :current="params.index" :page-size="params.num" /> -->
				 		
			</div>
		</editPop>
	</div>
</template>

<script>
	import editPop from '@/components/edit-pop/edit-pop.vue';
	// import {
	// 	getTableH
	// } from '@/utils/index.js';
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
				type: Number,
				default () {
					return {}
				}
			},
		},
	    data () {
	        return {
				lesID:this.status,
				allTotal: 99,
				tableH: 0,
				tableData:[],
	            params: {
						lessonWeek:'',
						lessonName:'',
						lessonOrder:'',
						count:'',
						
				},
				columns: [
					{
					    title:'序号',
					    align:'center',
					    type:'index'
					},
				    {
				        title:'编号',
				        align:'center',
				        key:'serail'
				    },
					{
					    title:'名称',
					    align:'center',
					    key:'lab'
					},
				    {
				        title:'机器数量',
				        align:'center',
				        key:'count'
				    },
				    {
				        title:'描述',
				        align:'center',
				        key:'remark'
				    },
					{
						title: '操作',
						align: 'center',
						slot: 'action',
						Width: 100,
						fixed: 'right'
					},
				],
	        }
	    },
		methods: {
			// 预约
			yyROw(row){
				// console.log('status',this.lesID);
				// console.log('row',row.id);
				this.axios({
					url: 'lob/subscribe',
					method: 'post',
					data: {
						labID : row.id.toString(),
						lesID : this.lesID.toString(),
					},
					headers: {
					'AUTHORIZATION': this.$store.state.user.user.token,
					
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.$Message.success('预约成功');
						this.addClose();
					}
				}).catch(err => {
					this.$Message.error('预约失败');
					console.log(err);
				})
			},
			LoadData(){
				this.params.lessonWeek = this.detailData.lessonWeek.toString();
				this.params.lessonName = this.detailData.lessonName.toString();
				this.params.lessonOrder = this.detailData.lessonOrder.toString();
				this.params.count = this.detailData.lessonCount.toString();
				this.axios({
					url: '/lob/queryLabs',
					method: 'post',
					data: this.params,
					headers: {
					'AUTHORIZATION': this.$store.state.user.user.token,
					
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.tableData = res.data.data;
					}else{
						this.$Message.error('请求失败');
					}
				}).catch(err => {
					this.$Message.error('请求失败');
				})
			},
			// 提交
			submit() {
				this.axios({
					url: '/api/record',
					method: 'post',
					data: this.form,
					headers: {
						'AUTHORIZATION': this.$store.state.user.user.token,
					}
				}).then(res => {
					this.$Message.success('保存成功');
					this.$emit('close','loadData');
				}).catch(err => {
					this.$Message.error('保存失败');
				})
			},
			addClose() {
				this.$emit('close');
			},
		},
		mounted() {
			this.LoadData();
			// this.tableH = getTableH(['search']); //获取表格高度
			
		},
	}
</script>

<style scoped>
	
	>>>.ivu-form-item{
		display: flex;
	}
	
	.btn-list{
		display: flex;
		
	}
	.color-red{
		color: red;
	}
	.margin-20{
		margin-bottom: 20px ;
	}
</style>
