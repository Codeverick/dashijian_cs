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
        //complete不管访问成功与否都 会执行，这里看其返回值是否请求成功，如果不成功就不允许访问登陆主页！就要清空token跳回登陆页
        complete: function (jqxhr) {
            if (jqxhr.responseJSON.status === 1 && jqxhr.responseJSON.massage === "身份评论失败") {
                localStorage.removeItem('token')
                location.href = '../login.html'
            }
        }
    }) */
    //    正常是只有服务器返回向应并成功才能登陆，否则跳出，这里没有服务器测试，就用有无token来代替
    if (!localStorage.getItem('token')) {
        location.href = '../login.html'
        return
    }
    let info = JSON.parse(localStorage.getItem('info'))
    if (info === null) {
        info = {
            userid: 1234,
            username: "asdw123",
            nickname: '小小天下',
            email: 'asfe@qq.com',
            user_pic: 'assets/images/sample.jpg'
        }
    }
    /* const data = {
        name: '小小天下',
        user_pic: null
    } */
    renderinfo(info)
}
//渲染用户信息
function renderinfo(user) {
    const uname = user.nikename || user.nickname
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