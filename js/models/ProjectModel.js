
define(['underscore', 'backbone', 'lockr'],
 function(_, Backbone, Lockr){
   var ProjectModel = Backbone.Model.extend({
      initialize: function(url){
         if ( !Lockr.get('projects') ){
            this.getProjectData();
            this.searchProjects();
         }
      },
      getProjectData: function(){
         $.ajax({
            url: 'http://localhost:5465/api/projects',
            success: function(data) {
               Lockr.set("projects", data);
            }
         }).fail(function (err) {
            reject(Error("It broke"));
         })
      },
      searchProjects: function(url){
         $.ajax({
            url: url,
            success: function(res) {
               var arr = [];
               $.each(res.data, function(idx, val){

                  var result = $.grep(Lockr.get('projects').data, function(e){
                     return e.id === val.id;
                  });
                  var finalObj = $.extend(val, result[0]);
                  arr.push(finalObj);
               });
               this.finalArr = arr;
            }
         }).fail(function (err) {
            reject(Error("It broke"));
         })
      },
      getFinalArr: function(){
         return this.finalArr;
      }
   });
   return ProjectModel;
});
