import React from 'react'

const api_url = 'http://localhost:9001/api'

function Transactions(props) {
    const { transactions } = props

    if (!transactions.length) return <br />

    let items = transactions.map(t => (
        <tr>
            <td>{ t.item }</td>
            <td>{ t.category }</td>
            <td>{ t.amount_in_cents / 100 }</td>
        </tr>
    ))

    return (
        <table>
            <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Amount</th>
            </tr>
            { items }
        </table>
    )
}


class TransactionForm extends React.Component {
    constructor() {
        super(...arguments)

        this.state = {
            item: '',
            category: '',
            amount_in_cents: '',
            transaction_type: 'expense',
        }

        this.createTransaction = this.createTransaction.bind(this)
        this.updateStateFromInput = this.updateStateFromInput.bind(this)
    }

    createTransaction() {
        const user_name = 'carterbancroft'
        console.log('create a transaction')

        const url = `${api_url}/user/${user_name}/transaction`
        console.log(url)
        fetch(
            url,
            {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            },
        )
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateStateFromInput(event) {
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state)
    }

    render() {
        return (
            <form onSubmit={ (e) => e.preventDefault() }>
                <input
                    name="item"
                    placeholder="Item"
                    className="form-control"
                    value={ this.state.item }
                    onChange={ this.updateStateFromInput }
                />
                <input
                    name="category"
                    placeholder="Category"
                    className="form-control"
                    value={ this.state.category }
                    onChange={ this.updateStateFromInput }
                />
                <input
                    name="amount_in_cents"
                    placeholder="0"
                    className="form-control"
                    value={ this.state.amount_in_cents }
                    onChange={ this.updateStateFromInput }
                />
                <button
                    className="btn btn-primary"
                    onClick={ this.createTransaction }>
                    Create Transaction
                </button>
            </form>
        )
    }
}


class App extends React.Component {
    constructor() {
        super(...arguments)

        this.state = {
            transactions: ''
        }

        this.getData = this.getData.bind(this)
    }

    getData() {
        const user_name = 'carterbancroft'
        const url = `${api_url}/user/${user_name}/transaction`
        fetch(
            url,
            {
                method: 'GET',
                credentials: 'same-origin'
            },
        )
            .then(res => res.json())
            .then(json => {
                this.setState({ transactions: json })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { transactions } = this.state
        return (
            <div>
                <TransactionForm />
                <br />
                <button className="btn btn-primary" onClick={ this.getData }>
                    Get Some Data
                </button>
                <Transactions transactions={ transactions } />
            </div>
        )
    }
}

export default App
