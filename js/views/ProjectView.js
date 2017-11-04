
define(['underscore','backbone','handlebars','models/ProjectModel', 'text!templates/projects.html'],
   function(_, Backbone,handlebars, ProjectModel, projectTemplate){

   var ProjectView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#container',
      // It's the first function called when this view it's instantiated.
      template: handlebars.compile(projectTemplate),
      initialize: function(projectInfo){
         //ASK ABOUT THIS BIT
         // var url = $.param(projectInfo);
         var url = "http://localhost:5465/api/user/matches?skills=client-dev/javascript,data-sci/python&interests=housing&goals=developer,presenter";
         this.model = new ProjectModel(url);
         this.model.searchProjects(url);
         this.render();
         // this.listenTo(this.model, 'sync', this.render);
         // this.model.fetch();
      },
      // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello World in this case.
      render: function(){
         this.$el.html(this.template(this.model.getFinalArr()));
      }

   });

   return ProjectView;

});


//Get both of the data back