$(function () {
    localStorage.removeItem('token')
    $('#link_reg').click(function () {
        $('.reg-form').show()
        $('.login-form').hide()
    })
    $('#link_login').click(function () {
        $('.reg-form [name=user_name]').val('')
        $('.reg-form [name=password]').val('')
        $('.reg-form').hide()
        $('.login-form').show()
    })

    // 表单验证
    const form = layui.form
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , regpass: function (value) {
            if (value != $('.reg-form [name=password]').val()) {
                return '两次输入的密码不一样！'
            }
        }
    })
    // 发起注册请求
    const layer = layui.layer
    $('#reg_sub').on('submit', function (e) {
        e.preventDefault()
        layer.msg('注册完成！')
        const data = {
            username: $('.reg-form [name=user_name]').val(),
            password: $('.reg-form [name=password]').val()
        }
        /* $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                layer.msg(res.message)
            }
            layer.msg('注册成功！')
        }) */
        $('#link_login').click()
    })
    $('#login_sub').submit(function (e) {
        e.preventDefault()
        /* $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', resizeBy.token)
            }
        }) */
        layer.msg('登陆成功')
        let info = JSON.parse(localStorage.getItem('info'))
        if (info === null) {
            info = {
                userid: 1234,
                nickname: '小小天下',
                email: 'asfe@qq.com',
                user_pic: 'assets/images/sample.jpg'
            }
        }
        info.username = $('#uname_dl').val()
        localStorage.setItem('info', JSON.stringify(info))
        localStorage.setItem('token', 'kdas123')
        location.href = '../index.html'
    })
})