// eur = usd * 0.89
// usd = eur * (1 / 0.89)

// const toEuro = (amount, rate) => {
//   return amount * rate;
// };
// const toUsd = (amount, rate) => {
//   return amount * (1 / rate);
// };

// class CurrencyInput extends React.Component {
//   render() {
//     const { value, handleChange } = this.props;
//     return <input value={value} onChange={handleChange} type="number" />;
//   }
// }

class CurrencyInput extends React.Component {
  render() {
    const { value, handleChange } = this.props;
    return <input value={value} onChange={handleChange} type="number" />;
  }
}

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0.89,
      usd: 1,
      euro: 1 * 0.89,
    };
    this.handleUsdChange = this.handleUsdChange.bind(this);
    this.handleEuroChange = this.handleEuroChange.bind(this);
  }

  toUsd(amount, rate) {
    return amount * (1 / rate);
  }

  toEuro(amount, rate) {
    return amount * rate;
  }

  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return "";
    }
    return equation(input, rate).toFixed(3);
  }

  handleUsdChange(event) {
    const euro = this.convert(event.target.value, this.state.rate, this.toEuro);
    this.setState({
      usd: event.target.value,
      euro,
    });
  }

  handleEuroChange(event) {
    const usd = this.convert(event.target.value, this.state.rate, this.toUsd);
    this.setState({
      euro: event.target.value,
      usd,
    });
  }

  render() {
    const { rate, usd, euro } = this.state;

    return (
      <div className="container">
        <div>
          <h1>Currency Converter</h1>
          <p>USD 1 = {rate} EURO</p>
        </div>
        <div>
          <div className="inputContainer">
            <span>USD</span>
            <CurrencyInput value={usd} handleChange={this.handleUsdChange} />
            <span>=</span>
            <CurrencyInput value={euro} handleChange={this.handleEuroChange} />
            <span>EURO</span>
          </div>
        </div>
      </div>
    );
  }
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<CurrencyConverter />);
