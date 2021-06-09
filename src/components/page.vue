<template>
    <Page id="page" :total="allTotal" show-total @on-change="handleChange" :page-size="pageSize" />
</template>
<script>
    export default {
        props: {           
            objName: {//分页请求对象名称
                type: String,
                default () {
                    return 'formItem'
                }
            },
            allTotal: {//总数
                type: Number,
                default () {
                    return 0;
                }
            },
            pageSize: {//每页条数
                type: Number,
                default () {
                    return 20;
                }
            }
        },
        data () {
            return {}
        },
        methods: {
            handleChange (page) {//改变页数
                this.$emit("changePage",page);
            }
        }
    }
</script>
 
<style>
.ivu-page{
    padding: 10px 0;
}
</style>
