<template>
  <div class="search-container">
    <Form :model="formItem" class="myForm" ref="formItem" inline>
      <FormItem label>
        <Input v-model="formItem.name" placeholder=""></Input>
      </FormItem>
       <!-- 查询搜索项插槽 -->
      <slot name="searchOptions"></slot>
      <FormItem label>
        <Button type="primary" @click="loadData(1)">查询</Button>
      </FormItem>
      <FormItem label>
        <Button type="primary" @click="highShow">高级查询</Button>
      </FormItem>
       <!-- 查询按钮插槽 -->
      <slot name="searchBtns"></slot>
      <!-- 高级搜索 -->
      <div class="show-high-seach" v-show="showHighSeach">
        <div class="kuang">
            <!-- 高级查询插槽 -->
          <slot name="highSearchOptions"></slot>
        </div>
        <div class="allbtn">
          <Button type="primary" @click="reset('formItem')" style="margin-right:10px;">重置</Button>
          <Button type="primary" @click="loadData" style="margin-right:10px;">查询</Button>
          <Button type="primary" @click="close">关闭</Button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
/* 接受formItem表单参数，接受loadData返回参数方法，接受reset返回参数方法 
*HTML接受插槽searchOptions: 查询搜索项插槽
*searchBtns: 查询按钮插槽
*highSearchOptions: 高级查询插槽
*/
export default {
  props: {
    formItem: {
      type: Object,
      default() {
          return {
              name: ''
          }
      }
    }
  },
  data() {
    return {
      showHighSeach: false,
    };
  },
  methods: {
    highShow() {//高级查询显示隐藏
        this.showHighSeach = !this.showHighSeach;
    },
    loadData() {//查询
      this.$emit('loadData', 1);
    },
    close() {//隐藏高级查询
      this.showHighSeach = false;
    },
    reset(index) {//重置
       this.$emit('reset');
    },
  },
};
</script>
<style lang="less" scoped>
@import url("./search.less");
</style>
<style lang="css" scoped>
>>> .ivu-form-item {
  margin-bottom: 0;
}
</style>