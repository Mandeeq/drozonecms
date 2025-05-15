<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import axios from "axios";


// import users from "@/data/usersDataset.json";
// Vue Dataset, for more info and examples you can check out https://github.com/kouts/vue-dataset/tree/next
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";

// Get example data

const books = ref([]); //store banner data
const showModal = ref(false); //set visibility of the modal
const errors = ref({}); // show errors if any

// storing new banner details
const newBanners = ref({

  title: "",
  description: "",
  file: "",
});
const createBanners = async () => {
  const formData = new FormData();
  
  formData.append("title", newBanners.value.title);
  formData.append("description", newBanners.value.description);
  if (newBanners.value.file) {
    formData.append("file", newBanners.value.file);
  }

  // Sends a post request to the API  useing POST
  try {
    const response = await axios.post("/v1/library/resources", formData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    //refresh the list
    getBanners();
    showModal.value = false; //close the modal
    newBanners.value = {
      //resets the form
     
      title: "",
      description: "",
      file: "",
    };
    // console.log("My response", response);
  } catch (error) {
    console.log(error);
    errors.value = error.response?.data?.errorPayload?.errors || {};
  }
};

// cols array  to define the columns in the table
const cols = reactive([
  
  {
    name: "Title",
    field: "title",
    sort: "",
  },
  {
    name: "Description",
    field: "description",
    sort: "",
  },
  {
    name: "Image",
    field: "image_url",
    sort: "",
  },
  {
    name: "Action",
    field: "action",
    sort: "",
  },

]);

//input changes and updates newBanners.value.file
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newBanners.value.file = file;
  }
};
// Sort by functionality
const sortBy = computed(() => {
  return cols.reduce((acc, o) => {
    if (o.sort) {
      o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
    }
    return acc;
  }, []);
});

// On sort th click
// handle the column sorting when a table header is clicked
function onSort(event, i) {
  let toset;
  const sortEl = cols[i];

  if (!event.shiftKey) {
    cols.forEach((o) => {
      if (o.field !== sortEl.field) {
        o.sort = "";
      }
    });
  }
}

// this will fetch the banners from backend API

const getBanners = async () => {
  try {
    const response = await axios.get("/v1/library/resources");
    console.log("API Response", response.data);
    books.value = response.data.dataPayload.data; // update the banners.value with response data
  } catch (error) {
    console.log(error);
  }
};

// resets the modal when its closed
const clearModal = () => {
  newBanners.value = {
  
    title: "",
    description: "",
    file: "",
    action
  };
  errors.value = {};
};

//when component is mounted it'll fetch the list of banners
onMounted(() => {

  getBanners();
});


const deleteBook = async (bookId) => {
  if (!confirm("Are you sure you want to delete this book?")) return;

  try {
    await axios.delete(`/v1/library/resources/${bookId}`);

    //call getBanners to refresh the list
    getBanners();

  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

const editBook = async (bookId, updatedData) => {
  if (!confirm("Are you sure you want to update this book?")) return;

  try {
    const response = await axios.put(`/v1/library/resources/${bookId}`, updatedData);

    // Update the local book list with the new details
    books.value = books.value.map((book) =>
      book.id === bookId ? { ...book, ...response.data } : book
    );

    alert("Book updated successfully!");
  } catch (error) {
    console.error("Error updating book:", error);
    alert("Failed to update book. Please try again.");
  }
};


const showEditModal = ref(false); // Controls the edit modal visibility
const editBookData = ref({
  
  image: "",
 
  title: "",
  description: "",
});
// Open the edit form with selected book details
const openEditForm = (book) => {
  editBookData.value = { ...book }; // Copy book data into editBookData
  showEditModal.value = true; // Show the edit modal
};
const openModal=() => {
  showModal.value = true; //open the modal
  clearModal(); //clear the modal
};

const closeModal=()=> {
  showModal.value = false; //close the modal
  clearModal(); //clear the modal
};

// Save the updated book details
const saveEditedBook = async () => {
  if (!confirm("Are you sure you want to update this book?")) return;

  try {
    const response = await axios.put(
      `/v1/library/resources/${editBookData.value.id}`,
      editBookData.value
    );
    getBanners();

    // Update the book list
    books.value = books.value.map((book) =>
      book.id === editBookData.value.id ? { ...book, ...response.data } : book
    );

    alert("Book updated successfully!");
    showEditModal.value = false; // Close modal
  } catch (error) {
    console.error("Error updating book:", error);
    alert("Failed to update book.");
  }
};
const getImageUrl=(imagePath)=>{
if(!imagePath){
  return '';
} if (imagePath.startsWith("http")) {
    return imagePath;
  }  
    return `http://localhost:8088/${imagePath}`;
}
</script>

<template>
<BaseModal

v-if="showModal"
title="Add Portfolios"
@close="closeModal"
 size="modal-lg"

>

        <div class="block-content fs-sm">
          
          <input v-model="newBanners.title" placeholder="Title" class="form-control mb-2" />
          <div v-if="errors.title" class="text-danger">
            {{ errors.title }}
          </div>
          <input v-model="newBanners.description" placeholder="Description" class="form-control mb-2" />
          <div v-if="errors.description" class="text-danger">
            {{ errors.description }}
          </div>
          <input placeholder="Image" class="form-control mb-2" type="file" @change="onFileChange($event)"
            accept="images/*" capture />
            
        </div>
        <div class="block-content block-content-full text-end bg-body">
          
          <button @click="createBanners" class="btn btn-sm btn-primary">
            Add portfolios
          </button>
        </div>
</BaseModal>
  <!-- </template> -->
  <!-- </BasePageHeading> -->
  <!-- END Hero -->

  <!-- Page Content -->
  <!-- Page Content -->
  <div class="content">
    <BaseBlock content-full>
      <!-- Row containing title and "Add Banner" button -->
   <Basebutton
        title="Add Portfolio"
        @open="openModal"
        size="modal-sm"
        variant="primary"
      />

      <!-- Table for displaying banners -->
      <Dataset v-slot="{ ds }" :ds-data="books" :ds-sortby="sortBy"
        :ds-search-in="[ 'title', 'description', 'image_url']">
        <!-- Row containing page count and search bar -->
        <div class="d-flex justify-content-between align-items-center mb-2">
          <DatasetShow class="fs-sm me-3" />
          <DatasetSearch class="ms-auto w-25" ds-search-placeholder="Search..." />
        </div>

        <hr />
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped mb-0">
                <thead>
                  <tr>
                    <th v-for="(th, index) in cols" :key="th.field" :class="['sort', th.sort]"
                      @click="onSort($event, index)">
                      {{ th.name }} <i class="gg-select float-end"></i>
                    </th>
                  </tr>
                </thead>
                <DatasetItem tag="tbody" class="fs-sm">
                  <template #default="{ row, rowIndex }">
                    <tr>
                      
                      <td>{{ row.title }}</td>
                      <td style="min-width: 150px">{{ row.description }}</td>
                      <td>
                        <img :src="getImageUrl(row.image_url)" style="width: 40px; height: auto" />
                      </td>

                      <td class="">{{ row.action }}
                        <div v-if="showEditModal" class="modal-backdrop">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title">Edit Book</h5>
                              <button type="button" class="close" @click="showEditModal = false">
                                <span> &times; </span>
                              </button>
                            </div>

                            <div class="modal-body">
                              
                              <input v-model="editBookData.title" placeholder="Title" class="form-control mb-2" />
                              <input v-model="editBookData.description" placeholder="Description"
                                class="form-control mb-2" />
                              <input placeholder="Image" class="form-control mb-2" type="file"
                                @change="onFileChange($event)" accept="images/*" capture />

                              <div class="modal-footer">
                                <button @click="saveEditedBook" class="bg-primary text-white px-4 py-2 rounded">
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="btn-group">
                          <!--edit button-->
                          <div class="modal-footer justify-content-center">
                            <button @click="openEditForm(row)" class="btn btn-sm btn-alt-secondary">
                              <i class="fa fa-fw fa-pencil-alt"></i>
                            </button>
                          </div>
                          <button type="button" class="btn btn-sm btn-alt-secondary" @click="deleteBook(row.id)">
                            <i :class="['fas', row.is_deleted === 1 ? 'fa-undo' : 'fa-trash']"></i>
                          </button>
                        </div>
                      </td>

                    </tr>
                  </template>
                </DatasetItem>
              </table>
            </div>
          </div>
        </div>
        <div class="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <DatasetInfo class="py-3 fs-sm" />
          <DatasetPager class="flex-wrap py-3 fs-sm" />
        </div>
      </Dataset>
    </BaseBlock>
  </div>
  ``
  <!-- END Page Content -->
</template>

<style lang="scss" scoped>
.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}

.gg-select::after,
.gg-select::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}

.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}

.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}

th.sort {
  cursor: pointer;
  user-select: none;

  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }

  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}


</style>
