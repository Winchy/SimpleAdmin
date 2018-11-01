<template>
    <div class='page-container'>
        <header>
            <h1 class='page-title'>Simple Admin</h1>
        </header>
        <nav class='main-nav'>
            <a v-on:click.prevent='path = "/"' href='./'>home</a>
            <a v-on:click.prevent='path = "/version"' href='./versions'>versions</a>
            <a v-on:click.prevent='path = "/deploy"' href='./deploy'>deploy</a>
        </nav>
        <div class='content'>
            <component v-bind:is='currentPage' v-bind:project='currentProject' @show-version='showVersion'></component>
            <!---
            <project-list v-if='path == "/"'></project-list> 
            <version-control v-if='path == "/version"'></version-control> 
            <deploy-comp v-if='path == "/deploy"'></deploy-comp> 
            -->
        </div>
    </div>
</template>
<script type='text/javascript'>

import project_list from './project_list.vue'
import version_control from './version_control.vue'
import deploy from './deploy.vue'

export default {
    components: {
        projectList: project_list,
        versionControl: version_control,
        deployComp: deploy,
        currentProject: {}
    },
    data: function() {
        return {
            path: '/',
            currentPage: 'projectList',
            routes: {
                '/': 'projectList',
                '/version': 'versionControl',
                '/deploy': 'deployComp'
            }
        };
    },
    computed:{
    },
    watch: {
        path: function() {
            console.log(this.path);
            this.currentPage = this.routes[this.path];
        }
    },
    mounted: function() {
        console.log(this, $);
    },
    methods: {
        showVersion: function(e) {
            this.currentProject = e;
            this.path = '/version';
        }
    }
}
</script>
