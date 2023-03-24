<template>
  <div v-if="currentCategory" class="container edit-form">
    <h4>Category</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentCategory.title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" v-model="currentCategory.description" />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentCategory.published ? "Published" : "Pending" }}
      </div>
    </form>

    <div class="container text-center">


      <div class="row">
        <div class="col" v-if="currentCategory.published">
          <button class="badge badge-primary mr-2 col" @click="updatePublished(false)">
            UnPublish
          </button>
        </div>
        <div class="col" v-else>
          <button class="badge badge-primary mr-2 col" @click="updatePublished(true)">
            Publish
          </button>
        </div>
        <div class="col">
          <button class="badge badge-danger mr-2 col" @click="deleteCategory">
            Delete
          </button>
        </div>
        <div class="col">
          <button type="submit" class="badge badge-success col" @click="updateCategory">
            Update
          </button>
        </div>
      </div>
    </div>


    <br />
<div v-if="message" class="alert alert-primary" role="alert">
  <p>{{ message }}</p>
</div>

    
  
  </div>

  <div v-else>
 <br />
 <br />
    <div class="alert alert-primary" role="alert">
         Please click on a Category...
    </div>
  </div>
</template>
  
<script>
import CategoryService from "../services/CategoryService";
import LocaleService from "../services/LocaleService";

export default {
  name: "edi-category-details",
  data() {
    return {
      currentCategory: null,
      message: ''
    };
  },
  methods: {
    //   getCategory(id) {
    //     CategoryService.get("641b42172234cde3eadeab4c")
    //       .then(response => {
    //         this.getLocale(response.locale) 
    //         this.currentCategory = response.data;
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   },

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

      LocaleService.update(this.currentCategory._id, data)
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
      LocaleService.update(this.currentCategory._id, this.currentCategory)
        .then(response => {
          console.log(response.data);
          this.message = 'The was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    async deleteCategory() {
      await LocaleService.delete(this.currentCategory._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "category" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    //   this.getCategory(this.$route.params.id);
    this.getLocale(this.$route.params.id)
    console.log(this.$route.params.id)
  }
};
</script>
  
<style></style>

