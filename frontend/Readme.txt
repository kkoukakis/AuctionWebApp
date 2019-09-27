
//---------------------------//
//          FRONTEND         //
//---------------------------//

>>Χρησιμοποίησα το Create-react-app για το ξεκίνημα του frontend
περισσότερες πληροφορίες στο Readme.md

>> Τα components ειναι τα εξής:
    Adminpanel : approve users
    Register : register user page
    Login : login page
    Items : load auctions
    Item : one auction
    Main: For logged in users to navigate
    Sell: For logged in users to sell a item

>> Τα χειρίζομαι όλα σε JSON και τα μετατρέπω σε XML (lib.js)
>> Login (done)
>> Register (done, check if userid exists and if password === repeat)
>> Admin is already installed
>> Admin panel (Admin μπορεί να δει όλους τους χρήστες και να κάνει approve και να κάνει export σε JSON, XML )
>> Redirect main (done)
>> 

//---------------------------//
//          BACKEND          //
//---------------------------//

>> SSL on HTTPS
servercert and serverkey
commands i used:
    openssl genrsa -out privatekey.pem 1024
    openssl req -new -key privatekey.pem -out certrequest.csr -config C:\OpenSSL-Win64\bin\openssl.cfg
    openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
>> Authorization
jsonwebtoken on every api call
