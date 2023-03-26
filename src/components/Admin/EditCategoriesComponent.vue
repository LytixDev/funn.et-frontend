<template>
  <div class="category-content">
    <div class="category-header">
      <h1>{{ $t('Admin.categories') }}</h1>
      <div class="category-header-buttons">
        <form @submit.prevent="submit">
          <form-input
            labelId="name-label"
            :labelText="$t('Admin.name')"
            fieldId="name-label"
            v-model="name"
            :error="errors?.name"
            fieldRequired
            dataTestid="name" />

          <form-button
            buttonId="submit-category-button"
            class="attention"
            :buttonText="$t('Admin.add')"
            dataTestid="submit-category-button"
            :disabled="submitIsDisabled"
            @click="submit" />
        </form>
      </div>
    </div>
    <br />
    <div class="category-list">
      <div class="category-list-item" v-for="category in categories" :key="category.id">
        <div class="category-list-item-content">
          <div class="category-list-item-name">
            {{ category.name }}
          </div>
          <div class="category-list-item-remove" @click="deleteCategory(category)">
            <OhVueIcon name="md-delete-round" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CategoryControllerService, CategoryDTO, CategoryCreateDTO } from '@/api/backend';
import { ref, computed } from 'vue';
import FormButton from '@/components/Form/FormButton.vue';
import FormInput from '@/components/Form/FormInput.vue';
import { useForm, useField, FieldContext } from 'vee-validate';
import { object as yupObject, string as yupString } from 'yup';
import { useI18n } from 'vue-i18n';
import { MdDeleteRound } from 'oh-vue-icons/icons';
import { OhVueIcon, addIcons } from 'oh-vue-icons';

addIcons(MdDeleteRound);
const { t } = useI18n();
const categories = ref<CategoryDTO[]>([]);

CategoryControllerService.getAllCategories().then((response) => {
  categories.value = response;
});

const deleteCategory = (category: CategoryDTO) => {
  if (!confirm(t('Admin.confirm'))) return;
  CategoryControllerService.deleteCategory({ id: category.id }).then(() => {
    categories.value = categories.value.filter((c) => c.id !== category.id);
  });
};

/* form */
const schema = computed(() =>
  yupObject({
    name: yupString().required(t('Admin.Error.nameRequired')),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  const category: CategoryCreateDTO = {
    name: values.name,
  };
  CategoryControllerService.createCategory({ requestBody: category }).then((response) => {
    categories.value.push(response);
    name.value = '';
  });
});

const { value: name } = useField('name') as FieldContext<string>;
name.value = '';

const submitIsDisabled = computed(() => {
  return name.value.length < 1 || name.value in categories.value.map((c) => c.name);
});
</script>
<style scoped>
.category-list-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.category-list-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category-list-item-name {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.category-list-item-remove {
  cursor: pointer;
  scale: 2;
}
</style>
