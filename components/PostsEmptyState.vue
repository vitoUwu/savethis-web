<script setup lang="ts">
import Link from "./Link.vue";
</script>

<template>
  <div
    class="max-w-sm fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
  >
    <div class="flex flex-col items-center justify-center text-center p-6">
      <div class="rounded-full bg-primary p-3">
        <IconsBookmark class="w-8 h-8 text-[--content]" />
      </div>
      <h2 class="text-2xl font-bold tracking-tight">No posts saved yet</h2>
      <p class="text-[--base-muted] mt-1">
        Start saving your favorite Bluesky posts for quick access later.
      </p>
      <Link href="https://bsky.app/" variant="primary" class="mt-5">
        Browse Bluesky
      </Link>
    </div>
  </div>
</template>
