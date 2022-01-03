import { withRouter, useLocation } from 'react-router-dom';
function Bet(props) {
    const loc = useLocation();
    const betData = loc.state.currentBet
    console.log(betData);
    return (
        <div className="mt-5 bet-details">
            <h1 className='text-center'>{betData.name}</h1>
        </div>
    )
}
export default withRouter(Bet);