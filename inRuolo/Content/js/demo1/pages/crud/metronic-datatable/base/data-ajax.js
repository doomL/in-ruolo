"use strict";
// Class definition

var selectedID = [];
var idTitolo;
var KTDatatableRemoteAjaxDemo = function () {
	// Private functions

	// basic demo
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
					field: 'Id',
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
						//return '<button type="button" id="' + row.Titolo.Id + '"  data-record-id="' + row.Titolo.Id + '" class="addbuttonTitoli btn btn-outline-brand btn-elevate btn-pill" data-toggle="modal" data-target="#kt_modal_KTDatatable_remote" ><i class="flaticon-menu-1"></i>Esami</button >';
						return '<button type="button" id="' + row.Titolo.Id + '"  data-record-id="' + row.Titolo.Id + '" class="addbuttonTitoli btn btn-outline-brand btn-elevate btn-pill"><i class="flaticon2-document"></i>Esami</button >';
					}
				}, {
					field: 'Nome',
					title: 'Nome Titolo',
				}, {
					field: 'Luogo',
					title: 'Luogo',
				}, {
					field: 'Data',
					title: 'Data Conseguimento',
					type: 'date',
					format: 'DD/MM/YYYY',
				}, {
					field: 'Voto',
					title: 'Voto',
				},
				{
					field: 'Lode',
					title: 'Lode',
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
	var modalSubRemoteDatatable = function (id) {
		idTitolo = id;
		var modal = $('#kt_modal_KTDatatable_remote');
		var el = $('#modal_datatable_ajax_source');
		var jsonEsami;
		$.ajax({
			url: 'User/GetEsamiUtenteJson',
			data: { idTitolo: id },
			async: false,
			success: function (response) {
				jsonEsami = JSON.parse(response);
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

			search: {
				input: modal.find('#examSearch'),
				delay: 400,
			},

			// columns definition
			columns: [
				 {
					field: 'Codice',
					title: 'Codice',
					sortable: false,
				}, {
					field: 'Descrizione',
					title: 'Nome',
					sortable: false,
				},
				{
					field: 'Risultato',
					title: 'Sostenuto/Cfu',
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
										<input class="checkboxExam" id="'+ row.Id+'" name = "esamiCheckbox" type = "checkbox"'+ row.Sostenuto + ' >\
											<span></span>\
									</label>\
								</span>\
							</div>\
								<input type="text" id="cfu'+ row.Id +'" name="esamiInput" class="form-control" value="'+ row.Cfu + '" aria-label="Text input with checkbox">\
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
	var subTableInit = function (e) {
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
				}, ],
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
				content: subTableInit,
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
					field: 'Risultato',
					title: 'Sostenuto',
					sortable: false,
					overflow: 'visible',
					autoHide: false,
					template: function (row) {
						return '\
							<div class="input-group">\
							<div class="input-group-prepend">\
								<span class="input-group-text">\
									<label class="kt-checkbox kt-checkbox--single kt-checkbox--success">\
										<input class="checkboxExam" id="'+ row.Id + '" name = "esamiCheckbox" type = "checkbox"' + row.Sostenuto + ' >\
											<span></span>\
									</label>\
								</span>\
							</div>\
								<input type="text" id="cfu'+ row.Id + '" name="esamiInput" class="form-control" value="' + row.Cfu + '" aria-label="Text input with checkbox">\
							</div>';
					},
				}
			]

		});

	


		//// fix datatable layout after modal shown
		////datatable.hide();
		//modal.on('shown.bs.modal', function () {
		//	var modalContent = $(this).find('#esamiModalId');
		//	//datatable.spinnerCallback(true, modalContent);
		//	datatable.redraw();
		//	datatable.show();
		//	//datatable.spinnerCallback(false, modalContent);
		//	//datatable.on('kt-datatable--on-layout-updated', function () {
		//	//});
		//}).on('hidden.bs.modal', function () {
		//	selectedID = [];
		//	$("#areaSelect").prop("selectedIndex", 0);
		//	el.KTDatatable('destroy');
		//});


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



$("#salvaPianoDiStudi").click(function () {
	var esami=[];
	$(':checkbox[name="esamiCheckbox"]:checked').each(function () {
		selectedID.push(this.id);

		var SelectedEsame = { id: this.id, cfu:$("#cfu"+this.id).val()}
		esami.push(SelectedEsame)
	});

	
	$.ajax({
		url: 'User/PutEsami',
		data: { esami: JSON.stringify(esami),idTitolo:idTitolo},
		success: function (response) {
			swal.fire({
				title: "Successo!",
				text: "Il Titolo e' stato aggiunto!",
				type: "success",
				timer: 2000,
				showConfirmButton: false
			});
			window.setTimeout(function () {
			$('#kt_modal_KTDatatable_remote').modal('toggle');
			}, 2000);

		}
	});
});

$('.checkboxExam').mousedown(function () {
	alert("checkbox");
})
function eliminaEsame(id) {
	$("#es" + id).remove();
	$.ajax({
		url: 'User/DeleteEsame',
		data: { id: id },
		success: function (response) {

		}
	});
}

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

jQuery(document).ready(function () {
	KTDatatableRemoteAjaxDemo.init();
	EnumComplementare()
	EnumTitoli()
});