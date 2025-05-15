<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md", // can be '', 'modal-sm', 'modal-lg', or 'modal-xl'
  },
});

const close = () => {
  emit("close");
};
</script>

<template>
  <div
    class="modal "
    id="modal-block-normal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-title"
    aria-hidden="false"
    style="display: block; background-color: rgba(0, 0, 0, 0.5);"
  >
    <div :class="['modal-dialog', props.size]" role="document">
      <div class="modal-content p-0">
        <BaseBlock :title="title" transparent class="mb-0">
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              aria-label="Close"
              @click="close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>
        </BaseBlock>
        <slot/>
      </div>
    </div>
  </div>
</template>

