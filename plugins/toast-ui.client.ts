import Editor from "@toast-ui/editor";

import "@toast-ui/editor/dist/toastui-editor.css";
// 언어
import "@toast-ui/editor/dist/i18n/ko-kr";
// 색상
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      setToastEditor: (el: HTMLElement) => {
        const editorControl = new Editor({
          el,
          height: "500px",
          initialEditType: "wysiwyg",
          hideModeSwitch: true,
          previewStyle: "vertical",
          toolbarItems: [
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            // ["table", "image", "link"],
            // ["table", "link"],
            // ["code", "codeblock"],
            // ["scrollSync"],
          ],
          language: "ko-KR",
          plugins: [colorSyntax],
          autofocus: false,
        });
        editorControl.getMarkdown();

        return editorControl;
      },
    },
  };
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $setToastEditor(el: HTMLElement): Editor;
  }
}
