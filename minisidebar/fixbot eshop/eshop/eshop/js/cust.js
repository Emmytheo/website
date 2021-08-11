$(document).ready(function () {
    w3.slideshow('.single-sliderr', 3000)
    var tog = false;
    $('.all-category').click(function () {
        tog = !tog;
        // console.log(tog)
        if(tog){
            console.log(tog);
            $('.main-category').addClass('shwcat');
            // $('.shwcat').removeClass('main-category')
            // alert("The paragraph was clicked.");
            
        }
        if(!tog){
            // $('.shwcat').addClass('main-category');
            $('.main-category').removeClass('shwcat')
            
        }
       
    });
});
