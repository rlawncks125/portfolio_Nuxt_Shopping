<template>
  <div class="over-star-wrap" :style="overStarWrap">
    <div :style="overBinStarWrap">
      <p v-for="index in starNum * 2" :key="index" :style="overBinStar">
        <span
          :style="{ fontSize: `${props.starSize}rem` }"
          class="star material-symbols-outlined"
          >star</span
        >
      </p>
    </div>

    <div :style="overFillStarWrap" ref="overFillRef">
      <p
        class="pointer-events-none"
        v-for="index in starNum * 2"
        :key="index"
        :style="overFillStar"
      >
        <span
          :style="{ fontSize: `${props.starSize}rem` }"
          class="star-fll material-symbols-outlined"
          >star</span
        >
      </p>
    </div>

    <!-- 이벤트 트리거 처리할 요소 -->
    <div :style="overBinStarWrap">
      <p
        class="cursor-pointer"
        v-for="index in starNum * 2"
        :key="index"
        :style="overBinStar"
        @click.prevent="onClickStartEvent(index)"
      >
        <span
          :style="{ fontSize: `${props.starSize}rem` }"
          class="star-fll material-symbols-outlined text-transparent"
          >star</span
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, toRefs, ref } from "vue";
const props = defineProps({
  starSize: {
    type: Number,
    default: 0,
  },
  starNum: {
    type: Number,
    default: 0,
  },
  fill: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["changeStar"]);
const { fill, starSize, starNum } = toRefs(props);

const starWidth = starSize.value * starNum.value;
const commonStarWrapStyle = {
  position: "absolute",
  display: "flex",
};
const commonStarFillStyle = {
  flex: `0 0 ${starSize.value * 0.5}rem`,
  margin: 0,
  overflow: "hidden",
  fontSize: `${starSize.value}rem`,
  top: `2px`,
  lineHeight: `normal`,
};
const overStarWrap = {
  width: `${starWidth * 1}rem`,
  position: "relative",
  height: `${starSize.value * 1.5}rem`,
  display: "flex",
  alignItems: "flex-start",
} as CSSProperties;
const overBinStarWrap = {
  width: `100%`,
  ...commonStarWrapStyle,
} as CSSProperties;
const overBinStar = {
  ...commonStarFillStyle,
};
const overFillStarWrap = {
  width: `${starWidth * (fill.value / starNum.value)}rem`,
  color: "gold",
  overflow: "hidden",
  ...commonStarWrapStyle,
} as CSSProperties;
const overFillStar = {
  ...commonStarFillStyle,
};
const overFillRef = ref<HTMLElement>();

const onClickStartEvent = (index: number) => {
  const fillStartWidth = starWidth * (index / (starNum.value * 2));
  // overFillStarWrap.width = `${fillStartWidth}rem`;
  overFillRef.value!.style.width = `${fillStartWidth}rem`;
  emits("changeStar", index / 2);
};
</script>

<style scoped lang="scss">
.over-star-wrap {
  & div {
    & p:nth-child(2n) {
      transform: scaleX(-1);
    }
  }
}
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
.star {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}
.star-fll {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
