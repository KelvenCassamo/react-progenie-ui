import React__default, { useEffect, useCallback, createElement } from 'react';
import $ from 'jquery';

var meta = /*#__PURE__*/document.querySelector('[name="bivalert"]');
if (meta && meta.content === 'true') {
  var dialog = {
    defaultParams: {
      title: '',
      message: '',
      button: 'Ok',
      cancel: 'Cancel',
      required: false,
      position: 'fixed',
      animation: 'scale',
      input: {
        type: 'text'
      },
      validate: function validate() {},
      callback: function callback() {}
    },
    transitionEnd: 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
    overlay: undefined,
    holder: undefined,
    alert: function alert(params) {
      this.appendDialogHolder();
      var b = $.extend(true, {}, this.defaultParams, params);
      var id = this.generateRandomId();
      var button = b.hasButton === false ? '' : "<div class=\"dialog-confirm\">" + b.button + "</div>";
      var html = "\n        <div class=\"dialog-alert\" id=\"" + id + "\">\n          <div class=\"dialog-border\"></div>\n          <div class=\"dialog-title\">" + b.title + "</div>\n          <div class=\"dialog-message\">" + b.message + "</div>\n          <div class=\"dialog-close\">&times;</div>\n          " + button + "\n          <div class=\"dialog-clearFloat\"></div>\n        </div>";
      this.holder.find('td').append(html);
      var el = $("#" + id);
      var confirm = el.find('.dialog-confirm');
      var close = el.find('.dialog-close');
      if (b.required) close.remove();
      el.attr('data-dialog-position', b.position);
      el.attr('data-dialog-animation', b.animation);
      this.injectDialog();
      confirm.one('click.dialog', function () {
        return b.callback == null ? void 0 : b.callback(true);
      });
      close.one('click.dialog', function () {
        return b.callback == null ? void 0 : b.callback(null);
      });
    },
    prompt: function prompt(params) {
      var _this = this;
      this.appendDialogHolder();
      var b = $.extend(true, {}, this.defaultParams, params);
      var id = this.generateRandomId();
      var attrs = '';
      for (var key in b.input) {
        attrs += " " + key + "=\"" + b.input[key] + "\"";
      }
      var html = "\n        <div class=\"dialog-alert\" id=\"" + id + "\">\n          <div class=\"dialog-border\"></div>\n          <div class=\"dialog-title\">" + b.title + "</div>\n          <div class=\"dialog-message\">" + b.message + "</div>\n          <label><input " + attrs + " /></label>\n          <div class=\"dialog-close\">&times;</div>\n          <div class=\"dialog-confirm\">" + b.button + "</div>\n          <div class=\"dialog-clearFloat\"></div>\n        </div>";
      this.holder.find('td').append(html);
      var el = $("#" + id);
      var confirm = el.find('.dialog-confirm');
      var close = el.find('.dialog-close');
      var input = el.find('input');
      if (b.required) close.remove();
      el.attr('data-dialog-position', b.position);
      el.attr('data-dialog-animation', b.animation);
      this.injectDialog();
      confirm.on('click.dialog', function () {
        var val = input.val();
        var valid = b.validate(val) !== false;
        if (b.required && val === '') {
          _this.shakeDialog(el);
          return false;
        }
        if (valid) {
          b.callback == null || b.callback(val);
          return true;
        } else {
          _this.shakeDialog(el);
          return false;
        }
      });
      close.one('click.dialog', function () {
        return b.callback == null ? void 0 : b.callback(null);
      });
    },
    login: function login(params) {
      var _this2 = this;
      this.appendDialogHolder();
      var b = $.extend(true, {}, this.defaultParams, params);
      var id = this.generateRandomId();
      var firstAttr = '';
      var secondAttr = '';
      for (var key in b.first) firstAttr += " " + key + "=\"" + b.first[key] + "\"";
      for (var _key in b.second) secondAttr += " " + _key + "=\"" + b.second[_key] + "\"";
      var html = "\n        <div class=\"dialog-alert\" id=\"" + id + "\">\n          <div class=\"dialog-border\"></div>\n          <div class=\"dialog-title\">" + b.title + "</div>\n          <div class=\"dialog-message\">" + b.message + "</div>\n          <label><input class=\"first\" " + firstAttr + " /></label>\n          <label><input class=\"second\" " + secondAttr + " /></label>\n          <div class=\"dialog-close\">&times;</div>\n          <div class=\"dialog-confirm\">" + b.button + "</div>\n          <div class=\"dialog-clearFloat\"></div>\n        </div>";
      this.holder.find('td').append(html);
      var el = $("#" + id);
      var confirm = el.find('.dialog-confirm');
      var close = el.find('.dialog-close');
      var firstInput = el.find('input.first');
      var secondInput = el.find('input.second');
      if (b.required) close.remove();
      el.attr('data-dialog-position', b.position);
      el.attr('data-dialog-animation', b.animation);
      this.injectDialog();
      confirm.on('click.dialog', function () {
        var val1 = firstInput.val();
        var val2 = secondInput.val();
        var valid1 = b.validate(val1) !== false;
        var valid2 = b.validate(val2) !== false;
        if (b.required && (val1 === '' || val2 === '')) {
          return _this2.shakeDialog(el);
        }
        if (valid1 && valid2) {
          b.callback == null || b.callback({
            value1: val1,
            value2: val2
          });
          return true; // Explicit return
        } else {
          return _this2.shakeDialog(el);
        }
      });
      close.one('click.dialog', function () {
        return b.callback == null ? void 0 : b.callback(null);
      });
    },
    confirm: function confirm(params) {
      this.appendDialogHolder();
      var b = $.extend(true, {}, this.defaultParams, params);
      var id = this.generateRandomId();
      var html = "\n        <div class=\"dialog-alert\" id=\"" + id + "\">\n          <div class=\"dialog-border\"></div>\n          <div class=\"dialog-title\">" + b.title + "</div>\n          <div class=\"dialog-message\">" + b.message + "</div>\n          <div class=\"dialog-close\">&times;</div>\n          <div class=\"dialog-confirm\">" + b.button + "</div>\n          <div class=\"dialog-cancel\">" + b.cancel + "</div>\n          <div class=\"dialog-clearFloat\"></div>\n        </div>";
      this.holder.find('td').append(html);
      var el = $("#" + id);
      var confirm = el.find('.dialog-confirm');
      var cancel = el.find('.dialog-cancel');
      var close = el.find('.dialog-close');
      if (b.required) close.remove();
      el.attr('data-dialog-position', b.position);
      el.attr('data-dialog-animation', b.animation);
      this.injectDialog();
      confirm.one('click.dialog', function () {
        return b.callback == null ? void 0 : b.callback(true);
      });
      cancel.one('click.dialog', function () {
        return b.callback == null ? void 0 : b.callback(false);
      });
      close.one('click.dialog', function () {
        return b.callback == null ? void 0 : b.callback(null);
      });
    },
    generateRandomId: function generateRandomId() {
      return "" + (Math.floor(1e6 * Math.random()) + 1) + Date.now();
    },
    showDialog: function showDialog() {
      var _this3 = this;
      $(':focus').blur();
      var current = $('.dialog-alert:first');
      if (current.attr('data-dialog-position') === 'absolute') {
        this.holder.removeClass('dialog-fixed').css('top', $(window).scrollTop());
      } else {
        this.holder.addClass('dialog-fixed').css('top', '');
      }
      $(window).trigger('resize.dialog');
      $('.dialog-alert').hide();
      current.show();
      setTimeout(function () {
        current.on(_this3.transitionEnd, function (e) {
          if ($(e.target).is(this)) {
            $(this).off(dialog.transitionEnd);
            dialog.focusElement(current.find('input.first')[0], current.find('input.second')[0], true);
          }
        }).addClass('dialog-visible');
      }, 1);
      $('html').addClass('dialogIsVisible');
    },
    injectDialog: function injectDialog() {
      if ($('.dialog-alert:visible').length === 0) {
        this.showDialog();
      } else {
        $('.dialog-alert:last').hide();
      }
      this.overlay.addClass('dialog-visible');
    },
    shakeDialog: function shakeDialog(el) {
      el.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
        el.removeClass('dialog-shaking');
      }).addClass('dialog-shaking');
      return false;
    },
    focusElement: function focusElement(el1, el2, setCursor) {
      var _this4 = this;
      if (setCursor === void 0) {
        setCursor = false;
      }
      var el = el1 || el2;
      if (el) {
        $(el).one('blur.dialog', function () {
          _this4.focusElement(el, undefined);
        }).focus();
        if (setCursor && el.selectionStart !== undefined) {
          var input = el;
          input.setSelectionRange(input.value.length, input.value.length);
          input.scrollLeft = input.scrollWidth;
        }
      }
    },
    appendDialogHolder: function appendDialogHolder() {
      if (!this.holder) {
        $('body').append('<div id="dialog-overlay"></div><div id="dialog-holder"><table id="dialog-center"><tr><td></td></tr></table></div>');
        this.overlay = $('#dialog-overlay');
        this.holder = $('#dialog-holder');
        this.bindDialogGlobalEvents();
        $('html').addClass('dialogHolderIsVisible');
      }
    },
    removeDialogHolder: function removeDialogHolder() {
      var _this$overlay, _this$holder;
      this.unbindDialogGlobalEvents();
      (_this$overlay = this.overlay) == null || _this$overlay.remove();
      (_this$holder = this.holder) == null || _this$holder.remove();
      this.overlay = undefined;
      this.holder = undefined;
      $('html').removeClass('dialogHolderIsVisible');
    },
    close: function close() {
      var current = $('.dialog-alert:not(.dialog-closing):first');
      current.addClass('dialog-closing').on(this.transitionEnd, function (e) {
        if ($(e.target).is(this)) {
          $(this).off(dialog.transitionEnd).remove();
          $('html').removeClass('dialogIsVisible');
          if ($('.dialog-alert').length === 0) {
            dialog.overlay.addClass('dialog-closing').on(dialog.transitionEnd, function (e) {
              if ($(e.target).is(this)) {
                $(this).off(dialog.transitionEnd);
                dialog.removeDialogHolder();
              }
            }).removeClass('dialog-visible');
          } else {
            dialog.showDialog();
          }
        }
      }).removeClass('dialog-visible');
    },
    bindDialogGlobalEvents: function bindDialogGlobalEvents() {
      var _this5 = this;
      this.holder.add(this.overlay).on('click.dialog', function (e) {
        if (!$(e.target).closest('.dialog-alert').is('.dialog-alert')) {
          $('.dialog-close:visible').trigger('click');
        }
      });
      $(document).on('click.dialog', '.dialog-confirm, .dialog-cancel, .dialog-close', function () {
        _this5.close();
        return false;
      });
      $(document).on('keyup.dialog', function (e) {
        if (e.key === 'Escape' && $('.dialog-alert:visible').length > 0) {
          $('.dialog-close:visible').trigger('click');
        }
      });
      $(document).on('keydown.dialog', function (e) {
        if (e.key === 'Enter' && $('.dialog-alert:visible').length > 0) {
          $('.dialog-confirm').trigger('click');
          return false;
        }
        return undefined;
      });
      $(window).on('resize.dialog', function () {
        _this5.overlay.height('100%').height($(document).height());
      });
    },
    unbindDialogGlobalEvents: function unbindDialogGlobalEvents() {
      var _this$overlay2, _this$holder2;
      (_this$overlay2 = this.overlay) == null || _this$overlay2.off('.dialog');
      (_this$holder2 = this.holder) == null || _this$holder2.off('.dialog');
      $(document).off('.dialog');
      $(window).off('.dialog');
    }
  };
  // Expor para uso externo
  window.dialog = dialog;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* \n\t\nThe MIT License (MIT)\n\nCopyright (c) 2017 Etienne Martin\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n\n*/\n\n\n#dialog-holder,\n#dialog-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    transform: translateZ(0)\n}\n\n#dialog-holder,\n#dialog-holder #dialog-center td .dialog-alert label input {\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale\n}\n\n#dialog-overlay {\n    bottom: 0;\n    z-index: 966;\n    color: #fff;\n    text-align: center;\n    font-size: 18px;\n    text-shadow: none;\n    background: rgba(51, 51, 51, .6);\n    opacity: 0;\n    transition: opacity .5s\n}\n\n#dialog-overlay.dialog-closing {\n    transition: opacity .25s\n}\n\n#dialog-overlay.dialog-visible {\n    opacity: 1\n}\n\n#dialog-holder {\n    height: 100%;\n    z-index: 977;\n    cursor: default\n}\n\n#dialog-holder.dialog-fixed {\n    position: fixed;\n    overflow: auto\n}\n\n#dialog-holder #dialog-center {\n    width: 100%;\n    height: 100%;\n    z-index: 999;\n    border-spacing: 0;\n    padding: 0;\n    margin: 0\n}\n\n#dialog-holder #dialog-center td {\n    text-align: center;\n    vertical-align: middle;\n    padding: 5%;\n    margin: 0;\n    width: 90%;\n    perspective: 1000px\n}\n\n#dialog-holder #dialog-center td .dialog-alert {\n    position: relative;\n    margin: 0 auto;\n    padding: 10px 30px;\n    background: #fff;\n    z-index: 999;\n    max-width: 400px;\n    word-break: break-word;\n    display: none;\n    border-radius: 4px;\n    box-shadow: rgba(0, 0, 0, .1) 0 2px 3px, rgba(0, 0, 0, .2) 0 5px 15px;\n    opacity: 0;\n    transition: transform .5s, opacity .45s;\n    font-size: 14px;\n    color: #666\n}\n\n@keyframes shake {\n\n    20%,\n    60% {\n        transform: translateX(-12px) rotateY(-8deg)\n    }\n\n    40%,\n    80% {\n        transform: translateX(12px) rotateY(8deg)\n    }\n}\n\n#dialog-holder #dialog-center td .dialog-alert[data-dialog-animation=scale] {\n    -ms-transform: scale(.8);\n    transform: scale(.8)\n}\n\n#dialog-holder #dialog-center td .dialog-alert[data-dialog-animation=slide] {\n    -ms-transform: translateY(-50%);\n    transform: translateY(-50%)\n}\n\n#dialog-holder #dialog-center td .dialog-alert.dialog-closing {\n    transition: transform .25s, opacity .2s\n}\n\n#dialog-holder #dialog-center td .dialog-alert.dialog-visible {\n    -ms-transform: scale(1);\n    transform: scale(1);\n    opacity: 1\n}\n\n#dialog-holder #dialog-center td .dialog-alert.dialog-shaking {\n    animation: shake .5s linear\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-border {\n    position: absolute;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    border: 1px solid #000;\n    z-index: -1;\n    border-radius: 5px;\n    opacity: .2\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-title {\n    padding: 20px 5px 0;\n    line-height: 25px;\n    font-size: 24px;\n    display: block;\n    color: #555;\n    font-weight: 400\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-title:empty {\n    padding-top: 0\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-message {\n    padding: 20px 5px 0;\n    line-height: 1.444;\n    display: block;\n    max-width: 370px;\n    margin: 0 auto\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-message a {\n    color: #007eff\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-message:empty {\n    padding-top: 0\n}\n\n#dialog-holder #dialog-center td .dialog-alert label {\n    display: block;\n    margin: 20px auto 0;\n    max-width: 300px\n}\n\n#dialog-holder #dialog-center td .dialog-alert label input {\n    box-sizing: border-box;\n    padding: 15px 20px;\n    border: 2px solid #007eff;\n    border-radius: 100px;\n    outline: 0;\n    width: 100%;\n    font-size: 14px;\n    color: #555\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-cancel,\n#dialog-holder #dialog-center td .dialog-alert .dialog-confirm {\n    display: block;\n    margin: 20px auto 10px;\n    padding: 15px 30px;\n    background: #eee;\n    cursor: pointer;\n    border-radius: 100px;\n    font-weight: 700;\n    max-width: 240px;\n    transition: background .25s;\n    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .1);\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-cancel:hover,\n#dialog-holder #dialog-center td .dialog-alert .dialog-confirm:hover {\n    background: #e1e1e1\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-cancel:active,\n#dialog-holder #dialog-center td .dialog-alert .dialog-confirm:active {\n    box-shadow: inset 0 1px 0 rgba(0, 0, 0, .1)\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-cancel.dialog-confirm,\n#dialog-holder #dialog-center td .dialog-alert .dialog-confirm.dialog-confirm {\n    background: #007eff;\n    color: #fff;\n    margin-bottom: 20px\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-cancel.dialog-confirm:hover,\n#dialog-holder #dialog-center td .dialog-alert .dialog-confirm.dialog-confirm:hover {\n    background: #0071e6\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-cancel.dialog-cancel+.dialog-confirm,\n#dialog-holder #dialog-center td .dialog-alert .dialog-confirm.dialog-cancel+.dialog-confirm {\n    margin-top: 10px\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-close {\n    position: absolute;\n    top: 15px;\n    right: 15px;\n    margin-bottom: -10px;\n    cursor: pointer;\n    line-height: 10px;\n    padding: 5px;\n    font-size: 24px;\n    opacity: .5;\n    transition: opacity .25s;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-transform: translateZ(0)\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-close:hover {\n    opacity: 1\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-close:before {\n    content: \"\";\n    position: absolute;\n    top: -15px;\n    left: -15px;\n    right: -15px;\n    bottom: -15px\n}\n\n#dialog-holder #dialog-center td .dialog-alert .dialog-clearFloat {\n    clear: both;\n    width: 100%;\n    height: 1px;\n    display: block\n}";
styleInject(css_248z);

var DialogProvider = function DialogProvider(_ref) {
  var children = _ref.children;
  useEffect(function () {
    var meta = document.querySelector('[name="bivalert"]');
    if (meta && meta.getAttribute('content') === 'true') {
      initializeDialog();
    }
    return function () {
      // Cleanup if needed
    };
  }, []);
  var initializeDialog = function initializeDialog() {
    if (typeof window !== 'undefined' && !window.dialog) {
      var script = document.createElement('script');
      script.innerHTML = "\n        // Your minified dialog code here\n        (function($){...})(jQuery);\n      ";
      document.body.appendChild(script);
    }
  };
  return React__default.createElement(React__default.Fragment, null, children);
};

var ProgenieProvider = function ProgenieProvider(_ref) {
  var children = _ref.children;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(DialogProvider, null), children);
};

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

var useDialog = function useDialog() {
  var alertDialog = useCallback(function (options) {
    console.log(window.dialog);
    if (typeof window !== 'undefined' && window.dialog) {
      var _options$title, _options$title2, _options$message, _options$message2, _options$button, _options$hasButton, _options$required;
      var obj = {};
      obj.title = options.selectable === false ? "<div style=\"user-select:none;\">" + ((_options$title = options.title) != null ? _options$title : "") + "</div>" : (_options$title2 = options.title) != null ? _options$title2 : "";
      obj.message = options.selectable === false ? "<div style=\"user-select:none;\">" + ((_options$message = options.message) != null ? _options$message : "") + "</div>" : (_options$message2 = options.message) != null ? _options$message2 : "";
      obj.button = (_options$button = options.button) != null ? _options$button : "OK";
      obj.hasButton = (_options$hasButton = options.hasButton) != null ? _options$hasButton : options.button !== undefined;
      obj.required = (_options$required = options.required) != null ? _options$required : false;
      obj.callback = function (e) {
        if (e == null) {
          options.onForceDismiss == null || options.onForceDismiss();
        } else if (e === true) {
          options.onOk == null || options.onOk();
        }
        options.callback == null || options.callback(e);
      };
      window.dialog.alert(obj);
    } else {
      console.warn('Dialog not initialized');
    }
  }, []);
  var confirmDialog = useCallback(function (options) {
    if (typeof window !== 'undefined' && window.dialog) {
      var _options$title3, _options$title4, _options$message3, _options$message4, _options$button2, _options$cancel, _options$hasButton2, _options$required2;
      var obj = {};
      obj.title = options.selectable === false ? "<div style=\"user-select:none;\">" + ((_options$title3 = options.title) != null ? _options$title3 : "") + "</div>" : (_options$title4 = options.title) != null ? _options$title4 : "";
      obj.message = options.selectable === false ? "<div style=\"user-select:none;\">" + ((_options$message3 = options.message) != null ? _options$message3 : "") + "</div>" : (_options$message4 = options.message) != null ? _options$message4 : "";
      obj.button = (_options$button2 = options.button) != null ? _options$button2 : "OK";
      obj.cancel = (_options$cancel = options.cancel) != null ? _options$cancel : "CANCEL";
      obj.hasButton = (_options$hasButton2 = options.hasButton) != null ? _options$hasButton2 : options.button !== undefined;
      obj.required = (_options$required2 = options.required) != null ? _options$required2 : false;
      obj.callback = function (e) {
        if (e == null) {
          options.onForceDismiss == null || options.onForceDismiss();
        } else if (e === true) {
          options.onOk == null || options.onOk();
        } else {
          options.onCancel == null || options.onCancel();
        }
        options.callback == null || options.callback(e);
      };
      window.dialog.confirm(obj);
    } else {
      console.warn('Dialog not initialized');
    }
  }, []);
  var promptDialog = useCallback(function (options) {
    if (typeof window !== 'undefined' && window.dialog) {
      var _options$title5, _options$title6, _options$message5, _options$message6, _options$button3, _options$required3;
      var obj = _extends({}, options, {
        title: options.selectable === false ? "<div style=\"user-select:none;\">" + ((_options$title5 = options.title) != null ? _options$title5 : "") + "</div>" : (_options$title6 = options.title) != null ? _options$title6 : "",
        message: options.selectable === false ? "<div style=\"user-select:none;\">" + ((_options$message5 = options.message) != null ? _options$message5 : "") + "</div>" : (_options$message6 = options.message) != null ? _options$message6 : "",
        button: (_options$button3 = options.button) != null ? _options$button3 : "OK",
        required: (_options$required3 = options.required) != null ? _options$required3 : false,
        input: _extends({
          type: "text",
          placeholder: ""
        }, options.input)
      });
      obj.callback = function (value) {
        if (value === null) {
          options.onForceDismiss == null || options.onForceDismiss();
        } else {
          options.onOk == null || options.onOk();
        }
        options.callback == null || options.callback(value);
      };
      window.dialog.prompt(obj);
    } else {
      console.warn('Dialog not initialized');
    }
  }, []);
  var loginDialog = useCallback(function (options) {
    if (typeof window !== 'undefined' && window.dialog) {
      var _options$title7, _options$title8, _options$message7, _options$message8, _options$button4, _options$required4;
      var obj = _extends({}, options, {
        title: options.selectable === false ? "<div style=\"user-select:none;\">" + ((_options$title7 = options.title) != null ? _options$title7 : "") + "</div>" : (_options$title8 = options.title) != null ? _options$title8 : "",
        message: options.selectable === false ? "<div style=\"user-select:none;\">" + ((_options$message7 = options.message) != null ? _options$message7 : "") + "</div>" : (_options$message8 = options.message) != null ? _options$message8 : "",
        button: (_options$button4 = options.button) != null ? _options$button4 : "OK",
        required: (_options$required4 = options.required) != null ? _options$required4 : false,
        first: _extends({
          type: "text",
          placeholder: ""
        }, options.first),
        second: _extends({
          type: "password",
          placeholder: ""
        }, options.second)
      });
      obj.callback = function (value) {
        if (value === null) {
          options.onForceDismiss == null || options.onForceDismiss();
        } else {
          options.onOk == null || options.onOk();
        }
        options.callback == null || options.callback(value);
      };
      window.dialog.login(obj);
    } else {
      console.warn('Dialog not initialized');
    }
  }, []);
  return {
    alert: alertDialog,
    confirm: confirmDialog,
    prompt: promptDialog,
    login: loginDialog
  };
};

// Delete me
var Thing = function Thing() {
  return createElement("div", null, "the snozzberries taste like snozzberries");
};

export { DialogProvider, ProgenieProvider, Thing, useDialog };
//# sourceMappingURL=react-progenie-ui.esm.js.map
