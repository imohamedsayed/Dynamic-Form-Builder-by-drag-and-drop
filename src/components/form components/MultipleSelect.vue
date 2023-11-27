<template>
  <div
    class="form-field d-flex align-items-center mb-3"
    draggable="true"
    @dragstart="dragStart"
    @dragover.stop
    @click="openSetting"
  >
    <label class="fw-bold d-block m-0 w-25">{{ state.labelText }} </label>
    <select
      :name="state.name"
      :id="state.name"
      :placeholder="state.placeholder"
      :class="'form-control' + ' ' + `w-${state.inputSize[state.size]}`"
      :required="state.required"
      multiple
    >
      <option
        v-for="(op, index) in state.options"
        :key="index"
        :value="state.values[index]"
      >
        {{ op }}
      </option>
    </select>
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
      <label class="me-4">Size</label>
      <select v-model="state.size">
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
        <option value="xLarge">xLarge</option>
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
      name: "multipleSelectInput",
      placeholder: "placeholder",
      labelText: "Multiple Select",
      inputSize: {
        small: "25",
        medium: "50",
        large: "75",
        xLarge: "100",
      },
      required: false,
      size: "large",
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
    width: 220px;
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
