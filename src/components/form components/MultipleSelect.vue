<template>
  <div
    class="form-field mb-3"
    ref="field"
    @mousedown="mouseDown"
    style="position: absolute"
    @click="openSetting"
  >
    <div class="form-container d-flex align-items-center" ref="box">
      <label class="fw-bold d-block m-0 w-50">{{ state.labelText }} </label>
      <select
        :name="state.name"
        :id="state.name"
        :placeholder="state.placeholder"
        multiple
        class="form-control"
      >
        <option
          v-for="(op, index) in state.options"
          :key="index"
          :value="state.values[index]"
        >
          {{ op }}
        </option>
      </select>

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

      <label>Options</label>
      <textarea
        class="w-100"
        @change="
          (e) => {
            state.options = e.target.value.split(/\r?\n/);
            state.options = state.options.filter((v) => v.trim() != '');
          }
        "
      >
      </textarea>
      <label>Values</label>
      <textarea
        name=""
        id=""
        class="w-100"
        @input="
          (e) => {
            state.values = e.target.value.split(/\r?\n/);
            state.values = state.values.filter((v) => v.trim() != '');
          }
        "
      ></textarea>

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
    const box = ref(null);
    const field = ref(null);

    const state = reactive({
      formItem: computed(() => store.state.formItem),
      name: "multipleSelectInput",
      placeholder: "placeholder",
      labelText: "Multiple Select",

      required: false,

      options: ["option 1", "option 2"],
      values: [1, 2],
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
      if (e.target.classList.contains("form-container")) {
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
      box,
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
  .form-container {
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
