// Create a DataSet (allows two way data-binding)
var items
var TimelineItem = []

var demo2 = function () {
    function randValue() {
        return (Math.floor(Math.random() * (1 + 365 - 20))) + 20;
    }
    var tu = [
        [2009, randValue()],
        [2010, randValue()],
        [2011, randValue()],
        [2012, randValue()],
        [2013, randValue()],
        [2014, randValue()],
        [2015, randValue()],
        [2016, randValue()],
        [2017, randValue()],
        [2018, randValue()],
        [2019, randValue()]
    
    ];
    var mediaUtenti = [
        [2009, randValue()],
        [2010, randValue()],
        [2011, randValue()],
        [2012, randValue()],
        [2013, randValue()],
        [2014, randValue()],
        [2015, randValue()],
        [2016, randValue()],
        [2017, randValue()],
        [2018, randValue()],
        [2019, randValue()]
     
    ];

    var plot = $.plot($("#kt_flotcharts_2"), [{
        data: tu,
        label: "Tu",
        lines: {
            lineWidth: 1,
        },
        shadowSize: 0

    }, {
        data: mediaUtenti,
        label: "Media Utenti",
        lines: {
            lineWidth: 1,
        },
        shadowSize: 0
    }], {
        series: {
            lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.05
                    }, {
                        opacity: 0.01
                    }]
                }
            },
            points: {
                show: true,
                radius: 3,
                lineWidth: 1
            },
            shadowSize: 2
        },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#eee",
            borderColor: "#eee",
            borderWidth: 1
        },
        colors: [KTApp.getStateColor("brand"), KTApp.getStateColor("danger")],
        xaxis: {
            ticks: 11,
            tickDecimals: 0,
            tickColor: "#eee",
        },
        yaxis: {
            ticks: 11,
            tickDecimals: 0,
            tickColor: "#eee",
        },
        axisLabels: {
            show: true
        },
        xaxes: [{
            axisLabel: 'Anni',
        }],
        yaxes: [{
            position: 'left',
            axisLabel: 'Giorni',
        }]
    });

    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 15,
            border: '1px solid #333',
            padding: '4px',
            color: '#fff',
            'border-radius': '3px',
            'background-color': '#333',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    $("#chart_2").bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
}
jQuery(document).ready(function () {
    var obj
    $.ajax({
        url: 'Panoramica/GetPeriodo',
        success: function (response) {
            obj = JSON.parse(response);
            console.log(obj)
            var timeline
            $.each(obj, function () {
                timeline = new Object();
                timeline.id = this.Id
                timeline.content = this.Scuola
                timeline.start = this.DataInizio
                timeline.end = this.DataFine
                timeline.title = "Classe Di Concorso " + this.ClasseConcorso
                TimelineItem.push(timeline)

            })
            console.log(TimelineItem)
            items = new vis.DataSet()
            items.add(TimelineItem)
            // Follow options
            var follow_options = {
                locale: 'it',

                tooltip: {
                    followMouse: true,
                    delay: 30,
                },

                // use the new locale
            };

            var timelineFollow = new vis.Timeline(
                document.getElementById("tooltips-follow"),
                items,
                follow_options
            );
        }
    });
    var data1 = [
        [2009, 40],
        [2010, 120],
        [2011, 60],
        [2012, 96],
        [2013, 30]
    ];
    var options = {
        colors: [KTApp.getStateColor("brand")],
        series: {
            bars: {
                show: true
            }
        },
        bars: {
            horizontal: false,
            barWidth: 0.5,
            lineWidth: 1, // in pixels
            shadowSize: 0,
            align: 'center'
        },
        grid: {
            tickColor: "#eee",
            borderColor: "#eee",
            borderWidth: 1
        },
        xaxis: {
            tickDecimals: 0
        },
        axisLabels: {
            show: true
        },
        xaxes: [{
            axisLabel: 'Anni',
        }],
        yaxes: [{
            position: 'left',
            axisLabel: 'Giorni',
        }]
    };

    $.plot($("#kt_flotcharts_7"), [data1], options);

    demo2()
    $('#cdc').select2({
        placeholder: "Scegli una Classe Di Concorso",
        allowClear: true
    });
});


