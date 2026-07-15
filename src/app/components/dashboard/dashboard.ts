import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import 'highcharts/modules/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor() {
    (async () => {

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());

    const data = await fetch('https://www.highcharts.com/samples/data/world-population-density.json')
        .then(response => response.json());

    // Prevent logarithmic errors in color calculation
    data.forEach(function (p:any) {
        p.value = (p.value < 1 ? 1 : p.value);
    });

    // Initialize the chart
    (Highcharts as any).mapChart('container', {
        chart: {
          map: topology,
          backgroundColor: '#EEF2F7'  // الخلفية الزرقاء الفاتحة من الصورة
      },

        title: {
            text: '',
            align: 'left'
        },

        mapNavigation: {
            enabled: false,
            enableDoubleClickZoomTo: false,
            legend: {
              enabled: false  ,
            }
            // buttonOptions: {
            //     verticalAlign: 'bottom'
            // }
        },

        mapView: {
            fitToGeometry: {
                type: 'MultiPoint',
                coordinates: [
                    // Morocco west
                    [-17, 38],
                    // Oman east
                    [60, 12],
                    // Syria north
                    [42, 37],
                    // Yemen south
                    [45, 12]
                ]            
              }
        },

        colorAxis: {
            min: 10,
            max: 1000,
            type: 'logarithmic',
            minColor: '#D5D5D5',
            maxColor: '#9E9E9E',
            showInLegend: false
        },

        series: [{
    data: data.map((p: any) => {
        if (p.code3 === 'ISR') p['name'] = 'Palestine';
        return p;
    }),
    joinBy: ['iso-a3', 'code3'],
    name: 'Population density',
    tooltip: { valueSuffix: '/km²' },
    nullColor: '#3E4043',        
    borderColor: '#ffffff',      
    borderWidth: 1.5,

    states: {
        hover: {
            color: '#1A3A6E'    
        }
    }
}]
    });
  (Highcharts as any).mapChart('container-chart', {
  chart: {
    type: 'spline',
    backgroundColor: '#ffffff'
  },
  title: { text: '' },
  subtitle: { text: '' },

  xAxis: {
    categories: ['يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر'],
    reversed: true,
    lineColor: 'transparent',
    tickColor: 'transparent',
    labels: {
      style: { color: '#999', fontSize: '12px' }
    }
  },

  yAxis: {
    title: { text: '' },
    opposite: true,          // ← الأرقام على اليمين
    gridLineDashStyle: 'Dot',
    gridLineColor: '#cccccc',
    labels: {
      style: { color: '#999' }
    }
  },

  legend: {
    enabled: true,
    align: 'center',
    verticalAlign: 'bottom',
    symbolWidth: 30,
    itemStyle: { color: '#555', fontWeight: 'normal' }
  },

  tooltip: { enabled: false },

  plotOptions: {
    spline: {
      lineWidth: 5.5,
      marker: { enabled: false },
      shadow: {
        color: 'rgba(0,0,0,0.15)',
        offsetX: 0,
        offsetY: 4,
        opacity: 0.3,
        width: 8
      }
    }
  },

  series: [
    {
      name: 'الايرادات',
      color: '#E8923A',
      data: [15, 105, 30, 130, 70, 80, 100, 160, 90, 100, 95,115]  // ← آخر رقم (يناير) بقى 5
    },
    {
      name: 'اجمالي المبيعات',
      color: '#1B3A6B',
      data: [7, 30, 90, 55, 80, 80, 90, 75, 35, 75, 60, 50]  // ← آخر رقم (يناير) بقى 5
    }
]
});
})();

  
   }
}
