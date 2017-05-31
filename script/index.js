/**
 * Created by Vetal_Haman on 25.03.2017.
 */

import db from "./store.js";


function Form() {

    this.init();
}


Form.prototype.init = function () {

    // this.updateHtml();
    this.addHandlers();
};


/*Form.prototype.updateHtml = function () {
 if (localStorage.getItem("login")) {
 $(".enter_form_wrapper").addClass("hide");
 table.showTable();
 }
 };*/


Form.prototype.addHandlers = function () {
    var toDo = new ToDo();

    $("#enterForm").on("submit", function (e) {
        e.preventDefault();

        var validator = new Validator();

        var email = $(this).find("input[name=email]").val(),
            password = $(this).find("input[name=password]").val(),
            user = db.getItemByProp("users", "email", email);

        if (user && user.password === password) {
            console.log("Hi " + user.firstName);
            $(".enter_form_wrapper").addClass("hide");
            toDo.show(email);
        } else {
            console.log("Неверное имя пользователя или пароль");
        }
    });



    $("#addButton").on("click", function () {
        toDo.add($("#writePlace").val());
    });

    $("#writePlace").keypress(function (e) {
        if(e.keyCode === 13 && e.currentTarget.value){
            toDo.add($("#writePlace").val());
        }
    });

    $("#registration").on("click", function () {
        $(".enter_form_wrapper").addClass("hide");
        $(".registration_form_wrapper").removeClass("hide");

    });

    $("#registrationForm").on("submit", function (e) {
        e.preventDefault();
        var currentForm = e.target,
            obj = {};

        var currEmail = $(this).find("input[id=email]").val(),
            userByEmail = db.getItemByProp("users", "email", currEmail);

        if (userByEmail) {
            console.log("Пользователь с таким Email уже зарегистрирован");
            return;
        }

        for (var i = 0; i < currentForm.length; i++) {
            if (currentForm[i].id === 'ConfirmPassword' ||
                currentForm[i].id === 'saveData') continue;


            var key = currentForm[i].id,
                value = currentForm[i].value;

            var validator = new Validator();
            var check = false;

            rules[key].forEach(function (rule) {

                var type = rule.type || rule;
                if (typeof rule === "object") {
                    var args = [].concat(value, rule.args);
                    check = validator[type].apply(null, args);
                } else {
                    check = validator[type](value);
                }
                if (!check) {
                    console.log("Ошибка " + type + " в поле " + key);
                }

            });

            if (check) {
                obj[key] = value;
            }

        }

        if (obj) {
            db.addItem("users", obj);
        }
    }); // регистрация пользователя
};

//console.log(!!Object.keys({a: 1, b: 2, c: 3}).length); Проверка на ключи

function ToDo() {
    this.owner = '';
    this.data = {}
}

ToDo.prototype.show = function (email) {
    console.log(this);
    this.owner = email;
    $("#toDo_wrapper").removeClass("hide");
};

ToDo.prototype.add = function (value) {
    var self = this;
    if (value) {
        var ul = $("#my-todo"),
            li = $("<li/>");
        li.text(value);

        $(li).on("click", function (e) {
            if (e.target.classList.contains('funcBtn')) {
                var operation = e.target.getAttribute('data-target');
                if (operation === 'completed') {
                    self.completed(e.currentTarget);
                } else {
                    this.remove();
                }
            }
        });
        ul.append(li);
        this.addButtonCompleted(li);
        this.addButtonRemoved(li);
        self.data[ul] = ul;
        console.log(self);

        db.addItem("toDos", self);
        $("#writePlace").val("");

       // console.log(self.data);
    }
};


ToDo.prototype.completed = function (el) {
$(el).toggleClass("completed");
};

ToDo.prototype.refactor = function () {

};

ToDo.prototype.addButtonCompleted = function (li) {
    var complBtn = $("<input/>").attr("type", 'image').attr("data-target", "completed").attr("src", "assets/image/tick.png").addClass("completedBtn funcBtn");
    li.append(complBtn);
};

ToDo.prototype.addButtonRemoved = function (li) {
    var removeBtn = $("<input/>").attr("type", 'image').attr("src", "assets/image/delete.png").attr("data-target", "remove").addClass("removeBtn funcBtn");
    li.append(removeBtn);
};


var rules = {
    firstName: ['required', {type: 'length', args: [2, 15]}],
    lastName: ['required', {type: 'length', args: [2, 15]}],
    password: ['required', {type: 'length', args: [6, 15]}],
    confirmPassword: ['required', {type: 'length', args: [6, 15]}],
    email: ['required']
};



function Validator() {

}

Validator.prototype.required = function (value) {
    return !!value;
};

Validator.prototype.length = function (value, from, to) {
    return from <= value.length && value.length <= to;
};

Validator.prototype.isEqual = function (val,) {

};


var createForm = new Form();




































































