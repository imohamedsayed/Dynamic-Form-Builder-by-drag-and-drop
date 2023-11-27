<template>
  <div
    class="form-field mb-3"
    draggable="true"
    @dragstart="dragStart"
    @dragover.stop
    @click="openSetting"
  >
    <div class="form-group row">
      <label class="col-md-4 col-12 control-label fw-bold">{{
        state.labelText
      }}</label>
      <div class="col-md-4 col-12">
        <div class="check" v-for="(op, index) in state.options" :key="index">
          <label>
            <input
              type="radio"
              :name="state.name"
              :value="state.values[index]"
            />
            {{ op }}
          </label>
        </div>
      </div>
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
        @change="
          (e) => {
            state.values = e.target.value.split(/\r?\n/);
            state.values = state.values.filter((v) => v.trim() != '');
          }
        "
      ></textarea>

      <div class="btn btn-danger d-block mx-auto mt-3" @click="closeSettings">
        close
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive } from "vue";

export default {
  setup() {
    const store = useStore();

    const state = reactive({
      formItem: computed(() => store.state.formItem),
      name: "radios",
      labelText: "Multiple Radios",
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

<style lang="scss">
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
    min-width: 220px;
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
