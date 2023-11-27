<template>
  <div
    class="form-field d-flex align-items-center mb-5"
    data-type="selectMultiple"

    draggable="true"
    @dragstart="dragStart"
    @dragover.stop
  >
    <label class="fw-bold d-block m-0 w-25"> Select Multiple </label>
    <select name="selectName" id="" class="form-control" multiple>
      <option value="1">Option one</option>
      <option value="2">Option two</option>
      <option value="3">Option three</option>
    </select>
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
