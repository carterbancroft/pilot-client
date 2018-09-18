import React from 'react'


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

class App extends React.Component {
    constructor() {
        super(...arguments)

        this.state = {
            transactions: ''
        }

        this.getData = this.getData.bind(this)
    }

    getData() {
        fetch(
            'http://localhost:9001/api/user/carterbancroft/transaction',
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
                <button className="btn btn-primary" onClick={ this.getData }>
                    Get Some Data
                </button>
                <Transactions transactions={ transactions } />
            </div>
        )
    }
}

export default App
