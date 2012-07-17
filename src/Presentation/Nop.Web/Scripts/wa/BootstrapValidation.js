(function applyBootstrapValidation() {
	//var validationElementHandler = ko.bindingHandlers['validationElement'];
	
	ko.bindingHandlers['validationElement'] = {
		update: function(element, valueAccessor) {
			var obsv = valueAccessor(),
			    config = utils.getConfigOptions(element),
			    val = ko.utils.unwrapObservable(obsv),
			    msg = null,
			    isModified = false,
			    isValid = false;

			obsv.extend({ validatable: true });

			isModified = obsv.isModified();
			isValid = obsv.isValid();

			// create an evaluator function that will return something like:
			// css: { validationElement: true }
			var cssSettingsAccessor = function() {
				var css = { };

				var shouldShow = (isModified ? !isValid : false);

				if (!config.decorateElement) {
					shouldShow = false;
				}

				// css: { validationElement: false }
				css[config.errorElementClass] = shouldShow;

				return css;
			};

			//add or remove class on the element;
			ko.bindingHandlers.css.update(element.parentNode.parentNode, cssSettingsAccessor);
		}
	};
})();