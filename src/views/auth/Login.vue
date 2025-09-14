<template>
  <section class="max-w-md mx-auto card space-y-4">
    <h2 class="h2">Login</h2>
    <form class="space-y-3" @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Password" class="input" required />
      <button class="btn w-full" type="submit">Sign In</button>
      <router-link to="/register" class="block text-center text-sm text-brand">Create an account</router-link>
    </form>
    <p v-if="err" class="text-red-600 text-sm">{{ err }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../../stores/auth'

const email = ref('')
const password = ref('')
const err = ref('')

const auth = useAuthStore()
const router = useRouter()

async function submit() {
  err.value = ''
  try {
    // Replace '/api/login' with your actual login endpoint
    const response = await axios.post('http://localhost:8080/api/login', {
      email: email.value,
      password: password.value
      },
  {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

    })

    // Assuming response.data contains { token, user }
    const res = response.data

    if (typeof res === 'string') {
      auth.setToken(res)
    } else {
      auth.setToken(res.token)
      auth.setUser (res.user)
    }

    router.push('/')
  } catch (e) {
    // Try to get error message from response, fallback to generic message
    err.value = e.response?.data?.message || e.message || 'Login failed'
  }
}
</script>