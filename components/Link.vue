<script lang="ts" setup>
import { cn } from "~/utils/cn";

interface Props {
  variant: "primary" | "danger";
  square?: boolean;
  ghost?: boolean;
}

const {
  variant = "primary",
  square = false,
  ghost = false,
} = defineProps<Props>();

const classes = {
  primary: "btn-primary",
  danger: "btn-danger",
};
</script>

<template>
  <a
    :class="
      cn('btn', classes[variant], square && 'btn-square', ghost && 'btn-ghost')
    "
  >
    <slot />
  </a>
</template>
