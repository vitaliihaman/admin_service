/**
 * Created by Vetal_Haman on 25.03.2017.
 */

import db from "./store.js";
//db.addItem("tablename(users или goods)");
//db.addItem("users", {firstName:"Brokovich"});


function Form() {

    this.init();
}

Form.prototype = Object.create(Table.prototype);

Form.prototype.init = function () {
    this.updateHtml();
    this.addHandlers();
};


Form.prototype.updateHtml = function () {
    if(localStorage.getItem("login")){
        $(".enter_form_wrapper").addClass("hide");
        table.showTable();
    }
};

Form.prototype.addHandlers = function () {
    $("#enterForm").on("submit", function (e) {
        e.preventDefault();

        var validator = new ValidatorForm();
        var login = $("#login").val(),
            password = $("#password").val();
        if (validator.check(login, password)) {
            $(".enter_form_wrapper").addClass("hide");
            table.showTable();
        }
        var sUser = JSON.stringify(db.person.password);
        localStorage.setItem("login", sUser);
    });

    $("#registration").on("click", function () {
        $(".enter_form_wrapper").addClass("hide");
        $(".registration_form_wrapper").removeClass("hide");

    });

    $("#registrationForm").on("submit", function (e) {
        e.preventDefault();
        var currentForm = e.target,
            obj = {};

        for (var i = 0; i < currentForm.length; i++) {
            var key = currentForm[i].id,
                value = currentForm[i].value;
                obj[key] = value;
        }


        /*db.addItem("users", obj);

        var serialUsers = JSON.stringify(db.users);
        localStorage.setItem("users", serialUsers);
        console.log(db.users[0]);*/



    });

};

//console.log(JSON.parse(localStorage.getItem("users")));


function Table() {
    this.owner = {};
    this.data = {}
}

Table.prototype.showTable = function () {
    var tbl = $("#firstTable");
    tbl.removeClass("hide");


};

Table.prototype.add = function () {

};

Table.prototype.remove = function () {

};

Table.prototype.refactor = function () {

};


function Validator() {

}

function ValidatorForm() {
    Validator.apply(this, arguments);
}

ValidatorForm.prototype = Object.create(Validator.prototype);

Validator.prototype.message = function () {
    console.log("из прототипа Validator");
};

Validator.prototype.check = function (login, password) {
    if(db.person.login === login && db.person.password === password){
        return true;
    }
};


var createForm = new Form(),
    table = new Table();







































