<template>
  <div>
    <viewer :images="prevArr">
      <div class="imgdiv">
        <div class="demo-upload-list" v-show="fileGuid">
            <img v-for="(src,srcIndex) in prevArr" :src="src" :key="srcIndex" class="imgs" />
            <div class="demo-upload-list-cover over">
              <Icon size="20" type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
            <Progress v-if="uplodaFile.showProgress" :percent="uplodaFile.percentage" hide-info></Progress>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="(value)=> handleSuccess(index, value)"
          :on-progress="handleProgress"
          :before-upload="uploadComfir"
          :format="['jpg','jpeg','png']"
          multiple
          type="drag"
          :action="baseURL+url"
          class="upload"
        >
          <Icon type="ios-camera" size="60" class="ios-camera" title = "上传文件"></Icon>
        </Upload>
      </div>
    </viewer>
  </div>
</template>

<script>
import Viewer from 'v-viewer/src/component.vue';
import 'viewerjs/dist/viewer.css'
export default {
  components: {
    Viewer
  },
    props: {
        fileGuid: {
            type: String,
            default () {
                return "";
            }
        },
        index: {
            type: Number,
            default() {
                return 0;
            }
        },
        title: {
            type: String,
            default () {
                return '';
            }
        },
        attr: {
            type: String,
            default () {
                return '';
            }
        }
    },
  data() {
    return {
      showPreview: false,
      token: this.$store.state.user.token,
      baseURL: this.axios.defaults.baseURL,
      url: "/API/DAM/UpLoad/" + this.$store.state.user.token + "?ITEM="+this.title,
      prevArr: [this.axios.defaults.baseURL+'/API/DAM/ShowAsData/'+this.$store.state.user.token+'/'+this.fileGuid],
      uplodaFile: {},
      options: {
        "navbar": false
      }
    };
  },
  watch:{
    "fileGuid" (newVal, oldVal) {
      this.prevArr = [this.axios.defaults.baseURL+'/API/DAM/ShowAsData/'+this.$store.state.user.token+'/'+newVal];
    }
  },
  methods: {
    chooseImage(path) {
      return new Promise ((resolve, reject) => {
        let img = new Image();  
        img.src = path; // 要压缩的图片
        img.onload = function () {
          if(this.width > 1500){
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let base = this.width/this.height;
            canvas.width = 1500;
            canvas.height = Math.floor(1500/base);
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
            canvas.toBlob(function (fileSrc) {
              let imgSrc = window.URL.createObjectURL(fileSrc);//原生JS生成文件路径
              resolve(imgSrc);
            });
          }else{
            resolve(path);
          }
        }
        img.onerror=function(){
          console.log('图片压缩失败');
          resolve(path);
        }
      })
    },
    uploadComfir (file) {//上传图片确认
      return new Promise((resolve,reject) => {
            if(this.fileGuid){
                this.$Modal.confirm({
                    title: "提示",
                    content: "只能上传一张图片，继续上传将覆盖已有的图片",
                    onOk: () => {
                        resolve(true);
                    },
                    onCancel: () => {
                        reject(false);
                    }
                });
            }else{
                resolve(true);
            }
        })
    },
    handleView(index) {
      //预览图片
      this.showPreview = true;
    },
    handleRemove(index) {
        let _this = this;
      //删除图片
      this.$Modal.confirm({
        title: "提示",
        content: "是否删除此图片？",
        onOk: () => {
          this.$emit("removePic", {index, key: _this.attr});
        },
        onCancel: () => {}
      });
    },
    handleProgress(event, file, fileList){//正在上传
      this.uplodaFile = fileList[fileList.length-1];
    },
    handleSuccess(index, res) { //上传成功
       this.$emit("uploadPic", {index, GUID: res.GUID, key: this.attr});
    }
  },
  mounted() {
  }
};
</script>
<style lang="less" scoped>
@import url("./upload-img-file.less");
</style>
<style lang="css" scoped>
>>> .ivu-upload-drag{
  height: 100%;
}
</style>

