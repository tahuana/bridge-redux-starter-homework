import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {addProduct, removeProduct} from './actions/index';
import Chance from 'chance';

export const chance = Chance();

const Product = (props) => <div>{props.name} <RemoverButton remove={props.remove} id={props.id} /></div>;

const DaBest = ({name}) => <h1>The Best: {name}</h1>;

const AdderButton = ({add}) => <button onClick={() => add({name: 'Sofa'})}>Add Sofa</button>

const RemoverButton = ({remove, id}) => <button onClick={() => remove({id: id})}>Remove item</button>

class App extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.add({
      id: chance.guid(),
      name: 'Table',
      department: 'Furniture',
      price: '300.00',
      stock: 5,
    });
  }

  render() {
    const {productList, add, remove, whoIsTheBest} = this.props;
    debugger;
    return (
      <div>
        <DaBest name={whoIsTheBest}/>
        {productList.map(product => <Product name={product.name} key={product.id} id={product.id} remove={remove} />)}

        <AdderButton {...this.props} />
      </div>
    );
  }
}


// React x REDUX STUFF

const mapStateToProps = state => {
  debugger;
  return {
    productList: state.products.productList,
    whoIsTheBest: 'Della',

    // an example of how to derive state in the mapStateToProps function - this is a specific 'subset' of the full list
    lowStockProducts: state.products.productList.filter(prod => prod.stock && prod.stock < 4),
  }
};

const mapDispatchToProps = {
  add: addProduct,
  remove: removeProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
