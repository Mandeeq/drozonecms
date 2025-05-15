<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["open"]);
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: "md", // can be '', 'modal-sm', 'modal-lg', or 'modal-xl'
    },
    variant: {
        type: String,
        default: "", // can be '', 'modal-sm', 'modal-lg', or 'modal-xl'
    },
});

const open = () => {
    emit("open");
};
</script>
<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Vue Dataset</h3>
        <button type="button" :class="['btn', `btn-${variant}`]" data-bs-toggle="modal"
            data-bs-target="#modal-block-fromleft" @click="open">
            {{ title }}

        </button>
    </div>
</template>