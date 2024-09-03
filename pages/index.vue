<script setup lang="ts">
import type { IPost } from "~/server/models/post.schema";

const title = "SaveThis";
const description = "Save your favorite posts from bsky";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: "summary",
});

const limit = ref(50);
const skip = ref(0);
const posts = ref<IPost[]>([]);
const hasMore = ref(true);

const { data, status, refresh } = await useFetch<IPost[]>(
  () => `/api/post?limit=${limit.value}&skip=${skip.value}`,
  {
    immediate: false,
    watch: false,
    key: `posts-${skip.value}-${limit.value}`,
    retry: 5,
  }
);

watch(status, () => {
  if (status.value === "success") {
    const _data = data.value || [];
    posts.value = [...posts.value, ..._data].filter((post, index, self) => {
      return self.findIndex((p) => p.postKey === post.postKey) === index;
    });
    hasMore.value = _data.length === limit.value;
  }
});

onMounted(() => {
  refresh();
});

function fetchMore() {
  skip.value += limit.value;
  refresh();
}

function handlePostDelete(key: string) {
  posts.value = posts.value.filter((post) => post.postKey !== key);
}
</script>

<template>
  <Header />
  <main class="w-full flex py-10 items-center flex-col px-3">
    <div
      :class="{
        'opacity-100 pointer-events-auto': status === 'pending',
        'opacity-0 pointer-events-none': status === 'success',
      }"
      class="transition-all z-50 inset-0 absolute bg-black/50 flex items-center justify-center"
    >
      <div
        class="animate-spin size-10 border-2 border-[theme('colors.blue.500')_transparent_transparent_theme('colors.blue.500')] rounded-full"
      />
    </div>

    <template v-if="!!posts.length">
      <TransitionGroup
        name="list"
        tag="div"
        class="flex flex-col gap-3 w-full items-center"
      >
        <Post
          v-for="post in posts"
          :key="post.postKey"
          :post="post"
          @delete="handlePostDelete"
        />
      </TransitionGroup>
      <button
        v-if="hasMore"
        @click="fetchMore()"
        class="h-10 px-3 rounded flex items-center justify-center font-medium bg-blue-500"
      >
        Fetch more
      </button>
      <Script
        v-if="status === 'success'"
        async
        src="https://embed.bsky.app/static/embed.js"
        charset="utf-8"
      ></Script>
    </template>
    <template v-else-if="status === 'success'">
      <PostsEmptyState />
    </template>
  </main>
</template>

<style>
.bluesky-embed {
  background-color: #292524;
  border-radius: 4px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.list-leave-active {
  position: absolute;
}
</style>
