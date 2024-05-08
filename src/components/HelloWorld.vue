<script setup lang="ts">
    defineProps<{
        msg: string
    }>()
</script>

<template>
    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
        <h3>The project has successfully been created</h3>
    </div>
</template>
