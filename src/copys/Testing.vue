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
                  <a-upload
                    name="file"
                    :multiple="true"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :headers="headers"
                    @change="handleChange"
                  >
                    <a-button>
                      <a-icon type="upload" />Click to Upload
                    </a-button>
                  </a-upload>
                </div>
                <a-divider />
                <div>
                  <a-directory-tree
                    v-model="checkedKeys"
                    :expanded-keys="expandedKeys"
                    :selected-keys="selectedKeys"
                    :tree-data="treeData"
                    :load-data="onLoadData"
                    @expand="onExpand"
                    @select="onSelect"
                  ></a-directory-tree>
                </div>
              </div>
                            <!-- elementUI -->
              <div class="custom-tree-container">
                <div class="block">
                  <p>使用 render-content</p>
                  <el-tree
                    :data="data"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="renderContent"
                  ></el-tree>
                </div>
              </div>
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
                      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1014296722,1201237690&fm=26&gp=0.jpg"
                      alt
                    />
                    <!-- <a-empty /> -->
                  </div>
                  <div class="identification-result-box">
                    <a-icon type="check-circle" :style="{ fontSize: '20px', color: '#08c' }" />
                    <span class="identification-result-message">车牌号：{{showLine}}</span>
                  </div>
                </div>
              </div>
              <div id="identification-details-wrap">
                <div id="identification-details">
                  <div class="title-box">
                    <a-icon type="tag" :style="{ fontSize: '18px', color: '#08c' }" />
                    <span class="title-message">title</span>
                  </div>
                  <div id="identification-details-img-container">
                    <img
                      class="identification-details-image"
                      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1014296722,1201237690&fm=26&gp=0.jpg"
                      alt
                    />
                    <!-- <a-empty /> -->
                  </div>
                  <div class="title-box">
                    <a-icon type="tag" :style="{ fontSize: '18px', color: '#08c' }" />
                    <span class="title-message">title</span>
                  </div>
                  <div id="identification-details-img-container">
                    <img
                      class="identification-details-image"
                      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1014296722,1201237690&fm=26&gp=0.jpg"
                      alt
                    />
                    <!-- <a-empty /> -->
                  </div>
                  <div class="title-box">
                    <a-icon type="tag" :style="{ fontSize: '18px', color: '#08c' }" />
                    <span class="title-message">title</span>
                  </div>
                  <div id="identification-details-img-container">
                    <img
                      class="identification-details-image"
                      src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1014296722,1201237690&fm=26&gp=0.jpg"
                      alt
                    />
                    <!-- <a-empty /> -->
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
import { dirTree_Mock, fileTree_Mock } from "../assets/js/mockData";

import axios from "axios";
import qs from "qs";
let id = 1000;
export default {
  data() {
  const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级",
          },
        ],
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1",
          },
          {
            id: 6,
            label: "二级 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1",
          },
          {
            id: 8,
            label: "二级 3-2",
          },
        ],
      },
    ];
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
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
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
    // this.isLoginMod();
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    },
  },
  methods: {
    // 判断登录状态
    isLoginMod() {
      if (window.localStorage.data) {
        this.isLogin = true;
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
          title: DirTreeData.obj[i].fileName,
          key: DirTreeData.obj[i].fileName + "0-0-" + i,
          data: DirTreeData.obj[i],
          slots: {
      icon: 'smile',
    },
        });
      }
      this.treeData = treeData;
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
    append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      },
    }
  
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
  height: 10vh;
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
  font-weight: 700;
  color: #08c;
}

/* #identification-details-wrap */

#identification-details-img-container {
  display: flex;
  align-items: center;
  height: 35vh;
  margin: 20px 0 50px 0;
  padding: 0px 15px;
}

.identification-details-image {
  max-width: 100%;
  height: 100%;
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
</style>
