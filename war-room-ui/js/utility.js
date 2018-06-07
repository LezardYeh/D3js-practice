var helper = {
    /**
     * 輸入網格數值，推算應設定的寬度   
     * @param {*} colNum 
     */
    gridToLength(colNum) {
        return ($(document).width() > 768) ? $(document).width() * (1 / 12 * colNum) - 0.01 : $(document).width();
    },
    /**
     * 確認DOM是否存在，不存在自動新增
     */
    d3SelectAppend(context, elementName, className) {

        var realSelector = (className && `${elementName}.${className}`) || elementName;
        var target = context.select(realSelector);
        target = target.empty() ? context.append(elementName) : target;
        className && target.attr('class', className);
        return target;
    },
    /**
 * 幫助簡化Translate相關處理
 */
    d3Translate(target,width,height) {
        target.attr("transform", `translate(${width},${height})`)
        return target;
    }
}
/**
 * d3輔助方法
 */
var $h=helper;