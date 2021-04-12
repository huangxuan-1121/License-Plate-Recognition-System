<template>
  <div class="hello">
    <nav>
      <div></div>
      <div>
        <a href="#sign">
          <button>LOGIN</button>
        </a>
      </div>
    </nav>
    <header>
      <div class="word-part">
        <div class="header-title">
          基于
          <i>Springboot+Vue+Opencv</i>
        </div>
        <div class="header-line"></div>
        <div class="header-name">车 牌 识 别 系 统</div>
      </div>

      <div id="header-down">
        <a href="#content">
          <i>
            <a-icon type="down" />
          </i>
        </a>
      </div>
    </header>
    <div id="content">
      <div class="introduction">
        <div class="in-title">
          <div></div>
          <div>
            <p>01</p>
            <p>基本介绍</p>
          </div>
          <div class="left-title">Introduction</div>
        </div>
        <div class="detail">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, veritatis magni! Explicabo, odio, repellat esse velit quibusdam error magnam ullam dolorem ea eius perferendis tempore libero sed corporis obcaecati in.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non quaerat quas, id explicabo esse quidem odit similique magnam sit blanditiis odio ipsa distinctio vitae at voluptate minus optio laboriosam sunt!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore enim quae nemo aspernatur perspiciatis voluptate libero voluptatibus dolores, id nihil quaerat deleniti illum ullam atque maxime aliquid provident repellat accusantium.
        </div>
      </div>
      <div class="advantage">
        <div class="introduction">
          <div class="in-title">
            <div></div>
            <div>
              <p>02</p>
              <p>优 势</p>
            </div>
            <div class="left-title">Advantage</div>
          </div>
          <div class="detail">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, veritatis magni! Explicabo, odio, repellat esse velit quibusdam error magnam ullam dolorem ea eius perferendis tempore libero sed corporis obcaecati in.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, veritatis magni! Explicabo, odio, repellat esse velit quibusdam error magnam ullam dolorem ea eius perferendis tempore libero sed corporis obcaecati in.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, veritatis magni! Explicabo, odio, repellat esse velit quibusdam error magnam ullam dolorem ea eius perferendis tempore libero sed corporis obcaecati in.</p>
          </div>
        </div>
      </div>
    </div>
    <div id="sign">
      <div class="gear">
        <!-- <div class="gear-top"></div> -->
        <div class="sign-up">
          <h2>Sign Up</h2>
          <p>USERNAME</p>
          <input type="text" v-model="username_up" />
          <p>EMAIL</p>
          <input type="email" v-model="email" />
          <p>PASSWORD</p>
          <input type="password" v-model="password_up" />
          <br />
          <button type="submit" @click="sign_up">
            注 册
            <i>
              <a-icon type="arrow-right" />
            </i>
          </button>
        </div>
        <div class="sign-in">
          <h2>Sign In</h2>
          <p>USERNAME</p>
          <input type="text" v-model="username_in" />
          <p>PASSWORD</p>
          <input type="password" v-model="password_in" />
          <br />
          <button type="submit" @click="sign_in">
            登 录
            <i>
              <a-icon type="arrow-right" />
            </i>
          </button>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "HelloWorld",
  data() {
    return {
      username_in: "",
      username_up: "",
      password_in: "",
      password_up: "",
      email: "",
    };
  },
  methods: {
    sign_up() {
      //注册
      if (this.username_up == "") {
        this.$message.info("用户名不能为空！");
      } else if (this.password_up == "") {
        this.$message.info("密码不能为空！");
      } else if (this.email == "") {
        this.$message.info("邮箱不能为空！");
      } else {
        // axios()发送数据
        axios({
          url: "/api/user/register",
          method: "post",
          data: {
            username: this.username_up,
            // password: Encrypt(this.password)
            password: this.password_up,
            email: this.email,
          },
          transformRequest: [
            function (data) {
              data = Qs.stringify(data);
              return data;
            },
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          dataType: "json",
        })
          .then((res) => {
            console.log(res);
            this.$message.success("注册成功，可登录！");
          })
          .catch((error) => {
            this.$message.error("注册失败！");
            console.log(error);
          });
      }
    },
    sign_in() {
      //登陆
      if (this.username_in == "") {
        this.$message.info("用户名不能为空！");
      } else if (this.password_in == "") {
        this.$message.info("密码不能为空！");
      } else {
        //axios()发送数据
        axios({
          url: "/api/login",
          method: "post",
          data: {
            username: this.username_in,
            // password: Encrypt(this.password)
            password: this.password_in,
          },
          transformRequest: [
            function (data) {
              // console.log(data.password);
              data = Qs.stringify(data);
              return data;
            },
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          dataType: "json",
        })
          .then((res) => {
            console.log(res);
            if (res.data.msg == "Success!") {
              this.$message.success("登录成功！");
              var ses = window.localStorage; //sessionStorage关闭窗口，存储的数据清空
              // var id = JSON.stringify(res.data.detail);

              // 

              var id = JSON.stringify(res.data.todo.username);

              // 
              ses.setItem("data", id);
              this.$router.push("/index");
              return true;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            console.log(error);
            this.$message.error("用户名或密码错误！");

          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 导航样式 */
nav {
  display: grid;
  justify-content: center;
  grid-template-columns: 88% 12%;
  grid-template-rows: 10vh;
  width: 100%;
  background-color: #131d25;
}
nav div {
  margin: auto 0;
}
nav div button {
  border: 0.9px rgb(230, 230, 230) solid;
  width: 3.5rem;
  line-height: 1.5rem;
  box-sizing: content-box;
  padding: 0.2rem;
  font-size: 0.8rem;
  font-weight: lighter;
  background-color: #131d25;
  border-radius: 1rem;
  color: #fcbaba;
  cursor: pointer;
  outline: none;
}
/* header 头部样式 */
header {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  /* max-width: 100vw; */
  background-image: url(./../assets/images/Hello/banner.png);
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  background-color: #131d25;
}
.header-title,
.header-name {
  text-align: left;
  width: 67vw;
  line-height: 3rem;
  font-size: 2.2rem;
  padding: 0.5rem 1.5rem;
}
.header-title {
  border: 0.5px solid rgba(245, 243, 243, 0.705);
  border-bottom: none;
  padding-bottom: 0rem;
}

.header-title i {
  font-family: "Times New Roman", Times, serif;
}
.header-name {
  border: 0.5px solid rgba(245, 243, 243, 0.705);
  border-top: none;
  padding-top: 0rem;
}

.header-line {
  width: 75vw;
  margin: 2rem 0 2rem -3rem;
  height: 1.5px;
  background-color: rgba(142, 147, 151, 0.699);
  box-shadow: 2px -1px 5px rgb(255 254 254);
  box-shadow: -1px 2px 5px rgb(255 254 254);
  box-shadow: 2px -2px 10px rgb(255 254 254);
  box-shadow: -2px 2px 10px rgb(255 254 254);
}

header #header-down {
  position: absolute;
  bottom: 0;
  text-align: center;
  margin: 2vh 0;
  font-size: 2.5rem;
  font-weight: lighter;
}
header #header-down a {
  color: white;
}
#header-down i:hover {
  transform: scale(1.7, 1.7);
  transition: ease-out 1.5s;
  opacity: 0.7;
}
/* 中间文字介绍部分 */
#content {
  padding: 7rem 5rem;
}
.in-title {
  font-size: 0;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  justify-items: center;
}
#content .in-title div p {
  display: inline-block;
  line-height: 2.8rem;
  font-size: 1.2rem;
}
#content .in-title p:first-child {
  width: 2.8rem;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(25, 124, 225);
}
#content .in-title p:nth-child(2) {
  width: 8rem;
  text-align: center;
  color: black;
  background-color: rgb(252, 252, 252);
  box-shadow: -2px 2px 15px rgba(143, 141, 141, 0.671);
}
#content .in-title .left-title {
  font-size: 1.8rem;
  color: rgba(160, 156, 156, 0.466);
}
#content .detail {
  color: #131d25;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
#content .advantage {
  padding-top: 7rem;
}
/* 底部登陆注册部分 */
#sign {
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
  min-height: 41rem;
  max-width: 100vw;
  background-color: #f6d750;
  background-image: url(./../assets/images/Hello/gear-top.png);
  background-repeat: no-repeat;
  z-index: -100;
}
#sign .gear {
  display: flex;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  flex-wrap: nowrap;
  min-height: 41rem;
  width: 100%;
  background-image: url(./../assets/images/Hello/gear-bottom.png);
  background-repeat: no-repeat;
  background-position: 43.5rem 35rem;
}
#sign .gear p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(190, 184, 184, 0.74);
}

#sign .gear .sign-up,
#sign .gear .sign-in {
  height: 26rem;
  width: 28rem;
  padding: 1.5rem 2.5rem;
  background-color: rgb(245, 245, 245);
  color: black;
}
#sign .gear input {
  border: none;
  width: 100%;
  border-bottom: 1px solid rgba(190, 184, 184, 0.74);
  background-color: transparent;
  outline: unset;
  margin-bottom: 1rem;
}
#sign .gear h2 {
  text-align: center;
}
#sign .gear button {
  display: block;
  margin: 2rem auto;
  width: 16rem;
  line-height: 2rem;
  color: white;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  outline: none;
}
#sign .gear button i {
  position: relative;
  left: 2.5rem;
}
#sign .gear .sign-up button {
  background-color: #131d25;
}
#sign .gear .sign-in button {
  background-color: rgb(25, 124, 225);
}
@media (max-width: 850px) {
  #sign .gear {
    display: grid;
    /* grid-template-rows: 1fr 1fr 1fr; */
    /* grid-template-columns: 1fr 1fr 1fr; */
    justify-items: center;
  }
  #sign .gear .sign-up,
  #sign .gear .sign-in {
    margin: 2rem 0;
    height: 28rem;
  }
}
/* 底部黑条部分 */
.footer {
  height: 5vh;
  background-color: #131d25;
}
</style>
