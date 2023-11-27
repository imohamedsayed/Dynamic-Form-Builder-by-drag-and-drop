<template>
  <div
    class="form-field mb-3"
    draggable="true"
    @dragstart="dragStart"
    @dragover.stop
    @click="openSetting"
  >
    <div class="form-group d-flex align-items-center" ref="box">
      <label class="fw-bold d-block m-0 w-50">{{ state.labelText }} </label>
      <button :id="state.name" :class="'btn ' + `btn-${state.type} `">
        {{ state.buttonLabel }}
      </button>
      <div
        class="resize-handler"
        @touchstart.self="touchStart"
        @touchmove.self="touchMove"
      ></div>
    </div>
    <div class="settings" v-if="state.openSettings">
      <label class="d-block">ID / Name</label>
      <input class="form-control w-100 mb-4" type="text" v-model="state.name" />
      <label class="d-block">label Text</label>
      <input
        class="form-control w-100 mb-4"
        type="text"
        v-model="state.labelText"
      />
      <label class="d-block">Button Label</label>
      <input
        class="form-control w-100 mb-4"
        type="text"
        v-model="state.buttonLabel"
      />

      <label class="me-4">Color</label>
      <select v-model="state.type">
        <option value="small" selected>primary</option>
        <option value="secondary">secondary</option>
        <option value="dark">dark</option>
        <option value="info">info</option>
        <option value="danger">danger</option>
        <option value="success">success</option>
      </select>
      <div class="btn btn-danger d-block mx-auto mt-3" @click="closeSettings">
        close
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const box = ref(null);

    const state = reactive({
      formItem: computed(() => store.state.formItem),
      name: "fileInput",
      labelText: "Single Button",
      buttonLabel: "Button",
      type: "primary",
      openSettings: false,
    });

    const dragStart = (e) => {
      const target = e.target;
      store.dispatch("editFormItem", target);
    };
    const openSetting = () => {
      state.openSettings = true;
    };
    const closeSettings = (e) => {
      e.stopPropagation();
      state.openSettings = false;
    };
    var x, y, w;

    function touchStart(e) {
      console.log("touchStarted");
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      w = box.value.clientWidth;
      state.openSettings = false;
    }
    function touchMove(e) {
      let mx = e.touches[0].clientX;
      let my = e.touches[0].clientY;

      let cx = mx - x;
      let cy = my - y;

      box.value.style.width = box.value.clientWidth + cx + "px";
      box.value.style.height = box.value.clientHeight + cy + "px";

      state.openSettings = false;
    }

    return {
      state,
      dragStart,
      closeSettings,
      openSetting,
      box,
      touchStart,
      touchMove,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-field {
  position: relative;
  .form-group {
    resize: both;
    overflow: hidden;
    position: relative;
    .resize-handler {
      position: absolute;
      height: 10px;
      width: 12px;
      border: 1px solid #000;

      right: 0px;
      bottom: 0px;
      border-top-left-radius: 100%;
      background: #777;
      cursor: nwse-resize;
    }
  }

  &:hover {
    cursor: pointer !important;
  }
  label {
    &:hover {
      cursor: pointer !important;
    }
  }
  input {
    &:hover {
      cursor: pointer !important;
    }
  }

  .settings {
    position: absolute;
    background: #fff;
    padding: 10px;
    border: 1px solid #777;
    border-radius: 10px;
    bottom: 70%;
    left: -40px;
    transform: translateY(70%);
    z-index: 100;
  }
}
</style>
