<template>
    <div id="test2" class="col s12">
        <h1></h1>
        <p style="font-family: 'STKaiti', sans-serif;">
            在我们开始唱歌之前，需要了解我们的呼吸模式和姿势。<br><br><br>
            <iframe width="660" height="385" src="https://www.youtube.com/embed/4-CYJRmZn48" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </p>
        <h1></h1>

        <RouterLink to="/lesson_1/test3" id="tabs-button-2"
            class="waves-effect waves-light btn-flat btn-large indigo lighten-5 switch-tab-btn">
            下一步
            <i class="next-icon material-icons">navigate_next</i>
        </RouterLink>
    </div>
</template>
<script>
export default {
    name: 'video1',
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