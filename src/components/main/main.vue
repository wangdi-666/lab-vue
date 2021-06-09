<template>
	<section class="home">
		<div class="layout">
            <!--头部-->
            <Layout>                
                <Header :style="{padding: 0}" class="layout-header-bar" style="display: flex;align-content: center;">
                    <headbar></headbar>
                </Header>
            </Layout>
            <!--主体-->
	        <Layout id="section">
                    <nvabar></nvabar>
                    <transition name="fade" mode="out-in">
                        <div class="section-right">
                            <router-view></router-view>
                        </div>
                    </transition>
	        </Layout>
            <!--底部-->
            <Layout>                
                <div id="footer">
                    <h2>{{footerTitle}}</h2>
                </div>
            </Layout>
        </div>
	</section>
</template>

<script>
    import headbar from '@/components/headbar/headbar';
    import nvabar from '@/components/nvabar/nvabar';
    import {FOOTER_TITLE} from '@/config/config.js';
	 export default {
	 	components:{
             headbar,
             nvabar          
	 	},
        data () {
            return {
               footerTitle: FOOTER_TITLE,
            }
        },
        computed: {
            
        },
        methods: {
            
        }
    }
</script>
<style lang="less">
@import url('./main.less');
</style>