WebFontConfig = {
    custom: {
        families: ['Noto Sans KR'],
        urls: ['https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700;900&display=swap']
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1.4.10/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

function modalOpen(popId){
    $(popId).addClass("active");
    $('body').addClass("modal-opened");
}
function modalClose(popId){
    $(popId).removeClass("active");
    $('body').removeClass("modal-opened");
}

function navToggle(e) {
    $('.btn.toggle-nav').click(function(e) {
        $('#wrap').toggleClass('nav-active',2500);
    });

    $('#wrap.frame #container').click(function(e) {
        if ($('#wrap').hasClass('nav-active')){
            $('#wrap').toggleClass('nav-active',2500);
        }
    });

    $('#wrap.frame #nav').click(function(e) {
        if (!$('#wrap').hasClass('nav-active')){
            $('#wrap').toggleClass('nav-active',2500);
            return false;
        }
    });
}

function sideNav() {
    $('.aside-nav a').on('click', function() {
        var aLi = $(this).parent('li');
        if ($('#wrap').hasClass('nav-active')){
            if ($(this).hasClass('toggle-sub')){
                $(aLi).toggleClass('active').siblings('li').removeClass('active');
                $(aLi).siblings('li').find('.active').removeClass('active');
                return false;
            }
        }
    });
}

function tabLink() {
    $('.tabs > li a').each(function(){
        var tabTarget=$(this).attr('href');
        $(this).click(function(e){
            e.preventDefault();
            $(this).parent('li').addClass('current');
            $(this).parent('li').siblings('li').removeClass('current');
            $(tabTarget).addClass('active').siblings('.tab-content').removeClass('active');
        });
    });
}

// progress list
function progress(table,idx) {
    var myUrl = $(location).attr('pathname');
    var myPath = myUrl.substring(0, myUrl.lastIndexOf('/'));
    var myProject = myPath.replace("/withbr@ther","").replace("/_withbrother","");

    //tr개수
    var sumTr = $(table).find("tbody tr").length;

    //line number
    $(table).find("tr td:first-child").each(function(i, v) {
        $(v).text(i + 1);
    });

    //state
    var stateFields = $(table).find("td.state"),
        sumCom = 0,
        sumHarf = 0,
        sumExcept = 0;

    stateFields.each(function(i, v) {
        var current = $(v);
        var fields = current.parent('tr');

        var prop = {
            //type: current.is(".validation") && "http://validator.w3.org/check?uri=" + myProject || "..",
            directory: fields.find('.path').text(),
            pageId: fields.find('.pageid').text()
        };

        if($(this).hasClass('viewport')){
            var wrapAnchor = $("<a>")
                .attr("target", "_blank")
                .attr("href", "http://m.kidsnote.mywisa.co.kr/"+ prop.directory + "/" + prop.pageId)
                .attr("onclick", "window.open(this.href,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=375,height=667');return false;")
                .text(v.textContent);
        } else {
            var wrapAnchor = $("<a>")
                .attr("target", "_blank")
                .attr("href", "http://m.kidsnote.mywisa.co.kr/"+ prop.directory + "/" + prop.pageId)
                .text(v.textContent);
        }

        if (current.text() == "미정") {
            current.addClass("undecided");
        } else if (current.text() == "진행") {
            current.addClass("working");
        } else if (current.text() == "PC 완료") {
            current.addClass("complete half");
            sumHarf++;
        } else if (current.text() == "MO 완료") {
            current.addClass("complete half");
            sumHarf++;
        // } else if (current.text() == "검수요청") {
        } else if (current.text() == "검수") {
            current.addClass("check");
        } else if (current.text() == "검수완료") {
            current.addClass("checked");
        }  else if (current.text() == "완료") {
            current.addClass("complete");
            sumCom++;
        } else if (current.text() == "삭제") {
            current.addClass("del");
            sumExcept++;
        } else if (current.text() == "제외") {
            current.addClass("del");
            sumExcept++;
        } else if (current.text() == "수정완료") {
            current.addClass("modify");
            sumCom++;
        } else if (current.text() == "대기") {
            current.addClass("wating");
            sumExcept++;
        } else {

        }
        current.html(wrapAnchor);
    });

    //테이블별 진행률
    var tbWrap = $(table).closest('.table-wrap'),
        boxHd = $(tbWrap).siblings('.box-title'),
        screen = sumCom,
        screenHarf = (sumHarf) / 2,
        sumProgress = parseInt(((sumCom + screenHarf) / (sumTr-sumExcept)) * 100);

    $(tbWrap).prepend('<p class="total-screens">'+'<strong>총 '+ sumTr+ '</strong><span><span> ｜ 완료 : '+screen+'</span>, <span> 제외 :'+ sumExcept+'</span></span></p>');
    $(boxHd).append('<span class="progress">'+sumProgress+'% 완료</span>');
    //전체 진행률
    var myBar = $(".progress-value:eq("+idx+")");

    $(myBar).css({'width': sumProgress+'%'});
    $(myBar).append('<span>'+sumProgress+'%</span>');
}

//toggleContent
function toggleContent(b,t) {
    if(!t){
        var defult= $(b).siblings('.js-toggle-target');
        if($(b).hasClass('active')){
            $(b).removeClass("active");
            $(defult).removeClass("active").slideUp(300);
        } else {
            $(b).addClass("active");
            $(defult).addClass("active").slideDown(300);
        }
    }
}

$(function(){
    // F12 버튼 방지
    $(document).ready(function(){
        $(document).bind('keydown',function(e){
            if ( e.keyCode == 123 /* F12 */) {
                e.preventDefault();
                e.returnValue = false;
            }
        });
    });

    // 우측 클릭 방지
    document.onmousedown=disableclick;
    status="Right click is not available.";

    function disableclick(e){
        if (e.button == 2) {
            alert(status);
            return false;
        }
    }

    //scroll
    var titleBar = $('#container .page-title-bar'),
        headerFix = $(titleBar).outerHeight();

    $('#container').on("load scroll", function(e) {

        var st = $(this).scrollTop();

        //header Tix
        if (st > headerFix) {
            $(titleBar).addClass("fixed");
        } else {
            $(titleBar).removeClass("fixed");
        }
    });

    if(window.matchMedia("(min-width: 768px)").matches){
        $('.only-mob').attr('aria-hidden', 'false');
        $('.only-pc').attr('aria-hidden', 'true');

    } else {
        $('.only-mob').attr('aria-hidden', 'true');
        $('.only-pc').attr('aria-hidden', 'false');
    }

    $('.overlay .btn-close').on('click', function(e) {
        e.preventDefault();
        var target = $(this).closest('.overlay');
        modalClose(target);
    });

    $('.btn.open-pop').on('click', function(e) {
        var pTag = $(this).prop('tagName');
        if (pTag == 'A'){
            var target = $(this).attr('href');
        } else if (pTag == 'BUTTON'){
            var target = $(this).attr('pop-target');
        }
        modalOpen(target);
    });


    if($("#wrap").hasClass('frame')){
        navToggle();
        sideNav();
    }

    tabLink();

    $(".markup-list").each(function(e) {
        progress(this,e);
    });


    $('.js-toggle-switche').on('click', function(e) {
        toggleContent(this,);
    });

    //preview
    $('.code-box-copy').codeBoxCopy({
        tooltipText: 'Copied',
        tooltipShowTime: 1000,
        tooltipFadeInTime: 300,
        tooltipFadeOutTime: 300
    });
})
