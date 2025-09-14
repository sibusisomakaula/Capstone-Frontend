<template>
  <div>
    <header class="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
      <div class="container flex items-center justify-between py-4">
        <router-link to="/" class="flex items-center gap-2 font-semibold">
          <span class="text-brand">💎</span><span>Jewellery Shop</span>
        </router-link>
        <nav class="flex items-center gap-4 text-sm">
          <router-link to="/products" class="hover:text-brand">Products</router-link>
          <router-link to="/cart" class="hover:text-brand">Cart ({{ cartCount }})</router-link>
          <router-link to="/orders" class="hover:text-brand">My Orders</router-link>
          <router-link to="/admin/products" class="hover:text-brand">Admin</router-link>
        </nav>
        <div class="flex items-center gap-3">
          <router-link v-if="!auth.isAuthed" to="/login" class="btn-outline">Login</router-link>
          <button v-else class="btn-outline" @click="auth.logout()">Logout</button>
        </div>
      </div>
    </header>
    <main class="container py-8"><router-view /></main>
    <footer class="container py-8 text-center text-sm text-slate-500">© {{ year }} • Vue + Tailwind</footer>
  </div>
</template>
<script setup>

import { computed } from 'vue'
import { useCartStore } from './stores/cart'
import { useAuthStore } from './stores/auth'
const year = new Date().getFullYear()
const cart = useCartStore()
const auth = useAuthStore()
const cartCount = computed(()=>cart.totalItems)
</script>
