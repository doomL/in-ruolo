function Quesito(Id, IdClasse, Key, IdNota, Value,TestoQuesito) {
    this.Id = Id;
    this.IdClasse = IdClasse;
    this.Key = Key;
    this.IdNota = IdNota;
    this.Value = Value;
    this.TestoQuesito = TestoQuesito;
}
$("#salvaQuesiti").click(function () {
    console.log("salvaa")
    //var radios = []
    //var radios = $(".radioBox").val()
    //for (var i = 0; i < radios.size(); i++)
    //    console.log(radios[i])
    var quesiti = []
    $(".radioBox").each(function () {
        // Test if the div element is empty
        if ($(this).is(':checked')) {
            quesiti.push(new Quesito($(this).attr('data-Id'), $(this).attr('data-IdClasse'), $(this).attr('data-Key'), $(this).attr('data-IdNota'), $(this).val(),null))
            console.log($(this).attr('data-Id'));
            console.log($(this).val());
        }
    });
    console.log(quesiti)
    $.ajax({
        url: 'Formazione/UpsertQuesiti',
        data: { quesiti: JSON.stringify(quesiti)},
        success: function (response) {
            swal.fire({
                title: "Successo!",
                text: "I Quesiti sono stati aggiornati",
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
