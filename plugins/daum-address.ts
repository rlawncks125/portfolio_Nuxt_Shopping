interface completeData {
  address: string;
  zonecode: string;
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      daumAddress: (complate: (data: completeData) => void) => {
        // @ts-ignore
        new daum.Postcode({
          oncomplete: function(data: completeData) {
            complate(data);
            // infoForm.addr = data.address;
            // infoForm.postcode = data.zonecode;

            // console.log(data);
          },
        }).open();
      },
    },
  };
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $daumAddress(complate: (data: completeData) => void): void;
  }
}
