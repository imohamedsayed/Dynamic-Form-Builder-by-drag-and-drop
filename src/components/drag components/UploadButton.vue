<template>
  <div
    class="form-field d-flex align-items-center mb-5"
    draggable="true"
    data-type="upload"
    @dragstart="dragStart"
    @dragover.stop
  >
    <label class="fw-bold d-block m-0 w-25"> File button </label>
    <input type="file" name="file" id="" class="form-control input-md" />
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const dragStart = (e) => {
      const target = e.target;
      store.dispatch("editFormItem", target);
    };

    return { dragStart };
  },
};
</script>

<style lang="scss">
.form-field {
  &:hover {
    cursor: move;
  }
  label {
    &:hover {
      cursor: move;
    }
  }
  input {
    &:focus {
      outline: none !important;
      border: none !important;
      text-shadow: none !important;
    }
    &:hover {
      cursor: move;
    }
  }
}
</style>
