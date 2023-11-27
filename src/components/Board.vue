<template>
  <form
    class="form-board"
    @dragover.prevent
    @drop.prevent="drop"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
    @submit.prevent
    ref="form"
  >
    <div v-for="item in state.formFields" :key="item.dataset.uniqueId">
      <div v-if="item.dataset.type == 'text'">
        <Text />
      </div>
      <div v-if="item.dataset.type == 'email'">
        <Email />
      </div>
      <div v-if="item.dataset.type == 'password'">
        <Password />
      </div>
      <div v-if="item.dataset.type == 'textArea'">
        <TextArea />
      </div>
      <div v-if="item.dataset.type == 'checkbox'">
        <Checkboxes />
      </div>
      <div v-if="item.dataset.type == 'radio'">
        <Radios />
      </div>
      <div v-if="item.dataset.type == 'select'">
        <Select />
      </div>
      <div v-if="item.dataset.type == 'selectMultiple'">
        <MultipleSelect />
      </div>
      <div v-if="item.dataset.type == 'upload'">
        <UploadButton />
      </div>
      <div v-if="item.dataset.type == 'button'">
        <SingleButton />
      </div>
      <div v-if="item.dataset.type == 'doubleButton'">
        <DoubleButtons />
      </div>
    </div>
    <slot />
  </form>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import Text from "@/components/form components/Text.vue";
import Email from "@/components/form components/Email.vue";
import Password from "@/components/form components/Password.vue";
import TextArea from "@/components/form components/TextArea.vue";
import Checkboxes from "./form components/Checkboxes.vue";
import Radios from "./form components/Radios.vue";
import Select from "./form components/Select.vue";
import MultipleSelect from "./form components/MultipleSelect.vue";
import SingleButton from "./form components/SingleButton.vue";
import UploadButton from "./form components/UploadButton.vue";
import DoubleButtons from "./form components/DoubleButtons.vue";
export default {
  components: {
    Text,
    TextArea,
    Email,
    Password,
    Checkboxes,
    Radios,
    Select,
    MultipleSelect,
    SingleButton,
    UploadButton,
    DoubleButtons,
  },
  setup() {
    const store = useStore();

    const form = ref(null);

    const state = reactive({
      formItem: computed(() => store.state.formItem),
      isDragOver: false,
      formFields: [],
    });

    const drop = (e) => {
      if (state.isDragOver) {
        const clonedItem = state.formItem.cloneNode(true);
        const uniqueId = Date.now().toString(); // Generate a unique identifier
        clonedItem.dataset.itemId = uniqueId;
        state.formFields.push(clonedItem);
      }
    };

    window.addEventListener("dragover", (e) => e.preventDefault());
    window.addEventListener("drop", (e) => {
      if (
        e.target != form.value &&
        state.formItem.parentNode.parentNode.parentNode == form.value
      ) {
        state.formItem.parentNode.parentNode.remove();
        store.dispatch("editFormItem", null);
      } else if (
        e.target == form.value &&
        state.formItem.parentNode.parentNode.parentNode == form.value
      ) {
        e.target.appendChild(state.formItem);
      }
    });

    const dragEnter = () => {
      state.isDragOver = true;
      form.value.style.borderColor = "#4caf50";
    };
    const dragLeave = (e) => {
      state.isDragOver = false;
      form.value.style.borderColor = "#777";
    };
    return { drop, dragEnter, dragLeave, form, state };
  },
};
</script>

<style lang="scss">
form {
  min-height: 85vh;
  padding: 50px;
  width: 100%;
  border: 1px solid #777;
  border-radius: 5px;
  &.drag-over {
    border-color: #4caf50 !important;
  }
}
</style>
