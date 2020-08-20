/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 3.0, "series": [{"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/checkMyLogin", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-10", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "\/board\/tasksList", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-10", "isController": false}, {"data": [[600.0, 3.0]], "isOverall": false, "label": "\/board\/ajax?action=getempdata", "isController": false}, {"data": [[5600.0, 1.0]], "isOverall": false, "label": "\/board\/login", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGt6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q1q&sid=XCCyDv5IazUeoY-yAAAE", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/show_activities-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/show_activities-0", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "Test Edit Task", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q0-", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "\/employee\/task_change_location", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/tasks\/updateEod", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-7", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "\/employee\/login", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/get_auto_gen_id", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-4", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/board\/ajax_show_all_employee", "isController": false}, {"data": [[16700.0, 1.0]], "isOverall": false, "label": "\/employee\/task_completed", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGuO&sid=XjMCnlEw2rW_JnOBAAAP", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "Test Comment", "isController": true}, {"data": [[1100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "JSR223 Sampler", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-8", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Test Logout Employee", "isController": true}, {"data": [[8200.0, 1.0]], "isOverall": false, "label": "Test Login Board", "isController": true}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/employee\/logout", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/board\/login-1", "isController": false}, {"data": [[5000.0, 1.0]], "isOverall": false, "label": "\/board\/login-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-14", "isController": false}, {"data": [[1700.0, 1.0]], "isOverall": false, "label": "\/employee\/start_task", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/board\/login-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-13", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/employee", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/board-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/logout-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/show_activities", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/checkTaskName", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "\/board-0", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "\/board-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/board-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/board-3", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "\/board-4", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/board-5", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/tasks\/get_list_tasks?projectId=13", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-14", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-13", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-12", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/set_session_ini", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-10", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUq&sid=D_1NmGdB4-9wQkdEAAAQ", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "Test Login Employee", "isController": true}, {"data": [[2900.0, 1.0]], "isOverall": false, "label": "Test Create Task", "isController": true}, {"data": [[0.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "\/employee\/home-15", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "\/employee\/save_comment", "isController": false}, {"data": [[19400.0, 1.0]], "isOverall": false, "label": "Test Complete Task", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/getperticulartask", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-33", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-32", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-31", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-30", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/tasks\/save_board_EditTaskInfo", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-29", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/employee\/login-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-28", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-27", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUb", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-26", "isController": false}, {"data": [[1400.0, 1.0]], "isOverall": false, "label": "\/board", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "\/board\/login-25", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-24", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-23", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-22", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-21", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-20", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/employee\/login-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/tasks\/check_is_in_parent_id", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-2", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-19", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-0", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-18", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-5", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-17", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-6", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-16", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-3", "isController": false}, {"data": [[200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "\/employee\/home", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/board\/login-15", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "\/tasks\/tasksInfoById", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-4", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-5", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-9", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "Test Logout Board", "isController": true}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-2", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-3", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "\/board\/addNewTask", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-7", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "\/employee\/home-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-8", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "\/employee\/home-1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 19400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 5.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 162.0, "series": [{"data": [[0.0, 162.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 7.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 5.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 5.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.59783216E12, "maxY": 1.0, "series": [{"data": [[1.59783216E12, 1.0]], "isOverall": false, "label": "setUp Thread Group", "isController": false}, {"data": [[1.59783222E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.59783222E12, 1.0]], "isOverall": false, "label": "tearDown Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59783222E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 9.0, "minX": 1.0, "maxY": 19484.0, "series": [{"data": [[1.0, 38.0]], "isOverall": false, "label": "\/employee\/checkMyLogin", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/employee\/checkMyLogin-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-10", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-10-Aggregated", "isController": false}, {"data": [[1.0, 41.0]], "isOverall": false, "label": "\/board\/tasksList", "isController": false}, {"data": [[1.0, 41.0]], "isOverall": false, "label": "\/board\/tasksList-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/board\/login-14", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/board\/login-14-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/board\/login-13", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/board\/login-13-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/board\/login-12", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/board\/login-12-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-11", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-11-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-10", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-10-Aggregated", "isController": false}, {"data": [[1.0, 626.6666666666666]], "isOverall": false, "label": "\/board\/ajax?action=getempdata", "isController": false}, {"data": [[1.0, 626.6666666666666]], "isOverall": false, "label": "\/board\/ajax?action=getempdata-Aggregated", "isController": false}, {"data": [[1.0, 5654.0]], "isOverall": false, "label": "\/board\/login", "isController": false}, {"data": [[1.0, 5654.0]], "isOverall": false, "label": "\/board\/login-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGt6", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGt6-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q1q&sid=XCCyDv5IazUeoY-yAAAE", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q1q&sid=XCCyDv5IazUeoY-yAAAE-Aggregated", "isController": false}, {"data": [[1.0, 33.0]], "isOverall": false, "label": "\/board\/show_activities-1", "isController": false}, {"data": [[1.0, 33.0]], "isOverall": false, "label": "\/board\/show_activities-1-Aggregated", "isController": false}, {"data": [[1.0, 41.0]], "isOverall": false, "label": "\/board\/show_activities-0", "isController": false}, {"data": [[1.0, 41.0]], "isOverall": false, "label": "\/board\/show_activities-0-Aggregated", "isController": false}, {"data": [[1.0, 985.0]], "isOverall": false, "label": "Test Edit Task", "isController": true}, {"data": [[1.0, 985.0]], "isOverall": false, "label": "Test Edit Task-Aggregated", "isController": true}, {"data": [[1.0, 166.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q0-", "isController": false}, {"data": [[1.0, 166.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q0--Aggregated", "isController": false}, {"data": [[1.0, 118.5]], "isOverall": false, "label": "\/employee\/task_change_location", "isController": false}, {"data": [[1.0, 118.5]], "isOverall": false, "label": "\/employee\/task_change_location-Aggregated", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "\/employee-0", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "\/employee-0-Aggregated", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "\/employee-1", "isController": false}, {"data": [[1.0, 82.0]], "isOverall": false, "label": "\/employee-1-Aggregated", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "\/employee-2", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "\/employee-2-Aggregated", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "\/tasks\/updateEod", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "\/tasks\/updateEod-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "\/employee-3", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "\/employee-3-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/employee-4", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/employee-4-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-9", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-9-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "\/employee-5", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "\/employee-5-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee-6", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee-6-Aggregated", "isController": false}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout", "isController": false}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee-7", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee-7-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee-8", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee-8-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "\/employee\/logout-5", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "\/employee\/logout-5-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-6", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-6-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/logout-7", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/logout-7-Aggregated", "isController": false}, {"data": [[1.0, 321.0]], "isOverall": false, "label": "\/employee\/login", "isController": false}, {"data": [[1.0, 321.0]], "isOverall": false, "label": "\/employee\/login-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-8", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-8-Aggregated", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "\/employee\/logout-1", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "\/employee\/logout-1-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/logout-2", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/logout-2-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-3", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-3-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/board\/get_auto_gen_id", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/board\/get_auto_gen_id-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-4", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/logout-4-Aggregated", "isController": false}, {"data": [[1.0, 176.0]], "isOverall": false, "label": "\/board\/ajax_show_all_employee", "isController": false}, {"data": [[1.0, 176.0]], "isOverall": false, "label": "\/board\/ajax_show_all_employee-Aggregated", "isController": false}, {"data": [[1.0, 16724.0]], "isOverall": false, "label": "\/employee\/task_completed", "isController": false}, {"data": [[1.0, 16724.0]], "isOverall": false, "label": "\/employee\/task_completed-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGuO&sid=XjMCnlEw2rW_JnOBAAAP", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGuO&sid=XjMCnlEw2rW_JnOBAAAP-Aggregated", "isController": false}, {"data": [[1.0, 1470.0]], "isOverall": false, "label": "Test Comment", "isController": true}, {"data": [[1.0, 1470.0]], "isOverall": false, "label": "Test Comment-Aggregated", "isController": true}, {"data": [[1.0, 667.5]], "isOverall": false, "label": "JSR223 Sampler", "isController": false}, {"data": [[1.0, 667.5]], "isOverall": false, "label": "JSR223 Sampler-Aggregated", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "\/board\/login-9", "isController": false}, {"data": [[1.0, 77.0]], "isOverall": false, "label": "\/board\/login-9-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "\/board\/login-8", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "\/board\/login-8-Aggregated", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "Test Logout Employee", "isController": true}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "Test Logout Employee-Aggregated", "isController": true}, {"data": [[1.0, 8244.0]], "isOverall": false, "label": "Test Login Board", "isController": true}, {"data": [[1.0, 8244.0]], "isOverall": false, "label": "Test Login Board-Aggregated", "isController": true}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "\/employee\/logout", "isController": false}, {"data": [[1.0, 158.0]], "isOverall": false, "label": "\/employee\/logout-Aggregated", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "\/board\/login-5", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "\/board\/login-5-Aggregated", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "\/employee\/login-12", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "\/employee\/login-12-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "\/board\/login-4", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "\/board\/login-4-Aggregated", "isController": false}, {"data": [[1.0, 33.0]], "isOverall": false, "label": "\/employee\/login-11", "isController": false}, {"data": [[1.0, 33.0]], "isOverall": false, "label": "\/employee\/login-11-Aggregated", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "\/board\/login-7", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "\/board\/login-7-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/employee\/login-10", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/employee\/login-10-Aggregated", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "\/board\/login-6", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "\/board\/login-6-Aggregated", "isController": false}, {"data": [[1.0, 187.0]], "isOverall": false, "label": "\/board\/login-1", "isController": false}, {"data": [[1.0, 187.0]], "isOverall": false, "label": "\/board\/login-1-Aggregated", "isController": false}, {"data": [[1.0, 5052.0]], "isOverall": false, "label": "\/board\/login-0", "isController": false}, {"data": [[1.0, 5052.0]], "isOverall": false, "label": "\/board\/login-0-Aggregated", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "\/board\/login-3", "isController": false}, {"data": [[1.0, 81.0]], "isOverall": false, "label": "\/board\/login-3-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/login-14", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/login-14-Aggregated", "isController": false}, {"data": [[1.0, 1764.0]], "isOverall": false, "label": "\/employee\/start_task", "isController": false}, {"data": [[1.0, 1764.0]], "isOverall": false, "label": "\/employee\/start_task-Aggregated", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "\/board\/login-2", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "\/board\/login-2-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "\/employee\/login-13", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "\/employee\/login-13-Aggregated", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "\/employee", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "\/employee-Aggregated", "isController": false}, {"data": [[1.0, 122.0]], "isOverall": false, "label": "\/board-6", "isController": false}, {"data": [[1.0, 122.0]], "isOverall": false, "label": "\/board-6-Aggregated", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "\/board-7", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "\/board-7-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/board-8", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/board-8-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board-9", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board-9-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "\/employee\/logout-0", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "\/employee\/logout-0-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "\/board\/show_activities", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "\/board\/show_activities-Aggregated", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "\/board\/checkTaskName", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "\/board\/checkTaskName-Aggregated", "isController": false}, {"data": [[1.0, 1019.0]], "isOverall": false, "label": "\/board-0", "isController": false}, {"data": [[1.0, 1019.0]], "isOverall": false, "label": "\/board-0-Aggregated", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "\/board-1", "isController": false}, {"data": [[1.0, 286.0]], "isOverall": false, "label": "\/board-1-Aggregated", "isController": false}, {"data": [[1.0, 187.0]], "isOverall": false, "label": "\/board-2", "isController": false}, {"data": [[1.0, 187.0]], "isOverall": false, "label": "\/board-2-Aggregated", "isController": false}, {"data": [[1.0, 175.0]], "isOverall": false, "label": "\/board-3", "isController": false}, {"data": [[1.0, 175.0]], "isOverall": false, "label": "\/board-3-Aggregated", "isController": false}, {"data": [[1.0, 221.0]], "isOverall": false, "label": "\/board-4", "isController": false}, {"data": [[1.0, 221.0]], "isOverall": false, "label": "\/board-4-Aggregated", "isController": false}, {"data": [[1.0, 191.0]], "isOverall": false, "label": "\/board-5", "isController": false}, {"data": [[1.0, 191.0]], "isOverall": false, "label": "\/board-5-Aggregated", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "\/tasks\/get_list_tasks?projectId=13", "isController": false}, {"data": [[1.0, 155.0]], "isOverall": false, "label": "\/tasks\/get_list_tasks?projectId=13-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/home-14", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/home-14-Aggregated", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "\/employee\/home-13", "isController": false}, {"data": [[1.0, 9.0]], "isOverall": false, "label": "\/employee\/home-13-Aggregated", "isController": false}, {"data": [[1.0, 37.333333333333336]], "isOverall": false, "label": "\/employee\/home-12", "isController": false}, {"data": [[1.0, 37.333333333333336]], "isOverall": false, "label": "\/employee\/home-12-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/home-11", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/home-11-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/board\/set_session_ini", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/board\/set_session_ini-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/home-10", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/home-10-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUq&sid=D_1NmGdB4-9wQkdEAAAQ", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUq&sid=D_1NmGdB4-9wQkdEAAAQ-Aggregated", "isController": false}, {"data": [[1.0, 490.0]], "isOverall": false, "label": "Test Login Employee", "isController": true}, {"data": [[1.0, 490.0]], "isOverall": false, "label": "Test Login Employee-Aggregated", "isController": true}, {"data": [[1.0, 2943.0]], "isOverall": false, "label": "Test Create Task", "isController": true}, {"data": [[1.0, 2943.0]], "isOverall": false, "label": "Test Create Task-Aggregated", "isController": true}, {"data": [[1.0, 115.66666666666666]], "isOverall": false, "label": "\/employee\/home-15", "isController": false}, {"data": [[1.0, 115.66666666666666]], "isOverall": false, "label": "\/employee\/home-15-Aggregated", "isController": false}, {"data": [[1.0, 1240.0]], "isOverall": false, "label": "\/employee\/save_comment", "isController": false}, {"data": [[1.0, 1240.0]], "isOverall": false, "label": "\/employee\/save_comment-Aggregated", "isController": false}, {"data": [[1.0, 19484.0]], "isOverall": false, "label": "Test Complete Task", "isController": true}, {"data": [[1.0, 19484.0]], "isOverall": false, "label": "Test Complete Task-Aggregated", "isController": true}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/board\/getperticulartask", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/board\/getperticulartask-Aggregated", "isController": false}, {"data": [[1.0, 20.0]], "isOverall": false, "label": "\/board\/login-33", "isController": false}, {"data": [[1.0, 20.0]], "isOverall": false, "label": "\/board\/login-33-Aggregated", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "\/board\/login-32", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "\/board\/login-32-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "\/board\/login-31", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "\/board\/login-31-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "\/board\/login-30", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "\/board\/login-30-Aggregated", "isController": false}, {"data": [[1.0, 94.0]], "isOverall": false, "label": "\/tasks\/save_board_EditTaskInfo", "isController": false}, {"data": [[1.0, 94.0]], "isOverall": false, "label": "\/tasks\/save_board_EditTaskInfo-Aggregated", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "\/employee\/login-5", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "\/employee\/login-5-Aggregated", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "\/employee\/login-4", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "\/employee\/login-4-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/login-3", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/employee\/login-3-Aggregated", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "\/employee\/login-2", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "\/employee\/login-2-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "\/board\/login-29", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "\/board\/login-29-Aggregated", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "\/employee\/login-1", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "\/employee\/login-1-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/board\/login-28", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/board\/login-28-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "\/employee\/login-0", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "\/employee\/login-0-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "\/board\/login-27", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "\/board\/login-27-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUb", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUb-Aggregated", "isController": false}, {"data": [[1.0, 42.0]], "isOverall": false, "label": "\/board\/login-26", "isController": false}, {"data": [[1.0, 42.0]], "isOverall": false, "label": "\/board\/login-26-Aggregated", "isController": false}, {"data": [[1.0, 1401.0]], "isOverall": false, "label": "\/board", "isController": false}, {"data": [[1.0, 1401.0]], "isOverall": false, "label": "\/board-Aggregated", "isController": false}, {"data": [[1.0, 109.0]], "isOverall": false, "label": "\/board\/login-25", "isController": false}, {"data": [[1.0, 109.0]], "isOverall": false, "label": "\/board\/login-25-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-24", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-24-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/board\/login-23", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/board\/login-23-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "\/board\/login-22", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "\/board\/login-22-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/board\/login-21", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/board\/login-21-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "\/employee\/login-9", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "\/employee\/login-9-Aggregated", "isController": false}, {"data": [[1.0, 98.0]], "isOverall": false, "label": "\/board\/login-20", "isController": false}, {"data": [[1.0, 98.0]], "isOverall": false, "label": "\/board\/login-20-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/employee\/login-8", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "\/employee\/login-8-Aggregated", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "\/employee\/login-7", "isController": false}, {"data": [[1.0, 78.0]], "isOverall": false, "label": "\/employee\/login-7-Aggregated", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "\/employee\/login-6", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "\/employee\/login-6-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-1", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-1-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/tasks\/check_is_in_parent_id", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "\/tasks\/check_is_in_parent_id-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-2", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-2-Aggregated", "isController": false}, {"data": [[1.0, 34.666666666666664]], "isOverall": false, "label": "\/employee\/home-8", "isController": false}, {"data": [[1.0, 34.666666666666664]], "isOverall": false, "label": "\/employee\/home-8-Aggregated", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "\/board\/login-19", "isController": false}, {"data": [[1.0, 76.0]], "isOverall": false, "label": "\/board\/login-19-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-0", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-0-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/home-9", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/home-9-Aggregated", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "\/board\/login-18", "isController": false}, {"data": [[1.0, 60.0]], "isOverall": false, "label": "\/board\/login-18-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-5", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-5-Aggregated", "isController": false}, {"data": [[1.0, 17.333333333333332]], "isOverall": false, "label": "\/employee\/home-6", "isController": false}, {"data": [[1.0, 17.333333333333332]], "isOverall": false, "label": "\/employee\/home-6-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-17", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-17-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-6", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-6-Aggregated", "isController": false}, {"data": [[1.0, 46.333333333333336]], "isOverall": false, "label": "\/employee\/home-7", "isController": false}, {"data": [[1.0, 46.333333333333336]], "isOverall": false, "label": "\/employee\/home-7-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-16", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "\/board\/login-16-Aggregated", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-3", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-3-Aggregated", "isController": false}, {"data": [[1.0, 329.6666666666667]], "isOverall": false, "label": "\/employee\/home", "isController": false}, {"data": [[1.0, 329.6666666666667]], "isOverall": false, "label": "\/employee\/home-Aggregated", "isController": false}, {"data": [[1.0, 34.666666666666664]], "isOverall": false, "label": "\/employee\/home-4", "isController": false}, {"data": [[1.0, 34.666666666666664]], "isOverall": false, "label": "\/employee\/home-4-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/board\/login-15", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/board\/login-15-Aggregated", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "\/tasks\/tasksInfoById", "isController": false}, {"data": [[1.0, 48.0]], "isOverall": false, "label": "\/tasks\/tasksInfoById-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-4", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-4-Aggregated", "isController": false}, {"data": [[1.0, 34.333333333333336]], "isOverall": false, "label": "\/employee\/home-5", "isController": false}, {"data": [[1.0, 34.333333333333336]], "isOverall": false, "label": "\/employee\/home-5-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-9", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-9-Aggregated", "isController": false}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "Test Logout Board", "isController": true}, {"data": [[1.0, 170.0]], "isOverall": false, "label": "Test Logout Board-Aggregated", "isController": true}, {"data": [[1.0, 35.333333333333336]], "isOverall": false, "label": "\/employee\/home-2", "isController": false}, {"data": [[1.0, 35.333333333333336]], "isOverall": false, "label": "\/employee\/home-2-Aggregated", "isController": false}, {"data": [[1.0, 35.666666666666664]], "isOverall": false, "label": "\/employee\/home-3", "isController": false}, {"data": [[1.0, 35.666666666666664]], "isOverall": false, "label": "\/employee\/home-3-Aggregated", "isController": false}, {"data": [[1.0, 1926.0]], "isOverall": false, "label": "\/board\/addNewTask", "isController": false}, {"data": [[1.0, 1926.0]], "isOverall": false, "label": "\/board\/addNewTask-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-7", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-7-Aggregated", "isController": false}, {"data": [[1.0, 133.66666666666666]], "isOverall": false, "label": "\/employee\/home-0", "isController": false}, {"data": [[1.0, 133.66666666666666]], "isOverall": false, "label": "\/employee\/home-0-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-8", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-8-Aggregated", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/home-1", "isController": false}, {"data": [[1.0, 35.0]], "isOverall": false, "label": "\/employee\/home-1-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 0.0, "minX": 1.59783216E12, "maxY": 95909.13333333333, "series": [{"data": [[1.59783222E12, 95909.13333333333], [1.59783216E12, 0.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59783222E12, 5459.116666666667], [1.59783216E12, 0.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59783222E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 9.0, "minX": 1.59783216E12, "maxY": 19484.0, "series": [{"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/employee\/checkMyLogin", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-10", "isController": false}, {"data": [[1.59783222E12, 41.0]], "isOverall": false, "label": "\/board\/tasksList", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/login-14", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/login-13", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/login-12", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-11", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-10", "isController": false}, {"data": [[1.59783222E12, 626.6666666666666]], "isOverall": false, "label": "\/board\/ajax?action=getempdata", "isController": false}, {"data": [[1.59783222E12, 5654.0]], "isOverall": false, "label": "\/board\/login", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGt6", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q1q&sid=XCCyDv5IazUeoY-yAAAE", "isController": false}, {"data": [[1.59783222E12, 33.0]], "isOverall": false, "label": "\/board\/show_activities-1", "isController": false}, {"data": [[1.59783222E12, 41.0]], "isOverall": false, "label": "\/board\/show_activities-0", "isController": false}, {"data": [[1.59783222E12, 985.0]], "isOverall": false, "label": "Test Edit Task", "isController": true}, {"data": [[1.59783222E12, 166.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q0-", "isController": false}, {"data": [[1.59783222E12, 118.5]], "isOverall": false, "label": "\/employee\/task_change_location", "isController": false}, {"data": [[1.59783222E12, 45.0]], "isOverall": false, "label": "\/employee-0", "isController": false}, {"data": [[1.59783222E12, 82.0]], "isOverall": false, "label": "\/employee-1", "isController": false}, {"data": [[1.59783222E12, 45.0]], "isOverall": false, "label": "\/employee-2", "isController": false}, {"data": [[1.59783222E12, 136.0]], "isOverall": false, "label": "\/tasks\/updateEod", "isController": false}, {"data": [[1.59783222E12, 37.0]], "isOverall": false, "label": "\/employee-3", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/employee-4", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/logout-9", "isController": false}, {"data": [[1.59783222E12, 59.0]], "isOverall": false, "label": "\/employee-5", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee-6", "isController": false}, {"data": [[1.59783222E12, 170.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee-7", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee-8", "isController": false}, {"data": [[1.59783222E12, 36.0]], "isOverall": false, "label": "\/employee\/logout-5", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/logout-6", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/employee\/logout-7", "isController": false}, {"data": [[1.59783222E12, 321.0]], "isOverall": false, "label": "\/employee\/login", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/logout-8", "isController": false}, {"data": [[1.59783222E12, 45.0]], "isOverall": false, "label": "\/employee\/logout-1", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/employee\/logout-2", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/logout-3", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/get_auto_gen_id", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/logout-4", "isController": false}, {"data": [[1.59783222E12, 176.0]], "isOverall": false, "label": "\/board\/ajax_show_all_employee", "isController": false}, {"data": [[1.59783222E12, 16724.0]], "isOverall": false, "label": "\/employee\/task_completed", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGuO&sid=XjMCnlEw2rW_JnOBAAAP", "isController": false}, {"data": [[1.59783222E12, 1470.0]], "isOverall": false, "label": "Test Comment", "isController": true}, {"data": [[1.59783222E12, 228.0], [1.59783216E12, 1107.0]], "isOverall": false, "label": "JSR223 Sampler", "isController": false}, {"data": [[1.59783222E12, 77.0]], "isOverall": false, "label": "\/board\/login-9", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/login-8", "isController": false}, {"data": [[1.59783222E12, 158.0]], "isOverall": false, "label": "Test Logout Employee", "isController": true}, {"data": [[1.59783222E12, 8244.0]], "isOverall": false, "label": "Test Login Board", "isController": true}, {"data": [[1.59783222E12, 158.0]], "isOverall": false, "label": "\/employee\/logout", "isController": false}, {"data": [[1.59783222E12, 43.0]], "isOverall": false, "label": "\/board\/login-5", "isController": false}, {"data": [[1.59783222E12, 70.0]], "isOverall": false, "label": "\/employee\/login-12", "isController": false}, {"data": [[1.59783222E12, 65.0]], "isOverall": false, "label": "\/board\/login-4", "isController": false}, {"data": [[1.59783222E12, 33.0]], "isOverall": false, "label": "\/employee\/login-11", "isController": false}, {"data": [[1.59783222E12, 47.0]], "isOverall": false, "label": "\/board\/login-7", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/employee\/login-10", "isController": false}, {"data": [[1.59783222E12, 49.0]], "isOverall": false, "label": "\/board\/login-6", "isController": false}, {"data": [[1.59783222E12, 187.0]], "isOverall": false, "label": "\/board\/login-1", "isController": false}, {"data": [[1.59783222E12, 5052.0]], "isOverall": false, "label": "\/board\/login-0", "isController": false}, {"data": [[1.59783222E12, 81.0]], "isOverall": false, "label": "\/board\/login-3", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/employee\/login-14", "isController": false}, {"data": [[1.59783222E12, 1764.0]], "isOverall": false, "label": "\/employee\/start_task", "isController": false}, {"data": [[1.59783222E12, 127.0]], "isOverall": false, "label": "\/board\/login-2", "isController": false}, {"data": [[1.59783222E12, 36.0]], "isOverall": false, "label": "\/employee\/login-13", "isController": false}, {"data": [[1.59783222E12, 131.0]], "isOverall": false, "label": "\/employee", "isController": false}, {"data": [[1.59783222E12, 122.0]], "isOverall": false, "label": "\/board-6", "isController": false}, {"data": [[1.59783222E12, 47.0]], "isOverall": false, "label": "\/board-7", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/board-8", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board-9", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/employee\/logout-0", "isController": false}, {"data": [[1.59783222E12, 76.0]], "isOverall": false, "label": "\/board\/show_activities", "isController": false}, {"data": [[1.59783222E12, 53.0]], "isOverall": false, "label": "\/board\/checkTaskName", "isController": false}, {"data": [[1.59783222E12, 1019.0]], "isOverall": false, "label": "\/board-0", "isController": false}, {"data": [[1.59783222E12, 286.0]], "isOverall": false, "label": "\/board-1", "isController": false}, {"data": [[1.59783222E12, 187.0]], "isOverall": false, "label": "\/board-2", "isController": false}, {"data": [[1.59783222E12, 175.0]], "isOverall": false, "label": "\/board-3", "isController": false}, {"data": [[1.59783222E12, 221.0]], "isOverall": false, "label": "\/board-4", "isController": false}, {"data": [[1.59783222E12, 191.0]], "isOverall": false, "label": "\/board-5", "isController": false}, {"data": [[1.59783222E12, 155.0]], "isOverall": false, "label": "\/tasks\/get_list_tasks?projectId=13", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/home-14", "isController": false}, {"data": [[1.59783222E12, 9.0]], "isOverall": false, "label": "\/employee\/home-13", "isController": false}, {"data": [[1.59783222E12, 37.333333333333336]], "isOverall": false, "label": "\/employee\/home-12", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/home-11", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/set_session_ini", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/home-10", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUq&sid=D_1NmGdB4-9wQkdEAAAQ", "isController": false}, {"data": [[1.59783222E12, 490.0]], "isOverall": false, "label": "Test Login Employee", "isController": true}, {"data": [[1.59783222E12, 2943.0]], "isOverall": false, "label": "Test Create Task", "isController": true}, {"data": [[1.59783222E12, 115.66666666666666]], "isOverall": false, "label": "\/employee\/home-15", "isController": false}, {"data": [[1.59783222E12, 1240.0]], "isOverall": false, "label": "\/employee\/save_comment", "isController": false}, {"data": [[1.59783222E12, 19484.0]], "isOverall": false, "label": "Test Complete Task", "isController": true}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/getperticulartask", "isController": false}, {"data": [[1.59783222E12, 20.0]], "isOverall": false, "label": "\/board\/login-33", "isController": false}, {"data": [[1.59783222E12, 47.0]], "isOverall": false, "label": "\/board\/login-32", "isController": false}, {"data": [[1.59783222E12, 46.0]], "isOverall": false, "label": "\/board\/login-31", "isController": false}, {"data": [[1.59783222E12, 76.0]], "isOverall": false, "label": "\/board\/login-30", "isController": false}, {"data": [[1.59783222E12, 94.0]], "isOverall": false, "label": "\/tasks\/save_board_EditTaskInfo", "isController": false}, {"data": [[1.59783222E12, 50.0]], "isOverall": false, "label": "\/employee\/login-5", "isController": false}, {"data": [[1.59783222E12, 49.0]], "isOverall": false, "label": "\/employee\/login-4", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/login-3", "isController": false}, {"data": [[1.59783222E12, 48.0]], "isOverall": false, "label": "\/employee\/login-2", "isController": false}, {"data": [[1.59783222E12, 36.0]], "isOverall": false, "label": "\/board\/login-29", "isController": false}, {"data": [[1.59783222E12, 108.0]], "isOverall": false, "label": "\/employee\/login-1", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/board\/login-28", "isController": false}, {"data": [[1.59783222E12, 55.0]], "isOverall": false, "label": "\/employee\/login-0", "isController": false}, {"data": [[1.59783222E12, 37.0]], "isOverall": false, "label": "\/board\/login-27", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUb", "isController": false}, {"data": [[1.59783222E12, 42.0]], "isOverall": false, "label": "\/board\/login-26", "isController": false}, {"data": [[1.59783222E12, 1401.0]], "isOverall": false, "label": "\/board", "isController": false}, {"data": [[1.59783222E12, 109.0]], "isOverall": false, "label": "\/board\/login-25", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-24", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/login-23", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/login-22", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/login-21", "isController": false}, {"data": [[1.59783222E12, 36.0]], "isOverall": false, "label": "\/employee\/login-9", "isController": false}, {"data": [[1.59783222E12, 98.0]], "isOverall": false, "label": "\/board\/login-20", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/employee\/login-8", "isController": false}, {"data": [[1.59783222E12, 78.0]], "isOverall": false, "label": "\/employee\/login-7", "isController": false}, {"data": [[1.59783222E12, 53.0]], "isOverall": false, "label": "\/employee\/login-6", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-1", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/tasks\/check_is_in_parent_id", "isController": false}, {"data": [[1.59783222E12, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-2", "isController": false}, {"data": [[1.59783222E12, 34.666666666666664]], "isOverall": false, "label": "\/employee\/home-8", "isController": false}, {"data": [[1.59783222E12, 76.0]], "isOverall": false, "label": "\/board\/login-19", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-0", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/employee\/home-9", "isController": false}, {"data": [[1.59783222E12, 60.0]], "isOverall": false, "label": "\/board\/login-18", "isController": false}, {"data": [[1.59783222E12, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-5", "isController": false}, {"data": [[1.59783222E12, 17.333333333333332]], "isOverall": false, "label": "\/employee\/home-6", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-17", "isController": false}, {"data": [[1.59783222E12, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-6", "isController": false}, {"data": [[1.59783222E12, 46.333333333333336]], "isOverall": false, "label": "\/employee\/home-7", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-16", "isController": false}, {"data": [[1.59783222E12, 47.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-3", "isController": false}, {"data": [[1.59783222E12, 329.6666666666667]], "isOverall": false, "label": "\/employee\/home", "isController": false}, {"data": [[1.59783222E12, 34.666666666666664]], "isOverall": false, "label": "\/employee\/home-4", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/board\/login-15", "isController": false}, {"data": [[1.59783222E12, 48.0]], "isOverall": false, "label": "\/tasks\/tasksInfoById", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-4", "isController": false}, {"data": [[1.59783222E12, 34.333333333333336]], "isOverall": false, "label": "\/employee\/home-5", "isController": false}, {"data": [[1.59783222E12, 36.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-9", "isController": false}, {"data": [[1.59783222E12, 170.0]], "isOverall": false, "label": "Test Logout Board", "isController": true}, {"data": [[1.59783222E12, 35.333333333333336]], "isOverall": false, "label": "\/employee\/home-2", "isController": false}, {"data": [[1.59783222E12, 35.666666666666664]], "isOverall": false, "label": "\/employee\/home-3", "isController": false}, {"data": [[1.59783222E12, 1926.0]], "isOverall": false, "label": "\/board\/addNewTask", "isController": false}, {"data": [[1.59783222E12, 46.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-7", "isController": false}, {"data": [[1.59783222E12, 133.66666666666666]], "isOverall": false, "label": "\/employee\/home-0", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-8", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/employee\/home-1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59783222E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59783216E12, "maxY": 18928.0, "series": [{"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/employee\/checkMyLogin", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-10", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/tasksList", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/login-14", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/login-13", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/login-12", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-11", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-10", "isController": false}, {"data": [[1.59783222E12, 610.6666666666666]], "isOverall": false, "label": "\/board\/ajax?action=getempdata", "isController": false}, {"data": [[1.59783222E12, 5052.0]], "isOverall": false, "label": "\/board\/login", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGt6", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q1q&sid=XCCyDv5IazUeoY-yAAAE", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/show_activities-1", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/show_activities-0", "isController": false}, {"data": [[1.59783222E12, 933.0]], "isOverall": false, "label": "Test Edit Task", "isController": true}, {"data": [[1.59783222E12, 166.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q0-", "isController": false}, {"data": [[1.59783222E12, 118.5]], "isOverall": false, "label": "\/employee\/task_change_location", "isController": false}, {"data": [[1.59783222E12, 44.0]], "isOverall": false, "label": "\/employee-0", "isController": false}, {"data": [[1.59783222E12, 42.0]], "isOverall": false, "label": "\/employee-1", "isController": false}, {"data": [[1.59783222E12, 42.0]], "isOverall": false, "label": "\/employee-2", "isController": false}, {"data": [[1.59783222E12, 136.0]], "isOverall": false, "label": "\/tasks\/updateEod", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-3", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/employee-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-9", "isController": false}, {"data": [[1.59783222E12, 44.0]], "isOverall": false, "label": "\/employee-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-6", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-7", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-8", "isController": false}, {"data": [[1.59783222E12, 36.0]], "isOverall": false, "label": "\/employee\/logout-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-7", "isController": false}, {"data": [[1.59783222E12, 55.0]], "isOverall": false, "label": "\/employee\/login", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-8", "isController": false}, {"data": [[1.59783222E12, 45.0]], "isOverall": false, "label": "\/employee\/logout-1", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-3", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/get_auto_gen_id", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-4", "isController": false}, {"data": [[1.59783222E12, 54.0]], "isOverall": false, "label": "\/board\/ajax_show_all_employee", "isController": false}, {"data": [[1.59783222E12, 16723.0]], "isOverall": false, "label": "\/employee\/task_completed", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGuO&sid=XjMCnlEw2rW_JnOBAAAP", "isController": false}, {"data": [[1.59783222E12, 1338.0]], "isOverall": false, "label": "Test Comment", "isController": true}, {"data": [[1.59783222E12, 0.0], [1.59783216E12, 0.0]], "isOverall": false, "label": "JSR223 Sampler", "isController": false}, {"data": [[1.59783222E12, 74.0]], "isOverall": false, "label": "\/board\/login-9", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/login-8", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "Test Logout Employee", "isController": true}, {"data": [[1.59783222E12, 7117.0]], "isOverall": false, "label": "Test Login Board", "isController": true}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/employee\/logout", "isController": false}, {"data": [[1.59783222E12, 43.0]], "isOverall": false, "label": "\/board\/login-5", "isController": false}, {"data": [[1.59783222E12, 46.0]], "isOverall": false, "label": "\/employee\/login-12", "isController": false}, {"data": [[1.59783222E12, 64.0]], "isOverall": false, "label": "\/board\/login-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-11", "isController": false}, {"data": [[1.59783222E12, 47.0]], "isOverall": false, "label": "\/board\/login-7", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/employee\/login-10", "isController": false}, {"data": [[1.59783222E12, 49.0]], "isOverall": false, "label": "\/board\/login-6", "isController": false}, {"data": [[1.59783222E12, 100.0]], "isOverall": false, "label": "\/board\/login-1", "isController": false}, {"data": [[1.59783222E12, 5052.0]], "isOverall": false, "label": "\/board\/login-0", "isController": false}, {"data": [[1.59783222E12, 53.0]], "isOverall": false, "label": "\/board\/login-3", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/employee\/login-14", "isController": false}, {"data": [[1.59783222E12, 1764.0]], "isOverall": false, "label": "\/employee\/start_task", "isController": false}, {"data": [[1.59783222E12, 64.0]], "isOverall": false, "label": "\/board\/login-2", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/employee\/login-13", "isController": false}, {"data": [[1.59783222E12, 44.0]], "isOverall": false, "label": "\/employee", "isController": false}, {"data": [[1.59783222E12, 76.0]], "isOverall": false, "label": "\/board-6", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board-7", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/board-8", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board-9", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/employee\/logout-0", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/show_activities", "isController": false}, {"data": [[1.59783222E12, 53.0]], "isOverall": false, "label": "\/board\/checkTaskName", "isController": false}, {"data": [[1.59783222E12, 1014.0]], "isOverall": false, "label": "\/board-0", "isController": false}, {"data": [[1.59783222E12, 225.0]], "isOverall": false, "label": "\/board-1", "isController": false}, {"data": [[1.59783222E12, 187.0]], "isOverall": false, "label": "\/board-2", "isController": false}, {"data": [[1.59783222E12, 175.0]], "isOverall": false, "label": "\/board-3", "isController": false}, {"data": [[1.59783222E12, 220.0]], "isOverall": false, "label": "\/board-4", "isController": false}, {"data": [[1.59783222E12, 190.0]], "isOverall": false, "label": "\/board-5", "isController": false}, {"data": [[1.59783222E12, 152.0]], "isOverall": false, "label": "\/tasks\/get_list_tasks?projectId=13", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-14", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-13", "isController": false}, {"data": [[1.59783222E12, 37.333333333333336]], "isOverall": false, "label": "\/employee\/home-12", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-11", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/set_session_ini", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-10", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUq&sid=D_1NmGdB4-9wQkdEAAAQ", "isController": false}, {"data": [[1.59783222E12, 137.0]], "isOverall": false, "label": "Test Login Employee", "isController": true}, {"data": [[1.59783222E12, 2922.0]], "isOverall": false, "label": "Test Create Task", "isController": true}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-15", "isController": false}, {"data": [[1.59783222E12, 1240.0]], "isOverall": false, "label": "\/employee\/save_comment", "isController": false}, {"data": [[1.59783222E12, 18928.0]], "isOverall": false, "label": "Test Complete Task", "isController": true}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/getperticulartask", "isController": false}, {"data": [[1.59783222E12, 11.0]], "isOverall": false, "label": "\/board\/login-33", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/login-32", "isController": false}, {"data": [[1.59783222E12, 44.0]], "isOverall": false, "label": "\/board\/login-31", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/login-30", "isController": false}, {"data": [[1.59783222E12, 94.0]], "isOverall": false, "label": "\/tasks\/save_board_EditTaskInfo", "isController": false}, {"data": [[1.59783222E12, 49.0]], "isOverall": false, "label": "\/employee\/login-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-3", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-2", "isController": false}, {"data": [[1.59783222E12, 36.0]], "isOverall": false, "label": "\/board\/login-29", "isController": false}, {"data": [[1.59783222E12, 107.0]], "isOverall": false, "label": "\/employee\/login-1", "isController": false}, {"data": [[1.59783222E12, 35.0]], "isOverall": false, "label": "\/board\/login-28", "isController": false}, {"data": [[1.59783222E12, 55.0]], "isOverall": false, "label": "\/employee\/login-0", "isController": false}, {"data": [[1.59783222E12, 37.0]], "isOverall": false, "label": "\/board\/login-27", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUb", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/login-26", "isController": false}, {"data": [[1.59783222E12, 1014.0]], "isOverall": false, "label": "\/board", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/login-25", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-24", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/login-23", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/board\/login-22", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/board\/login-21", "isController": false}, {"data": [[1.59783222E12, 36.0]], "isOverall": false, "label": "\/employee\/login-9", "isController": false}, {"data": [[1.59783222E12, 41.0]], "isOverall": false, "label": "\/board\/login-20", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "\/employee\/login-8", "isController": false}, {"data": [[1.59783222E12, 74.0]], "isOverall": false, "label": "\/employee\/login-7", "isController": false}, {"data": [[1.59783222E12, 52.0]], "isOverall": false, "label": "\/employee\/login-6", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-1", "isController": false}, {"data": [[1.59783222E12, 38.0]], "isOverall": false, "label": "\/tasks\/check_is_in_parent_id", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-8", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/login-19", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-9", "isController": false}, {"data": [[1.59783222E12, 52.0]], "isOverall": false, "label": "\/board\/login-18", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-5", "isController": false}, {"data": [[1.59783222E12, 14.333333333333334]], "isOverall": false, "label": "\/employee\/home-6", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-17", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-7", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-16", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-3", "isController": false}, {"data": [[1.59783222E12, 100.66666666666667]], "isOverall": false, "label": "\/employee\/home", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-4", "isController": false}, {"data": [[1.59783222E12, 34.0]], "isOverall": false, "label": "\/board\/login-15", "isController": false}, {"data": [[1.59783222E12, 48.0]], "isOverall": false, "label": "\/tasks\/tasksInfoById", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-9", "isController": false}, {"data": [[1.59783222E12, 39.0]], "isOverall": false, "label": "Test Logout Board", "isController": true}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-3", "isController": false}, {"data": [[1.59783222E12, 1926.0]], "isOverall": false, "label": "\/board\/addNewTask", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-7", "isController": false}, {"data": [[1.59783222E12, 100.66666666666667]], "isOverall": false, "label": "\/employee\/home-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-8", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59783222E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.59783216E12, "maxY": 1080.0, "series": [{"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/checkMyLogin", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-10", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/tasksList", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-14", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-13", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-12", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-11", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-10", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/ajax?action=getempdata", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGt6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q1q&sid=XCCyDv5IazUeoY-yAAAE", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/show_activities-1", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/show_activities-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "Test Edit Task", "isController": true}, {"data": [[1.59783222E12, 131.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q0-", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/task_change_location", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-1", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/tasks\/updateEod", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-3", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-9", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-7", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee-8", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-7", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-8", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-1", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-3", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/get_auto_gen_id", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/ajax_show_all_employee", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/task_completed", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGuO&sid=XjMCnlEw2rW_JnOBAAAP", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "Test Comment", "isController": true}, {"data": [[1.59783222E12, 0.0], [1.59783216E12, 0.0]], "isOverall": false, "label": "JSR223 Sampler", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-9", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-8", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "Test Logout Employee", "isController": true}, {"data": [[1.59783222E12, 1080.0]], "isOverall": false, "label": "Test Login Board", "isController": true}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-5", "isController": false}, {"data": [[1.59783222E12, 44.0]], "isOverall": false, "label": "\/employee\/login-12", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-11", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-7", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-10", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-1", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-3", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-14", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/start_task", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-13", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board-7", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board-8", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board-9", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/logout-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/show_activities", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/checkTaskName", "isController": false}, {"data": [[1.59783222E12, 949.0]], "isOverall": false, "label": "\/board-0", "isController": false}, {"data": [[1.59783222E12, 151.0]], "isOverall": false, "label": "\/board-1", "isController": false}, {"data": [[1.59783222E12, 152.0]], "isOverall": false, "label": "\/board-2", "isController": false}, {"data": [[1.59783222E12, 141.0]], "isOverall": false, "label": "\/board-3", "isController": false}, {"data": [[1.59783222E12, 151.0]], "isOverall": false, "label": "\/board-4", "isController": false}, {"data": [[1.59783222E12, 152.0]], "isOverall": false, "label": "\/board-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/tasks\/get_list_tasks?projectId=13", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-14", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-13", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-12", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-11", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/set_session_ini", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-10", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUq&sid=D_1NmGdB4-9wQkdEAAAQ", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "Test Login Employee", "isController": true}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "Test Create Task", "isController": true}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-15", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/save_comment", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "Test Complete Task", "isController": true}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/getperticulartask", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-33", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-32", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-31", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-30", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/tasks\/save_board_EditTaskInfo", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-3", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-29", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-1", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-28", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-27", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUb", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-26", "isController": false}, {"data": [[1.59783222E12, 949.0]], "isOverall": false, "label": "\/board", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-25", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-24", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-23", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-22", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-21", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-9", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-20", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-8", "isController": false}, {"data": [[1.59783222E12, 62.0]], "isOverall": false, "label": "\/employee\/login-7", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/login-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-1", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/tasks\/check_is_in_parent_id", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-8", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-19", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-9", "isController": false}, {"data": [[1.59783222E12, 40.0]], "isOverall": false, "label": "\/board\/login-18", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-17", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-6", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-7", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-16", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-3", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/login-15", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/tasks\/tasksInfoById", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-4", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-5", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-9", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "Test Logout Board", "isController": true}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-2", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-3", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/board\/addNewTask", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-7", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-0", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-8", "isController": false}, {"data": [[1.59783222E12, 0.0]], "isOverall": false, "label": "\/employee\/home-1", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59783222E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.59783216E12, "maxY": 16724.0, "series": [{"data": [[1.59783222E12, 16724.0], [1.59783216E12, 1107.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59783222E12, 6.697999875545501], [1.59783216E12, 1107.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59783222E12, 7.167800049781799], [1.59783216E12, 1107.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59783222E12, 6.9589999377727505], [1.59783216E12, 1107.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.59783222E12, 5.0], [1.59783216E12, 1107.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59783222E12, 39.0], [1.59783216E12, 1107.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59783222E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 35.0, "minX": 1.0, "maxY": 1107.0, "series": [{"data": [[1.0, 1107.0], [2.0, 983.5], [16.0, 48.5], [18.0, 35.5], [10.0, 48.0], [20.0, 38.5], [26.0, 39.5], [7.0, 53.0], [29.0, 35.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[10.0, 94.0], [26.0, 84.5], [29.0, 97.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 29.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1014.0, "series": [{"data": [[1.0, 1014.0], [2.0, 983.0], [16.0, 39.0], [18.0, 34.0], [10.0, 40.0], [20.0, 37.5], [26.0, 0.0], [7.0, 53.0], [29.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[10.0, 94.0], [26.0, 41.0], [29.0, 38.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 29.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.59783216E12, "maxY": 2.933333333333333, "series": [{"data": [[1.59783222E12, 2.933333333333333], [1.59783216E12, 0.05]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59783222E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59783216E12, "maxY": 1.7833333333333334, "series": [{"data": [[1.59783222E12, 1.7833333333333334], [1.59783216E12, 0.016666666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59783222E12, 0.06666666666666667]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "500", "isController": false}, {"data": [[1.59783222E12, 1.0666666666666667]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.59783222E12, 0.03333333333333333]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59783222E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59783216E12, "maxY": 0.05, "series": [{"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-17-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-32-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/get_auto_gen_id-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-2-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-11-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-8-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUb-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-1-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "Test Logout Board-success", "isController": true}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "Test Logout Employee-failure", "isController": true}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-0-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-13-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/tasks\/updateEod-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/checkMyLogin-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "Test Login Board-success", "isController": true}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-4-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-2-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-9-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGuO&sid=XjMCnlEw2rW_JnOBAAAP-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-12-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFTpzUq&sid=D_1NmGdB4-9wQkdEAAAQ-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/ajax_show_all_employee-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-10-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-23-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-7-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-7-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-5-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-8-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-3-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFToGt6-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "Test Comment-success", "isController": true}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/tasks\/tasksInfoById-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-6-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-1-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-4-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-3-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-6-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-0-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-31-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-15-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-2-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-1-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/show_activities-0-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-18-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-12-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/task_completed-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-2-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-9-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-5-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-29-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-3-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-11-success", "isController": false}, {"data": [[1.59783222E12, 0.03333333333333333]], "isOverall": false, "label": "\/board\/tasksList-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "Test Create Task-success", "isController": true}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-14-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-8-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/tasks\/get_list_tasks?projectId=13-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/save_comment-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-6-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-1-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/addNewTask-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/getperticulartask-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "Test Login Employee-failure", "isController": true}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-10-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/start_task-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-26-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-6-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-9-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/board\/ajax?action=getempdata-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-2-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-5-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-5-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "Test Complete Task-success", "isController": true}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-22-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-7-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q0--success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-0-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-30-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-13-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-3-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-14-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/show_activities-1-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/tasks\/check_is_in_parent_id-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-0-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-4-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-1-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-9-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-10-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-4-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-5-failure", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-4-failure", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/tasks\/save_board_EditTaskInfo-failure", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-15-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-6-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/set_session_ini-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-0-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-28-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-9-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-7-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-8-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-2-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-failure", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-25-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-11-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-3-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-6-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-success", "isController": false}, {"data": [[1.59783222E12, 0.03333333333333333]], "isOverall": false, "label": "\/employee\/task_change_location-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-21-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-8-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-5-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-0-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-16-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/checkTaskName-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-0-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-3-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-33-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-10-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-12-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-1-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-27-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-7-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-13-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-1-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-14-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-9-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-24-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-4-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/show_activities-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-8-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-6-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/socket.io\/?EIO=3&transport=polling&t=NFY5q1q&sid=XCCyDv5IazUeoY-yAAAE-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-5-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "https:\/\/pms.local\/board\/logout-7-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board-3-success", "isController": false}, {"data": [[1.59783222E12, 0.05]], "isOverall": false, "label": "\/employee\/home-8-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "Test Edit Task-failure", "isController": true}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-20-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/login-7-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/board\/login-19-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-failure", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee-2-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666], [1.59783216E12, 0.016666666666666666]], "isOverall": false, "label": "JSR223 Sampler-success", "isController": false}, {"data": [[1.59783222E12, 0.016666666666666666]], "isOverall": false, "label": "\/employee\/logout-4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59783222E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.59783216E12, "maxY": 2.966666666666667, "series": [{"data": [[1.59783222E12, 2.966666666666667], [1.59783216E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.59783222E12, 0.13333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59783222E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
