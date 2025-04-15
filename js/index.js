$(function () {
    //调用获取用户数据 
    getuserinfo()
    //关闭主页
    let layer = layui.layer
    $('#quit').on('click', function () {
        layer.confirm('是否要执行退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '../login.html'
            layer.close(index);
        });
    })
})

//获取用户数据
function getuserinfo() {
    /* $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderinfo(res.data)
        },
        complete: function (jqxhr) {
            if (jqxhr.responseJSON.status === 1 && jqxhr.responseJSON.massage === "身份评论失败") {
                localStorage.removeItem('token')
                location.href = '../login.html'
            }
        }
    }) */
    if (!localStorage.getItem('token')) {
        location.href = '../login.html'
        return
    }
    const data = {
        name: '小小天下',
        user_pic: 'assets/images/sample.jpg'
    }
    /* const data = {
        name: '小小天下',
        user_pic: null
    } */
    renderinfo(data)
}
//渲染用户信息
function renderinfo(user) {
    const uname = user.nikename || user.name
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.t-avatar').hide()
    } else {
        const str = uname[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.t-avatar').html(str).show()
    }
}