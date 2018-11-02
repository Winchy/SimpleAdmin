<template>
<div>
    <div class='proj-info-container'>
        <header><h3>{{project.name}}</h3><button class='btn-new-version' @click='createNewVersion'>创建新版本</button></header>
        <div v-if='openVersion' class='open-version'>
            <ul class='ul-open-version'>
                <li><span>版本号: </span><span>{{openVersion.version}}</span></li>
                <li><span>创建时间: </span><span>{{openVersion.createTime}}</span></li>
                <li><span>分支地址: </span><span>{{openVersion.branchUrl}}</span></li>
                <li><span>状态: </span><span>{{openVersion.status}}</span></li>
            </ul>
            <div class='open-version-actions'>
                <button>发布</button>
                <button>关闭</button>
            </div>
        </div>
    </div>
    <div v-if='historyVersions' class='history-versions'>
        <ul class='ul-history-versions'>
            <li v-for='version in historyVersions'>
                <span>{{version.version}}&nbsp&nbsp&nbsp&nbsp{{version.createTime}}</span>
                <span>{{version.status}}</span>
            </li>
        </ul>
    </div>

    <transition name='fade'>
    <div class='popup-container create-form-container' v-if='showCreateForm'>
        <form class='popup-content create-form' id='create-form' @submit.prevent='submitNewVersion'>
            <ul class='ul-form'>
                <li><span>版本号</span><input v-model='newVersion'></input></li>
            </ul>
            <div class='form-button-container'>
                <button type='button' @click='showCreateForm=false'>取消</button>
                <button type='submit'>创建</button>
            </div>
        </form>
    </div>
    </transition>
</div>
</template>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-new-version {
    display: block;
    height: 30px;
}

.open-version {
    background-color: #DDD;
    padding: 20px;
    font-size: 14px;
    line-height: 25px;
    margin-bottom: 30px;
}

.ul-open-version > li > span:first-child {
   display: inline-block;
   width: 70px; 
}

.open-version-actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.open-version-actions > button {
    display: block;
    margin-left: 20px;
}

.ul-history-versions {
    border: solid 1px #DDD;
    border-radius: 5px;
    overflow: hidden;
}

.ul-history-versions > li {
    display: flex;
    height: 25px;
    line-height: 25px;
    padding: 10px;
    justify-content: space-between;
    font-size: 14px;
}

.ul-history-versions>li:nth-child(even) {
    background-color: #fcfdf8;
}

.ul-history-versions>li>span {
    display: block;
}

</style>


<script>
export default {
    props: ['project'],
    data: function() {
        return {
            openVersion: null,
            historyVersions: null,
            showCreateForm: false
        };
    },
    mounted: function() {
        console.log(this.project);
        if (!this.project) return;

        this.getVersions();
    },
    methods: {
        getVersions: function() {
            $.get('/simple_admin/rest/versions', {projectName: this.project.name}).then( result=> {
                var historyVersions = [];
                result.forEach((version, i) => {
                    console.log(i, version);
                    if (version.status == 'open') this.openVersion = version;
                    else historyVersions.push(version); 
                }); 
                if (historyVersions.length > 0) this.historyVersions = historyVersions;
            console.log(this.openVersion, this.historyVersions);
            });
        },
        createNewVersion: function() {
            this.showCreateForm = true;
        },
        submitNewVersion: function() {
            if (!this.newVersion) {
                window.alert('输入版本号');
                return;
            }
            if (!this.openVersion || window.confirm('创建新版本将会关闭当前版本')) {
                console.log('about to submit new version ' + this.newVersion);
                $.post('/simple_admin/rest/versions/create', {version: this.openVersion? this.openVersion.version : '', newVersion: this.newVersion, project: this.project}).then( result => {
                    this.showCreateForm = false;
                    this.newVersion = '';
                    this.getVersions();
                });
            }
        }
    }
}
</script>
