<script setup>
import { useTemplateStore } from "@/stores/template";

import BaseLayout from "@/layouts/BaseLayout.vue";

// Main store
const store = useTemplateStore();

// Set default elements for this layout
store.setLayout({
  header: true,
  sidebar: false,
  sideOverlay: false,
  footer: false,
});

// Set various template options for this layout variation
store.headerStyle({ mode: "light" });
store.mainContent({ mode: "boxed" });
</script>

<template>
  <BaseLayout>
    <!-- Header Content Left -->
    <!-- Using the available v-slot, we can override the default Side Overlay content from layouts/partials/Header.vue -->
    <template #header-content-left>
      <div class="d-flex align-items-center">
        <!-- Logo -->
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="fw-bold fs-lg text-dual me-2"
        >
          OneUI
          <span class="fw-medium">Vue</span>
        </RouterLink>
        <!-- END Logo -->

        <!-- Version -->
        <div
          class="fs-xs fw-semibold py-1 px-2 rounded-pill bg-body-dark text-dark"
        >
          v{{ store.app.version }}
        </div>
      </div>
    </template>
    <!-- END Header Content Left -->

    <!-- Header Content Right -->
    <!-- Using the available v-slot, we can override the default Side Overlay content from layouts/partials/Header.vue -->
    <template #header-content-right>
      <!-- Dark Mode -->
      <div class="dropdown d-inline-block me-1">
        <button
          type="button"
          class="btn btn-alt-secondary"
          id="sidebar-dark-mode-dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i
            v-if="!store.settings.darkModeActive"
            class="far fa-fw fa-moon"
          ></i>
          <i v-if="store.settings.darkModeActive" class="fa fa-fw fa-moon"></i>
        </button>
        <div
          class="dropdown-menu dropdown-menu-end smini-hide border-0"
          aria-labelledby="sidebar-dark-mode-dropdown"
        >
          <button
            @click="() => store.darkMode({ mode: 'off' })"
            type="button"
            class="dropdown-item d-flex align-items-center gap-2"
            :class="{ active: store.settings.darkMode === 'off' }"
          >
            <i class="far fa-sun fa-fw opacity-50"></i>
            <span class="fs-sm fw-medium">Light</span>
          </button>
          <button
            @click="() => store.darkMode({ mode: 'on' })"
            type="button"
            class="dropdown-item d-flex align-items-center gap-2"
            :class="{ active: store.settings.darkMode === 'on' }"
          >
            <i class="far fa-moon fa-fw opacity-50"></i>
            <span class="fs-sm fw-medium">Dark</span>
          </button>
          <button
            @click="() => store.darkMode({ mode: 'system' })"
            type="button"
            class="dropdown-item d-flex align-items-center gap-2"
            :class="{ active: store.settings.darkMode === 'system' }"
          >
            <i class="fa fa-desktop fa-fw opacity-50"></i>
            <span class="fs-sm fw-medium">System</span>
          </button>
        </div>
      </div>
      <!-- END Dark Mode -->

      <!-- Options -->
      <div class="dropdown me-1">
        <button
          type="button"
          class="btn btn-alt-secondary"
          id="sidebar-themes-dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-fw fa-brush"></i>
        </button>
        <div
          class="dropdown-menu dropdown-menu-end fs-sm smini-hide border-0"
          aria-labelledby="sidebar-themes-dropdown"
        >
          <!-- Color Themes -->
          <button
            @click="store.setColorTheme({ theme: '' })"
            type="button"
            class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
            :class="{ active: store.settings.colorTheme === '' }"
          >
            <span>Default</span>
            <i class="fa fa-circle text-default"></i>
          </button>
          <button
            @click="store.setColorTheme({ theme: 'amethyst' })"
            type="button"
            class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
            :class="{ active: store.settings.colorTheme === 'amethyst' }"
          >
            <span>Amethyst</span>
            <i class="fa fa-circle text-amethyst"></i>
          </button>
          <button
            @click="store.setColorTheme({ theme: 'city' })"
            type="button"
            class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
            :class="{ active: store.settings.colorTheme === 'city' }"
          >
            <span>City</span>
            <i class="fa fa-circle text-city"></i>
          </button>
          <button
            @click="store.setColorTheme({ theme: 'flat' })"
            type="button"
            class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
            :class="{ active: store.settings.colorTheme === 'flat' }"
          >
            <span>Flat</span>
            <i class="fa fa-circle text-flat"></i>
          </button>
          <button
            @click="store.setColorTheme({ theme: 'modern' })"
            type="button"
            class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
            :class="{ active: store.settings.colorTheme === 'modern' }"
          >
            <span>Modern</span>
            <i class="fa fa-circle text-modern"></i>
          </button>
          <button
            @click="store.setColorTheme({ theme: 'smooth' })"
            type="button"
            class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
            :class="{ active: store.settings.colorTheme === 'smooth' }"
          >
            <span>Smooth</span>
            <i class="fa fa-circle text-smooth"></i>
          </button>
          <!-- END Color Themes -->
        </div>
      </div>
      <!-- END Options -->

      <!-- Purchase Link -->
      <a
        class="btn btn-success ms-1"
        href="https://pixelcave.com/products/oneui-vue-edition?purchase=true&ref=demo"
        v-click-ripple
      >
        <i class="fa fa-fw fa-shopping-cart opacity-50"></i>
        <span class="d-none d-sm-inline-block ms-2">Purchase</span>
      </a>
      <!-- END Purchase Link -->
    </template>
    <!-- END Header Content Right -->

    <RouterView />
  </BaseLayout>
</template>
