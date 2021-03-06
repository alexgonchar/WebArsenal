﻿function initTables($) {
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
            var minWidth = parseInt($tbl.attr('minWidth'), 10);
            var width = $tbl.width();
            var columnsCount = calcColumnsCount(width, minWidth);
            var $tblItems = $('.fluid-tbl-item', $tbl);

            setNewSizes($tbl, columnsCount, $tblItems);
            setNewGutters(columnsCount, $tblItems);
        });
    }

    function setNewSizes($tbl, columnsCount, $tblItems) {
        var newColumnClass = calcColumnClass(columnsCount);
        var curColumnClass = $tbl.attr('columnClass');
        
        if (curColumnClass) {
            $tblItems.removeClass(curColumnClass);
        }
        $tblItems.addClass(newColumnClass);

        $tbl.attr('columnClass', newColumnClass);
    }

    function setNewGutters(columnsCount, $tblItems) {
        $tblItems.each(function (index) {
            $(this).css('margin-left', index % columnsCount === 0 ? "0%" : styleConstants.gutterWidthFluidStr);
        });
    }

    function calcColumnsCount(widthTotal, columnWidthMin) {
        var okCount = 1;
        var colMaxCount = 4;

        var newColWidth = widthForColumns(okCount + 1);
            
        while (newColWidth >= columnWidthMin && okCount < colMaxCount) {
            okCount += 1;
            newColWidth = widthForColumns(okCount + 1);
        }
        
        return okCount;

        function widthForColumns(count) {
            return (widthTotal - (count - 1) * styleConstants.gutterWidth) / count;
        }
    }

    function calcColumnClass(columnsCount) {
        return 'span' + (12/columnsCount);
    }
}