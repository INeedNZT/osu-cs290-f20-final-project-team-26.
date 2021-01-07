(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dish'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                    <i class=\"fas fa-pepper-hot red\"></i>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"dish\">\n    <div class=\"dish-header\">\n        <a href=\"#\">\n            <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":4,"column":22},"end":{"line":4,"column":29}}}) : helper)))
    + "\" >\n        </a>\n    </div>\n    <div class=\"dish-body\" data-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":7,"column":36},"end":{"line":7,"column":43}}}) : helper)))
    + "\">\n        <div class=\"dish-content\">\n            <label class=\"dish-label\">Name:</label>\n            <span class=\"dish-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":10,"column":36},"end":{"line":10,"column":44}}}) : helper)))
    + "</span>\n        </div>\n        <div class=\"dish-content\">\n            <label class=\"dish-label\">Price:</label>\n            <span class=\"dish-price\">$"
    + alias4(((helper = (helper = lookupProperty(helpers,"price") || (depth0 != null ? lookupProperty(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":14,"column":38},"end":{"line":14,"column":47}}}) : helper)))
    + "</span>\n        </div>\n        <div class=\"dish-content\">\n            <label class=\"dish-label\">Spicy:</label>\n            <span class=\"dish-spicy\">\n"
    + ((stack1 = (lookupProperty(helpers,"times")||(depth0 && lookupProperty(depth0,"times"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"spicy") : depth0),{"name":"times","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":16},"end":{"line":21,"column":26}}})) != null ? stack1 : "")
    + "            </span>\n        </div>\n        <div class=\"dish-content\">\n            <label class=\"dish-label\">Category:</label>\n            <span class=\"dish-category\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"category") || (depth0 != null ? lookupProperty(depth0,"category") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data,"loc":{"start":{"line":27,"column":16},"end":{"line":27,"column":28}}}) : helper)))
    + "\n            </span>\n        </div>\n        <button class=\"dish-del\"><i class=\"far fa-trash-alt\"></i></button>\n    </div>\n</div>";
},"useData":true});
})();