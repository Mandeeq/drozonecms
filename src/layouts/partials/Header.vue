<script setup>
import { ref, onMounted, onUnmounted,computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import axios from "axios";

import { useAuthStore } from "@/stores/authstore";


// Grab example data
import notifications from "@/data/notifications";
;

const authStore = useAuthStore();

// Main store and Router
const store = useTemplateStore();
const router = useRouter();

// Reactive variables
const baseSearchTerm = ref("");

// On form search submit functionality
function onSubmitSearch() {
  router.push("/backend/pages/generic/search?" + baseSearchTerm.value);
}

// When ESCAPE key is hit close the header search section
function eventHeaderSearch(event) {
  if (event.which === 27) {
    event.preventDefault();
    store.headerSearch({ mode: "off" });
  }
}

// Attach ESCAPE key event listener
onMounted(() => {
  document.addEventListener("keydown", eventHeaderSearch);
});

// Remove keydown event listener
onUnmounted(() => {
  document.removeEventListener("keydown", eventHeaderSearch);
});

const logout = async () => {
  // console.log("loggedout")

  try {
    const response = await axios.delete('/v1/auth/refresh')
  
    if(response.status === 200){
      authStore.removeToken()
      router.push({ name: "auth-signin3" }); // redirect to sign in page
    }
    


  } catch (err) {
    console.log(err.response.data?.errorPayload.errors.statusCode);
    if(err.response.data?.errorPayload.errors.statusCode === "440"){
      localStorage.removeItem("token"); // to remove the user from the local storage
      authStore.removeToken()
      router.push({ name: "auth-signin3" }); // redirect to sign in page
    }
  }
};

const headerStyle = computed(() =>{
  return store.settings.darkModeActive
  ?store.settings.darkMode
  : "bg-body-light"
}) 






</script>

<template>
  <!-- Header -->
   
   
  <header id="page-header" :class="headerStyle">

    <slot>


    
      <!-- Header Content -->
      <div class="content-header">
        
        <slot name="content">
          <!-- Left Section -->
          <div class="d-flex align-items-center">
            <slot name="content-left">
              <!-- Toggle Sidebar -->
              <button type="button" class="btn btn-sm btn-alt-secondary me-2 d-lg-none"
                @click="store.sidebar({ mode: 'toggle' })">
                <i class="fa fa-fw fa-bars"></i>
              </button>
             
            </slot>
          </div>

          
          

          <div class="d-flex align-items-center ">
            <slot name="content-right">
                       <!-- Dark Mode -->
                       <div class="dropdown nav-main nav-main-horizontal nav-main-hover nav-main-item">
                  <button type="button" class="btn btn-sm btn-alt- nav-main-item h-100 border-0 bg-transparent shadow-none" 
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <a class="hieght nav-main-link ">
                    <i v-if="!store.settings.darkModeActive" class="far fa-fw fa-moon text-dark"></i>
                    <i v-if="store.settings.darkModeActive" class="fa fa-fw fa-moon text-dark"></i>
                    </a>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end smini-hide border-0"
                    aria-labelledby="sidebar-dark-mode-dropdown">
                    <button @click="() => store.darkMode({ mode: 'off' })" type="button"
                      class="dropdown-item d-flex align-items-center gap-2 "
                      :class="{ active: store.settings.darkMode === 'off' }">
                      <i class="far fa-sun fa-fw opacity-50"></i>
                      <span class="fs-sm fw-medium">Light</span>
                    </button>
                    <button @click="() => store.darkMode({ mode: 'on' })" type="button"
                      class="dropdown-item d-flex align-items-center gap-2"
                      :class="{ active: store.settings.darkMode === 'on' }">
                      <i class="far fa-moon fa-fw opacity-50"></i>
                      <span class="fs-sm fw-medium">Dark</span>
                    </button>
                    <button @click="() => store.darkMode({ mode: 'system' })" type="button"
                      class="dropdown-item d-flex align-items-center gap-2"
                      :class="{ active: store.settings.darkMode === 'system' }">
                      <i class="fa fa-desktop fa-fw opacity-50"></i>
                      <span class="fs-sm fw-medium">System</span>
                    </button>
                  </div>
                </div>
              <!-- User Dropdown -->
             <div id="dropdown" class=" dropdown d-inline-block  nav-main nav-main-horizontal nav-main-hover nav-main-item ">
                
                <button type="button" class="  btn  d-flex align-items-center nav-main-item border-0 bg-transparent shadow-none"
                  id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <a class=" hieght nav-main-link ">
                    <i class="fas fa-user-circle nav-main-link-icon" style="font-size: 21px;"></i>
                  <span class="d-none d-sm-inline-block ms-2 nav-main-link-name text-dark">John</span>
                 
                  </a>
                </button>
                <div class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
                  aria-labelledby="page-header-user-dropdown">
                  <div class="p-3 text-center  border-bottom rounded-top">
                    <img class="img-avatar img-avatar48 img-avatar-thumb" src="/assets/media/avatars/avatar10.jpg"
                      alt="Header Avatar" />
                    <p class="mt-2 mb-0 fw-medium">John Smith</p>
                    <p class="mb-0 text-muted fs-sm fw-medium">Web Developer</p>
                  </div>
                  <div class="p-2">
                    <a class="dropdown-item d-flex align-items-center justify-content-between"
                      href="javascript:void(0)">
                      <span class="fs-sm fw-medium">Inbox</span>
                      <span class="badge rounded-pill bg-primary ms-2">3</span>
                    </a>
                    <RouterLink :to="{ name: 'dashboard' }"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs-sm fw-medium">Profile</span>
                      <span class="badge rounded-pill bg-primary ms-2">1</span>
                    </RouterLink>
                    <a class="dropdown-item d-flex align-items-center justify-content-between"
                      href="javascript:void(0)">
                      <span class="fs-sm fw-medium">Settings</span>
                    </a>
                  </div>
                  <div role="separator" class="dropdown-divider m-0"></div>
                  <div class="p-2">
                    <RouterLink :to="{ name: 'dashboard' }"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs-sm fw-medium ">Lock Account</span>
                    </RouterLink>




                    <span
                      class="fs-sm fw-medium dropdown-item d-flex align-items-center justify-content-between cursor-pointer"
                      @click="logout">Log Out</span>


                  </div>
                </div>
              </div>
              
              <!-- END User Dropdown -->

           
              
              <!-- END Notifications Dropdown -->
            </slot>
          </div>
          <!-- END Right Section -->
        </slot>
      </div>
      <!-- END Header Content -->

      <!-- Header Search -->
      <div id="page-header-search" class="overlay-header bg-body-extra-light"
        :class="{ show: store.settings.headerSearch }">
        <div class="content-header">
          <form class="w-100" @submit.prevent="onSubmitSearch">
            <div class="input-group">
              <button type="button" class="btn btn-alt-danger" @click="store.headerSearch({ mode: 'off' })">
                <i class="color fa fa-fw fa-times-circle"></i>
              </button>
              <input type="text" class="form-control" placeholder="Search or hit ESC.." id="page-header-search-input"
                name="page-header-search-input" v-model="baseSearchTerm" />
            </div>
          </form>
        </div>
      </div>
      <!-- END Header Search -->

      <!-- Header Loader -->
      <div id="page-header-loader" class="overlay-header bg-body-extra-light"
        :class="{ show: store.settings.headerLoader }">
        <div class="content-header">
          <div class="w-100 text-center">
            <i class="fa fa-fw fa-circle-notch fa-spin"></i>
          </div>
        </div>
      </div>
      
      <!-- END Header Loader -->
    </slot>
  </header>
  <!-- END Header -->
</template>
<style scoped>
.header{
  background-color: #0087CE !important;
}
.hieght{
  height: 60px !important;
}



</style>
