var FindByNameView = function (service) {
    var employeeListView;

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this
            .$el
            .on('keyup', '#firstName,#lastName', this.findByName);
        employeeListView = new EmployeeListView();


        this.render();
    };

    this.render =  function () {
        this.$el.html(this.template());
        $('.results', this.$el).html(employeeListView.$el);
        return this;
    };

    this.findByName = function() {
        service.findByName($('#firstName').val().trim() + $('#lastName').val().trim()).done(function(employees) {
            employeeListView.setEmployees(employees);
        });
    };


    this.initialize();
};