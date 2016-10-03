/**
 * Created by peng_an on 2016/9/25.
 */
var shanghai_map_def = {
    //basemap: "streets",
    center: [121.26, 31.10],
    zoom: 12,
    minZoom: 10,
    maxZoom: 17,
    showLabels : true,
    logo: false
};

var openstreetmap_def = {
    id: "OSMLayer",
    displayLevels:[10,11,12,13,14,15,16,17],
    resamplingTolerance: 1
};

var metroPointLayer_def={
    showLabels:true,
    outFields: ["*"]
};
var metro_point_info_def = {
    title:"站点信息",
    content:"站点名称: ${name}"
};

var metro_point_label_def = {
    "labelExpressionInfo": {"value": "{name}"},
    "useCodedValues": true,
    "symbol":{
        color:[0,0,255,255],
        font:{
            size:10,
            family:"黑体",
        },
        xoffset: 0,
        yoffset: -10
    },
    "labelPlacement":"below-center"
};

var people_graphic_def = {
    "geometry":{"x":0,"y":0, "spatialReference":{"wkid":4326}},
    //"attributes":{"XCoord":0, "YCoord":0,"stationName":null},
    "symbol":{
        "url":"../resources/pic/",
        "height":20,
        "width":0,
        "type":"esriPMS",
        "xoffset": 0,
        "yoffset": 0
    }
};

var bus_graphic_def = {
    "geometry":{"x":121.197,"y":31.034, "spatialReference":{"wkid":4326}},
    "symbol":{
        "url":"../resources/pic/bus.png",
        "height":30,
        "width":30,
        "type":"esriPMS",
        "xoffset": 0,
        "yoffset": 0
    }
};


