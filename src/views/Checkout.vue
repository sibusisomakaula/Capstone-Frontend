<template>
  <section class="grid md:grid-cols-2 gap-8">
    <form class="card space-y-4" @submit.prevent="submit">
      <h2 class="h2">Checkout</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div><label class="block text-sm muted mb-1">Full name</label><input v-model="customer.fullName" class="input" required /></div>
        <div><label class="block text-sm muted mb-1">Email</label><input v-model="customer.email" type="email" class="input" required /></div>
        <div><label class="block text-sm muted mb-1">Phone</label><input v-model="customer.phone" class="input" required /></div>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div><label class="block text-sm muted mb-1">Collection Date</label><input v-model="order.collectionDate" type="date" class="input" required /></div>
        <div><label class="block text-sm muted mb-1">Collection Time</label><input v-model="order.collectionTime" type="time" class="input" required /></div>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div><label class="block text-sm muted mb-1">Amount (ZAR)</label><input v-model.number="payment.amount" type="number" min="0" step="0.01" class="input" required/></div>
        <div><label class="block text-sm muted mb-1">Status</label>
          <select v-model="payment.status" class="input">
            <option>PAID</option><option>PENDING</option><option>FAILED</option>
          </select>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="btn" type="submit">Place Order</button>
        <router-link class="btn-outline" to="/cart">Back to Cart</router-link>
      </div>
    </form>

    <div class="card space-y-2 h-fit">
      <h3 class="font-semibold">Order Summary</h3>
      <div class="divide-y">
        <div v-for="l in cart.lines" :key="l.item.id" class="flex justify-between py-2 text-sm">
          <span>{{ l.item.name }} × {{ l.quantity }}</span>
          <span>{{ currency(l.price * l.quantity) }}</span>
        </div>
      </div>
      <p class="text-right font-semibold">Total: {{ currency(cart.totalPrice) }}</p>
    </div>
  </section>
</template>
<script setup>
import { reactive } from 'vue'
import { Orders, Payments, Customers } from '../services/api'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const customer = reactive({ fullName:'', email:'', phone:'', passwordHash:'', universityId:'' })
const order = reactive({ collectionDate:'', collectionTime:'', status:'NEW' })
const payment = reactive({ amount: 0, status:'PAID' })
const currency = (n) => new Intl.NumberFormat(undefined, { style:'currency', currency:'ZAR' }).format(n)

async function submit() {
  const createdCustomer = await Customers.create(customer)
  const orderDto = {
    customerId: createdCustomer.id,
    status: order.status, collectionDate: order.collectionDate, collectionTime: order.collectionTime,
    totalPrice: cart.totalPrice,
    items: cart.lines.map(l => ({ quantity: l.quantity, price: l.price, jewelleryItemId: l.item.id }))
  }
  const createdOrder = await Orders.create(orderDto)
  await Payments.create({ orderId: createdOrder.id, amount: payment.amount || cart.totalPrice, status: payment.status, paymentDate: new Date().toISOString() })
  cart.clear(); router.push(`/orders/${createdOrder.id}`)
}
</script>
