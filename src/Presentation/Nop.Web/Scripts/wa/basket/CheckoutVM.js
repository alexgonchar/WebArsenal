var CheckoutVM = function (first, last) {
	this.shippingType = ko.observable('fromStore'); // courier or fromStore
	this.existingAddresses = [];
	this.mobilePhone = ko.observable('').extend({ minLength: 8, required: true });
	this.address = ko.observable('').extend({ forCourierRequired: { shippingType: this.shippingType } });
	this.selectedAddress = ko.observable('');
	this.note = ko.observable('');
	
	// validation
	//this.mobilePhone.extend({ required: true });
	//this.address = ko.observable('');
	//this.selectedAddress = ko.observable('');
	//this.note = ko.observable('');

	var self = this;

	this.submit = function () {
		
	};

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
			self.existingAddresses = addresses.userAddresses;
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