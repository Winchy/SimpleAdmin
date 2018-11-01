<template>
<div>
    <div class='add-project-panel'>
        <button @click='showCreateForm = true'>create new project</button>
    </div>
    <ul class='ul-project'>
        <li @click='$emit("show-version", proj)' v-for='proj in projects'>
            {{proj.name}}
        </li>
    </ul>

    <transition name='form'>
    <div class='project-form-container' v-if='showCreateForm'>
        <form id='project-form' @submit.prevent='createProject'>
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
.form-enter-active, .form-leave-active {
    transition: opacity .5s;
}
.form-enter, .form-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.project-form-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
}

#project-form {
    display: block;
    position: absolute;
    width: 500px;
    background: #fff;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
}

.ul-form {
    list-style: none;
}

.ul-form li {
    margin: 10px 0;
}

.ul-form li span {
    display: inline-block;
    width: 160px;
    font-size: 14px;
}

#project-form input {
    border: none;
    border-bottom: 1px solid #DDD;
    height: 20px;
    width: 250px;
    padding: 5px;
}

.form-button-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.form-button-container button {
    display: block;
    margin-left: 20px;
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
            svnRoot: ''
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
                localRes: this.localRes,
                localScripts: this.localScripts,
                devRes: this.devRes,
                devScripts: this.devScripts,
                productRes: this.productRes,
                productScripts: this.productScripts
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
        }
    }
}
</script>
