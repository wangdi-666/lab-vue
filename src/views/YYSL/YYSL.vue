<template>
	<div class="padding-11">
		<!-- 操作按钮 -->
		<div class="margin-btn search">
			<Input v-model="params.username" placeholder="名称" style="width: 100px;margin-right: 10px;" />
			<Button type="primary" @click="add" style="margin-right: 10px;">新增</Button>
		</div>
		<!-- 列表 -->
		<!-- <Table :columns="columns" :data="tableData" size="small" border :height="tableH"> -->
		<Table :columns="columns" :data="tableData" size="small" border :height="tableH">
			<!-- <template slot="state" slot-scope="{row}">
				<span>{{row.state == 2?'已处理':'未处理'}}</span>
			</template> -->
			<template slot="action" slot-scope="{row}">
					<!-- <Button type="primary" @click="add()">增</Button> -->
					<Button type="primary" @click="deleteRow(row)">删</Button>
					<Button type="primary" @click="edit(row)">改</Button>
					<!-- <Button type="primary" @click="edit(row,'1')">查</Button>LA -->
			</template>
		</Table>

		<!-- 分页 -->
		<!-- <Page id="page" class="pages" :total="allTotal" show-total @on-change="handleChange" :current="params.index" :page-size="params.num" /> -->

		<!-- 新增 -->
		<add v-if="showAdd"   @close="addClose"></add>
		<!-- 修改 -->
		<edit v-if="showEdit" :detailData="detailData" :status="status"  @close="editClose"></edit>
	</div>
</template>
<script>
	import add from './components/add.vue';
	import edit from './components/edit.vue';
	import {
		getTableH
	} from '@/utils/index.js';
	export default {
		components: {
			add,
			edit
		},
		data() {
			return {
				// 查询
				dateRange: '',
				// 用户列表
				tableH: 400,
				allTotal: 99,
				params: {
					username: '',
				},
				idPargram:{
					id: '',
				},
				type: '',
				curJK: '',
				tableData: [],
				tableData1: [],
				columns: [{
						title: '序号',
						align: 'center',
						type: 'index'
					},
					{
						title: '用户姓名',
						align: 'center',
						key: 'username'
					},
					{
						title: '用户账号',
						align: 'center',
						key: 'mobile'
					},
					{
						title: '用户信息',
						align: 'center',
						key: 'remark'
					},
					{
						title: '用户状态',
						align: 'center',
						key: 'status'
					},
					{
						title: '操作',
						align: 'center',
						slot: 'action',
						minWidth: 80,
						fixed: 'right'
					},
				],
				// 新增
				showAdd: false,
				status:1,
				// 修改
				showEdit: false,
				detailData: {}
			}
		},
		mounted() {
			// this.tableH = getTableH(['search', 'pages']);//获取表格高度
			// this.tableH = getTableH(['search']); //获取表格高度
			this.loadList();
			console.log('user',this.$store.state.user.user)
		},
		methods: {
			// 删除
			deleteRow(deIndex){
				this.idPargram.id = deIndex.id.toString() ;
				this.axios({
					url: '/lob/deleteTeacher',
					method: 'POST',
					data: this.idPargram,
					headers: {
						'authorization': this.$store.state.user.user.token,
					}
				}).then(res => {
					this.$Message.success('删除成功');
					if (res.data.code == 200) {
						this.loadList();
					}
				}).catch(err => {
					this.$Message.error('删除失败');
					console.log(err);
				})
			},
			// 用户列表获取
			loadList() {
				this.axios({
					url: '/lob/queryTeacher',
					method: 'GET',
					headers: {
						'AUTHORIZATION': this.$store.state.user.user.token,
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.tableData = res.data.data;
					} else {
						this.$Message.error('请求失败');
					}
				}).catch(err => {
					this.$Message.error('请求失败');
				})
			},
			showAddPop() {
				this.showAdd = true;
			},
			showEditPop() {
				this.showEdit = true;
			},
			addClose(type) {
				if (type == 'loadData') {
					this.loadList();
				}
				this.showAdd = false;
			},
			editClose(type) {
				if (type == 'loadData') {
					this.loadList();
				}
				this.showEdit = false;
			},
			// 编辑
			edit(row,status) {
				if(status == '1'){
					this.status = '2'//查询
				}
				this.detailData = row;
				this.showEditPop();
			},
			// 添加
			add() {
				this.showAddPop();
			},
			// 查询
			search() {
				this.params.index = 1;
				this.loadList();
			},
			// 分页
			handleChange(value) {
				this.params.index = value;
				this.loadList();
			}
		}
	}
</script>

<style scoped="scoped">
	.padding-11{
		padding: 20px 20px;
	}
	.btn-list {
		display: flex;
		align-items: center;
		padding: 20px 40px;
	}

	.color-red {
		color: red;
	}
	.flex{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.margin-btn{
		display: flex;
		justify-content: start;
		margin-bottom: 20px;
	}
</style>
