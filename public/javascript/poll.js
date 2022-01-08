$(document).ready(function() {
	var max_fields      = 10; //maximum input boxes allowed
	var wrapper   		= $(".add_questions_form"); //Fields wrapper
	var add_button      = $(".add_field_button"); //Add button ID
	
    console.log("my log something");
    console.log(wrapper);

	var x = 1; //initlal text box count
	$(add_button).click(function(e){ //on add input button click
		e.preventDefault();
		if(x < max_fields){ //max input box allowed
			x++; //text box increment
			$(wrapper).append('<input name="poll_name" id="email" type="" class="form-control" id="poll_name" aria-describedby="emailHelp" placeholder="Enter Poll Name">'); //add input box
		}
	});
	

});