<template>
  <div class="login-form">
    <Form :model="userInfo">
      <FormItem prop="userName">
        <Input type="text" v-model="userInfo.userName" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="userInfo.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem style="text-align:center">
        <Button type="primary" @click="handleSubmit" style="width: 300px">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { doLogin } from '@/api/login';

export default {
  name: 'Login',
  data() {
    return {
      userInfo: {
        userName: '',
        password: '',
      },
    }
  },
  methods: {
    validate() {
      if (!this.userInfo.userName) {
        this.$Message.error('请输入用户名');
        return false;
      }

      if (!this.userInfo.userName) {
        this.$Message.error('请输入密码');
        return false;
      }
      
      return true;
    },
    handleSubmit() {
      if (this.validate()) {
        doLogin({
          username: this.userInfo.userName,
          password: this.userInfo.password,
        }).then((res) => {
          localStorage.setItem('my-project-token', res.token); // 将token放入本地存储
          this.$router.push('/home');
        }).catch((err) => {
          console.log(err)
          this.$Message.error(err.errMsg)
        });
      }
    }
  },
  mounted() {

  }
}
</script>

<style lang="less">
  .login-form {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .ivu-form {
      width: 300px;
      height: 400px;
    }
  }
</style>