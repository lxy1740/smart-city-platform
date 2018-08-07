import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// baidu map
declare let BMap;
declare let $: any;
declare let BMapLib;
declare let BMAP_ANCHOR_BOTTOM_RIGHT;
declare let BMAP_ANCHOR_TOP_RIGHT;


@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss']
})
export class TrafficComponent implements OnInit {

  @ViewChild('map4') map_container: ElementRef;
  model: any = {}; // 存储数据

  map: any; // 地图对象
  constructor() { }

  ngOnInit() {
    this.addBeiduMap();
  }

  // 百度地图API功能
  addBeiduMap() {

    const map = this.map = new BMap.Map(this.map_container.nativeElement, {
      enableMapClick: true,
      minZoom: 11,
      // maxZoom : 11
    }); // 创建地图实例


    // 这里我们使用BMap命名空间下的Point类来创建一个坐标点。Point类描述了一个地理坐标点，其中116.404表示经度，39.915表示纬度。（为天安门坐标）
    const point = new BMap.Point(114.064675, 22.550651); // 坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 19); // 设置中心和地图显示级别
    map.setMapStyle({ style: 'googlelite' });

    // const ctrl = new BMapLib.TrafficControl({
    //   showPanel: true // 是否显示路况提示面板
    // });
    // const ctrl = new BMapLib.TrafficControl({
    //   anchor: BMAP_ANCHOR_TOP_RIGHT,

    // });
    // map.addControl(ctrl);
    // ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
    const ctrl = new BMapLib.TrafficControl();
    map.addControl(ctrl);
    const marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中

  }

}
