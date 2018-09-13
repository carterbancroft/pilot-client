import React from 'react'


function Version(props) {
    const { version } = props

    if (!version.length) return <br />

    return <div>{ version }</div>
}

class App extends React.Component {
    constructor() {
        super(...arguments)

        this.state = {
            version: ''
        }

        this.getData = this.getData.bind(this)
    }

    getData() {
        fetch(
            'http://localhost:9001/api/',
            { credentials: 'same-origin' }
        )
            .then(res => res.json())
            .then(json => {
                this.setState({ version: json })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { version } = this.state
        return (
            <div>
                <button className="btn btn-primary" onClick={ this.getData }>
                    Get Some Data
                </button>
                <Version version={ version } />
            </div>
        )
    }
}

export default App
