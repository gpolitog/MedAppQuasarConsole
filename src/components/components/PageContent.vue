<template>
    <div class="pageContent">
        <slot></slot>
    </div>
</template>

<style scoped>
.pageContent {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script>
export default {
    name: 'pageContent'
}
</script>