<template>
  <div class="app">
    <div v-if="state.account.id">
      <p>Hi {{ state.account.name }}</p>
      <button @click="logout">로그아웃</button>
    </div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId">
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="password" id="loginPw" v-model="state.form.loginPw">
      </label>
      <button @click="submit">로그인</button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios'

export default {
  setup() {
    const state = reactive({
      account: {
        id: null,
        name: null,
      },
      form: {
        loginId: '',
        loginPw: ''
      }
    })

    axios.get('/api/account').then((res) => {
      console.log(res)
      state.account = res.data;
    })

    const submit = () => {
      axios.post('/api/account', state.form).then((res) => {
        alert('로그인 성공!')
        state.account = res.data;
      }).catch(() => {
        alert('로그인 실패! Check your login and password!')
      })
    }

    const logout = () => {
      axios.delete('/api/account').then(() => {
        alert('로그아웃 성공!')
        state.account.id = null;
        state.account.name = null;

      })
    }

    return {
      state,
      submit,
      logout,
    }
  }
}
</script>

<style></style>