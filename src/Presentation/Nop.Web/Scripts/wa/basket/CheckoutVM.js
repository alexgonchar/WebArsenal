var CheckoutVM = function (subTotal, courierShippingRate) {
	var self = this;
	
	this.shippingType = ko.observable('fromStore'); // courier or fromStore
	this.existingAddresses = ko.observableArray();
	this.mobilePhone = ko.observable('').extend({ minLength: 8, required: true });
	this.address = ko.observable('').extend({ forCourierRequired: { shippingType: this.shippingType } });
	this.selectedAddress = ko.observable('');
	this.note = ko.observable('');
	this.checkoutStatus = ko.observable('gatheringInfo'); // values: gatheringInfo, pending, done
	
	this.courierPrice = courierShippingRate || 50;
	

	this.shippingPrice = ko.computed(function() {
		return self.shippingType() == 'fromStore' ? 0 : self.courierPrice;
	});

	this.totalPrice = ko.computed(function() {
		return subTotal + self.shippingPrice();
	});
	
	

	this.submit = function () {
		self.checkoutStatus('pending');

		var checkoutInfo = {
			ShippingMethodStr: self.shippingType(),
			MobilePhone: self.mobilePhone(),
			Address: self.address(),
			Comments: self.note()
		};

		checkoutService.confirmFastCheckout(checkoutInfo)
			.done(checkoutCompleted)
			.fail(checkoutFailed);
	};

	function checkoutCompleted(result) {
		self.checkoutStatus('done');
		window.location.href = result.redirectUrl;
	}
	
	function checkoutFailed(rowRes) {
		self.checkoutStatus('gatheringInfo');
		var res = JSON.parse(rowRes.responseText);
		alert('Не удалось обработать заказ: ' + res.errors);
	}
	
	function setMobilPhone(value) {
		if (!self.mobilePhone()) {
			self.mobilePhone(value);
		}
	}

	this.selectedAddress.subscribe(function (selAddr) {
		if (selAddr) {
			self.address(selAddr.Address1);
			setMobilPhone(selAddr.PhoneNumber);
		}
		else {
			self.address(undefined);
			setMobilPhone(undefined);
		}
	});

	
	(function retrieveAddresses() {
		checkoutService.getShippingAddresses().done(shippingAddressesretrieved);
		
		function shippingAddressesretrieved(addresses) {
			self.existingAddresses = ko.observableArray(addresses.userAddresses);
			if (addresses.userAddresses.length > 0) {
				self.mobilePhone(addresses.userAddresses[0].PhoneNumber);
			}
		}
	})();
	
	this.errors = ko.validation.group(this);
};


ko.validation.rules['forCourierRequired'] = {
	validator: function (val, params) {
		var shipType = params.shippingType();
		if (shipType === "courier") {
			var reqV = ko.validation.rules['required'];
			return reqV.validator(val, params);
		}
		else {
			return true;
		}
	},
	message: 'Обязательно для заполнения'
};