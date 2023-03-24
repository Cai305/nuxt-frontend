import { createWebHistory, createRouter } from "vue-router";

import AddCategory from '@/components/AddCategory.vue';
import CategoryList from '@/components/CategoryList.vue';
import EditCategory from '@/components/EditCategory.vue';
import AddItem from '@/components/AddItem.vue';
import ItemList from '@/components/ItemList.vue';
import Item from '@/components/Item.vue';


const routes =  [
  {
    path: "",
    alias: "/category",
    name: "category",
    component: CategoryList
  },
  {
    path: "/category",
    alias: "/category",
    name: "category",
    component: CategoryList
  },
  {
    path: "/category/:id",
    name: "edi-category-details",
    component: EditCategory
  },
  {
    path: "/addCat",
    name: "addCat",
    component: AddCategory
  },

  // items
  {
    path: "/items",
    alias: "/items",
    name: "item",
    component: ItemList
  },
  {
    path: "/items/:id",
    name: "items-details",
    component: Item
  },
  {
    path: "/additem",
    name:"additem",
    component: AddItem
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;