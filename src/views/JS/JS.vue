<template>
	<div class="padding-20 search">
		<!-- 操作按钮 -->
		<div class="box-left">
			<Input v-model="params.name" placeholder="课程名称" style="width: 100px;margin-right: 10px;" />
			<Button type="primary" @click="search" style="margin-right: 10px;">查询</Button>
			<Button type="primary" @click="add()">增</Button>
		</div>
		<!-- 列表 -->
		<Table :columns="columns" :data="tableData" size="small" border :height="tableH">
			<template slot="action" slot-scope="{row}">
					<Button type="primary" @click="yyROw(row)">预约实验室</Button>
			</template>
		</Table>

		<!-- 分页 -->
		<!-- <Page id="page" class="pages" :total="allTotal" show-total @on-change="handleChange" :current="params.index" :page-size="params.num" /> -->

		<!-- 新增 -->
		<add v-if="showAdd"  @close="addClose"></add>
		<!--预约-->
		<edit v-if="showEdit" :detailData="detailData" :status="status"  @close="editClose"></edit>
	</div>
</template>
<script>
	import add from './components/add.vue';
	import edit from './components/yy.vue';
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
					name:'',
				},
				type: '',
				curJK: '',
				tableData: [],
				columns: [
					{
						title: '课程名称',
						align: 'center',
						key: 'lessonName'
					},
					{
						title: '授课老师',
						align: 'center',
						key: 'lessonTeacher'
					},
					{
						title: '学生数量',
						align: 'center',
						key: 'lessonCount'
					},
					{
						title: '第几周',
						align: 'center',
						key: 'lessonWeek'
					},
					{
						title: '第几节课',
						align: 'center',
						key: 'lessonOrder'
					},
					{
						title: '操作',
						align: 'center',
						slot: 'action',
						Width: 100,
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
			this.loadList();
			// this.tableH = getTableH(['search', 'pages']);//获取表格高度
			// this.tableH = getTableH(['search']); //获取表格高度
		},
		methods: {
			// 预约实验室
			yyROw(row){
				this.detailData = row;
				this.showEdit = true;
				
			},
			// 用户列表获取
			loadList() {
				this.axios({
					url: '/lob/queryLessons',
					method: 'GET',
					params: this.params,
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
				if(status == 1){
					this.status = 2//查询
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

<style>
	.padding-20{
		padding: 20px 20px;
	}
	.box-left {
		display: flex;
		justify-content: start;
		margin-bottom: 20px;
		
	}

	
</style>
