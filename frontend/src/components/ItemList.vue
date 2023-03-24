<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>item List</h4> 
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(item, index) in item" :key="index"
          @click="setActiveitem(item, index)">
          {{ item.slug }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllitem">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentitem">
        <div class="card" style="width: 18rem;">
          <div class="card-body">

            <h5 class="card-title">Item</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              <label><strong>Title:</strong></label> {{ currentitem.slug }}
            </h6>
            <div>
                <label><strong>Content:</strong></label> {{ currentitem.content }}
              </div>
              <div>
                <label><strong>Status:</strong></label> {{ currentitem.published ? "Published" : "Pending" }}
              </div>
          </div>
          <div class="card-footer ">
              <div class="row">
                  <button type="button" class="btn btn-warning"><router-link :to="'/items/' + currentitem._id"
                      class="badge badge-warning">Edit</router-link>
                  </button>
            
              </div>
          </div>
        </div>
      </div>


      <div v-else>
        <br />
        <br />
        <div class="alert alert-primary" role="alert">
          <p>Please click on a Item...</p>
        </div>

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
      item: [],
      categories: [],
      currentitem: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    //   retrieveitem() {
    //     itemService.getAll()
    //       .then(response => {
    //         this.item = response.data;
    //         console.log("cat: ",response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   },

    retrieveitem() {
      ItemService.getAll()
        .then(response => {
          this.item = response.data;
          console.log("item: ", response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveitem();
      this.currentitem = null;
      this.currentIndex = -1;
    },

    setActiveitem(item, index) {
      this.currentitem = item;
      this.currentIndex = item ? index : -1;
    },

    removeAllitem() {
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
          this.item = response.data;
          this.setActiveitem(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveitem();
    //   this.retrieveitem();
  }
};
</script>
  
<style></style>