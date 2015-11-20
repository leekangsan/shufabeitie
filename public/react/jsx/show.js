define(['react', 'js/react.render', 'jquery'], function(React, render, $) {
  var View = React.createClass({
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
          <div id="a{index}" className="swiper-slide thumbnail beitie-img-container" key={index}>
            <img src={"/" + path100 + "/" + fatie} className="img-responsive beitie-img" data-src={"/" + path1000 + "/" + fatie}/>
          </div>
        );
      };

      var breadcrumb = <ol className="breadcrumb alert alert-info">
        <li><a href="#/authors">历代名家</a></li>
        <li><a href={"#/shufa/" + author}>{author}</a></li>
        <li><a href={"#/shufa/" + author + "/" + prev}>上一法帖</a></li>
        <li><a href={"#/shufa/" + author + "/" + next}>下一法帖</a></li>
        <li className="paper-name-container active">{paper}</li>
      </ol>;

      var imageList;
      if (images.length) {
        imageList = <div id="beitie-imgs-container">
          <div className="beitie-swiper-container" data-img-size={images.length}>
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {images.map(foreach)}
              </div>
              <div className="swiper-scrollbar"></div>
            </div>
          </div>

          <div id="beitie-display-container" className="thumbnail beitie-img-container">
            <img src={"/" + path1000 + "/" + cover} className="image-responsive beitie-img"/>
          </div>
          <div id="beitie-text-container" className={"alert alert-info " + published}>
            <div id="beitie-text-show" dangerouslySetInnerHTML={{__html: info.html}}></div>
          </div>
        </div>;
      }

      return (
        <div>
          {breadcrumb}
          {imageList}
        </div>
      );
    }
  });

  return render(View);
});



