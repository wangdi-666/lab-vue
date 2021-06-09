<template>
  <div class="wrap_xin">
    <div class="xins">
      <div class="topi">
        <h5>修改密码</h5>
        <Icon type="md-close" size="24" class="icon" @click="close" />
      </div>
      <Form
        :model="formItem"
        label-position="left"
        :label-width="80"
        ref="formItem"
        class="myForm"
        :rules="rules"
      >
        <FormItem prop="old" label="旧密码">
          <Input v-model="formItem.old" style="width:385px;" />
        </FormItem>
        <FormItem prop="new" label="新密码">
          <Input v-model="formItem.new" style="width:385px;" />
        </FormItem>
        <FormItem prop="confirm" label="确认密码">
          <Input v-model="formItem.confirm" style="width:385px;" />
        </FormItem>
      </Form>
      <!-- 按钮 -->
      <div class="bt">
        <Button type="primary" style="margin-right:30px;" @click="save('formItem')">保存</Button>
        <Button type="primary" @click="close">关闭</Button>
      </div>
    </div>
  </div>
</template>
<script>
import {apiChangePwd} from "@/API/login/index.js";
export default {
  props: {
    editData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.formItem.confirm !== "") {
          // 对第二个密码框单独验证
          this.$refs.formItem.validateField("confirm");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码!"));
      } else if (value !== this.formItem.new) {
        callback(new Error("两次密码输入不一致!"));
      } else {
        callback();
      }
    };
    return {
      TreeData: [],
      formItem: {
        old: "",
        new: "",
        confirm: ""
      },
      rules: {
        old: [{ required: true, message: "请填写旧密码", trigger: "blur" }],
        new: [{ validator: validatePass, required: true, trigger: "blur" }],
        confirm: [
          { validator: validatePassCheck, required: true, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.axios({
            url: apiChangePwd,
            method: "post",
            data: {
              oldPwd: this.formItem.old,
              newPwd: this.formItem.new
            }
          }).then(res => {
              if (res.data.State) {
                this.$Message.success("密码修改成功!");
                this.$parent.ifPwd = false;
              }
            }).catch(err => {});
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    $$set(a, b) {
      for (var i in a) {
        b[i] = a[i];
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
@import url("./pwd.less");
</style>
