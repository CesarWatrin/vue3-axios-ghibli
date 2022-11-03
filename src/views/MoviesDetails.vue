
<script setup>
  import {onMounted, ref} from "vue";
  import axios from "axios";
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const movieId = route.params.id;
  const currentMovie = ref({});
  const isLoading = ref(true);

  onMounted(async () => {
    const movie = await axios.get('https://ghibliapi.herokuapp.com/films/' + movieId);
    const { status, data } = movie;

    if (status === 200) {
      currentMovie.value = data;
      isLoading.value = false;
    }
  });
</script>

<template>
  <div>
        <div class="film-container">
            <div class="film">
              <template v-if="!isLoading">
                <div class="film-preview" >
                  <img :src="currentMovie.image" alt='affiche' />
                </div>
                <div class="film-info">
                  <h2>{{ currentMovie.title }}</h2>
                  <h6>{{ currentMovie.release_date }}</h6>
                  <span>{{ currentMovie.description }}</span>
                </div>
              </template>
              <p class="loading" v-else>Chargement...</p>
            </div>
        </div>
    </div>
</template>

<style>
.film-container {
    font-family: 'Muli', sans-serif;
	display: flex;
	align-items: center;
	justify-content: center;
    color:black;
	flex-direction: column;
}

.film {
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
	display: flex;
	max-width: 100%;
	margin: 20px;
	overflow: hidden;
	width: 700px;
}

.film h6 {
	opacity: 0.6;
	margin: 0;
	letter-spacing: 1px;
	text-transform: uppercase;
}

.film h2 {
	letter-spacing: 1px;
	margin: 10px 0;
}

.film-preview {
    background-color: #009879;
	color: #fff;
	padding: 30px;
	max-width: 250px;
}
.film-preview img{
    max-height:250px;
}
.film-preview a {
	color: #fff;
	display: inline-block;
	font-size: 12px;
	opacity: 0.6;
	margin-top: 30px;
	text-decoration: none;
}

.film-info {
	padding: 30px;
	position: relative;
	width: 100%;
}

.loading {
  text-align: center;
  width: 100%;
  padding: 40px;
}
</style>
