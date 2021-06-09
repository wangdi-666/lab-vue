	<template>
    <div class="sider-container">
         <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
            <Menu theme="dark" width="auto" :class="menuitemClasses" accordion >
                <div >
                    <!-- 有子级 -->
                    <div v-if="stateLvl == '系统管理员' && memuList[0]">
						<Submenu :name="memuList[0]">
						    <template slot="title">
						        <span>{{memuList[0].meta.title}}</span>
						    </template>
						    <MenuItem :name="child.name"  
						    v-show="showMenuList(child)"
						    v-for="child in memuList[0].children" 
						    @click.native="go(child.name)" 
						    :key="child.name">{{child.meta.title}}</MenuItem>
						</Submenu>
					</div>
					<div v-if="stateLvl == '系统管理员' && memuList[1]">
						<Submenu :name="memuList[1]">
						    <template slot="title">
						        <span>{{memuList[1].meta.title}}</span>
						    </template>
						    <MenuItem :name="child.name"  
						    v-show="showMenuList(child)"
						    v-for="child in memuList[1].children" 
						    @click.native="go(child.name)" 
						    :key="child.name">{{child.meta.title}}</MenuItem>
						</Submenu>
					</div>
					<div v-if="stateLvl == '普通用户'">
						<Submenu :name="memuList[2]">
						    <template slot="title">
						        <span>{{memuList[2].meta.title}}</span>
						    </template>
						    <MenuItem :name="child.name"  
						    v-show="showMenuList(child)"
						    v-for="child in memuList[2].children" 
						    @click.native="go(child.name)" 
						    :key="child.name">{{child.meta.title}}</MenuItem>
						</Submenu>
					</div>
                </div>
            </Menu>
        </Sider>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isCollapsed: false,
            memuList: [],//侧边栏列表,
            access: '',
			stateLvl:this.$store.state.user.user.sysRole.roleName,
            role:''
        }
    },
    computed: {
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
    },
    methods: {
        getShowRoute (routes) {//计算能显示在侧边栏的路由
            this.memuList = routes.filter( item => {
                return item.meta && item.meta.showMenu;
            });
        },
        showMenuList (route) {
            return route.meta && route.meta.showMenu ?true:false;
        },
        go (toName, id) {//跳转路由
            this.$router.push({ name: toName, params: {}})
        }
    },
    created () {
        let routes = this.$router.options.routes;
        this.getShowRoute(routes);
    },
}
</script>
<style scoped="scoped">
    .sider-container, .sider-container>div{
        height: 100%;
        width: 200px;
        background-color: #515a6e;
        text-align: left;
    }
</style>
