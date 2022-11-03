<script setup>
  import axios from 'axios';
  import {onMounted, reactive, ref} from "vue";

  const allMovies = ref([]);
  const isLoading = ref(true);

  onMounted(async () => {
    const movies = await axios.get('https://ghibliapi.herokuapp.com/films/');
    const { status, data } = movies;

    if (status === 200) {
      allMovies.value = data;
      isLoading.value = false;
    }
  });
</script>

<template>
  <div class="container">
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Voir</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="!isLoading">
                  <tr v-for="movie in allMovies" :key="movie.id">
                    <td>{{ movie.id }}</td>
                    <td>{{ movie.title }}</td>
                    <td>{{ movie.release_date }}</td>
                    <td>👀</td>
                  </tr>
                </template>
                <tr v-else>
                  <td colspan="4">Chargement...</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
div.container{
    font-family: 'Muli', sans-serif;
	display: flex;
	align-items: center;
}

.styled-table {
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 920px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;

}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}

</style>
