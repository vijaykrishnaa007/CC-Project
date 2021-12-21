var apigClient = apigClientFactory.newClient();
var params = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'*',
    "userID":localStorage.getItem("sub")
  };
apigClient.studentsHomeGet(params,{},{}).then(async function(result){
    console.log(result);
    var data=result.data;
    for( var i=0;i<data.length;i++)
    {
        var item=data[i];
        var params = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':'*',
            "query":item.job_id,
            "from":0,
            "size":1
          };
        await apigClient.studentsSearchGet(params,{},{}).then(function(result){
            console.log(result.data.hits.hits[0]._source);
            var data=result.data.hits.hits[0]._source;
            var status=item.status.toLowerCase();
            if(status.includes("applied"))
            {
                document.getElementById("Applied").innerHTML+="<div class='job__JobCardHeaderContainer-xv8027-1 bwDVht'><div class='job__JobCardHeaderDetails-xv8027-2 fLcJmQ'><a href="+data.page_url+ "rel='noopener noreferrer' target='_blank' class='links__BaseLinkStyled-sc-1hx0y9k-0 job__JobCardJobTitle-xv8027-6 kdjSJG'>"+data.job_title+"</a><p class='job__JobCardCompany-xv8027-7 FTnMc'>"+data.organization+"</p><p class='job__JobCardDate-xv8027-8 cKSqS'>"+item.date+"</p></div></div>";
        
            }
            else{
                document.getElementById("Interview").innerHTML+="<div class='job__JobCardHeaderContainer-xv8027-1 bwDVht'><div class='job__JobCardHeaderDetails-xv8027-2 fLcJmQ'><a href="+data.page_url+ "rel='noopener noreferrer' target='_blank' class='links__BaseLinkStyled-sc-1hx0y9k-0 job__JobCardJobTitle-xv8027-6 kdjSJG'>"+data.job_title+"</a><p class='job__JobCardCompany-xv8027-7 FTnMc'>"+data.organization+"</p><p class='job__JobCardDate-xv8027-8 cKSqS'>"+item.date+"</p></div></div>";
            }
        }).catch( function(result){
            //This is where you would put an error callback
            console.log(false);
        });
    }

}).catch( function(result){
    //This is where you would put an error callback
    console.log(false);
});
