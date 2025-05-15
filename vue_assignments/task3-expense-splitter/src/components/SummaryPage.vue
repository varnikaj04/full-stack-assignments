<script setup>
import { ref, onMounted } from 'vue';

const expenses = ref([]);
const summary = ref([]);

onMounted(() => {
  expenses.value = JSON.parse(localStorage.getItem('expenses') || '[]');
  calculateSummary();
});

function calculateSummary() {
  const balances = {};

  expenses.value.forEach((e) => {
    e.balances.forEach(({ name, balance }) => {
      balances[name] = (balances[name] || 0) + balance;
    });
  });

  const creditors = Object.entries(balances).filter(([_, v]) => v > 0);
  const debtors = Object.entries(balances).filter(([_, v]) => v < 0);

  const transactions = [];

  let i = 0;
  let j = 0;

  while (i < creditors.length && j < debtors.length) {
    let [cName, cAmount] = creditors[i];
    let [dName, dAmount] = debtors[j];

    const settled = Math.min(cAmount, -dAmount);
    transactions.push(`${dName} owes ₹${settled.toFixed(2)} to ${cName}`);

    creditors[i][1] -= settled;
    debtors[j][1] += settled;

    if (creditors[i][1] === 0) i++;
    if (debtors[j][1] === 0) j++;
  }

  summary.value = transactions;
}
</script>

<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card shadow p-4 rounded" style="width: 500px;">
      <h2 class="mb-4 text-primary">Expense Summary</h2>
      <ul class="list-group">
        <li
          v-for="(s, index) in summary"
          :key="index"
          class="list-group-item d-flex align-items-center"
        >
          💸 {{ s }}
        </li>
      </ul>
    </div>
  </div>
</template>
