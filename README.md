 
RULES------------------------------------------------------------------

1.This follow cllient server architature.

2. if you Know your client is Brwoser then always send HTML in Response
    this is called server side rendering(SSR).
    this is very fast and Secure.
 
3. If your dont know the client is brower or mobile or tab the always
    Send response in JSOM Foramt
    
4.Always Respect HTTP Meyhods

GET/User--- Read the user data and return the data.

POST/User-- Handle new User Creation.

PATCH/User--Update The User Details.

DELETE/User--Delete User.

--------------------------------------------------------------
|           DONT Do This Mistake
|     1. POST/Update User --->    Update user Profile
|
|     2.Post/Create User ---->    Create New User
|
|     3.GET/getUser     ----->    Get User Detail
|
|     4.POST/Delete User ---->    Delete User
|
|
|    WE HAVE METHODS THE WHY USE POST FOR EVERY THING
|     WE RESPECT THOSE HTTP METHOS
|
--------------------------------------------------------------

Json Hanle is very very easy 
Simply use    res.json(JSON Data) Clent Side Redering
              res.render(HTML) Server Side Redering






                            HTTP Headers
    
 HHTP Headers are an important part of he API requestt and responses as they represent  the
 META -DATA  associated with the API


 Heasders carry Inforamtion for the request and response Body

 we can create own custom Headers
 res.setHeader("X-MyName","Vinod") custom Header
 if you want to create custom Header then always use X-HeaderName



No-SQL Dcocument based Database

Storng suppoet for Aggregation pipes

works in BSON Format

Best for Node Application


Collection -"User"
inside Collection we have Dcocument 
we have more than 1 Dcocument

Like in mySQL we have user table

table means Collection in MongoDB

                        HTTP Header
                            |
              ______________________________  
              |                             |
      Request Header                    Response Header 

----------------------------------------------------------------------------------------------------
                                    Status Code

    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status


       Inforamtion responses (100-199)

       Successful responses (200-299)

       Redirection messages (300-399)

       Client error responses (400 -499)

       Server error responses (500-599)                            


       200  OK

       201  Request Succed Response senf after POST or some PUT request
       Always use 201 status code

       203 No Autorative Inforamtion

       204  No content

       205 Reset content

       206 Partial content


       400 Bad request   incomplte the data

       401 Anuathorized
                        means you have to send msg but you have not login then is status
                        
       402 payement reqired  this is reserved for future

       403   you have not allowed to acess
            like you not have subcription of youtube then you can not acess primimum feature

       404  not found
        500 internal server error


        501 not implemented

        503 service unavailable


show Collection

use <db name>

show Collection

db.coll.find()

db.coll.insert




schema - Define the structure of dara 

//schema ko use krke model banare hai
Schema - Model

Using model do CRUD Opration




