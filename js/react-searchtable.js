/** @jsx React.DOM */

var SearchProductConponent = React.createClass({
  // doing once init data state
  getInitialState: function() {
    return {
      searchText: '',
      inStock: false
    };
  },
  handleSearch: function(searchText, inStock){
    this.setState({
      searchText: searchText,
      inStock: inStock
    })
  },
  render: function(){
    return (
      <div>
        <ProductSearchSection searchText={this.state.searchText} inStock={this.state.inStock} onUserInput={this.handleSearch} />
        <ProductListSection products={this.props.products} searchText={this.state.searchText} inStock={this.state.inStock} />
      </div>
    );
  }
});

var ProductSearchSection = React.createClass({
  onSearch: function(){
    this.props.onUserInput(this.refs.searchText.getDOMNode().value, this.refs.inStock.getDOMNode().checked);
  },
  render: function(){
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.searchText} ref="searchText" onChange={this.onSearch} />
        <p>
          <input type="checkbox" checked={this.props.inStock} ref="inStock" onChange={this.onSearch} /> {' '} Only show products in stock
        </p>
      </form>
    );
  }
});

var ProductListSection = React.createClass({
  render: function(){
    var rows = [],
        prevCategory;
    // for loop => product categorys & products
    this.props.products.forEach(function(product){
      if(product.name.indexOf(this.props.searchText) === -1 || (!product.stocked && this.props.inStock))
        return;

      // don't push same category
      if(product.category !== prevCategory)
        rows.push(<ProductCategoryRow category={product.category} />);
      rows.push(<ProductRow product={product} />);

      prevCategory = product.category;
    }.bind(this));

    // {} to get and show variable within render function
    return (
      <table>
        <thead>
          <tr>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Price</span>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var ProductCategoryRow = React.createClass({
  render: function(){
    return (
      <tr>
        <th colSpan="2">
          <span>{this.props.category}</span>
        </th>
      </tr>
    );
  }
});

var ProductRow = React.createClass({
  render: function(){
    // not in stock => red
    var isStock = this.props.product.stocked ? {} : {color: 'red'};

    // {} to get and show variable within render function
    return (
      <tr>
        <td>
          <span style={isStock}>{this.props.product.name}</span>
        </td>
        <td>
          <span>{this.props.product.price}</span>
        </td>
      </tr>
    );
  }
});


// product date for practicing
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


React.renderComponent(<SearchProductConponent products={PRODUCTS} />, document.getElementById('container'));