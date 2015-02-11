var msiversion = function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        return true;
    } else { // If another browser,
        return false;
    }
    return false;
};

var bigData = function bigData() {
    noOfObjs = 100000; //Tested up to 100000 rows and 30 columns on IE 11, Firefox 35.0.1, Chrome 40.0

        var obj = {"Vehicle0":"BMW0","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle1":"BMW1","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle2":"BMW2","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle3":"BMW3","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle4":"BMW4","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle5":"BMW5","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,

            "Vehicle6":"BMW1","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle7":"BMW2","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle8":"BMW3","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle9":"BMW4","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle10":"BMW5","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,

            "Vehicle11":"BMW1","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle12":"BMW2","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle13":"BMW3","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle14":"BMW4","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle15":"BMW5","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,

            "Vehicle16":"BMW1","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle17":"BMW2","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle18":"BMW3","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle19":"BMW4","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle20":"BMW5","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,

            "Vehicle21":"BMW1","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle22":"BMW2","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle23":"BMW3","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle24":"BMW4","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle25":"BMW5","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,

            "Vehicle26":"BMW1","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle27":"BMW2","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle28":"BMW3","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle29":"BMW4","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42,
            "Vehicle30":"BMW5","Date":"30 Jul 2013 09:24 AM","Location":"Hauz Khas","Speed":42};
        var data = [];
        for (var i = 0; i <= noOfObjs; i++ ){
            data.push(obj);
        }
        return data;
    };

    var jsonToCsv = function jsonToCsv(JSONData, ShowLabel) {
        var arrData  = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
            var data_row = "";
            for (var indexi in arrData[i]) {
                var arrValue = arrData[i][indexi] == null ? "" : '="' + arrData[i][indexi] + '"';
                data_row += arrValue + ',';
            }
            data_row.slice(0, data_row.length - 1);
            CSV += data_row + '\r\n';
        }
        if (CSV === '') {
            growl.error("Invalid data");
            return;
        }
        return CSV;
    };

    $(document).ready(function(){
        $('.download').click(function(){
        var CSV = jsonToCsv(bigData(), true);
        if(CSV === '')
            return;
        download(CSV, "muchData");
    });
});

var createBlob = function(data){
    var myBlob = new Blob([data], {type: 'text/csv;charset=utf-8'});
    return myBlob;
};

var download = function(data, fileName){
    if(msiversion()){
        if(window.navigator.msSaveBlob){
           var blob = createBlob(data);
           window.navigator.msSaveBlob(blob, fileName + ".csv");
        }
        else{
            var IEwindow = window.open();
            IEwindow.document.write('sep=,\r\n' + data);
            IEwindow.document.close();
            IEwindow.document.execCommand('SaveAs', true, fileName + ".csv");
            IEwindow.close();
        }
    }
    else {
        var link       = document.createElement("a");
        var blob       = createBlob(data);
        var url        = URL.createObjectURL(blob);
        link.href      = url;
        link.style     = 'visibility:hidden';
        if(link.download !== undefined){ //feature detection
            link.download  = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        else{
            //no proper fallback apart from saying sorry you can't download I'm afraid
        }
    }
};

angular.module('app', [])
    .run(function($rootScope){
        var option = {name: 'Export',
            onClick: function($event, name){
                var CSV = jsonToCsv(bigData(), true);
                if(CSV === '')
                    return;
                download(CSV, "muchData");
            }
        };
        $rootScope.option = option;
    });
