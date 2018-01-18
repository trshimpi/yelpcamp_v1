var mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment   =require("./models/comment");
 
var data =[
      {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet fringilla nunc. Pellentesque ut porta velit, a ultrices metus. In imperdiet felis a diam blandit, a aliquet dui suscipit. Nunc mattis faucibus mi, eget laoreet eros interdum vitae. Cras vel eros feugiat, finibus diam et, tincidunt elit. In hac habitasse platea dictumst. Aenean a laoreet mi, id congue augue. In eu suscipit orci. Praesent viverra, magna sed condimentum mollis, enim ligula malesuada metus, eu sodales diam purus vitae mauris. Vestibulum maximus justo in mi laoreet, at commodo ipsum efficitur. Maecenas vel porta sem. "
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet fringilla nunc. Pellentesque ut porta velit, a ultrices metus. In imperdiet felis a diam blandit, a aliquet dui suscipit. Nunc mattis faucibus mi, eget laoreet eros interdum vitae. Cras vel eros feugiat, finibus diam et, tincidunt elit. In hac habitasse platea dictumst. Aenean a laoreet mi, id congue augue. In eu suscipit orci. Praesent viverra, magna sed condimentum mollis, enim ligula malesuada metus, eu sodales diam purus vitae mauris. Vestibulum maximus justo in mi laoreet, at commodo ipsum efficitur. Maecenas vel porta sem. "
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet fringilla nunc. Pellentesque ut porta velit, a ultrices metus. In imperdiet felis a diam blandit, a aliquet dui suscipit. Nunc mattis faucibus mi, eget laoreet eros interdum vitae. Cras vel eros feugiat, finibus diam et, tincidunt elit. In hac habitasse platea dictumst. Aenean a laoreet mi, id congue augue. In eu suscipit orci. Praesent viverra, magna sed condimentum mollis, enim ligula malesuada metus, eu sodales diam purus vitae mauris. Vestibulum maximus justo in mi laoreet, at commodo ipsum efficitur. Maecenas vel porta sem. "
    }
      ]    
  function seedDb() {
        //remove all campgrounds
        Campground.remove({},function(err){
       if (err){
             console.log(err);
       }   
       console.log("removed campgrounds");
       //add campgrounds
          data.forEach(function(seed){
             Campground.create(seed,function(err,campground){
                   if(err){
                         console.log(err);
                   } else {
                         console.log("campground added");
                         //add comments
                         Comment.create(
                            {  
                                 text: "This place is great, but I wish there was internet",
                                 author: "Homer"
                            },function(err,comment){
                                  if(err){
                                        console.log(err);
                                  }else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("comment added");
                                  }
                            }
                        )
                   }
             });   
          });
    });
    
    
  }
module.exports=seedDb;