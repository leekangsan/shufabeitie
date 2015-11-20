define(['react', 'js/react.render', 'jquery'], function(React, render, $) {
  var View = React.createClass({displayName: "View",
    render: function() {
      var published = this.props.published;
      var author = this.props.author;
      var paper = this.props.paper;
      var cover = this.props.cover;
      var info = this.props.info;
      var prev = this.props.prev;
      var next = this.props.next;
      var images = this.props.images;
      var path100 = this.props.path100;
      var path1000 = this.props.path1000;

      var foreach = function(fatie, index) {
        return (
          React.createElement("div", {id: "a{index}", className: "swiper-slide thumbnail beitie-img-container", key: index}, 
            React.createElement("img", {src: "/" + path100 + "/" + fatie, className: "img-responsive beitie-img", "data-src": "/" + path1000 + "/" + fatie})
          )
        );
      };

      var breadcrumb = React.createElement("ol", {className: "breadcrumb alert alert-info"}, 
        React.createElement("li", null, React.createElement("a", {href: "#/authors"}, "历代名家")), 
        React.createElement("li", null, React.createElement("a", {href: "#/shufa/" + author}, author)), 
        React.createElement("li", null, React.createElement("a", {href: "#/shufa/" + author + "/" + prev}, "上一法帖")), 
        React.createElement("li", null, React.createElement("a", {href: "#/shufa/" + author + "/" + next}, "下一法帖")), 
        React.createElement("li", {className: "paper-name-container active"}, paper)
      );

      var imageList;
      if (images.length) {
        imageList = React.createElement("div", {id: "beitie-imgs-container"}, 
          React.createElement("div", {className: "beitie-swiper-container", "data-img-size": images.length}, 
            React.createElement("div", {className: "swiper-container"}, 
              React.createElement("div", {className: "swiper-wrapper"}, 
                images.map(foreach)
              ), 
              React.createElement("div", {className: "swiper-scrollbar"})
            )
          ), 

          React.createElement("div", {id: "beitie-display-container", className: "thumbnail beitie-img-container"}, 
            React.createElement("img", {src: "/" + path1000 + "/" + cover, className: "image-responsive beitie-img"})
          ), 
          React.createElement("div", {id: "beitie-text-container", className: "alert alert-info " + published}, 
            React.createElement("div", {id: "beitie-text-show", dangerouslySetInnerHTML: {__html: info.html}})
          )
        );
      }

      return (
        React.createElement("div", null, 
          breadcrumb, 
          imageList
        )
      );
    }
  });

  return render(View);
});



