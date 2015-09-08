// Wait until the DOM has loaded before querying the document
$(document).ready(function()
{
   $('body').ajaxStart(function() {
       $(this).css({'cursor':'wait'})
   }).ajaxStop(function() {
       $(this).css({'cursor':'auto'})
   });

   $('ul.tabs').each(function()
   {
      // For each set of tabs, we want to keep track of
      // which tab is active and it's associated content
      var $active, $content, $links = $(this).find('a');

      // If the location.hash matches one of the links, use that as the active tab.
      // If no match is found, use the first link as the initial active tab.
      $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
      $active.addClass('active');
      $content = $($active.attr('href'));

      // Hide the remaining content
      $links.not($active).each(function ()
      {
         $($(this).attr('href')).hide();
      }
      );

      // Bind the click event handler
      $(this).on('click', 'a', function(e)
      {
         // Make the old tab inactive.
         $active.removeClass('active');
         $content.hide();

         // Update the variables with the new link and content
         $active = $(this);
         $content = $($(this).attr('href'));
         //alert( $(this).attr('href') );
         try
         {
            document.form1.hiddenfield3.value = $(this).attr('href') + "";
            //alert("hiddenfield3 = " + document.form1.hiddenfield3.value);
         }
         catch (e1)
         {
            //Nothing         
         }
         
         // Make the tab active.
         $active.addClass('active');
         $content.show();

      }
      );
   }
   );
   toggleDiv("primary");
}
);

function toggleDiv(divId) {
   $("#"+divId).toggle();
}
