<template>
    <div class="submit-form">

        <div v-if="!submitted">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="title">Slug</label>
                        <input type="text" class="form-control" id="slug" required v-model="category.slug" name="slug" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="path">path</label>
                        <input class="form-control" id="path" required v-model="category.path" name="path" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                <label for="path">parent_id</label>
                <input class="form-control" id="parent_id" required v-model="category.parent_id" name="parent_id" />
            </div>
                </div>
                <div class="col">
                    <div class="form-group">
                <label for="path">title</label>
                <input class="form-control" id="title" required v-model="category.title" name="title" />
            </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                <label for="path">description</label>
                <input class="form-control" id="description" required v-model="category.description" name="description" />
            </div>

                </div>
                <div class="col">
                    <div class="form-group">
                <label for="path">description</label>
                <input class="form-control" id="description" required v-model="category.description" name="description" />
            </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                <label for="path">summary</label>
                <input class="form-control" id="summary" required v-model="category.summary" name="summary" />
            </div>
                </div>
                <div class="col">
                    <div class="form-group">
                <label for="path">seo_title</label>
                <input class="form-control" id="seo_title" required v-model="category.seo_title" name="seo_title" />
            </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                <label for="path">seo_description</label>
                <input class="form-control" id="seo_description" required v-model="category.seo_description"
                    name="seo_description" />
            </div>
                </div>
                <div class="col">
                    <div class="form-group">
                <label for="path">ancestor_ids</label>
                <input class="form-control" id="ancestor_ids" required v-model="category.ancestor_ids"
                    name="ancestor_ids" />
            </div>
                </div>
            </div>

            <button @click="saveLocale" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newCategory">Add</button>
        </div>
    </div>
</template>
  
<script>
import CategoryService from "../services/CategoryService";
import LocaleService from "../services/LocaleService";

export default {
    name: "add-category",
    data() {
        return {
            category: {
                title: '',
                description: '',
                summary: '',
                parent_id: '',
                path: '',
                slug: '',
                seo_title: '',
                seo_description: '',
                seo_summary: '',
                ancestor_ids: '',
            },
            submitted: false
        };
    },
    methods: {


        saveLocale() {
            var locale = {
                title: this.category.title,
                description: this.category.description,
                summary: this.category.summary,
                seo_title: this.category.seo_title,
                seo_description: this.category.seo_description,
                seo_summary: this.category.seo_summary,
                use_seo_value: false
            }

            LocaleService.create(locale)
                .then(response => {
                    if (response.data._id) {

                        this.saveCategory(response.data._id)
                        data = { locale: response.data._id, }

                    }
                    // console.log(response.data);
                    // this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        saveCategory(locale) {

            var data = {
                slug: this.category.slug,
                path: this.category.path,
                ancestor_ids: ["DEAFA", "RRFF", "AEFEFA"],
                parent_id: this.category.parent_id,
                locale: locale,
                use_seo_value: false,
            };

            // console.log(data)

            CategoryService.create(data)
                .then(response => {
                    this.category.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
                console.log(response.data);
                    this.submitted = true;
        },

        newCategory() {
            this.submitted = false;
            this.category = {};
        }
    }
};
</script>
  
<style></style>