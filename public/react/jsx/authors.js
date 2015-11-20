define(['react', 'js/react.render', 'jquery'], function(React, render, $) {
    var View = React.createClass({
      render: function() {
        var foreach = function(author, index) {
          return (
            <div className="col-md-3 col-xs-6" key={index}>
              <div className="thumbnail">
                <div className="caption ellipsis"><a href={"#/shufa/" + author}>{index + 1}. {author}</a></div>
              </div>
            </div>
          );
        };

        return (
          <div>
            <div className="alert alert-info">中国历史上的书法名家列表。</div>
            <form className="form author-form form-horizontal alert alert-warning">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="input-group">
                    <input id="author-query" className="form-control" placeholder="历代书法名家"/>
                    <span className="input-group-btn">
                      <button className="btn btn-default">过滤</button>
                    </span>
                  </div>
                </div>
              </div>
            </form>
            <div className="row" id="beitie-authors">
              {this.props.authors.map(foreach)}
            </div>
          </div>
        );
      }
    });

    return render(View);
});

