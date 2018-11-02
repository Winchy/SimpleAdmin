<template>
<div>
    <ul class='ul-project'>
        <li class='head-column'>
            <span>项目列表</span>
            <button @click='showCreateForm = true'>[&nbsp+&nbsp]</button>
        </li>
        <li class='project-item' @click='$emit("show-version", proj)' v-for='proj in projects'>
            <span>{{proj.name}}</span>
            <button @click.stop='deleteProject(proj.name)'>[&nbsp-&nbsp]</button>
        </li>
    </ul>

    <transition name='fade'>
    <div class='popup-container project-form-container' v-if='showCreateForm'>
        <form class='popup-content' id='project-form' @submit.prevent='createProject'>
                <ul class='ul-form'>
                    <li>
                        <span>项目名</span><input v-model='projectName'></input>
                    </li>
                </ul>
            <div>
                <span>本地配置</span>
                <ul class='ul-form'>
                    <li>
                        <span>资源根目录</span><input v-model='localRes'></input>
                    </li>
                    <li>
                        <span>脚本svn地址</span><input v-model='svnRoot'></input>
                    </li>
                    <li>
                        <span>脚本根目录</span><input v-model='localScripts'></input>
                    </li>
                </ul>
            </div>
            <div>
                <span>服务器配置</span>
                <ul class='ul-form'>
                    <li>
                        <span>开发版资源根目录</span><input v-model='devRes'></input>
                    </li>
                    <li>
                        <span>开发版脚本根目录</span><input v-model='devScripts'></input>
                    </li>
                    <li>
                        <span>生产版资源根目录</span><input v-model='productRes'></input>
                    </li>
                    <li>
                        <span>生产版脚本根目录</span><input v-model='productScripts'></input>
                    </li>
                </ul>
            </div>
            <div class='form-button-container'>
                <button type='button' @click='showCreateForm = false'>取消</button>
                <button type='submit'>创建</button>
            </div>
        </form>
    </div>
    </transition>
</div>
</template>

<style scoped>

.add-project-panel {
    float: right;
}

.ul-project {
    list-style: none;
    width: 500px;
    border: 1px solid #EEE;
    border-radius: 5px;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.ul-project span, .ul-project button {
    display: block;
}

.head-column, .project-item {
    display: flex;
    justify-content: space-between;
    height: 25px;
    line-height: 25px;
    padding: 10px;
    font-size: 14px;
}

.project-item {
    border-top: 1px solid #EEE;
}

.project-item>button {
    display: none;
}

.project-item:hover {
    background-color: #fcfdf8;
}

.project-item:hover>button {
    display: block;
}

#project-form {
    width: 500px;
}

</style>


<script>
export default {
    data: function() {
        return {
            projects: [],
            showCreateForm: false,
            localRes: '',
            localRcripts: '',
            devRes: '',
            devScripts: '',
            productRes: '',
            productScripts: '',
            projectName: '',
            svnRoot: '',
        };
    },
    mounted: function() {
        this.getProjects();
    },
    methods: {
        getProjects: function() {
            $.get('/simple_admin/rest/projects').then( data => {
                this.projects = data;
            })
        },
        createProject: function() {
            var params = {
                name: this.projectName,
                svnRoot: this.svnRoot,
            };
            
            for (var k in params) {
                if (params[k] == '') {
                    alert(`${k} is needed`);
                    return;
                }
            }

            $.post('/simple_admin/rest/projects/create', params, res => {
                console.log(res);
                this.getProjects();
                this.showCreateForm = false;
            }); 
        },
        deleteProject: function(projName) {
            console.log('about to delete project ' + projName);

            var r = window.confirm(`确定删除工程${projName}?`);
            if (!r) return;
            $.post('/simple_admin/rest/projects/delete', {projectName: projName}).then((result) => {
                this.getProjects();
            });
        }
    }
}
</script>
