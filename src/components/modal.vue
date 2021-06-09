<template>
<div>
    <Modal
        title="温馨提示"
        v-model="showModal"
        @on-ok="ok"
        @on-cancel="cancel">
        <div v-show="(state===0)">
            <p>如有数据修改，请先保存,</p>
            <p>正式提交之后数据不能修改，确认要正式提交吗？</p>
        </div>
         <p v-show="(state==1)">是否确认通知{{this.$parent.form.skname}}整改?</p>
          <div v-show="(state==2)">
              <p>如有数据修改，请先保存，</p>
              <p>提交整改之后数据不能修改，确认要提交整改吗？</p>
          </div>
           <p v-show="(state==3)">是否确认申请复查？</p>
            <p v-show="(state==4)">如有数据修改，请先保存，复查完成之后数据不能修改，确认要复查完成吗？</p>
    </Modal>
</div>
</template>
<script>
    export default {
         /*  props: {
            modalData: {
            type: Object,
            default() {
                return {};
            }
            }
        }, */
        data () {
            return {
             showModal:false,
             state:''
            }
        },
        methods: {
            ok () {
                 let api = ''
                    if ((this.$parent.form.STATE%2) == 0){
                    api = 'Submit'
                    }else{
                    api= 'Change'
                    }
                    var _this=this;
                this.axios({
                    url: "/API/CHECK_RECTIFY/"+api,
                    method: "post",
                   data:{Guid:this.$parent.form.guid} 
                }).then(res =>{
                     this.$Message.success("操作成功");
                     _this.$parent.form.STATE+=1;
                     _this.$parent.curData.show=false;
                     _this.$parent.curData.loadData();
                }).catch(err =>{
                     this.$Message.success("操作失败");
                })
            },
            cancel () {
                
            }
        },
        mounted(){
            switch(this.$parent.form.STATE){
                case 0:
                    this.state=0;
                break;
                case 1:
                    this.state=1;
                break;
                case 2:
                     this.state=2;
                break;
                case 3:
                     this.state=3;
                break;
                case 4:
                    this.state=4;
                break;
            }
        },
        
    }
</script>