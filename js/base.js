$(function () {
    $.ajaxPrefilter(function (options) {
        // 每次发起请求都会执行这里，将请求的url前面加上主地址，后面的地址由于会变动，所以由每个请求自行填写
        options.url = 'https://ajax.frontend.itheima.net' + options.url
        //如果包含/my的请求是有仅限请求，需要加请求头headers，这里我们可以统一设置
        if (options.url.indexOf('/my') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token')
            }
        }
        options.complete = function (jqxhr) {
            if (jqxhr.responseJSON.status === 1 && jqxhr.responseJSON.massage === "身份评论失败") {
                localStorage.removeItem('token')
                location.href = '../login.html'
            }
        }
    })
})