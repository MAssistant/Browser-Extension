$(function(){
    checkCurUser();
});

function loadMainCont(){
    document.getElementById("login-div").style.display = 'none';
    document.getElementById("register-div").style.display = 'none';
    document.getElementById("KList_title").style.display = 'block';
    document.getElementById("try").style.display = 'block';
    document.getElementById("KGraph").style.display = 'block';
    document.getElementById("KGraph-title").style.display = 'block';
}
function checkCurUser(){
    var data = {'message': 'please check who is cur user'}
    $.ajax({
        async: false,
        type: 'POST',
        url: 'https://kg.bnu.edu.cn:443/checkCurUser',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if(data.status == 1){
                loadMainCont();
                $.ajax({
                  async: false,
                  type: 'POST',
                  url: 'https://kg.bnu.edu.cn:443/proUserVideo',
                  data: JSON.stringify({'message': 'insert user video'}),
                  contentType: "application/json",
                  success: function(res){
                    console.log('store user video successfully~')
                  }
                })
            }
        }
    })
}

//for login
var login = document.getElementById("login")
if (login != null){
	login.addEventListener('click', function(){
	var data={
			'type': "extensionLogin",
			'username': $("#userOrEmail").val(),
			'password': $("#LogPassword").val()
	}
        $.ajax({
            type: 'POST',
            url: 'https://kg.bnu.edu.cn:443/extensionLogin',
            data: JSON.stringify(data),
			contentType: 'application/json',
            success: function (data) {
                alert('Login Successful!');
                $('#userOrEmail').val('');
                $('#LogPassword').val('');
                loadMainCont();
            }
        })
	})
}

//for register
var submit = document.getElementById('submit')
if (submit != null){
	submit.addEventListener('click', function(){
	var data = {
			'type': 'extensionRegister',
			'username': $('#username').val(),
			'password': $('#password').val(),
			'repassword': $('#repassword').val(),
			'email': $('#email').val()
	}

	$.ajax({
		type: 'POST',
		url: 'https://kg.bnu.edu.cn:443/extensionRegister',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(data){
			alter('Register Successful');
			$('#username').val('');
			$('#password').val('');
			$('#repassword').val('');
			$('#email').val('');
			var SignIn = document.getElementById("login-div");
			var SignUp = document.getElementById("register-div");
			SignIn.style.display = 'block';
			SignUp.style.display = 'none';
		}
	})
})
}

//switch between login and register
var SwitchToLogin = document.getElementById('SwitchToLogin');
if (SwitchToLogin != null){
	SwitchToLogin.addEventListener('click', function(){
			//alert('changing...')
		    var SignIn = document.getElementById("login-div");
			var SignUp = document.getElementById("register-div");
			SignIn.style.display = 'block';
			SignUp.style.display = 'none';
	});
}

var SwitchToRegister = document.getElementById('SwitchToRegister');
if (SwitchToRegister != null){
	SwitchToRegister.addEventListener('click', function() {
        var SignIn = document.getElementById("login-div");
		var SignUp = document.getElementById("register-div");
		SignIn.style.display = 'none';
		SignUp.style.display = 'block';
	});
}
