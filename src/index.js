window.zhihuNiceTimer = null;
window.zhihuNiceCount = 1;
function loop() {
    // 移除所有视频
    $('.Topstory .ZVideoItem-player').closest('.Card').empty().remove().hide();
    $('.Topstory .VideoAnswerPlayer').closest('.Card').empty().remove().hide();
    $('.Topstory .VideoAnswerPlayer').closest('.Card').empty().remove().hide();

    // 移除所有广告
    $('.Topstory .TopstoryItem--advertCard').empty().remove().hide();

    // 添加标题类型
    $('.Topstory .ArticleItem:not(.zhihu-nice-other-data)').each(function (index, item) {
        let dateCreated = dayjs($(this).find('meta[itemprop="dateCreated"]').attr('content')).format('YYYY-MM-DD HH:mm:ss');
        let dateModified = dayjs($(this).find('meta[itemprop="dateModified"]').attr('content')).format('YYYY-MM-DD HH:mm:ss');
        $(this)
            //
            .addClass('zhihu-nice-other-data')
            .find('.ContentItem-title')
            .prepend('<span class="title-type-article">文章</span>')
            .after(`<div class="date-time-line"><span class="created_at">创建时间：${dateCreated}</span><span class="updated_at">修改时间：${dateModified}</span></div>`);
    });
    $('.Topstory .AnswerItem:not(.zhihu-nice-other-data)').each(function (index, item) {
        let parentHref = $(this).find('.ContentItem-title meta[itemprop="url"]').attr('content');
        let dateCreated = dayjs($(this).find('meta[itemprop="dateCreated"]').attr('content')).format('YYYY-MM-DD HH:mm:ss');
        let dateModified = dayjs($(this).find('meta[itemprop="dateModified"]').attr('content')).format('YYYY-MM-DD HH:mm:ss');
        $(this)
            .addClass('zhihu-nice-other-data')
            .find('.ContentItem-title')
            .prepend('<a class="title-direct" href="' + parentHref + '" target="_blank">直达</a>')
            .prepend('<span class="title-type-answer">问题</span>')
            .after(`<div class="date-time-line"><span class="created_at">创建时间：${dateCreated}</span><span class="updated_at">修改时间：${dateModified}</span></div>`);
        // $(this).addClass('zhihu-nice-title-type').find('.ContentItem-title').prepend('<span class="title-type-answer">问题</span>');
    });

    $('.Topstory .Topstory-container:not(.is-zhihu-nice-left-side-bar)').each(function (index, item) {
        $(this).addClass('is-zhihu-nice-left-side-bar').prepend('<div class="zhihu-nice-left-side-bar"></div>');
    });

    // 定时循环
    clearTimeout(window.zhihuNiceTimer);
    window.zhihuNiceTimer = setTimeout(function () {
        loop();
    }, 300);
}
loop();

// $('.ContentItem-title div a').on('click', function () {
//     $(this).siblings('meta').attr('content');
// });

let __vm = new Vue({
    el: '#user-script-js',
    data: {
        active: false,
        clickElement: '',
        clickTime: '',
        timer: null,
        tips: '请填好对应信息后操作'
    },
    mounted() {
        this.$nextTick(() => {});
    },
    methods: {}
});
