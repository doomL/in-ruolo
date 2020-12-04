"use strict";
// Class definition

var selectedID = [];
var idTitolo;
var idSsd;
var KTDatatableRemoteAjaxDemo = function () {
	// Private functions

	// basic demo
	var subTableTitoli = function (e) {
		$('<div/>').attr('id', 'modal_datatable_ajax_source' + e.data.Id).appendTo(e.detailCell).KTDatatable({
			data: {
				type: 'local',
				source: e.data.prova,
				pageSize: 10,
			},

			// layout definition
			layout: {
				scroll: true,
				height: 300,
				footer: false,

				// enable/disable datatable spinner.
				spinner: {
					type: 1,
					theme: 'default',
				},
			},

			sortable: true,

			// columns definition
			columns: [
				{
					field: 'Descrizione',
					title: 'Esame',
				},
				{
					field: 'Elimina',
					title: 'Elimina',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function () {
						return '\
						<a class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Elimina">\
							<i class="la la-trash"></i>\
						</a>\
						';
					},
				}
			],
		});
	};
	var datatableTitoli = function () {

		var datatable = $('.kt-datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'User/GetTitoli',
						// sample custom headers
						headers: { 'x-my-custokt-header': 'some value', 'x-test-header': 'the value' },
						map: function (raw) {
							// sample data mapping
							var dataSet = raw;
							if (typeof raw.data !== 'undefined') {
								dataSet = raw.data;
							}
							return dataSet;
						},
					},
				},
				pageSize: 10,
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
			},

			// layout definition
			layout: {
				scroll: false,
				footer: false,
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: $('#generalSearch'),
			},

			// columns definition
			columns: [

				{
					field: 'Esami',
					title: 'Piano Di Studi',
					sortable: false,
					width: 50,
					// callback function support for column rendering
					template: function (row) {
						//return '<button type="button" id="' + row.Titolo.Id + '"  data-record-id="' + row.Titolo.Id + '" class="addbuttonTitoli btn btn-outline-brand btn-elevate btn-pill" data-toggle="modal" data-target="#kt_modal_KTDatatable_remote" ><i class="flaticon-menu-1"></i>Esami</button >';
						return '<button type="button" id="' + row.Titolo.Id + '"  data-record-id="' + row.Titolo.Id + '" class="addbuttonTitoli btn btn-info btn-icon btn-circle"><i class="fa fa-th-list"></i>';
					}
				}, {
					field: 'Nome',
					title: 'Nome Titolo',
					sortable: false,
					width: 400,

				}, {
					field: 'Luogo',
					title: 'Luogo',
					sortable: false,
					width: 100,
				}, {
					field: 'Data',
					title: 'Data Conseguimento',
					type: 'date',
					format: 'DD/MM/YYYY',
					sortable: false,
					width: 100,
				}, {
					field: 'Voto',
					title: 'Voto',
					sortable: false,
					width: 50,
				},
				{
					field: 'Lode',
					title: 'Lode',
					sortable: false,
					width: 50,
					// callback function support for column rendering
					template: function (row) {

						var status = {
							1: { 'title': 'Si', 'class': 'kt-badge--success' },
							0: { 'title': 'No', 'class': ' kt-badge--danger' },
						};
						return '<span class="kt-badge ' + status[+row.Lode].class + ' kt-badge--inline kt-badge--pill">' + status[+row.Lode].title + '</span>';
					},
					//}, {
					//	field: 'Type',
					//	title: 'Type',
					//	autoHide: false,
					//	// callback function support for column rendering
					//	template: function (row) {
					//		var status = {
					//			1: { 'title': 'Online', 'state': 'danger' },
					//			2: { 'title': 'Retail', 'state': 'primary' },
					//			3: { 'title': 'Direct', 'state': 'success' },
					//		};
					//		return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state +
					//			'">' +
					//			status[row.Type].title + '</span>';
					//	},
				}, {
					field: 'Actions',
					title: 'Actions',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function () {
						return '\
						<div class="dropdown">\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
								<i class="la la-cog"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a class="dropdown-item" href="#"><i class="la la-edit"></i>Modifica</a>\
							</div>\
						</div>\
						<a class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Elimina">\
							<i class="la la-trash"></i>\
						</a>\
						';
					},
				}],


		});

		$('#kt_form_status').on('change', function () {
			datatable.search($(this).val().toLowerCase(), 'Status');
		});

		$('#kt_form_type').on('change', function () {
			datatable.search($(this).val().toLowerCase(), 'Type');
		});
		datatable.on('click', '[data-record-id]', function () {
			modalSubRemoteDatatable($(this).data('record-id'));
			modalSubRemoteDatatableVo($(this).data('record-id'));
			$('#kt_modal_KTDatatable_remote').modal('show');
		});

		$('#kt_form_status,#kt_form_type').selectpicker();

	};
	var datatableComplementari = function () {
		var datatable1 = $('.kt-datatable1').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'User/GetComplementari',
						// sample custom headers
						headers: { 'x-my-custokt-header': 'some value', 'x-test-header': 'the value' },
						map: function (raw) {
							// sample data mapping
							var dataSet = raw;
							if (typeof raw.data !== 'undefined') {
								dataSet = raw.data;
							}
							return dataSet;
						},
					},
				},
				pageSize: 10,
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
			},

			// layout definition
			layout: {
				scroll: false,
				footer: false,
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: $('#generalSearch'),
			},

			// columns definition
			columns: [
				{
					field: 'RecordID',
					title: '#',
					sortable: false,
					width: 20,
					type: 'number',
					selector: { class: 'kt-checkbox--solid' },
					textAlign: 'center',
				},
				{
					field: 'Esami',
					title: 'Piano Di Studi',
					// callback function support for column rendering
					template: function (row) {
						return '<button data-record-id="' + row.Id + '"type="button" id="' + row.Id + '" class="addbuttonComplementari btn btn-outline-brand btn-elevate btn-pill" data-toggle="modal" data-target="#modal_datatable_ajax_source" ><i class="flaticon-menu-1"></i>Esami</button >';
					}
				}, {
					field: 'Nome',
					title: 'Nome',
				}, {
					field: 'StrTipo',
					title: 'Tipo',
				}, {
					field: 'Luogo',
					title: 'Luogo',

				}, {
					field: 'Data',
					title: 'Data',
					type: 'date',
					format: 'DD/MM/YYYY',
				}, {
					field: 'Ente',
					title: 'Ente',
				}, {
					field: 'Livello',
					title: 'Livello',
					//}, {
					//	field: 'Status',
					//	title: 'Status',
					//	// callback function support for column rendering
					//	template: function (row) {
					//		var status = {
					//			1: { 'title': 'Pending', 'class': 'kt-badge--brand' },
					//			2: { 'title': 'Delivered', 'class': ' kt-badge--danger' },
					//			3: { 'title': 'Canceled', 'class': ' kt-badge--primary' },
					//			4: { 'title': 'Success', 'class': ' kt-badge--success' },
					//			5: { 'title': 'Info', 'class': ' kt-badge--info' },
					//			6: { 'title': 'Danger', 'class': ' kt-badge--danger' },
					//			7: { 'title': 'Warning', 'class': ' kt-badge--warning' },
					//		};
					//		return '<span class="kt-badge ' + status[row.Status].class + ' kt-badge--inline kt-badge--pill">' + status[row.Status].title + '</span>';
					//	},
					//}, {
					//	field: 'Type',
					//	title: 'Type',
					//	autoHide: false,
					//	// callback function support for column rendering
					//	template: function (row) {
					//		var status = {
					//			1: { 'title': 'Online', 'state': 'danger' },
					//			2: { 'title': 'Retail', 'state': 'primary' },
					//			3: { 'title': 'Direct', 'state': 'success' },
					//		};
					//		return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state +
					//			'">' +
					//			status[row.Type].title + '</span>';
					//	},
				}, {
					field: 'Actions',
					title: 'Actions',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function () {
						return '\
						<div class="dropdown">\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
								<i class="la la-cog"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a class="dropdown-item" href="#"><i class="la la-edit"></i>Modifica</a>\
							</div>\
						</div>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" id="trash"  title="Elimina">\
							<i class="la la-trash"></i>\
						</a>\
					';
					},
				}],

		});

		$('#kt_form_status').on('change', function () {
			datatable.search($(this).val().toLowerCase(), 'Status');
		});

		$('#kt_form_type').on('change', function () {
			datatable.search($(this).val().toLowerCase(), 'Type');
		});
		$('#kt_form_status,#kt_form_type').selectpicker();
	}
	var subTableEsami = function (e) {
		$('<div/>').attr('id', 'modal_datatable_ajax_source' + e.data.Id).appendTo(e.detailCell).KTDatatable({
			data: {
				type: 'local',
				source: e.data.prova,
				pageSize: 10,
			},

			// layout definition
			layout: {
				scroll: true,
				height: 300,
				footer: false,

				// enable/disable datatable spinner.
				spinner: {
					type: 1,
					theme: 'default',
				},
			},

			sortable: true,

			// columns definition
			columns: [
				{
					field: 'Descrizione',
					title: 'Esame',
				},
				{
					field: 'Elimina',
					title: 'Elimina',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function () {
						return '\
						<a class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Elimina">\
							<i class="la la-trash"></i>\
						</a>\
						';
					},
				}
			],
		});
	};
	var modalSubRemoteDatatable = function (id) {
		idTitolo = id;
		var modal = $('#kt_modal_KTDatatable_remote');
		var el = $('#modal_datatable_ajax_source');
		var jsonEsami;
		$.ajax({
			url: 'User/GetSsdUtente',
			data: { idTitolo: id },
			async: false,
			success: function (response) {
				jsonEsami = JSON.parse(response);
				console.log(jsonEsami)
			}
		});
		var datatable = el.KTDatatable({

			//localData
			data: {
				type: 'local',
				source: jsonEsami,
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

			//detail: {
			//	title: 'Load sub table',
			//	content: subTableEsami,
			//},
			search: {
				input: modal.find('#examSearch'),
				delay: 400,
			},

			// columns definition
			columns: [
				{
					field: 'Esami',
					title: 'Modifica Esami',
					// callback function support for column rendering
					template: function (row) {
						return '<button type="button" name="' + idTitolo + '" id="' + row.Id + '"data-toggle="modal" data-target="#ModalAddEsami" class="currentExam btn btn-outline-brand btn-elevate btn-pill"><i class="fa fa-tasks"></i>Esami</button >';
					}
				},
				{
					field: 'Descrizione',
					title: 'Descrizione',
					sortable: false,
				},
				{
					field: 'Codice',
					title: 'Codice',
					sortable: false,
				},
				{
					field: 'Risultato',
					title: 'Cfu Totali',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function (row) {
						return '\
							<div class="input-group">\
							<div class="input-group-prepend">\
								<span class="input-group-text">\
									<label class="kt-checkbox kt-checkbox--single kt-checkbox--success">\
										<input disabled class="checkboxExam" id="'+ row.Id + '" name = "esamiCheckbox" type = "checkbox"' + row.Sostenuto + ' >\
											<span></span>\
									</label>\
								</span>\
							</div>\
								<input disabled type="text" id="cfu'+ row.Id + '" name="esamiInput" class="form-control" value="' + row.Cfu + '" aria-label="Text input with checkbox">\
							</div>';
					},
				}
			]

		});

		modal.find('#areaSelect').on('change', function () {
			$(':checkbox[name="esamiCheckbox"]:checked').each(function () {
				selectedID.push(this.id);
			});

			datatable.search($(this).val().toLowerCase(), 'AreaEsame.Id');
			for (var i = 0; i < selectedID.length; i++)
				$('#' + selectedID[i]).prop('checked', true);

		});

		modal.find('#areaSelect').selectpicker();

		// fix datatable layout after modal shown
		//datatable.hide();
		modal.on('shown.bs.modal', function () {
			var modalContent = $(this).find('#esamiModalId');
			//datatable.spinnerCallback(true, modalContent);
			datatable.redraw();
			datatable.show();
			//datatable.spinnerCallback(false, modalContent);
			//datatable.on('kt-datatable--on-layout-updated', function () {
			//});
		}).on('hidden.bs.modal', function () {
			selectedID = [];
			$("#areaSelect").prop("selectedIndex", 0);
			el.KTDatatable('destroy');
		});


		//datatable.hide();
		//var alreadyReloaded = false;
		//modal.on('shown.bs.modal', function () {
		//	if (!alreadyReloaded) {
		//		var modalContent = $(this).find('.modal-content');
		//		datatable.spinnerCallback(true, modalContent);

		//		datatable.reload();

		//		datatable.on('kt-datatable--on-layout-updated', function () {
		//			datatable.show();
		//			datatable.spinnerCallback(false, modalContent);
		//			datatable.redraw();
		//		});

		//		alreadyReloaded = true;
		//	}
		//});
	};
	var subTableVo = function (e) {
		$('<div/>').attr('id', 'modal_datatable_ajax_source-vo' + e.data.Id).appendTo(e.detailCell).KTDatatable({
			data: {
				type: 'local',
				source: e.data.Equivalenti,
				pageSize: 10,
			},

			// layout definition
			layout: {
				scroll: true,
				height: 300,
				footer: false,

				// enable/disable datatable spinner.
				spinner: {
					type: 1,
					theme: 'default',
				},
			},

			sortable: true,

			// columns definition
			columns: [
				{
					field: 'Nome',
					title: 'Equivalenti',
				},

				//{
				//	field: 'Risultato',
				//	title: 'Sostenuto/Durata',
				//	sortable: false,
				//	overflow: 'visible',
				//	autoHide: false,
				//	template: function (row) {
				//		return '\
				//			<div class="input-group">\
				//			<div class="input-group-prepend">\
				//				<span class="input-group-text">\
				//					<label class="kt-checkbox kt-checkbox--single kt-checkbox--success">\
				//						<input class="checkboxExamVo" id="'+ row.Id + '" name = "esamiCheckbox" type = "checkbox"' + row.Sostenuto + ' >\
				//							<span></span>\
				//					</label>\
				//				</span>\
				//			</div>\
				//				<select class="form-control" name="Semestri" id="semestri'+ row.Id + '" disabled>\
				//					<option value="0"> -- Seleziona Durata -- </option>\
				//					<option value="6">Un Semestre</option>\
				//					<option value="12">Una Annualita\'</option>\
				//					<option value="24">Due Annualita\'</option>\
				//					<option value="36">Tre Annualita\'</option>\
				//					<option value="48">Tre Annualita\'</option>\
				//				</select >\
				//			</div>';
				//	},
				//}
			],
		});
	};
	var modalSubRemoteDatatableVo = function (id) {
		idTitolo = id;
		var modal = $('#kt_modal_KTDatatable_remote');
		var el = $('#modal_datatable_ajax_source-vo');
		var jsonEsami;
		$.ajax({
			url: 'User/GetEsamiUtenteJsonVo',
			data: { idTitolo: id },
			async: false,
			success: function (response) {
				jsonEsami = JSON.parse(response);
				console.log(jsonEsami)
			}
		});
		var datatable = el.KTDatatable({

			//localData
			data: {
				type: 'local',
				source: jsonEsami,
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

			detail: {
				title: 'Load sub table',
				content: subTableVo,
			},
			search: {
				input: modal.find('#examVoSearch'),
				delay: 400,
			},

			// columns definition
			columns: [
				{
					field: 'Id',
					title: 'Equivalenti',
					sortable: false,
					//width: 30,
					textAlign: 'center',
				},
				{
					field: 'Descrizione',
					title: 'Nome',
					//width: 400,
					sortable: true,
				},
				{
					field: 'Esami',
					title: 'Aggiungi Esame VO',
					// callback function support for column rendering
					template: function (row) {
						return '<button type="button" name="' + idTitolo + '" id="' + row.Id + '"data-toggle="modal" data-target="#ModalAddEsamiVo2" data-id="' + row.Id + '" class="currentExamVo btn btn-outline-brand btn-elevate btn-pill"><i class="fa fa-tasks"></i>Esami</button >';
					}
				},
				{
					field: 'Risultato',
					title: 'Sostenuto/Durata',
					sortable: false,
					overflow: 'visible',
					autoHide: false,
					template: function (row) {
						return '\
							<div class="input-group">\
							<div class="input-group-prepend">\
								<span class="input-group-text">\
									<label class="kt-checkbox kt-checkbox--single kt-checkbox--success">\
										<input class="checkboxExamVo" id="'+ row.Id + '" name = "esamiCheckbox" type = "checkbox"' + row.Sostenuto + ' >\
											<span></span>\
									</label>\
								</span>\
							</div>\
								<select class="form-control semestri" name="Semestri" id="semestri'+ row.Id + '" disabled>\
									<option value="0"> -- Seleziona Durata -- </option>\
									<option value="6">Un Semestre</option>\
									<option value="12">Una Annualita\'</option>\
									<option value="24">Due Annualita\'</option>\
									<option value="36">Tre Annualita\'</option>\
									<option value="48">Tre Annualita\'</option>\
								</select >\
							</div>';
					},
				}
			]

		});




		// fix datatable layout after modal shown
		//datatable.hide();
		modal.on('shown.bs.modal', function () {
			var modalContent = $(this).find('#esamiModalId');
			//datatable.spinnerCallback(true, modalContent);
			datatable.redraw();
			datatable.show();
			//datatable.spinnerCallback(false, modalContent);
			//datatable.on('kt-datatable--on-layout-updated', function () {
			//});
		}).on('hidden.bs.modal', function () {
			selectedID = [];
			$("#areaSelect").prop("selectedIndex", 0);
			el.KTDatatable('destroy');
		});


		//datatable.hide();
		//var alreadyReloaded = false;
		//modal.on('shown.bs.modal', function () {
		//	if (!alreadyReloaded) {
		//		var modalContent = $(this).find('.modal-content');
		//		datatable.spinnerCallback(true, modalContent);

		//		datatable.reload();

		//		datatable.on('kt-datatable--on-layout-updated', function () {
		//			datatable.show();
		//			datatable.spinnerCallback(false, modalContent);
		//			datatable.redraw();
		//		});

		//		alreadyReloaded = true;
		//	}
		//});
	};

	return {
		// public functions
		init: function () {
			datatableTitoli();
			datatableComplementari();

		},
	};
}();

function FillTitolo() {
	$.ajax({
		url: 'User/GetTitoliCategoria',
		data: { idCategoria: $("#categoriaTitolo").val() },
		success: function (response) {
			const obj = JSON.parse(response);
			var $dropdown = $("#select2-multiple");
			$("#select2-multiple").empty().append('<option selected="selected" value="-1"> - Seleziona Titolo - </option>')
			$.each(obj, function () {
				$dropdown.append($("<option />").val(this.Id).text(this.Descrizione));
			});
		}
	});
}

$("#salvaTitolo").click(function () {
	$.ajax({
		url: 'User/PutTitolo',
		data: { idCategoria: $("#categoriaTitolo").val(), nomeCategoria: $("#categoriaTitolo option:selected").text(), titolo: $("#select2-multiple").val(), nomeTitolo: $("#select2-multiple option:selected").text(), luogo: $("#luogo").val(), data: $("#yearpicker").val(), voto: $("#voto").val(), lode: $("#lode").is(":checked") },
		success: function (response) {
			swal.fire({
				title: "Successo!",
				text: "Il Titolo e' stato aggiunto!",
				type: "success",
				timer: 2000,
				showConfirmButton: false
			});
			window.setTimeout(function () {
				location.reload();
			}, 2000);

		}
	});
});

$("#salvaComplementare").click(function () {
	$.ajax({
		url: 'User/PutComplementare',
		data: { tipo: $("#categoriaCompl").val(), strTipo: $("#categoriaCompl option:selected").text(), nome: $("#nomeComplementare").val(), luogo: $("#luogoComplementare").val(), data: $("#yearpickerCompl").val(), ente: $("#enteComplementare").val(), livello: $("#livelloComplementare").val() },
		success: function (response) {
			swal.fire({
				title: "Successo!",
				text: "Il Complementare e' stato aggiunto!",
				type: "success",
				timer: 2000,
				showConfirmButton: false
			});
			window.setTimeout(function () {
				location.reload();
			}, 2000);
			el.KTDatatable('destroy');
		}
	});
});

var divId = -1;
$('body').on('click', '#addExam', function () {
	divId++
	var examModal = $("#examBody");
	examModal.append(' <div class="form-group" id="es' + divId + '">\
		<div class="row">\
			<select id="selectesame'+ divId + '" class="col-md-6 form-control select2-single">\
			   <option selected="selected" value="-1"> -- Esame -- </option>\
			</select>\
			<input type="number" class="col-md-2 offset-1 form-control" id="cfu" placeholder="CFU">\
			<a class="col-md-1 btn btn-sm btn-clean btn-icon btn-icon-md" title="Elimina" id="'+ divId + '" onClick="eliminaEsame(this.id)">\
				<i class="la la-trash"></i>\
			</a>\
		</div>\
 </div >')
	$.ajax({
		url: 'User/GetEsami',
		success: function (response) {
			//console.log(response)
			const obj = JSON.parse(response);
			var selectId = "selectesame" + divId;
			var $dropdown = $("#" + selectId);
			$dropdown.append('<option selected="selected" value="-1"> - All - </option>')
			$.each(obj, function () {
				$dropdown.append($("<option />").val(this.Id).text(this.Codice + " - " + this.Descrizione));
			});

		}
	});

});



$("#salvaEsami").click(function () {
	var array = [];
	var i = 0;
	$('#tableBody tr.new').each(function () {
		var obj = new Object();
		var data1 = $(this).find("td:eq(0) input[type='text']").val();
		var data2 = $(this).find("td:eq(1) input[type='number']").val();
		obj.name = data1
		obj.cfu = data2
		array[i] = obj
		i++
	});
	var esami = JSON.stringify(array);
	$.ajax({
		url: 'User/PutEsami',
		data: { esami: esami, idTitolo: idTitolo, idSsd: idSsd },
		success: function (response) {
			swal.fire({
				title: "Successo!",
				text: "Esami Aggiunti!",
				type: "success",
				timer: 2000,
				showConfirmButton: false
			});
			window.setTimeout(function () {
				$('#ModalAddEsami').modal('toggle');
			}, 2000);

		}
	});
	alert(idSsd)
});


var idVo;
$('#ModalAddEsamiVo').on('shown.bs.modal', function (event) {

	// The reference tag is your anchor tag here
	var reference_tag = $(event.relatedTarget);
	idVo = reference_tag.data('id')
})

$("#salvaEsameVo").click(function () {
	var obj = new Object();
	$('#tableBodyVo tr').each(function () {
		var data1 = $(this).find("td:eq(0) input[type='text']").val();
		var data2 = $(this).find("td:eq(1) select").val();
		obj.name = data1
		obj.cfu = data2

	});
	$.ajax({
		url: 'User/PutEsamiVo',
		data: {cfu: obj.cfu,name:obj.name, idTitolo: idTitolo, idSsd: idVo },
		success: function (response) {
			swal.fire({
				title: "Successo!",
				text: "Esame Aggiunto!",
				type: "success",
				timer: 2000,
				showConfirmButton: false
			});
			window.setTimeout(function () {
				$('#ModalAddEsamiVo').modal('toggle');
			}, 2000);

		}
	});
});


$('body').on('change', '.checkboxExamVo', function () {
	var id = this.id
	if ($('#semestri' + id).is(':disabled')) {
		$('#semestri' + id).prop('disabled', false);
		if ($('#semestri' + id).val() != "0") {
			alert("carico esame con CFU" + $('#semestri' + id).val() + " e codice" + id)
			$.ajax({
				url: 'User/PutEsamiVo',
				data: { idEsame: id, cfu: $('#semestri' + id).val(), idTitolo: idTitolo},
				success: function (response) {
					swal.fire({
						title: "Successo!",
						text: "Esami Aggiunti!",
						type: "success",
						timer: 2000,
						showConfirmButton: false
					});
					window.setTimeout(function () {
						$('#ModalAddEsami').modal('toggle');
					}, 2000);

				}
			});
		}
	}
	else {
		$('#semestri' + id).prop('disabled', true);
		if ($('#semestri' + id).val() != "0") {
			alert("cancellato")
			$.ajax({
				url: 'User/DeleteEsamiVo',
				data: { idEsame: id, cfu: $('#semestri' + id).val(), idTitolo: idTitolo },
				success: function (response) {
					swal.fire({
						title: "Successo!",
						text: "Esami Aggiunti!",
						type: "success",
						timer: 2000,
						showConfirmButton: false
					});
					window.setTimeout(function () {
						$('#ModalAddEsami').modal('toggle');
					}, 2000);

				}
			});
		}
	}
})

$('body').on('change', '.semestri', function () {
	var id = this.id
	console.log($("#" + id).val())
	if ($("#" + id).val() == "0") {
		alert("cancellato")
		$.ajax({
			url: 'User/DeleteEsamiVo',
			data: { idEsame: id, cfu: $('#semestri' + id).val(), idTitolo: idTitolo, idSsd: idSsd },
			success: function (response) {
				swal.fire({
					title: "Successo!",
					text: "Esami Aggiunti!",
					type: "success",
					timer: 2000,
					showConfirmButton: false
				});
				window.setTimeout(function () {
					$('#ModalAddEsami').modal('toggle');
				}, 2000);

			}
		});
	}
	else {
		alert("carico esame")
		$.ajax({
			url: 'User/PutEsamiVo',
			data: { idEsame: id, cfu: $('#semestri' + id).val(), idTitolo: idTitolo, idSsd: idSsd },
			success: function (response) {
				swal.fire({
					title: "Successo!",
					text: "Esami Aggiunti!",
					type: "success",
					timer: 2000,
					showConfirmButton: false
				});
				window.setTimeout(function () {
					$('#ModalAddEsami').modal('toggle');
				}, 2000);

			}
		});
	}
})

//$('body').on('click', '.addbuttonTitoli', function (e) {
//	window.console.log(this.id, e);
//	$("#examBody").empty();
//	$("#examBody").append('<div class="form-group">\
//		<button type="button" class="btn btn-primary" id="addExam">+</button>\
//	</div>')
//	divId = 0
//	$.ajax({
//		url: 'User/GetEsamiTitolo',
//		data: { idTitolo: this.id },
//		success: function (response) {
//			console.log(response)
//			var json = JSON.parse(response)
//			console.log(json)
//			var examModal = $("#examBody");
//			for (var i = 0; i < json.length; i++) {

//				examModal.append(' <div class="form-group" id="es' + json[i].Id + '">\
//								<div class="row">\
//				<input disabled class="col-md-6 form-control" value="'+ json[i].Descrizione + '" type="text">\
//			<input type="number" disabled class="col-md-2 offset-1 form-control" id="cfu" placeholder="CFU" value="'+ json[i].Cfu + '">\
//			<a class="col-md-1 btn btn-sm btn-clean btn-icon btn-icon-md" title="Elimina" id="'+ json[i].Id + '" onClick="eliminaEsame(this.id)">\
//				<i class="la la-trash"></i>\
//			</a>\
//		</div>\
// </div >')
//			}
//		}
//	});
//});


$('body').on('click', '.addbuttonComplementari', function (e) {
	window.console.log(this.id, e);
	$("#examBody").empty();
	$("#examBody").append('<div class="form-group">\
		<button type="button" class="btn btn-primary" id="addExam">+</button>\
	</div>')
	divId = 0
});


function EnumComplementare() {
	$.ajax({
		url: 'User/GetEnumComplementare',
		success: function (response) {
			const obj = JSON.parse(response);
			var $dropdown = $("#categoriaCompl");
			$dropdown.append('<option selected="selected" value="-1"> - Seleziona Tipo - </option>')
			$.each(obj, function () {
				$dropdown.append($("<option />").val(this.Id).text(this.Descrizione));
			});

		}
	});
}
function EnumTitoli() {
	$.ajax({
		url: 'User/GetEnumTitoli',
		success: function (response) {
			const obj = JSON.parse(response);
			var $dropdown = $("#categoriaTitolo");
			$dropdown.append('<option selected="selected" value="-1"> - Seleziona Categoria- </option > ')
			$.each(obj, function () {
				$dropdown.append($("<option />").val(this.Id).text(this.Nome));
			});

		}
	});
}
var counter = 0;

$('body').on('click', '.currentExam', function (e) {
	window.console.log(this.id, e);
	idSsd = this.id
	$("#tableBody").empty();
	var idT = $('#' + this.id).attr('name')
	var jsonEsami;
	$.ajax({
		url: 'User/GetEsamiUtente',
		data: { idSsd: idSsd, idTitolo: idT },
		async: false,
		success: function (response) {
			jsonEsami = JSON.parse(response);
			console.log(jsonEsami)
		}
	});
	for (var i = 0; i < jsonEsami.length; i++) {
		var newRow = $("<tr class='row'>");
		var cols = "";
		//aggiungere typeahead
		cols += '<td class="col-md-8"><input type="text" disabled value="' + jsonEsami[i].NomeEsame + '" class="form-control" name = "name' + counter + '" /></td > ';
		cols += '<td class="col-md-2"><input type="number" disabled value="' + jsonEsami[i].Cfu + '" class="form-control" name="cfu' + counter + '"/></td>';
		cols += '<td class="col-md-1"><button type="button" id="' + jsonEsami[i].IdEsame + '" class="ibtnDel btn btn-danger btn-icon"><i class="fa fa-trash"></i></button></td>';
		newRow.append(cols);
		$("table.order-list").append(newRow);
		counter++;
	}

});


$("#addrow").on("click", function () {
	var newRow = $("<tr class='row new'>");
	var cols = "";

	//aggiungere typeahead
	cols += '<td class="col-md-8"><input type="text" class="form-control" name="name' + counter + '"/></td>';
	cols += '<td class="col-md-2"><input type="number" class="form-control" name="cfu' + counter + '"/></td>';

	cols += '<td class="col-md-1"><button type="button" class="ibtnDel btn btn-danger btn-icon"><i class="fa fa-trash"></i></button></td>';
	newRow.append(cols);
	$("table.order-list").append(newRow);
	counter++;
});



$("table.order-list").on("click", ".ibtnDel", function (event) {

	alert(this.id)
	var idEsame = this.id
	swal.fire({
		title: 'Vuoi Cancellare Questo Esame?',
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Si',
		cancelButtonText: 'Annulla',
		reverseButtons: true
	}).then(function (result) {
		if (result.value) {
			$.ajax({
				url: 'User/DeleteEsami',
				data: { idEsame: idEsame },
				async: false,
				success: function (response) {

					swal.fire(
						'Eliminato!',
						'Il Tuo Esame � stato cancellato.',
						'success'
					)
				}
			});
		}
	});
	$(this).closest("tr").remove();
	counter -= 1

});





//--------------Esami VO-----------------------
var counter = 0;

$('body').on('click', '.currentExam', function (e) {
	window.console.log(this.id, e);
	idSsd = this.id
	$("#tableBody").empty();
	var idT = $('#' + this.id).attr('name')
	var jsonEsami;
	$.ajax({
		url: 'User/GetEsamiUtente',
		data: { idSsd: idSsd, idTitolo: idT },
		async: false,
		success: function (response) {
			jsonEsami = JSON.parse(response);
			console.log(jsonEsami)
		}
	});
	for (var i = 0; i < jsonEsami.length; i++) {
		var newRow = $("<tr class='row'>");
		var cols = "";
		//aggiungere typeahead
		cols += '<td class="col-md-8"><input type="text" disabled value="' + jsonEsami[i].NomeEsame + '" class="form-control" name = "name' + counter + '" /></td > ';
		cols += '<td class="col-md-2"><input type="number" disabled value="' + jsonEsami[i].Cfu + '" class="form-control" name="cfu' + counter + '"/></td>';
		cols += '<td class="col-md-1"><button type="button" id="' + jsonEsami[i].IdEsame + '" class="ibtnDel btn btn-danger btn-icon"><i class="fa fa-trash"></i></button></td>';
		newRow.append(cols);
		$("table.order-list").append(newRow);
		counter++;
	}

});


$("#addrow").on("click", function () {
	var newRow = $("<tr class='row new'>");
	var cols = "";

	//aggiungere typeahead
	cols += '<td class="col-md-8"><input type="text" class="form-control" name="name' + counter + '"/></td>';
	cols += '<td class="col-md-2"><input type="number" class="form-control" name="cfu' + counter + '"/></td>';

	cols += '<td class="col-md-1"><button type="button" class="ibtnDel btn btn-danger btn-icon"><i class="fa fa-trash"></i></button></td>';
	newRow.append(cols);
	$("table.order-list").append(newRow);
	counter++;
});



$("table.order-list").on("click", ".ibtnDel", function (event) {

	alert(this.id)
	var idEsame = this.id
	swal.fire({
		title: 'Vuoi Cancellare Questo Esame?',
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Si',
		cancelButtonText: 'Annulla',
		reverseButtons: true
	}).then(function (result) {
		if (result.value) {
			$.ajax({
				url: 'User/DeleteEsami',
				data: { idEsame: idEsame },
				async: false,
				success: function (response) {

					swal.fire(
						'Eliminato!',
						'Il Tuo Esame � stato cancellato.',
						'success'
					)
				}
			});
		}
	});
	$(this).closest("tr").remove();
	counter -= 1

});

jQuery(document).ready(function () {
	KTDatatableRemoteAjaxDemo.init();
	EnumComplementare()
	EnumTitoli()
});