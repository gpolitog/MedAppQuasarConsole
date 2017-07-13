<template>
    <div class="pageContent" :class="{'center-aligned' : centerAligned}">
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
    height: 100%;
    overflow-y:scroll;
    display: flex;
    flex-direction:column;
    padding: 20px 0;
}

.pageContentBody {    
    display: flex;    
    justify-content: center;
}
</style>

<script>
export default {
    name: 'pageContent',
    props: {
        centerAligned: {
            type: Boolean
        }
    }
}
</script>