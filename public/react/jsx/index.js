define(['react', 'js/react.render', 'jquery'], function(React, render, $) {

    var View = React.createClass({
      render: function() {
        var foreach = function(fatie, index) {
          return (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="thumbnail">
                <div className="caption ellipsis"><a href={"#/shufa/" + fatie.author + "/" + fatie.paper}>{index + 1}. {fatie.paper}</a></div>
              </div>
            </div>
          );
        };

        return (
        <div>
          <div className="alert alert-info">首页会随机刷出60个法帖。</div>
          <div id="beitie-imgs-container" className="row">
            {this.props.faties.map(foreach)}
          </div>
        </div>
        );
      }
    });

    return render(View);
});

