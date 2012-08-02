using Nop.Web.Framework.Mvc;

namespace Nop.Web.Models.Checkout
{
	public class FastCheckoutModel : BaseNopModel
	{
		public decimal SubTotal;
		public decimal CourierShippingRate;
	}
}