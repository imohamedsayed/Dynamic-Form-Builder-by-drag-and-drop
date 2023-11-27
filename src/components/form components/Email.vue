<template>
  <div
    class="form-field d-flex align-items-center mb-3"
    draggable="true"
    @dragstart="dragStart"
    @dragover.stop
    @click="openSetting"
  >
    <label class="fw-bold d-block m-0 w-25">{{ state.labelText }} </label>
    <div class="input-container" ref="inputBox">
      <input
        type="email"
        :name="state.name"
        :id="state.name"
        :placeholder="state.placeholder"
        class="form-control"
        :required="state.required"
      />
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
    const inputBox = ref(null);

    const state = reactive({
      formItem: computed(() => store.state.formItem),
      name: "emailInput",
      placeholder: "placeholder",
      labelText: "Email Input",
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

    var x, w;
    function touchStart(e) {
      console.log("touchStarted");
      x = e.touches[0].clientX;

      w = box.value.clientWidth;
      state.openSettings = false;
    }
    function touchMove(e) {
      let mx = e.touches[0].clientX;

      let cx = mx - x;

      box.value.style.width = w + cx + "px";

      state.openSettings = false;
    }

    return {
      state,
      dragStart,
      closeSettings,
      openSetting,
      inputBox,
      touchStart,
      touchMove,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-field {
  position: relative;

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
  .input-container {
    resize: horizontal;
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
      cursor: ew-resize;
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
