const Guide = () => {
  return (
    <div className="container d-flex flex-column align-items-center text-left pt-4 pb-4">
      <div>
        <h1>A Guide To Using Bet Royale</h1>
        <p className="pt-3">Note: This project is still in beta.</p>
        <p className="pt-3">This is a guide on how to use Bet Royale.</p>
        <h2 className="pt-3">
          What Do You Need To Do Everything On This Website?
        </h2>
        <p className="pt-3">
          You need a Metamask wallet and a Discord account, that's all you need.
          You need both your Metamask wallet <br /> and Discord account in order
          to bet. In order to create bets, you just need your Discord account.
        </p>
        <h2 className="pt-3">The Home Page</h2>
        <p className="pt-3">
          The Home Page is where you can see the current bets that are active.
        </p>
        <h2 className="pt-3">The Create Bet Page</h2>
        <p className="pt-3">
          The Create Bet page is where you create bets. You have to set
          parameters such as: Name, Description <br /> Deadline, Results, etc.
          Remember, when setting a deadline and result, you are setting them in
          UTC time, <br /> so be aware of everyone's timezones when setting
          those parameters.
        </p>
        <h2 className="pt-3">The Betting History Page</h2>
        <p className="pt-3">
          The Betting History Page is where you can see your history of bets you
          have betted on.
        </p>
        <p className="pt-3">
          That's all you need to know when using this website!
        </p>
      </div>
    </div>
  );
};

export default Guide;
