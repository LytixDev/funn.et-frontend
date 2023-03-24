<template>
  <div class="category-content">
    <div class="category-header">
      <h1>Categories</h1>
      <div class="category-header-buttons">
        <button class="btn btn-primary" @click="addCategory">Add Category</button>
      </div>
    </div>
    <div class="category-list">
      <div class="category-list-item" v-for="category in categories" :key="category.id">
        <div class="category-list-item-name">
          {{ category.name }}
        </div>
        <div class="category-list-item-buttons">
          <button class="btn btn-primary" @click="editCategory(category)">Edit</button>
          <button class="btn btn-danger" @click="deleteCategory(category)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const addCategory = () => {
  console.log('addCategory');
};

const editCategory = (category: any) => {
  console.log('editCategory', category);
};

const deleteCategory = (category: any) => {
  console.log('deleteCategory', category);
};

const categories = [
  {
    id: 1,
    name: 'Category 1',
  },
  {
    id: 2,
    name: 'Category 2',
  },
  {
    id: 3,
    name: 'Category 3',
  },
];
</script>