var STATELIST = ['PA','IA','OK','TX','NY','GA','NE','AR','NJ','NM','CA','IN','MN','MO','OH','IL','DC','MI','LA','KY','MT','AZ','NC','NV','CT','ID','CO','SC','MA','ND','WA','OR','WY','WI','KS','AL','ME','UT','PR','WV','NH','VA','TN','MD','FL','SD','MS','AK','DE','VT','VI','HI','GU','RI','AS','MP'];

STATELIST = STATELIST.sort((a,b) => a.localeCompare(b))

var relation = {'PA':"42",'IA':'19','OK':'40','TX':'48','NY':'36','GA':'','NE':'','AR':'','NJ':'','NM':'','CA':'','IN':'','MN':'','MO':'','OH':'','IL':'','DC':'','MI':'','LA':'','KY':'','MT':'','AZ':'','NC':'','NV':'','CT':'','ID':'','CO':'','SC':'','MA':'','ND':'','WA':'','OR':'','WY':'','WI':'','KS':'','AL':'','ME':'','UT':'','PR':'','WV':'','NH':'','VA':'','TN':'','MD':'','FL':'','SD':'','MS':'','AK':'','DE':'','VT':'','VI':'','HI':'','GU':'','RI':'','AS':'','MP':''}

// import {} from 'barConnectivity'

idList = ["tenAccess", "twentyfiveAccess", "hundredAccess", "twentyfiveWealth"];

performanceList = ["bc_ten", "bc_twentyfive", "bc_hundred"]
typeList = ["consumer", "business", "mobile"];



$(function(){
    for(let i=0; i<STATELIST.length; i++) {
        $('#sl').append('<option value="' + STATELIST[i] + '">' + STATELIST[i] + '</option>')
    }

    d3.csv("../web-portal-source-data-factory/State_Level_Census.csv",function(error, data){
        populateInfo(data,"WA")
        
    })

    d3.csv("../web-portal-source-data-factory/whole_nation_statelevel_notech.csv", function(error, data) {
        updateNoTech(data, "53")
    })

    $('#search').on("click", function() {
        $('.head .head-content').html($('#sl').val())
        updateState();
    })

    function populateInfo(data, state) {
        format = d3.format(",")
        data = data.filter((d) => d.State == state)
        $(".cbnum").html(format(data[0].CountyNum)+"/"+format(data[0].CensusBlocksNum));
        $(".pdnum").html(format(data[0].PopDensity));
        $(".incomenum").html("$"+format(data[0].MedianIncome));
        $(".popnum").html(format(data[0].Population));
        $(".edunum").html(format(data[0].EducationRate_Bachelor25)+"%");
        $(".povertynum").html(format(data[0].PovertyRate)+"%");
    }

    function updateNoTech(data, state) {
        data = data.filter((d) => d.statecode == state)
        
        for(let type of typeList) {
            let dt = data.filter((d) => d.type == type)[0];
            for(let performance of performanceList) {
                $("#" + performance + "-" + type).css("height",  (55 - +dt[performance]/+dt["blockcode"]*55) + "px")
                $("#" + performance + "-" + type + "-title").html(type + ":" + ((1 - +dt[performance]/+dt["blockcode"])*100).toFixed(0)+"%")
                //$("#" + performance + " . " + type)
                // console.log($("#" + performance + " . " + type))
                
            }
        }
    }


    function updateState() {
        let currStateAbbr = $('#sl').val();
        d3.csv("../web-portal-source-data-factory/State_Level_Census.csv",function(error, data){
            populateInfo(data,currStateAbbr)
            currState = data.filter(d => d.State == currStateAbbr)[0]
            currStateFips = currState.StateFips;
            stateName = currState.Name;
            totalBlocksNum = currState.CensusBlocksNum;
            $('.head .head-content').html(stateName);
            d3.csv("../web-portal-source-data-factory/whole_nation_statelevel.csv", function(error, data){
                data.map(function(d){
                    d.tenAccess = +d.bc_ten/totalBlocksNum;
                    d.twentyfiveWealth = +d.twentyfive_three/totalBlocksNum;
                    d.twentyfiveAccess = +d.bc_twentyfive/totalBlocksNum;
                    d.hundredWealth = +d.hundred_fifty/totalBlocksNum;
                    d.hundredAccess = +d.bc_hundred/totalBlocksNum;
                    return d;
                })
            
                for(let name of idList){
                    drawBars(currStateFips, name , data)
                }

                drawBubbles(data, currStateFips)
                
            })

            // d3.select(".bubbles").html("")
            // var myBubbleChart = bubbleChart();
            // d3.csv('./data/whole_nation_state.csv', function(error, data){
            //     data = data.filter(d => d.statecode == currStateFips);
            //     console.log(data)
            //     display(error, data);
            // });
            // setupButtons();
            
        })

        d3.csv("../web-portal-source-data-factory/whole_nation_statelevel_notech.csv", function(error, data) {
            updateNoTech(data, currStateFips)
        })
        

        d3.csv("../web-portal-source-data-factory/residential_fixed_internet_access_service_connections.csv",function(error, data){
        
            for(let name of disIdList) {
                drawRangeBars(currStateAbbr, name, data)
            }
        })


    }

    
})