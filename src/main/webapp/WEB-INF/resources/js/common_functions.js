/**
 * Created by peng_an on 2016/10/16.
 */

/**
 * 初始化公交
 * @param busesRoute
 * @returns {Array}
 */

function get_spec_PeopleOnGraphicDef(i, dir){
    peopleOn_graphic_def.geometry.x = stationData[i].x;
    peopleOn_graphic_def.geometry.y = stationData[i].y;
    //0对应up, 1对应down
    if(dir == "up"){
        peopleOn_graphic_def.symbol.url = "../resources/pic/"+Math.ceil(stationData[i].up/70)+".png";
        peopleOn_graphic_def.symbol.width = 10*Math.ceil(stationData[i].up/70);
        peopleOn_graphic_def.symbol.xoffset = -5*Math.ceil(stationData[i].up/70)-peopleXoffset;
    }else{
        peopleOn_graphic_def.symbol.url = "../resources/pic/"+Math.ceil(stationData[i].down/70)+".png";
        peopleOn_graphic_def.symbol.width = 10*Math.ceil(stationData[i].down/70);
        peopleOn_graphic_def.symbol.xoffset = 5*Math.ceil(stationData[i].down/70)+peopleXoffset;
    }
    return peopleOn_graphic_def
}

function get_spec_PeoNumGraphicDef(i, dir){
    people_num_graphic_def.geometry.x = stationData[i].x;
    people_num_graphic_def.geometry.y = stationData[i].y;

    if(dir == "up"){
        people_num_graphic_def.symbol.text = stationData[i].up;
        people_num_graphic_def.symbol.xoffset = -peoNumXoffset;
    }else{
        people_num_graphic_def.symbol.text = stationData[i].down;
        people_num_graphic_def.symbol.xoffset = peoNumXoffset;
    }
    return people_num_graphic_def;
}