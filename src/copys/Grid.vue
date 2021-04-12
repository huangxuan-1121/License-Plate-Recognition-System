<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-affix :offset-top="top">
      <a-layout-header class="header" :style="{ background: '#fff'}">
        <div class="logo"></div>
        <!-- <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>-->
      </a-layout-header>
    </a-affix>
    <a-layout>
      <a-layout-sider
        class="a-layout-sider"
        :style="{ overflow: 'auto', height: '', position: 'fixed', left: 0 }"
      >
        <a-menu
          theme="dark"
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="user" />subnav 1
            </span>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="laptop" />subnav 2
            </span>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="notification" />subnav 3
            </span>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
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
                  <a-tree
                    :show-line="showLine"
                    :show-icon="showIcon"
                    :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
                    @select="onSelect"
                  >
                    <a-icon slot="icon" type="carry-out" />
                    <a-tree-node key="0-0">
                      <a-icon slot="icon" type="carry-out" />
                      <span slot="title" style="color: #1890ff">parent 1</span>
                      <a-tree-node key="0-0-0" title="parent 1-0">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-0-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-0-1" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-0-2" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                      </a-tree-node>
                      <a-tree-node key="0-0-1" title="parent 1-1">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-1-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                      </a-tree-node>
                      <a-tree-node key="0-0-2" title="parent 1-2">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-2-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-2-1" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                          <a-icon slot="switcherIcon" type="form" />
                        </a-tree-node>
                      </a-tree-node>
                      <a-tree-node key="0-0-0" title="parent 1-0">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-0-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-0-1" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-0-2" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                      </a-tree-node>
                      <a-tree-node key="0-0-1" title="parent 1-1">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-1-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                      </a-tree-node>
                      <a-tree-node key="0-0-2" title="parent 1-2">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-2-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-2-1" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                          <a-icon slot="switcherIcon" type="form" />
                        </a-tree-node>
                      </a-tree-node>
                      <a-tree-node key="0-0-0" title="parent 1-0">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-0-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-0-1" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-0-2" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                      </a-tree-node>
                      <a-tree-node key="0-0-1" title="parent 1-1">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-1-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                      </a-tree-node>
                      <a-tree-node key="0-0-2" title="parent 1-2">
                        <a-icon slot="icon" type="carry-out" />
                        <a-tree-node key="0-0-2-0" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                        </a-tree-node>
                        <a-tree-node key="0-0-2-1" title="leaf">
                          <a-icon slot="icon" type="carry-out" />
                          <a-icon slot="switcherIcon" type="form" />
                        </a-tree-node>
                      </a-tree-node>
                    </a-tree-node>
                  </a-tree>
                </div>
              </div>
            </div>
            <div id="resource-img-wrap">
              <div id="resource-img">
                <a-divider class="a-divider" orientation="left">Result</a-divider>
                <div class="title-box">
                  <a-icon type="tag" :style="{ fontSize: '18px', color: '#08c' }"/>
                  <span class="title-message">原图</span>
                </div>
                <div id="resource-img-container">
                  <img class="resource-image" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1014296722,1201237690&fm=26&gp=0.jpg" alt="">
                  <!-- <a-empty /> -->
                </div>
              </div>
            </div>
            <div id="img-identification-wrap">
              <!-- <br />Really
              <br />...
              <br />...
              <br />...
              <br />long
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />...
              <br />content-->
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer :style="{ textAlign: 'center' }">Ant Design ©2018 Created by Ant UED</a-layout-footer>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      showLine: true,
      showIcon: false,
    };
  },
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}

.a-layout-sider {
  height: calc(100vh - 64px);
}

.a-layout-sider::-webkit-scrollbar {
  display: none;
}

.a-breadcrumb-wrap {
  background-color: #f0f2f5;
}

.a-layout-content {
  min-height: calc(100vh);
}
.a-layout-content-wrap {
  /* padding: 0; */
  /* min-height: calc(100vh - 205px); */

  background-color: #f0f2f5;

  display: grid;
  grid-template-columns: 420px 1fr;
  /* grid-template-rows: 50vh 35vh auto; */
  grid-template-rows: minmax(50vh, auto) auto auto;
  grid-column-gap: 25px;
  grid-row-gap: 15px;
}

#img-uploader-wrap {
  display: grid;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;

  min-height: calc(85vh + 30px);

  padding: 15px;
  background-color: #ffffff;
}

#resource-img-wrap {
  display: grid;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;

  min-height: 50vh;
  padding: 15px;

  background-color: #ffffff;
}



#img-identification-wrap {
  display: grid;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;

  min-height: 35vh;
  padding: 15px;
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


.title-box{
  padding: 0px 15px 15px 15px;
}

.title-box .title-message{
  padding: 0 15px;
  font-size: 18px;
}

/* #resource-img-wrap */




#resource-img-container{
  display: flex;
  align-items: center;
  height: 35vh;
  padding: 0px 15px ;
  /* background-color: aquamarine; */
}

.resource-image{
  max-width: 100% ;
  height: 100%;
  /* background-color: aquamarine; */
}

</style>
