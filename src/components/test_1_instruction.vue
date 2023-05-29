
<template>
    <h2></h2>

    <div class="container" style="width: 90%">
        <RouterLink to="/lessons"><i class="material-icons" style="vertical-align: top">keyboard_arrow_left</i>返回课程列表
        </RouterLink>

        <h4 style="font-family: 'STKaiti', serif;">测试1 </h4>


        <div class="row">
            <div class="col s12">
                <ul class="tabs tabs-fixed-width">
                    <li class="tab col s3">
                        <RouterLink to="/test_1/instruction" class="active">介绍</RouterLink>
                    </li>
                    <li id="test-tab" class="tab col s3 disabled">
                        <RouterLink to="/test_1/test">测试</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div id="instructions" class="col s12" style="display:block;">
            <h1></h1>
            是时候进行你的第一次测试了！测试方式与你的练习课程相同。 <br>
            您将需要获得至少80%的分数，才能进入下一个模块。但是不要害怕，你可以随意尝试很多次测试。<br>
            注：每次你尝试这个测试时，你都会收到不同的音符旋律。
            <h1></h1>
            <RouterLink to="/test_1/test" id="test-button"
                class="waves-effect waves-light btn-flat btn-large indigo lighten-5 test-button">进入测试</RouterLink>
        </div>
    </div>
</template>
<script>
export default {
    name: 'test_1_instruction',
    mounted() {
        document.getElementById('test-button').onclick = () => {
            console.log("going to test");
            // Enable the test tab
            var tab = document.getElementById("test-tab");
            tab.classList.remove('disabled');

            // Change tabs and update indicator
            var el = document.querySelector('.tabs');
            var instance = M.Tabs.init(el, {});
            instance.select('test')

            //document.getElementById("test1").style.display = "block";
            //  document.getElementById("instructions").style.display = "none";
        }
    }
}
</script>