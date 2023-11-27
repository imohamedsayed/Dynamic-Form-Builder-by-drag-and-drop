<template>
  <div
    class="form-field mb-5"
    data-type="checkbox"
    draggable="true"
    @dragstart="dragStart"
    @dragover.stop
  >
    <div class="form-group row">
      <label class="col-md-4 col-12 control-label">Multiple Checkboxes</label>
      <div class="col-md-4 col-12">
        <div class="radio">
          <label>
            <input type="checkbox" name="checkboxName" value="1" />
            option 1
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="checkbox" name="checkboxName" value="2" />
            option 2
          </label>
        </div>
      </div>
    </div>
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
