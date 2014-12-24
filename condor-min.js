// CONDOR 1.5
// Made by Chen Ye, MIT License
(function(e){e.fn.condor=function(t){function o(){i=r.children(".condor-active").length;return i}function u(e,t,i){r.append("<div class='field "+t+" '><div class='ui left icon input "+i+"'><input type='"+n.inputType+"' placeholder='"+n.inactiveHint+"'><i class='plus icon'></i></div></div>")}function a(t){u("","condor-active","");return r.children(".condor-active").filter(function(){return e(this).find("input").val().length===0}).first()}function f(e){var t=r.children(".condor-add");u("add another link","condor-add","inverted");n.addCallback.call();return t}function l(){r.children(".condor-add").remove()}function c(){r.on("click focusin",".condor-add",function(){p(e(this))})}function h(){r.on("propertychange keyup input paste",".condor-active",function(t){var r=e(this),s=r.find("input");if(s.val()===""){r.addClass("new");l()}else if(r.hasClass("new")){r.removeClass("new");o();if(i<n.maxInputs){f(i)}}});r.on("blur",".condor-active input",function(t){if(this.value===""&&i>1){e(this).parent().parent().remove();i-=1}})}function p(e){var t,r,s=e.find("input"),u=e.find("i.icon");i+=1;e.find(".input.inverted").removeClass("inverted");u.removeClass("plus");u.addClass(n.activeIcon);s.attr("placeholder",n.activeHint);if(n.uniqueNames){t=o();r=n.namePrefix+"-"+t;s.attr("name",r)}else{s.attr("name",n.namePrefix)}e.addClass("condor-active new");e.removeClass("condor-add");n.activateCallback.call()}function d(){n.prepopulate.forEach(function(e,t,n){var r=a(o()),i=r.find("input");i.val(e);p(r)})}function v(){h();c();d();f(i);p(r.children(".condor-add"))}var n,r=e(this),i=0,s={getValues:function(){var e=[],t=0;r.find(".condor-active input").each(function(){if(this.value.length!==0){e[t]=this.value;t+=1}});return e}};if(s[t]){return s[t].apply(this,[])}else{n=e.extend({maxInputs:10,uniqueNames:true,namePrefix:"inputs",inactiveHint:"add input",activeHint:"",activeIcon:"linkify",addCallback:function(){},activateCallback:function(){},inputType:"text",prepopulate:[]},t)}v();return this}})(jQuery)