// We use an "Immediate Function" to initialize the application to avoid leaving
// anything behind in the global scope
(function () {
    FastClick.attach(document.body);

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    FindByNameView.prototype.template = Handlebars.compile($("#name-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());
    FindByDeptView.prototype.template = Handlebars.compile($("#dept-tpl").html());

    var slider = new PageSlider($('body'));

    var service = new EmployeeService();
    service
        .initialize()
        .done(function () {
            router
                .addRoute('', function () {
                    slider.slidePage(new HomeView(service).render().$el);
                });

            router.addRoute('name', function () {
                slider.slidePage(new FindByNameView(service).render().$el);
            });

            router.addRoute('dept', function () {
                slider.slidePage(new FindByDeptView(service).render().$el);
            });

            router.addRoute('employees/:id', function (id) {
                service
                    .findById(parseInt(id))
                    .done(function (employee) {
                        slider.slidePage(new EmployeeView(employee).render().$el);
                    });
            });

            router.start();

        });

}());