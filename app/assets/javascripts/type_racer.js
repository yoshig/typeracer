window.TypeRacer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		TypeRacer.Heats = new TypeRacer.Collections.Heats();
		TypeRacer.Heats.fetch({
			success: function() {
				new TypeRacer.Routers.AppRouter({
					$rootEl: $("#content"),
					heats: TypeRacer.Heats
				})
				Backbone.history.start();
			}
		})
  }
};

$(document).ready(function(){
  TypeRacer.initialize();
});
