<template>
  <div v-show="$props.isShow">
    <div
      class="absolute z-[10001] inset-0 bg-slate-500 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-blue-400 rounded-md text-white p-4">
        <slot />
        <div class="flex items-end gap-2  my-[1rem]">
          <!-- 로딩 원 -->
          <div
            class="relative  animate-spin pointer-events-none "
            :style="
              $props.size
                ? { width: `${$props.size}rem`, height: `${$props.size}rem` }
                : { width: '5rem', height: '5rem' }
            "
          >
            <div ref="progressBody" class="absolute left-0 top-0"></div>
            <div ref="progressLine" class="absolute left-0 top-0"></div>
          </div>
          <span class="loading-conent">Loading</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgressBar from "progressbar.js";

defineProps({
  size: Number,
  isShow: Boolean,
});

const progressBody = useState<HTMLElement>("progressBody");
const progressLine = useState<HTMLElement>("progressLine");

onMounted(() => {
  new ProgressBar.Circle(progressBody.value, {
    strokeWidth: 6,
    color: "rgb(226 237 255 / 50%)",
  }).set(1);
  new ProgressBar.Circle(progressLine.value, {
    strokeWidth: 6,
    color: "rgb(255 170 16 / 50%)",
  }).set(0.25);
});
</script>

<style lang="scss">
.loading-conent {
  &::after {
    display: inline-block;
    content: "";
    width: 1rem;
    animation: conent-dot 2s infinite;
  }
}

@keyframes conent-dot {
  0% {
    content: "";
  }
  25% {
    content: ".";
  }
  40% {
    content: "..";
  }
  60% {
    content: "...";
  }
  80% {
    content: "..";
  }
  100% {
    content: ".";
  }
}
</style>
