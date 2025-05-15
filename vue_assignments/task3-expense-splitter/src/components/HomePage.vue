<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const participants = ref([]);
const name = ref('');

const addParticipant = () => {
  if (name.value.trim()) {
    participants.value.push({ name: name.value.trim() });
    name.value = '';
  }
};

const removeParticipant = (index) => {
  participants.value.splice(index, 1);
};

const goToExpenses = () => {
  localStorage.setItem('participants', JSON.stringify(participants.value));
  router.push('/expenses');
};
</script>

<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card shadow p-4 rounded" style="width: 500px;">
      <h2 class="mb-4 text-primary">Create Group</h2>

      <div class="input-group mb-3">
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Enter participant name"
        />
        <button @click="addParticipant" class="btn btn-outline-primary">
          Add
        </button>
      </div>

      <ul class="list-group mb-4">
        <li
          v-for="(p, index) in participants"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ p.name }}
          <button
            @click="removeParticipant(index)"
            class="btn btn-sm btn-outline-danger"
          >
            ✕
          </button>
        </li>
      </ul>

      <button @click="goToExpenses" class="btn btn-success w-100">
        ➡️ Next: Add Expenses
      </button>
    </div>
  </div>
</template>

