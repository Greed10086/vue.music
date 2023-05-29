<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary"
        style="background-color: #f3f3f3cc;  height: 9vh; line-height: 9vh;">
        <div class="container-fluid">
            <img src="../assets/muses.png" alt="muses" style="width: 120px;margin: 0 20px;" height="24">
            <div class="collapse navbar-collapse" id="navbarSupportedContent" style="font-size: 21px;">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" style="padding: 0 10px;">
                        <router-link to="/" class="nav-link" aria-current="page">首页</router-link>
                    </li>
                    <li class="nav-item" style="padding: 0 10px;">
                        <router-link to="/lessons" class="nav-link">训练章节</router-link>
                    </li>
                    <li class="nav-item" style="padding: 0 10px;">
                        <router-link to="/vedio" class="nav-link">视频教学</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" style="margin-left: 600px;padding: 0px 10px;">
                        <router-link to="/login" class="nav-link" aria-current="page">登录</router-link>
                    </li>
                    <li class="nav-item" style="padding: 0 10px;">
                        <router-link to="/register" class="nav-link">注册</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: "navbar"
}
// 判断路由决定active
</script>
  
<style lang="css">
#ul1 {
    display: block;
    margin: 0;
    padding: 0;
    background-color: #444;
}

#li1 {
    display: inline-block;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 16px;
    text-decoration: none;
}

li a:hover {
    background-color: #888;
}


#div1 {
    align-items: flex-start;
}

.index-span {
    height: 35px;
}

.index-button {
    margin-bottom: 76px;
    margin-right: 25px;
}
</style>
<!-- <nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgb(56 182 142 / 47%)">
    <div class="container">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item ">
                    <router-link to="/">首页</router-link>&nbsp;
                </li>
                <li class="nav-item">
                    <router-link to="/lessons">训练课程</router-link>&nbsp;
                </li>
            </ul>
            <img title="muses" src="../assets/muses.png" class="brand-logo center" style="margin-top: 5px" /> -->
<!-- <ul class="navbar-nav">
                {% if user %}
                <li class="nav-item">
                                <span class="nav-link" id="nav-id">{{ user.username }}</span>
                            </li>
                <li class="nav-item">
                    <RouterLink to="/">退出登录</RouterLink>
                </li>
                {% else %}
                <li class="nav-item">
                    <RouterLink to="/login">登录</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/register">注册</RouterLink>
                </li>
                {% endif %}
            </ul>
        </div>
    </div>
</nav> -->