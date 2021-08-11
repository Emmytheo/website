/*
Template Name: Material Pro Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    // ============================================================== 
    // Total revenue chart
    // ============================================================== 
    new Chartist.Bar('.total-sales', {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept']
        , series: [
        [800000, 1200000, 1400000, 1300000, 1200000, 1400000, 1300000, 1300000, 1200000]
        , [200000, 400000, 500000, 300000, 400000, 500000, 300000, 300000, 400000]
        , [100000, 200000, 400000, 600000, 200000, 400000, 600000, 600000, 200000]
      ]
    }, {
        high: 2500000
        , low: 500000
        , fullWidth: true
        , plugins: [
        Chartist.plugins.tooltip()]
        , stackBars: true
        
        , axisX: {
            showGrid: false
        }
        , axisY: {
            labelInterpolationFnc: function (value) {
                return (value / 1000) + 'k';
            }
        }
    }).on('draw', function (data) {
        if (data.type === 'bar') {
            data.element.attr({
                style: 'stroke-width: 10px'
            });
        }
    });
    // ============================================================== 
    // sales difference
    // ==============================================================
    new Chartist.Pie('.ct-chart', {
        series: [25, 10]
    }, {
        donut: true
        , donutWidth: 20
        , startAngle: 0
        , showLabel: false
    });
    // ============================================================== 
    // world map
    // ==============================================================
    jQuery('#visitfromworld').vectorMap({
        map: 'world_mill_en'
        , backgroundColor: '#fff'
        , borderColor: '#ccc'
        , borderOpacity: 0.9
        , borderWidth: 1
        , zoomOnScroll : false
        , color: '#ddd'
        , regionStyle: {
            initial: {
                fill: '#fff' 
            }
        }
        , markerStyle: {
            initial: {
                r: 8
                , 'fill': '#26c6da'
                , 'fill-opacity': 1
                , 'stroke': '#000'
                , 'stroke-width': 0
                , 'stroke-opacity': 1
            }
        , }
        , enableZoom: true
        , hoverColor: '#79e580'
        , markers: [{
            latLng: [21.00, 78.00]
            , name: 'India : 9347'
            , style: {fill: '#26c6da'}
        },
      {
        latLng : [-33.00, 151.00],
        name : 'Australia : 250'
        , style: {fill: '#02b0c3'}
      },
      {
        latLng : [36.77, -119.41],
        name : 'USA : 250'
        , style: {fill: '#11a0f8'}
      },
      {
        latLng : [55.37, -3.41],
        name : 'UK   : 250'
        , style: {fill: '#745af2'}
      },
      {
        latLng : [25.20, 55.27],
        name : 'UAE : 250'
        , style: {fill: '#ffbc34'}
      }]
        , hoverOpacity: null
        , normalizeFunction: 'linear'
        , scaleColors: ['#fff', '#ccc']
        , selectedColor: '#c9dfaf'
        , selectedRegions: []
        , showTooltip: true
        , onRegionClick: function (element, code, region) {
            var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
            alert(message);
        }
    });
    $('#calendar').fullCalendar('option', 'height', 650);
    // ============================================================== 
    // sparkline chart
    // ==============================================================
    var sparklineLogin = function() { 
       
  
        $("#spark1").sparkline([2,4,4,6,8,5,6,4,8,6,6,2 ], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#26c6da',
            fillColor: '#26c6da',
            maxSpotColor: '#26c6da',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#26c6da'
        });
        $("#spark2").sparkline([0,2,8,6,8,5,6,4,8,6,6,2 ], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#009efb',
            fillColor: '#009efb',
            minSpotColor:'#009efb',
            maxSpotColor: '#009efb',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#009efb'
        });
        $("#spark3").sparkline([2,4,4,6,8,5,6,4,8,6,6,2], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#7460ee',
            fillColor: '#7460ee',
            maxSpotColor: '#7460ee',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#7460ee'
        });
        $("#spark4").sparkline([2,4,4,6,8,5,6,4,8,6,6,2], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#fff',
            fillColor: '#7460ee',
            maxSpotColor: '#7460ee',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#7460ee'
        });
        $("#spark5").sparkline([2,4,4,6,8,5,6,4,8,6,6,2], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#fff',
            fillColor: '#009efb',
            maxSpotColor: '#009efb',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#009efb'
        });
        $("#spark6").sparkline([2,4,4,6,8,5,6,4,8,6,6,2], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#fff',
            fillColor: '#26c6da',
            maxSpotColor: '#26c6da',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#26c6da'
        });
        $("#spark7").sparkline([2,4,4,6,8,5,6,4,8,6,6,2], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#fff',
            fillColor: '#ffbc34',
            maxSpotColor: '#ffbc34',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#ffbc34'
        });
        $('#spark8').sparkline([ 4, 5, 0, 10, 9, 12, 4, 9], {
            type: 'bar',
            width: '100%',
            height: '70',
            barWidth: '8',
            resize: true,
            barSpacing: '5',
            barColor: '#26c6da'
        });
         $('#spark9').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            width: '100%',
            height: '70',
            barWidth: '8',
            resize: true,
            barSpacing: '5',
            barColor: '#7460ee'
        });
          $('#spark10').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            width: '100%',
            height: '70',
            barWidth: '8',
            resize: true,
            barSpacing: '5',
            barColor: '#03a9f3'
        });
           $('#spark11').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            width: '100%',
            height: '70',
            barWidth: '8',
            resize: true,
            barSpacing: '5',
            barColor: '#f62d51'
        });
        $('#sparklinedash').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '50',
            barWidth: '2',
            resize: true,
            barSpacing: '5',
            barColor: '#26c6da'
        });
         $('#sparklinedash2').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '50',
            barWidth: '2',
            resize: true,
            barSpacing: '5',
            barColor: '#7460ee'
        });
          $('#sparklinedash3').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '50',
            barWidth: '2',
            resize: true,
            barSpacing: '5',
            barColor: '#03a9f3'
        });
           $('#sparklinedash4').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '50',
            barWidth: '2',
            resize: true,
            barSpacing: '5',
            barColor: '#f62d51'
        });
       
   }
    var sparkResize;
 
        $(window).resize(function(e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineLogin, 500);
        });
        sparklineLogin();
});
