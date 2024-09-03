<script setup lang="ts">
import Link from "./Link.vue";
</script>

<template>
  <header
    class="grid grid-cols-2 items-center gap-3 bg-stone-900 border-b border-stone-700 text-white p-3 sticky top-0 left-0 right-0 z-10"
  >
    <div class="flex flex-col items-start justify-self-start">
      <h1 class="text-4xl font-bold">SaveThis</h1>
      <p class="text-sm">
        by
        <a href="https://github.com/vitouwu" class="text-primary underline">
          vitoo
        </a>
      </p>
    </div>
    <Link class="justify-self-end" href="/logout" variant="primary">
      Logout
    </Link>
  </header>
</template>
