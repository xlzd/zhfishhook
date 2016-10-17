

// 获取图片的 url
function load_img_urls() {
    var imgs = []

    // 为了简化用$("控件id")来代替document.getElementById("控件id")
    imgs = $('.zm-item-answer').find('.lazy')
    console.log('imgs count : ' + imgs.length)

    return imgs.map(function(){return $(this).data($(this).data('original') != undefined ? 'original' : 'actualsrc')})
}


function ale(var1)
{
    alert("这个问题下面有鱼上钩啦"+var1);
}

// 建立图片式的 html 页面
function build_img_html(img_urls) {
    var img_html = []

    for(var i = 0; i < img_urls.length; i++) {
        html = '<div class="fish"><img src="' + img_urls[i] + '" data-index=' + (i + 1) + '"></div>'
        img_html.push(html);
    }
    return img_html.join('')
}



// 页面加载完成后开始运行do stuff when DOM is ready　中的语句!
// 具体不懂的可以参考这里 http://www.cnblogs.com/MikeChen/articles/1795526.html
$(document).ready(function() {
    var SHOW_BTN_TEMPLATE = '<div class="show-btn"></div>'
    var CONTAINER_TEMPLATE = '<div><div class="zh-fishhook"><div class="page-index">第 <span class="current"></span> 张，共 <span class="total"></span> 张</div><div class="img-container" data-index="0"></div><div class="exit"></div><div class="paginator"><div class="prev pager"></div><div class="next pager"></div></div></div><div class="background"></div></div>'
    var ZH_FISHHOOK_CONTAINER = undefined
    var IMG_CONTAINER = undefined
    var PREV_BUTTON = undefined
    var NEXT_BUTTON = undefined
    var CURRENT = undefined
    var IMG_COUNT = 0
    var DURATION = 500
    var SHOWING = false

    // 函数调用
    var img_urls = load_img_urls()

    var TITLE = document.title
    

    // 用正则表达式来判断一下是否有鱼
    var patt1 = new RegExp("女")
    var patt2 = new RegExp("胸")
    var patt3 = new RegExp("腿")
    var patt4 = new RegExp("身材")
     
     
     if(patt1.test(TITLE) || patt2.test(TITLE) || patt3.test(TITLE) || patt4.test(TITLE)){

     	if (img_urls.length !== 0){

    	ale(TITLE)
           $(SHOW_BTN_TEMPLATE).appendTo($('body'));
        }
     }

    

    $(CONTAINER_TEMPLATE).appendTo($('body'));

    ZH_FISHHOOK_CONTAINER = $('.zh-fishhook');
    ZH_FISHHOOK_CONTAINER.css('width', window.innerWidth + 'px').css('height', window.innerHeight + 'px');

    IMG_CONTAINER = $('.img-container')
    $(build_img_html(img_urls)).appendTo(IMG_CONTAINER);

    IMG_COUNT = img_urls.length;

    var total = $('.total');
    CURRENT = $('.current');

    
    // 显示总共的图片数量
    total.text(IMG_COUNT);

    CURRENT.text(IMG_COUNT !== 0 ? '1' : '0');

    PREV_BUTTON = $('.prev')
    NEXT_BUTTON = $('.next')



    function init() {
        SHOWING = true

        // 保留了图片的 url 
        var img_urls = load_img_urls()
        $(CONTAINER_TEMPLATE).appendTo($('body'));

        IMG_CONTAINER = $('.img-container')
        IMG_CONTAINER[0].innerHTML = ''

        // urls 传入这个函数
        $(build_img_html(img_urls)).appendTo(IMG_CONTAINER);

        IMG_COUNT = img_urls.length;

        var total = $('.total');


        // 显示图片的总数目
        total.text(IMG_COUNT);

        if(IMG_COUNT === 0) {
            $('<h1 class="no-fish-noti">oooooops，没有发现图片  ><</h1>').appendTo(IMG_CONTAINER);
            NEXT_BUTTON.hide();
        }
        if(IMG_COUNT === 1) {
            NEXT_BUTTON.hide();
        }
    }

    // 前一张
    function prev(){
        var now_pos = parseInt(IMG_CONTAINER.data('index'));
        var before_pos = parseInt(CURRENT.text());

        if(now_pos !== 0) {
            IMG_CONTAINER.css('right', (now_pos - 1) * 100 + '%');
            IMG_CONTAINER.data('index', now_pos - 1);
            CURRENT.text(before_pos - 1);
        }
        if(now_pos === 1) {
            PREV_BUTTON.fadeOut(DURATION);
        }

        NEXT_BUTTON.fadeIn(DURATION);
    }

    // 后一张
    function next() {
        var now_pos = parseInt(IMG_CONTAINER.data('index'));
        var before_pos = parseInt(CURRENT.text());


        if(now_pos < IMG_COUNT - 1) {
            IMG_CONTAINER.css('right', (now_pos + 1) * 100 + '%');
            IMG_CONTAINER.data('index', now_pos + 1);
            CURRENT.text(before_pos + 1);
        }

        if(now_pos === IMG_COUNT -2) {
            NEXT_BUTTON.fadeOut(DURATION);
        }

        PREV_BUTTON.fadeIn(DURATION);
    }

    // 快捷键
    function on_key_pressed(e) {
        console.log(e.which)
        if(e.which === 39 || e.which === 40) {
            next();
        } else if(e.which === 37 || e.which === 38) {
            prev();
        } else if(e.which === 27) {
            exit();
        }
    }

    function show(){
        init()

        ZH_FISHHOOK_CONTAINER.fadeIn(DURATION);
        $('body').css('overflow', 'hidden');
        $('.background').fadeIn(DURATION);
        unitWidth = IMG_CONTAINER.width;
        PREV_BUTTON.click(prev);
        NEXT_BUTTON.click(next);
        $('.exit').click(exit)
        $(document).keydown(on_key_pressed);
    }

    function exit(){
        SHOWING = false
        ZH_FISHHOOK_CONTAINER.fadeOut(DURATION);
        $('.background').hide();
        $('body').css('overflow', 'visible');
        PREV_BUTTON.off('click');
        NEXT_BUTTON.off('click');
        $('.exit').off('click');
        $(document).off('keydown', on_key_pressed);
    }

    $(window).resize(function(){
        ZH_FISHHOOK_CONTAINER.css('width', window.innerWidth + 'px').css('height', window.innerHeight + 'px');
    })

    document.onkeydown = function(e){
        if(e.which !== 83) {
            return
        }
        if (SHOWING) {
            exit()
        } else{
            show()
        }
    };

    $('.show-btn').click(show);
    chrome.runtime.sendMessage('showPageAction');
});
