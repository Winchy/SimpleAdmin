<template>
    <div>
        <a v-on:click.prevent='path = "/"' href='./'>home</a>
        <a v-on:click.prevent='path = "/version"' href='./versions'>versions</a>
        <a v-on:click.prevent='path = "/deploy"' href='./deploy'>deploy</a>
        <component v-bind:is='viewComponent'></component> 
    </div>
</template>
<script type='text/javascript'>

import project_list from './project_list.vue'
import version_control from './version_control.vue'
import deploy from './deploy.vue'

var routes = {
    '/': project_list,
    '/version': version_control,
    '/deploy': deploy
} 

export default {
    components: {
        
    },
    data: function() {
        return {
            path: '/',
            routes
        };
    },
    computed:{
        view: function() {
            return this.path + '.vue';
        },
        viewComponent: function() {
            return this.routes[this.path];
        }
    },
    watch: {
        path: function(newPath) {
            console.log(this.path);
        }
    },
    mounted: function() {
    },
    methods: {
        goto: function(path) {
            console.log(path);
            this.path = 'path';
        }
    }
}
</script>
