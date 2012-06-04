using System;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.WebPages;

namespace Nop.Web.Framework.UI
{
    public static class BootstrapLayoutExt
    {
        public static IHtmlString Row(this HtmlHelper helper, HtmlString rowContent)
        {
            var contentStr = rowContent.ToHtmlString();
            if (!string.IsNullOrWhiteSpace(contentStr))
            {
                var sb = new StringBuilder("<div class='row-fluid show-grid'><div class='span12'>", 200 + contentStr.Length);
                sb.Append(contentStr);
                sb.Append("</div></div>");
                return new HtmlString(sb.ToString());
            }

            return new HtmlString("");
        }
    }
}
