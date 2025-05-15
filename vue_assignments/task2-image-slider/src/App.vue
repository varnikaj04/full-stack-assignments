<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const ladyAvengers = [
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

const currentIndex = ref(0);
const interval = ref(null);

const currentHero = computed(() => ladyAvengers[currentIndex.value]);

const startAutoSlide = () => {
  interval.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % ladyAvengers.length;
  }, 3000);
};

const getHeroImage = (title) => {
  const formatted = title.replace(/\s+/g, "-").toLowerCase();
  return new URL(`./assets/${formatted}.jpg`, import.meta.url).href;
};

onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-12">
        <div class="card shadow-lg p-4">
          <div class="row align-items-center">
            <div
              class="col-md-6 d-flex flex-column align-items-center mb-4 mb-md-0"
            >
              <h3 class="mb-3 text-primary">{{ currentHero.title }}</h3>
              <img
                :src="getHeroImage(currentHero.title)"
                class="img-fluid rounded mb-3 hero-img"
                alt="Hero Image"
              />
              <div class="d-flex gap-2 justify-content-center">
                <span
                  v-for="(hero, index) in ladyAvengers"
                  :key="index"
                  class="indicator"
                  :class="{ active: index === currentIndex }"
                ></span>
              </div>
            </div>

            <div class="col-md-6">
              <h4 class="text-secondary">
                {{ currentHero.firstname }} {{ currentHero.lastname }}
              </h4>
              <h5 class="mt-4 mb-2 text-muted">Movies</h5>
              <ul class="list-group list-group-flush">
                <li
                  v-for="(movie, idx) in currentHero.movies"
                  :key="idx"
                  class="list-group-item"
                >
                  🎬 {{ movie.title }} ({{ movie.year }})
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-img {
  width: 100%;
  max-width: 300px;
  height: auto;
  border: 3px solid #0d6efd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.indicator {
  width: 14px;
  height: 14px;
  background-color: #dee2e6;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.indicator.active {
  background-color: #0d6efd;
  transform: scale(1.2);
}

.card {
  border-radius: 12px;
  background-color: #f8f9fa;
}
</style>
