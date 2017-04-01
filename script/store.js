var dataBase = {
    users: [],
    goods: [],
    getItem: function (tableName, id) {
        return this[tableName].filter(function (item) {
                return item.id === id;
            })[0] || null;
    },


    addItem: function (tableName, item) {
        if (tableName === "users") {
            var user = new User(item);
            this.users.push(user);
        } else {
            if (tableName === "goods") {
                var good = new Goods();
                this.goods.push(good);
            }
        }
    },


    deleteItem: function (tableName, id) {
        for (var i = 0; i < this[tableName].length; i++) {
            if (this[tableName].id === id) {
                this[tableName].split(i, 1);
            }
        }
    },

    person: {
        firstName: "bobby",
        lastName: "edison",
        login: "r_edison",
        email: "r_edison@mail.ru",
        password: "edik555",
        id: "e01b74111f5770"
    }
};


function User(obj) {
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.login = obj.login;
    this.email = obj.email;
    this.password = obj.password;
    this.id = getUniqId();
}

function Goods() {
    this.price = 0;
    this.name = "";
    this.id = getUniqId();
}


function getUniqId() {
    return (Math.random() * Math.pow(10, 17)).toString(16);
}

export default dataBase;















