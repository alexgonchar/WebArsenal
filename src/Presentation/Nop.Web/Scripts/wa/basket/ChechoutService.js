function CheckoutService() {

	function getShippingAddresses() {
		return $.ajax({ url: absolutePath + 'checkout/GetShippingAddresses/' });
	}

	return {
		getShippingAddresses: getShippingAddresses
	};
}