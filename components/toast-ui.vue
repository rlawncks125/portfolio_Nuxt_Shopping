<template>
  <div>
    <button @click="getHTML">Get HTML</button> |
    <label class="cursor-pointer" for="insert-image">이미지 삽입 </label>
    <input class="w-[0px]" type="file" id="insert-image" @change="inertImage" />
    |
    <button @click="renderPreview">미리보기</button>
    <div ref="tostRef"></div>
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
  setup() {
    const tostRef = ref();
    const { $setToastEditor } = useNuxtApp();
    let control: Editor;
    const preview = ref();

    const getHTML = () => {
      console.log(control.getHTML());
    };

    const inertImage = async (e: any) => {
      const file: File = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file, file.name);

      // 백엔드 이미지 올리고 주소 얻기
      const url = await getImageURLByFormData(formData);

      control.changeMode("markdown");
      control.insertText(`![image](${url})`);
      control.changeMode("wysiwyg");
    };

    const renderPreview = () => {
      preview.value = control.getHTML();
    };

    onMounted(() => {
      control = $setToastEditor(tostRef.value);
    });

    return { tostRef, getHTML, renderPreview, preview, inertImage };
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
