import { defineStore } from "pinia";

export const useLoading = defineStore("useLoading", () => {
  const loadingStatus = useState("loadingStatus", () => false);

  const on = () => {
    loadingStatus.value = true;
  };

  const off = () => {
    loadingStatus.value = false;
  };

  return {
    loadingStatus,
    on,
    off,
  };
});
