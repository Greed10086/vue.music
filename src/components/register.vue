<template>
    <div class="container">
        <!-- register -->
        <div class="form-container sign-up-container">
            <div class="form">
                <h2>注册</h2>
                <form method="POST">
                    <div class="form-group">
                        <label for="exampleInputEmail1">用户名</label>
                        <input title="密码" type="text" class="form-control" name="username" placeholder="Username...">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">密码</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name="password"
                            placeholder="Password...">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">确认密码</label>
                        <input title="确认密码" type="password" class="form-control" name="password_confirm"
                            placeholder="Password...">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">邮箱</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            name="email" placeholder="Email...">
                        <small id="emailHelp" class="form-text text-muted">我们不会把邮箱用于其他用户</small>
                    </div>
                    <div class="form-group" style="width: 200%;">
                        <label for="exampleInputEmail1">验证码</label>
                        <div class="input-group">
                            <input title="验证码" type="text" style="    width: 50%;" class="form-control" name="captcha">
                            <div class="input-group-append" style="    width: 50%;    padding-left: 7%;">
                                <button type="button" id="captcha-btn" style="background: #999999;">验证码</button>
                            </div>
                        </div>
                    </div>
                    <button type="submit">立即注册</button>
                </form>

            </div>
        </div>
    </div>
    <!-- <div class="row mt-4">
        <div class="col"></div>
        <div class="col">
            <form method="POST">
                <div class="form-group">
                    <label for="exampleInputEmail1">邮箱</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        name="email">
                    <small id="emailHelp" class="form-text text-muted">我们不会把邮箱用于其他用户</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">验证码</label>
                    <div class="input-group">
                        <input title="验证码" type="text" class="form-control" name="captcha">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" id="captcha-btn">获取验证码</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">用户名</label>
                    <input title="密码" type="text" class="form-control" name="username">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">密码</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name="password">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">确认密码</label>
                    <input title="确认密码" type="password" class="form-control" name="password_confirm">
                </div>
                <button type="submit" class="btn btn-primary btn-block">立即注册</button>
            </form>
        </div>
        <div class="col"></div>
    </div> -->
</template>
<script>
export default {
    name: 'register',
    mounted() {
        // import register_js from './assets/js/register.js'
        function bindEmailCaptchaClick() {
            $("#captcha-btn").click(function (event) {
                // $this：代表的是当前按钮的jquery对象
                var $this = $(this);
                // 阻止默认的事件
                event.preventDefault();

                var email = $("input[name='email']").val();
                $.ajax({
                    // http://127.0.0.1:500
                    // /auth/captcha/email?email=xx@qq.com
                    url: "/auth/captcha/email?email=" + email,
                    method: "GET",
                    success: function (result) {
                        var code = result['code'];
                        if (code == 200) {
                            var countdown = 5;
                            // 开始倒计时之前，就取消按钮的点击事件
                            $this.off("click");
                            var timer = setInterval(function () {
                                $this.text(countdown);
                                countdown -= 1;
                                // 倒计时结束的时候执行
                                if (countdown <= 0) {
                                    // 清掉定时器
                                    clearInterval(timer);
                                    // 将按钮的文字重新修改回来
                                    $this.text("获取验证码");
                                    // 重新绑定点击事件
                                    bindEmailCaptchaClick();
                                }
                            }, 1000);
                            // alert("邮箱验证码发送成功！");
                        } else {
                            alert(result['message']);
                        }
                    },
                    fail: function (error) {
                        console.log(error);
                    }
                })
            });
        }


        // 整个网页都加载完毕后再执行的
        $(function () {
            bindEmailCaptchaClick();
        });
    }
}
</script>
<style lang="css" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f6f5f7;
}

h2 {
    margin-bottom: 10px;
    font-size: 32px;
    text-transform: capitalize;
}

.container {
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
    position: relative;
    width: 768px;
    margin-top: 30.712px;
    margin-left: 379.8px;
    height: 580px;
    /* background-color: white; */
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
}

.form-container {
    position: absolute;
    margin-left: 20%;
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
    top: 0;
    width: 50%;
    height: 100%;
    /* background-color: white; */
    transition: all 0.6s ease-in-out;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 50px;
}

input {
    width: 100%;
    margin: 8px 0;
    padding: 12px;
    background-color: #eee;
    border: none;
}


button {
    background: #58a8b8;
    ;
    ;
    padding: 10px 50px;
    border: 1px solid transparent;
    border-radius: 20px;
    text-transform: uppercase;
    color: white;
    margin-top: 10px;
    outline: none;
    transition: transform 80;
}

button:active {
    transform: scale(0.95);
}
</style>