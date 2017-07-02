<template>
    <div class="pageContent" v-bind:class="{'center-aligned' : centerAligned, 'with-background' : withBackground}">
        <div class="pageContentBody">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="stylus">
@import '~src/themes/app.variables.styl';

.center-aligned {    
    justify-content: center;
}

.pageContent {
    height: auto;
    min-height: 100%;
    display: flex;
    flex-direction:column;
    padding: 20px 0;
}

.pageContentBody {    
    display: flex;    
    justify-content: center;
}

.with-background {
    background-color: $page-content-bg-color;
}
</style>

<script>
export default {
    name: 'pageContent',
    props: {
        centerAligned: {
            type: Boolean
        },
        withBackground: {
            type: Boolean
        }
    }
}
</script>