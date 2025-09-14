<template>
  <section class="grid md:grid-cols-2 gap-8 items-center">
    <div class="space-y-4">
      <h1 class="h1">Handcrafted Jewellery for Every Moment</h1>
      <p class="muted">Discover unique pieces and collect in-store at your chosen time.</p>
      <div class="flex gap-3">
        <router-link to="/products" class="btn">Browse Products</router-link>
        <router-link to="/cart" class="btn-outline">View Cart</router-link>
      </div>
    </div>
    <div class="card">
      <h3 class="font-semibold mb-2">Quick Links</h3>
      <ul class="grid sm:grid-cols-2 gap-2 text-sm">
        <li><router-link class="btn-outline w-full justify-center" to="/orders">My Orders</router-link></li>
        <li><router-link class="btn-outline w-full justify-center" to="/admin/products">Admin</router-link></li>
        <li><router-link class="btn-outline w-full justify-center" to="/admin/categories">Categories</router-link></li>
        <li><router-link class="btn-outline w-full justify-center" to="/admin/orders">Order Manager</router-link></li>
      </ul>
    </div>
  </section>
</template>
<script setup>
</script>
