(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modal'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            Create new dish\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            Update chosen dish\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"success-btn\" id=\"dialog-add\">\n        Add Dish\n    </button>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"info-btn\" id=\"dialog-update\">\n        Update Dish\n    </button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dialog>\n    <button type=\"button\" id=\"dialog-close\">\n        &times;\n    </button>\n\n    <div class=\"dialog-body\">\n        <h2 id=\"dialog-title\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAdd") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":12,"column":19}}})) != null ? stack1 : "")
    + "        </h2>\n\n        <div class=\"dialog-content\">\n            <label for=\"add-name\" class=\"dialog-input-label\">Name: </label>\n            <div class=\"dialog-input\">\n                <input type=\"text\" name=\"add-name\" id=\"add-name\">\n            </div>\n        </div>\n\n        <div class=\"dialog-content\">\n            <label for=\"add-url\" class=\"dialog-input-label\">PhotoURL: </label>\n            <div class=\"dialog-input\">\n                <input type=\"text\" name=\"add-url\" id=\"add-url\">\n            </div>\n        </div>\n\n        <div class=\"dialog-content\">\n            <label for=\"add-price\" class=\"dialog-input-label\">Price: </label>\n            <div class=\"dialog-input\">\n                <input type=\"number\" name=\"add-price\" id=\"add-price\">\n            </div>\n        </div>\n\n        <div class=\"dialog-content\">\n            <label for=\"add-spicy\" class=\"dialog-input-label\">Spicy: </label>\n            <div class=\"dialog-input\">\n                <select id=\"dialog-spicy\" class=\"dialog-spicy\" name=\"dialog-spicy\">\n                    <option value=\"1\" selected>Medium</option>\n                    <option value=\"2\">Mild</option>\n                    <option value=\"3\">Spicy</option>\n                    <option value=\"4\">Very Spicy</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"dialog-content\">\n            <label for=\"add-category\" class=\"dialog-input-label\">Category: </label>\n            <div class=\"dialog-input\">\n                <input type=\"text\" name=\"add-category\" id=\"add-category\">\n            </div>\n        </div>\n\n    </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAdd") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":56,"column":4},"end":{"line":64,"column":11}}})) != null ? stack1 : "")
    + "    <button class=\"cancel-btn\" id=\"dialog-cancel\">\n        Cancel\n    </button>\n</dialog>\n<div class=\"backdrop\"></div>";
},"useData":true});
})();