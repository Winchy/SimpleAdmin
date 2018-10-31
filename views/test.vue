<template>
    <div>
        hi {{name}}
    </div>
</template>
<style scoped>
div {
    background-color: yellow;
}
</style>
<script>
export default {
    props: ['name'],
    data: function() {
        return {
        };
    },
    mounted: function() {
    },
    methods: {
    }
}
</script>
