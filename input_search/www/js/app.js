// We use an "Immediate Function" to initialize the application to avoid leaving
// anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());

    var service = new EmployeeService();
    service
        .initialize()
        .done(function () {
            renderHomeView();
            console.log("Service initialized");
        });

    /* ---------------------------------- Local Functions ---------------------------------- */

    function renderHomeView() {
        var html = '<p><button id="help-btn">Help</button></p><h1>Directory</h1><input id="search-fi' +
                'rst-name" type="search" placeholder="Enter First Name"/><input id="search-last-n' +
                'ame" type="search" placeholder="Enter Last Name"/><ul class="employee-list"></ul' +
                '>';

        /*
         * YOU CAN'T REPLACE ALL OF THE THE HTML IN THE BODY TAG IF YOUR SCRIPT TAGS ARE THERE AND EVEN IF THE SCRIPT TAGS ARE IN THE HEAD IT IS STILL A BAD IDEA. YOU JUST GOT RID OF ALL YOUR SCRIPTS SO NOTHING AFTER THIS POINT WILL RUN.
         * ADD A DIV AND THEN ADD THE HTML TO THAT INSTEAD
         */

        // WRONG-------------------------------------WRONG  $('body').html(homeTpl());
        // RIGHT-------------------------------------RIGHT
        $('body').prepend('<div id="app"></div>');
        $('#app').html(homeTpl());
        /*
         * THE FINDBYNAMNE FUNCTION NEVER FIRES BECAUSE YOU ARE ATTACHING IT TO ID'S WHEN YOU ARE USING CLASSES, EX: input class="search-first-name" instead of input id="search-first-name"
         */

        // WRONG-------------------------------------WRONG $('#search-first-name,
        // #search-last-name').on('keyup', findByName);
        // RIGHT-------------------------------------RIGHT
        $('.search-first-name, .search-last-name').on('keyup', findByName);
        $('#help-btn').on('click', function () {
            alert("Employee Directory v3.4");
        });
    }

    function findByName() {
        /*
         * SAME AS ABOVE WITH THE CLASSS AND ID'S PROBLEM, EX: input class="search-first-name" instead of input id="search-first-name"
         */
        // WRONG-------------------------------------WRONG 
        // var checkFirstname = $('#search-first-name').val().trim(); 
        // var checkLastname = $('#search-last-name').val().trim();
        
        // RIGHT-----------------------------------------RIGHT
        var checkFirstname = $('.search-first-name')
            .val()
            .trim();
        var checkLastname = $('.search-last-name')
            .val()
            .trim();

        /*
         * IF THE GOAL IS NOT TO CHECK FOR NAMES UNTIL THERE ARE TWO CHARACTERS IN EITHER LAST NAME OR FIRST NAME THEN YOU SHOULD DO THE CHECK FIRST THEN RUN THE CODE IF THE REQUIREMENTS ARE MET. YOU ARE RUNNING THE FUNCTION THEN CHECKING. THAT IS A WASTE OF RESOURCES.
         */

        if (checkFirstname.length >= 2 || checkLastname.length >= 2) {
            service
                .findByName(checkFirstname + checkLastname)
                .done(function (employees) {
                    var l = employees.length;
                    var e;

                    /*
                 *  WITH TEMPLATES THE FOLLOWING IS NO LONGER NECESSARY
                */
                    // $('.employee-list').empty();
                    // for (var i = 0; i < l; i++) {
                    //     e = employees[i];
                    //     $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
                    // }

                    /*
                 *  USE THIS INSTEAD
                */
                    $('.content').html(employeeListTpl(employees));
                });

        } else {
            console.log("else part");
            /*
             * DON'T EMPTY EMPLOYEE-LIST, EMPTY CONTENT INSTEAD. THAT IS WHERE YOU ARE RENDERING THE LIST
            */

            // WRONG-------------------------------------WRONG 
            // $('.employee-list').empty();

            // RIGHT-----------------------------------------RIGHT
            $('.content').empty();
        }

    }

}());