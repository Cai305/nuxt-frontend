<template>
    <div v-if="currentCategory" class="container edit-form">
      <h4>Category</h4>
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title"
            v-model="currentCategory.title"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description"
            v-model="currentCategory.description"
          />
        </div>
  
        <div class="form-group">
          <label><strong>Status:</strong></label>
          {{ currentCategory.published ? "Published" : "Pending" }}
        </div>
      </form>
  
      <button class="badge badge-primary mr-2"
        v-if="currentCategory.published"
        @click="updatePublished(false)"
      >
        UnPublish
      </button>
      <button v-else class="badge badge-primary mr-2"
        @click="updatePublished(true)"
      >
        Publish
      </button>
  
      <button class="badge badge-danger mr-2"
        @click="deleteCategory"
      >
        Delete
      </button>
  
      <button type="submit" class="badge badge-success"
        @click="updateCategory"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Please click on a Category...</p>
      
    </div>


  </template>
  
  <script>
  import CategoryService from "../services/CategoryService";
  import LocaleService from "../services/LocaleService";
  
  export default {
    name: "category",
    data() {
      return {
        currentCategory: null,
        message: ''
      };
    },
    methods: {
      getCategory(id) {
        CategoryService.get(id)
          .then(response => {
            this.getLocale(response.locale) 
            this.currentCategory = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },

      getLocale(id) {
        LocaleService.get(id)
          .then(response => {
            this.currentCategory = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      
  
      updatePublished(status) {
        var data = {
          id: this.currentCategory._id,
          title: this.currentCategory.title,
          description: this.currentCategory.description,
          published: status
        };
  
        CategoryService.update(this.currentCategory.id, data)
          .then(response => {
            console.log(response.data);
            this.currentCategory.published = status;
            this.message = 'The status was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updateCategory() {
        CategoryService.update(this.currentCategory.id, this.currentCategory)
          .then(response => {
            console.log(response.data);
            this.message = 'The tutorial was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
   async deleteCategory() {
       await CategoryService.delete(this.currentCategory.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "tutorial" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getCategory(this.$route.params.id);
    }
  };
  </script>
  
  <style>

  </style>