<template>
  <span>
      <Button type="primary"  style="margin-right:10px;" @click="exportExcel()">
        <Icon type="ios-download-outline"></Icon>导出Excel
      </Button>
  </span>
</template>

<script>
import { saveAs } from 'file-saver';
import { resolve } from 'path';
import { reject } from 'q';
export default {
    props:{
        datas: {
          type: Array,
          default () {
            return []
          }
        }
    },
  data () {
    return {
     
    }
  },
  methods: {
      setDatas () {
        return new Promise((resolve,reject) => {
          let datas = this.datas;
          for(var i = 0; i<datas.length; i++) {
            datas[i]._expanded = true;
          }

          if(i == datas.length) {
            resolve()
          }else{
            reject()
          }
        })
        
      },
      exportExcel () {//导出excel文件
        this.setDatas().then(() => {
          var blob = new Blob([document.getElementsByClassName("exportTable")[0].outerHTML], {
                type: "text/plain;charset=utf-8"
            });
          saveAs(blob, "export.xls");
        })
      }
  }
}
</script>
<style scoped>

</style>
