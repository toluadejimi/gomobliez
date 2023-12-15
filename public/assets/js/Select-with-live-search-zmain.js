function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
};

$(function() {
    $('select').selectpicker();
    
    $(".add_files_btn").unbind("click").bind("click", function () {
        $("#upload_trigger_btn").click();
    });
    
    $('.delete').click(function(event){
        $(event.currentTarget).parent().remove();
    })
    $('.add_img_box').click(function(){
    });
  });

