$(function () {
    const form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value === $('[name=originally_pwd]').val()) {
                return '新老密码不能相同！'
            }
        },
        confirmpwd: function (value) {
            if (value !== $('[name=new_pwd]').val()) {
                return '两次输入的新密码必需保持一致！'
            }
        }
    })
    const layer = layui.layer
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        /* ajax: ({
            type: "POST",
            url: '',
            data: $('.layui-form').serialize(),
            seccess: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败！')
                }
                layer.msg('修改密码成功！')
                form.reset()
            }
        }) */

        layer.msg('修改密码成功！')
        $('.layui-form')[0].reset()
    })
})