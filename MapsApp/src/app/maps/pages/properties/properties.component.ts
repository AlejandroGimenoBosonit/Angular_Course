import { Component, OnInit } from '@angular/core';

interface Porperty {
  title: string;
  description: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [
  ]
})
export class PropertiesComponent implements OnInit {

  // porperties
  properties: Porperty[] = [
    {
      title: 'Residence, Canada',
      description: 'Wonderful home in Canada',
      lngLat: [-75.92722289474008, 45.280015511264466]
    },
    {
      title: 'Beach Club, Mexico',
      description: 'House in Acapulco, Mexico',
      lngLat: [-99.91287720907991, 16.828940930185748]
    },
    {
      title: 'Department in Argentina',
      description: 'Personal departmen in Buenos Aires, Argentina',
      lngLat: [-58.430166677283445, -34.5710108832866]
    },
    {
      title: 'Commerce, Spain',
      description: 'Commerce in Madrid, Spain',
      lngLat: [-3.7112735618380177, 40.42567285425766]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
