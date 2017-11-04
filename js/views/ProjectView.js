
define(['underscore','backbone','handlebars','models/ProjectModel', 'text!templates/projects.html'],
   function(_, Backbone,handlebars, ProjectModel, projectTemplate){

   var ProjectView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#container',
      events: {
         "click .changeList":"searchProjects"
      },
      // It's the first function called when this view it's instantiated.
      template: handlebars.compile(projectTemplate),
      initialize: function(){
         //Model gets initialized with all the projects
         this.model = new ProjectModel("/api/projects");
         this.listenTo(this.model, 'sync', this.render);
         this.model.fetch();
         this.render();
      },
      render: function(){
         this.$el.html(this.template(this.model.toJSON()));
      },

      //This will take in a url and find new matches
      searchProjects: function(url){
         this.model.searchProjects("/api/user/matches?skills=client-dev/javascript,data-sci/python&interests=housing&goals=developer,presenter");
         this.listenTo(this.model, 'sync', this.render);
         var _this = this;
         this.model.fetch({ success: function(res){
            //Combines cached data with new list order
            _this.model.combineData(res.attributes);
         }});
         //Renders the view with the new order of data
         this.render();
      }

   });

   return ProjectView;

});


//Get both of the data back