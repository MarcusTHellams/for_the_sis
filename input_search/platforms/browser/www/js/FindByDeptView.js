var FindByDeptView = function (service) {
    var employeeListView;

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this
            .$el
            .on('keyup', '#dept', this.findByDept);

        this
            .$el
            .on('keyup', '#title', this.findByTitle);
        employeeListView = new EmployeeListView();

        this.render();
    };

    this.render = function () {
        this
            .$el
            .html(this.template());
        $('.results', this.$el).html(employeeListView.$el);
        return this;
    };

    this.findByDept = function () {
        service
            .findByDept($('#dept').val())
            .done(function (employees) {
                employeeListView.setEmployees(employees);
            });
    };

    this.findByTitle = function () {
        service
            .findByTitle($('#title').val())
            .done(function (employees) {
                employeeListView.setEmployees(employees);
            });
    };

    this.initialize();
};