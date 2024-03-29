import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
  faBan,
  faBacon,
  faMagnifyingGlass,
  faAlignJustify,
  faAngleUp,
  faAngleDown,
  faXmark,
  faCloudArrowDown,
  faCloudArrowUp,
  faExclamation,
  faMinus,
  faPlus,
  faEquals,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default defineNuxtPlugin((nuxtApp) => {
  config.autoAddCss = false;
  library.add(
    faBan,
    faBacon,
    faMagnifyingGlass,
    faAlignJustify,
    faAngleUp,
    faAngleDown,
    faXmark,
    faCloudArrowDown,
    faCloudArrowUp,
    faExclamation,
    faMinus,
    faPlus,
    faEquals,
    faBars
  );

  // @fortawesome/vue-fontawesome 버전을 3.x 으로 올리고
  // typescript 에러가 발생하여 ignore해줌
  // @ts-ignore
  nuxtApp.vueApp.component("font-awesome", FontAwesomeIcon);
});

export enum FaIconName {
  "ban",
  "bacon",
  "magnifying-glass",
  "align-justify",
  "angle-up",
  "angle-down",
  "xmark",
  "cloud-arrow-down",
  "cloud-arrow-up",
  "exclamation",
  "minus",
  "plus",
  "equals",
  "bars",
}

export enum FaIconSize {
  "2xs",
  "xs",
  "sm",
  "lg",
  "xl",
  "2xl",
  "1x",
  "2x",
  "3x",
  "4x",
  "5x",
  "6x",
  "7x",
  "8x",
  "9x",
  "10x",
}
