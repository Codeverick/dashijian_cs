$(function () {
    const layer = layui.layer
    const $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 上传图片
    $('#up-btn').click(function () {
        $('#imgfile').click()
    })
    //获取文件并改变头像
    $('#imgfile').on('change', function (e) {
        if (e.target.files.length === 0) {
            return layer.msg('请选择一张图片！')
        }
        // 获取文件
        const file = e.target.files[0]
        console.log(file)
        // 生成新路径
        const imgurl = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', imgurl)
            .cropper(options)
    })
    $('#upimg-btn').on('click', function () {
        // 先获取图像裁剪区域
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                //创建一个Canvas画面
                width: 100,
                height: 100
            })
            .toDataURL('image/png') //将Canvas画面上的内容，转化为base64格式的字符串，之后可将此格式图片上传到服务器保存。
        /*  $.ajax({
             method: 'POST',
             rul: '/my/updata/avatar',
             data: {
                 avatar: dataURL
             },
             success: function (res) {
                 if (res.status !== 0) {
                     return layer.msg('上传头像失败！')
                 }
                 layer.msg('上传头像成功！')
                 window.parent.getuserinfo() //重新获取用户信息，更新头像
             }
         }) */
        //使用本地方式代替提交服务器
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
        info.user_pic = dataURL
        localStorage.setItem('info', JSON.stringify(info))
        window.parent.getuserinfo()
    })
})
