/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const Status = require('../server/models/Status');
const sanitizeHtml = require('sanitize-html');
const _ = require('lodash');
const request = require('request');
const USER_ID_ENCRYPT_DECTYPT = 'user_id_incrption_decription';
module.exports = class UserController {
    async getuserList(userdata) {
        let cryptr = new Cryptr(USER_ID_ENCRYPT_DECTYPT);
        let userList = [];
        for (let index = 0; index < userdata.length; index++) {
        //userdata.forEach((val, i) => {

            
            var user_s = await this.getUserStatus(userdata[index]._id);
            if(user_s == null) user_s = "I'm using react app!"
            
            

            let  tempobj = {
                _id: cryptr.encrypt(userdata[index]._id),
                email: userdata[index].email,
                lastName: userdata[index].lastName,
                firstName: userdata[index].firstName,
                city: userdata[index].city,
                country: userdata[index].country,
                user_status: user_s,
                friends: this.returnfnrdData(userdata[index].friends, cryptr)
            };
            console.log(tempobj);
            userList.push(tempobj);

        }
        //});
        return userList;
    }

    async getUserStatus(_id){
        console.log("getUserStatus Called");
        var toReturn = "";
        await Status.find({'postby': _id}, (error, status) => {
            if (status.length > 0) {
                console.log(status[0]['status']);
                var user_s = status[0]['status'];
                toReturn = user_s;
            } 
            else toReturn = "I'm using react app!"
            });

            return toReturn;
    }

    getuserList2(userdata) {
        let cryptr = new Cryptr(USER_ID_ENCRYPT_DECTYPT);
        let userList = [];
        userdata.forEach((val, i) => {

            let  tempobj = {
                _id: cryptr.encrypt(val._id),
                email: val.email,
                lastName: val.lastName,
                firstName: val.firstName,
                city: val.city,
                country: val.country,
                friends: this.returnfnrdData(val.friends, cryptr)
            };

            userList.push(tempobj);
        });
        return userList;
    }

    returnfnrdData(data, cryptr) {
        var temp = [];
         data.forEach((val1, k) => {
            temp.push({status: val1.status, userid: cryptr.encrypt((val1.userid)), ftype: val1.ftype})
        });
        return  temp;

    }
    getUserDetails(detail) {

        let cryptr = new Cryptr(USER_ID_ENCRYPT_DECTYPT);
        let userList = [];
        if (detail !== null & detail !== 'undefined') {
            detail.forEach((val, i) => {
                let  tempobj = {
                    userId: cryptr.encrypt(val.userId),
                    photodata: val.photodata,
                    isphoto: val.isphoto,
                    sociallink: val.sociallink,
                    professional: val.professional,
                    aboutme: val.aboutme
                };
                userList.push(tempobj);
            });
        }
        return userList;
    }
    getPostDetails(posts, onlytext) {
        let cryptr = new Cryptr(USER_ID_ENCRYPT_DECTYPT);
        posts.forEach((val, i) => {

            if (onlytext) {
                var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                var results = re.exec(val.body);
                var img = "";
                if (results)
                    img = results[1];
                let stringdata = sanitizeHtml(val.body, {
                    allowedTags: [],
                    allowedAttributes: [],
                    selfClosing: []
                });
                val.img = img;
                val.body = _.truncate(_.trim(stringdata), {'length': 350, 'separator': /,? +/});
            }
            val.user = {};
            val._author = cryptr.encrypt(val._author);
            val.user.fname = val.userDetail[0].firstName;
            val.user.lname = val.userDetail[0].lastName;
            val.user.email = val.userDetail[0].email;
            delete val.userDetail;
        });

        return posts;
    }
     
       postToSubscriber(message, users, callback) {
           
        var count=0, tokencount=0;
        users.forEach((obj) => {
            message.text = message.text.replace('{{name}}', _.capitalize(obj.userDetail[0].firstName) + ' ' + _.capitalize(obj.userDetail[0].lastName))
            obj.token.forEach((token) => {
                tokencount++;
                request({
                    url: 'https://fcm.googleapis.com/fcm/send',
                    method: 'POST',
                    headers: {
                        'Content-Type': ' application/json',
                        'Authorization': 'key=AIzaSyCZk3C2aQwpNmOV6j8i4TEOSH6409PtD08'
                    },
                    body: JSON.stringify(
                            {
                                "notification": {
                                    "title": message.title,
                                    "body": message.text,
                                    "icon": "https://share-and-connect.herokuapp.com/img/icons/apple-icon-57x57.png",
                                    "click_action": "https://share-and-connect.herokuapp.com"
                                },
                                "to": token
                            }
                    )
                }, function (error, response, body) {
                    if (error) {
                        console.error(error, response, body);
                    } else if (response.statusCode >= 400) {
                        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
                    } else {
                        count++;
                         console.log(count+'.Send to '+obj.userDetail[0].firstName);
                         if(count===tokencount){
                            callback(count);
                            console.log("/////////////////////");  
                            console.log("Message send to >>"+count+' Devices');
                            console.log("/////////////////////");
                         };
                      
                    }
                });
            });
        });

 
    }
     
};


