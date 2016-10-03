/**
 * Created by peng_an on 2016/9/25.
 */
document.write("<script src='../resources/js/map_def.js'><\/script>");
document.write("<script src='../resources/js/map_data.js'><\/script>");

require([
    "dojo/_base/connect",
    "dojo/dom",
    "esri/graphic",
    "dojo/on",
    "esri/map",
    "esri/InfoTemplate",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/LabelClass",
    "esri/layers/OpenStreetMapLayer",
    "dojo/domReady!"
], function(connect,dom,Graphic,on,Map, InfoTemplate,ArcGISDynamicMapServiceLayer,ArcGISTiledMapServiceLayer,
            FeatureLayer,LabelClass,OpenStreetMapLayer) {

    var baseMap = new Map("shanghai_map", shanghai_map_def);
    //http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer
    var osmLayer = new OpenStreetMapLayer(openstreetmap_def);
    baseMap.on("load", function() {
        console.log("start");
        runABus(locTime);
    });
    baseMap.addLayer(osmLayer);

    var metroPointLayer = new FeatureLayer("http://10.60.38.158:6080/arcgis/rest/services/ShanghaiMetroV1/MapServer/0",metroPointLayer_def);
    metroPointLayer.setInfoTemplate(new InfoTemplate(metro_point_info_def));

    var metroLineLayer = new FeatureLayer("http://10.60.38.158:6080/arcgis/rest/services/ShanghaiMetroV1/MapServer/1");

    baseMap.addLayer(metroLineLayer);
    baseMap.addLayer(metroPointLayer);

    metroPointLayer.setLabelingInfo([metro_point_label_def]);


    /**
     * 为指定车站添加乘客
     */
    //var pictureMarkerSymbol = new PictureMarkerSymbol('../static/bus.png',30,30);
    //
    //var point = new Point(121.23, 31.05, map.spatialReference);
    //var attr = {"x":121.23,"y":31.05,"name":"temp","picId":"id"};
    var waitingPeople= new Array();

    for(var i=1;i<=stationData.length;i++){
        waitingPeople[i] = [];

        people_graphic_def.geometry.x = stationData[i-1].x;
        people_graphic_def.geometry.y = stationData[i-1].y;

        //0对应up,1对应down
        people_graphic_def.symbol.url = "../resources/pic/"+Math.ceil(stationData[i-1].up/70)+".png";
        people_graphic_def.symbol.width = 10*Math.ceil(stationData[i-1].up/70);
        people_graphic_def.symbol.xoffset = -5*Math.ceil(stationData[i-1].up/70)-15;
        waitingPeople[i][0] = new Graphic(people_graphic_def);

        people_graphic_def.symbol.url = "../resources/pic/"+Math.ceil(stationData[i-1].down/70)+".png";
        people_graphic_def.symbol.width = 10*Math.ceil(stationData[i-1].down/70);
        people_graphic_def.symbol.xoffset = 5*Math.ceil(stationData[i-1].down/70)+15;
        waitingPeople[i][1] = new Graphic(people_graphic_def);

        //waitingPeople[i][0] = new Graphic({
        //    "geometry":{"x":stationData[i-1].x,"y":stationData[i-1].y, "spatialReference":{"wkid":4326}},
        //    "attributes":{"XCoord":stationData[i-1].x, "YCoord":stationData[i-1].y,"stationName":stationData[i-1].name},
        //    "symbol":{
        //        "url":"../resources/pic/"+Math.ceil(stationData[i-1].up/70)+".png",
        //        "height":20,
        //        "width":10*Math.ceil(stationData[i-1].up/70),
        //        "type":"esriPMS",
        //        "xoffset": -5*Math.ceil(stationData[i-1].up/70)-10,
        //        "yoffset": 0
        //    }
        //});
        //waitingPeople[i][1] = new Graphic({
        //    "geometry":{"x":stationData[i-1].x,"y":stationData[i-1].y, "spatialReference":{"wkid":4326}},
        //    "attributes":{"XCoord":stationData[i-1].x, "YCoord":stationData[i-1].y,"stationName":stationData[i-1].name},
        //    "symbol":{
        //        "url":"../resources/pic/"+Math.ceil(stationData[i-1].down/70)+".png",
        //        "height":20,
        //        "width":10*Math.ceil(stationData[i-1].down/70),
        //        "type":"esriPMS",
        //        "xoffset": 5*Math.ceil(stationData[i-1].down/70)+10,
        //        "yoffset": 0
        //    }
        //});

        console.log(i+" "+stationData[i-1].down+" "+waitingPeople[i][1].symbol.width);
        baseMap.graphics.add(waitingPeople[i][1]);
        baseMap.graphics.add(waitingPeople[i][0]);
    }

    /**
     * A bus named busGraphic
     */
    var busGraphic = new Graphic(bus_graphic_def);
    baseMap.graphics.add(busGraphic);

    function runABus(loc){
        /**
         * s:加快比率
         * t:播放间隔（ms）
         */
        var s = 200;
        var t = 30;

        var runALine = null;

        var point1 = loc[0][0];
        var point2 = loc[0][1];
        var time = loc[1][0];


        var n =time*60*1000.0/(s*t);
        var i = 1;
        var j = 1;

        function BusStop(){
            if(j<loc[1].length){
                point1 = loc[0][j];
                point2 = loc[0][j+1];
                time = loc[1][j];
                n =time*60*1000.0/(s*t);
                i = 1;
                j++;
                runALine = setInterval(function () { BusRun(point1,point2); },30);
            }else {
                return;
            }

        }

        function BusRun(pot0,pot1){
            if(i>n) {
                clearInterval(runALine);

                if(pot1[3] == "get-on"){
                    var k = -1;
                    if(pot1[4] == "down"){
                        k = 1;
                        stationData[pot1[2]-1].down -= 70;
                        console.log("id:"+pot1[2]+",down, picWidth:"+waitingPeople[pot1[2]][k].symbol.width);
                        baseMap.graphics.remove(waitingPeople[pot1[2]][k]);
                        waitingPeople[pot1[2]][k].symbol.setUrl("../resources/pic/"+Math.ceil(stationData[pot1[2]-1].down/70)+".png");
                        waitingPeople[pot1[2]][k].symbol.width = 10*Math.ceil(stationData[pot1[2]-1].down/70)*4/3;
                        waitingPeople[pot1[2]][k].symbol.xoffset = 5*Math.ceil(stationData[pot1[2]-1].down/70)*4/3+15*4/3;

                        console.log(pot1[2]+" "+stationData[pot1[2]-1].down+" "+10*Math.ceil(stationData[pot1[2]-1].down/70));
                    } else{
                        k = 0;
                        stationData[pot1[2]-1].up -= 70;
                        baseMap.graphics.remove(waitingPeople[pot1[2]][k]);
                        waitingPeople[pot1[2]][k].symbol.setUrl("../resources/pic/"+Math.ceil(stationData[pot1[2]-1].up/70)+".png");
                        waitingPeople[pot1[2]][k].symbol.width = 10*Math.ceil(stationData[pot1[2]-1].up/70)*4/3;
                        waitingPeople[pot1[2]][k].symbol.xoffset = -5*Math.ceil(stationData[pot1[2]-1].up/70)*4/3-15*4/3;
                    }
                    baseMap.graphics.add(waitingPeople[pot1[2]][k]);
                }
                setTimeout(BusStop,2000);
            }
            busGraphic.geometry.setX(pot0[0]+(pot1[0]-pot0[0])/n*i);
            busGraphic.geometry.setY(pot0[1]+(pot1[1]-pot0[1])/n*i);
            i++;
            baseMap.graphics.remove(busGraphic);
            baseMap.graphics.add(busGraphic);
        }
        runALine = setInterval(function () { BusRun(point1,point2); },30);

    }


})

