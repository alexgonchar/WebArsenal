using System.Web.WebPages;

namespace Nop.Web.Framework.UI
{
    public static class GroupsLayoutExt
    {
        public static HelperResult GroutTitle<TModel>(this ViewEngines.Razor.WebViewPage<TModel> page, string titeleTextId)
        {
            return new HelperResult(w =>
                {
                    w.Write("<div class='control-group'><div class='controls'><h4>");
                    w.Write(page.T(titeleTextId));
                    w.Write("</h4></div></div>");
                });
        }
    }
}
