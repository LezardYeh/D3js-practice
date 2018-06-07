var $carousel = $('.carousel'),
    ui = new UIState({
        playState: 'playing',
        screenMode: 'pc'
    }),
    $play = $('#play'),
    $screenMode = $('#screen-mode-btn'),
    $next = $('#next-bt'),
    allFile = ['js/chart/sale.js','js/chart/1.js',
     'js/chart/2.js'
    ],
    register = new ChartRegistrar(allFile);
register.start();

//先讓register把js/html完成，再開始輪播
//$carousel.carousel('dispose').carousel();

$('.fas[title], .fab[title]').tooltip({ trigger: 'hover' });
$('#play-second-text').change((e) => {
    var value = e.currentTarget.value;
    $carousel.carousel('dispose').carousel({
        interval: value * 1000
    })
    ui.whenPlayState({
        play() { },
        pause() { $carousel.carousel('pause') }
    })

});
$play.click((e) => {
    $play.toggleClass('fa-pause fa-play');
    ui.toPlayState({
        play() {
            $carousel.carousel();
            $play.attr('data-original-title', '暫停');
        },
        pause() {
            $carousel.carousel('pause');
            $play.attr('data-original-title', '開始播放');

        }
    }).changePlayState();
});
$screenMode.click(() => {
    var elem = document.getElementsByTagName("body")[0];
    $screenMode.toggleClass('fa-tv fa-chrome').toggleClass('fas fab');
    ui.toScreenMode({
        tv() {
            elem.webkitRequestFullscreen();
            $screenMode.attr('data-original-title', '使用瀏覽器模式觀看');
        },
        pc() {
            document.webkitExitFullscreen();
            $screenMode.attr('data-original-title', '使用TV全螢幕模式觀看');
        }
    }).changeScreenMode();
});
$next.click(() => {
    $carousel.carousel('next');
})
//$carousel.on('slide.bs.carousel', function () {
$carousel.on('slid.bs.carousel', function () {
    var id = $('.carousel-item.active').attr('id');
    register.execute(id);
})

function UIState(param) {
    var playState = param['playState'],
        screenMode = param['screenMode'];

    this.whenPlayState = function (param) {
        if (playState == 'playing') {
            param.play();
        } else {
            param.pause();
        }
        return this;
    }
    this.toPlayState = function (param) {
        if (playState == 'playing') {
            param.pause();
        } else {
            param.play();

        }
        return this;
    }


    //變更狀態
    this.changePlayState = function () {
        this.toPlayState({
            play() { playState = 'playing' },
            pause() { playState = 'pause' }
        });
        return this;
    }

    this.toScreenMode = function (param) {
        if (screenMode == 'tv') {
            param.pc();
        } else {
            param.tv();
        }
        return this;
    }
    this.changeScreenMode = function () {

        this.toScreenMode({
            tv() { screenMode = 'tv' },
            pc() { screenMode = 'pc' }
        })
        return this;
    }

}