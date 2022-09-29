<template>
  <div>
    <!-- <button @click="getHTML">Get HTML</button>  -->
    <label class="cursor-pointer border p-2 mb-2" for="insert-image"
      >이미지 삽입
    </label>
    <input
      class="w-0 h-0 border-0"
      type="file"
      accept="image/*"
      id="insert-image"
      @change="inertImage"
    />

    <!-- <button @click="renderPreview">미리보기</button> | -->
    <!-- <button @click="isLoading = !isLoading">로딩변경</button> -->
    <div class="relative mt-3">
      <div ref="tostRef"></div>
      <div
        v-show="isLoading"
        class="z-[1000] absolute inset-0 bg-black opacity-40 flex justify-center items-center"
      >
        <p class="text-white text-[2rem]">Loading ...</p>
      </div>
    </div>
    <!-- 미리보기  -->

    <div class="preview" v-if="preview">
      <div class="content">
        <!-- 헤더 -->
        <div class="flex justify-between px-2 pb-4">
          <p class="text-center w-full">미리보기 입니다.</p>
          <button class="border px-2 text-right" @click="preview = null">
            X
          </button>
        </div>
        <!-- 랜더 -->
        <div v-html="preview"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Editor from "@toast-ui/editor";
import { defineComponent, onMounted, ref } from "vue";
import { getImageURLByFormData } from "@/api/file";

export default defineComponent({
  setup(_) {
    const tostRef = ref();
    const { $setToastEditor } = useNuxtApp();
    let control: Editor;
    const preview = ref();
    let imageUrlLists = [];

    const isLoading = ref<boolean>(false);

    const getHTML = () => {
      console.log(control.getMarkdown().toString().length);
      console.log(control.getHTML());

      return control.getHTML();
    };

    const inertImage = async (e: any) => {
      const file: File = e.target.files[0];

      const url = await uploadImage(file);

      control.changeMode("markdown");
      control.insertText(`![image](${url})`);
      control.changeMode("wysiwyg");
    };

    const uploadImageUrlLists = () => {
      return imageUrlLists;
    };

    const uploadImage = async (file: File) => {
      // const formData = new FormData();
      // formData.append("file", file, file.name);

      // 백엔드 이미지 올리고 주소 얻기
      isLoading.value = true;
      const url = await getImageURLByFormData(file);
      imageUrlLists.push(url);
      isLoading.value = false;
      return url;
    };

    const renderPreview = () => {
      preview.value = control.getHTML();
    };

    onMounted(() => {
      control = $setToastEditor(tostRef.value);

      control.removeHook("addImageBlobHook");
      control.addHook("addImageBlobHook", async (file: File, callback) => {
        const url = await uploadImage(file);

        if (url) {
          imageUrlLists.push(url);
          callback(url, file.name);
        }
      });
    });

    return {
      tostRef,
      getHTML,
      renderPreview,
      preview,
      inertImage,
      uploadImageUrlLists,
      isLoading,
    };
  },
});
</script>

<style lang="scss">
.preview {
  z-index: 1001;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba($color: #000000, $alpha: 0.4);

  .content {
    width: 40rem;
    height: 95%;
    border-radius: 1rem;
    padding: 1rem;

    overflow-y: auto;
    background: white;
    text-align: center;
    margin: 0.5rem auto;

    img {
      margin: 0 auto;
    }
  }
}
</style>
