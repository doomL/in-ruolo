"use strict";
// Class definition

var selectedID = [];
var idFormazione;
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
						url: 'Formazione/GetComplementari',
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

						var status = {
							1: {'disabled': '','style':'' },
							0: {'disabled': 'disabled', 'style': 'style="background-color:gray;"'},
						};
						//return '<button type="button" id="' + row.Titolo.Id + '"  data-record-id="' + row.Titolo.Id + '" class="addbuttonTitoli btn btn-outline-brand btn-elevate btn-pill" data-toggle="modal" data-target="#kt_modal_KTDatatable_remote" ><i class="flaticon-menu-1"></i>Esami</button >';
						return '<button ' + status[+row.ContieneSsd].disabled + ' type="button" id="' + row.Id + '"  data-record-id="' + row.Id + '" class="addbuttonTitoli btn btn-info btn-icon btn-circle" '+status[+row.ContieneSsd].style+'><i class="fa fa-th-list"></i>';
					}
				}, {
					field: 'Nome',
					title: 'Nome Complementare',
					sortable: false,
					width: 400,

				},
				{
					field: 'StrTipo',
					title: 'Tipo',
					sortable: false,
				},{
					field: 'Luogo',
					title: 'Luogo',
					sortable: false,
					width: 100,
				}, {
					field: 'Data',
					title: 'Data',
					type: 'date',
					format: 'DD/MM/YYYY',
					sortable: false,
					width: 100,
				}, {
					field: 'Ente',
					title: 'Ente',
				}, {
					field: 'Livello',
					title: 'Livello',
				
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
		idFormazione = id;
		var modal = $('#kt_modal_KTDatatable_remote');
		var el = $('#modal_datatable_ajax_source');
		var jsonEsami;
		$.ajax({
			url: 'Formazione/GetSsdUtente',
			data: { idFormazione:id,idTitolo: -1 },
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
						return '<button type="button" name="' + idFormazione + '" id="' + row.Id + '"data-toggle="modal" data-target="#ModalAddEsami" class="currentExam btn btn-outline-brand btn-elevate btn-pill"><i class="fa fa-tasks"></i>Esami</button >';
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
				source: e.data.EquivalenteTabs,
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

				{
					field: 'Risultato',
					title: 'Sostenuto/Durata',
					sortable: false,
					overflow: 'visible',
					autoHide: false,
					template: function (row) {
						var status = {
							0: { 'text': '-- Seleziona Durata --', },
							6: { 'text': 'Un Semestre', },
							12: { 'text': 'Una Annualita', },
							24: { 'text': 'Due Annualita', },
							36: { 'text': 'Tre Annualita', },
							48: { 'text': 'Quattro Annualita', },
						};
						return '\
							<div class="input-group">\
							<div class="input-group-prepend">\
								<span class="input-group-text">\
									<label class="kt-checkbox kt-checkbox--single kt-checkbox--success">\
										<input class="checkboxExamVo" id="checkbox'+ row.Id + '" name = "esamiCheckbox" type = "checkbox"' + row.Sostenuto + ' >\
											<span></span>\
									</label>\
								</span>\
							</div>\
								<select value="'+ row.Cfu + '" class="form-control semestri" name="Semestri" id="semestri' + row.Id + '" disabled>\
									<option value="'+ row.Cfu + '" selected >' + status[row.Cfu].text + '</option>\
									<option value="6">Un Semestre</option>\
									<option value="12">Una Annualita\'</option>\
									<option value="24">Due Annualita\'</option>\
									<option value="36">Tre Annualita\'</option>\
									<option value="48">Quattro Annualita\'</option>\
								</select >\
							</div>';
					},
				}
			],
		});
	};
	var modalSubRemoteDatatableVo = function (id) {
		idFormazione = id;
		var modal = $('#kt_modal_KTDatatable_remote');
		var el = $('#modal_datatable_ajax_source-vo');
		var jsonEsami;
		$.ajax({
			url: 'Formazione/GetEsamiUtenteJsonVo',
			data: { idFormazione: id, idTitolo: -1 },
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
					title: 'Equivalenti/Esami Aggiunti',
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
						return '<button type="button" name="' + idFormazione + '" id="' + row.Id + '"data-toggle="modal" data-target="#ModalAddEsamiVo" data-id="' + row.Id + '" class="currentExamVo btn btn-outline-brand btn-elevate btn-pill"><i class="fa fa-tasks"></i>Esami</button >';
					}
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

		},
	};
}();

function FillTitolo() {
	$.ajax({
		url: 'Formazione/GetTitoliCategoria',
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
		url: 'Formazione/PutTitolo',
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
		url: 'Formazione/PutComplementare',
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
		url: 'Formazione/GetEsami',
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
	alert(idFormazione)
	$.ajax({
		url: 'Formazione/PutEsami',
		data: { esami: esami,idTitolo:0, idFormazione: idFormazione, idSsd: idSsd },//TODO fixare problema idFormazione=0
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
	var $dropdown = $(".equivalenti");
	$dropdown.empty();
	var reference_tag = $(event.relatedTarget);
	idVo = reference_tag.data('id')
	$.ajax({
		url: 'Formazione/GetEquivalenti',
		data: { idSsd: idVo },
		success: function (response) {
			const obj = JSON.parse(response);
			$.each(obj, function () {
				$dropdown.append($("<option />").val(this.Id).text(this.Nome));
			});
		}
	});
})

$("#salvaEsameVo").click(function () {
	var obj = new Object();
	$('#tableBodyVo tr').each(function () {
		var data1 = $(this).find("td:eq(0) input[type='text']").val();
		var data2 = $(this).find("td:eq(1) select").val();
		obj.name = data1
		obj.cfu = data2

	});
	var data3 = $(".equivalenti").val();
	obj.idSsd = data3
	$.ajax({
		url: 'Formazione/PutEsamiVo',
		data: { cfu: obj.cfu, name: obj.name, idTitolo: 0, idFormazione: idFormazione, idSsd: obj.idSsd },
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
	var id = this.id.substring('checkbox'.length)
	console.log($("#checkbox" + id))
	//alert($("#checkbox" + id).is(':checked'))
	if ($('#semestri' + id).is(':disabled')) {
		if (!$("#checkbox" + id).is(':checked')) {
			//alert("cancello esame")
			//$("#semestri"+id+" option:selected").remove();
			//$("#semestri" + id).val("0").change();
			//$('select[name=stuff] option:first').html("abcd");
			$.ajax({
				url: 'Formazione/DeleteEsamiVo',
				data: { idEsame: id },
				success: function (response) {
					swal.fire({
						title: "Successo!",
						text: "Esame Cancellato!",
						type: "success",
						timer: 2000,
						showConfirmButton: false
					});
					window.setTimeout(function () {
						$('#kt_modal_KTDatatable_remote').modal('hide');
						$('#kt_modal_KTDatatable_remote').on('hidden.bs.modal', function (e) {
							console.log("modal2")
							location.reload();
						})
						//window.reload()//$('#ModalAddEsami').modal('toggle');
					}, 2000);

				}
			});

			return;
		}

		$('#semestri' + id).prop('disabled', false);
		if ($('#semestri' + id).val() != "0") {
			alert("carico esame con CFU" + $('#semestri' + id).val() + " e codice" + id)
			$.ajax({
				url: 'Formazione/PutEsamiVo',
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
						//$('#ModalAddEsami').modal('toggle');
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
				url: 'Formazione/DeleteEsamiVo',
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
						//$('#ModalAddEsami').modal('toggle');
					}, 2000);

				}
			});
		}
	}
})

$('body').on('change', '.semestri', function () {
	var id = this.id
	var dataId = $(this).attr("data-id");
	console.log($("#" + id).val())
	if ($("#" + id).val() == "0") {
		alert("cancellato")
		$.ajax({
			url: 'Formazione/DeleteEsamiVo',
			data: { idEsame: id, cfu: $('#semestri' + id).val(), idTitolo: 0, idFormazione: idFormazione, idSsd: idSsd },
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
	else if (!$('#' + id).is('disabled')) {
		//console.log("carico esame " + id + " " + $('#' + id + ' option:selected').val() + " " + idTitolo + " " + idSsd + " " + dataId)
		$.ajax({
			url: 'Formazione/PutEsamiVo',
			data: { name: dataId, cfu: $('#' + id + ' option:selected').val(), idTitolo: 0, idFormazione: idFormazione, idSsd: id.replace('semestri', '') },
			success: function (response) {
				swal.fire({
					title: "Successo!",
					text: "Esami Aggiunti!",
					type: "success",
					timer: 2000,
					showConfirmButton: false
				});
				//window.setTimeout(function () {
				//	$('#ModalAddEsami').modal('toggle');
				//}, 2000);

			}
		});
	}
})


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
		url: 'Formazione/GetEnumComplementare',
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
		url: 'Formazione/GetEnumTitoli',
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
	idFormazione = $('#' + this.id).attr('name')
	var jsonEsami;
	$.ajax({
		url: 'Formazione/GetEsamiUtente',
		data: { idSsd: idSsd, idTitolo: 0, idFormazione: idFormazione },
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
				url: 'Formazione/DeleteEsami',
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