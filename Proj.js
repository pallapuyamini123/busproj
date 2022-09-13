var exp=require("express")
var app=exp()
app.set("view engine","ejs")
var mysql=require("mysql2")
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

var con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"admin",
	database:"onlinebus"
});
app.get("/",(req,res)=>{

   res.render('index')
 
 
 
 });
 app.get("/adminhome", (req,res)=>{

	res.render('adminhome')
 
});
app.get("/userlogin", (req,res)=>{

	res.render('userlogin')
 
});
app.post("/userloginDB",(req,res)=>{
  
	var uname=req.body.uname
	var psw=req.body.pwd
  
	var sql="select * from custdb where custmail='"+uname+"' and custpass='"+psw+"' "
	con.query(sql,function(err,result){
  
  
	if(err)
	{
	 throw err
	}
	else if(result.length<0){
	  res.render('userlogin')
	}
	else{
	 
	   res.render('custhome'); }
  });
	con.connect(function(err){
	if(err)
	  throw err
	var sql
  });
});
  

app.get("/adminlogin", (req,res)=>{

    res.render('adminlogin')
});   
app.get("/adminloginDB", (req,res)=>{
	var un=req.query.uname
    var pwd=req.query.pwd

        if(un=='admin' && pwd=='admin'){
            res.render('adminhome')
        }    
        else{
            res.render('adminlogin')

        }

    
});   

// cust login details
app.get("/newcustomer",(req,res)=>{
	res.render('newcustomer')

});


app.get("/custhome",(req,res)=>{
	res.render('custhome')

});






    

app.post("/custRegisterDB",(req,res)=>{
	
	c1= req.body.custid
    c2 = req.body.custname
    c3 = req.body.custmail
    c4 = req.body.custphone
    c5= req.body.custgen
    c6 = req.body.custage
    c7=req.body.custpass
	

    var sql="insert into custdb(custid,custname,custmail,custphone,custgen,custage,custpass) values("+c1+",'"+c2+"','"+c3+"','"+c4+"','"+c5+"','"+c6+"','"+c7+"')"

	con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('userlogin');
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
});

app.post("/updatecust",(req,res)=>{
	custid = req.body.custid
	var sql="select *from custdb where custid="+custid+"";

   
	con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('updateprofile',{data:result});
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});

});
app.get("/editcustDB",(req,res)=>{
	id = req.body.id
	c1= req.body.custid
    c2 = req.body.custname
    c3 = req.body.custmail
    c4 = req.body.custphone
    c5= req.body.custgen
    c6 = req.body.custage
	var sql="update bus set custid="+c1+",custname='"+c2+"',custmail='"+c3+"',custphone='"+c4+"',custgen='"+c5+"',custage='"+c6+"' where id="+id+" "  
	con.query(sql,function(err,result){
		
		if(err)
			throw err
			
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
	var sql2="select *from custdb"
	con.query(sql2,function(err,result){
		
		if(err)
			throw err
        res.render('viewprofile',{data:result});
			
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
	

});
app.post("/updatecustDB",(req,res)=>{
	custid = req.body.custid
    

	var sql="select *from custdb where custid="+custid+""  
    con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('updaterofile',{data:result});
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});

	
});







   

 //view all customers & update & delete from admin panel

 app.get("/addbuses",(req,res)=>{

    res.render('addbuses')
 
 });


 app.post("/addbusesDB", (req,res)=>{
    v1 = req.body.busid
    v2 = req.body.busname
    v3 = req.body.source
    v4 = req.body.destination
    v5 = req.body.seats
    v6=req.body.date
    v7=req.body.time
   v8=req.body.email
  
  var sql="insert into bus(busid,busname,source,destination,seats,date,time,email) values("+v1+",'"+v2+"','"+v3+"','"+v4+"',"+v5+",'"+v6+"','"+v7+"','"+v8+"')"
  
	con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('addbuses');
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});

	
       

   
 
 });
 



 app.get("/viewbuses",function(req,res){
	var sql="select * from bus "
	con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('viewbuses',{data:result});
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});



 });
 app.post("/editbusDB",(req,res)=>{
	
	id = req.body.id
	busid = req.body.busid
    busname = req.body.busname
    source= req.body.source
    destination= req.body.destination
    seats = req.body.seats
    date=req.body.date
    time=req.body.time
   email=req.body.email

	var sql="update bus set busid="+busid+",busname='"+busname+"',source='"+source+"',destination='"+destination+"',date='"+date+"',time='"+time+"',email='"+email+"' where id="+id+" "  
	con.query(sql,function(err,result){
		
		if(err)
			throw err
			
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
	var sql2="select *from bus"
	con.query(sql2,function(err,result){
		
		if(err)
			throw err
        res.render('viewbuses',{data:result});
			
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
	
	 

});
 
 
 app.post("/updatebus",(req,res)=>{
	
	id = req.body.id
    var sql="select *from bus where id="+id+""
	
	con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('viewbuses');
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
	
	 

});

app.post("/updatebusDB",(req,res)=>{
	busid = req.body.busid
    

	var sql="select *from bus where busid="+busid+""  
    con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('updatebus',{data:result});
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});


});
app.post("/deletebus",(req,res)=>{
	id=req.body.busid
	var sql="delete from bus where busid="+id+""
	con.query(sql,function(err,result){
	  
	  if(err)
		  throw err
	  res.render('viewbuses',{data:result});
	 
  });
  
  
    
  

});
app.get("/viewprofile",(req,res)=>{
	custid = req.body.custid
    var sql="select *from custdb "
	
	con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('viewprofile',{data:result});
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});


});
app.post("/editprofileDB",(req,res)=>{
	
	id = req.body.id
	c1= req.body.custid
    c2 = req.body.custname
    c3 = req.body.custmail
    c4 = req.body.custphone
    c5= req.body.custgen
    c6 = req.body.custage
	var sql="update custdb set custid="+c1+",custname='"+c2+"',custmail='"+c3+"',custphone='"+c4+"',custgen='"+c5+"',custage='"+c6+"' where id="+id+" "  
	con.query(sql,function(err,result){
		
		if(err)
			throw err
			
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
	var sql2="select *from custdb"
	con.query(sql2,function(err,result){
		
		if(err)
			throw err
        res.render('viewprofile',{data:result});
			
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
	
	 

});
app.get("/updateprofileDB",(req,res)=>{
	custid = req.body.custid
    

	var sql="select *from custdb where custid="+custid+""  
    con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('updateprofile',{data:result});
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});



});

app.post("/deletecust",(req,res)=>{
	custid=req.body.custid
	var sql="delete from custdb where custid="+custid+""
	con.query(sql,function(err,result){
	  
	  if(err)
		  throw err
	  res.render('viewprofile',{data:result});
	 
  });
});


app.get("/bookseat",(req,res)=>{
	
	res.render('bookseat');
	   
	});
   



app.get("/viewbooking",(req,res)=>{
	custid = req.body.custid
   var sql="select * from bookings"
   con.query(sql,function(err,result){
		
	if(err)
		throw err
	res.render('viewbooking',{data:result});
   
});

con.connect(function(err){
	if(err)
		throw err
	var sql
});

});

app.post("/bookseatDB",(req,res)=>{
	t1 = req.body.custid
	t2 = req.body.busid
    t3 = req.body.busname
    t4 = req.body.source
    t5= req.body.destination
   t6=req.body.amount
    t7 = req.body.seats
   t8 = req.body.date
   t9 = req.body.time

        
       var sql = "insert into bookings (custid,busid,busname,source,destination,amount,seats,date,time) values("+t1+","+t2+",'"+t3+"','"+t4+"','"+t5+"',"+t6+","+t7+",'"+t8+"','"+t9+"')"
	   con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('bookseat');
       
	});
	
	con.connect(function(err){
		if(err)
			throw err
		var sql
	});
	 
	 
	 
	 
	   
	
	
  
});     
      
app.post("/deletebookseat",(req,res)=>{
    custid = req.body.custid
    seats = req.body.seats
    var sql = "delete from bookings WHERE custid = " + custid
    con.query(sql,function(err,result){
		
		if(err)
			throw err
		res.render('viewbooking',{data:result});
       
	});
	
   
   
	
   

});


 

    



app.listen(1002,function(){
    console.log("Server is running at 1002")
    });