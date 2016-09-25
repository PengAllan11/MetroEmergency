/**
 * Created by peng_an on 2016/9/25.
 */
document.write("<script src='../resources/js/map_def.js'><\/script>");

require([
    "dojo/_base/connect",
    "dojo/dom",
    "dojo/on",
    "esri/map",
    "esri/InfoTemplate",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/OpenStreetMapLayer",
    "dojo/domReady!"
], function(connect,dom, on,Map, InfoTemplate,ArcGISDynamicMapServiceLayer,ArcGISTiledMapServiceLayer,
            FeatureLayer,OpenStreetMapLayer) {

    var baseMap = new Map("shanghai_map", shanghai_map_def);
    //http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer
    var osmLayer = new OpenStreetMapLayer(openstreetmap_def);
    baseMap.addLayer(osmLayer);

    var metroPointLayer = new FeatureLayer("http://10.60.38.158:6080/arcgis/rest/services/ShanghaiMetroV1/MapServer/0",{
        infoTemplate: new InfoTemplate(metro_point_info_def),
        outFields: ["*"]
    });
    var metroLineLayer = new FeatureLayer("http://10.60.38.158:6080/arcgis/rest/services/ShanghaiMetroV1/MapServer/1");

    baseMap.addLayer(metroLineLayer);
    baseMap.addLayer(metroPointLayer);
})

