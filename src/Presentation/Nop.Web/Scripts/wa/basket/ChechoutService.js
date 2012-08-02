function CheckoutService() {

	function getShippingAddresses() {
		return ajax.exec({ url: absolutePath + 'checkout/GetShippingAddresses/' });
	}
	
	function confirmFastCheckout(checkoutInfo) {
		return ajax.exec({
			url: absolutePath + 'checkout/ConfirmFastCheckout/',
			data: checkoutInfo,
			type: "POST"
		});
	}
	
	return {
		getShippingAddresses: getShippingAddresses,
		confirmFastCheckout: confirmFastCheckout
	};
}