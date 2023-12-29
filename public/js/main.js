$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 500,
        onStepChanging: function (event, currentIndex, newIndex) { 
            if ( newIndex >= 1 ) {
                $('.actions ul').addClass('actions-next');
            } else {
                $('.actions ul').removeClass('actions-next');
            }
            return true; 
        },
        labels: {
            finish: "Finish",
            next: "Continue",
            previous: "Back"
        }, 
        onFinished: function (event, currentIndex){
            $("#blog-form").submit()
        }
    });

    // CustomSteps
    $('.wizard > .steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
    // Custom Button Jquery Step
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    });
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    });
    $('.finish').click(function(){
        $("#wizard").steps('finish');
    });
    // Input Focus
    $('.form-holder').delegate("input", "focus", function(){
        $('.form-holder').removeClass("active");
        $(this).parent().addClass("active");
    });
});

$(".green").forEach((x, num) => {
    x.addEventListener('click', function(e){
        if($(".red")[num].classList.contains('red')){
            $(".red")[num].classList.remove('red');
            $(".opinion_like")[num].submit()
            e.preventDefault();
        }
        this.classList.toggle('green')
    })
})

$(".red").forEach((x, num) => {
    x.addEventListener('click', function(e){
        if($(".green")[num].classList.contains('green')){
            $(".green")[num].classList.remove('green');
            $(".opinion_dislike")[num].submit()
            e.preventDefault();
        }
        this.classList.toggle('red')
    })
})

function preview() {
    frame.src=URL.createObjectURL(event.target.files[0]);
    var element = document.getElementById("frame")
    element.classList.add("frame")
}

function endview() {
    var textAreaHeight = document.querySelector(".blogStuff")
    textAreaHeight.style.height = "100px"
    picDay.src=URL.createObjectURL(event.target.files[0]);
    var element = document.getElementById("picDay")
    element.classList.add("picDay")


}


