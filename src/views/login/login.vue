<template>
  <div>
    <loading v-show="loading"></loading>
    <div class="login-bg">
      <div>
        <div class="logo">
          <img src="@/assets/images/sys.png" alt />
          <h1>{{systemName}}</h1>
        </div>
        <div class="login-form">
          <Form action ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="账号">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" @keyup.native.enter="toLogin('formInline')" placeholder="密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem class="checked-pw">
              <Checkbox v-model="checked">记住密码</Checkbox>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="toLogin('formInline')">登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import {apiLogin} from '@/API/login/index';
import loading from '@/components/loading.vue';
import {SYSTEM_NAME} from '@/config/config.js';
import * as login from './login.js';

const splitFH = (str) => {//切割分号
  return str.split("; ");
}
const splitDH = (str) => {//切割等号
  return str.split("=");
}

export default {
	components: {
		loading
	},
  data() {
    return {
	  loading: false,
    systemName: SYSTEM_NAME,
      formInline: {
		  // 15874146029
		  // 888888
        user: "",
        password: ""
      },
      checked: false,
      ruleInline: {
        user: [{ required: true, message: "请填写账号", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
	  getParams() {//用户输入的账号和密码
		  return {
          mobile: this.formInline.user.trim(),
          password: this.formInline.password.trim()
        }
	  },
    toLogin (formInline) {//登录
      let _this = this;
      this.$refs[formInline].validate(valid => {
        if (valid) {
          _this.loading = true;
		 
          _this.axios({
            method: "post",
            url: '/lob/login',
            data: _this.getParams()
          }).then(res => {
			  if (res.data.code == 200) {
				  _this.$Message.success("登录成功!");
				  _this.$store.commit('set_user', res.data.data)
				  _this.savePW();//记住密码
				  _this.goHome();
			  }else{
				  _this.$Message.error(res.data.msg);
			  }
                _this.loading = false;
            })
            .catch(error => {
              _this.loading = false;
              _this.$Message.error("登录失败!");
              console.log(error);
            });
        } else {
          _this.$Message.error("请填写登录账号或密码！");
        }
      });
    },
    goHome() {//跳转到首页
      this.$router.push({ name: "home" });
    },
    savePW () {// 记住密码
      if (login.isTrue(this.checked)) {//判断复选框是否被勾选
        this.setCookie(this.formInline.user,this.formInline.password, 30,"true");
      } else {
        this.setCookie("", "", -1, "false");
      }
    },
    setCookie(c_name, c_pwd, exdays, remeberFlag) {//设置cookie
      let exdateStr = login.getStrTime(exdays);

      login.setWinCookie({cookieName: "userName", cookieValue: c_name, exdateStr});
      login.setWinCookie({cookieName: "userPwd", cookieValue: c_name, exdateStr});
      let remeberFlagName = login.getRemeberFlag(this.systemName);
      login.setWinCookie({cookieName: remeberFlagName, cookieValue: remeberFlag, exdateStr});
       
    },
    getCookie() { //读取cookie
        if (document.cookie.length > 0) {
          let cookieArr = splitFH(document.cookie); //这里显示的格式需要切割一下自己可输出看下
          cookieArr.map( item => {
            let cookieData = splitDH(item);//再次切割
            this.setCookieData(cookieData);//判断查找相对应的值
          });
        }
    },
    setCookieData(cookieData){
      let isCookieName = login.currying(login.isEqual, cookieData[0]);

      let isCookieValue = login.currying(login.isEqual, cookieData[1]);

      if (isCookieName('userName')) {
        this.setUser(cookieData[1]); 
      } else if (isCookieName('userPwd')) {
        this.setPassword(cookieData[1]); 
      } else if (isCookieName(login.getRemeberFlag(this.systemName))) {
        if (isCookieValue("true")) {
          this.setChecked(true); 
        } else {
          this.setChecked(false); 
        }
      }
    },
    setUser (value) {
      this.formInline.user = value; 
    },
    setPassword (value) {
      this.formInline.password = value; 
    },
    setChecked (value) {
      this.checked = value; 
    }
  },
  mounted() {
    this.$store.commit("set_token", "");
    this.getCookie();
  }
};
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>