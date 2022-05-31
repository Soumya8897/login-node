const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("public"));

app.get("/",function (req,res) {
    res.sendFile(__dirname+'/signup.html');
})



app.post("/",function (req,res) {
   var firstName=req.body.fname;
   var lastName=req.body.mname;
    var email=req.body.lname;
   var data={
        members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields: {
                FNAME:firstName,
                LNAME:lastName,
            },
        },
        ],
}

  var jsonData=JSON.stringify(data);
  const url="https://us8.api.mailchimp.com/3.0/lists/5fb05b512f";
  const options={
      method:"POST",
      auth:"soumya:7fd76b5a60d3f55cbeb3c4aaf53191b2-us8"
  }
 const request= https.request(url,options,function (response) {
if(response.statusCode==200)
{
    res.sendFile(__dirname+"/sucess.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
}






      response.on("data",function (data) {
          console.log(JSON.parse(data));
      })
  })
  request.write(jsonData);
  request.end();
});
app.post("/",function (req,res) {
    res.redirect("/");
}

)

app.listen(process.env.PORT || 3000,function () {
    console.log("Server is running on port 3000");
})
//7fd76b5a60d3f55cbeb3c4aaf53191b2-us8//
//5fb05b512f.