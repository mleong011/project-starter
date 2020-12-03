import React, {Component} from 'react';

export class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
        };
    }

    // componentDidMount(){
    //     const data = JSON.parse(sessionStorage.getItem('userData'));
    //     let data1 = data;
    //     console.log(data1.data.name);
    // }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 btn btn-info">
                        Welcome to dashboard
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3"> Welcome : {this.state.name} </div>
                    <div className="col-sm-9"></div>
                    
                </div>
            </div>
        )
    }
}

export default Dashboard