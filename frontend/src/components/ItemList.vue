<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by title"
            v-model="title"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchTitle"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>category List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(category, index) in category"
            :key="index"
            @click="setActivecategory(category, index)"
          >
            {{ category.slug }}
          </li>
        </ul>
  
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllcategory">
          Remove All
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentcategory">
          <h4>category</h4>
          <div>
            <label><strong>Title:</strong></label> {{ currentcategory.slug }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ currentcategory.content }}
          </div>
          <div>
            <label><strong>Status:</strong></label> {{ currentcategory.published ? "Published" : "Pending" }}
          </div>
  
          <router-link :to="'/items/' + currentcategory._id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a category...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ItemService from "../services/ItemService";
  
  export default {
    name: "item",
    data() {
      return {
        item: [],
        category: [],
        categories: [],
        currentcategory: null,
        currentIndex: -1,
        title: ""
      };
    },
    methods: {
    //   retrievecategory() {
    //     CategoryService.getAll()
    //       .then(response => {
    //         this.category = response.data;
    //         console.log("cat: ",response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   },

      retrievecategory() {
        ItemService.getAll()
          .then(response => {
            this.category = response.data;
            console.log("item: ",response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrievecategory();
        this.currentcategory = null;
        this.currentIndex = -1;
      },
  
      setActivecategory(category, index) {
        this.currentcategory = category;
        this.currentIndex = category ? index : -1;
      },
  
      removeAllcategory() {
        ItemService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchTitle() {
        ItemService.findByTitle(this.slug)
          .then(response => {
            this.category = response.data;
            this.setActivecategory(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrievecategory();
    //   this.retrieveitem();
    }
  };
  </script>
  
  <style>

  </style>