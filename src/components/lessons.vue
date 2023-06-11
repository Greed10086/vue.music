<template>
    <button class="menu-toggle" id="toggle-sidebar"></button>
    <span style="left: 80px;top: 71px;position: absolute;"> ⬅ </span>
    <p style="left: 111px;top: 71px;position: absolute;">此处有侧边栏</p>
    <div id="sidebar">
        <br />
        <hr />
        <a class="aa" href="/#/lesson_1/test1">
            <h6>第一节—音域自测</h6>
        </a>
        <hr />
        <a class="aa" href="/#/lesson_1/test2">
            <h6>第二节—C、D、E调</h6>
        </a>
        <hr />
        <a class="aa" href="/#/lesson_1/test3">
            <h6>第三节—C、D、E调进阶</h6>
        </a>
    </div>

    <div class="lunbo">
        <div class="content isSelected">
            <h2 class="title">{{ title }}</h2>
            <ul id="item">
                <li class="item active">
                    <a href="/lesson_1/test1" style="padding: 0;"><img src="../assets/test1.png"></a>
                </li>
                <li class="item">
                    <a href="/lesson_1/test2" style="padding: 0;"><img src="../assets/test2.png"></a>
                </li>
                <li class="item">
                    <a href="/lesson_1/test3" style="padding: 0;"><img src="../assets/test3.png"></a>
                </li>
            </ul>
            <ul id="circle">
                <li class="circle white"></li>
                <li class="circle"></li>
                <li class="circle"></li>
            </ul>
        </div>
    </div>
    <div style="display: flex; justify-content: center;width: 1536px;">
        <div id="btn-left" class="arrow-left"></div>
        <router-link class="btn-grad isSelected" :to="this.id">进入章节</router-link>
        <div id="btn-right" class="arrow-right"></div>
    </div>
    <!-- <div class="container" style="width: 90%">

        <h3 style="font-family: 'STKaiti', serif;"> 课程列表 </h3>

        <ul class="collapsible collection with-header">
            <li style="font-family: 'STKaiti', sans-serif;" class="collection-header">
                <h4>初级
                    <RouterLink to="/lesson_1/test1">开始演唱
                        <i class="material-icons right">music_note</i>
                    </RouterLink>
                </h4>
                <p>学习基本音阶，为你的声乐技巧打下良好的基础。</p>
            </li>
            <li>
                <div class="collection-item collapsible-header"><i class="locked material-icons">expand_more</i>第 1 课</div>
                <div class="collapsible-body"><span>
                        从掌握 C D E 音符开始。
                        这是任何歌手学习的前三个音符。 <br>
                        在任何情况下，哼唱 C D E 音符都会成为其他音符的基础。
                       -- <span id="lesson1-score" class="score-beg" style="font-family:'STKaiti',sans-serif;float:right;color:lightslategray;font-size:20;">0/6</span> --
                        <span id="lesson1-score" class="new badge" data-badge-caption=""></span>
                    </span></div>
            </li>

            <li>
                <div class="collection-item collapsible-header" style="color:lightgrey;"><i
                        class="locked material-icons">lock_outline</i>第 2 课</div>
                <div class="collapsible-body"></div>
            </li>
            <li>
                <div class="collection-item collapsible-header" style="color:lightgrey;"><i
                        class="locked material-icons">lock_outline</i>第 3 课</div>
                <div class="collapsible-body"><span></span></div>
            </li>
            <li>
                <div class="collection-item collapsible-header" style="color:lightgrey;"><i
                        class="locked material-icons">lock_outline</i>练习与复习</div>
                <div class="collapsible-body"><span></span></div>
            </li>
            <li>
                <div class="collection-item collapsible-header"><i class="locked material-icons">star_border</i>考试
                    {% if user %}
                    <RouterLink to="/test_1/instruction">参加考试
                    </RouterLink>

                    {% else %}

                    <input type="button" onclick="notuser()" value="参加考试"
                        style="border-width: 0px;font-size: 14px;height: 36px;padding: 0 16px;position: absolute;margin-top: 0.85rem;margin-left: 100px;background-color: #e8eaf6 !important" />
                    {% endif %}
                </div>
                <div class="collapsible-body"><span></span>对你在上面学到的课程进行测试。音符将随机创建</div>
            </li>
        </ul>

    </div> -->
</template>
<script>
import { onBeforeUnmount } from 'vue'
export default {
    name: 'lessons',
    data() {
        return {
            // count: 0,
            id: "/lesson_1/test1",
            title: "第一节——音域自测"
        }
    },
    methods: {
        // count() {
        //     this.count++;
        //     console.log(count);
        // }
    },
    mounted() {
        var that = this;


        const toggleSidebarBtn = document.getElementById('toggle-sidebar');
        const sidebar = document.getElementById('sidebar');

        toggleSidebarBtn.addEventListener('click', () => {
            toggleSidebarBtn.classList.toggle('is-active');
            sidebar.classList.toggle('show');
        });


        var items = document.getElementsByClassName("item");
        var circles = document.getElementsByClassName("circle");
        var leftBtn = document.getElementById("btn-left");
        var rightBtn = document.getElementById("btn-right");
        var content = document.querySelector('.content');
        var index = 0;
        var timer = null;
        //清除class
        var clearclass = function () {
            for (let i = 0; i < items.length; i++) {
                items[i].className = "item";
                circles[i].className = "circle";
                circles[i].setAttribute("num", i);
            }
        }
        /*只显示一个class*/
        function move() {
            clearclass();
            console.log(index);
            that.id = "/lesson_1/test" + (index + 1);
            switch (index + 1) {
                case 1:
                    that.title = "第一节—音域自测";
                    break;
                case 2:
                    that.title = "第二节—C、D、E调";
                    break;
                case 3:
                    that.title = "第三节—C、D、E调进阶";
                    break;
                default:
                    break;
            }
            items[index].className = "item active";
            circles[index].className = "circle white";
        }
        //点击右边按钮切换下一张图片
        rightBtn.onclick = function () {
            clearInterval(timer);
            timer = setInterval(function () {
                if (index < items.length - 1) {
                    index++;
                }
                else {
                    index = 0;
                }
                move();
            }, 8000)
            if (index < items.length - 1) {
                index++;
            }
            else {
                index = 0;
            }
            move();
        }
        //点击左边按钮切换上一张图片
        leftBtn.onclick = function () {
            clearInterval(timer);
            timer = setInterval(function () {
                if (index < items.length - 1) {
                    index++;
                }
                else {
                    index = 0;
                }
                move();
            }, 8000)
            if (index > 0) {
                index--;
            }
            else {
                index = items.length - 1;
            }
            move();
        }
        //开始定时器，点击右边按钮，实现轮播
        timer = setInterval(function () {
            if (index < items.length - 1) {
                index++;
            }
            else {
                index = 0;
            }
            move();
        }, 8000)
        //点击圆点时，跳转到对应图片
        for (var j = 0; j < circles.length; j++) {
            // clearInterval(timer);
            // timer = setInterval(function () {
            //     if (index < items.length - 1) {
            //         index++;
            //     }
            //     else {
            //         index = 0;
            //     }
            //     move();
            // }, 8000)
            circles[j].addEventListener("click", function () {
                var point_index = this.getAttribute("num");
                index = point_index;
                move();
            })

        }
        //鼠标移入清除定时器，并开启一个三秒的定时器，使慢慢转动
        content.onmouseover = function () {
            clearInterval(timer);
            timer = setInterval(function () {
                if (index < items.length - 1) {
                    index++;
                }
                else {
                    index = 0;
                }
                move();
            }, 8000)
        }
        //鼠标移出又开启定时器
        content.onmouseleave = function () {
            clearInterval(timer);
            timer = setInterval(function () {
                if (index < items.length - 1) {
                    index++;
                }
                else {
                    index = 0;
                }
                move();
            }, 8000)
        }

        // import formatting from './assets/js/formatting.js'
        // window.onload = function () {
        // document.addEventListener('DOMContentLoaded', function () {
        //     var elems = document.querySelectorAll('.collapsible');
        //     var instances = M.Collapsible.init(elems);
        // });
        // function lesson_1_score() {
        //     var score1 = parseInt(localStorage.getItem('#test1-score')) || 0
        //     var score2 = parseInt(localStorage.getItem('#test4-score')) || 0
        //     var score3 = parseInt(localStorage.getItem('#test5-score')) || 0
        //     return score1 + score2 + score3;
        // }
        // document.addEventListener("DOMContentLoaded", function () {
        //     document.getElementById("lesson1-score").textContent = `${lesson_1_score()}/18`
        // });
        onBeforeUnmount(() => {
            clearInterval(timer);

        })
    }

}
// }
</script>
<style lang="css">
.aa {
    color: black;
    text-decoration: none;
}

.title {
    margin-bottom: 15px;
    text-align: center;
}

.menu-toggle {
    border-top: 4px;
    border-color: #0d93aec4;
    background-color: #ccc0;
    border-bottom: 4px solid #0d93aec4;
    border-left: 0;
    border-right: 0;
    border-style: solid;
    display: block;
    width: 40px;
    height: 24px;
    position: relative;
    cursor: pointer;
}

.menu-toggle:before,
.menu-toggle:after {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    background-color: #0d93aec4;
    position: absolute;
    left: 0;
    transition: transform 0.3s ease-out;
}

.menu-toggle:before {
    top: 7px;
}

.menu-toggle:after {
    bottom: 5px;
}

.is-active {
    border-bottom: 4px;
    border-top: 4px;
}

.is-active:before {
    transform: translateY(5px) rotate(40deg);
}

.is-active:after {
    transform: translateY(-5px) rotate(-40deg);
}


#sidebar {
    position: absolute;
    left: -250px;
    width: 250px;
    height: 500px;
    background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    transition: all 0.3s ease-in-out;
    /* 添加过渡效果以平滑切换 */
}

#sidebar.show {
    left: 0;
    /* 显示侧边栏 */
}

#toggle-sidebar {
    position: absolute;
    top: 70px;
    left: 0px;
    z-index: 99;
}

button:focus {
    outline: none;
    background-color: #ccc0;
}

* {
    margin: 0;
    padding: 0;
}

a {
    list-style: none;
}

li {
    list-style: none;
}

.lunbo {
    width: 1536px;
    margin-top: 91.15px;
    height: 358px;
}

.content {
    width: 500px;
    height: 320px;
    margin: 20px auto;
    position: relative;
}

#item {
    width: 100%;
    height: 100%;

}

.item {
    position: absolute;
    opacity: 0;
    transition: all 0.5s;

}

.item.active {
    opacity: 1;
}

img {
    width: 100%;
}

#btn-left {
    padding-top: 50px;
    padding-left: 10px;
    z-index: 10;
    transform: translateY(-60%);
}


#btn-right {
    padding-top: 50px;
    z-index: 10;
    transform: translateY(-60%);
}

#circle {
    height: 20px;
    display: flex;
    position: absolute;
    bottom: -35px;
    right: 222px;
}

.circle {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    border: 2px solid white;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    margin: 5px;
}

.white {
    background-color: #FFFFFF;
}

.btn-grad {
    display: inline-block;
    text-decoration: none;
    background-image: linear-gradient(to right, #30E8BF 0%, #FF8235 51%, #30E8BF 100%);
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
}

.btn-grad:hover {
    background-position: right center;
    /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}

.arrow-left {
    width: 90px;
    height: 59px;
    /* margin: 300px auto; */
    display: inline-flex;
}

.arrow-left::before,
.arrow-left:after {
    content: "";
    width: 40px;
    height: 40px;
    background-color: transparent;
    /* 模块背景为透明 */
    border-color: #26a69a96;
    border-style: solid;
    border-width: 6px 6px 0 0;
    transform: rotate(225deg);
}

.arrow-right {
    width: 90px;
    height: 59px;
    /* margin: 300px auto; */
    display: inline-flex;
}

.arrow-right::before,
.arrow-right:after {
    content: "";
    width: 40px;
    height: 40px;
    background-color: transparent;
    /* 模块背景为透明 */
    border-color: #26a69a96;
    border-style: solid;
    border-width: 6px 6px 0 0;
    transform: rotate(45deg);
}

.isSelected {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
