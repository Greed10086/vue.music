<template>
    <div id="test3" class="col s12">
        <h1></h1>
        <p style="font-family: 'STKaiti', sans-serif;">
            C 音符非常重要，是大本营。有人说，C 是音乐世界的中心。 <br>
            它是来往其他音符的参考点。
            本课将着重于调整你对 C 音符的感觉。在你开始在任何情况下唱歌之前，总是自言自语哼一个 C，很重要。<br>
            下面这个视频会教你怎么做。
        </p> <br>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/AQ7bJuW_PDk" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h1></h1>
        <RouterLink to="/lesson_1/test4" id="tabs-button-3"
            class="waves-effect waves-light btn-flat btn-large indigo lighten-5 switch-tab-btn">
            进入练习
            <i class="next-icon material-icons">navigate_next</i>
        </RouterLink>
    </div>
</template>
<script>
export default {
    name: 'vedio2',
    mounted() {
        var el = document.querySelector('.tabs');
        var instance = M.Tabs.init(el, {});

        // document.getElementById("tabs-button-1").onclick = () => {
        //     document.getElementById('tab2').classList.remove("disabled")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.select('tab2');
        //     instance.updateTabIndicator();
        // }
        // document.getElementById("tabs-button-2").onclick = () => {
        //     document.getElementById('tab3').classList.remove("disabled")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.select('tab3');
        //     instance.updateTabIndicator();
        // }
        // document.getElementById("tabs-button-3").onclick = () => {
        //     document.getElementById('tab4').classList.remove("disabled")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.select('tab4');
        //     instance.updateTabIndicator();
        // }
        // document.getElementById("tabs-button-4").onclick = () => {
        //     document.getElementById('tab5').classList.remove("disabled")
        //     var el = document.querySelector('.tabs');
        //     var instance = M.Tabs.init(el, {});
        //     instance.select('tab5');
        //     instance.updateTabIndicator();
        // }
    }
}
</script>