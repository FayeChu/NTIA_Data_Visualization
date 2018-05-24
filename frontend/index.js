// var urls = new Array ("https://www.youtube.com/embed/XOswcO-5FVQ?rel=0",
// 	"https://www.youtube.com/embed/7qkpyzumg-c");
// var currentTab = '';

// $(document).ready(function() {

//     var $tabContents = $('#nav-tabContent div');
//     var $tabs = $('#nav-tab a');
//     $tabContents.hide();
//     // var index = Math.floor($tabs.length * Math.random());
//     var index = 0;
//     $tabContents.eq(index).show();
//     $tabs.eq(index).addClass('visit');
//     $('#nav-tab a').click(function() { //When any link is clicked
        
//         if (currentTab == '') {
//             //Find current tab:
//             currentTab = $('#nav-tab a.visit').attr('href');
//             conole.log(currentTab);
//         }
        
//         //Stop playing video:
//         if (currentTab != '')
//             $('div#' + currentTab).find('iframe').attr('src', '');
        
//         $('#nav-tab ul li').removeClass('active'); // Remove active class from all links
//         $(this).parent().addClass('active'); //Set clicked link class to active
//         currentTab = $(this).attr('href'); // Set variable currentTab to value of href attribute of clicked link
//         $('#nav-tab div').hide(); // Hide all divs
//         var index = $(this).attr('id');
//         $('div#' + currentTab).find('iframe').attr('src', urls[index]);
//         $(currentTab).show(); // Show div with id equal to variable currentTab
//         return false;
//     });
// });