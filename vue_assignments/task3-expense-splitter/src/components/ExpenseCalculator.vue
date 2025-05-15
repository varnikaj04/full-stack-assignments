<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const participants = ref([]);
const expenses = ref([]);
const description = ref('');
const amount = ref('');
const selectedPayers = ref([]);

onMounted(() => {
  participants.value = JSON.parse(localStorage.getItem('participants') || '[]');
});

const addExpense = () => {
  const amt = parseFloat(amount.value);
  if (!description.value || isNaN(amt) || selectedPayers.value.length === 0) return;

  const totalParticipants = participants.value.length;
  const perHead = amt / totalParticipants;
  const payerSplit = amt / selectedPayers.value.length;

  const balances = participants.value.map((p) => ({
    name: p.name,
    paid: selectedPayers.value.includes(p.name) ? payerSplit : 0,
    share: perHead,
    balance: 0,
  }));

  balances.forEach((b) => {
    b.balance = b.paid - b.share;
  });

  expenses.value.push({
    description: description.value,
    amount: amt,
    balances,
  });

  description.value = '';
  amount.value = '';
  selectedPayers.value = [];
  localStorage.setItem('expenses', JSON.stringify(expenses.value));
};

const goToSummary = () => {
  router.push('/summary');
};
</script>

<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card shadow p-4 rounded" style="width: 500px;">
      <h2 class="mb-4 text-primary">Add Expense</h2>

      <div class="mb-3">
        <input
          v-model="description"
          type="text"
          class="form-control"
          placeholder="Expense description"
        />
      </div>

      <div class="mb-3">
        <input
          v-model="amount"
          type="number"
          class="form-control"
          placeholder="Total amount"
        />
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Who Paid?</label>
        <div class="row">
          <div
            class="col-sm-6 col-md-4 mb-2"
            v-for="p in participants"
            :key="p.name"
          >
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="selectedPayers"
                :value="p.name"
                :id="p.name"
              />
              <label class="form-check-label" :for="p.name">{{ p.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <button @click="addExpense" class="btn btn-outline-primary mb-4 w-100">
        ➕ Add Expense
      </button>

      <div v-if="expenses.length">
        <h5 class="text-secondary">Expenses:</h5>
        <ul class="list-group">
          <li
            v-for="(e, index) in expenses"
            :key="index"
            class="list-group-item"
          >
            {{ e.description }} – ₹{{ e.amount }}
          </li>
        </ul>
      </div>

      <button @click="goToSummary" class="btn btn-success mt-4 w-100">
        📊 View Summary
      </button>
    </div>
  </div>
</template>

