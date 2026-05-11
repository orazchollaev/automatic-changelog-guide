<script lang="ts" setup>
const { data: page } = await useAsyncData("index", () => {
  return queryCollection("content").path("/").first()
})
</script>

<template>
  <div class="markdown-body">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
