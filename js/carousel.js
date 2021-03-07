/**
 * 轮播图特效
 * 日期: 2021年3月7日
 * 
 */
(function(){
    // 得到元素
    var carousel_list = document.getElementById('carousel_list')
    var left_btn = document.getElementById('left_btn')
    var right_btn = document.getElementById('right_btn')
    var circle_ol = document.getElementById('circle_ol')
    var lis = circle_ol.getElementsByTagName('li')
    var banner = document.getElementById('banner')

    // 克隆第一个li
    var clone_li = carousel_list.firstElementChild.cloneNode(true)
    // 上树
    carousel_list.appendChild(clone_li)

    // 当前显示第几张
    var idx = 0

    // 函数节流锁
    var lock = true

    // 右按钮 监听点击事件
    right_btn.onclick = right_btn_handler

    function right_btn_handler() {
        // 判断节流锁的状态，如果是关闭的，那么就什么都不做
        if(!lock) return

        // 关锁
        lock = false
        carousel_list.style.transition = 'transform .5s ease 0s'
        // idx要加1
        idx++
        console.log(idx);
        // 拉动
        carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)'
        // 判断是否是最后一张，如果是最后一张，那么就要瞬间移动回来
        if(idx > 4){
             // 设置一个延时器，延时器的功能就是将carousel瞬间拉回到第0张图片的位置，延时器的目的就是让过渡动画结束之后 拉回去
            setTimeout(() => {
                // 删除transform属性
                carousel_list.style.transform = 'none'
                // 去掉过渡
                carousel_list.style.transition = 'none'
                idx = 0
            },500)
            
        }
        setCircles()

        // 开锁，动画结束之后开锁
        setTimeout(() =>{
            lock = true
        }, 500)
    }

    // 左按钮 监听点击事件
    left_btn.onclick = function () {
        if(!lock) return

        lock = false
        // 左按钮很特殊，要先写if语句，而不是idx--
        if(idx == 0){
            // 瞬间用假图片替换真图片
            // 先去掉过渡
            carousel_list.style.transition = 'none'
            // 瞬间移动到最后一张图片
            carousel_list.style.transform = 'translateX(' + 5 * -16.66 +'%)'
            // 更改idx的值 异步语句的执行顺序
            idx = 4
            // 小技巧，延时0毫秒非常有用，可以让刚才瞬间发生之后，再把过渡加上
            setTimeout(() => {
                carousel_list.style.transition = 'transform 0.5s ease 0s';
               
                carousel_list.style.transform = 'translateX(' + 4 * -16.66 +'%)'
            }, 0)
        }else{
            idx--
            carousel_list.style.transform = 'translateX(' + idx * -16.66 +'%)'
        }
        setCircles()

        setTimeout(() => {lock = true}, 500)
    }

    // 设置小圆点的current在谁身上，序号为idx的小圆点才有current类名，其他的li都没有类名
    function setCircles() {
        // 遍历 ， 遍历 0,1,2,3,4
        for(var i = 0 ; i <= 4; i++){
            // 
            if(i == idx % 5){
                lis[i].className = 'current'
            }else{
                lis[i].className = ''
            }
        }
    }

    // 事件委托，监听小圆点点击
    circle_ol.onclick = function (e) {
        if(e.target.tagName.toLowerCase() == 'li'){
            // 获取当前点击的li编号n
            var n = e.target.getAttribute('data-n')

            // 改变idx
            idx = n

            carousel_list.style.transform = 'translateX(' + idx * -16.66 +'%)'

            setCircles()
            // alert(e.target.getAttribute('data-n'))
        }
    }

    // 定时器，自动轮播
    var timer = setInterval(right_btn_handler, 2000);

    // 鼠标进入，自动轮播暂停
    banner.onmouseenter = function () {
        clearInterval(timer)
    }

    // 鼠标离开，自动轮播开始
    banner.onmouseleave = function () {
        // 设表先关
        clearInterval(timer)
        timer = setInterval(right_btn_handler, 2000)
    }
})();