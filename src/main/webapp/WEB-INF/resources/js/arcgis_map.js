/**
 * Created by peng_an on 2016/9/25.
 */
document.write("<script src='../resources/js/map_def.js'><\/script>");
document.write("<script src='../resources/js/map_data.js'><\/script>");
document.write("<script src='../resources/js/common_functions.js'><\/script>");

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
    var osmLayer = new OpenStreetMapLayer(openstreetmap_def);

    var buses = new Array();
    var waitingPeople= new Array();
    var waitPeopleNum = new Array();

    baseMap.on("load", function() {
        connect.connect(dom.byId("zoomOn"),"click",function(){
            dom.byId("zoomOn").setAttribute('disabled', true);
            baseMap.centerAndZoom([121.243, 31.085],13);
            buses = createBuses();
            waitPeopleNum = createWaitPeopleNumber();
            waitingPeople = createPassengers();
        });

        connect.connect(dom.byId("simulate"),"click",function(){
            dom.byId("simulate").setAttribute('disabled', true);
            var i = 0;
            for(var busNum in busesRoute){
                runABus(buses[i],busesRoute[busNum]);
                i++;
            }
        });
    });

    baseMap.addLayer(osmLayer);

    var metroPointLayer = new FeatureLayer("http://10.60.38.158:6080/arcgis/rest/services/ShanghaiMetroV1/MapServer/0",metroPointLayer_def);
    metroPointLayer.setInfoTemplate(new InfoTemplate(metro_point_info_def));
    metroPointLayer.setLabelingInfo([metro_point_label_def]);
    var metroLineLayer = new FeatureLayer("http://10.60.38.158:6080/arcgis/rest/services/ShanghaiMetroV1/MapServer/1");
    baseMap.addLayer(metroLineLayer);
    baseMap.addLayer(metroPointLayer);

    function createPassengers(){
        var waitingPeople = [];
        for(var i=1;i<=stationData.length;i++){
            waitingPeople[i] = [];
            waitingPeople[i][0] = new Graphic(get_spec_PeopleOnGraphicDef(i-1,"up"));
            waitingPeople[i][1] = new Graphic(get_spec_PeopleOnGraphicDef(i-1,"down"));
            baseMap.graphics.add(waitingPeople[i][1]);
            baseMap.graphics.add(waitingPeople[i][0]);
        }
        return waitingPeople;
    }

    function createWaitPeopleNumber(){
        var waitPeopleNum = [];
        for(var i =1 ;i<=stationData.length;i++){
            waitPeopleNum[i] = [];
            waitPeopleNum[i][0] = new Graphic(get_spec_PeoNumGraphicDef(i-1, "up"));
            waitPeopleNum[i][1] = new Graphic(get_spec_PeoNumGraphicDef(i-1, "down"));
            baseMap.graphics.add(waitPeopleNum[i][0]);
            baseMap.graphics.add(waitPeopleNum[i][1]);
        }
        return waitPeopleNum;
    }

    function createBuses(){
        var buses = [];
        var i = 0;
        for(var busNum in busesRoute){
            bus_graphic_def.geometry.x = busesRoute[busNum][0][0][0];
            bus_graphic_def.geometry.y = busesRoute[busNum][0][0][1];
            buses[i] = new Graphic(bus_graphic_def);
            baseMap.graphics.add(buses[i]);
            i++;
        }
        return buses;
    }

    function runABus(bus, loc){
        var runALine = null;

        var point1 = loc[0][0];
        var point2 = loc[0][1];
        var time = loc[1][0];

        var n =time*60*1000.0/(s*t);
        var i = 1;
        var j = 1;

        function BusStop(pot0,pot1){
            function prepareStart(){
                if(j<loc[1].length){
                    point1 = loc[0][j];
                    point2 = loc[0][j+1];
                    time = loc[1][j];
                    n =time*60*1000.0/(s*t);
                    i = 1;
                    j++;
                    runALine = setInterval(function () { BusRun(point1,point2); },30);
                }else {return;}
            }

            function peopleOffOrOn(){
                if(pot1[3] == "get-on"){
                    if(pot1[4] == "down"){
                        stationData[pot1[2]-1].down -= 70;
                        baseMap.graphics.remove(waitingPeople[pot1[2]][1]);
                        baseMap.graphics.remove(waitPeopleNum[pot1[2]][1]);

                        waitingPeople[pot1[2]][1].symbol.setUrl("../resources/pic/"+Math.ceil(stationData[pot1[2]-1].down/70)+".png");
                        waitingPeople[pot1[2]][1].symbol.width = 10*Math.ceil(stationData[pot1[2]-1].down/70)*4/3;
                        waitingPeople[pot1[2]][1].symbol.xoffset = 5*Math.ceil(stationData[pot1[2]-1].down/70)*4/3+peopleXoffset*4/3;
                        waitPeopleNum[pot1[2]][1].symbol.text = stationData[pot1[2]-1].down;

                        baseMap.graphics.add(waitPeopleNum[pot1[2]][1]);
                        baseMap.graphics.add(waitingPeople[pot1[2]][1]);
                    } else{
                        stationData[pot1[2]-1].up -= 70;
                        baseMap.graphics.remove(waitingPeople[pot1[2]][0]);
                        baseMap.graphics.remove(waitPeopleNum[pot1[2]][0]);

                        waitingPeople[pot1[2]][0].symbol.setUrl("../resources/pic/"+Math.ceil(stationData[pot1[2]-1].up/70)+".png");
                        waitingPeople[pot1[2]][0].symbol.width = 10*Math.ceil(stationData[pot1[2]-1].up/70)*4/3;
                        waitingPeople[pot1[2]][0].symbol.xoffset = -5*Math.ceil(stationData[pot1[2]-1].up/70)*4/3-peopleXoffset*4/3;
                        waitPeopleNum[pot1[2]][0].symbol.text = stationData[pot1[2]-1].up;

                        baseMap.graphics.add(waitPeopleNum[pot1[2]][0]);
                        baseMap.graphics.add(waitingPeople[pot1[2]][0]);
                    }
                }else if(pot1[3] == "get-off"){
                    peopleOff_graphic_def.geometry.x = pot1[0];
                    peopleOff_graphic_def.geometry.y = pot1[1];
                    if(pot1[4] == "down"){
                        peopleOff_graphic_def.symbol.xoffset = 20;
                    } else{
                        peopleOff_graphic_def.symbol.xoffset = -20;
                    }
                    var peopleOffGraphic = new Graphic(peopleOff_graphic_def);
                    baseMap.graphics.add(peopleOffGraphic);
                    setTimeout(function(){return baseMap.graphics.remove(peopleOffGraphic);},2000);
                }
                setTimeout(prepareStart, 1000);
            }
            setTimeout(peopleOffOrOn,1000);
        }

        function BusRun(pot0,pot1){
            if(i>n) {
                clearInterval(runALine);
                BusStop(pot0,pot1)
            }
            bus.geometry.setX(pot0[0]+(pot1[0]-pot0[0])/n*i);
            bus.geometry.setY(pot0[1]+(pot1[1]-pot0[1])/n*i);
            i++;
            baseMap.graphics.remove(bus);
            baseMap.graphics.add(bus);
        }
        runALine = setInterval(function () { BusRun(point1,point2); },t);
    }
})