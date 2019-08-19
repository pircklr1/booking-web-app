import React, {Component} from 'react';
import moment from 'moment';


class Time extends Component {
    render() {
        const date = new Date();
        return (
            <div>
                <p>{moment(date).format("HH")}</p>
                {/*<Moment parse="HH:mm">{date}</Moment>*/}
                {/*<Moment add={{ hours: 12 }}>{date}</Moment>*/}
                {/*<Moment add={{ days: 1, hours: 12 }}>{date}</Moment>*/}
                {/*<Moment subtract={{ hours: 12 }}>{date}</Moment>*/}
                {/*<Moment subtract={{ days: 1, hours: 12 }}>{date}</Moment>*/}
            </div>
        );
    }
}

export default Time;