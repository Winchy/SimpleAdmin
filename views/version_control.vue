<template>
<div>
    <div class='proj-info-container'>
        <header><h3>{{project.name}}</h3><button class='btn-new-version'>创建新版本</button></header>
        <div class='open-version'>
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
    <div class='history-versions'>
        <ul class='ul-history-versions'>
            <li v-for='version in historyVersions'>
                <span>{{version.version}}&nbsp&nbsp&nbsp&nbsp{{version.createTime}}</span>
                <span>{{version.status}}</span>
            </li>
        </ul>
    </div>
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
            openVersion: {
                version: '1.2.0',
                createTime: '2018/11/01',
                branchUrl: 'svn://172.30.128.254/miniprograms/dashilar/branches/v1.2.0',
                status: 'open'
            },
            historyVersions: [
                {
                    version: '1.1.0',
                    createTime: '2018/11/01',
                    branchUrl: 'svn://172.30.128.254/miniprograms/dashilar/branches/v1.1.0',
                    status: 'closed'
                },
                {
                    version: '1.1.1',
                    createTime: '2018/11/01',
                    branchUrl: 'svn://172.30.128.254/miniprograms/dashilar/branches/v1.1.1',
                    status: 'colsed'
                },
            ]
        };
    },
    mounted: function() {
        console.log('Version control page mounted');
        console.log(this.project);
    },
    methods: {
    }
}
</script>
