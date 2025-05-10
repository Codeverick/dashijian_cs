$(function () {
    const form = layui.form
    const layer = layui.layer
    inituserinfo()
    // 重置时，需要先关闭默认提交，再重新获取信息
    $('.layui-btn-primary').click(function (e) {
        e.preventDefault()
        inituserinfo()
    })
    // 提交用户信息
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        /* ajax: ({
            type: "POST",
            url: '',
            data: $(this).serialize(),
            seccess: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交用户信息失败！')
                }
                window.parent.getuserinfo()
                layer.res(res.message)
            }
        }) */
        console.log(123)
        const info = {
            userid: 1234,
            username: $('#uname').val(),
            nickname: $('#nname').val(),
            email: $('#uemail').val()
        }
        localStorage.setItem('info', JSON.stringify(info))
        window.parent.getuserinfo()
    })
    // 验证用户信息
    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '昵称不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '昵称不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value.length < 2 || value.length > 6) {
                alert('昵称不能小于2位或大于6位！');
                return true;
            }
            if (value.length < 2 || value.length > 6) {
                alert('昵称不能小于2位或大于6位！');
                return true;
            }
        }
    })
    // 获取用户信息
    function inituserinfo() {
        // const form = layui.form
        /*  ajax: ({
             type: "GET",
             url: "",
             seccess: function (res) {
                 if (res.status !== 0) {
                     return layer.msg('获取用户信息失败！')
                 }
                 form.val('forminfo', res.data)
             }
         }) */
        //    服务器无法访问，只能替代
        let info = JSON.parse(localStorage.getItem('info'))
        if (info === null) {
            console.log(123)
            info = {
                userid: 1234,
                username: "asdw123",
                nickname: '小小天下',
                email: 'asfe@qq.com',
                user_pic: 'assets/images/sample.jpg'
            }
        }

        form.val('forminfo', info)
    }
})
