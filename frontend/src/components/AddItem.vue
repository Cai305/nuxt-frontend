<template>
    <div class="submit-form">

        <div v-if="!submitted">


            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="title">Slug</label>
                        <input type="text" class="form-control" id="slug" required v-model="item.slug" name="slug" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="creator">creator</label>
                        <input class="form-control" id="creator" required v-model="item.creator" name="path" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="path">content</label>
                        <input class="form-control" id="content" required v-model="item.content" name="content" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="path">type</label>
                        <input class="form-control" id="type" required v-model="item.type" name="type" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="path">src</label>
                        <input class="form-control" id="src" required v-model="item.src" name="src" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="path">extension</label>
                        <input class="form-control" id="extension" required v-model="item.extension" name="extension" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="path">text</label>
                        <input class="form-control" id="text" required v-model="item.text" name="text" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="path">quality</label>
                        <input class="form-control" id="quality" required v-model="item.quality" name="quality" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="path">size</label>
                        <input class="form-control" id="size" required v-model="item.size" name="size" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="path">size</label>
                        <input class="form-control" id="size" required v-model="item.size" name="size" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="path">size_unit</label>
                        <input class="form-control" id="size_unit" required v-model="item.size_unit" name="size_unit" />
                    </div>
                </div>
            </div>

            <button @click="saveMedia" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:">
                    <use xlink:href="#check-circle-fill" />
                </svg>
                <div>
                    <h4>You submitted successfully!</h4>
                </div>
            </div>

            <button class="btn btn-success" @click="newItem">Add</button>
        </div>
    </div>
</template>
  
<script>
import ContentService from "../services/ContentService";
import MediaService from "../services/MediaService";
import ItemService from "../services/ItemService";

export default {
    name: "additem",
    data() {
        return {

            item: {
                item_type: '',
                slug: '',
                creator: '',
                content: '',
                categories: '',
                type: '',
                src: '',
                extension: '',
                text: '',
                quality: '',
                size: '',
                size_unit: '',
            },

            submitted: false,
            localeId: '',
        };
    },
    methods: {


        saveMedia() {
            var media = {
                type: this.item.type,
                src: this.item.src
            }
            MediaService.create(media)
                .then(response => {
                    this.saveContent(response.data.src, response.data._id);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        saveContent(src, mediaId) {
            var content = {
                src: src,
                extension: this.item.extension,
                text: this.item.text,
                quality: this.item.quality,
                size: this.item.size,
                size_unit: this.item.size_unit,
            }
            ContentService.create(content)
                .then(response => {
                    this.saveItem(mediaId)
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        saveItem(mediaId) {
            var item = {
                item_type: this.item.type,
                slug: this.item.slug,
                locale: this.localeId,
                creator: this.item.creator,
                media: mediaId,
                content: this.item.content,
                categories: "fgthj"
            }

            console.log(item)
            ItemService.create(item)
                .then(response => {
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        newItem() {
            this.submitted = false;
            this.item = {};
        },
    },

    mounted() {
        this.localeId = this.$route.params.id;
    }
};
</script>
  
<style></style>