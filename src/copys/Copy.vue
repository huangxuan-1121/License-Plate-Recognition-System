<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-affix :offset-top="0">
      <a-layout-header class="header" :style="{ background: '#000'}">
        <div class="logo">
          <img src="../assets/images/Index/车牌识别logo.png" alt />
        </div>
        <div id="login-register-btn-wrap">
          <a-dropdown v-if="isLogin">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{userMessage.userName}}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay" @click="LoginOut">
              <a-menu-item key="1">退出</a-menu-item>
            </a-menu>
          </a-dropdown>
          <a v-else class="ant-dropdown-link" @click="e => e.preventDefault()">登录 / 注册</a>
        </div>
      </a-layout-header>
    </a-affix>
    <a-layout>
      <a-layout-sider
        class="a-layout-sider"
        :style="{ overflow: 'auto', height: '', position: 'fixed', left: 0 }"
      >
        <div id="a-layout-sider-img-container">
          <img id="a-layout-sider-img" src="../assets/images/Index/左边的图.png" alt />
        </div>
      </a-layout-sider>
      <a-layout :style="{ marginLeft: '200px',padding: '0 24px 24px' }">
        <a-affix :offset-top="64">
          <a-layout class="a-breadcrumb-wrap">
            <!-- <a-breadcrumb style="margin: 16px 0 0 0;">
              <a-breadcrumb-item>Home</a-breadcrumb-item>
              <a-breadcrumb-item>List</a-breadcrumb-item>
              <a-breadcrumb-item>App</a-breadcrumb-item>
            </a-breadcrumb>-->
          </a-layout>
        </a-affix>

        <a-layout-content
          class="a-layout-content"
          :style="{ margin: '24px  0', overflow: 'initial' }"
        >
          <div
            class="a-layout-content-wrap"
            :style="{ padding: '', background: '', textAlign: 'left' }"
          >
            <div id="img-uploader-wrap">
              <!-- <div id="empty"></div> -->
              <div id="img-uploader">
                <div id="img-title-wrap">
                  <span>图片文件</span>
                  <el-button @click="dialogFormVisible = true" size="mini">
                    <i class="el-icon-upload2"></i>Click to Upload
                  </el-button>
                  <el-dialog title="上传图片" :visible.sync="dialogFormVisible">
                    <el-upload
                      class="avatar-uploader"
                      action
                      :show-file-list="false"
                      :on-change="onUploadChange"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="this.imgbase" :src="this.imgbase" class="avatar" />
                      <!-- <img v-else src="../assets/bac.png" alt /> -->
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-radio-group v-model="radio">
                      <el-radio label="黄牌">黄牌</el-radio>
                      <el-radio label="红牌">红牌</el-radio>
                      <el-radio label="黑牌">黑牌</el-radio>
                      <el-radio label="夜间">夜间</el-radio>
                    </el-radio-group>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="submitP">确 定</el-button>
                    </div>
                  </el-dialog>
                </div>
                <a-divider />
                <div>
                  <el-tree
                    :data="treeData"
                    node-key="id"
                    :expand-on-click-node="false"
                    :props="props"
                    :load="loadNode"
                    lazy
                    @node-click="handleNodeClick"
                  >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>{{ node.label }}</span>
                      <span>
                        <i
                          class="el-icon-edit"
                          @click="(e) => {click_to_RenameImg(node, data);e.cancelBubble = true;dialogVisible = true}"
                        ></i>

                        <i
                          class="el-icon-delete"
                          @click="(e) => {click_to_deleteImg(node, data);e.cancelBubble = true;dialogVisible = true}"
                        ></i>
                      </span>
                    </span>
                  </el-tree>
                </div>
              </div>
              <!-- elementUI -->
            </div>
            <div id="result-wrap">
              <div id="resource-img-wrap">
                <div id="resource-img">
                  <a-divider class="a-divider" orientation="left">Result</a-divider>
                  <div class="title-box">
                    <a-icon type="tag" :style="{ fontSize: '18px', color: '#08c' }" />
                    <span class="title-message">原图</span>
                  </div>
                  <div id="resource-img-container">
                    <img
                      class="resource-image"
                      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1014296722,1201237690&fm=26&gp=0.jpg"
                      alt
                    />
                    <!-- <a-empty /> -->
                  </div>
                </div>
              </div>
              <div id="identification-result-wrap">
                <div id="identification-result">
                  <div class="title-box">
                    <a-icon type="tag" :style="{ fontSize: '18px', color: '#08c' }" />
                    <span class="title-message">识别结果</span>
                  </div>
                  <div id="identification-result-img-container">
                    <img
                      class="identification-result-image"
                      :src="identificationResult.debug[identificationResult.debug.length-1].filePath"
                      alt
                    />
                    <!-- <a-empty /> -->
                  </div>
                  <div class="identification-result-box">
                    <a-icon type="check-circle" :style="{ fontSize: '20px', color: '#08c' }" />
                    <span
                      class="identification-result-message"
                    >车牌：{{identificationResult.debug[identificationResult.debug.length-1].recoPlate}}</span>
                    <br />
                    <a-icon type="check-circle" :style="{ fontSize: '20px', color: '#08c' }" />
                    <span
                      class="identification-result-message"
                    >颜色：{{identificationResult.debug[identificationResult.debug.length-1].plateColor}}</span>
                  </div>
                </div>
              </div>
              <div id="identification-details-wrap">
                <div id="identification-details">
                  <div v-for="item in identificationResult.debug" :key="item.id">
                    <div class="title-box">
                      <a-icon type="tag" :style="{ fontSize: '18px', color: '#08c' }" />
                      <span class="title-message">{{item.debugType}}</span>
                    </div>
                    <div id="identification-details-img-container">
                      <div v-for="imgItem in item.filePath" :key="imgItem.id">
                        <img class="identification-details-image" :src="imgItem" alt />
                      </div>

                      <!-- <a-empty /> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer :style="{ textAlign: 'center' }">Ant Design ©2018 Created by Ant UED</a-layout-footer>
  </a-layout>
</template>
<script>
import {
  dirTree_Mock,
  fileTree_Mock,
  identificationData1,
} from "../assets/js/mockData";

import axios from "axios";
import qs from "qs";

let id = 1000;

const data = [];

export default {
  data() {
    return {
      collapsed: false,
      showLine: true,
      showIcon: false,

      headers: {
        authorization: "authorization-text",
      },
      expandedKeys: ["0-0-0", "0-0-1"],
      autoExpandParent: true,
      checkedKeys: ["0-0-0"],
      selectedKeys: [],
      treeData: [],

      // elementUI Tree 数据
      props: {
        label: "label",
        children: "children",
        isLeaf: "isLeaf",
      },

      // 用户登录状态
      isLogin: true,

      // 用户信息的数据结构
      userMessage: {
        userName: "hx666",
      },

      // 文件树的数据结构
      fileTreeRelated: {
        // 获取处理步骤时返回的数据
        getProcessStepReturnData: {},

        // 文件夹数据
        dirTree: {},
      },
      // data: JSON.parse(JSON.stringify(data)),
      // data: JSON.parse(JSON.stringify(data))
      //上传图片的图片二进制流、所选文件夹名、弹窗相关
      radio: "",
      imgbase: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 识别结果的数据结构

      // identificationResult: {},
      identificationResult: {
        id: 0,
        fileName: "",
        filePath: "",
        fileType: "",
        fileLength: 0,
        plate: null,
        plateColor: null,
        lastRecoTime: "",
        tempPath: "",
        recoPlate: null,
        recoColor: null,
        recoCorrect: 0,
        debug: [
          {
            id: null,
            parentId: null,
            fileName: "",
            filePath: "",
            debugType: "result",
            fileLength: null,
            lastRecoTime: null,
            recoPlate: "暂无数据",
            plateColor: "暂无数据",
            sort: null,
          },
        ],
      },
    };
  },
  created: function () {
    // 获取用户信息
    // this.getUserMessage();

    // 获取处理步骤
    this.getProcessStep();

    // 获取文件夹列表
    this.getDirTree();
  },
  mounted: function () {
    // 判断登录状态
    this.isLoginMod();
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    },
  },
  methods: {
    // 判断登录状态
    isLoginMod() {
      console.log(window.localStorage.data);
      if (window.localStorage.data) {
        this.isLogin = true;
        this.userMessage.userName = JSON.parse(window.localStorage.data);
      } else {
        this.isLogin = false;
        this.$router.push("/hello");
      }
    },

    // 获取用户信息
    getUserMessage() {
      axios({
        url: "http://39.106.65.18:8080/user/getUserById",
        method: "get",
        params: {
          id: window.localStorage.data,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 处理文件夹数据
    processDirTreeData(DirTreeData) {
      const treeData = [];
      for (let i = 0; i < DirTreeData.obj.length; i++) {
        treeData.push({
          label: DirTreeData.obj[i].fileName,
          id: DirTreeData.obj[i].fileName + "0-0-" + i,
          data: DirTreeData.obj[i],
        });
      }
      this.treeData = treeData;
    },

    // 处理文件数据
    processFileTreeData(FileTreeData) {
      const newdebug = [];

      newdebug.push({
        debugType: FileTreeData.obj.debug[0].debugType,
        filePath: [FileTreeData.obj.debug[0].filePath],
      });

      for (let i = 1; i < FileTreeData.obj.debug.length; i++) {
        let flag = false;
        let j;
        for (j = 0; j < newdebug.length; j++) {
          if (FileTreeData.obj.debug[i].debugType == newdebug[j].debugType) {
            flag = true;
            break;
          }
        }
        if (flag == true) {
          newdebug[j].filePath.push(FileTreeData.obj.debug[i].filePath);
        } else {
          newdebug.push({
            debugType: FileTreeData.obj.debug[i].debugType,
            filePath: [FileTreeData.obj.debug[i].filePath],
            recoPlate: FileTreeData.obj.debug[i].recoPlate,
            plateColor: FileTreeData.obj.debug[i].plateColor,
          });
        }
      }
      console.log("aaa");

      FileTreeData.obj.debug = newdebug;
      console.log(FileTreeData.obj);

      this.identificationResult = FileTreeData.obj;
    },

    // 获取处理步骤
    getProcessStep() {
      // console.log("getProcessStep running");
      axios({
        url: "api/plate/getProcessStep ",
        method: "get",
        data: {},
        transformRequest: [
          function (data) {
            data = qs.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        dataType: "json",
      })
        .then((res) => {
          // console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取文件夹列表
    getDirTree() {
      // console.log("getDirTree running");
      axios({
        url: "api/file/getFileTreeByDir",
        method: "get",
        params: {
          dir: null,
          typeFilter: "png,jpg,jpeg",
        },
        transformRequest: [
          function (data) {
            data = qs.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        dataType: "json",
      })
        .then((res) => {
          // console.log(res);
          this.fileTreeRelated.dirTree = res.data.obj;
          this.processDirTreeData(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 退出登录
    LoginOut() {
      // console.log("LoginOut Running!");
      localStorage.clear();
      this.$router.push("/hello");
    },

    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    onExpand(expandedKeys) {
      // console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      // console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }

        setTimeout(() => {
          console.log(treeNode.dataRef.children);
          console.log("a1");
          console.log(treeNode.dataRef.data);
          console.log("b1");
          // axios 请求
          axios({
            url: "api/file/getFileTreeByDir",
            method: "get",
            params: {
              dir: treeNode.dataRef.data.filePath,
              typeFilter: "png,jpg,jpeg",
            },
            transformRequest: [
              function (data) {
                data = qs.stringify(data);
                return data;
              },
            ],
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            dataType: "json",
          })
            .then((res) => {
              console.log("a3");
              console.log(res);
              console.log("b3");
              // this.fileTreeRelated.dirTree = res.data.obj;
              // this.processDirTreeData(res.data);

              const fileTree = [];
              for (let i = 0; i < res.data.obj.length; i++) {
                fileTree.push({
                  title: res.data.obj[i].fileName,
                  key: res.data.obj[i].fileName + "0-0-" + i,
                  data: res.data.obj[i],
                  isLeaf: true,
                });
              }

              treeNode.dataRef.children = fileTree;
              this.treeData = [...this.treeData];
            })
            .catch(function (error) {
              console.log(error);
            });
          //

          resolve();
        }, 10);
      });
    },

    /*
        element Tree 相关方法
    */

    // http://39.106.65.18:8080/plate/recognise?filePath=/root/PlateDetect/02_黄牌/皖A·45277.jpg&reRecognise=false
    handleNodeClick(data) {
      // console.log("a01");
      // console.log(data);
      // console.log("a2");
      if (data.isLeaf == true) {
        console.log(data.data.filePath);
        axios({
          url: "api/plate/recognise",
          method: "get",
          params: {
            // filePath: data.data.filePath,
            filePath: "/root/PlateDetect/01_蓝牌/2.jpg",
            // filePath: "/root/PlateDetect/01_蓝牌/鲁B·995EQ.jpg",

            reRecognise: false,
          },
          transformRequest: [
            function (data) {
              data = qs.stringify(data);
              return data;
            },
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          dataType: "json",
        })
          .then((res) => {
            console.log(res);
            this.processFileTreeData(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    click_to_RenameImg(node, data) {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: "",
        inputErrorMessage: "邮箱格式不正确",
        inputValue: data.label,
      }).then(({ value }) => {
        this.$message({
          type: "success",
          message: "你的邮箱是: " + value,
        });
        console.log("nihao");
        this.renameImg(node, data, value);
      });
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "取消输入",
      //   });
      // });
    },

    click_to_deleteImg(node, data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.deleteImg(node, data);
      });
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除",
      //   });
      // });
    },

    renameImg(node, data, value) {
      axios({
        url: "api/plate/recognise",
        method: "get",
        params: {
          reName: value,
          filePath: data.data.filePath,
          reRecognise: false,
        },
        transformRequest: [
          function (data) {
            data = qs.stringify(data);
            return data;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        dataType: "json",
      })
        .then((res) => {
          if(true){
            data.label = value;
          }
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deleteImg(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <i
              class="el-icon-edit"
              on-click={(e) => {
                this.append(data);
                e.cancelBubble = true;
              }}
            ></i>
            <i
              class="el-icon-delete"
              on-click={(e) => {
                this.remove(node, data);
                e.cancelBubble = true;
              }}
            ></i>
          </span>
        </span>
      );
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        // return resolve([{ name: "region" }]);
        return resolve(data);
        // return resolve(this.TreeData);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        axios({
          url: "api/file/getFileTreeByDir",
          method: "get",
          params: {
            dir: node.data.data.filePath,
            typeFilter: "png,jpg,jpeg",
          },
          transformRequest: [
            function (data) {
              data = qs.stringify(data);
              return data;
            },
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          dataType: "json",
        })
          .then((res) => {
            // console.log(res);

            // this.fileTreeRelated.dirTree = res.data.obj;
            // this.processDirTreeData(res.data);

            const fileTree = [];
            for (let i = 0; i < res.data.obj.length; i++) {
              fileTree.push({
                label: res.data.obj[i].fileName,
                id: res.data.obj[i].fileName + "0-0-" + i,
                data: res.data.obj[i],
                isLeaf: true,
              });
            }

            resolve(fileTree);
            // treeNode.dataRef.children = fileTree;
            // this.treeData = [...this.treeData];
          })
          .catch(function (error) {
            console.log(error);
          });

        // resolve(data);
      }, 10);
    },
    //上传图片弹窗
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onUploadChange(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      var that = this;
      reader.onload = function (e) {
        that.imgbase = reader.result;
      };
    },
    submitP() {
      // console.log(this.radio);
      // console.log(this.imgbase);
      var filetitle = "dir=";
      var fileName = filetitle + this.radio;
      // console.log(fileName)
      axios({
        url: "/api/file/base64Upload?" + fileName,
        method: "post",
        data: {
          base64Data: this.imgbase,
        },
        transformRequest: [
          function (data) {
            data = qs.stringify(data);
            return data;
          },
        ],
        dataType: "json",
      })
        .then((res) => {
          console.log(res);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: center;
}

.header .logo {
  display: flex;
  width: auto;
  height: 100%;
  background: rgba(255, 255, 255, 0);
  /* margin: 16px 28px 16px 0; */
  /* float: left; */
}

.header .logo img {
  display: flex;
  width: 200px;
  height: 100%;
  background: rgba(255, 255, 255, 0);
  /* margin: 16px 28px 16px 0; */
  /* float: left; */
}

#login-register-btn-wrap {
  position: absolute;
  right: 50px;
}

.a-layout-sider {
  height: calc(100vh - 64px);
}

.a-layout-sider::-webkit-scrollbar {
  display: none;
}

#a-layout-sider-img-container {
  height: 100%;
}

#a-layout-sider-img-container #a-layout-sider-img {
  height: 100%;
}

.a-breadcrumb-wrap {
  background-color: #f0f2f5;
}

.a-layout-content {
  min-height: calc(100vh);
}

.a-layout-content-wrap {
  background-color: #f0f2f5;
  display: flex;
  /* min-height: 100vh; */
}

#img-uploader-wrap {
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */
  width: 420px;
  /* height: 100%; */
  /* min-height: calc(85vh + 30px); */

  padding: 15px;
  background-color: #ffffff;
}

#img-uploader {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /* min-height: 35vh; */
  padding: 15px;
  margin: 0 0;
  background-color: #ffffff;
  flex-grow: 1;
  /* min-height: calc(85vh + 30px); */
}

#result-wrap {
  margin: 0 0 0 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#resource-img-wrap {
  display: flex;

  min-height: 50vh;
  padding: 15px;
  margin: 0 0 20px 0;
  background-color: #ffffff;
}

#identification-result-wrap {
  display: flex;

  min-height: 35vh;
  padding: 15px;
  margin: 0 0 20px 0;
  background-color: #ffffff;
}

#identification-details-wrap {
  display: flex;
  flex-grow: 1;
  min-height: 50vh;
  padding: 15px;
  margin: 0 0 0 0;
  background-color: #ffffff;
}

#img-title-wrap {
  display: flex;
  justify-content: space-between;
  /* height: 55px; */
  padding: 10px 10px 0px 10px;
}

#img-title-wrap > span {
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 20px;
  font-weight: 700;
}

.title-box {
  padding: 0px 15px 15px 15px;
}

.title-box:nth-child(1) {
  padding: 0px 15px 15px 15px;
}

.title-box .title-message {
  padding: 0 15px;
  font-size: 18px;
}

/* #resource-img-wrap */

#resource-img-container {
  display: flex;
  align-items: center;
  height: 35vh;
  padding: 0px 15px;
  /* background-color: aquamarine; */
}

.resource-image {
  max-width: 100%;
  height: 100%;
}

/* #identification-result-wrap */

#identification-result-img-container {
  display: flex;
  align-items: center;
  height: 7.5vh;
  margin: 20px 0 35px 0;
  padding: 0px 15px;
}

.identification-result-image {
  max-width: 100%;
  height: 100%;
}

.identification-result-box {
  padding: 0px 15px 15px 15px;
}

.identification-result-box .identification-result-message {
  padding: 0 15px;
  font-size: 20px;
  font-weight: 500;
  color: #08c;
}

/* #identification-details-wrap */

#identification-details {
  margin: 15px 0 0 0;
}

#identification-details-img-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 10vh;
  margin: 20px 0 50px 0;
  padding: 0px 15px;
}

.identification-details-image {
  max-width: 100%;
  height: 100%;
  margin: 0 10px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__content .custom-tree-node span:last-child {
  display: none;
}
.el-tree-node__children .custom-tree-node span:last-child {
  display: block;
}

.custom-tree-node .el-icon-edit {
  margin: 0 10px 0 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 6rem;
  height: 6rem;
  line-height: 6rem;
  text-align: center;
}
.avatar {
  width: 6rem;
  height: 6rem;
  display: block;
}
.el-dialog__body {
  padding: 18px 10px;
}
.el-dialog .el-dialog__body {
  display: grid;
  justify-items: center;
}
.el-dialog .el-dialog__body .el-radio-group {
  padding: 1rem 0;
}
</style>
