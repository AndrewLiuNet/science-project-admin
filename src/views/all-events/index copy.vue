<template>
  <div>
    大事记页面
    <el-card>
      <div id="demo1" ref="edirRef"></div>
      <el-button type="primary" @click="editorBtn">确 定</el-button>
    </el-card>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  name: "AllEvents",
  data() {
    return {
      editor: null,
      editorData: "",
      desc: "",
    };
  },
  mounted() {
    this.createEditor();
  },
  methods: {
    editorBtn() {
      this.desc = this.editor.txt.html();
      console.log(this.desc);
    },
    //创建富文本编辑器
    createEditor() {
      // setTimeout(() => {
      //创建模态框容器
      const editor = new wangEditor(`#demo1`);
      //打开上传图片功能
      editor.config.uploadImgServer =
        process.env.VUE_APP_BASE_API + "/api/yb_Memorabilia/UploadFiles_1";
      // editor.config.uploadImgServer =
      //   "http://101.34.35.79:80/api/yb_Memorabilia";
      editor.config.uploadFileName = "file";
      editor.config.debug = true;
      editor.config.uploadImgTimeout = 5 * 1000 * 100;
      editor.config.uploadImgHooks = {
        // 图片上传并返回了结果，图片插入已成功
        success: function (xhr) {
          console.log("success", xhr);
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function (xhr, editor, resData) {
          console.log(xhr);
          console.log("fail", resData);
          console.log(editor);
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function (xhr, editor, resData) {
          console.log("error", xhr, resData);
        },
        customInsert: function (insertImgFn, result) {
          // result 即服务端返回的接口
          console.log("customInsert", result);
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn(result.data);
        },
      };
      // const template = row.desc;
      // this.$refs.edirRef.innerHTML = template;
      //富文本内容改变的事件
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml;
      };
      // 创建编辑器
      editor.create();
      this.editor = editor;
      // }, 0);
    },
  },
};
</script>
<style scoped>
#demo1 {
  margin-top: 50px;
}
</style>