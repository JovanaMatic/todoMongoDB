$(document).ready(function(){
  
    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {item: item.val()};
  
        //ajax request to the server
        $.ajax({
          type: 'POST',
          url: '/todos',
          data: todo,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(e){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/todos/'+item,
          success: function(data){
            //do something with the data via front-end framework
            //doing reload so that the updated data cold be added to the todos.ejs view
            location.reload();
          }
        });
    });
  
  });

 