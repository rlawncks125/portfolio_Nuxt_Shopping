<template>
  <div class="over-star-wrap" :style="overStarWrap">
    <div :style="overBinStarWrap">
      <p
        class="cursor-pointer"
        v-for="index in starNum * 2"
        :key="index"
        :style="overBinStar"
        @mouseover="starEvent(index)"
      >
        ☆
      </p>
    </div>

    <div :style="overFillStarWrap" ref="overFillRef">
      <p
        class="cursor-pointer"
        v-for="index in starNum * 2"
        :key="index"
        :style="overFillStar"
        @mouseover="starEvent(index)"
        @click.prevent="onClickStartEvent(index)"
      >
        ★
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HTMLAttributes, StyleValue, CSSProperties } from "vue";

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

const emits = defineEmits(["clickStar"]);

const { fill, starSize, starNum } = toRefs(props);
const starWidth = starSize.value * starNum.value;
const isSelected = ref(false);
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

const overFillRef = useState<HTMLElement>("overFillRef");
const starEvent = (index: number) => {
  if (isSelected.value === true) return;
  const fillStartWidth = starWidth * (index / (starNum.value * 2));
  // overFillStarWrap.width = `${fillStartWidth}rem`;

  overFillRef.value.style.width = `${fillStartWidth}rem`;
};
const onClickStartEvent = (index: number) => {
  isSelected.value = !isSelected.value;
  const fillStartWidth = starWidth * (index / (starNum.value * 2));
  // overFillStarWrap.width = `${fillStartWidth}rem`;
  overFillRef.value.style.width = `${fillStartWidth}rem`;
  if (isSelected.value === true) {
    emits("clickStar", index / 2);
  }
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
</style>
