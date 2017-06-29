<template>
    <div class="sm-width-4of5 md-width-4of5 gt-md-width-4of5">
        <div class="card">
            <div class="card-content">
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

.card-content {
    background-color: white;
}
</style>

<script>
export default {
    name: 'pageCardPanel'
}
</script>