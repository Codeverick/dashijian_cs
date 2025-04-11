$(function () {
    $.ajaxPrefilter(function (options) {
        // 每次发起请求都会执行这里，将请求的url前面加上主地址，后面的地址由于会变动，所以由每个请求自行填写
        options.url = 'https://ajax.frontend.itheima.net' + options.url
    })
})