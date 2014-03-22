(function() { this.JST || (this.JST = {}); this.JST["heats/track"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('DA GAMEBOARD\n<tr class="racer" data-racer-id="',  racer.racer_id ,'">\n\t<td class="racer_name">',  racer.user_name ,'</td>\n\t<td clas="racer_car">',  racer.progress || 0 ,'</td>\n</tr>\n');}return __p.join('');};
}).call(this);
