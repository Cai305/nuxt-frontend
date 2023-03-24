<template>
  <div v-if="currentItem" class="container edit-form">
    <h4>Item</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentItem.title" />
      </div>
      <div class="form-group">
        <label for="Content">Content</label>
        <input type="text" class="form-control" id="Content" v-model="currentItem.content" />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentItem.published ? "Published" : "Pending" }}
      </div>
    </form>

    <div class="container text-center">


      <div class="row">
        <div class="col" v-if="currentItem.published">
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
          <button class="badge badge-danger mr-2 col" @click="deleteItem">
            Delete
          </button>
        </div>
        <div class="col">
          <button type="submit" class="badge badge-success col" @click="updateItem">
            Update
          </button>
        </div>
      </div>
    </div>

    <br />
    <br />
    <div v-if="message" class="alert alert-primary" role="alert">
  <p>{{ message }}</p>
</div>

  </div>

  <div v-else>
    <br />
    <br />
    <div class="alert alert-primary" role="alert">
      <p>Please click on a Item...</p>
    </div>
  </div>
</template>
  
<script>
import ItemService from "../services/ItemService";


export default {
  name: "edit-Item-details",
  data() {
    return {
      currentItem: null,
      message: ''
    };
  },
  methods: {
    //   getItem(id) {
    //     ItemService.get("641b42172234cde3eadeab4c")
    //       .then(response => {
    //         this.getitem(response.item) 
    //         this.currentItem = response.data;
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   },

    getItem(id) {
      ItemService.get(id)
        .then(response => {
          this.currentItem = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },


    updatePublished(status) {
      var data = {
        id: this.currentItem._id,
        title: this.currentItem.title,
        description: this.currentItem.description,
        published: status
      };

      ItemService.update(this.currentItem._id, data)
        .then(response => {
          console.log(response.data);
          this.currentItem.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateItem() {
      ItemService.update(this.currentItem._id, this.currentItem)
        .then(response => {
          console.log(response.data);
          this.message = 'The was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    async deleteItem() {
      await ItemService.delete(this.currentItem._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Item" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    //   this.getItem(this.$route.params.id);
    this.getItem(this.$route.params.id)
    console.log(this.$route.params.id)
  }
};
</script>
  
<style></style>

