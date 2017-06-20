<template>
    <div class="pageContent">
        <div class="row content-container justify-center items-center">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.pageContent {
    height: 100%;
}

.content-container {
    height: 100%;
}
</style>

<script>
export default {
    name: 'pageContent'
}
</script>