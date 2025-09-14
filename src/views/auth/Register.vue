<template>
  <section class="max-w-md mx-auto card space-y-4">
    <h2 class="h2">Register</h2>
    <form class="space-y-3" @submit.prevent="submit">
      <input v-model="fullName" placeholder="Full name" class="input" required />
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Password" class="input" required />
      <button class="btn w-full" type="submit">Create Account</button>
      <router-link to="/login" class="block text-center text-sm text-brand">Already have an account?</router-link>
    </form>
    <p v-if="msg" class="text-green-600 text-sm">{{ msg }}</p>
    <p v-if="err" class="text-red-600 text-sm">{{ err }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const fullName = ref('')
const email = ref('')
const password = ref('')
const msg = ref('')
const err = ref('')
const router = useRouter()

async function submit() {
  err.value = ''
  msg.value = ''
  try {
    // Replace '/api/register' with your actual registration endpoint
    await axios.post('http://localhost:8080/api/register', {
      fullName: fullName.value,
      email: email.value,
      password: password.value
    })
    msg.value = 'Account created. You can now sign in.'
    setTimeout(() => router.push('/login'), 500)
  } catch (e) {
    // Axios errors may have response data with message
    if (e.response && e.response.data && e.response.data.message) {
      err.value = e.response.data.message
    } else {
      err.value = e.message
    }
  }
}
</script>
