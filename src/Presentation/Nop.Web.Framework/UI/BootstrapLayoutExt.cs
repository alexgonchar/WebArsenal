using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.WebPages;

namespace Nop.Web.Framework.UI
{
    public static class BootstrapLayoutExt
    {
        public static HelperResult Row(this HtmlHelper helper, Func<dynamic, HelperResult> rowContent)
        {
            return new HelperResult(w =>
                {
                    string contentStr = rowContent(null).ToHtmlString();
                    if (string.IsNullOrWhiteSpace(contentStr)) return;
                    w.WriteRowWithContent(contentStr);
                });
        }

        public static HelperResult Row(this HtmlHelper helper, Func<dynamic, HelperResult> rowContent, Func<IHtmlString, HelperResult>  rowWrapper)
        {
            return new HelperResult(w =>
            {
                string contentStr = rowContent(null).ToHtmlString();
                if (string.IsNullOrWhiteSpace(contentStr)) return;
                w.WriteRowWithContent(rowWrapper(new HtmlString(contentStr)).ToHtmlString());
            });
        }

        private static void WriteRowWithContent(this TextWriter writer, string content)
        {
            writer.Write("<div class='row-fluid show-grid'><div class='span12'>");
            writer.Write(content);
            writer.Write("</div></div>");
        }

        public static MvcHtmlString MyCheckBoxFor<TModel>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, bool>> expression, object htmlLabelAttributes = null, object htmlCheckBoxAttributes = null)
        {
            var checkbox = htmlHelper.CheckBoxFor(expression, htmlCheckBoxAttributes);

            var labelTag = new TagBuilder("label");
            var checkboxName = ExpressionHelper.GetExpressionText(expression);
            labelTag.AddCssClass("checkbox");
            labelTag.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(htmlLabelAttributes));
            labelTag.InnerHtml = checkbox.ToString() + LabelHelper(ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData), checkboxName);

            return new MvcHtmlString(labelTag.ToString());
        }
        
        private static MvcHtmlString LabelHelper(ModelMetadata metadata, string fieldName)
        {
            string labelText;
            var displayName = metadata.DisplayName;

            if (displayName == null)
            {
                var propertyName = metadata.PropertyName;

                labelText = propertyName ?? fieldName.Split(new[] { '.' }).Last();
            }
            else
            {
                labelText = displayName;
            }

            if (string.IsNullOrEmpty(labelText))
            {
                return MvcHtmlString.Empty;
            }

            return new MvcHtmlString(labelText);
        }

        /*public static MvcHtmlString MyCheckBox(this HtmlHelper htmlHelper,
            IDictionary<string, object> htmlLabelAttributes = null, IDictionary<string, object> htmlCheckBoxAttributes = null)
        {
            var checkbox = htmlHelper.CheckBox(htmlCheckBoxAttributes);

            var labelTag = new TagBuilder("label");
            var checkboxName = ExpressionHelper.GetExpressionText(expression);
            labelTag.AddCssClass("checkbox");
            labelTag.MergeAttributes(HtmlHelper.AnonymousObjectToHtmlAttributes(htmlLabelAttributes));
            labelTag.InnerHtml = checkbox.ToString() + LabelHelper(ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData), checkboxName);

            return new MvcHtmlString(labelTag.ToString());
        }*/
    }
}
