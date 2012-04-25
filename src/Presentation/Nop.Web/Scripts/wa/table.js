(function initTables($) {
    var resizeTimeoutId;

    $(window).on('resize', function () {
        if (resizeTimeoutId) {
            clearTimeout(resizeTimeoutId);
        }
        resizeTimeoutId = setTimeout(function (event) {
            resizeTimeoutId = null;
            resizeTable(event);
        }, 200);
    });

    resizeTable();
    

    function resizeTable() {
        $('.fluid-tbl').each(function () {
            var $tbl = $(this);
            var minWidth = $tbl.attr('minWidth');
            var width = $tbl.width();
            var columnsCount = calcColumnsCount(width, minWidth);
            var newColumnClass = calcColumnClass(columnsCount);
            var curColumnClass = $tbl.attr('columnClass');

            var $tblItems = $('.fluid-tbl-item', $tbl);
            if (curColumnClass) {
                $tblItems.removeClass(curColumnClass);
            }
            $tblItems.addClass(newColumnClass);

            $tbl.attr('columnClass', newColumnClass);
        });
    }

    function calcColumnsCount(columnWidthMin, widthTotal) {
        return 4;
    }

    function calcColumnClass(columnsCount) {
        return "span4";
    }
})
(jQuery);