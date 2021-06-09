<template>
    <div class="padding-20">
		<!-- 操作按钮 -->
         <div class="btn-list search">
			 <Input v-model="params.lab" placeholder="实验室名" style="width: 100px;margin-right: 10px;" />
			 <Button style="margin-right: 10px;" type="primary" @click="loadList">查询</Button>
			 <Button type="primary" @click="add">新增实验室</Button>
		 </div>
		<!-- 列表 -->
		<Table :columns="columns" :data="tableData" size="small"  border :height="tableH">
			<!-- <template slot="action" slot-scope="{row}">
				 <Button type="primary" @click="RK(row)">采购</Button>
				 <Button type="primary" @click="CK(row)">退货</Button>
			</template> -->
		</Table>
		
		
		<!-- 分页 -->
       <!-- <Page id="page" class="pages" :total="allTotal" show-total @on-change="handleChange" :current="params.index" :page-size="params.num" /> -->
		
		<!-- 新增维修用料 -->
		<add v-if="showAdd" @close="addClose" :detailData="detailData"></add>
		<!-- 入库 -->
		<RK v-if="showRK" @close="RKClose" :detailData="detailData" ></RK>
		<!-- 出库 -->
		<CK v-if="showCK" @close="CKClose" :detailData="detailData" ></CK>
    </div>
</template>
<script>
import page from '@/components/page.vue';
import add from './components/add.vue';
import RK from './components/RK.vue';
import CK from './components/CK.vue';
import {getTableH} from '@/utils/index.js';
export default {
    components: {
		add,
		RK,
		CK,
    },
    data () {
        return {
			// 查询
			// 用户列表
            tableH: 400,
            allTotal: 99,
			// 参数
            params: {
				lab: '',
            },
			type: '',
			curJK: '',
			tableData: [],
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
			  
			],
			
			showAdd: false,// 新增维修用料显示控制
			showRK: false,// 入库显示控制
			showCK: false,// 出库显示控制
			detailData: {},
			
        }
    },
    mounted () {
		this.loadList();
		// this.tableH = window.innerHeight - this.$refs.table.$el.offsetTop - 60
        // this.tableH = getTableH(['search']);//获取表格高度
		
    },
	methods: {
		// 用户列表获取
		loadList () {
			this.axios({
				url: '/lob/queryLab',
				method: 'GET',
				params: this.params,
				headers: {
					'AUTHORIZATION': this.$store.state.user.user.token,
				}
			}).then(res => {
				if (res.data.code == 200) {
					this.tableData = res.data.data;
					console.log('===',this.tableData)
				}else{
					this.$Message.error('请求失败');
				}
			}).catch(err => {
				this.$Message.error('请求失败');
				console.log(err);
			})
		},
		// 查询
		search() {
			// 根据名称查询
			this.loadList();
		},
		// 分页
		handleChange(value) {
			this.params.index = value;
			this.loadList();
		},
		// 新增维修用料
		add(){
			this.showAdd = true;
		},
		addClose(type) {
			if (type == 'loadData') {
				this.loadList();
			}
			this.showAdd = false;
		},
		// 入库
		RK(row) {
			this.showRK = true;
			this.detailData = row;
		},
		RKClose(type) {
			if (type == 'loadData') {
				this.loadList();
			}
			this.showRK = false;
		},
		// 出库
		CK(row) {
			this.showCK = true;
			this.detailData = row;
		},
		CKClose(type) {
			if (type == 'loadData') {
				this.loadList();
			}
			this.showCK = false;
		},
	}
}
</script>

<style>
	.btn-list{
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}
	.color-red{
		color: red;
	}
	.padding-20{
		padding: 20px 20px;
	}
</style>
