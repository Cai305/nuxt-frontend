<template>
  <div v-if="currentItem" class="container edit-form">
    <h4>Items</h4>
    <form>
      <div class="form-group">
        <label for="creator">Creator</label>
        <input type="text" class="form-control" id="creator" v-model="currentItem.creator" />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <input type="content" class="form-control" id="content" v-model="currentItem.title" />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentItem.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2" v-if="currentItem.published" @click="updatePublished(false)">
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2" @click="updatePublished(true)">
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteItem">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateItem">
      Update
    </button>

        <br />
        <br />
    <div v-if="message" class="alert alert-primary" role="alert">
     {{ message }}
    </div>
  </div>

  <div v-else>
    <br />
    <div class="alert alert-primary" role="alert">
      <p>Please click on a Item...</p>
    </div>
  </div>
</template>
  
<script>

import ItemService from "../services/ItemService";

export default {
  name: "item",
  data() {
    return {
      currentItem: null,
      message: ''
    };
  },
  methods: {
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
        creator: this.currentItem.creator,
        content: this.currentItem.content,
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
          this.message = 'The item was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteItem() {
      ItemService.delete(this.currentItem._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "item" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getItem(this.$route.params.id);
  }
};
</script>
  
<style></style>