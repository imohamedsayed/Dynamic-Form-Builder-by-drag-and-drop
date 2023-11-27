<template>
  <div
    class="form-field d-flex align-items-center mb-3"
    draggable="true"
    @dragstart="dragStart"
    @dragover.stop
    @click="openSetting"
  >
    <label class="fw-bold d-block m-0 w-25">{{ state.labelText }} </label>
    <button :id="state.name" :class="'btn ' + `btn-${state.type} `">
      {{ state.buttonLabel }}
    </button>
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
import { computed, reactive } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

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
    return { state, dragStart, closeSettings, openSetting };
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
