
var count=0;
var previous=null;
var apigClient = apigClientFactory.newClient();
function apply(item)
{
    var params = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'*',
        "jobID":item,
        "userID":localStorage.getItem("sub"),
        "Status":"Applied",
        "orgName":"check",
        "orgID":"check"
      };
    apigClient.studentsApplyjobGet(params,{},{}).then(function(result){
        console.log(result);
    }).catch( function(result){
        //This is where you would put an error callback
        console.log(false);
    });
    console.log(item);    
}
function simpleTemplating(data) {
    var html = '<ul>';
    $.each(data, function(index, item){
        count++;
        html += '<div class="card"> <div class="container"><h4><b>'+item._source.job_title+'</b></h4> <p>'+item._source.location+'</p> </div><button onClick="apply(\'' + item._id + '\')">Apply!</button></div>';
    });
    if(count%20==0)
    {
        var params = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':'*',
            "query":document.getElementById('search').value,
            "from":count,
            "size":20
          };
        apigClient.studentsSearchGet(params,{},{}).then(function(result){
            console.log(result);
            previous=previous.concat(result.data.hits.hits);
            $('#pagination-container').pagination({
                dataSource: previous,
                callback: function(data, pagination) {
                    var html = simpleTemplating(data);
                    $('#data-container').html(html);
                }
            })
        }).catch( function(result){
            //This is where you would put an error callback
            console.log(false);
        });
        
    }
    html += '</ul>';
    return html;
}
function search()
{
    document.getElementById("pagination-container").innerHTML="";
    document.getElementById("data-container").innerHTML="";
    var apigClient = apigClientFactory.newClient();
    var params = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':'*',
        "query":document.getElementById('search').value,
        "from":0,
        "size":20
    };
    apigClient.studentsSearchGet(params,{},{}).then(function(result){
        console.log(result);
        previous=result.data.hits.hits;
        $('#pagination-container').pagination({
            dataSource: result.data.hits.hits,
            callback: function(data, pagination) {
                var html = simpleTemplating(data);
                $('#data-container').html(html);
            }
        })
    }).catch( function(result){
        //This is where you would put an error callback
        console.log(false);
    });
    console.log(apigClient);
}
