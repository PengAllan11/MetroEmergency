/**
 * Created by peng_an on 2016/10/3.
 */
/**
 * some constants for definitions
 * @type {*[]}
 */
var peoNumXoffset = 25;
var peopleXoffset = 35;

/**
 * s:加快比率
 * t:播放间隔（ms）
 */
var s = 200;
var t = 30;

var stationData=[
    {
        x:121.2263, y:31.032211, name:"松江新城", id:1, up:0, down:580
    },{
        x:121.22817, y:31.056201, name:"松江大学城", id:2, up:340, down:617
    },{
        x:121.226041, y:31.086488, name:"洞泾", id:3, up:296, down:355
    },{
        x:121.225152, y:31.106646, name:"佘山", id:4, up:535, down:468
    },{
        x:121.256219, y:31.12045, name:"泗泾", id:5, up:502, down:769
    },{
        x:121.314195, y:31.139307, name:"九亭", id:6, up:323, down:0
    }
];

var locTime = [
    [
        [121.197,31.034,0,"start",0],
        [121.226,31.032,1,"get-on","down"],
        [121.314,31.139,6,"get-off",""],
        [121.225,31.107,4,"get-on","down"],
        [121.314,31.139,6,"get-off",""],
        [121.226,31.032,1,"get-on","down"],
        [121.314,31.139,6,"get-off",""]
    ],
    [7.0,28.4,11.0,11.0,28.4,28.4]
];

var busesRoute = {
    bus1:[
        [
            [121.197,31.034,0,"start",0],
            [121.226,31.032,1,"get-on","down"],
            [121.314,31.139,6,"get-off","down"],
            [121.225,31.107,4,"get-on","down"],
            [121.314,31.139,6,"get-off","down"],
            [121.226,31.032,1,"get-on","down"],
            [121.314,31.139,6,"get-off","down"]
        ],
        [7.0,28.4,11.0,11.0,28.4,28.4]
    ],
    bus2:[
        [
            [121.191,31.030,0,"start",0],
            [121.226,31.032,1,"get-on","down"],
            [121.314,31.139,6,"get-off","down"],
            [121.226041,31.086488,3,"get-on","down"],
            [121.314,31.139,6,"get-off","down"],
            [121.22817,31.056201,2,"get-on","down"],
            [121.314,31.139,6,"get-off","down"]
        ],
        [7.0,28.4,16.2,16.2,22,22]
    ],
    bus3:[
        [
            [121.289,31.083,0,"start",0],
            [121.314195,31.139307,6,"get-on","up"],
            [121.2263,31.032211,1,"get-off","up"],
            [121.225152,31.106646,4,"get-on","up"],
            [121.2263,31.032211,1,"get-off","up"],
            [121.225152,31.106646,4,"get-on","up"],
            [121.2263,31.032211,1,"get-off","up"]
        ],
        [15.0,28.4,17.4,17.4,17.4,17.4]
    ],
    bus4:[
        [
            [121.235,31.152,0,"start",0],
            [121.256219,31.12045,5,"get-on","up"],
            [121.2263,31.032211,1,"get-off","up"],
            [121.226041,31.086488,3,"get-on","up"],
            [121.2263,31.032211,1,"get-off","up"],
            [121.256219,31.12045,5,"get-on","up"],
            [121.2263,31.032211,1,"get-off","up"]
        ],
        [6.0,23.5,12.2,12.2,23.5,23.5]
    ],
    bus5:[
        [
            [121.201,31.067,0,"start",0],
            [121.22817,31.056201,2,"get-on","down"],
            [121.314195,31.139307,6,"get-off","down"],
            [121.22817,31.056201,2,"get-on","down"],
            [121.314195,31.139307,6,"get-off","down"],
            [121.22817,31.056201,2,"get-on","down"],
            [121.314195,31.139307,6,"get-off","down"]
        ],
        [4,22,22,22,22,22]
    //],
    //bus6:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus7:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus8:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus9:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus10:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus11:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus12:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus13:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus14:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    //],
    //bus15:[
    //    [
    //        [121.191,31.034,0,"start",0],
    //        [121.226,31.032,1,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.226041,31.086488,3,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""],
    //        [121.22817,31.056201,2,"get-on","down"],
    //        [121.314,31.139,6,"get-off",""]
    //    ],
    //    [7.0,28.4,16.2,16.2,22,22]
    ]
};
