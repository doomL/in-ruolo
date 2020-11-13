'use strict';
var KTDatatablesDataSourceAjaxClient = function() {

	var initTable1 = function() {
		var table = $('#kt_table_1');

		// begin first table
		table.DataTable({
			responsive: true,
			ajax: {
				url: '/User/GetEsami',
				type: 'GET',
				data: {
				},
			},
			columns: [
				{data: 'OrderID'},
				{data: 'Codice'},
				{data: 'Descrizione'},
							]
			
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

jQuery(document).ready(function() {
	KTDatatablesDataSourceAjaxClient.init();
});