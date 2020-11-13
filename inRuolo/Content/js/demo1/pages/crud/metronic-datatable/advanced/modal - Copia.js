'use strict';
// Class definition

var KTDatatableModal = function () {

	var remoteDatatable = function () {
		var modal = $('#kt_modal_KTDatatable_remote');
		var jsonEsami;
		$.ajax({
			url: 'User/GetEsami',
			async: false,
			success: function (response) {
				jsonEsami = JSON.parse(response);
			}
		});
		var datatable = $('#modal_datatable_ajax_source').KTDatatable({
			// datasource definition
			//data: {
			//	type: 'remote',
			//	source: {
			//		read: {
			//			url: 'User/GetEsami',
			//			map: function (raw) {
			//				// sample data mapping
			//				var dataSet = raw;
			//				if (typeof raw.data !== 'undefined') {
			//					dataSet = raw.data;
			//				}
			//				return dataSet;
			//			},
			//		},
			//	},
			//	pageSize: 10, // display 20 records per page
			//	serverPaging: true,
			//	serverFiltering: true,
			//	serverSorting: true,
			//},

			//localData
			data: {
				type: 'local',
				source: jsonEsami,
				pageSize: 10,
			},
			// layout definition
			layout: {
				scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
				height: 640, // datatable's body's fixed height
				footer: false, // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: false,

			search: {
				input: modal.find('#examSearch'),
				delay: 400,
			},

			// columns definition
			columns: [
				{
					field: 'Id',
					title: '#',
					sortable: 'asc',
					width: 30,
					type: 'number',
					selector: false,
					textAlign: 'center',
				}, {
					field: 'Codice',
					title: 'Codice',
				}, {
					field: 'Descrizione',
					title: 'Nome',
				},
				{
					field: 'AreaEsame.Id',
					title: 'AreaEsame.Id',
				},
				{
					field: 'Cfu',
					title: 'Sostenuto/Cfu',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function () {
						return '\
							<div class="input-group">\
							<div class="input-group-prepend">\
								<span class="input-group-text">\
									<label class="kt-checkbox kt-checkbox--single kt-checkbox--success">\
										<input type="checkbox">\
											<span></span>\
									</label>\
								</span>\
							</div>\
								<input type="text" class="form-control" aria-label="Text input with checkbox">\
							</div>';
					},
				}
			]

		});

		modal.find('#areaSelect').on('change', function () {
			console.log($(this).val().toLowerCase())
			datatable.search($(this).val().toLowerCase(), 'AreaEsame.Id');
		});

		modal.find('#areaSelect').selectpicker();

		// fix datatable layout after modal shown
		datatable.hide();
		var alreadyReloaded = false;
		modal.on('shown.bs.modal', function () {
			if (!alreadyReloaded) {
				var modalContent = $(this).find('.modal-content');
				datatable.spinnerCallback(true, modalContent);

				datatable.reload();

				datatable.on('kt-datatable--on-layout-updated', function () {
					datatable.show();
					datatable.spinnerCallback(false, modalContent);
					datatable.redraw();
				});

				alreadyReloaded = true;
			}
		});
	};
	return {
		// public functions
		init: function () {
			remoteDatatable();
		}
	};
}();

//$('#areaSelect').on('change', function () {
//	$.ajax({
//		url: 'User/GetEsamiArea',
//		data: {idArea:this.id},
//		success: function (response) {

//			console.log(response)
//			//const obj = JSON.parse(response);
//			//var $table = $(".areaSelect1");
//			//$dropdown.append('<option selected="selected" value="-1"> - All - </option>')
//			//$.each(obj, function () {
//			//	$dropdown.append($("<option />").val(this.Id).text(this.Descrizione));
//			//});

//		}
//	});
//});


jQuery(document).ready(function () {
	//areaSelect();
	KTDatatableModal.init();
});