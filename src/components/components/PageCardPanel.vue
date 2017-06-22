<template>
    <div class="height-90 sm-width-4of5 md-width-4of5 gt-md-width-4of5">
        <div class="card">
            <div class="card-content bg-light">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.height-90 {
    height: 90%;
}

.card {
    height: 100%;
}

.card-content {
    height: 100%;
}
</style>

<script>
export default {
    name: 'pageCardPanel'
}
</script>