define(['react', 'js/react.render', 'jquery'], function(React, render, $) {
    var View = React.createClass({
      render: function() {
        var foreach = function(fatie, index) {
          return (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="thumbnail">
                <div className="caption ellipsis"><a href={"#/" + fatie.value}>{index + 1}. {fatie.key}</a></div>
              </div>
            </div>
          );
        };

        return (
          <div>
            <ol className="alert alert-info breadcrumb">
              <li><a href="#/authors">历代名家</a></li>
              <li className="active">{this.props.author}</li>
            </ol>
            <div id="beitie-list" className="row">
                {this.props.papers.map(foreach)}
            </div>
          </div>
        );
      }
    });

    return render(View);
});


