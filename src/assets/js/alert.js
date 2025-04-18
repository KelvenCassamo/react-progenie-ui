/* 
	
The MIT License (MIT)

Copyright (c) 2017 Etienne Martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const meta = document.querySelector('[name="bivalert"]');

if(meta && meta.content == "true")
    {
    
"use strict";
!function(a) {
   
    window.dialog = {
        defaultParams: {
            title: "",
            message: "",
            button: "Ok",
            cancel: "Cancel",
            required: !1,
            position: "fixed",
            animation: "scale",
            input: {
                type: "text"
            },
            validate: function(a) {},
            callback: function(a) {}
        },
        transitionEnd: "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
        alert: function(b) {
            dialog.appendDialogHolder();
            var b = a.extend(!0, {}, dialog.defaultParams, b)
              , c = dialog.generateRandomId()
              , d = '<div class="dialog-alert" id="' + c + '">';
              var button;
              button = b.hasButton == false ? "": '<div class="dialog-confirm">' + b.button + "</div>";
            d += '<div class="dialog-border"></div>',
            d += '<div class="dialog-title">' + b.title + "</div>",
            d += '<div class="dialog-message">' + b.message + "</div>",
            d += '<div class="dialog-close">&times;</div>',
            d += button,
            d += '<div class="dialog-clearFloat"></div>',
            d += "</div>",
            dialog.holder.find("td").append(d);
            var e = a("#" + c)
              , f = e.find(".dialog-confirm")
              , g = e.find(".dialog-close");
            b.required === !0 && g.remove(),
            e.attr("data-dialog-position", b.position),
            e.attr("data-dialog-animation", b.animation),
            dialog.injectDialog(),
            f.one("click.dialog", function() {
                b.callback(!0)
            }),
            g.one("click.dialog", function() {
                b.callback(null)
            })
        },
        prompt: function(b) {
            dialog.appendDialogHolder();
            var b = a.extend(!0, {}, dialog.defaultParams, b)
              , c = dialog.generateRandomId()
              , d = "";
            for (var e in b.input)
                d += " " + e + '="' + b.input[e] + '" ';
            var f = '<div class="dialog-alert" id="' + c + '">';
            f += '<div class="dialog-border"></div>',
            f += '<div class="dialog-title">' + b.title + "</div>",
            f += '<div class="dialog-message">' + b.message + "</div>",
            f += "<label><input " + d + " /></label>",
            f += '<div class="dialog-close">&times;</div>',
            f += '<div class="dialog-confirm">' + b.button + "</div>",
            f += '<div class="dialog-clearFloat"></div>',
            f += "</div>",
            dialog.holder.find("td").append(f);
            var g = a("#" + c)
              , h = g.find(".dialog-confirm")
              , i = g.find(".dialog-close")
              , j = g.find("input");
            b.required === !0 && i.remove(),
            g.attr("data-dialog-position", b.position),
            g.attr("data-dialog-animation", b.animation),
            dialog.injectDialog(),
            h.bind("click.dialog", function() {
                var a = j.val()
                  , c = b.validate(a) !== !1;
                return b.required === !0 && "" === a && (c = !1),
                c ? void b.callback(a) : (g.one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(a) {
                    g.removeClass("dialog-shaking")
                }).addClass("dialog-shaking"),
                !1)
            }),
            i.one("click.dialog", function() {
                b.callback(null)
            })
        },
        /** LOGIN */

        login: function(b) {
            dialog.appendDialogHolder();
            var b = a.extend(!0, {}, dialog.defaultParams, b)
              , c = dialog.generateRandomId()
              , d = ""
              , d1 = "";
            for (var e in b.first)
            d += " " + e + '="' + b.first[e] + '" ';
            for (var e1 in b.second)
            d1 += " " + e1 + '="' + b.second[e1] + '" ';
                
            var f = '<div class="dialog-alert" id="' + c + '">';
            f += '<div class="dialog-border"></div>',
            f += '<div class="dialog-title">' + b.title + "</div>",
            f += '<div class="dialog-message">' + b.message + "</div>",
            f += "<label><input class='first' " + d + " /></label>",
            f += "<label><input class='second' " + d1 + " /></label>",
            f += '<div class="dialog-close">&times;</div>',
            f += '<div class="dialog-confirm">' + b.button + "</div>",
            f += '<div class="dialog-clearFloat"></div>',
            f += "</div>",
            dialog.holder.find("td").append(f);
            var g = a("#" + c)
              , h = g.find(".dialog-confirm")
              , i = g.find(".dialog-close")
              , j = g.find("input.first")
              , p = g.find("input.second");
            b.required === !0 && i.remove(),
            g.attr("data-dialog-position", b.position),
            g.attr("data-dialog-animation", b.animation),
            dialog.injectDialog(),
            h.bind("click.dialog", function() {
                
                var a = j.val()
                var aa = p.val()
               // alert(j.val())
                  , c = b.validate(a) !== !1,
                   cc = b.validate(aa) !== !1;
                   var ca =  b.required === !0 && "" === a && (c = !1);
                   var caa =  b.required === !0 && "" === aa && (cc = !1);
                  // alert(caa)
                return ca && caa ,
                c && cc ? void b.callback({value1: a, value2:aa}) : (g.one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(a) {
                    g.removeClass("dialog-shaking")
                }).addClass("dialog-shaking"),
                !1)
            }),
            i.one("click.dialog", function() {
                b.callback(null)
            })
        }

        /*FIM LOGIN */
        ,
        confirm: function(b) {
            dialog.appendDialogHolder();
            var b = a.extend(!0, {}, dialog.defaultParams, b)
              , c = dialog.generateRandomId()
              , d = '<div class="dialog-alert" id="' + c + '">';
            d += '<div class="dialog-border"></div>',
            d += '<div class="dialog-title">' + b.title + "</div>",
            d += '<div class="dialog-message">' + b.message + "</div>",
            d += '<div class="dialog-close">&times;</div>',
            d += '<div class="dialog-confirm">' + b.button + "</div>",
            d += '<div class="dialog-cancel">' + b.cancel + "</div>",
            d += '<div class="dialog-clearFloat"></div>',
            d += "</div>",
            dialog.holder.find("td").append(d);
            var e = a("#" + c)
              , f = e.find(".dialog-confirm")
              , g = e.find(".dialog-cancel")
              , h = e.find(".dialog-close");
            b.required === !0 && h.remove(),
            e.attr("data-dialog-position", b.position),
            e.attr("data-dialog-animation", b.animation),
            dialog.injectDialog(),
            f.one("click.dialog", function() {
                b.callback(!0)
            }),
            g.one("click.dialog", function() {
                b.callback(!1)
            }),
            h.one("click.dialog", function() {
                b.callback(null)
            })
        },
        generateRandomId: function() {
            return Math.floor(1e6 * Math.random()) + 1 + (new Date).getTime()
        },
        showDialog: function() {
            a(":focus").blur();
            var b = a(".dialog-alert:first");
            "absolute" === b.attr("data-dialog-position") ? (dialog.holder.removeClass("dialog-fixed"),
            dialog.holder.css("top", a(window).scrollTop())) : (dialog.holder.addClass("dialog-fixed"),
            dialog.holder.css("top", "")),
            a(window).trigger("resize.dialog"),
            a(".dialog-alert").hide(),
            b.show(),
            setTimeout(function() {
                b.bind(dialog.transitionEnd, function(c) {
                    a(c.target).is(this) && (b.unbind(dialog.transitionEnd),
                    dialog.focusElement(b.find("input.first")[0],b.find("input.second")[0], !0))
                }).addClass("dialog-visible")
            }, 1),
            a("html").addClass("dialogIsVisible")
        },
        injectDialog: function() {
            0 === a(".dialog-alert:visible").length ? dialog.showDialog() : a(".dialog-alert:last").hide(),
            dialog.overlay.addClass("dialog-visible")
        },
        focusElement: function(b,bb, c) {
           
            b && (a(b).one("blur.dialog", function() {
                dialog.focusElement(b, !1)
            }),
            b.focus(),
            c && (void 0 !== b.selectionStart && b.setSelectionRange(b.value.length, b.value.length),
            b.scrollLeft = b.scrollWidth))
        },
        appendDialogHolder: function() {
            dialog.holder || (a("body").append('<div id="dialog-overlay"></div><div id="dialog-holder"><table id="dialog-center"><tr><td></td></tr></table></div>'),
            dialog.overlay = a("#dialog-overlay"),
            dialog.holder = a("#dialog-holder"),
            dialog.bindDialogGlobalEvents(),
            a("html").addClass("dialogHolderIsVisible"))
        },
        removeDialogHolder: function() {
            dialog.unbindDialogGlobalEvents(),
            dialog.overlay.remove(),
            dialog.holder.remove(),
            dialog.overlay = void 0,
            dialog.holder = void 0,
            a("html").removeClass("dialogHolderIsVisible")
        },
        close: function() {
            var b = a(".dialog-alert:not(.dialog-closing):first");
            b.addClass("dialog-closing").bind(dialog.transitionEnd, function(c) {
                a(c.target).is(this) && (b.unbind(dialog.transitionEnd),
                b.remove(),
                a("html").removeClass("dialogIsVisible"),
                0 === a(".dialog-alert").length ? dialog.overlay.addClass("dialog-closing").bind(dialog.transitionEnd, function(b) {
                    a(b.target).is(this) && (dialog.overlay.unbind(dialog.transitionEnd),
                    dialog.removeDialogHolder())
                }).removeClass("dialog-visible") : dialog.showDialog())
            }).removeClass("dialog-visible")
        },
        bindDialogGlobalEvents: function() {
            dialog.holder.add(dialog.overlay).bind("click.dialog", function(b) {
                a(b.target).closest(".dialog-alert").is(".dialog-alert") || a(".dialog-close:visible").trigger("click")
            }),
            a(document).on("click.dialog", ".dialog-confirm, .dialog-cancel, .dialog-close", function(a) {
                return dialog.close(),
                !1
            }),
            a(document).bind("keyup.dialog", function(b) {
                27 == b.keyCode && a(".dialog-alert").is(":visible") && a(".dialog-close:visible").trigger("click")
            }),
            a(document).bind("keydown.dialog", function(b) {
                var c = a(".dialog-alert:visible");
                if (0 !== c.length)
                    return 13 == b.keyCode ? (c.find(".dialog-confirm").trigger("click"),
                    !1) : void 0
            }),
            a(window).bind("resize.dialog", function() {
                dialog.overlay.height("100%"),
                dialog.overlay.height(a(document).height())
            })
        },
        unbindDialogGlobalEvents: function() {
            dialog.overlay.off(".dialog"),
            dialog.holder.off(".dialog"),
            a(document).off(".dialog"),
            a(window).off(".dialog")
        }
    }
}(jQuery);

}




/*
$("#alert").click(function(){
            dialog.alert({
                title: "Alert example",
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur lacus at gravida luctus. Duis vitae magna tellus. In risus lorem, mollis vel nisi vitae, suscipit aliquet tortor.",
                button: "Ok",
                animation: "fade",
                callback: function(value){
                    console.log(value);
                }
            });
		return false;
	});
	
	$("#prompt").click(function(){
		dialog.prompt({
			title: "Prompt example",
			message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur lacus at gravida luctus. Duis vitae magna tellus. In risus lorem, mollis vel nisi vitae, suscipit aliquet tortor.",
			button: "Send",
			required: true,
			position: "absolute",
			animation: "slide",
			input: {
				type: "password",
				placeholder: "This is a placeholder..."
			},
			validate: function(value){
				if( $.trim(value) === "" ){
					return false;
				}
			},
			callback: function(value){
				console.log(value);
			}
		});
		return false;
	});
	
	$("#confirm").click(function(){
		dialog.confirm({
			title: "Confirm example",
			message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur lacus at gravida luctus. Duis vitae magna tellus. In risus lorem, mollis vel nisi vitae, suscipit aliquet tortor.",
			cancel: "Cancel",
			button: "Accept",
			required: true,
			callback: function(value){
				console.log(value);
			}
		});
		return false;
	});
    
    */
