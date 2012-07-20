using System;
using System.Net;
using System.Web.Mvc;

namespace Nop.Web.Framework
{
	public class HandlesExceptionsAttribute : HandleErrorAttribute
	{
		public override void OnException(ExceptionContext filterContext)
		{
			base.OnException(filterContext);

			filterContext.HttpContext.Response.Clear();

			// overwrite the result for AJAX request
			if (filterContext.RequestContext.HttpContext.Request.IsAjaxRequest())
			{
				filterContext.Result = new JsonNetResult
				{
					Data = GetExceptionDescription(filterContext),
				};
			}

			SetStatusCode(filterContext);

			filterContext.ExceptionHandled = true;
		}

		private static dynamic GetExceptionDescription(ExceptionContext filterContext)
		{
			return new {errors = new[] {filterContext.Exception.Message}};
		}

		private static void SetStatusCode(ExceptionContext filterContext)
		{
			if (filterContext.Exception is NotImplementedException)
			{
				filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.NotImplemented;
			}
			else
			{
				filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
			}
		}
	}
}
