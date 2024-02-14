<template>
    <div class="container">

        <!-- login -->
        <div class="form-container sign-in-container">
            <div class="form">
                <h2>登录</h2>
                <input type="email" name="emal" id="email" placeholder="Email...">
                <input type="password" name="password" id="password" placeholder="Password...">
                <br />
                <button class="signIn">登录</button>
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
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">密码</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">立即登录</button>
                </div>
            </form>
        </div>
        <div class="col"></div>
</div> -->
</template>
<script>
export default {
    name: 'login'
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
    margin-left: 25%;
    margin-top: 5%;
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
    position: relative;
    width: 768px;
    height: 480px;
    /* background-color: white; */
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
}

.form-container {
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
    margin-left: 22%;
    position: absolute;
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