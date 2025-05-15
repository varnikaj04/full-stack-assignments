<script setup>
import { ref, computed, watch } from "vue";

const inputQuery = ref("");

let ladyAvengers = [
  {
    title: "Wasp",
    firstname: "Janet",
    lastname: "Van Dyne",
    movies: [
      { title: "Ant-Man", year: 2015 },
      { title: "Ant‑Man and the Wasp", year: 2018 },
      { title: "Avengers: Endgame", year: 2019 },
    ],
  },
  {
    title: "Scarlet Witch",
    firstname: "Wanda",
    lastname: "Maximoff",
    movies: [
      { title: "Captain America: The Winter Soldier", year: 2014 },
      { title: "Avengers: Age of Ultron", year: 2015 },
      { title: "Captain America: Civil War", year: 2016 },
      { title: "Avengers: Infinity War", year: 2018 },
      { title: "Avengers: Endgame", year: 2019 },
      { title: "Doctor Strange in the Multiverse of Madness", year: 2022 },
    ],
  },
  {
    title: "Black Widow",
    firstname: "Natasha",
    lastname: "Romanoff",
    movies: [
      { title: "Iron Man 2", year: 2010 },
      { title: "Avengers", year: 2012 },
      { title: "Captain America: The Winter Soldier", year: 2014 },
      { title: "Avengers: Age of Ultron", year: 2015 },
      { title: "Captain America: Civil War", year: 2016 },
      { title: "Avengers: Infinity War", year: 2018 },
      { title: "Avengers: Endgame", year: 2019 },
    ],
  },
  {
    title: "Captain Marvel",
    firstname: "Carol",
    lastname: "Danvers",
    movies: [
      { title: "Captain Marvel", year: 2019 },
      { title: "Avengers: Endgame", year: 2019 },
    ],
  },
  {
    title: "Gamora",
    firstname: "Gamora Zen",
    lastname: "Whoberi Ben Titan",
    movies: [
      { title: "Guardians of the Galaxy", year: 2014 },
      { title: "Guardians of the Galaxy Vol. 2", year: 2017 },
      { title: "Avengers: Infinity War", year: 2018 },
      { title: "Avengers: Endgame", year: 2019 },
    ],
  },
  {
    title: "Shuri",
    firstname: "Shuri",
    lastname: "Princess",
    movies: [
      { title: "Black Panther", year: 2018 },
      { title: "Avengers: Infinity War", year: 2018 },
      { title: "Avengers: Endgame", year: 2019 },
      { title: "Black Panther: Wakanda Forever", year: 2022 },
    ],
  },
];
const filteredAvengers = ref([...ladyAvengers]);

const search = () => {
  const query = inputQuery.value.trim().toLowerCase();
  if (!query) {
    filteredAvengers.value = [...ladyAvengers];
    return;
  }
  filteredAvengers.value = ladyAvengers.filter(
    (avenger) =>
      avenger.firstname.toLowerCase().includes(query) ||
      avenger.lastname.toLowerCase().includes(query) ||
      avenger.title.toLowerCase().includes(query)
  );
};

const moviesOfFilteredAvengers = computed(() => {
  return filteredAvengers.value
    .flatMap((avenger) => avenger.movies)
    .filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.title === movie.title)
    );
});

watch(inputQuery, (newVal) => {
  if (!newVal.trim()) {
    filteredAvengers.value = [...ladyAvengers];
  }
});
</script>

<template>
  <div class="container p-4 mt-5">
    <h2 class="text-primary-emphasis">Avenger Filter App</h2>
    <div class="input-group mb-4 mt-3">
      <input
        type="text"
        placeholder="Search"
        v-model="inputQuery"
        class="me-3"
      />
      <button class="btn btn-primary" @click="search">Search</button>
    </div>

    <h2 v-if="filteredAvengers.length">Matching Avengers:</h2>
    <ul>
      <li
        class="list-group-item"
        v-for="avenger in filteredAvengers"
        :key="avenger.title"
      >
        {{ avenger.title }} ({{ avenger.firstname }} {{ avenger.lastname }})
      </li>
    </ul>

    <h2 v-if="inputQuery && moviesOfFilteredAvengers.length">Movies of Matching Avengers:</h2>
    <ul v-if="inputQuery">
      <li
        class="list-group-item"
        v-for="movie in moviesOfFilteredAvengers"
        :key="movie.title"
      >
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  width: fit-content;
  border: 2px solid blue;
  background-color: aliceblue;
}
</style>
