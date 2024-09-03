<script lang="ts" setup>
import Link from "~/components/Link.vue";

const show2FAModal = ref(false);

async function handleSubmit(e: Event) {
  const data = new FormData(e.currentTarget as HTMLFormElement);
  const body = {
    handle: `${data.get("handle")}`,
    password: `${data.get("password")}`,
    code: data.get("code")?.toString(),
  };

  try {
    await $fetch<string | Record<string, string>>("/api/auth", {
      method: "POST",
      body: JSON.stringify(body),
      onResponseError(error) {
        if (
          error.response._data?.message ===
          "A sign in code has been sent to your email address"
        ) {
          show2FAModal.value = true;
        } else {
          alert(error.response._data?.message);
          show2FAModal.value = false;
        }
      },
    });

    navigateTo("/");
  } catch (error) {
    if (error instanceof Error) {
      console.log({ message: error.message, error });
    } else {
      console.error({ error });
    }
  }
}
</script>

<template>
  <main
    class="w-full h-screen flex flex-col gap-5 justify-center items-center px-3"
  >
    <h1 class="text-center">
      <span class="text-5xl font-bold">Authenticate</span><br />
      <span class="text-lg font-medium">
        with
        <span
          class="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent font-bold"
        >
          bsky
        </span>
        credentials
      </span>
    </h1>
    <form
      @submit.prevent="handleSubmit"
      class="flex justify-normal items-center flex-col gap-3 max-w-[300px] w-full overflow-x-clip px-2 relative"
    >
      <div
        :class="{ 'translate-x-[calc(100%+20px)]': show2FAModal }"
        class="flex justify-normal items-center flex-col gap-3 max-w-[300px] w-full transition-all"
      >
        <Input
          name="handle"
          type="text"
          placeholder="yourhandle.bsky.social"
          variant="primary"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          variant="primary"
          required
        />
        <p class="text-xs text-stone-400">
          Is highly recommended to use "App Passwords" instead of your current
          bsky password.
          <Link
            href="https://bsky.app/profile/safety.bsky.app/post/3k7waehomo52m"
            class="underline inline-flex p-0 h-auto text-xs"
            variant="primary"
            ghost
          >
            See more
          </Link>
        </p>
      </div>
      <div
        :class="{
          'right-0': show2FAModal,
          '-right-[calc(100%+20px)]': !show2FAModal,
        }"
        class="flex justify-normal items-center flex-col gap-3 max-w-[300px] w-full absolute top-0 transition-all px-2"
      >
        <p class="text-sm text-stone-400">
          An authentication code has been sent to your email address
        </p>
        <Input
          autocomplete="off"
          name="code"
          type="text"
          :disabled="!show2FAModal"
          :required="show2FAModal"
          placeholder="XXXX-XXXX"
          variant="primary"
        />
      </div>
      <Button variant="primary" class="w-full mt-5"> Authenticate </Button>
    </form>
  </main>
</template>
