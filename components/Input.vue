<script lang="ts" setup>
import { cn } from "~/utils/cn";

interface Props {
  variant?: "primary" | "danger";
}

const { variant = "primary" } = defineProps<Props>();

const classes = {
  primary: "input-primary",
  danger: "input-danger",
};
</script>

<template><input :class="cn('input', classes[variant])" /></template>
