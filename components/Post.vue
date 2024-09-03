<script setup lang="ts">
import type { IPost } from "~/server/models/post.schema";

const isDeleting = ref(false);

defineProps<{
  post: IPost;
}>();

const emit = defineEmits<{
  (e: "delete", key: string): void;
}>();

async function deletePost(key: string) {
  try {
    isDeleting.value = true;
    await $fetch(`/api/post`, {
      method: "DELETE",
      query: {
        key,
      },
    });
    emit("delete", key);
  } catch (error) {
    console.error(error);
    alert("Something went wrong :(");
  } finally {
    isDeleting.value = false;
  }
}
</script>

<template>
  <div
    :class="{
      'animate-pulse': isDeleting,
      'animate-pulse has-[iframe]:animate-none': !isDeleting,
    }"
    class="flex flex-col justify-center items-center max-w-[600px] min-w-[300px] w-full relative"
  >
    <div
      class="bluesky-embed"
      :data-bluesky-uri="post.uri"
      :data-bluesky-cid="post.cid"
    />
    <div class="flex w-full items-center justify-end">
      <Button
        @click="deletePost(post.postKey)"
        :disabled="isDeleting"
        class="md:absolute md:-right-11 md:top-2"
        variant="danger"
        square
      >
        <IconsBookmarkRemove :size="18" />
      </Button>
    </div>
  </div>
</template>
