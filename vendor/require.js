(function() {
  if (!this.require) {
    var modules = {}, cache = {};

    var require = function(name, root) {
      var path = expand(root, name), indexPath = expand(path, './index'), module, fn;
      module   = cache[path] || cache[indexPath];
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = indexPath]) {
        module = {id: path, exports: {}};
        cache[path] = module.exports;
        fn(module.exports, function(name) {
          return require(name, dirname(path));
        }, module);
        return cache[path] = module.exports;
      } else {
        throw 'module ' + name + ' not found';
      }
    };

    var expand = function(root, name) {
      var results = [], parts, part;
      // If path is relative
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    };

    var dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };

    this.require = function(name) {
      return require(name, '');
    };

    this.require.define = function(bundle) {
      for (var key in bundle) {
        modules[key] = bundle[key];
      }
    };

    this.require.modules = modules;
    this.require.cache   = cache;
  }

  return this.require;
}).call(this);

this.require.define({"helpers/commonjs":function(exports, require, module){(function() {
  var hasModule, requireByRegex;

  requireByRegex = function(regex, targetWindow) {
    var modules;
    modules = (targetWindow || window).require.modules;
    return $.each(modules, function(k) {
      if (regex.test(k)) {
        return require(k);
      }
    });
  };

  hasModule = function(path, targetWindow) {
    return (targetWindow || window).require.modules[path] !== void 0;
  };

  module.exports = {
    requireByRegex: requireByRegex,
    hasModule: hasModule
  };

}).call(this);
;}});
this.require.define({"helpers/component":function(exports, require, module){(function() {
  var initialize, initializeByDom,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  initializeByDom = function(dom) {
    var $el, Component, path;
    $el = $(dom);
    path = $el.data("comp-path") + "/view";
    if (!require("helpers/commonjs").hasModule(path)) {
      return;
    }
    Component = (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        this.$el = $el;
        _Class.__super__.constructor.call(this, function(selector) {
          return $el.find(selector);
        });
      }

      return _Class;

    })(require(path));
    return $el.data("compInstance", new Component());
  };

  initialize = function($root) {
    var $comps;
    $comps = $root ? $root.find(".js-comp") : $(".js-comp");
    return $comps.each(function() {
      return initializeByDom($(this));
    });
  };

  module.exports = {
    initialize: initialize,
    initializeByDom: initializeByDom
  };

}).call(this);
;}});