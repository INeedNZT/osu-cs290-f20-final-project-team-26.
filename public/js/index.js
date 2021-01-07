var $post = function (url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = function () {
        console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        console.log(data);
        callback && callback(data);
    }
}

Handlebars.registerHelper('times', function (num, block) {
    var accum = '';
    for (var i = 0; i < num; ++i)
        accum += block.fn(i);
    return accum;
});

var $get = function (url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
}

var getDishFromDom = function () {
    var dish = {
        name: document.getElementById("add-name").value,
        url: document.getElementById("add-url").value,
        price: parseFloat(document.getElementById("add-price").value),
        spicy: parseFloat(document.getElementById("dialog-spicy").value),
        category: document.getElementById("add-category").value
    }
    return dish;
}

var addDishEvent = function (callback) {
    var dish = getDishFromDom();

    $post("/add", dish, callback);
}

var checkParams = function () {
    if (document.getElementById("add-name").value &&
        document.getElementById("add-url").value &&
        document.getElementById("add-price").value &&
        document.getElementById("dialog-spicy").value &&
        document.getElementById("add-category").value
    ) {
        return true;
    } else {
        alert("Please fill all the input");
        return false;
    }
}

var bindEventDialog = function (dialog) {
    var addDialog = dialog.querySelector("#dialog-add");
    if (addDialog) {
        addDialog.addEventListener("click", function () {
            if (!checkParams())
                return;
            addDishEvent(function () {
                var dish = getDishFromDom();
                $post("/add/category", {
                    category: dish.category
                }, function () {
                    bindCategoryData();
                });
                closeModal(dialog);
                document.getElementById("filter-search").click();
            });
        })
    }
    var updateDialog = dialog.querySelector("#dialog-update");
    if (updateDialog) {
        updateDialog.addEventListener("click", function () {
            closeModal(dialog);
        })
    }
    dialog.querySelector("#dialog-cancel").addEventListener("click", function () {
        closeModal(dialog);
    })
    dialog.querySelector("#dialog-close").addEventListener("click", function () {
        closeModal(dialog);
    })
    return dialog;
}

var createDialog = function (dialogStr) {
    // remove old dialog first
    var _dialog = document.querySelector('dialog');
    if (_dialog) {
        _dialog.remove();
        var _bd = document.querySelector('.backdrop');
        if (_bd)
            _bd.remove();
    }

    // then register new dialog
    document.body.insertAdjacentHTML('beforeend', dialogStr);
    var dialog = document.querySelector('dialog');
    dialogPolyfill.registerDialog(dialog);
    return bindEventDialog(dialog);
}

var addModal = function () {
    var modalStr = Handlebars.templates.modal({
        isAdd: true
    });
    createDialog(modalStr).showModal();
}

// var updateModal = function (id) {
//     var modalStr = Handlebars.templates.modal({
//         isAdd: false
//     });
//     createDialog(modalStr).showModal();
// }

var closeModal = function (dialog) {
    document.querySelector(".backdrop").style.display = 'none';
    dialog.close();
}


var bindDelEvent = function () {
    document.querySelectorAll(".dish-del").forEach(function (ele) {
        ele.addEventListener("click", function (ele) {
            var flag = confirm('Are you sure to delete this dish from menu?');
            console.log(flag)
            if (flag) {
                var id = ele.target.parentElement.parentElement.dataset.id;
                $post('/del/' + id, {}, function (data) {
                    if (data.code) {
                        alert('Delete successful!');
                        document.getElementById("filter-search").click();
                    }
                });
            }
        })
    })
}

var bindCategoryData = function () {
    var c = document.getElementById("filter-category");
    while (c.hasChildNodes()) {
        c.removeChild(c.firstChild);
    }
    var deopt = document.createElement("option");
    deopt.setAttribute("value", "");
    deopt.innerText = "Any";
    c.append(deopt);
    var res = $get("/category");
    var arr = JSON.parse(res);
    if (arr && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            var opt = document.createElement("option");
            opt.setAttribute("value", arr[i].category);
            opt.innerText = arr[i].category;
            c.append(opt);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // register for add dish event
    document.getElementById("add-new-dish").addEventListener("click", function () {
        addModal();
    })

    // document.querySelectorAll(".dish-edit").addEventListener("click", function () {
    //     var id;
    //     updateModal(id);
    // })

    document.getElementById("filter-search").addEventListener("click", function () {
        var arr = [];
        if (document.getElementById("filter-medium").checked) {
            arr.push(1);
        }
        if (document.getElementById("filter-mild").checked) {
            arr.push(2);
        }
        if (document.getElementById("filter-spicy").checked) {
            arr.push(3);
        }
        if (document.getElementById("filter-vspicy").checked) {
            arr.push(4);
        }


        $post("/dishes", {
            name: document.getElementById("filter-name").value,
            min: document.getElementById("filter-min-price").value,
            max: document.getElementById("filter-max-price").value,
            category: document.getElementById("filter-category").value,
            spicy: arr
        }, function (data) {
            var d = document.getElementById("dishes-container");
            while (d.hasChildNodes()) {
                d.removeChild(d.firstChild);
            }

            if (data.dishes) {
                for (var i = 0; i < data.dishes.length; i++) {
                    var dishStr = Handlebars.templates.dish(
                        data.dishes[i]
                    );
                    console.log(dishStr);
                    document.querySelector("#dishes-container").insertAdjacentHTML('beforeend', dishStr);
                }
                bindDelEvent();
            }

        });

    })
    bindDelEvent();
    bindCategoryData();
})