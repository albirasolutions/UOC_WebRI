$(".list-vist .vist-column").on("click", function(){
	$(".pagination-grup>div>div").removeClass("col-md-4");
	$(".pagination-fitxa>div>div").removeClass("col-md-4");
});
/***********************************************************************
							INIT METHODS								
***********************************************************************/
var tab = 'cercadorFiltres';

jQuery(document).ready(function ($) {
	searchParams =	{};
	searchParams.target = 'cercadorFiltres';

    searchParams=parseQueryString(location.search);
	console.log('searchParams', searchParams);
	
	switch(searchParams.target){
		case 'cercadorFiltres':
			console.log('Tab: cercadorFiltres');
			tab = 'cercadorFiltres';
			querySearchEngine(searchParams);
		break;
		case 'cercadorSectors':
			console.log('Tab: cercadorSectors');
			$(".tab.cercadorSectors h3").click();
			tab = 'cercadorSectors';			
			queryInnovaSolSearchEngine(searchParams);
		break;
		case 'cercadorTextual':
			console.log('Tab: cercadorTextual');
			$(".tab.cercadorTextual h3").click();
			tab = 'cercadorTextual';	
			if(searchParams.s){
				$(".cercadorTextual input#search").val(searchParams.s);
				querySearchEngine(searchParams);
				queryInnovaSolSearchEngine(searchParams);			
			}
		break;
	}

	$(".uoc_submitSearch_cercadorFiltres").click(function(e){		
		submitSearch(e);
	});
	$("#collapse-codi input[name='search_sbm']").click(function(e){		
		submitSearch(e);
	});
	$(".tab.cercadorFiltres h3").click(function(e){	
		searchParams =	{};
		tab = 'cercadorFiltres';
		submitSearch(e);
	});	

	$(".cercadorTextual form").submit(function(e){ //Free text search
		e.preventDefault();
		$(".cercadorTextual .collapse-filter").show();
		$(".cercadorTextual .collapse.grup.results").show();
		$(".cercadorTextual .collapse.fitxa.results").show();
		$(".cercadorTextual .collapse.solucions.results").show();
		$(".cercadorTextual .collapse.spin.results").show();
		var freeTextQuery= $(".cercadorTextual input#search").val();
		searchParams={
			s: freeTextQuery
		};
		//$(".tab.cercadorFiltres h3").click();
		querySearchEngine(searchParams);
		queryInnovaSolSearchEngine(searchParams);
	});
	
	$(".tab.cercadorTextual h3").click(function(e){	
		console.log('Tab: cercadorTextual');
		searchParams =	{};
		$(".cercadorTextual input#search").val(' ');
		tab = 'cercadorTextual';	
		$(".cercadorTextual .collapse-filter").hide();
		$(".cercadorTextual .collapse.grup.results").hide();
		$(".cercadorTextual .collapse.fitxa.results").hide();
		$(".cercadorTextual .collapse.solucions.results").hide();
		$(".cercadorTextual .collapse.spin.results").hide();
	});

	$(".uoc_submitSearch_cercadorTextual").click(function(e){		
		submitSearch(e);
	});	

	$(".tab.cercadorSectors h3").click(function(e){	
		console.log('Tab: cercadorSectors');
		tab = 'cercadorSectors';	
		searchParams =	{};
		queryInnovaSolSearchEngine(searchParams);
	});	
	
	$(".uoc_submitSearch_cercadorSectors").click(function(e){		
		submitSearch(e);
	});
});
	

/***********************************************************************
UTILS METHODS								
***********************************************************************/
function parseQueryString(queryString){
	var searchParams = {};
	if(queryString!= null && queryString!=""){
		var pairs = queryString.substring(1, queryString.length).split("&");
		for (var i = 0; i < pairs.length; i++) {
			var param = pairs[i].split("=");
			var key = param[0];
			var val = param[1];
			searchParams[key] = val;
		}
	}
	return searchParams;
}
function getCurrentLanguage(){
	var lang = document.documentElement.lang;
	if(lang == null){
		lang = 'ca';
	}
	return lang;
}

/***********************************************************************
							FORM METHODS								
***********************************************************************/
function submitSearch(caller){
	if(caller != null){
		caller.preventDefault();	
	}
	getSearchFormValues();
	console.log('submitSearch. Form values: ', searchParams);

	switch(tab){
		case 'cercadorFiltres':
			querySearchEngine(searchParams);
		break;
		case 'cercadorSectors':
			queryInnovaSolSearchEngine(searchParams);
		break;
		case 'cercadorTextual':
			querySearchEngine(searchParams);
			queryInnovaSolSearchEngine(searchParams);
		break;
	}

	if(searchParams.visualitzacio && searchParams.visualitzacio.length){
		
		switch(tab){
			case 'cercadorFiltres':
				$(".cercadorFiltres .collapse.results").addClass("hidden");						//Hide depending on "visualitza per" options
			break;
			case 'cercadorSectors':
				$(".cercadorSectors .collapse.results").addClass("hidden");						//Hide depending on "visualitza per" options
			break;
			case 'cercadorTextual':
				$(".cercadorTextual .collapse.results").addClass("hidden");						//Hide depending on "visualitza per" options
			break;
		}
		
		for(selector in searchParams.visualitzacio){
			switch(tab){
				case 'cercadorFiltres':
					$(".cercadorFiltres .collapse."+searchParams.visualitzacio[selector]).removeClass("hidden");
				break;
				case 'cercadorSectors':
					//console.log('Remove ' + searchParams.visualitzacio[selector] + ' results');
					//console.log(".cercadorSectors .collapse."+searchParams.visualitzacio[selector]);
					$(".cercadorSectors .collapse."+searchParams.visualitzacio[selector]).removeClass("hidden");
				break;
				case 'cercadorTextual':
					//console.log('Remove ' + searchParams.visualitzacio[selector] + ' results');
					$(".cercadorTextual .collapse."+searchParams.visualitzacio[selector]).removeClass("hidden");
				break;
			}
		}
	} 
}

function getSearchFormValues(){
	searchParams={};

	if($("#collapse-sector_productiu input:checked").length>0){									//Ambits checked
		searchParams.sector_productiu = [];
		$("#collapse-sector_productiu input:checked").each(function( index ) {
			searchParams.sector_productiu.push($(this).val());
		});	
	}

	if($("#collapse-ambits_especialitzacio input:checked").length>0){									//Ambits checked
		searchParams.ambit_especialitzacio = [];
		$("#collapse-ambits_especialitzacio input:checked").each(function( index ) {
			searchParams.ambit_especialitzacio.push($(this).val());
		});	
	}

	if($("#collapse-ods input:checked").length>0){										//Ods checked
		searchParams.ods = [];
		$("#collapse-ods input:checked").each(function( index ) {
			searchParams.ods.push($(this).val());
		});	
	}

	var unescoFreeTextSearch = $("#collapse-codi input[name='searchWords']").val();		//UNESCO Free text search
	if (unescoFreeTextSearch != null && unescoFreeTextSearch != ""){
		searchParams.unesco = unescoFreeTextSearch;
	}
	
	if($(".general-filter.centre input:checked").length>0){								//Centres checked
		searchParams.centre = [];
		$(".general-filter.centre input:checked").each(function( index ) {
			searchParams.centre.push($(this).val());
		});	
	}
	if($(".general-filter.visualitzacio input:checked").length>0){						//Visualitza per checked
		searchParams.visualitzacio = [];
		$(".general-filter.visualitzacio input:checked").each(function( index ) {
			searchParams.visualitzacio.push($(this).val());
		});	
	} else {
		searchParams.visualitzacio = [];
		if(tab=="cercadorFiltres") {
			searchParams.visualitzacio.push("grup");
			searchParams.visualitzacio.push("fitxa");
		} else if(tab=="cercadorSectors"){
			searchParams.visualitzacio.push("solucions");
			searchParams.visualitzacio.push("spin");
		} else if(tab=="cercadorTextual"){
			searchParams.visualitzacio.push("grup");
			searchParams.visualitzacio.push("fitxa");
			searchParams.visualitzacio.push("solucions");
			searchParams.visualitzacio.push("spin");
		}
	}
}


/***********************************************************************
							SEARCH METHODS								
***********************************************************************/
function buildQuery(searchParams){
	console.log("Building query")
	var endpointURI = apiPlatacon + "/api/search";
	var queryString = "?idioma="+getCurrentLanguage();									//Mandatory
	for (var key in searchParams) {
		if(searchParams.hasOwnProperty(key)) {
			queryString += "&" + key + "=" +searchParams[key];
		}	
		
	}
	return  endpointURI+queryString;
}

function buildInnovaSolQuery(endpointUrl,searchParams){
	var endpointURI =  endpointUrl;
	var queryString = "?idioma="+getCurrentLanguage();									//Mandatory
	for (var key in searchParams) {
		if(searchParams.hasOwnProperty(key) && (key != "target") && (searchParams[key]!="")) {
			queryString += "&" + key + "=" +encodeURIComponent(searchParams[key]);
		}
	}
	return  endpointURI+queryString;
}

function querySearchEngine(searchParams){
	var fitxaResults = $(".fitxaResults_" +tab+" .list-fitxa");
	var grupResults = $(".grupResults_" +tab+" .list-grup");

	var fitxaURL = buildQuery(searchParams)+"&tipus=fitxa";
	var grupURL = buildQuery(searchParams)+"&tipus=grup";
	
	$(".cercadorFiltres .search").text("");
	// Content_type: fitxa
	$.ajax({
		url: fitxaURL,
		beforeSend: function(){
			var loadingMarkup="";
			for(var i = 0; i < 3; i++){
				loadingMarkup+='<div class="col-xs-12 col-md-4"><div class="uoc_card_placeholder"><div class="title"></div><div class="line-long"></div><div class="line-short"></div><div class="line-medium"></div></div></div>';
			}
			fitxaResults.html(loadingMarkup);
		}
	}).done(
		function(data, returnCode, request){
			if(data.hits.found == 0){
				var dataPaginationFitxa = ["<p style='font-style:italic'>"+literals.noresults+"</p>"];
				initPagination(dataPaginationFitxa, "fitxa");
			} else {
				var items=data.hits.hit;
				items.sort((a,b) => (a.fields.nom_investigador.toLowerCase() > b.fields.nom_investigador.toLowerCase()) ? 1 : ((b.fields.nom_investigador.toLowerCase() > a.fields.nom_investigador.toLowerCase()) ? -1 : 0));
				var dataPaginationFitxa = [];
				for (var i = 0; i < items.length; i++) {
					dataPaginationFitxa.push(getResultMarkup(items[i], "fitxa", i, $('.grupResults .js-changeVist').hasClass("change-to-list")));
				}
				
				initPagination(dataPaginationFitxa, "fitxa");
			}
		}
	).fail(function(xhr, textStatus, errorThrown){
		fitxaResults.html("<p style='font-style:italic'>"+literals.connectionError+"</p>");
	});

	// Content_type: grup
	$.ajax({
		url: grupURL,
		beforeSend: function(){
			var loadingMarkup="";
			for(var i = 0; i < 3; i++){
				loadingMarkup+='<div class="col-xs-12 col-md-4"><div class="uoc_card_placeholder"><div class="title"></div><div class="line-long"></div><div class="line-short"></div><div class="line-medium"></div></div></div>';
			}
			grupResults.html(loadingMarkup);
		}
	}).done(
		function(data){
			if(data.hits.found == 0){
				var dataPaginationGrup = ["<p style='font-style:italic'>"+literals.noresults+"</p>"];
				initPagination(dataPaginationGrup, "grup");
			} else {
				var items=data.hits.hit;
				items.sort((a,b) => (a.fields.nom_grup.toLowerCase() > b.fields.nom_grup.toLowerCase()) ? 1 : ((b.fields.nom_grup.toLowerCase() > a.fields.nom_grup.toLowerCase()) ? -1 : 0));
				var dataPaginationGrup = [];
				for (var i = 0; i < items.length; i++) {
					dataPaginationGrup.push(getResultMarkup(items[i], "grup",i, $('.grupResults .js-changeVist').hasClass("change-to-list")));
				}
				initPagination(dataPaginationGrup, "grup");
			}
		}
	).fail(function(xhr, textStatus, errorThrown){
		grupResults.html("<p style='font-style:italic'>"+literals.connectionError+"</p>");
	});
}

function queryInnovaSolSearchEngine(searchParams){

    var innovaSolURL = buildInnovaSolQuery(apiRI,searchParams);
	var solucionsTecResults = $(".solucio_tecResults_"+tab+" .list-solucio_tec");
	var patentsResults = $(".patentsResults_"+tab+" .list-patent");
	var serveisResults = $(" .serveiResults_"+tab+" .list-servei");
	var spinResults = $(" .spin_offResults_"+tab+" .list-spin_off");
	var r=[solucionsTecResults,patentsResults,serveisResults,spinResults];
    console.log('querying...SolucionsInnovadores',innovaSolURL);
    
	$.ajax({
		url: innovaSolURL,
		beforeSend: function(){
			var loadingMarkup="";
			for(var i = 0; i < 3; i++){
				loadingMarkup+='<div class="col-xs-12 col-md-4"><div class="uoc_card_placeholder"><div class="title"></div><div class="line-long"></div><div class="line-short"></div><div class="line-medium"></div></div></div>';
            }
            solucionsTecResults.html(loadingMarkup);
            patentsResults.html(loadingMarkup);
            serveisResults.html(loadingMarkup);
            spinResults.html(loadingMarkup);            
		}
	}).done(
		function(data){
            var dataPaginationGrup = ["<p style='font-style:italic'>"+literals.noresults+"</p>"];
			if(data.hits.found == 0){
                initPagination(dataPaginationGrup, "solucio_tec");
                initPagination(dataPaginationGrup, "patent");
                initPagination(dataPaginationGrup, "servei");
                initPagination(dataPaginationGrup, "spin_off");
			} else {                
                var items=data.hits.hit;
                console.log(items, 'items')
                var lista=["solucio_tec","patent","servei","spin_off"];
                var items=data.hits.hit;
				//items.sort((a,b) => (a.fields.nom_grup.toLowerCase() > b.fields.nom_grup.toLowerCase()) ? 1 : ((b.fields.nom_grup.toLowerCase() > a.fields.nom_grup.toLowerCase()) ? -1 : 0));
                var dataPaginationGrupSolTec = [];
                var dataPaginationGrupPatent = [];
                var dataPaginationGrupServei = [];
                var dataPaginationGrupSpinOff = [];                
				for (var i = 0; i < items.length; i++) {
                    var idioma=getCurrentLanguage();
                    var idioma_contingut=items[i].fields.idioma;
                    var content_type=JSON.stringify(items[i].fields.content_type[0]);
                    if(idioma_contingut != null){
                        idioma_contingut=JSON.stringify(idioma_contingut[0]);
                        idioma_contingut=idioma_contingut.replace(/[""]/g, "");}
                    else{
                        idioma_contingut="ca";
                    }
                    content_type=content_type.replace(/["']/g, "");
                    if(lista.includes(content_type) && (idioma_contingut==idioma)){
                        console.log('item compleix condicio',items[i]);
                        switch(lista.indexOf(content_type)){
                            case 0:
                                console.log('Afegint solució tecnològica');
                                dataPaginationGrupSolTec.push(getResultMarkup(items[i], "solucio_tec",i, $('.solucionsTecResults .js-changeVist').hasClass("change-to-list")));
                                break;
                            case 1:
                                console.log('Afegint patent');                        
                                dataPaginationGrupPatent.push(getResultMarkup(items[i], "patent",i, $('.solucionsPatentsResults .js-changeVist').hasClass("change-to-list")));
                                break;
                            case 2:
                                console.log('Afegint servei');                        
                                dataPaginationGrupServei.push(getResultMarkup(items[i], "servei",i, $('.solucionsServeissResults .js-changeVist').hasClass("change-to-list")));
                                break;
                            case 3:
                                console.log('Afegint spin off');                        
                                dataPaginationGrupSpinOff.push(getResultMarkup(items[i], "spin_off",i, $('.spinResults .js-changeVist').hasClass("change-to-list")));
                            default:
                                break;
                        }
                    }
                }
				
				console.log('Calling initPagination')
                if(dataPaginationGrupSolTec.length>0) {
					initPagination(dataPaginationGrupSolTec, "solucio_tec");
					console.log('dataPaginationGrupSolTec > 0')
				}
                else { 
					console.log('dataPaginationGrupSolTec is 0')
					initPagination(dataPaginationGrup, "solucio_tec");
				}
                
                if(dataPaginationGrupPatent.length>0) initPagination(dataPaginationGrupPatent, "patent");
                else initPagination(dataPaginationGrup, "patent");

                if(dataPaginationGrupServei.length>0) initPagination(dataPaginationGrupServei, "servei");
                else initPagination(dataPaginationGrup, "servei");

                if(dataPaginationGrupSpinOff.length>0) initPagination(dataPaginationGrupSpinOff, "spin_off");
                else initPagination(dataPaginationGrup, "spin_off");
			}
		}
	).fail(function(xhr, textStatus, errorThrown){
		solucionsTecResults.html("<p style='font-style:italic'>"+literals.connectionError+"</p>");
		patentsResults.html("<p style='font-style:italic'>"+literals.connectionError+"</p>");
		serveisResults.html("<p style='font-style:italic'>"+literals.connectionError+"</p>");
		spinResults.html("<p style='font-style:italic'>"+literals.connectionError+"</p>");
	});
}

function getResultMarkup(item, content_type, idx, listView){
    console.log("Results as list? "+listView)
	var markup='';
	if(listView){
		markup='<div class="col-xs-12" id="'+content_type+'Result_'+idx+'">';
	} else {
		markup='<div class="col-xs-12 col-md-4" id="'+content_type+'Result_'+idx+'">';
	}
	
	if(content_type == "fitxa"){
			var posicio = item.fields.posicio;
			if(typeof item.fields.posicio === 'undefined'){posicio=""}
			markup+="<a href='"+item.fields.url+"'>"
			markup+='<div id="'+item.id+'" class="card card-people"><div class="card__contents img-wpr"><img src="'+item.fields.imatge_url+'" alt="" class="img-wpr__cover">';
			markup+='<div class="img-wpr__contents"><p class="title">'+item.fields.nom_investigador+'</p>';
			markup+='</div><span class="author">'+posicio+'<span class="description">'+item.fields.entradeta+'</span></span>';
			markup+='</div></div></div></a>';
    } else if(content_type == "grup"){
			markup+="<a href='"+item.fields.url+"'>"
			markup+='<div id="'+item.id+'" aria-label="region" class="card card-noimg"><div class="card__contents">';
			markup+='<p class="title">'+item.fields.nom_grup+'</p><p>'+item.fields.descripcio+'</p>';
            markup+='</div></div></a>';
            
    } else if(content_type == "patent" || content_type == "servei" || content_type == "solucio_tec" || content_type == "spin_off") { // sols_tec, patent, servei, spin-off print view

			markup+="<a href='"+item.fields.url+"'>"
			markup+='<div id="'+item.id+'" aria-label="region" class="card card-noimg"><div class="card__contents">';
			markup+='<p class="title">'+item.fields.name;
			if(item.fields.descripcio) markup+='</p><p>'+item.fields.descripcio+'</p>';
			markup+='</div></div></a>';
	}
	
	markup+='</div>';
	return markup;
}

/***********************************************************************
							PAGINATION METHODS								
***********************************************************************/

function initPagination(dataset, content_type) {

	//console.log('Entering initPagination for content type: ' + content_type + '. Tab: ' + tab);
	//console.log('Looking for element: .pagination-'+content_type+'_'+tab+' .pagination-'+content_type+'-container_'+ tab);

    $('.pagination-'+content_type+'_'+tab+' .pagination-'+content_type+'-container_'+ tab).pagination({
	    dataSource: dataset,
	    pageSize: 6,
	    autoHidePrevious: true,
	    autoHideNext: true,
	    callback: function(data, pagination) {
			// template method of yourself
			//console.log('Entering initPagination callback for content type: ' + content_type);
			var html = data;
			//console.log('There is more than one match: '+ $('.'+content_type+'Results_' + tab +' .list-'+content_type).length)
            $('.'+content_type+'Results_' + tab +' .list-'+content_type).html(html);
	    },
	    afterRender: function(isForced) {
	    	if($('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-page').length > 1){
				//console.log('There is more than one match: '+ $('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-page').length)
		    	$('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-page').addClass("col-md-1");
		    	$('.pagination-'+content_type+'-container_' + tab +' .paginationjs-ellipsis').addClass("col-md-1");
				$('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-previous').addClass("col-md-2");
				$('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-next').addClass("col-md-2");
				//last item width
				var cols = 12 - $('.pagination-'+content_type+'-container_' + tab +' .paginationjs-ellipsis').length;
				cols -= ($('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-previous').length * 2);
				cols -= ($('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-next').length * 2);
				cols -= $('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-page').length;
				$('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-page').last().removeClass("col-md-1");
				cols++;
				$('.pagination-'+content_type+'-container_' + tab +' .J-paginationjs-page').last().addClass("col-md-"+cols);
				$('.pagination-'+content_type+' .pagination-'+content_type+'-container_' + tab).show();
	    	} else {
	    		$('.pagination-'+content_type+'_' + tab +' .pagination-'+content_type+'-container_' + tab).hide();
	    	}
	    	$(".pagination-"+content_type+">div>div").removeClass("col-md-4");
	    },
	    afterPaging: function(){
	    	if($('.'+content_type+'Results_' + tab +' .js-changeVist').hasClass("change-to-list")){
	    		$("."+content_type+"Results_" + tab +" .list-"+content_type+" div").removeClass("col-md-4");
	    		$(".pagination-"+content_type+">div>div").removeClass("col-md-4");
	    	}
	    },
	    prevText: literals.pagination.previous,
	    nextText: literals.pagination.next,
	    pageRange: 1
	});	
}