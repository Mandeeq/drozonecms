<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useTemplateStore } from "@/stores/template";
import BaseNavigation from "@/components/BaseNavigation.vue";
import menu from "@/data/menu";

// Store & Navigation
const store = useTemplateStore();
const navigation = menu.main;

// Component properties
defineProps({
  withMiniNav: {
    type: Boolean,
    default: false,
  },
});

// Sidebar state
const isSidebarMini = ref(store.settings.sidebarMini === "on");
const isDocked = ref(false);


watch(isDocked, (newVal) => {
  localStorage.setItem("isDocked", newVal);
  store.sidebarMini({ mode: newVal ? "off" : "on" });

});

// Expand sidebar when mouse enters
const expandSidebar = () => {
  if (!isDocked.value) {
    store.sidebarMini({ mode: "off" });


  }
};

// Minimize when mouse leaves (only when undocked)
const minimizeSidebar = () => {
  if (!isDocked.value) {
    store.sidebarMini({ mode: "on" });
  }
};

const toggleDockNavigation = () => {
  isDocked.value = !isDocked.value; // Toggle docking state
  store.sidebarMini({ mode: isDocked.value ? "off" : "on" });

};

// Watch for store updates - Sidebar Mini mode
watch(() => store.settings.sidebarMini, (newVal) => {
  if (!isDocked.value) {
    isSidebarMini.value = newVal === "on";
  }
});




onMounted(() => {
  const DockState = localStorage.getItem("isDocked");
  if (DockState !== null) {
    isDocked.value = DockState === "true";
  }
});

const sidebarcolor = computed(() => {
  return store.settings.darkModeActive
    ? store.settings.darkMode
    : "bg-primary"
})

</script>




<template>
  <Universalsidebar>

    <nav id="sidebar-nav" :class="{ 'with-mini-nav': withMiniNav, minimized: isSidebarMini }"
      aria-label="Main Navigation">
      <slot>
        <!-- Side Header -->
        <div class="content-header" :class="sidebarcolor">
          <slot name="header">

            <!-- Logo -->

            <div class="nav-main">
              <span class="smini-visible">
                <img src="/assets/media/photos/drozone.png" alt="OneUI Vue" class="  nav-main-link-icon logo1 mt-5" />
              </span>

              <div class=" ms-4  smini-hide">
                <img src="/assets/media/photos/drozone.png" alt="OneUI Vue" class=" nav-main-link-icon logo2 " />
                <span class="text">DROZONE</span>
              </div>
            </div>

            <!-- END Logo -->
          </slot>




        </div>


        <div id="simplebar-sidebar" class="js-sidebar-scroll">
          <slot name="content">
            <!-- Side Navigation -->
            <div class="content-side">

              <BaseNavigation :nodes="navigation" />
            

             


            </div>
            <!-- END Side Navigation -->
          </slot>
        </div>
        <!-- END Sidebar Scrolling -->
      </slot>
      


    </nav>
  </Universalsidebar>




  <!-- END Sidebar -->
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

  border: 1px solid #D99837;
  margin-left: 3px;


}

.logo2 {
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #D99837;
}

.text {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: -5px;
}
</style>
