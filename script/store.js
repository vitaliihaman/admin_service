var dataBase = {
    users: [],
    toDos: [],


    init: function () {
        try{
            this.users = JSON.parse(localStorage.getItem("users")) || [];
            this.toDos = JSON.parse(localStorage.getItem("toDos")) || [];
        }catch (error){
            this.users = [];
            this.toDos = [];
        }
    },

    getItem: function (tableName, id) {
        return this[tableName].filter(function (item) {
                return item.id === id;
            })[0] || null;
    },

    getItemByProp: function (tableName, propName, value) {
        return this[tableName].filter(function (item) {
                return item[propName] === value;
            })[0] || null;
    },


    addItem: function (tableName, item) {
        if (tableName === "users") {
            var user = new User(item);
            this.users.push(user);
        } else {
            if (tableName === "toDos") {
                this.toDos.push(item);
            }
        }

        localStorage.setItem("users", JSON.stringify(this.users));
        localStorage.setItem("toDos", JSON.stringify(this.toDos));
    },


    deleteItem: function (tableName, id) {
        for (var i = 0; i < this[tableName].length; i++) {
            if (this[tableName].id === id) {
                this[tableName].split(i, 1);
            }
        }
    }
};


function User(obj) {
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.password = obj.password;
    this.id = getUniqId();
}

function ToDos(obj) {

}


function getUniqId() {
    return (Math.random() * Math.pow(10, 17)).toString(16);
}



dataBase.init();
console.log(dataBase);

export default dataBase;















