<script lang="ts" setup>
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
    class="w-full h-screen flex flex-col gap-5 justify-center items-center bg-stone-950 text-white px-3"
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
      autocomplete="off"
      class="flex justify-normal items-center flex-col gap-3 max-w-[300px] w-full overflow-x-clip px-2 relative"
    >
      <div
        :class="{ 'translate-x-[calc(100%+20px)]': show2FAModal }"
        class="flex justify-normal items-center flex-col gap-3 max-w-[300px] w-full transition-all"
      >
        <input
          autocomplete="off"
          name="handle"
          type="text"
          placeholder="yourhandle.bsky.social"
          class="w-full px-3 h-10 rounded-md bg-transparent text-sm border-2 border-blue-500 ring-2 transition-all ring-transparent focus:ring-blue-500 ring-offset-[3px] outline-none ring-offset-stone-950 placeholder:text-stone-500 placeholder:font-medium"
        />
        <input
          autocomplete="off"
          name="password"
          type="password"
          placeholder="password"
          class="w-full px-3 h-10 rounded-md bg-transparent text-sm border-2 border-blue-500 ring-2 transition-all ring-transparent focus:ring-blue-500 ring-offset-[3px] outline-none ring-offset-stone-950 placeholder:text-stone-500 placeholder:font-medium"
        />
        <p class="text-xs text-stone-400">
          Is highly recommended to use "App Passwords" instead of your current
          bsky password.
          <a
            href="https://bsky.app/profile/safety.bsky.app/post/3k7waehomo52m"
            class="underline text-blue-500"
            >See more</a
          >
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
        <input
          autocomplete="off"
          name="code"
          type="text"
          :disabled="!show2FAModal"
          placeholder="XXXX-XXXX"
          class="w-full px-3 h-10 rounded-md bg-transparent text-sm border-2 border-blue-500 ring-2 transition-all ring-transparent focus:ring-blue-500 ring-offset-[3px] outline-none ring-offset-stone-950 placeholder:text-stone-500 placeholder:font-medium"
        />
      </div>
      <button
        class="h-10 px-3 rounded flex items-center justify-center font-medium bg-blue-500 w-full text-sm mt-5"
      >
        Authenticate
      </button>
    </form>
  </main>
</template>
