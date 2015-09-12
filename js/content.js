
var formData = '';
function GitHubTrends() {
	console.log("Starting...");

}

GitHubTrends.prototype.addShowTrend = function() {
	fetchData();
	var addTrend = $("div").find("#user-links");
	addTrend.append('<li class="header-nav-item dropdown js-menu-container"> ' +
					'<a class="header-nav-link tooltipped tooltipped-s js-menu-target" href="/trending?l=all" aria-label="Trending Repos" >'+
						'<span class="octicon octicon-flame left"></span>' +
						'<span class="dropdown-caret"></span>' +
					'</a>' +
					'<div class="dropdown-menu-content js-menu-content"> '+
						' <ul class="dropdown-menu dropdown-menu-sw" style="width:250px;"> '+
							formData +
						'</ul>' +
					'</div>' +
					'</li>');
};

var fetchData = function() {
	$.ajax({
		url: 'https://github.com/trending?l=all',
		async: false,
		method: 'GET',
		success: function(data) {
			
			parseHtmlData(data);
		},
		error: function(err) {
			console.log('Error', err);
		}
	});

};

var parseHtmlData = function(data) {
	var html = $.parseHTML(data);
	var repoNames = $('.repo-list-name > a', html);
	var repoDetails = $('.repo-list-meta', html);
	
	formData += '<a class="dropdown-item" href="/trending?l=all"><strong class="css-truncate-target">Current Trending</strong></a>';
	$.each(repoNames, function(index){
		if (index < 5) {
			var repoDetail  = repoDetails[index].textContent.replace(/↵/g,'').split('Built');
			formData += '<div class="dropdown-divider"></div>';
			formData += '<a class="dropdown-item" href="'+ repoNames[index].pathname +'"><strong>'+repoNames[index].pathname.slice(1)+'</strong>'+
					'<a class="dropdown-item" href="'+ repoNames[index].pathname +'">'+ repoDetail[0].replace(/(\r\n|\n|\r)/gm,"") +'</a></a>' ;
		}
	});
	
};

$(function() {  
	var gitHub = new GitHubTrends();
    gitHub.addShowTrend();
	
});