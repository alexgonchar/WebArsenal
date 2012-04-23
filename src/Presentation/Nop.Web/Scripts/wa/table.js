function initTables($) {
    var resizeTimeoutId;

    $('.flex-tbl').on('resize', function () {
        if (resizeTimeoutId) {
            clearTimeout(resizeTimeoutId);
        }
        resizeTimeoutId = setTimeout(function (event) {
            resizeTimeoutId = null;
            resizeTable(event);
        }, 200);
    });

    function resizeTable(event) {
        alert('resized');
    }
}