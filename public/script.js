$(function(){
	$('#preloader').hide('fast');
	$('.vote').click(function(){
		let self = $(this);
		self.prop('disabled', true);
		//add loader
		$('#preloader').show('fast');

		let candidate = self.data('candidate');
		
		sendRequest('post',{'candidate-name': candidate}).then(function(data){
			if(data.data.hash && data.data.message){
				toggleAlert(data.data.message);
				$('#txhash').html('Track your vote here <a href="https://ropsten.etherscan.io/tx/'+data.data.hash+'" target="_blank">'+data.data.hash+'</a><br/>Vote count will update in moment (35 seconds).');

				window.setTimeout(function(){window.location.replace(window.location.href)}, 35000);
			}else if(data.data.message){
				toggleAlert(data.data.message, 'red');
			}
		}).catch(function(err){
			console.log('err>>>',err);
			toggleAlert('Something went wrong. Please try again.', 'red');
		})
		.then(function(){
			self.prop('disabled', false);
			//add loader
			$('#preloader').hide('fast');
		});
	});
})

function sendRequest(method, data = {}, params = {}, url = ''){
	return axios({url,method,data,params})
	.then(function(res){
		return Promise.resolve(res);
	})
	.catch(function(err){
		return Promise.reject(err);
	});
}

function toggleAlert(text, alertType = 'indigo'){
	M.toast({html: text, classes: alertType, displayLength: 10000});
}