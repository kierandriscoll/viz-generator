// Functions that generate a dashboard like Shinydashbaord

function dashboardHeader(title = "", disable = false) {
	  $('.logo').html(title);
	  if (disable == true) {
	    $('.main-header').css("display", "none");
	  }	
	}
	
	function dashboardSidebar(disable = false, collapsed = false) {
	  if (disable == true) {
	    $('body').addClass("sidebar-collapse");
	    $('#sidebarCollapsed').attr("data-collapsed", "true");
		$('#sidebarItemExpanded').attr("data-disable", "1");
	  }
	  if (collapsed == true) {
	    $('body').addClass("sidebar-collapse");
	    $('#sidebarCollapsed').attr("data-collapsed", "true");
	  }	  
	}
	
	function sidebarMenu() {
	  $('#sidebarItemExpanded').append('<ul class="sidebar-menu"><div id="sidebar_menu" class="sidebarMenuSelectedTabItem" data-value="null"></div></ul>');
	}
	
	function menuItem(text, tabName) {
	  // Adds item to sidebar
	  $('.sidebar-menu').append('<li><a href="#shiny-tab-' + tabName + '" data-toggle="tab" data-value="' + tabName + '"><span>' + text + '</span></a></li>');
	  // Also adds tab to body
	  $('.tab-content').append('<div role="tabpanel" class="tab-pane" id="shiny-tab-' + tabName + '"></div>');
	} 
	
	function selectInput(inputId, label, choices) {
	  // All inputs go in sidebar for now
	  $('.sidebar-menu').append('<div class="form-group shiny-input-container"><label class="control-label" for="select">' + label + '</label><div><select id="' + inputId + '" class="form-control"></select><script type="application/json" data-for="' + inputId + '" data-nonempty="">{}<\/script></div></div>');
	  choices.forEach(choice => $('#'+ inputId).append('<option value="' + choice + '">' + choice + '</option>'));
	  $('#' +inputId).selectize(); // Optional convert to selectize.js 
	}
	
	// Setup grid framework (rows and boxes)
	function fluidRow(tabName, grid) {
	  grid.forEach((row, ri) => {$('#shiny-tab-' + tabName).append('<div id="' + tabName + '-row' + ri + '"class="row"></div>');
	                            row.forEach((box, bi) => {$('#' + tabName + '-row' + ri).append('<div id="' + tabName + '-row' + ri + '-box' + bi + '" class="col-sm-' + box +'"><div class="box box-solid box-primary"><div class="box-header"><h3 class="box-title"></h3></div><div class="box-body"></div></div></div>');} );
								
	})}
	
	// Specify boxes (given they have been setup with fluidRow())
	// Each box haas unque id > "tabName-rowX-boxY"
    // Status can be: default, primary, info, warning, success,danger	
	// Height must be specifed in pixels eg. "200px" 
	function box(boxId, solidHeader = true, status = "primary", title = "", height = null) {
	  if (solidHeader == false) {$('#' + boxId+ ' .box-header').remove();}
	  $('#' + boxId+ ' .box').removeClass("box-primary").addClass("box-" + status);
	  $('#' + boxId+ ' .box-title').html(title);
	  if (solidHeader != null) {$('#' + boxId+ ' .box').css("height", height);}
	}
	
	// skin colors include: blue, black, purple, green, red, yellow	
    function changeColors(skinColor, sidebar_background = null, body_background = null) {
	  $('body').removeClass("skin-blue").addClass("skin-" + skinColor);
	  if (sidebar_background != null) { pre = $('style').text();  $('style').text(pre + "\n .main-sidebar {background-color: " + sidebar_background + " !important}")}
	  if (body_background != null)    { pre = $('style').text();  $('style').text(pre + "\n .content-wrapper {background-color: " + body_background + "}")}
	}
