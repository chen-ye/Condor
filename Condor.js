(function($) {

          $.fn.condor = function( options ) {
            
              var target = this;
              
              var settings = $.extend({
                maxInputs: 10,
                namePrefix: 'inputs',
                inactiveHint: 'add input',
                activeHint: '',
                activeIcon: 'linkify'
              }, options);
            
            function addField( hint, parentclass, childclass ) {
              target.append("<div class='field " + parentclass + " '><div class='ui left icon input " + childclass + "'><input type='text' placeholder='" + settings.inactiveHint + "'><i class='plus icon'></i></div></div>");
            }
            
            function addInactiveField( id ) {
              addField('add another link', 'condor-add', 'inverted');
              
              $(".condor-add").click(function(){
                makeActive(this);
                if(nFields < settings.maxInputs) {
                  addInactiveField( nFields );
                }
              });
            }
            
            function makeActive( field ) {
              $(".condor-add > div").removeClass('inverted');
              $(".condor-add i").removeClass('plus');
              $(".condor-add i").addClass(settings.activeIcon);
              $(".condor-add input").attr('placeholder', settings.activeHint);
              $(".condor-add input").attr('name', settings.namePrefix + '-' + nFields);
              $(field).removeClass('condor-add');
              $(field).unbind("click");
              nFields++;
            }
            
              var nFields = 0;
              addInactiveField( nFields );
              makeActive($(".condor-add"));
              addInactiveField( nFields );  
          }

      }(jQuery));