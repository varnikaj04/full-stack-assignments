import { createRouter, createWebHistory } from 'vue-router';
import HomeScreen from '../components/HomePage.vue';
import ExpenseScreen from '../components/ExpenseCalculator.vue';
import SummaryScreen from '../components/SummaryPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeScreen },
  { path: '/expenses', name: 'Expenses', component: ExpenseScreen },
  { path: '/summary', name: 'Summary', component: SummaryScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;