import React, {Component} from 'react';


class SystemStatus extends Component{
    
    state={
        status: 'Offline'  
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
            this.setState({ status: res });
           
            })
            .catch(err => console.log("ERRO:"+err));
    }

    callApi = async () => {
        const response = await fetch('http://localhost:8080/api/v1/status');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
    
    render(){
        return(<p>System status: {this.state.status}</p>);
    }
}


export default SystemStatus;