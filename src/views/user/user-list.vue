<template>
    <div>
		<!-- 操作按钮 -->
         <div class="btn-list search">
			 <Button type="primary" @click="showAddUser">新增用户</Button>
		 </div>
		<!-- 用户列表 -->
			<Table :columns="columns" :data="tableData" size="small"  border :height="tableH">
				<template slot="type" slot-scope="{row, index}">
					<RadioGroup v-model="row.type" :on-change="editUser(row,index)" :class="row.type == '危险'?'color-red':''">
						  <Radio label="健康" value="健康"></Radio>
						  <Radio label="危险" value="危险" ></Radio>
					</RadioGroup>
				</template>
				<template slot="isqz" slot-scope="{row}">
						 <span :class="row.isqz == '是'?'color-red':''">{{row.isqz?row.isqz: '否'}}</span>
				</template>
			</Table>
		
		<!-- 分页 -->
        <page class="pages" :allTotal="allTotal" pageSize="20"></page>
				
		<!-- 新增用户 -->
		<addUser v-if="showAdd" @close="addClose" ></addUser>
    </div>
</template>
<script>
import page from '@/components/page.vue';
import addUser from './components/add-user.vue';
import {getTableH} from '@/utils/index.js';
export default {
    components: {
		addUser
    },
    data () {
        return {
			// 用户列表
            tableH: 0,
            allTotal: 99,
            params: {
                index: 1,
                num: 20,
            },
			curJK: '',
			tableData: [],
			columns: [
			    {
			        title:'序号',
			        align:'center',
			        minWidth:70,
			        type:'index'
			    },
			    {
			        title:'昵称',
			        align:'center',
			        minWidth:150,
			        key:'name'
			    },
			    {
			        title:'账号',
			        align:'center',
			        minWidth:150,
			        key:'id'
			    },
			    {
			        title:'密码',
			        align:'center',
			        minWidth:150,
			        key:'pw'
			    },
			    {
			        title:'电话号码',
			        align:'center',
			        minWidth:150,
			        key:'phone'
			    },
			    {
			        title:'健康状态',
			        align:'center',
			        minWidth:150,
			        slot:'type'
			    },
			    {
			        title:'是否需要求助',
			        align:'center',
			        minWidth:150,
			        slot:'isqz'
			    },
			],
			// 新增用户
			showAdd: false,
        }
    },
    mounted () {
		this.loadUserList();
        this.tableH = getTableH(['search', 'pages']);//获取表格高度
		
    },
	methods: {
		// 用户列表获取
		loadUserList () {
			this.axios({
				url: '/API/Home/ListUser',
				method: 'GET',
			}).then(res => {
				if (res.data) {
					this.tableData = res.data.DATA;
				}
			}).catch(err => {
				this.$Message.error('请求失败');
				console.log(err);
			})
		},
		showAddUser() {
			this.showAdd = true;
		},
		addClose(type) {
			if (type == 'loadData') {
				this.loadUserList();
			}
			this.showAdd = false;
		},
		// 编辑用户
		editUser ( row, index) {
			console.log(row)
			if (row.type != this.tableData[index].type) {
				this.axios({
					url: '/API/Home/UpUser',
					method: 'GET',
					params: {
						type: row.type,
						isqz: row.isqz,
						id: row.id,
					}
				}).then(res => {
					this.$Message.success('操作成功');
				}).catch(err => {
					this.$Message.error('请求失败');
					console.log(err);
				})
			}
		}
	}
}
</script>

<style>
	.btn-list{
		display: flex;
		padding: 20px 40px;
	}
	.color-red{
		color: red;
	}
</style>