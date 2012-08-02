function Ajax() {

	function exec(params) {
		var defParams = {
			url: null,
			data: null,
			timeout: 30000,
			type: "GET",
			async: true,
			processData: null,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			handleFault: true
		};

		var execParams = jQuery.extend(defParams, params);
		execParams.data = JSON.stringify(execParams.data); // jQuery.toJSON(params.data);

		// =========== AJAX CALL ================
		var requestPromise = jQuery.ajax(execParams);
		// ======================================

		return requestPromise;
	}


	return {
		exec: exec
	};
}