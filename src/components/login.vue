<template>
  <div class="login">
    <!-- 没登录前 -->
    <div v-if="!userID.id" class="notlogin" @click="dialogFormVisible = true">
      <i class="el-icon-user-solid"></i>
      <span>未登录</span>
    </div>
    <!-- 登录后 -->
    <div v-else @click="logOut" class="logOut">
      <div class="user-nane">
        <img v-lazy="userInfo.image" />
        <h1>{{userInfo.name}}</h1>
      </div>
      <!-- <user :uid="userId" /> -->
    </div>

    <!-- 登录输入框 -->
    <el-dialog
      :modal-append-to-body="false"
      title="登录账号"
      :visible.sync="dialogFormVisible"
      width="25%"
      center
    >
      <el-form
        :model="userFrom"
        :rules="userRules"
        ref="loginRuleForm"
        label-width="70px"
        class="login-form"
      >
        <el-form-item label="账号" prop="phone">
          <el-input v-model="userFrom.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="userFrom.password"></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer">
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  login,
  getUser,
  setLocalStorage,
  getLocalStorage,
  removeLogin,
} from "../network/user";
import user from "./user";
export default {
  data() {
    // 自定义验证规则
    var phone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var password = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("密码只能为数字和字母"));
        }
      }
    };
    return {
      // 用户登录表单
      userFrom: {
        phone: "",
        password: "",
      },
      // 验证规则
      userRules: {
        phone: [{ validator: phone, required: true, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
      dialogFormVisible: false, // 登录框显示与隐藏
      userInfo: {
        image: "",
        name: "",
      },
    };
  },
  created() {
    if (getLocalStorage("playMusicID") != "") {
      this.$store.dispatch("userID", getLocalStorage("playMusicID"));
      getUser(this.$store.state.userID.id).then((res) => {
        console.log(this.userInfo);
        this.userShow = false;
        this.userInfo.image = res.profile.avatarUrl;
        this.userInfo.name = res.profile.nickname;
      });
    }
  },
  methods: {
    login() {
      this.$refs.loginRuleForm.validate(async (valid) => {
        if (!valid) return;
        login(this.userFrom.phone, this.userFrom.password).then((res) => {
          if (res.code != 200) {
            return this.$message.error(`登录失败----${res.message}`);
          }
          this.dialogFormVisible = false;
          setLocalStorage("playMusicID", res.account.id);
          this.$store.dispatch("userID", getLocalStorage("playMusicID"));
          getUser(res.account.id).then((res) => {
            this.userShow = false;
            // this.$set(this.userInfo, 'image', res.profile.avatarUrl);
            // this.$set(this.userInfo, 'name', res.profile.nickname);
            this.userInfo.image = res.profile.avatarUrl
            this.userInfo.name = res.profile.nickname
          });
          return this.$message.success("登录成功");
        });
      });
    },

    logOut() {
      this.$confirm("是否退出登录状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeLogin("playMusicID");
          this.userInfo = {
            image: "",
            name: "",
          };
          this.$store.state.userID = {};
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
  components: {
    user,
  },
  computed: {
    userID() {
      return this.$store.state.userID;
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  /deep/ .el-input__inner:focus {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
  /deep/ .el-button--primary {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    background-color: #d33a31;
    border: none;
    color: #ffffff;
  }
  /deep/ .el-form-item__label {
    font-size: 18px;
    font-weight: 600;
  }
  /deep/ .el-dialog__title {
    font-size: 24px;
    font-weight: 600;
  }
}
.user-nane {
  display: flex;
  justify-items: flex-end;
  padding: 30px 0 30px 40px;
  align-items: center;
  > img {
    height: 60px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin-right: 20px;
    border-radius: 50%;
  }
  > h1 {
    color: rgba(0, 0, 0, 1);
    font-size: 18px;
  }
  .user-lv {
    margin-left: 10px;
    width: 35px;
    height: 19px;
    overflow: hidden;
    padding-left: 35px;
    line-height: 21px;
    color: #e03a24;
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    background-position: -135px -190px;
  }
}
.notlogin {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 70px;
  line-height: 70px;
  padding-left: 30px;
  i {
    font-size: 40px;
    color: rgba(0, 0, 0, 0.7);
    margin-right: 10px;
  }
  span {
    font-size: 18px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
  }
}
.logOut{
  cursor: pointer;
}
</style>