<template>
    <div class="pop-container">
        <div class="pop-section">
            <!-- 头部 -->
            <div class="pop-header">
                <h5>{{title}}</h5>
                <Icon type="md-close" size="24" class="icon" @click="close"/>
            </div>
            <!-- 主体 -->
            <div class="content" :style="{width: width}">
                <slot></slot>
            </div>
            <!-- 按钮 -->
            <div class="btn">
                <slot name="btns"></slot>
                <Button type="primary" @click="save" style="margin-right:10px;" class="btncolor" v-if="showSave">保存</Button>
                <Button type="primary" @click="close"  class="btncolor">关闭</Button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {//标题
            type: String,
            default () {
                return "";
            }
        },
        showSave: {//保存按钮显示
          type: Boolean,
          default () {
            return true;
          }
        },
        width: {//内容区域宽度
          type: String,
          default () {
            return "100%";
          }
        }
    },
    data(){
        return {}
    },
    methods: {
        close () {
            this.$emit('close');//触发事件，和父组件通信
        },
        save () {//保存
            this.$emit('save');
        },
    },
}
</script>
<style lang="less" scoped>
@import url("./edit-pop.less");
</style>
