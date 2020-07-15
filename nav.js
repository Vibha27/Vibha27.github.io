firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("login in hai");
      $("#nav-baar").empty();
      $("#nav-baar").append(
        `	<div class="navbar-fixed">
        <nav class="navbar">
          <div class="nav-wrapper">
               <a href="./index.html" id="logo" class="brand-logo orange-text">FROOD</a>
                <a  data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
               <ul id="nav-mobile" class="right hide-on-med-and-down">
    
                
                <script type="text/javascript">
                    $(document).ready(function(){
                  $('.tooltipped').tooltip();
                    });
                  //Dropdown Trigger
                    var dropdowns = document.querySelectorAll('.dropdown-trigger')
                    for (var i = 0; i < dropdowns.length; i++){
                      M.Dropdown.init(dropdowns[i]);
                    }
  
                    //Sidenav Trigger
                    $(document).ready(function(){
                      const slide_menu = document.querySelectorAll(".sidenav");
                      M.Sidenav.init(slide_menu,{});
                  });
            
                </script>  
            <!-- Dropdown Structure -->
            <ul id='dropdown1' class='dropdown-content'>				  	
                <li><a href="./Second_page.html?Category=Fruits">Fruits</a></li>
                <li><a href="./Second_page.html?Category=Veggies">Veggies</a></li>
                <li><a href="./Second_page.html?Category=Others">Other</a></li>
            </ul>
                 <li><a href="./index.html" class="tooltipped " data-position="bottom" data-tooltip="Home"><i class="large material-icons">home</i></a></li>
                 <li><a  class="tooltipped dropdown-trigger" data-position="bottom" data-tooltip="Category"  data-target='dropdown1'><i class="large material-icons">filter_list</i></a></li>
                        <li><a href="./my_profile.html" class="tooltipped" data-position="bottom" data-tooltip="Profile"><i class="large material-icons">person</i></a></li>
                        <li><a href="./index.html" class="tooltipped" data-position="bottom" data-tooltip="Orders"><i class="large material-icons">history</i></a></li>
                        <li><a href="./index.html" class="tooltipped" data-position="bottom" data-tooltip="Wallet"><i class="large material-icons">account_balance_wallet</i></a></li>
                        <li><a href="./cart.html" class="tooltipped" data-position="bottom" data-tooltip="Cart"><i class="large material-icons">shopping_cart</i></a></li>
                        <!-- Dropdown Button-->
              
                        <li><a onclick="Logout()" class="tooltipped" data-position="bottom" data-tooltip="Sign-Out"><i class="large material-icons">exit_to_app</i></a></li>                
                    </ul>
    
    
               
            </div>
        </nav>
      </div>
    
    
        <ul class="sidenav" id="mobile-demo">
           <li><a href="./index.html">Home<i class="material-icons">home</i></a></li>
           <li>
          <a class='dropdown-trigger'  data-target='dropdown2'>Category<i class="material-icons">filter_list</i></a>
          </li>  
            <li><a href="./my_profile.html">Profile<i class="material-icons">person</i></a></li>
            <li><a href="./index.html">Orders<i class="material-icons">history</i></a></li>
            <li><a href="./index.html">Walle<i class="material-icons">account_balance_wallet</i>t</a></li>
            <li><a href="./cart.html">Cart<i class="material-icons">shopping_cart</i></a></li>
          <!-- Dropdown Button-->
         
        <!-- Dropdown Structure -->
        <ul id='dropdown2' class='dropdown-content'>
          <li><a href="./Second_page.html?Category=Fruits">Fruits</a></li>				  	
            <li><a href="./Second_page.html?Category=Veggies">Veggies</a></li>
            <li><a href="./Second_page.html?Category=Others">Other</a></li>
        </ul>
            <li><a onclick= "Logout()">Sign out<i class="material-icons">exit_to_app</i></a></li>
        </ul>
        <!--Navigation end-->
    
        <!-- Navbar -->	
        
        `
      )
  
    }
    else{
      console.log("log out hai");
      $("#nav-baar").empty();
      $("#nav-baar").append(
        `    <div class="navbar-fixed">
        <nav class="navbar">
          <div class="nav-wrapper">
               <a href="./index.html" id="logo" class="brand-logo orange-text">FROOD</a>
                <a  data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
               <ul id="nav-mobile" class="right hide-on-med-and-down">
                
            <!-- Dropdown Structure -->
            <ul id='dropdown1' class='dropdown-content'>	
              <li><a href="./Second_page.html?Category=Fruits">Fruits</a></li>			  	
                <li><a href="./Second_page.html?Category=Veggies">Veggies</a></li>
                <li><a href="./Second_page.html?Category=Others">Others</a></li>
            </ul>	
                 <li><a href="./index.html" class="tooltipped" data-position="bottom" data-tooltip="Home"><i class="large material-icons">home</i></a></li>
                        <li><a  class="tooltipped dropdown-trigger" data-position="bottom" data-tooltip="Category" href='#' data-target='dropdown1'><i class="large material-icons">filter_list</i></a></li>
                        <li><a href="./signin.html">Login/Sign-up</a></li>
                </ul>
    
    
               
            </div>
        </nav>
      </div>
    
        <ul class="sidenav" id="mobile-demo">
          <li><a href="./index.html">Home</a></li>
          <!-- Dropdown Button-->
          <li>
          <a class='dropdown-trigger'  data-target='dropdown2'>Category</a>
          </li>  
        <!-- Dropdown Structure -->
        <ul id='dropdown2' class='dropdown-content'>
          <li><a href="./Second_page.html?Category=Fruits">Fruits</a></li>				  	
            <li><a href="./Second_page.html?Category=Veggies">Veggies</a></li>
            <li><a href="./Second_page.html?Category=Others">Others</a></li>
        </ul>
        <li><a href="./signin.html">Login/Signup</a></li>
        </ul>
        <!--Navigation end-->
    
       
     
     
             
    
            <script type="text/javascript">
    
              $(document).ready(function(){
              $('.tooltipped').tooltip();
                });
            
              //Dropdown Trigger
              var dropdowns = document.querySelectorAll('.dropdown-trigger')
              for (var i = 0; i < dropdowns.length; i++){
              M.Dropdown.init(dropdowns[i]);
              }
            
              //Sidenav Trigger
              $(document).ready(function(){
              const slide_menu = document.querySelectorAll(".sidenav");
              M.Sidenav.init(slide_menu,{});
              });
            
            
             
            
            
            </script>
            
      </nav></div>
        `
      )
  
    }
  });