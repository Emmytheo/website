var firebaseConfig = {
    apiKey: "AIzaSyAyh0LoymfZHbTu3mWyXYs2Z7pMz7lnF_8",
    authDomain: "obd-data-track.firebaseapp.com",
    databaseURL: "https://obd-data-track.firebaseio.com",
    projectId: "obd-data-track",
    storageBucket: "obd-data-track.appspot.com",
    messagingSenderId: "49352787430",
    appId: "1:49352787430:web:3f0bd5e0451f94f7964227",
    // measurementId: "G-VR292V8GVH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var dri = firebase.database().ref().child("public/FIXBOT/Registered devices/");
var page = window.location.href.split('/')[window.location.href.split('/').length - 1];
var la;
var ln;
var dve;
var dva;
var prid;
var accesstoken = "pk.eyJ1IjoiZW1teXRoZW8iLCJhIjoiY2todTA5OHRoMGZ3aTJzcDViNGZwY3lueSJ9.jJZjA8UkCn5cyWyHUwx6cw";

console.log(page);
var userinfo;
var userd;
var userdd;
if(page.split(".").includes("register")){
    // console.log(document.getElementById('country').value);
    
    
    //console.log(document.getElementById('country').value);
    document.getElementById('regform').onsubmit = function () {
        var fullname = document.getElementById('fullname').value;
        var dob = document.getElementById('dob').value;
        var email = document.getElementById('email').value;
        var gender = document.getElementById('gender').value;
        var plan = document.getElementById('plan').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var confpass = document.getElementById('confpass').value;
        var cls = document.getElementById('cls').value;
        var ids = document.getElementById('ids').value;
        var street = document.getElementById('street').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state').value;
        var country = document.getElementById('country').value;
        var phone = document.getElementById('phone').value;
        var passed = true;
        // console.log(ids.split(",").length)
        var done;
        // fullname = "Mgbaramuko Chidiebube Emmanuel";
        // email = "chidi.mgbara@fixbot.com";
        // username = "Emmytheo247";
        // password = "EMMYfinest@123";
        // confpass = "EMMYfinest@123";
        // ids = '359197080045546,';
        // dob = '7/12/1999';
        // phone = "07089602044";
        // street = "No 13 Nnokwa Street,";
        // city = "Umuahia";
        // state = "Abia State";


        
        if (confpass !== "" || email !== ""){
            if (email.split("@").includes("fixbot.com")) {
                if (cls == "FixbotAdmin") {
                    passed = true;
                    $('#classs').removeClass('has-danger');
                    document.getElementById("adm").innerText = "You're Good to Go";
                    $('#classs').addClass('has-success');
                }
                else {
                    passed = false;
                    $('#classs').addClass('has-danger');
                    document.getElementById("adm").innerText = "You're not allowed to Choose this Option, Switch to a different Class";
                    return false;

                }
            }
            if (!email.split("@").includes("fixbot.com")) {
                if (cls == "FixbotAdmin") {
                    passed = false;
                    $('#classs').addClass('has-danger');
                    document.getElementById("adm").innerText = "You're not allowed to Choose this Option, Switch to a different Class";
                    console.log(cls);
                    return false;
                }
                else {
                    passed = true;
                    $('#classs').removeClass('has-danger');
                    document.getElementById("adm").innerText = "You're Good to Go";
                    $('#classs').addClass('has-success');
                }

            }
            if (confpass != password) {
                $('.pass').addClass('has-danger');
                var el = document.getElementsByClassName("passtxt");


                for (var i = 0; i < el.length; i++) {
                    el[i].innerText = "Passwords don't Match";
                }
                passed = !passed;
                return false;

            }
            if (confpass == password) {
                $('.pass').removeClass('has-danger');
                $('.pass').addClass('has-success');
                var el = document.getElementsByClassName("passtxt");
                // console.log(el.length);


                for (var i = 0; i < el.length; i++) {
                    el[i].innerText = "Passwords Match";
                }
                passed = true;
            }
            if (password.length < 5) {
                $('.pass').addClass('has-danger');
                var el = document.getElementsByClassName("passtxt");


                for (var i = 0; i < el.length; i++) {
                    el[i].innerText = "Passwords Must be atleast 6 Characters Long";
                }
                passed = !passed;
                return false;

            }
            if (password.length > 5) {
                $('.pass').removeClass('has-danger');
                $('.pass').addClass('has-success');
                var el = document.getElementsByClassName("passtxt");
                // console.log(el.length);


                for (var i = 0; i < el.length; i++) {
                    el[i].innerText = "Password Strength Okay";
                }
                passed = true;

            }
            

            if (ids.split(",").length < 2) {
                passed = false;
                $('#idtxt').addClass('has-danger');
                document.getElementById("idtxte").innerText = "Use atleast One Device";
                console.log(cls);
                return false;

            }
            else {
                passed = true;
                $('#idtxt').removeClass('has-danger');
                document.getElementById("idtxte").innerText = "You're Good to Go";
                $('#classs').addClass('has-success');
            }

            
        }
        else{
            passed = false;
            return false;
            
            
        }
        



        if (typeof(city) == undefined){
            city = "pending";
        }
        if (typeof (street) == undefined) {
            street = "pending";
        }
        if (typeof (state) == undefined) {
            state = "pending";
        }
        if (typeof (country) == undefined) {
            country = "pending";
        }
        userinfo = {
            "fullname": fullname,
            "email": email,
            "gender": gender,
            "plan": plan,
            "username": username,
            "password": password,
            "dob": dob,
            "cls": cls,
            'street': street,
            'city': city,
            'state': state,
            'country': country,
            'deviceids': ids,
            // 'Car names': cnames,
            'phone': phone

        }
        console.log(userinfo);

        if (passed) {
            console.log(passed);
            done = passed;
            if (userinfo.email !== undefined && userinfo.password !== undefined) {
                
                firebase.auth().createUserWithEmailAndPassword(userinfo.email, userinfo.password).catch(function (error) {
                    if (error) {
                        done = false;
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        var err = errorCode.split('/');
                        console.log("Error Code : " + errorCode);
                        console.log("Error Message : " + errorMessage);

                        if (err[err.length - 1].search('email') !== -1) {
                            document.getElementById("eml").innerText = errorMessage;
                            $("#emll").addClass('has-danger');
                        }
                        if (err[err.length - 1].search('email-') == -1) {
                            document.getElementById("eml").innerText = "You're Good To Go";
                            $("#emll").removeClass("has-danger");
                            $("#emll").addClass("has-success");
                        }
                        if (err[err.length - 1].search('email-') !== -1) {
                            document.getElementById("eml").innerText = errorMessage;
                            $("#emll").addClass('has-danger');
                        }
                        if (err[err.length - 1].search('email') == -1) {
                            document.getElementById("eml").innerText = "You're Good To Go";
                            $("#emll").removeClass("has-danger");
                            $("#emll").addClass("has-success");
                        }
                        if (err[err.length - 1].search('password') !== -1) {
                            document.getElementById("pss").innerText = errorMessage;
                            $(".pass").addClass("has-danger");
                        }

                        if (err[err.length - 1].search('password') == -1) {
                            document.getElementById("pss").innerText = "You're Good to Go";
                            $(".pass").removeClass("has-danger");
                        }
                        if (err[err.length - 1].search('network-request-failed') !== -1) {
                            document.getElementById("net").innerText = errorMessage;

                        }
                        if (err[err.length - 1].search('network-request-failed') == -1) {
                            document.getElementById("net").innerText = "";

                        }
                        
                    }
                    else{
                        done = true;
                    }
                }).then(function (){
                    if(done){
                        firebase.auth().signInWithEmailAndPassword(userinfo.email, userinfo.password).catch(function (error) {
                            // Handle Errors here.
                            
                            var errorCod = error.code;
                            var errorMessag = error.message;
                            console.log("Error Code : " + errorCod);
                            console.log("Error Message : " + errorMessag);
                            if (error) {
                                done = false;
                            }
                            else {
                                done = true;
                                
                            }


                        }).then(function (){
                            if(done){
                                console.log("Signing in");

                                firebase.auth().onAuthStateChanged(function (user) {
                                    if (user) {

                                        // User is signed in.
                                        user.updateProfile({
                                            displayName: userinfo.username,
                                            email: userinfo.email
                                        }).catch(function (error) {
                                            if (error) {
                                                done = false;
                                                var errorCo = error.code;
                                                var errorMessa = error.message;
                                                console.log("Error Code : " + errorCo);
                                                console.log("Error Message : " + errorMessa);
                                                document.getElementById("net").innerText = errorMessage;
                                            }
                                            else {
                                                done = true;
                                                
                                            }


                                        }).then(function(){
                                            
                                            user.providerData.forEach(function (profile) {
                                                console.log("Sign-in provider: " + profile.providerId);
                                                console.log("  Provider-specific UID: " + profile.uid);
                                                console.log("  Name: " + profile.displayName);
                                                console.log("  Email: " + profile.email);
                                                // console.log("  Photo URL: " + profile.photoURL);
                                                prid = profile.displayName;
                                                return;
                                            })
                                            
                                        }).catch(function (error){
                                            if(error){
                                                done = false;
                                                var errorCo = error.code;
                                                var errorMessa = error.message;
                                                console.log("Error Code : " + errorCo);
                                                console.log("Error Message : " + errorMessa);
                                                document.getElementById("net").innerText = errorMessage;
                                            }
                                            else{
                                                console.log("ksufvulairfbarf");
                                                done = true;
                                            }

                                        }).then(function(){
                                            if(done){
                                                console.log(prid);
                                                var dir = firebase.database().ref().child("public/FIXBOT/Accounts/");
                                                dir = dir.child(prid);
                                                dir.update(userinfo);
                                                // console.log(email);
                                                console.log("Logging in");
                                                console.log("Logging Done");



                                                document.getElementById("net").innerText = "Registration Complete";
                                                window.localStorage.setItem('emailForSignIn', userinfo.email);
                                                window.localStorage.setItem('passwordForSignIn', userinfo.password);
                                                console.log("Logging Done");
                                                // window.location.assign("pages-login.html.htm");
                                            }
                                        })
                                    } else {

                                        console.log("Not working");
                                        document.getElementById("net").innerText = errorMessage;
                                        return false;
                                        // No user is signed in.
                                    }
                                })

                            }
                            else{

                            }
                        })
                    }
                    else{
                        return;
                    }
                    
                })

            }


        }



        return false;
    };
}
else if (page.split(".").includes("pages-login") || page.split(".").includes("login")) {
    // document.getElementById("Uname").value = "chidi.mgbara@gmail.com";
    // document.getElementById("Upass").value = "EMMYfinest@123";
    
    
    // console.log(emaill);
    
    


    document.getElementById('loginform').onsubmit = function () {
        var emaill = document.getElementById("Uname").value;
        var passwordd = document.getElementById("Upass").value;
        console.log(emaill);
        document.getElementById("note").innerHTML = "Signing you in, please be patient";
        firebase.auth().signInWithEmailAndPassword(emaill, passwordd).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log("Error Code : " + errorCode);
            console.log("Error Message : " + errorMessage);
            document.getElementById("note").innerHTML = errorMessage;
            
            
        }).then(function () {
            
            // document.getElementById("note").innerHTML = "logging you in, please be patient";
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    
                    var userdata = {
                        'username': '',
                        'fullname': '',
                        'email': '',
                        'phone': '',
                        'address': '',
                        'gender': '',
                        'plan': '',
                        'cls': '',
                        'dob': '',
                        'devices': '',
                        'device_data': {},
                        "providerid" : ""
                    }
                    var dta;
                    user.providerData.forEach(function (profile) {
                        userdata.username = profile.displayName;
                        userdata.email = profile.email;
                        // userdata.uid = profile.uid;
                        // userdata.gender = profile.gender;
                        // userdata.plan = profile.plan;
                        // userdata.cls = profile.cls;
                        // userdata.dob = profile.dob;
                        // userdata.devices = profile.deviceids.split(',');
                        // userdata.address = profile.street + ', ' + profile.city + ", " + profile.state + ', ' + profile.country;
                    });
                    
                    var dir = firebase.database().ref().child("public/FIXBOT/Accounts/");
                    dir.child(userdata.username).on("value", function(snap) {
                        dta = snap.val();
                        
                        document.getElementById("note").innerHTML = "Fetching Data.....";

                        userdata.username = dta.username;
                        userdata.email = dta.email;
                        userdata.gender = dta.gender;
                        userdata.plan = dta.plan;
                        userdata.cls = dta.cls;
                        userdata.dob = dta.dob;
                        userdata.devices = dta.deviceids;
                        userdata.address = dta.street + ', ' + dta.city + ", " + dta.state + ', ' + dta.country;
                        userdata.phone = dta.phone;
                        userdata.fullname = dta.fullname;
                        console.log(userdata);
                        userd = userdata;
                        console.log(userd);
                        document.getElementById("note").innerHTML = "Data Fetch Complete";
                        // for (id in userd.devices.split(",")) {
                        //     console.log();
                        //     if (typeof (userd.devices.split(",")[id]) !== undefined) {
                        //         // userd.device_data[userd.devices.split(",")[id]];
                        //         console.log(userd.devices.split(",")[id]);
                        //         var dataa = firebase.database().ref().child("public/FIXBOT/Registered devices/Data").child(+ userd.devices.split(",")[id]);
                        //         userd.device_data[userd.devices.split(",")[id]] = dataa;
                        //         // dataa.once('value', function (snap) {
                        //         //     // console.log(snap.val());
                        //         //      = snap.val();
                                   
                        //         // });
                                
                        //         // console.log(dataa);
                        //         // userd.device_data[userd.devices.split(",")[id]].append();
                        //     }
                            
                            
                        // }
                        document.getElementById("note").innerHTML = "Setting up the Dashboard...";
                        console.log(userd.device_data);
                        
                        
                        // document.getElementById("note").innerHTML = "Data Fetch Successful, Preparing The Dashboard";
                        console.log(userd.cls);
                        switch (userd.cls.toLowerCase()) {
                            case "fixbotadmin": {
                                // window.location.assign("indexFixbotAdmin.html");
                            }
                                break;
                            case "admin": {
                                // window.location.assign("indexAdmin.html");
                            }
                                break;
                        }

                    })
                    
                    
                    


                    // User is signed in.
                } else {
                    document.getElementById("note").innerHTML = "Encountered an error while fetching data, Try logging in again";


                    // No user is signed in.
                }
            });
        });
        return false;    
    }
    

}
else if (page.split(".").includes("indexAdmin")) {
    // firebase.auth().signInWithEmailAndPassword(userd.emaill, userd.passwordd).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //     console.log("Error Code : " + errorCode);
    //     console.log("Error Message : " + errorMessage);
    //     document.getElementById("note").innerHTML = errorMessage;


    // })
    
    firebase.auth().onAuthStateChanged(function (user) {
        
        if (user) {
            var userdata = {
                'username': '',
                'fullname': '',
                'email': '',
                'phone': '',
                'address': '',
                'gender': '',
                'plan': '',
                'cls': '',
                'dob': '',
                'devices': '',
                'device_data': {},
                "providerid": ""
            }
            console.log(user);
            // var dta;
            user.providerData.forEach(function (profile) {
                userdata.username = profile.displayName;
                userdata.email = profile.email;
            });
            var dir = firebase.database().ref().child("public/FIXBOT/Accounts/");
            // console.log(userdata);
            dir.child(userdata.username).on("value", function (snap) {
                var dta = snap.val();
                // console.log("rjst");/
                // console.log(dta);
                userdata.username = dta.username;
                userdata.email = dta.email;
                userdata.gender = dta.gender;
                userdata.plan = dta.plan;
                userdata.cls = dta.cls;
                userdata.dob = dta.dob;
                userdata.devices = dta.deviceids;
                userdata.address = dta.street + ', ' + dta.city + ", " + dta.state + ', ' + dta.country;
                userdata.phone = dta.phone;
                userdata.fullname = dta.fullname;
                // console.log(userdata);
                userd = userdata;
                // console.log(userd);
                console.log(userd.device_data);
                var fnam = document.getElementsByClassName("fnam");
                var nam = document.getElementsByClassName("nam");
                var namclass = document.getElementById("namclass");
                var carpic = document.getElementById("carpic");
                var namdetails = document.getElementById("namdetails");
                var namsubstart = document.getElementById("namsubstart");
                var namsubexp = document.getElementById("namsubexp");
                var namsubbal = document.getElementsByClassName("namsubbal");
                var eml = document.getElementsByClassName("eml");
                var phnnum = document.getElementsByClassName("phnnum");
                var add = document.getElementsByClassName("add");
                var assets = document.getElementById("assetz");
                var carnams = document.getElementById("carnams");
                var asset = document.getElementById("asset");
                var namuserovw = document.getElementById("namuserovw");
                var namcarsubs = document.getElementById("namcarsubs");
                var namassets = document.getElementById("namassets");
                var sngnam = document.getElementById("sngnam");
                var sngnamcond = document.getElementById("sngnamcond");
                var sngnamdet = document.getElementById("sngnamdet");
                var namcarmodel = document.getElementById("namcarmodel");
                var namtrackmap = document.getElementById("namtrackmap");
                var namwindspeed = document.getElementById("namwindspeed");
                var namtotalmileage = document.getElementById("namtotalmileage");
                var namtotalcrashes = document.getElementById("namtotalcrashes");
                var runningspeed = document.getElementById("runningspeed");
                var throttleopeningwidth = document.getElementById("throttleopeningwidth");
                var engineload = document.getElementById("engineload");
                var coolanttemperature = document.getElementById("coolanttemperature");
                var instantenousfuelconsumption = document.getElementById("instantenousfuelconsumption");
                var averagefuelconsumption = document.getElementById("averagefuelconsumption");
                var drivingrange = document.getElementById("drivingrange");
                var totalmileage = document.getElementById("totalmileage");
                var singlefuelconsumptionvol = document.getElementById("singlefuelconsumptionvol");
                var totalfuelconsumptionvol = document.getElementById("totalfuelconsumptionvol");
                var currenterrorcodenos = document.getElementById("currenterrorcodenos");
                var harshaccelerationno = document.getElementById("harshaccelerationno");
                var harshbrakeno = document.getElementById("harshbrakeno");
                var drivingbehaviourdata = document.getElementById("drivingbehaviourdata");
                var batteryvoltage = document.getElementById("batteryvoltage");
                var enginespeed = document.getElementById("enginespeed");
                var batteryvoltagebar = document.getElementById("batteryvoltagebar");
                var enginespeedbar = document.getElementById("enginespeedbar");
                var runningspeedbar = document.getElementById("runningspeedbar");
                var throttleopeningwidthbar = document.getElementById("throttleopeningwidthbar");
                var engineloadbar = document.getElementById("engineloadbar");
                var coolanttemperaturebar = document.getElementById("coolanttemperaturebar");
                var instantenousfuelconsumptionbar = document.getElementById("instantenousfuelconsumptionbar");
                var averagefuelconsumptionbar = document.getElementById("averagefuelconsumptionbar");
                var drivingrangebar = document.getElementById("drivingrangebar");
                var totalmileagebar = document.getElementById("totalmileagebar");
                var singlefuelconsumptionvolbar = document.getElementById("singlefuelconsumptionvolbar");
                var totalfuelconsumptionvolbar = document.getElementById("totalfuelconsumptionvolbar");
                var currenterrorcodenosbar = document.getElementById("currenterrorcodenosbar");
                var harshaccelerationnobar = document.getElementById("harshaccelerationnobar");
                var harshbrakenobar = document.getElementById("harshbrakenobar");
                var namign = document.getElementById("namign");
                var namdrivtim = document.getElementById("namdrivtim");
                var namidltim = document.getElementById("namidltim");
                var namhotstarts = document.getElementById("namhotstarts");
                var namavgspeed = document.getElementById("namavgspeed");
                var namhighestspeed = document.getElementById("namhighestspeed");
                var namengrotation = document.getElementById("namengrotation");
                var namharshaccel = document.getElementById("namharshaccel");
                var namharshbraking = document.getElementById("namharshbraking");
                var namignbar = document.getElementById("namignbar");
                var namdrivtimbar = document.getElementById("namdrivtimbar");
                var namidltimbar = document.getElementById("namidltimbar");
                var namhotstartsbar = document.getElementById("namhotstartsbar");
                var namavgspeedbar = document.getElementById("namavgspeedbar");
                var namhighestspeedbar = document.getElementById("namhighestspeedbar");
                var namengrotationbar = document.getElementById("namengrotationbar");
                var namharshaccelbar = document.getElementById("namharshaccelbar");
                var namharshbrakingbar = document.getElementById("namharshbrakingbar");
                var map = document.getElementById("map");
                var weekly = [];
                var dataa = firebase.database().ref().child("public/FIXBOT/Registered devices/Data");


                for (it in fnam) {
                    // console.log(userd);
                    if (userd !== undefined) {
                        fnam[it].value = userd.fullname;
                        fnam[it].innerHTML = userd.fullname;
                    }
                    else {
                        fnam[it].value = "Not Set";
                        fnam[it].innerHTML = "Not Set";
                    }

                }
                for (it in nam) {
                    // console.log(nam[it]);
                    if (userd !== undefined) {
                        // nam[it].value = userd.fullname;
                        nam[it].innerHTML = userd.username;
                    }
                    else {
                        // fnam[it].value = "Not Set";
                        nam[it].innerHTML = "Not Set";
                    }

                }
                console.log(namclass);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // namclass.innerHTML = userd.cls;
                }
                else {
                    // fnam[it].value = "Not Set";
                    // namclass.innerHTML = "Not Set";
                }

                console.log(namdetails);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // namdetails.innerHTML = userd.details;
                }
                else {
                    // fnam[it].value = "Not Set";
                    // namdetails.innerHTML = "Not Set";
                }
                console.log(namsubstart);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // namsubstart.innerHTML = "--/--/----";
                }
                else {
                    // fnam[it].value = "Not Set";
                    // namsubstart.innerHTML = "--/--/----";
                }
                console.log(namsubexp);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // namsubexp.innerHTML = "--/--/----";
                }
                else {
                    // fnam[it].value = "Not Set";
                    // namsubexp.innerHTML = "--/--/----";
                }
                for (it in namsubbal) {
                    console.log(namsubbal[it]);
                    if (userd !== undefined) {
                        // nam[it].value = userd.fullname;
                        // namsubbal[it].innerHTML = "$0";
                    }
                    else {
                        // fnam[it].value = "Not Set";
                        // namsubbal[it].innerHTML = "Not Set";
                    }

                }
                for (it in eml) {
                    console.log(eml[it]);
                    if (userd !== undefined) {
                        eml[it].value = userd.email;
                        eml[it].innerHTML = userd.email;
                    }
                    else {
                        eml[it].value = "Not Set";
                        eml[it].innerHTML = "Not Set";
                    }

                }
                for (it in phnnum) {
                    console.log(phnnum[it]);
                    if (userd !== undefined) {
                        phnnum[it].value = userd.phone;
                        phnnum[it].innerHTML = userd.phone;
                    }
                    else {
                        phnnum[it].value = "Not Set";
                        phnnum[it].innerHTML = "Not Set";
                    }

                }
                for (it in add) {
                    console.log(add[it]);
                    if (userd !== undefined) {
                        add[it].value = userd.address;
                        add[it].innerHTML = userd.address;
                    }
                    else {
                        add[it].value = "Not Set";
                        add[it].innerHTML = "Not Set";
                    }

                }

                // console.log(assets);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // userd.devices = [];
                    var nw = [];
                    for (id in userd.devices.split(",")) {
                        if (userd.devices.split(",")[id].length > 7) {
                            nw.push(userd.devices.split(",")[id]);
                            // console.log("lagrcfuirniugkw", id);
                        }

                        // console.log("lagrcfuirniugkw", id);
                    }
                    userd.devices = nw;

                    dve = userd.devices[0];
                    var asss = "";
                    for (it in userd.devices) {
                        asss += `
                            <div class="swiper-slide" style="background-image:url(../img/car.jpg)">
                                <p class="btn btn-success" onclick="vwasset(${userd.devices[it]})">${userd.devices[it]}</p>
                            </div>`
                            ;

                    }
                    //assets.innerHTML = asss;
                    // var swiper = new Swiper('.swiper-container', {
                    //     effect: 'coverflow',
                    //     grabCursor: true,
                    //     centeredSlides: true,
                    //     slidesPerView: 'auto',
                    //     coverflowEffect: {
                    //         rotate: 50,
                    //         stretch: 0,
                    //         depth: 400,
                    //         modifier: 1,
                    //         slideShadows: true,
                    //     },
                    //     pagination: {
                    //         el: '.swiper-pagination',
                    //     },
                    // });
                }
                else {
                    // fnam[it].value = "Not Set";
                    dve = "noasset";


                    assets.innerHTML = `
                    <div class="col-lg-3 col-md-6 m-b-20 noasset">
                        <center>
                            <i style="font-size: 100px;" class="mdi mdi-car"></i>
                            <br><br>
                            <p class="btn btn-success" onclick="vwasset('noasset')">noasset</p>
                        </center>
                    </div>
                    `;
                    assets.innerHTML += `
                    <div class="col-lg-3 col-md-6 m-b-20 noasset1">
                        <center>
                            <i style="font-size: 100px;" class="mdi mdi-car"></i>
                            <br><br>
                            <p class="btn btn-success" onclick="vwasset('noasset1')">noasset</p>
                        </center>
                    </div>
                    `;


                }

                console.log(asset);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // asset.innerHTML = dve;
                }
                else {
                    // fnam[it].value = "Not Set";
                    // asset.innerHTML = dve;
                }
                // console.log(namuserovw);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     namuserovw.innerHTML = "TBD";
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     namuserovw.innerHTML = "Not Set";
                // }
                // console.log(carnams);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     var dvc = `Assets: <br>`;
                //     userd.devices.forEach(function (device) {
                //         dvc += `<span class="btn btn-success">${device}</span><br><br>`
                //     })

                //     carnams.innerHTML = dvc;
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     carnams.innerHTML = `
                //     Assets: <span class="btn btn-success">None Available</span><br><br>
                //     `;
                // }
                // console.log(namcarsubs);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     var dav = `Subscriptions: '\r\n'`;
                //     userd.devices.forEach(function (device) {
                //         dav += `
                //     <h5 class="m-t-30">Current Subscription----<span class="pull-right">${device}</span></h5>
                //     <div class="progress">
                //         <div class="progress-bar" role="progressbar"
                //             aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
                //             style="width:100%; height:6px;"> <span class="sr-only"></span> 
                //         </div>
                //     </div>
                //     <br>
                //     `;
                //     })

                //     namcarsubs.innerHTML = dav;
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     namcarsubs.innerHTML = `
                //     <h5 class="m-t-30">Current Subscription----<span class="pull-right">None</span></h5>
                //     <div class="progress">
                //         <div class="progress-bar" role="progressbar"
                //             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                //             style="width:100%; height:6px;"> <span class="sr-only"></span> 
                //         </div>
                //     </div>
                //     `;
                // }
                console.log(namassets);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    var dvs = "";
                    userd.devices.forEach(function (device) {

                        if (device.length == 14) {
                            console.log(device.length);
                            dvs += `
                            <div class="col-lg-3 col-md-6 ">
                                <div class="card ${device}" onclick="vwasset(${device})">
                                    <div class="card-body">
                                        <div class="d-flex flex-row">
                                            <div class="round round-lg align-self-center round-info"><i class="mdi mdi-car"></i>
                                            </div>
                                            <div class="m-l-10 align-self-center">
                                                <h3 class="m-b-0 font-light">Asset Name</h3>
                                                <h5 class="text-muted m-b-0">${device}</h5>
                                            </div>
                                            <div style="width: 20px; position: absolute; right: 20px; height:20px; border-radius: 50px; background: yellow;" id="${device}"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        }
                        var timer = setTimeout(function () {
                            var deve = document.getElementById('pointer');
                            var sta = document.getElementById('status');
                            sta.innerText = "Initializing...";
                            deve.style.background = "grey";
                        }, 3000);
                        dataa.child(device).on("value", function(){
                            clearTimeout(timer);
                            var dev = document.getElementById('pointer');
                            var stat = document.getElementById('status');
                            dev.style.background = "green";
                            stat.innerText = "Online";
                            timer = setTimeout(function (){
                                dev.style.background = "grey";
                                stat.innerText = "Offline";
                            }, 10000);
                            
                        });
                        

                    });
                    // console.log(dvs);
                    // namassets.innerHTML = dvs;
                }
                else {
                    // fnam[it].value = "Not Set";
                    // namassets.innerHTML = `
                    // <div class="col-lg-3 col-md-6">
                    //     <div class="card noasset" onclick="vwasset('noasset')">
                    //         <div class="card-body">
                    //             <div class="d-flex flex-row">
                    //                 <div class="round round-lg align-self-center round-info"><i class="ti-wallet"></i>
                    //                 </div>
                    //                 <div class="m-l-10 align-self-center">
                    //                     <h3 class="m-b-0 font-light">Asset Name</h3>
                    //                     <h5 class="text-muted m-b-0">No Assets Present</h5>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    // `;
                    // namassets.innerHTML += `
                    // <div class="col-lg-3 col-md-6">
                    //     <div class="card noasset1" onclick="vwasset('noasset1')">
                    //         <div class="card-body">
                    //             <div class="d-flex flex-row">
                    //                 <div class="round round-lg align-self-center round-info"><i class="ti-wallet"></i>
                    //                 </div>
                    //                 <div class="m-l-10 align-self-center">
                    //                     <h3 class="m-b-0 font-light">Asset Name</h3>
                    //                     <h5 class="text-muted m-b-0">No Assets Present</h5>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    // `;
                }
                console.log(sngnam);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    sngnam.innerHTML = dve;
                }
                else {
                    // fnam[it].value = "Not Set";
                    sngnam.innerHTML = "No Asset";
                }
                console.log(sngnamcond);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    sngnamcond.innerHTML = "Good Condition";
                }
                else {
                    // fnam[it].value = "Not Set";
                    sngnamcond.innerHTML = "Unknown";
                }
                console.log(sngnamdet);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    sngnamdet.innerHTML = "No Details To Be Shown for Now";
                }
                else {
                    // fnam[it].value = "Not Set";
                    sngnamdet.innerHTML = "Couldn't fetch any Asset";
                }
                // console.log(namcarmodel);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     namcarmodel.innerHTML = `
                //     <span class="btn btn-success" id="errorcode">None Available</span>
                //     `;
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     namcarmodel.innerHTML = `
                //     <span class="btn btn-success">None Available</span>
                //     `;
                // }
                


                var sel = document.getElementsByClassName(dve);
                var lon = document.getElementById("Lon");
                var lat = document.getElementById("Lat");

                for (ind in sel) {
                    if (ind < sel.length) {
                        console.log(ind);
                        sel[ind].style.boxShadow = "0px 25px 42px rgba(0, 0, 0, 0.5)";
                    }
                }
                
                // dataa.child(dve).child("Device data").once("value", function (snap) {
                //     la = snap.val().location.latitude; 
                //     ln = snap.val().location.longitude;
                // });
                var recvd = document.getElementById('recvd');
                var recvdtime = document.getElementById('recvdtime');
                var recvderr = document.getElementById('recvderr');
                var recvderrcond = document.getElementById('recvderrcond');
                var recvdsum = document.getElementById('recvdsum');
                recvderr.innerHTML = "Scanning for Faults";
                recvderrcond.innerHTML = "loading...";
                recvdsum.innerHTML = "Please wait while our system checks your car for faults..."

                dataa.child(dve).child("Device data").on("value", function (snap) {
                    

                    var carpicurl;


                    if(snap.val().CarMD !== undefined){
                        carpicurl = snap.val().CarMD.Vimg;
                    }
                    else{
                        // carpicurl = "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80";
                        recvderr.innerHTML = "No Faults Found";
                        recvderrcond.innerHTML = "Okay";
                        recvdsum.innerHTML = "Your Car is currently fault free, Carry on and Drive Safely."
                        $('#recvderrcond').removeClass('label-light-info');
                        $('#recvderrcond').addClass('label-info');


                    }
                    
                    if (carpicurl !== undefined){
                        // carpicurl = 'url("' + carpicurl + '")' +  ' !important';
                        console.log(carpicurl);
                        carpic.src = carpicurl;
                    }
                    
                    
                    console.log(snap.val());
                    map = new google.maps.Map(document.getElementById("map"), {
                        center: { lat: 10, lng: 10 },
                        zoom: 8,
                    });
                    mark = new google.maps.Marker({ position: { lat: snap.val().location.latitude, lng: snap.val().location.longitude }, map: map });
                    var latLng = new google.maps.LatLng(snap.val().location.latitude, snap.val().location.longitude); //Makes a latlng
                    map.panTo(latLng);
                    map.addListener("center_changed", () => {
                        // 3 seconds after the center of the map has changed, pan back to the
                        // marker.
                        window.setTimeout(() => {
                            map.panTo(latLng);
                        }, 3000);
                    });
                    mark.addListener("click", () => {
                        map.setZoom(15);
                        map.setCenter(latLng);
                    });
                    if(snap.val().error_code){
                        var er = document.getElementById("errorcode");
                        er.innerText = snap.val().error_code;
                    }
                    
                    runningspeed.innerText = snap.val().canbus.running_speed;
                    // throttleopeningwidth.innerText = snap.val().canbus.throttle_opening_width;
                    // engineload.innerText = snap.val().canbus.engine_load;
                    coolanttemperature.innerText = snap.val().canbus.coolant_temp;
                    // instantenousfuelconsumption.innerText = snap.val().canbus.instantenous_fuel_consumption;
                    // averagefuelconsumption.innerText = snap.val().canbus.average_fuel_consumption;
                    // drivingrange.innerText = snap.val().canbus.driving_range;
                    // totalmileage.innerText = snap.val().canbus.total_mileage;
                    // singlefuelconsumptionvol.innerText = snap.val().canbus.single_fuel_consumption_vol;
                    totalfuelconsumptionvol.innerText = snap.val().canbus.total_fuel_consumption_vol;
                    // currenterrorcodenos.innerText = snap.val().canbus.current_error_code_nos;
                    // harshaccelerationno.innerText = snap.val().canbus.harsh_acceleration_no;
                    // harshbrakeno.innerText = snap.val().canbus.harsh_brake_no;
                    batteryvoltage.innerText = snap.val().canbus.battery_voltage;
                    // enginespeed.innerText = snap.val().canbus.engine_speed;
                    // console.log(snap.val()['canbus']);
                    
                    // batteryvoltagebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.battery_voltage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.battery_voltage, "bar")}"></div>`;
                    // enginespeedbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.engine_speed, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.engine_speed, "bar")}"></div>`;
                    // runningspeedbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.running_speed, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.running_speed, "bar")}"></div>`;
                    // throttleopeningwidthbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.throttle_opening_width, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.throttle_opening_width, "bar")}"></div>`;
                    // engineloadbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.engine_load, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.engine_load, "bar")}"></div>`;
                    // coolanttemperaturebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.coolant_temp, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.coolant_temp, "bar")}"></div>`;
                    // instantenousfuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.instantenous_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.instantenous_fuel_consumption, "bar")}"></div>`;
                    // averagefuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.average_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.average_fuel_consumption, "bar")}"></div>`;
                    // drivingrangebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.driving_range, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.driving_range, "bar")}"></div>`;
                    // totalmileagebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.total_mileage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.total_mileage, "bar")}"></div>`;
                    // singlefuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.single_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.single_fuel_consumption_vol, "bar")}"></div>`;
                    // totalfuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.total_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.total_fuel_consumption_vol, "bar")}"></div>`;
                    // currenterrorcodenosbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.current_error_code_nos, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.current_error_code_nos, "bar")}"></div>`;
                    // harshaccelerationnobar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.harsh_acceleration_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.harsh_acceleration_no, "bar")}"></div>`;
                    // harshbrakenobar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.harsh_brake_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.harsh_brake_no, "bar")}"></div>`;
                    // namign.innerText = snap.val()["driver behavior"].total_ignition_no;
                    // namdrivtim.innerText = snap.val()["driver behavior"].total_driving_time;
                    // namidltim.innerText = snap.val()["driver behavior"].total_idling_time;
                    // namhotstarts.innerText = snap.val()["driver behavior"].average_hot_start_time;
                    // namavgspeed.innerText = snap.val()["driver behavior"].average_speed;
                    // namhighestspeed.innerText = snap.val()["driver behavior"].history_highest_speed;
                    // namengrotation.innerText = snap.val()["driver behavior"].history_highest_rotation;
                    // namharshaccel.innerText = snap.val()["driver behavior"].total_harsh_acceleration_no;
                    // namharshbraking.innerText = snap.val()["driver behavior"].total_harsh_brake_no;
                    // console.log(parseFloat(snap.val().canbus.engine_load))
                    // $("#namignbar").addClass("label-info");
                    // $("#namdrivtimbar").addClass("label-info");
                    // $("#namidltimbar").addClass("label-info");
                    // $("#namhotstartsbar").addClass("label-info");
                    // $("#namavgspeedbar").addClass("label-info");
                    // $("#namhighestspeedbar").addClass("label-info");
                    // $("#namengrotationbar").addClass("label-info");
                    // $("#namharshaccelbar").addClass("label-info");
                    // $("#namharshbrakingbar").addClass("label-info");
                    // namignbar.innerText = "Normal";
                    // namdrivtimbar.innerText = "Normal";
                    // namidltimbar.innerText = "Normal";
                    // namhotstartsbar.innerText = "Normal";
                    // namavgspeedbar.innerText = "Normal";
                    // namhighestspeedbar.innerText = "Normal";
                    // namengrotationbar.innerText = "Normal";
                    // namharshaccelbar.innerText = "Normal";
                    // namharshbrakingbar.innerText = "Normal";
                    // weekly = [0, 0, 0, 0, 0, 0, 0];
                    // ============================================================== 
                    // Gauge chart option
                    // ============================================================== 
                    var gaugeChart = echarts.init(document.getElementById('gauge-chart'));
                    option = {
                        tooltip: {
                            formatter: "{a} <br/>{b} : {c}%"
                        }
                        , toolbox: {
                            show: false
                            , feature: {
                                mark: {
                                    show: true
                                }
                                , restore: {
                                    show: true
                                }
                                , saveAsImage: {
                                    show: true
                                }
                            }
                        }
                        , series: [
                            {
                                name: '', 
                                type: 'gauge',
                                splitNumber: 0, // 分割段数，默认为5
                                axisLine: { // 坐标轴线
                                    lineStyle: { // 属性lineStyle控制线条样式
                                        color: [[0.2, '#785ff3'], [0.8, '#8c76f9'], [1, '#9e8bfe']], 
                                        width: 20
                                    }
                                }
                                , axisTick: { // 坐标轴小标记
                                    splitNumber: 0, // 每份split细分多少段
                                    length: 12, // 属性length控制线长
                                    lineStyle: { // 属性lineStyle控制线条样式
                                        color: 'auto'
                                    }
                                }
                                , axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        color: 'auto'
                                    }
                                }
                                , splitLine: { // 分隔线
                                    show: false, // 默认显示，属性show控制显示与否
                                    length: 50, // 属性length控制线长
                                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                        color: 'auto'
                                    }
                                }
                                , pointer: {
                                    width: 5
                                    , color: '#54667a'
                                }
                                , title: {
                                    show: false
                                    , offsetCenter: [0, '-40%'], // x, y，单位px
                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        fontWeight: 'bolder'
                                    }
                                }
                                , detail: {
                                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        color: 'auto'
                                        , fontSize: '14'
                                        , fontWeight: 'bolder'
                                    }
                                }
                                , data: [{
                                    value: parseInt(snap.val().canbus.running_speed), 
                                    name: ''
                                }]
                            }
                        ]
                    };
                    timeTicket = setInterval(function () {
                        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                        gaugeChart.setOption(option, true);
                    }, 2000)
                    // use configuration item and data specified to show chart
                    gaugeChart.setOption(option, true), $(function () {
                        function resize() {
                            setTimeout(function () {
                                gaugeChart.resize()
                            }, 100)
                        }
                        $(window).on("resize", resize), $(".sidebartoggler").on("click", resize)
                    });

                });
                
                

                
                
            })
            console.log(userd);
        
            



        }
        else {
            window.location.assign("pages-login.html.htm");
        }
    });

}
else if (page.split(".").includes("indexAdminMaps")) {
    var to = false;
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            var userdata = {
                'username': '',
                'fullname': '',
                'email': '',
                'phone': '',
                'address': '',
                'gender': '',
                'plan': '',
                'cls': '',
                'dob': '',
                'devices': '',
                'device_data': {},
                "providerid": ""
            }
            console.log(user);
            // var dta;
            user.providerData.forEach(function (profile) {
                userdata.username = profile.displayName;
                userdata.email = profile.email;
            });
            var dir = firebase.database().ref().child("public/FIXBOT/Accounts/");
            
            // console.log(userdata);
            dir.child(userdata.username).on("value", function (snap) {
                var dta = snap.val();
                // console.log("rjst");/
                console.log(dta);
                userdata.username = dta.username;
                userdata.email = dta.email;
                userdata.gender = dta.gender;
                userdata.plan = dta.plan;
                userdata.cls = dta.cls;
                userdata.dob = dta.dob;
                userdata.devices = dta.deviceids;
                userdata.address = dta.street + ', ' + dta.city + ", " + dta.state + ', ' + dta.country;
                userdata.phone = dta.phone;
                userdata.fullname = dta.fullname;
                // console.log(userdata);
                userd = userdata;
                // console.log(userd);
                console.log(userd.device_data);
                
                var map = document.getElementById("map");
                // var lat = document.getElementById("lat");
                // var lon = document.getElementById("lon");
                var weekly = [];
                var dataa = firebase.database().ref().child("public/FIXBOT/Registered devices/Data");


                

                // console.log(assets);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // userd.devices = [];
                    var nam = document.getElementsByClassName("nam");
                for (it in nam) {
                    // console.log(nam[it]);
                    if (userd !== undefined) {
                        // nam[it].value = userd.fullname;
                        nam[it].innerHTML = userd.username;
                    }
                    else {
                        // fnam[it].value = "Not Set";
                        nam[it].innerHTML = "Not Set";
                    }

                }
                    var nw = [];
                    for (id in userd.devices.split(",")) {
                        if (userd.devices.split(",")[id].length > 7) {
                            nw.push(userd.devices.split(",")[id]);
                            // console.log("lagrcfuirniugkw", id);
                        }

                        // console.log("lagrcfuirniugkw", id);
                    }
                    userd.devices = nw;

                    dve = userd.devices[0];
                    
                    //assets.innerHTML = asss;
                    // var swiper = new Swiper('.swiper-container', {
                    //     effect: 'coverflow',
                    //     grabCursor: true,
                    //     centeredSlides: true,
                    //     slidesPerView: 'auto',
                    //     coverflowEffect: {
                    //         rotate: 50,
                    //         stretch: 0,
                    //         depth: 400,
                    //         modifier: 1,
                    //         slideShadows: true,
                    //     },
                    //     pagination: {
                    //         el: '.swiper-pagination',
                    //     },
                    // });
                }
                else {
                    // fnam[it].value = "Not Set";
                    dve = "noasset";


                    


                }

                
                



                // var sel = document.getElementsByClassName(dve);
                var lon = document.getElementById("Lon");
                var lat = document.getElementById("Lat");

                // for (ind in sel) {
                //     if (ind < sel.length) {
                //         console.log(ind);
                //         sel[ind].style.boxShadow = "0px 25px 42px rgba(0, 0, 0, 0.5)";
                //     }
                // }

                // dataa.child(dve).child("Device data").once("value", function (snap) {
                //     la = snap.val().location.latitude; 
                //     ln = snap.val().location.longitude;
                // });
                var timer = setTimeout(function () {
                    var deve = document.getElementById('pointer');
                    var sta = document.getElementById('status');
                    sta.innerText = "Initializing...";
                    deve.style.background = "yellow";
                }, 3000);
                ac = dataa.child(dve).child("Device data");
                // loc = fetchlogs('location', ac);
                // console.log(loc);
                dataa.child(dve).child("Device data").on("value", function (snap) {
                    clearTimeout(timer);
                    var dev = document.getElementById('pointer');
                    var stat = document.getElementById('status');
                    dev.style.background = "green";
                    stat.innerText = "Online";
                    timer = setTimeout(function (){
                        dev.style.background = "grey";
                        stat.innerText = "Offline";
                    }, 8000);
                    data = snap.val().logs;
                    console.log(data);
                    var positio = [];
                    var cnt = 0;
                    loci = {};
                    loc = [];
                    for (i in data){
                        cnt++;
                        if(cnt < 40){
                            // console.log(i);
                            // console.log('Number ', i);
                            // console.log('her', data[i]);
                            if(data[i].data.action == 'ping'){
                                
                                insrt(loci, [
                                    data[i].date.split(' ')[2],
                                    data[i].date.split(' ')[1],
                                    data[i].date.split(' ')[0],
                                    data[i].time.split(':')[0],
                                    data[i].time.split(':')[1],
                                    data[i].time.split(':')[2]
                                ], {
                                    lat: data[i].data.data.latitude,
                                    lng: data[i].data.data.longitude
                                });
                                loc.push({
                                    lat: data[i].data.data.latitude,
                                    lng: data[i].data.data.longitude
                                });

                                
                                   
                                
                                
                            }
                            else if(data[i].data.location == undefined){

                                insrt(loc, [
                                    data[i].date.split(' ')[2],
                                    data[i].date.split(' ')[1],
                                    data[i].date.split(' ')[0],
                                    data[i].time.split(':')[0],
                                    data[i].time.split(':')[1],
                                    data[i].time.split(':')[2]
                                ], {
                                    lat: data[i].data.data.latitude,
                                    lng: data[i].data.data.longitude
                                });
                                loc.push({
                                    lat: data[i].data.data.latitude,
                                    lng: data[i].data.data.longitude
                                });
                            }

                        
                        }
                        else{
                            // console.log(i);
                            break;
                        }
                        
                        
                    }
                    console.log(loc.length);
        
                    // slider.oninput = function() {
                    //   output.innerHTML = this.value;
                    // }
                    // console.log(snap.val());
                    map = new google.maps.Map(document.getElementById("map"), {
                        center: { lat: 10, lng: 10 },
                        zoom: zoom,
                    });
                    const contentString =
                        '<div style="max-width: 400px ">' +
                        '<div class="card-body">' +
                        '<div id="content" >' +
                        '<div id="siteNotice">' +
                        "</div>" +
                        
                        '<div id="bodyContent">' +
                        '<div class="d-flex flex-row">' +
                                '<div class="card" style="max-width: 30%; border-radius: 20px; overflow: hidden; padding: 1px; margin-right: 20px;"><img src="./fixbotimg/car.jpg" ></div>' +
                                    '<div class="m-l-10 align-self-center">' +
                                        '<h3 class="m-b-0 font-lgiht">Acura V8</h3>' +
                                        '<h5 class="text-muted m-b-0">Review your Movement</h5>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            
                            
                            "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
                            "sandstone rock formation in the southern part of the " +
                            
                        
                            "Heritage Site.</p>" +
                            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
                            "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
                            "(last visited June 22, 2009).</p>" +
                            
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" 

                    ;
                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                    });
                    mark = new google.maps.Marker({ position: { lat: snap.val().location.latitude, lng: snap.val().location.longitude }, map: map });
                    var latLng = new google.maps.LatLng(snap.val().location.latitude, snap.val().location.longitude); //Makes a latlng

                    map.panTo(latLng);
                    var tog = false;
                    map.addListener("center_changed", () => {
                        // 3 seconds after the center of the map has changed, pan back to the
                        // marker.
                        window.setTimeout(() => {
                            if(!tog){
                                // map.panTo(latLng);
                            }
                            
                        }, 3000);
                    });
                    
                    mark.addListener("click", () => {
                        tog = !tog;
                        if(tog){
                            infowindow.open(map, mark);
                        }
                        else{
                            infowindow.close(map, mark);
                        }
                        // map.setZoom(15);
                        // map.setCenter(latLng);

                        

                    });
                    replay(loc, google, map);
                    
                    
                    

                    if (snap.val().error_code) {
                        var er = document.getElementById("errorcode");
                        er.innerText = snap.val().error_code;
                    }

                    // runningspeed.innerText = snap.val().canbus.running_speed;
                    // throttleopeningwidth.innerText = snap.val().canbus.throttle_opening_width;
                    // engineload.innerText = snap.val().canbus.engine_load;
                    // coolanttemperature.innerText = snap.val().canbus.coolant_temp;
                    // instantenousfuelconsumption.innerText = snap.val().canbus.instantenous_fuel_consumption;
                    // averagefuelconsumption.innerText = snap.val().canbus.average_fuel_consumption;
                    // drivingrange.innerText = snap.val().canbus.driving_range;
                    // totalmileage.innerText = snap.val().canbus.total_mileage;
                    // singlefuelconsumptionvol.innerText = snap.val().canbus.single_fuel_consumption_vol;
                    // totalfuelconsumptionvol.innerText = snap.val().canbus.total_fuel_consumption_vol;
                    // currenterrorcodenos.innerText = snap.val().canbus.current_error_code_nos;
                    // harshaccelerationno.innerText = snap.val().canbus.harsh_acceleration_no;
                    // harshbrakeno.innerText = snap.val().canbus.harsh_brake_no;
                    // batteryvoltage.innerText = snap.val().canbus.battery_voltage;
                    // enginespeed.innerText = snap.val().canbus.engine_speed;
                    // console.log(snap.val()['canbus']);





                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    // console.log(snap.val()['canbus']);



                    // batteryvoltagebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.battery_voltage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.battery_voltage, "bar")}"></div>`;
                    // enginespeedbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.engine_speed, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.engine_speed, "bar")}"></div>`;
                    // runningspeedbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.running_speed, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.running_speed, "bar")}"></div>`;
                    // throttleopeningwidthbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.throttle_opening_width, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.throttle_opening_width, "bar")}"></div>`;
                    // engineloadbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.engine_load, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.engine_load, "bar")}"></div>`;
                    // coolanttemperaturebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.coolant_temp, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.coolant_temp, "bar")}"></div>`;
                    // instantenousfuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.instantenous_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.instantenous_fuel_consumption, "bar")}"></div>`;
                    // averagefuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.average_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.average_fuel_consumption, "bar")}"></div>`;
                    // drivingrangebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.driving_range, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.driving_range, "bar")}"></div>`;
                    // totalmileagebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.total_mileage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.total_mileage, "bar")}"></div>`;
                    // singlefuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.single_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.single_fuel_consumption_vol, "bar")}"></div>`;
                    // totalfuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.total_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.total_fuel_consumption_vol, "bar")}"></div>`;
                    // currenterrorcodenosbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.current_error_code_nos, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.current_error_code_nos, "bar")}"></div>`;
                    // harshaccelerationnobar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.harsh_acceleration_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.harsh_acceleration_no, "bar")}"></div>`;
                    // harshbrakenobar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.harsh_brake_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.harsh_brake_no, "bar")}"></div>`;
                    // namign.innerText = snap.val()["driver behavior"].total_ignition_no;
                    // namdrivtim.innerText = snap.val()["driver behavior"].total_driving_time;
                    // namidltim.innerText = snap.val()["driver behavior"].total_idling_time;
                    // namhotstarts.innerText = snap.val()["driver behavior"].average_hot_start_time;
                    // namavgspeed.innerText = snap.val()["driver behavior"].average_speed;
                    // namhighestspeed.innerText = snap.val()["driver behavior"].history_highest_speed;
                    // namengrotation.innerText = snap.val()["driver behavior"].history_highest_rotation;
                    // namharshaccel.innerText = snap.val()["driver behavior"].total_harsh_acceleration_no;
                    // namharshbraking.innerText = snap.val()["driver behavior"].total_harsh_brake_no;
                    // console.log(parseFloat(snap.val().canbus.engine_load))
                    // $("#namignbar").addClass("label-info");
                    // $("#namdrivtimbar").addClass("label-info");
                    // $("#namidltimbar").addClass("label-info");
                    // $("#namhotstartsbar").addClass("label-info");
                    // $("#namavgspeedbar").addClass("label-info");
                    // $("#namhighestspeedbar").addClass("label-info");
                    // $("#namengrotationbar").addClass("label-info");
                    // $("#namharshaccelbar").addClass("label-info");
                    // $("#namharshbrakingbar").addClass("label-info");
                    // namignbar.innerText = "Normal";
                    // namdrivtimbar.innerText = "Normal";
                    // namidltimbar.innerText = "Normal";
                    // namhotstartsbar.innerText = "Normal";
                    // namavgspeedbar.innerText = "Normal";
                    // namhighestspeedbar.innerText = "Normal";
                    // namengrotationbar.innerText = "Normal";
                    // namharshaccelbar.innerText = "Normal";
                    // namharshbrakingbar.innerText = "Normal";
                    // weekly = [0, 0, 0, 0, 0, 0, 0];
                })




            })
            console.log(userd);





        }
        else {
            window.location.assign("pages-login.html.htm");
        }
    });

}
else if (page.split(".").includes("indexAdminMarketplace")) {
    var cal = document.getElementById('cal');
    cal.innerHTML = '<div id="calendar"></div>';

    

}
else if (page.split(".").includes("indexAdminFaults")) {
    // firebase.auth().signInWithEmailAndPassword(userd.emaill, userd.passwordd).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //     console.log("Error Code : " + errorCode);
    //     console.log("Error Message : " + errorMessage);
    //     document.getElementById("note").innerHTML = errorMessage;


    // })
    
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            var userdata = {
                'username': '',
                'fullname': '',
                'email': '',
                'phone': '',
                'address': '',
                'gender': '',
                'plan': '',
                'cls': '',
                'dob': '',
                'devices': '',
                'device_data': {},
                "providerid": ""
            }
            console.log(user);
            // var dta;
            user.providerData.forEach(function (profile) {
                userdata.username = profile.displayName;
                userdata.email = profile.email;
            });
            var dir = firebase.database().ref().child("public/FIXBOT/Accounts/");
            // console.log(userdata);
            dir.child(userdata.username).on("value", function (snap) {
                var dta = snap.val();
                // console.log("rjst");/
                // console.log(dta);
                userdata.username = dta.username;
                userdata.email = dta.email;
                userdata.gender = dta.gender;
                userdata.plan = dta.plan;
                userdata.cls = dta.cls;
                userdata.dob = dta.dob;
                userdata.devices = dta.deviceids;
                userdata.address = dta.street + ', ' + dta.city + ", " + dta.state + ', ' + dta.country;
                userdata.phone = dta.phone;
                userdata.fullname = dta.fullname;
                // console.log(userdata);
                userd = userdata;
                // console.log(userd);
                console.log(userd.device_data);
                var fnam = document.getElementsByClassName("fnam");
                var nam = document.getElementsByClassName("nam");
                var namclass = document.getElementById("namclass");
                var namdetails = document.getElementById("namdetails");
                var namsubstart = document.getElementById("namsubstart");
                var namsubexp = document.getElementById("namsubexp");
                var namsubbal = document.getElementsByClassName("namsubbal");
                var eml = document.getElementsByClassName("eml");
                var phnnum = document.getElementsByClassName("phnnum");
                var add = document.getElementsByClassName("add");
                var assets = document.getElementById("assetz");
                var carnams = document.getElementById("carnams");
                var asset = document.getElementById("asset");
                var namuserovw = document.getElementById("namuserovw");
                var namcarsubs = document.getElementById("namcarsubs");
                var namassets = document.getElementById("namassets");
                var sngnam = document.getElementById("sngnam");
                var sngnamcond = document.getElementById("sngnamcond");
                var sngnamdet = document.getElementById("sngnamdet");
                var namcarmodel = document.getElementById("namcarmodel");
                var namtrackmap = document.getElementById("namtrackmap");
                var namwindspeed = document.getElementById("namwindspeed");
                var namtotalmileage = document.getElementById("namtotalmileage");
                var namtotalcrashes = document.getElementById("namtotalcrashes");
                var runningspeed = document.getElementById("runningspeed");
                var throttleopeningwidth = document.getElementById("throttleopeningwidth");
                var engineload = document.getElementById("engineload");
                var coolanttemperature = document.getElementById("coolanttemperature");
                var instantenousfuelconsumption = document.getElementById("instantenousfuelconsumption");
                var averagefuelconsumption = document.getElementById("averagefuelconsumption");
                var drivingrange = document.getElementById("drivingrange");
                var totalmileage = document.getElementById("totalmileage");
                var singlefuelconsumptionvol = document.getElementById("singlefuelconsumptionvol");
                var totalfuelconsumptionvol = document.getElementById("totalfuelconsumptionvol");
                var currenterrorcodenos = document.getElementById("currenterrorcodenos");
                var harshaccelerationno = document.getElementById("harshaccelerationno");
                var harshbrakeno = document.getElementById("harshbrakeno");
                var drivingbehaviourdata = document.getElementById("drivingbehaviourdata");
                var batteryvoltage = document.getElementById("batteryvoltage");
                var enginespeed = document.getElementById("enginespeed");
                var batteryvoltagebar = document.getElementById("batteryvoltagebar");
                var enginespeedbar = document.getElementById("enginespeedbar");
                var runningspeedbar = document.getElementById("runningspeedbar");
                var throttleopeningwidthbar = document.getElementById("throttleopeningwidthbar");
                var engineloadbar = document.getElementById("engineloadbar");
                var coolanttemperaturebar = document.getElementById("coolanttemperaturebar");
                var instantenousfuelconsumptionbar = document.getElementById("instantenousfuelconsumptionbar");
                var averagefuelconsumptionbar = document.getElementById("averagefuelconsumptionbar");
                var drivingrangebar = document.getElementById("drivingrangebar");
                var totalmileagebar = document.getElementById("totalmileagebar");
                var singlefuelconsumptionvolbar = document.getElementById("singlefuelconsumptionvolbar");
                var totalfuelconsumptionvolbar = document.getElementById("totalfuelconsumptionvolbar");
                var currenterrorcodenosbar = document.getElementById("currenterrorcodenosbar");
                var harshaccelerationnobar = document.getElementById("harshaccelerationnobar");
                var harshbrakenobar = document.getElementById("harshbrakenobar");
                var namign = document.getElementById("namign");
                var namdrivtim = document.getElementById("namdrivtim");
                var namidltim = document.getElementById("namidltim");
                var namhotstarts = document.getElementById("namhotstarts");
                var namavgspeed = document.getElementById("namavgspeed");
                var namhighestspeed = document.getElementById("namhighestspeed");
                var namengrotation = document.getElementById("namengrotation");
                var namharshaccel = document.getElementById("namharshaccel");
                var namharshbraking = document.getElementById("namharshbraking");
                var namignbar = document.getElementById("namignbar");
                var namdrivtimbar = document.getElementById("namdrivtimbar");
                var namidltimbar = document.getElementById("namidltimbar");
                var namhotstartsbar = document.getElementById("namhotstartsbar");
                var namavgspeedbar = document.getElementById("namavgspeedbar");
                var namhighestspeedbar = document.getElementById("namhighestspeedbar");
                var namengrotationbar = document.getElementById("namengrotationbar");
                var namharshaccelbar = document.getElementById("namharshaccelbar");
                var namharshbrakingbar = document.getElementById("namharshbrakingbar");
                var map = document.getElementById("map");
                var weekly = [];
                var dataa = firebase.database().ref().child("public/FIXBOT/Registered devices/Data");
                

                for (it in fnam) {
                    // console.log(userd);
                    if (userd !== undefined) {
                        fnam[it].value = userd.fullname;
                        fnam[it].innerHTML = userd.fullname;
                    }
                    else {
                        fnam[it].value = "Not Set";
                        fnam[it].innerHTML = "Not Set";
                    }

                }
                for (it in nam) {
                    // console.log(nam[it]);
                    if (userd !== undefined) {
                        // nam[it].value = userd.fullname;
                        nam[it].innerHTML = userd.username;
                    }
                    else {
                        // fnam[it].value = "Not Set";
                        nam[it].innerHTML = "Not Set";
                    }

                }
                

                

                // console.log(assets);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // userd.devices = [];
                    var nw = [];
                    for (id in userd.devices.split(",")) {
                        if (userd.devices.split(",")[id].length > 7) {
                            nw.push(userd.devices.split(",")[id]);
                            // console.log("lagrcfuirniugkw", id);
                        }

                        // console.log("lagrcfuirniugkw", id);
                    }
                    userd.devices = nw;

                    dve = userd.devices[0];

                    var asss = "";
                    for (it in userd.devices) {
                        asss += `
                            <div class="swiper-slide" style="background-image:url(../img/car.jpg)">
                                <p class="btn btn-success" onclick="vwasset(${userd.devices[it]})">${userd.devices[it]}</p>
                            </div>`
                            ;

                    }
                    //assets.innerHTML = asss;
                    // var swiper = new Swiper('.swiper-container', {
                    //     effect: 'coverflow',
                    //     grabCursor: true,
                    //     centeredSlides: true,
                    //     slidesPerView: 'auto',
                    //     coverflowEffect: {
                    //         rotate: 50,
                    //         stretch: 0,
                    //         depth: 400,
                    //         modifier: 1,
                    //         slideShadows: true,
                    //     },
                    //     pagination: {
                    //         el: '.swiper-pagination',
                    //     },
                    // });
                }
                

                // console.log(asset);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     asset.innerHTML = dve;
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     asset.innerHTML = dve;
                // }
                // console.log(namuserovw);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     namuserovw.innerHTML = "TBD";
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     namuserovw.innerHTML = "Not Set";
                // }
                // console.log(carnams);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     var dvc = `Assets: <br>`;
                //     userd.devices.forEach(function (device) {
                //         dvc += `<span class="btn btn-success">${device}</span><br><br>`
                //     })

                //     carnams.innerHTML = dvc;
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     carnams.innerHTML = `
                //     Assets: <span class="btn btn-success">None Available</span><br><br>
                //     `;
                // }
                // console.log(namcarsubs);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     var dav = `Subscriptions: '\r\n'`;
                //     userd.devices.forEach(function (device) {
                //         dav += `
                //     <h5 class="m-t-30">Current Subscription----<span class="pull-right">${device}</span></h5>
                //     <div class="progress">
                //         <div class="progress-bar" role="progressbar"
                //             aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
                //             style="width:100%; height:6px;"> <span class="sr-only"></span> 
                //         </div>
                //     </div>
                //     <br>
                //     `;
                //     })

                //     namcarsubs.innerHTML = dav;
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     namcarsubs.innerHTML = `
                //     <h5 class="m-t-30">Current Subscription----<span class="pull-right">None</span></h5>
                //     <div class="progress">
                //         <div class="progress-bar" role="progressbar"
                //             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                //             style="width:100%; height:6px;"> <span class="sr-only"></span> 
                //         </div>
                //     </div>
                //     `;
                // }
                // console.log(namassets);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     var dvs = "";
                //     userd.devices.forEach(function (device) {

                //         if (device.length == 14) {
                //             console.log(device.length);
                //             dvs += `
                //             <div class="col-lg-3 col-md-6 ">
                //                 <div class="card ${device}" onclick="vwasset(${device})">
                //                     <div class="card-body">
                //                         <div class="d-flex flex-row">
                //                             <div class="round round-lg align-self-center round-info"><i class="mdi mdi-car"></i>
                //                             </div>
                //                             <div class="m-l-10 align-self-center">
                //                                 <h3 class="m-b-0 font-light">Asset Name</h3>
                //                                 <h5 class="text-muted m-b-0">${device}</h5>
                //                             </div>
                //                             <div style="width: 20px; position: absolute; right: 20px; height:20px; border-radius: 50px; background: yellow;" id="${device}"></div>
                //                         </div>
                //                     </div>
                //                 </div>
                //             </div>
                //             `;
                //         }
                //         var timer = setTimeout(function () {
                //             var deve = document.getElementById(device);
                //             deve.style.background = "grey";
                //         }, 3000);
                //         dataa.child(device).on("value", function(){
                //             clearTimeout(timer);
                //             var dev = document.getElementById(device);
                //             dev.style.background = "green";
                //             timer = setTimeout(function (){
                //                 dev.style.background = "grey";
                //             }, 10000);
                //             // userd.device_data[device] = data.val();
                //             // console.log(userd.device_data[device]);
                //         });


                //     });
                //     // console.log(dvs);
                //     namassets.innerHTML = dvs;
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     namassets.innerHTML = `
                //     <div class="col-lg-3 col-md-6">
                //         <div class="card noasset" onclick="vwasset('noasset')">
                //             <div class="card-body">
                //                 <div class="d-flex flex-row">
                //                     <div class="round round-lg align-self-center round-info"><i class="ti-wallet"></i>
                //                     </div>
                //                     <div class="m-l-10 align-self-center">
                //                         <h3 class="m-b-0 font-light">Asset Name</h3>
                //                         <h5 class="text-muted m-b-0">No Assets Present</h5>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     `;
                //     namassets.innerHTML += `
                //     <div class="col-lg-3 col-md-6">
                //         <div class="card noasset1" onclick="vwasset('noasset1')">
                //             <div class="card-body">
                //                 <div class="d-flex flex-row">
                //                     <div class="round round-lg align-self-center round-info"><i class="ti-wallet"></i>
                //                     </div>
                //                     <div class="m-l-10 align-self-center">
                //                         <h3 class="m-b-0 font-light">Asset Name</h3>
                //                         <h5 class="text-muted m-b-0">No Assets Present</h5>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     `;
                // }
                console.log(sngnam);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // sngnam.innerHTML = dve;
                }
                else {
                    // fnam[it].value = "Not Set";
                    // sngnam.innerHTML = "No Asset";
                }
                console.log(sngnamcond);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    sngnamcond.innerHTML = "Good Condition";
                }
                else {
                    // fnam[it].value = "Not Set";
                    // sngnamcond.innerHTML = "Unknown";
                }
                console.log(sngnamdet);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    // sngnamdet.innerHTML = "No Details To Be Shown for Now";
                }
                else {
                    // fnam[it].value = "Not Set";
                    // sngnamdet.innerHTML = "Couldn't fetch any Asset";
                }
                // console.log(namcarmodel);
                // if (userd !== undefined) {
                //     // nam[it].value = userd.fullname;
                //     namcarmodel.innerHTML = `
                //     <span class="btn btn-success" id="errorcode">None Available</span>
                //     `;
                // }
                // else {
                //     // fnam[it].value = "Not Set";
                //     namcarmodel.innerHTML = `
                //     <span class="btn btn-success">None Available</span>
                //     `;
                // }



                var sel = document.getElementsByClassName(dve);
                var lon = document.getElementById("Lon");
                var lat = document.getElementById("Lat");

                for (ind in sel) {
                    if (ind < sel.length) {
                        console.log(ind);
                        sel[ind].style.boxShadow = "0px 25px 42px rgba(0, 0, 0, 0.5)";
                    }
                }

                // dataa.child(dve).child("Device data").once("value", function (snap) {
                //     la = snap.val().location.latitude; 
                //     ln = snap.val().location.longitude;
                // });
                var recvd = document.getElementById('recvd');
                var recvdtime = document.getElementById('recvdtime');
                var recvderr = document.getElementById('recvderr');
                var recvderrcond = document.getElementById('recvderrcond');
                var recvdsum = document.getElementById('recvdsum');
                recvderr.innerHTML = "Scanning for Faults";
                recvderrcond.innerHTML = "loading...";
                recvdsum.innerHTML = "Please wait while our system checks your car for faults..."

                dataa.child(dve).child("Device data").on("value", function (snap) {
                    if(snap.val().CarMD !== undefined){
                        
                    }
                    
                    if (snap.val().error_code) {
                        var er = document.getElementById("errorcode");
                        er.innerText = snap.val().error_code;
                    }
                    else{
                        recvderr.innerHTML = "No Faults Found";
                        recvderrcond.innerHTML = "Okay";
                        recvdsum.innerHTML = "Your Car is currently fault free, Carry on and Drive Safely."
                        $('#recvderrcond').removeClass('label-light-info');
                        $('#recvderrcond').addClass('label-info');


                    }
                    runningspeed.innerText = snap.val().canbus.running_speed;
                    throttleopeningwidth.innerText = snap.val().canbus.throttle_opening_width;
                    engineload.innerText = snap.val().canbus.engine_load;
                    coolanttemperature.innerText = snap.val().canbus.coolant_temp;
                    instantenousfuelconsumption.innerText = snap.val().canbus.instantenous_fuel_consumption;
                    averagefuelconsumption.innerText = snap.val().canbus.average_fuel_consumption;
                    drivingrange.innerText = snap.val().canbus.driving_range;
                    totalmileage.innerText = snap.val().canbus.total_mileage;
                    singlefuelconsumptionvol.innerText = snap.val().canbus.single_fuel_consumption_vol;
                    totalfuelconsumptionvol.innerText = snap.val().canbus.total_fuel_consumption_vol;
                    currenterrorcodenos.innerText = snap.val().canbus.current_error_code_nos;
                    harshaccelerationno.innerText = snap.val().canbus.harsh_acceleration_no;
                    harshbrakeno.innerText = snap.val().canbus.harsh_brake_no;
                    batteryvoltage.innerText = snap.val().canbus.battery_voltage;
                    enginespeed.innerText = snap.val().canbus.engine_speed;
                    // console.log(snap.val()['canbus']);

                    batteryvoltagebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.battery_voltage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.battery_voltage, "bar")}"></div>`;
                    enginespeedbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.engine_speed, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.engine_speed, "bar")}"></div>`;
                    runningspeedbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.running_speed, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.running_speed, "bar")}"></div>`;
                    throttleopeningwidthbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.throttle_opening_width, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.throttle_opening_width, "bar")}"></div>`;
                    engineloadbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.engine_load, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.engine_load, "bar")}"></div>`;
                    coolanttemperaturebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.coolant_temp, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.coolant_temp, "bar")}"></div>`;
                    instantenousfuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.instantenous_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.instantenous_fuel_consumption, "bar")}"></div>`;
                    averagefuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.average_fuel_consumption, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.average_fuel_consumption, "bar")}"></div>`;
                    drivingrangebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.driving_range, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.driving_range, "bar")}"></div>`;
                    totalmileagebar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.total_mileage, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.total_mileage, "bar")}"></div>`;
                    singlefuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.single_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.single_fuel_consumption_vol, "bar")}"></div>`;
                    totalfuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.total_fuel_consumption_vol, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.total_fuel_consumption_vol, "bar")}"></div>`;
                    currenterrorcodenosbar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.current_error_code_nos, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.current_error_code_nos, "bar")}"></div>`;
                    harshaccelerationnobar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.harsh_acceleration_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.harsh_acceleration_no, "bar")}"></div>`;
                    harshbrakenobar.innerHTML = `<div data-label="${getpcnt("runningspeed", snap.val().canbus.harsh_brake_no, "val")}%" class="css-bar m-b-0 css-bar-danger css-bar-${getpcnt("runningspeed", snap.val().canbus.harsh_brake_no, "bar")}"></div>`;
                    // namign.innerText = snap.val()["driver behavior"].total_ignition_no;
                    // namdrivtim.innerText = snap.val()["driver behavior"].total_driving_time;
                    // namidltim.innerText = snap.val()["driver behavior"].total_idling_time;
                    // namhotstarts.innerText = snap.val()["driver behavior"].average_hot_start_time;
                    // namavgspeed.innerText = snap.val()["driver behavior"].average_speed;
                    // namhighestspeed.innerText = snap.val()["driver behavior"].history_highest_speed;
                    // namengrotation.innerText = snap.val()["driver behavior"].history_highest_rotation;
                    // namharshaccel.innerText = snap.val()["driver behavior"].total_harsh_acceleration_no;
                    // namharshbraking.innerText = snap.val()["driver behavior"].total_harsh_brake_no;
                    // console.log(parseFloat(snap.val().canbus.engine_load))
                    // $("#namignbar").addClass("label-info");
                    // $("#namdrivtimbar").addClass("label-info");
                    // $("#namidltimbar").addClass("label-info");
                    // $("#namhotstartsbar").addClass("label-info");
                    // $("#namavgspeedbar").addClass("label-info");
                    // $("#namhighestspeedbar").addClass("label-info");
                    // $("#namengrotationbar").addClass("label-info");
                    // $("#namharshaccelbar").addClass("label-info");
                    // $("#namharshbrakingbar").addClass("label-info");
                    // namignbar.innerText = "Normal";
                    // namdrivtimbar.innerText = "Normal";
                    // namidltimbar.innerText = "Normal";
                    // namhotstartsbar.innerText = "Normal";
                    // namavgspeedbar.innerText = "Normal";
                    // namhighestspeedbar.innerText = "Normal";
                    // namengrotationbar.innerText = "Normal";
                    // namharshaccelbar.innerText = "Normal";
                    // namharshbrakingbar.innerText = "Normal";
                    // weekly = [0, 0, 0, 0, 0, 0, 0];
                })




            })
            console.log(userd);





        }
        else {
            window.location.assign("pages-login.html.htm");
        }
    });

}










function changeBarlog(data, but) {
    document.getElementById("barlog").innerHTML = data;
    var rt = data + ' DATA';
    document.getElementById("rtdata").innerHTML = rt;
    document.getElementById("rtdatasub").innerHTML = data;



};

var render = function (data, element) {
    switch (data) {

    }

}

// console.log(dve);
function vwasset(data) {
    if (page.split(".").includes("indexAdmin")){
        document.getElementById('asset').innerText = data;
    }
    
    var se = document.getElementsByClassName(dve);
    for (ind in se) {
        if (ind < se.length) {
            se[ind].style.boxShadow = "initial";
        }
    }
    console.log(dve);
    dve = data;
    console.log(data);
    se = document.getElementsByClassName(dve);
    for (ind in se) {
        if (ind < se.length) {
            se[ind].style.boxShadow = "0px 25px 42px rgba(0, 0, 0, 0.5)";
        }
    }

    if (userdd || userd) {
        // document.getElementById("namuserovw").innerHTML = userd.device_data[data];
        document.getElementById("sngnam").innerHTML = data;
        document.getElementById("runningspeed").innerHTML = data;
        document.getElementById("throttleopeningwidth").innerHTML = data;
        document.getElementById("engineload").innerHTML = data;
        document.getElementById("coolanttemperature").innerHTML = data;
        document.getElementById("instantenousfuelconsumption").innerHTML = data;
        document.getElementById("averagefuelconsumption").innerHTML = data;
        document.getElementById("drivingrange").innerHTML = data;
        document.getElementById("totalmileage").innerHTML = data;
        document.getElementById("singlefuelconsumptionvol").innerHTML = data;
        document.getElementById("totalfuelconsumptionvol").innerHTML = data;
        document.getElementById("currenterrorcodenos").innerHTML = data;
        document.getElementById("harshaccelerationno").innerHTML = data;
        document.getElementById("harshbrakeno").innerHTML = data;
        document.getElementById("batteryvoltage").innerHTML = data;
        document.getElementById("enginespeed").innerHTML = data;
    }
    else {
        document.getElementById("namuserovw").innerHTML = data;
        document.getElementById("sngnam").innerHTML = data;
        document.getElementById("runningspeed").innerHTML = data;
        document.getElementById("throttleopeningwidth").innerHTML = data;
        document.getElementById("engineload").innerHTML = data;
        document.getElementById("coolanttemperature").innerHTML = data;
        document.getElementById("instantenousfuelconsumption").innerHTML = data;
        document.getElementById("averagefuelconsumption").innerHTML = data;
        document.getElementById("drivingrange").innerHTML = data;
        document.getElementById("totalmileage").innerHTML = data;
        document.getElementById("singlefuelconsumptionvol").innerHTML = data;
        document.getElementById("totalfuelconsumptionvol").innerHTML = data;
        document.getElementById("currenterrorcodenos").innerHTML = data;
        document.getElementById("harshaccelerationno").innerHTML = data;
        document.getElementById("harshbrakeno").innerHTML = data;
        document.getElementById("batteryvoltage").innerHTML = data;
        document.getElementById("enginespeed").innerHTML = data;

    }

    // console.log("oadbv usdbca");
};
function vwassete(data) {
    document.getElementById('user').innerText = data;
    var se = document.getElementsByClassName(dva);
    for (ind in se) {
        if (ind < se.length) {
            se[ind].style.boxShadow = "initial";
        }
    }
    console.log(dva);
    dva = data;
    console.log(data);
    se = document.getElementsByClassName(dva);
    for (ind in se) {
        if (ind < se.length) {
            se[ind].style.boxShadow = "0px 25px 42px rgba(0, 0, 100, 0.5)";
        }
    }

    if (userd) {
        // document.getElementById("namuserovw").innerHTML = userd.device_data[data];
        document.getElementById("sngnam").innerHTML = data;
        document.getElementById("runningspeed").innerHTML = data;
        document.getElementById("throttleopeningwidth").innerHTML = data;
        document.getElementById("engineload").innerHTML = data;
        document.getElementById("coolanttemperature").innerHTML = data;
        document.getElementById("instantenousfuelconsumption").innerHTML = data;
        document.getElementById("averagefuelconsumption").innerHTML = data;
        document.getElementById("drivingrange").innerHTML = data;
        document.getElementById("totalmileage").innerHTML = data;
        document.getElementById("singlefuelconsumptionvol").innerHTML = data;
        document.getElementById("totalfuelconsumptionvol").innerHTML = data;
        document.getElementById("currenterrorcodenos").innerHTML = data;
        document.getElementById("harshaccelerationno").innerHTML = data;
        document.getElementById("harshbrakeno").innerHTML = data;
        document.getElementById("batteryvoltage").innerHTML = data;
        document.getElementById("enginespeed").innerHTML = data;
    }
    else {
        document.getElementById("namuserovw").innerHTML = data;
        document.getElementById("sngnam").innerHTML = data;
        document.getElementById("runningspeed").innerHTML = data;
        document.getElementById("throttleopeningwidth").innerHTML = data;
        document.getElementById("engineload").innerHTML = data;
        document.getElementById("coolanttemperature").innerHTML = data;
        document.getElementById("instantenousfuelconsumption").innerHTML = data;
        document.getElementById("averagefuelconsumption").innerHTML = data;
        document.getElementById("drivingrange").innerHTML = data;
        document.getElementById("totalmileage").innerHTML = data;
        document.getElementById("singlefuelconsumptionvol").innerHTML = data;
        document.getElementById("totalfuelconsumptionvol").innerHTML = data;
        document.getElementById("currenterrorcodenos").innerHTML = data;
        document.getElementById("harshaccelerationno").innerHTML = data;
        document.getElementById("harshbrakeno").innerHTML = data;
        document.getElementById("batteryvoltage").innerHTML = data;
        document.getElementById("enginespeed").innerHTML = data;

    }

    // console.log("oadbv usdbca");
};

var getpcnt = function(name, amt, typ){
    if(typ == "val"){
        amt = parseInt(amt, 10);
    }
    if(typ == "bar"){
        amt = Math.ceil(parseInt(amt, 10) / 10) * 10;
    }
    
    var pcnt;
    switch(name){
        case "runningspeed" : {
            pcnt = (amt/100) * 100;
        }
        break;
        case "throttleopeningwidth": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "engineload": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "coolanttemperature": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "instantenousfuelconsumption": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "averagefuelconsumption": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "singlefuelconsumptionvol": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "totalfuelconsumptionvol": {
            pcnt = (amt / 100) * 100;
        }
            break;
    }
    // console.log(typeof(pcnt));
    return parseInt(pcnt, 10);

};
// const escapeRegExp = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');


// const chars = '.$[]#/%'.split('');
// const charCodes = chars.map((c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

// const charToCode = {};
// const codeToChar = {};
// chars.forEach((c, i) => {
//     charToCode[c] = charCodes[i];
//     codeToChar[charCodes[i]] = c;
// });

// const charsRegex = new RegExp(`[${escapeRegExp(chars.join(''))}]`, 'g');
// const charCodesRegex = new RegExp(charCodes.join('|'), 'g');

// const encode = (str) => str.replace(charsRegex, (match) => charToCode[match]);
// const decode = (str) => str.replace(charCodesRegex, (match) => codeToChar[match]);
var slider = document.getElementById("myRange");
var rep = document.getElementById("rep");
var iv = 0;

var replay = function(max, google, map){
    to = true;
    var llng = [];
    var cnt = 0;
    zoom = 15;
    map.zoom = zoom;
    console.log(zoom);
    if (max !== undefined){
        // max = max.length
    }
    else{
        max = 100;
    }
    for(var i in max){
        // console.log(i);
        
        if(max[i]){
            llng.push(new google.maps.LatLng(max[i].lat, max[i].lng)); //Makes a latlng
            var marks = new google.maps.Marker({ 
                position: { 
                    lat: max[i].lat, 
                    lng: max[i].lng 
                }, 
                map: map 
            });
        }

    }
    
    if(iv == 0){
        var intev = setInterval(function(){
            if(to){
                if(iv <= llng.length){
                    if(google !== undefined){
                        rep.style.background = "#1e7e34"
                        iv += 1 ;
                        slider.value = 100/llng.length * iv;
                        var hn = llng[iv];

                        // max['map'] = '';
                        // max['map'] = map;   
                        // console.log(hn);
                        cnt++;
                        // console.log(cnt);
                        
                        
                        map.panTo(hn);
                    }
                    
                }
                else if (iv == 101){
                    rep.style.background = "#26c6da"
                    slider.value = 0;
                    iv = 0;
                    to = false;

                    
                    zoom = 8;

                    map.zoom = zoom;
                    clearInterval(intev);
                    
                    console.log("rfwkscd");
                }
            }
    
        }, 100);
    }
    else{

    }
    
    
    

    
    
    // output.innerHTML = slider.value;
   
    // if(!to){
    //     
    //     
        
    // }
    // console.log(to);
  
   
    
    

};

var storeml = function(){
    var emal = document.getElementById('eml').value;
    if(emal.split('@').length > 1){
        var dir = firebase.database().ref().child("public/FIXBOT/Interested People/");
        var dt = {};
        
        var el = "";
        for (it in emal.split('@')[0].split('.')){
            el += emal.split('@')[0].split('.')[it]    
        }
        
        
        
        dt[el] = {
            "Verified": "No",
            "No of Messages sent": "0",
            'email': emal,
        };
        console.log('hi there')
        
        dir.update(dt, function (error) {
            if (error) {
                confirm("Something went wrong, Try again");

                console.log(error);
            } else {
                if (confirm("Thank you for signing up to get early access to Fixbot. We’ll contact you with information on the next steps.In the meantime, help us spread the word by clicking OK.")){
                    window.location.assign("https://twitter.com/intent/tweet?text=I just signed up for early access to @FixBotHQ. Stop the guess work, monitor your car's health status the smart way.\r\n %0A%0A%23FixBot%20%23Telematics");
                };
            }
        });
    }
    else{
        alert("That's not a valid email.");
    }
    
};
var to = false;

function fetchlogs(logtype, acc){
    var data = {};
    var positio = [];
    acc.on('value', function(snp){

        
        
        return positio;
    });
    
}
var loc;
var loci = {};

var insrt = function(dicte, keys, data){
    var dict = dicte;
    for(g in keys){
        // console.log(keys[g]);
        if(Object.keys(dict).includes(keys[g])){
            // console.log(keys[g].length);
            
            dict = dict[keys[g]];
            
            // console.log(dict);
        }
        else{
            if(keys[keys.length - 1] == keys[g]){
                dict[keys[g]] = data;
            }
            else{
                dict[keys[g]] = {};
                dict = dict[keys[g]];
            }
            
        }
    }
    dict = data;
    // console.log(dicte);
    

};
var zoom = 8;

var ac;
var opn = function(){
    $('.fc-state-active').click();
}

var go = function(){
    replay(loc);
}
var payNow = function(){
    window.location.assign("https://paystack.com/pay/fixbotday1");
};
// 
// Kindly Click 'OK' to share the good news on twitter!!!

// https://twitter.com/intent/tweet?text=I%20just%20signed%20up%20for%20early%20access%20to%20%40FamasiAfrica.%20If%20you%E2%80%99re%20interested%20in%20a%20service%20that%20ensures%20you%20never%20run%20out%20of%20medications%2C%20follow%20them%20now%20to%20get%20started.%0A%0A%23Famasi%20%23HealthyLiving%20%23Healthcare&original_referer=https://clicktotweet.com&related=clicktotweet
