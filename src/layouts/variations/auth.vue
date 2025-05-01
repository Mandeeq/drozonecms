<script setup>
import { useTemplateStore } from "@/stores/template";
import { onMounted } from "vue";

// Main store
const store = useTemplateStore();

// Set default elements for this layout
onMounted(() => {
  localStorage.removeItem("oneuiVueDarkMode");
  document.documentElement.classList.remove("dark"); // Ensure dark mode class is removed
});
// Set various template options for this layout variation
store.mainContent({ mode: "full" });
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>
