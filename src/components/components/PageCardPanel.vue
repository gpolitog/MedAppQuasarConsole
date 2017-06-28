<template>
    <div class="height-90 sm-width-4of5 md-width-4of5 gt-md-width-4of5">
        <div class="card">
            <div class="card-content bg-light">
                <div class="row card-header">
                    <slot name="left-header"></slot>
                    <slot name="right-header"></slot>
                </div>
    
                <div class="card-body">
                    <slot name="body"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="stylus">
@import '~src/themes/app.variables.styl';
.height-90 {
    height: 80vh;
}

.card {
    height: 100%;
}

.card-content {
    height: 100%;
}

.card-header {
    justify-content: space-between;
    align-content: center;
    align-items: center;
    border-bottom: 1px solid black;
    font-size: $page-card-panel-header;
}

.card-body {
    margin: 10px;
}
</style>

<script>
export default {
    name: 'pageCardPanel'
}
</script>