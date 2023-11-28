<template>
  <div
    class="form-field d-flex align-items-center mb-3"
    ref="field"
    @mousedown="mouseDown"
    style="position: absolute"
    @click="openSetting"
  >
    <label class="fw-bold d-block m-0 w-25">{{ state.labelText }} </label>
    <div class="input-container" ref="inputBox">
      <textarea
        :name="state.name"
        :id="state.name"
        :placeholder="state.placeholder"
        class="form-control"
        :required="state.required"
      ></textarea>

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
      <label class="d-block">placeholder</label>
      <input
        class="form-control w-100 mb-4"
        type="text"
        v-model="state.placeholder"
      />

      <label
        ><input
          class="me-2"
          type="checkbox"
          v-model="state.required"
        />required</label
      >

      <div class="btn btn-danger w-100 mt-2" @click="remove">Remove</div>
      <div class="btn btn-dark d-block mx-auto mt-3" @click="closeSettings">
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
    const inputBox = ref(null);
    const field = ref(null);

    const state = reactive({
      formItem: computed(() => store.state.formItem),
      name: "textarea",
      placeholder: "placeholder",
      labelText: "Textarea",
      required: false,
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

    // Drag
    let offsetX, offsetY;

    const move = (e) => {
      field.value.style.left = `${e.clientX - offsetX}px`;
      field.value.style.top = `${e.clientY - offsetY}px`;
    };

    const mouseDown = (e) => {
      // initial offset values
      if (e.target.classList.contains("input-container")) {
        return;
      }
      offsetX = e.clientX - field.value.offsetLeft;
      offsetY = e.clientY - field.value.offsetTop;

      document.addEventListener("mousemove", move);
    };
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move);
    });

    const remove = (e) => {
      field.value.parentNode.parentNode.remove();
    };

    return {
      state,
      closeSettings,
      openSetting,
      inputBox,
      touchStart,
      touchMove,
      field,
      mouseDown,
      remove,
    };
  },
};
</script>
<style lang="scss" scoped>
.form-field {
  position: absolute;
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
  textarea {
    height: 100%;
  }
  .input-container {
    resize: both;
    overflow: hidden;
    position: relative;
    .resize-handler {
      position: absolute;
      height: 10px;
      width: 10px;
      border: 1px solid #000;

      right: 0px;
      bottom: 0px;
      border-top-left-radius: 100%;
      background: #777;
      cursor: nesw-resize;
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
