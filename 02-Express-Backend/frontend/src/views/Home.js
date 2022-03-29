import "@passageidentity/passage-auth";

function Home() {
    return (
        <passage-auth app-id={process.env.PASSAGE_APP_ID}></passage-auth>
    );
}

export default Home;
