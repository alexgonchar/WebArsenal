function CheckoutService() {

	function getShippingAddresses() {
		return $.ajax({ url: absolutePath + 'checkout/GetShippingAddresses/' });
	}
	
	function confirmFastCheckout(checkoutInfo) {
		return $.ajax({
			url: absolutePath + 'checkout/ConfirmFastCheckout/',
			data: checkoutInfo
		});
	}
	
	return {
		getShippingAddresses: getShippingAddresses,
		confirmFastCheckout: confirmFastCheckout
	};
}