<script setup>
import { ref, watch, onMounted, computed } from "vue";
import BaseNavigation from "@/components/BaseNavigation.vue";
import { useTemplateStore } from "@/stores/template";

// Props from parent component
const props = defineProps({
  withMiniNav: { type: Boolean, default: false },
  navigationItems: { type: Array, required: true }, // MENU COMES FROM OUTSIDE
});

const store = useTemplateStore();
const isSidebarMini = ref(store.settings.sidebarMini === "on");
const isDocked = ref(false);

watch(isDocked, (newVal) => {
  localStorage.setItem("isDocked", newVal);
  store.sidebarMini({ mode: newVal ? "off" : "on" });
});

const expandSidebar = () => {
  if (!isDocked.value) store.sidebarMini({ mode: "off" });
};

const minimizeSidebar = () => {
  if (!isDocked.value) store.sidebarMini({ mode: "on" });
};

const toggleDockNavigation = () => {
  isDocked.value = !isDocked.value;
  store.sidebarMini({ mode: isDocked.value ? "off" : "on" });
};

watch(() => store.settings.sidebarMini, (newVal) => {
  if (!isDocked.value) isSidebarMini.value = newVal === "on";
});

onMounted(() => {
  const DockState = localStorage.getItem("isDocked");
  if (DockState !== null) isDocked.value = DockState === "true";
});

const sidebarcolor = computed(() => {
  return store.settings.darkModeActive
    ? store.settings.darkMode
    : "bg-primary";
});
</script>

<template>
  <div id="sidebar" :class="sidebarcolor, { minimized: isSidebarMini, docked: isDocked }"
       @mouseenter="expandSidebar"
       @mouseleave="minimizeSidebar">
    <nav id="sidebar-nav" :class="{ 'with-mini-nav': withMiniNav, minimized: isSidebarMini }">
      <!-- Logo and Title -->
  
<slot/>
      <!-- Sidebar Links -->
      <div id="simplebar-sidebar" class="js-sidebar-scroll">
        <div class="content-side">
          <BaseNavigation :nodes="navigationItems" />
          <hr class="bg-white" style="height: 1px; opacity: 0.5;" />
          <div class="nav-main">

<div class=" a nav-main-link" aria-current="page" @click="toggleDockNavigation">
  <i class="nav-main-link-icon" :class="isDocked ? 'si si-lock fa-lg' : 'si si-lock-open fa-lg'"></i>
  &nbsp;
  <span class="nav-main-link-name fs-sm">
    {{ isDocked ? 'Docked' : 'Undocked' }}
  </span>
</div>
</div>

        </div>
      </div>
    </nav>
  </div>
</template>

<style>
#sidebar.minimized {
  width: 80px;
  /* You can adjust the width for minimized state */
  transition: width 0.3s ease;
}

#sidebar.minimized .content-side {
  display: none;
  /* Hide the content when minimized */
}

#sidebar .content-side {
  display: block;
  /* Show the content when expanded */
}

.logo1 {

  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  border: 1px solid white;
  margin-left: 3px;


}

.logo2 {
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid white;
}

.text {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: -5px;
}
</style>