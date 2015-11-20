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
            <div className="alert alert-info">
              输入书法作品名或者是书法家的名字进行搜索，最多返回120个结果。
            </div>
            <form className="form search-form alert alert-warning">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="input-group">
                    <input type="text" name="keywords" id="keywords" className="form-control" placeholder="书法作品名或者是书法家"/>
                    <span className="input-group-btn">
                      <input type="submit" value="搜索" className="btn btn-default"/>
                    </span>
                  </div>
                </div>
              </div>
            </form>
            <div id="beitie-imgs-container" className="row">
              {this.props.faties.map(foreach)}
            </div>
          </div>
        );
      }
    });

    return render(View);
});


