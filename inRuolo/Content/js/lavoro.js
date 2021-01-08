// Class definition
jQuery(document).ready(function () {
    $('#kt_datepicker_5').datepicker({
        format: 'dd-mm-yyyy',
        language: "it"
    });
    $.ajax({
        url: 'Panoramica/GetPeriodo',
        success: function (response) {
            const obj = JSON.parse(response);
            console.log(obj)
            var markup
            var dateOption = {year: 'numeric', month: 'long', day: 'numeric' }
            var dateStart 
            var dateEnd
            var $table = $("#tableBody")
            $.each(obj, function () {
                dateStart = new Date(Date.parse(this.DataInizio));
                dateEnd = new Date(Date.parse(this.DataFine));
                markup = '<tr><th scope="row">' + this.Id + '</th><td>' + dateStart.toLocaleDateString("it-IT", dateOption) + ' - ' + dateEnd.toLocaleDateString("it-IT", dateOption) + '</td><td>' + this.Scuola + '</td><td>' + this.ClasseConcorso + '</td><td>' + Math.round(Math.abs((dateStart.getTime() - dateEnd.getTime()) / (oneDay))) + '</td><td>' + this.PuntiServizioSpecifico + '</td><td class="row"><div class="dropdown">\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
								<i class="la la-cog"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a class="dropdown-item" href="#"><i class="la la-edit"></i>Modifica</a>\
							</div>\
						</div>\
						<a class="deletePeriodo btn btn-sm btn-clean btn-icon btn-icon-md"  id="'+ this.Id +'" title="Elimina" style="cursor: pointer;">\
							<i class="la la-trash"></i>\
						</a>\</td></tr>';
                $table.append(markup);
            });
        }
    });
});
var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

$('#modalPeriodo').on('shown.bs.modal', function () {
    
    $('#regione').select2({
        placeholder: "Scegli una Regione",
        allowClear: true
    });
    $('#provincia').select2({
        placeholder: "Scegli una Provincia",
        allowClear: true
    });
    $('#comune').select2({
        placeholder: "Scegli un Comune",
        allowClear: true
    });
    $('#cod').select2({
        placeholder: "Scegli un Codice",
        allowClear: true,
        tags: true
    });
    $('#scuola').select2({
        placeholder: "Scegli una Scuola",
        allowClear: true,
        tags: true
    });
    $('#cdc').select2({
        placeholder: "Scegli una Classe Di Concorso",
        allowClear: true
    });
})

$("#aggiungiPeriodo").click(function () {
    $.ajax({
        url: 'https://comuni-ita.herokuapp.com/api/province',
        success: function (response) {
           // const obj = JSON.parse(response);
            console.log(response)
            var $dropdown = $("#provincia")
            $.each(response, function () {
                $dropdown.append($("<option />").val(this.nome).text(capitalize(this.nome)));
            });
        }
    });
    //$.ajax({
    //    url: 'https://comuni-ita.herokuapp.com/api/comuni',
    //    success: function (response) {
    //        //const obj = JSON.parse(response);
    //        var $dropdown = $("#comune")
    //        console.log(response)
    //        $.each(response, function () {
    //            $dropdown.append($("<option />").val(this.nome).text(this.nome));
    //        });
    //    }
    //});
    $.ajax({
        url: 'https://comuni-ita.herokuapp.com/api/regioni',
        success: function (response) {
           // const obj = JSON.parse(response);
            console.log(response)
            var $dropdown = $("#regione")
            $.each(response, function () {
                $dropdown.append($("<option />").val(this).text(capitalize(this)));
            });
        }
    });
    //$.ajax({
    //    url: 'Panoramica/GetScuole',
    //    data: { codice: "null", nome: "null", provincia: "null", regione: "null", comune: "null", },
    //    success: function (response) {
    //        const obj = JSON.parse(response);
    //        $.each(obj, function () {
    //            $dropdown.append($("<option />").val(this.Id).text(this.Nome));
    //        });
    //    }
    //});
   
    

})

$('#regione').on('select2:select', function (e) {
    var data = e.params.data;
    console.log(data.id);
    $.ajax({
        url: 'https://comuni-ita.herokuapp.com/api/province/'+data.id+'',
        success: function (response) {
            //const obj = JSON.parse(response);
            var $dropdown = $("#provincia")
            console.log(response)
            $('#provincia')
                .empty()
                .append('<option></option>')
                ;
            $.each(response, function () {
                $dropdown.append($("<option />").val(this.nome).text(capitalize(this.nome)));
            });
        }
    });
    $.ajax({
        url: 'https://comuni-ita.herokuapp.com/api/comuni/'+data.id+'',
        success: function (response) {
            //const obj = JSON.parse(response);
            var $dropdown = $("#comune")
            console.log(response)
            $('#comune')
                .empty()
                .append('<option></option>')
                ;
            $.each(response, function () {
                $dropdown.append($("<option />").val(this.nome).text(capitalize(this.nome)));
            });
        }
    });
    $('#cod')
        .empty()
        .append('<option></option>')
        ;
    $('#scuola')
        .empty()
        .append('<option></option>')
        ;
});
$('#provincia').on('select2:select', function (e) {
    var data = e.params.data;
    console.log(data.id);
    $.ajax({
        url: 'https://comuni-ita.herokuapp.com/api/comuni/provincia/'+data.id+'',
        success: function (response) {
            //const obj = JSON.parse(response);
            var $dropdown = $("#comune")
            console.log(response)
            $('#comune')
                .empty()
                .append('<option></option>')
                ;
            
            $.each(response, function () {
                $dropdown.append($("<option />").val(this.nome).text(capitalize(this.nome)));
            });
        }
    });
    $.ajax({
        url: 'Panoramica/GetScuole',
        data: { codice: "", nome: "", provincia: data.id, regione: "", comune: "", },
        success: function (response) {
            var $cod = $("#cod")
            var $scuola = $("#scuola")
            $('#cod')
                .empty()
                .append('<option></option>')
                ;
            $('#scuola')
                .empty()
                .append('<option></option>')
                ;
            const obj = JSON.parse(response);
            console.log(obj)
            $.each(obj, function () {
                $scuola.append($("<option />").val(this.Codice).text(this.NomeScuola));
                $cod.append($("<option />").val(this.Codice).text(this.Codice));

            });
        }
    });
});
$('#comune').on('select2:select', function (e) {
    var data = e.params.data;
    console.log(data.id);
    $.ajax({
        url: 'Panoramica/GetScuole',
        data: { codice: "", nome: "", provincia: "", regione: "", comune: data.id, },
        success: function (response) {
            var $cod = $("#cod")
            var $scuola = $("#scuola")
            $('#cod')
                .empty()
                .append('<option></option>')
                ;
            $('#scuola')
                .empty()
                .append('<option></option>')
                ;
            const obj = JSON.parse(response);
            console.log(obj)
            $.each(obj, function () {
                $scuola.append($("<option />").val(this.Codice).text(this.NomeScuola));
                $cod.append($("<option />").val(this.Codice).text(this.Codice));

            });
        }
    });
});
$('#cod').on('select2:select', function (e) {
    var data = e.params.data;
    console.log(data.id);
    $.ajax({
        url: 'Panoramica/GetScuole',
        data: { codice: data.id, nome: "", provincia: "", regione: "", comune: "", },
        success: function (response) {
            var $scuola = $("#scuola")
            $('#scuola')
                .empty()
                ;
            const obj = JSON.parse(response);
            console.log(obj)
            $.each(obj, function () {
                $scuola.append($("<option />").val(this.Codice).text(this.NomeScuola));

            });
        }
    });
})
$('#scuola').on('select2:select', function (e) {
    var data = e.params.data;
    console.log(data.id);
    $.ajax({
        url: 'Panoramica/GetScuole',
        data: { codice: data.id, nome: "", provincia: "", regione: "", comune: "", },
        success: function (response) {
            var $cod = $("#cod")
            $('#cod')
                .empty()
                ;
            const obj = JSON.parse(response);
            console.log(obj)
            $.each(obj, function () {
                $cod.append($("<option />").val(this.Codice).text(this.Codice));

            });
        }
    });
})
$('#scuola').on('select2:clear', function (e) {
    alert("clear")
})

$("#salvaPeriodo").click(function () {
    console.log($('#cod').val() + " " + $('#cdc').val() + " " + $('#dateStart').val() + " " + $('#dateEnd').val() )
    $.ajax({
        url: 'Panoramica/SalvaPeriodo',
        data: { codice: $('#cod').val(), cdc: $('#cdc').val(), dateStart: $('#dateStart').val(), dateEnd: $('#dateEnd').val()},
        success: function (response) {
            swal.fire({
                title: "Successo!",
                text: "Il Periodo e' stato Calcellato!",
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
            $("#modalPeriodo").modal('hide');
            $.ajax({
                url: 'Panoramica/GetPeriodo',
                success: function (response) {
                    const obj = JSON.parse(response);
                    console.log(obj)
                    var markup
                    var dateOption = { year: 'numeric', month: 'long', day: 'numeric' }
                    var dateStart
                    var dateEnd
                    var $table = $("#tableBody")
                    $table.empty()
                    $.each(obj, function () {
                        dateStart = new Date(Date.parse(this.DataInizio));
                        dateEnd = new Date(Date.parse(this.DataFine));
                        markup = '<tr><th scope="row">' + this.Id + '</th><td>' + dateStart.toLocaleDateString("it-IT", dateOption) + ' - ' + dateEnd.toLocaleDateString("it-IT", dateOption) + '</td><td>' + this.Scuola + '</td><td>' + this.ClasseConcorso + '</td><td>' + Math.round(Math.abs((dateStart.getTime() - dateEnd.getTime()) / (oneDay))) + '</td><td>' + this.PuntiServizioSpecifico + '</td><td class="row"><div class="dropdown">\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
								<i class="la la-cog"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a class="dropdown-item" href="#"><i class="la la-edit"></i>Modifica</a>\
							</div>\
						</div>\
						<a class="deletePeriodo btn btn-sm btn-clean btn-icon btn-icon-md"  id="'+ this.Id + '" title="Elimina" style="cursor: pointer;">\
							<i class="la la-trash"></i>\
						</a>\</td></tr>';
                        $table.append(markup);
                    });
                }
            });
        }
    });
})
$('body').on('click', '.deletePeriodo', function (e) {
    idPeriodo=this.id
    swal.fire({
        title: 'Vuoi Cancellare Questo Periodo?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'Annulla',
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            $.ajax({
                url: 'Panoramica/DeletePeriodo',
                data: { idPeriodo:idPeriodo },
                success: function (response) {
                    swal.fire({
                        title: "Successo!",
                        text: "Il Periodo e' stato Calcellato!",
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    $.ajax({
                        url: 'Panoramica/GetPeriodo',
                        success: function (response) {
                            const obj = JSON.parse(response);
                            console.log(obj)
                            var markup
                            var dateOption = { year: 'numeric', month: 'long', day: 'numeric' }
                            var dateStart
                            var dateEnd
                            var $table = $("#tableBody")
                            $table.empty()
                            $.each(obj, function () {
                                dateStart = new Date(Date.parse(this.DataInizio));
                                dateEnd = new Date(Date.parse(this.DataFine));
                                markup = '<tr><th scope="row">' + this.Id + '</th><td>' + dateStart.toLocaleDateString("it-IT", dateOption) + ' - ' + dateEnd.toLocaleDateString("it-IT", dateOption) + '</td><td>' + this.Scuola + '</td><td>' + this.ClasseConcorso + '</td><td>' + Math.round(Math.abs((dateStart.getTime() - dateEnd.getTime()) / (oneDay))) + '</td><td>' + this.PuntiServizioSpecifico + '</td><td class="row"><div class="dropdown">\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
								<i class="la la-cog"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a class="dropdown-item" href="#"><i class="la la-edit"></i>Modifica</a>\
							</div>\
						</div>\
						<a class="deletePeriodo btn btn-sm btn-clean btn-icon btn-icon-md"  id="'+ this.Id + '" title="Elimina" style="cursor: pointer;">\
							<i class="la la-trash"></i>\
						</a>\</td></tr>';
                                $table.append(markup);
                            });
                        }
                    });
                }
            });
            
            //window.setTimeout(function () {
            //    location.reload();
            //}, 2000);

        }
    });
});