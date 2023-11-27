<template>
  <div class="home">
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="inputs">
          <h4 class="mb-5">Drag & Drop components</h4>

          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="inputs-tab"
                data-bs-toggle="tab"
                data-bs-target="#inputs"
                type="button"
                role="tab"
                aria-controls="inputs"
                aria-selected="true"
              >
                Inputs
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="radioCheckboxes-tab"
                data-bs-toggle="tab"
                data-bs-target="#radioCheckboxes"
                type="button"
                role="tab"
                aria-controls="radioCheckboxes"
                aria-selected="false"
              >
                Radio / Checkboxes
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="select-tab"
                data-bs-toggle="tab"
                data-bs-target="#select"
                type="button"
                role="tab"
                aria-controls="select"
                aria-selected="false"
              >
                Select
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="buttons-tab"
                data-bs-toggle="tab"
                data-bs-target="#buttons"
                type="button"
                role="tab"
                aria-controls="buttons"
                aria-selected="false"
              >
                Buttons
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="html-tab"
                data-bs-toggle="tab"
                data-bs-target="#html"
                type="button"
                role="tab"
                aria-controls="html"
                aria-selected="false"
                @click="getHtmlCode"
              >
                View HTML Code
              </button>
            </li>
          </ul>
          <div class="tab-content mt-5" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="inputs"
              role="tabpanel"
              aria-labelledby="inputs-tab"
            >
              <TextInput />
              <EmailInput />
              <PasswordInput />
              <TextArea />
            </div>
            <div
              class="tab-pane fade"
              id="radioCheckboxes"
              role="tabpanel"
              aria-labelledby="radioCheckboxes-tab"
            >
              <Radios />
              <Checkboxes />
            </div>
            <div
              class="tab-pane fade"
              id="select"
              role="tabpanel"
              aria-labelledby="select-tab"
            >
              <Select />
              <SelectMultiple />
            </div>
            <div
              class="tab-pane fade"
              id="buttons"
              role="tabpanel"
              aria-labelledby="buttons-tab"
            >
              <UploadButton />
              <SingleButton />
              <DoubleButton />
            </div>

            <div
              class="tab-pane fade"
              id="html"
              role="tabpanel"
              aria-labelledby="buttons-tab"
            >
              <code>
                {{ html }}
              </code>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="board">
          <h4 class="bm-5">Your Dynamic Form</h4>
          <Board></Board>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "@/components/Board.vue";
import TextInput from "@/components/drag components/TextInput.vue";
import PasswordInput from "@/components/drag components/PasswordInput.vue";
import EmailInput from "@/components/drag components/EmailInput.vue";
import TextArea from "@/components/drag components/TextArea.vue";
import Radios from "@/components/drag components/Radios.vue";
import Checkboxes from "@/components/drag components/Checkboxes.vue";
import Select from "@/components/drag components/Select.vue";
import SelectMultiple from "@/components/drag components/SelectMultiple.vue";
import UploadButton from "@/components/drag components/UploadButton.vue";
import DoubleButton from "@/components/drag components/DoubleButton.vue";
import SingleButton from "@/components/drag components/SingleButton.vue";
export default {
  name: "HomeView",
  components: {
    Board,
    TextInput,
    PasswordInput,
    EmailInput,
    TextArea,
    Radios,
    Checkboxes,
    Select,
    SelectMultiple,
    UploadButton,
    SingleButton,
    DoubleButton,
  },
  data() {
    return {
      html: "",
    };
  },
  methods: {
    getHtmlCode() {
      const form = document.querySelector("form");
      const openedSettings = document.querySelectorAll(".settings");
      if (openedSettings.length) {
        openedSettings.forEach((setting) => {
          setting.remove();
        });
      }

      this.html = form.outerHTML.replaceAll("<!--v-if-->", "");
    },
  },
};
</script>
<style lang="scss">
.home {
  .inputs,
  .board {
    max-height: 100vh;
    padding: 40px;
    overflow-y: auto;
  }
  .cat-box {
    p {
      color: #111;
    }
    &.active {
      background: #111;
      color: #fff !important;
    }
  }
}
</style>
