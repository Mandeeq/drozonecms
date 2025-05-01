<script setup>
import {  RouterLink } from "vue-router";
import axios from "axios";
import { onMounted } from "vue";
import { useTemplateStore } from "@/stores/template";

const store = useTemplateStore();

const getKanye = async () => {
  try {
    const response = await axios.get("https://api.kanye.rest/");
    console.log("My response", response);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getKanye();
  store.mainContent({ mode: "full" });
});


</script>

<template>
  <!-- Hero -->
  <div class="content">
    <div
      class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start"
    >
      <div class="flex-grow-1 mb-1 mb-md-0">
        <h1 class="h3 fw-bold mb-2">Dashboard</h1>
        <h2 class="h6 fw-medium fw-medium text-muted mb-0">
          Welcome
          <RouterLink :to="{ name: 'dashboard' }" class="fw-semibold"
            >Iman</RouterLink
          >, everything looks great.
          
        </h2>
      </div>
    </div>
  </div>
</template>
